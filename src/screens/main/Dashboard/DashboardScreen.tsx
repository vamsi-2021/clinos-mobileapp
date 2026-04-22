import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Pressable,
} from 'react-native';
//import {Pressable} from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { DrawerParamList } from '../../../types/navigation';
import { Colors } from '../../../constants/theme';
import { styles, BAR_AREA_WIDTH, CHART_LABEL_WIDTH, MAX_CHART_VALUE, CHART_X_VALUES, BAR_ROW_HEIGHT } from './DashboardScreen.styles';
import { api } from '../../../utils/api';

import {
  PatientsIcon,
  TrialsIcon,
  TrendingIcon,
  InfoIcon,
  CirclesIcon,
  CheckCircleIcon,
  RecentIcon,
  RightArrowIcon,
} from '../../../assets/icons';
import AppHeader from '../../../components/common/AppHeader';
import { GlobalStyles } from '../../../styles/GlobalStyles';

type DashboardScreenProps = {
  navigation: DrawerNavigationProp<DrawerParamList, 'Dashboard'>;
};


// ── Stat cards ──────────────────────────────────────────────────────────────
const STAT_CARDS = [
  {
    label: 'Patients Screened',
    value: '5',
    trend: '+12%',
    trendLabel: 'vs last month',
    trendUp: true,
    iconBg: Colors.primaryLight,
    iconColor: Colors.primary,
    Icon: PatientsIcon,
  },
  {
    label: 'Active Trials',
    value: '5',
    trend: '0%',
    trendLabel: 'vs last month',
    trendUp: null,
    iconBg: Colors.primaryLight,
    iconColor: Colors.primary,
    Icon: TrialsIcon,
  },
  {
    label: 'Eligible Matches',
    value: '3',
    trend: '+25%',
    trendLabel: 'vs last month',
    trendUp: true,
    subLabel: '+1 likely eligible',
    iconBg: Colors.primaryLight,
    iconColor: Colors.primary,
    Icon: CheckCircleIcon,
  },
  {
    label: 'Avg Match Score',
    value: '88%',
    trend: '+5%',
    trendLabel: 'vs last month',
    trendUp: true,
    iconBg: Colors.primaryLight,
    iconColor: Colors.primary,
    Icon: CirclesIcon,
  },
];

// ── Donut chart types & color map ────────────────────────────────────────────
type DistributionItem = { label: string; count: number; color: string };

const DISTRIBUTION_COLORS: Record<string, string> = {
  eligible: Colors.eligible,
  likely_eligible: Colors.primary,
  potential: Colors.warning,
  needs_review: Colors.statusIneligible,
};

const DEFAULT_DISTRIBUTION: DistributionItem[] = [
  { label: 'Eligible', count: 1, color: DISTRIBUTION_COLORS.eligible },
  { label: 'Likely Eligible', count: 1, color: DISTRIBUTION_COLORS.likely_eligible },
  { label: 'Potential', count: 1, color: DISTRIBUTION_COLORS.potential },
  { label: 'Needs Review', count: 6, color: DISTRIBUTION_COLORS.needs_review },
];

// ── Trial enrollment ─────────────────────────────────────────────────────────
const TRIALS = [
  { id: 'KRAS-LUNG-301', enrolled: 165, target: 450 },
  { id: 'BRCA-TNBC-201', enrolled: 45, target: 600 },
  { id: 'BRAF-CRC-301', enrolled: 90, target: 300 },
  { id: 'MELANOMA-IO-101', enrolled: 30, target: 200 },
  { id: 'BRCA-PANC-201', enrolled: 20, target: 150 },
];

// ── Recent matches ───────────────────────────────────────────────────────────
const RECENT_MATCHES = [
  {
    score: 85,
    name: 'Non-Small Cell Lung C...',
    trial: 'KRAS-LUNG-301',
    status: 'Likely Eligible',
    statusColor: Colors.primary,
    statusBg: Colors.primaryLight,
    scoreBg: Colors.primaryLight,
    scoreColor: Colors.primary,
  },
  {
    score: 95,
    name: 'Triple-Negative Breast Cancer',
    trial: 'BRCA-TNBC-201',
    status: 'Eligible',
    statusColor: Colors.white,
    statusBg: Colors.eligible,
    scoreBg: Colors.statusEligibleLight,
    scoreColor: Colors.success,
  },
  {
    score: 72,
    name: 'Metastatic Colorec...',
    trial: 'BRAF-CRC-301',
    status: 'Potentially Eligible',
    statusColor: Colors.white,
    statusBg: Colors.warning,
    scoreBg: Colors.statusPendingBg,
    scoreColor: Colors.potentialScore,
  },
  {
    score: 98,
    name: 'Advanced Melanoma',
    trial: 'MELANOMA-IO-101',
    status: 'Eligible',
    statusColor: Colors.white,
    statusBg: Colors.eligible,
    scoreBg: Colors.statusEligibleLight,
    scoreColor: Colors.success,
  },
];

// ── Action items ─────────────────────────────────────────────────────────────
const ACTION_ITEMS = [
  {
    Icon: CheckCircleIcon,
    iconBg: Colors.statusActiveBg,
    iconColor: Colors.success,
    borderColor: Colors.eligibleBorder,
    title: '3 Patients Ready for Referral',
    desc: 'High-confidence matches awaiting coordinator review',
    action: 'Review',
    backgroundColor: Colors.statusActiveBgLight,
  },
  {
    Icon: InfoIcon,
    iconBg: Colors.statusPendingBg,
    iconColor: Colors.potentialScore,
    borderColor: Colors.potentialBorder,
    title: '1 Match Needs Verification',
    desc: 'Conflicting biomarker data requires clinical review',
    action: 'Verify',
    backgroundColor: Colors.statusPendingBgLight,
  },
  {
    Icon: RecentIcon,
    iconBg: Colors.statusNeutralBg,
    iconColor: Colors.textBody,
    borderColor: Colors.inputBorder,
    title: '2 Trials Updated Eligibility',
    desc: 'Re-run matching for affected patients',
    action: 'Update',
    backgroundColor: Colors.statusNeutralBgLight,
  },
];

// Draws the donut using individual tick marks arranged in a circle.
// Each tick is a small rectangle rotated around its own center — no
// transform-origin or overflow:hidden tricks needed, so it works reliably.
const DonutSegments = ({
  size,
  stroke,
  distribution,
}: {
  size: number;
  stroke: number;
  distribution: DistributionItem[];
}) => {
  const TICK_COUNT = 180; // 2° per tick → tight smooth ring
  const R = (size - stroke) / 2; // radius to center of ring
  const cx = size / 2;
  const cy = size / 2;
  const TICK_W = 3;
  const TICK_H = stroke;
  const SPOKE_W = 4;
  const SPOKE_H = stroke + 6;

  // Compute start/end angles dynamically from distribution counts
  const total = distribution.reduce((s, d) => s + d.count, 0);

  // Guard: if total is 0 (loading / no data), render a plain grey ring
  if (total === 0) {
    return (
      <View
        style={{
          width: size,
          height: size,
          borderRadius: size / 2,
          borderWidth: stroke,
          borderColor: Colors.inputBorder,
        }}
      />
    );
  }

  type SegmentRange = { startDeg: number; endDeg: number; color: string };
  const segmentRanges: SegmentRange[] = [];
  let cursor = 0;
  distribution.forEach(seg => {
    const sweep = (seg.count / total) * 360;
    segmentRanges.push({
      startDeg: cursor,
      endDeg: cursor + sweep,
      color: seg.color,
    });
    cursor += sweep;
  });

  // Boundary angles are the start of each segment
  const boundaryAngles = segmentRanges.map(s => s.startDeg);

  const ticks: React.ReactElement[] = [];
  for (let i = 0; i < TICK_COUNT; i++) {
    const angleDeg = (i / TICK_COUNT) * 360;
    const angleRad = (angleDeg * Math.PI) / 180;

    // Find which segment this tick belongs to
    const seg = segmentRanges.find(
      s => angleDeg >= s.startDeg && angleDeg < s.endDeg,
    );
    const color = seg ? seg.color : segmentRanges[segmentRanges.length - 1].color;

    const x = cx + R * Math.sin(angleRad) - TICK_W / 2;
    const y = cy - R * Math.cos(angleRad) - TICK_H / 2;

    ticks.push(
      <View
        key={i}
        style={{
          position: 'absolute',
          width: TICK_W,
          height: TICK_H,
          left: x,
          top: y,
          backgroundColor: color,
          borderRadius: 1,
          transform: [{ rotate: `${angleDeg}deg` }],
        }}
      />,
    );
  }

  // White spokes at each boundary — same pixel width at inner & outer edge
  const spokes = boundaryAngles.map(angle => {
    const rad = (angle * Math.PI) / 180;
    const x = cx + R * Math.sin(rad) - SPOKE_W / 2;
    const y = cy - R * Math.cos(rad) - SPOKE_H / 2;
    return (
      <View
        key={`spoke-${angle}`}
        style={{
          position: 'absolute',
          width: SPOKE_W,
          height: SPOKE_H,
          left: x,
          top: y,
          backgroundColor: Colors.white,
          transform: [{ rotate: `${angle}deg` }],
        }}
      />
    );
  });

  return (
    <View style={{ width: size, height: size }}>
      {ticks}
      {spokes}
    </View>
  );
};

// ── Dashed grid line ──────────────────────────────────────────────────────────
const DashedLine = ({ height }: { height: number }) => {
  const dashH = 4;
  const gapH = 4;
  const count = Math.ceil(height / (dashH + gapH));
  return (
    <View style={{ width: 1, height, overflow: 'hidden' }}>
      {Array.from({ length: count }, (_, i) => (
        <View
          key={i}
          style={{ width: 1, height: dashH, backgroundColor: Colors.roleCardBorder, marginBottom: gapH }}
        />
      ))}
    </View>
  );
};

// ── Enrollment bar ────────────────────────────────────────────────────────────

const EnrollmentBar = ({
  trial,
  index,
  isActive,
  onPress,
}: {
  trial: (typeof TRIALS)[0];
  index: number;
  isActive: boolean;
  onPress: (y: number) => void;
}) => {
  const enrolledW = (trial.enrolled / MAX_CHART_VALUE) * BAR_AREA_WIDTH;
  const targetW = (trial.target / MAX_CHART_VALUE) * BAR_AREA_WIDTH;

  return (
    <View style={styles.barRow}>
      <Text style={styles.barLabel}>{trial.id}</Text>
      <Pressable
        onPress={() => onPress(index * BAR_ROW_HEIGHT)}
        style={({ pressed }) => [
          styles.barStack,
          isActive && { backgroundColor: Colors.barSelected, borderRadius: 4 },
          { opacity: pressed ? 0.8 : 1 },
        ]}>
        {/* Enrolled bar (teal) — top */}
        <View style={[styles.barEnrolled, { width: enrolledW }]} />
        {/* Target bar (grey) — bottom */}
        <View style={[styles.barTarget, { width: targetW }]} />
      </Pressable>
    </View>
  );
};

// ── Main screen ───────────────────────────────────────────────────────────────
const DashboardScreen = ({ navigation }: DashboardScreenProps) => {
  const insets = useSafeAreaInsets();
  const [distribution, setDistribution] = useState<DistributionItem[]>(DEFAULT_DISTRIBUTION);
  const [enrollChartHeight, setEnrollChartHeight] = useState(0);
  const [activeTrial, setActiveTrial] = useState<{ trial: (typeof TRIALS)[0]; y: number } | null>(null);

  useEffect(() => {
    api
      .get<{ eligible: number; likely_eligible: number; potential: number; needs_review: number }>(
        '/dashboard/match-distribution',
      )
      .then(res => {
        setDistribution([
          { label: 'Eligible', count: res.data.eligible, color: DISTRIBUTION_COLORS.eligible },
          { label: 'Likely Eligible', count: res.data.likely_eligible, color: DISTRIBUTION_COLORS.likely_eligible },
          { label: 'Potential', count: res.data.potential, color: DISTRIBUTION_COLORS.potential },
          { label: 'Needs Review', count: res.data.needs_review, color: DISTRIBUTION_COLORS.needs_review },
        ]);
      })
      .catch(() => {
        // Keep default distribution on error
      });
  }, []);

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Header */}
      <AppHeader />

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={GlobalStyles.headerCenter}>
          <Text style={GlobalStyles.headerTitle}>TrialMatch Dashboard</Text>
          <Text style={GlobalStyles.headerSub}>
            AI-powered patient-to-trial matching with explainable results
          </Text>
        </View>
        <Pressable onPress={() => setActiveTrial(null)}>
          {/* Take a Tour */}
          {/* <TouchableOpacity style={styles.tourButton} activeOpacity={0.8}>
          <Text style={styles.tourIcon}>?</Text>
          <Text style={styles.tourText}>Take a Tour</Text>
        </TouchableOpacity> */}

          {/* Stat Cards */}
          {STAT_CARDS.map(card => (
            <View key={card.label} style={styles.statCard}>
              <View style={styles.statCardLeft}>
                <Text style={styles.statCardLabel}>{card.label}</Text>
                <Text style={styles.statCardValue}>{card.value}</Text>
                {card.subLabel && <Text style={styles.statSubLabel}>{card.subLabel}</Text>}
                <View style={styles.statTrendRow}>
                  {card.trendUp === true && <TrendingIcon width={16} height={16} stroke={Colors.success} />}
                  {card.trendUp === null && <Text style={styles.trendFlat}>—</Text>}
                  <Text
                    style={[
                      styles.trendText,
                      card.trendUp === true
                        ? styles.trendUp
                        : card.trendUp === false
                          ? styles.trendDown
                          : styles.trendNeutral,
                    ]}>
                    {card.trend}
                  </Text>
                  <Text style={styles.trendLabel}> {card.trendLabel}</Text>
                </View>
              </View>
              <View style={[GlobalStyles.statIconBox, { backgroundColor: card.iconBg }]}>
                <card.Icon width={24} height={24} stroke={card.iconColor} />
              </View>
            </View>
          ))}

          {/* Match Distribution */}
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Match Distribution</Text>
            {/* Labels above chart */}
            <Text style={[styles.distLabel, { color: distribution[0].color, textAlign: 'center' }]}>
              {distribution[0].label}: {distribution[0].count}
            </Text>
            <View style={styles.distChartArea}>
              <Text style={[styles.distLabel, { color: distribution[1].color, flex: 1 }]}>
                {distribution[1].label}: {distribution[1].count}
              </Text>
              <DonutSegments size={120} stroke={20} distribution={distribution} />
              <View style={{ flex: 1, alignItems: 'flex-end' }}>
                <Text style={[styles.distLabel, { color: distribution[3].color }]}>
                  {distribution[3].label}: {distribution[3].count}
                </Text>
                <Text style={[styles.distLabel, { color: distribution[2].color, textAlign: 'right', marginRight: 32, marginTop: 24 }]}>
                  {distribution[2].label}: {distribution[2].count}
                </Text>
              </View>
            </View>

            {/* Legend */}
            <View style={styles.legendRow}>
              {distribution.map(seg => (
                <View key={seg.label} style={styles.legendItem}>
                  <View style={[styles.legendDot, { backgroundColor: seg.color }]} />
                  <Text style={styles.legendText}>{seg.label}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Trial Enrollment Progress */}
          <View style={styles.card}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Trial Enrollment Progress</Text>
              <Pressable style={styles.viewAllBtn}>
                <Text style={styles.viewAllText}>View All</Text>
                <RightArrowIcon width={12} height={12} stroke={Colors.textMuted} style={{ marginLeft: 4 }} />
              </Pressable>
            </View>
            <View
              onLayout={e => setEnrollChartHeight(e.nativeEvent.layout.height)}
              style={{ position: 'relative' }}>
              {/* Thick left + bottom axis lines */}
              <View
                style={{
                  position: 'absolute',
                  left: CHART_LABEL_WIDTH,
                  top: 0,
                  right: 0,
                  bottom: 0,
                  borderLeftWidth: 2,
                  borderBottomWidth: 2,
                  borderColor: Colors.textMuted,
                }}
                pointerEvents="none"
              />
              {/* Dashed vertical gridlines */}
              {enrollChartHeight > 0 && (
                <View
                  style={{
                    position: 'absolute',
                    left: CHART_LABEL_WIDTH,
                    top: 0,
                    right: 0,
                    height: enrollChartHeight,
                  }}
                  pointerEvents="none">
                  {CHART_X_VALUES.filter(v => v > 0).map(v => (
                    <View
                      key={v}
                      style={{
                        position: 'absolute',
                        left: (v / MAX_CHART_VALUE) * BAR_AREA_WIDTH,
                        top: 0,
                      }}>
                      <DashedLine height={enrollChartHeight} />
                    </View>
                  ))}
                </View>
              )}
              {TRIALS.map((trial, index) => (
                <EnrollmentBar
                  key={trial.id}
                  trial={trial}
                  index={index}
                  isActive={activeTrial?.trial.id === trial.id}
                  onPress={y =>
                    setActiveTrial(prev =>
                      prev?.trial.id === trial.id ? null : { trial, y },
                    )
                  }
                />
              ))}
              {/* Tooltip — last child so it renders on top of bars */}
              {activeTrial && (
                <View
                  style={[
                    styles.tooltip,
                    { top: Math.min(activeTrial.y, enrollChartHeight - 80) },
                  ]}
                  pointerEvents="none">
                  <Text style={styles.tooltipTitle}>{activeTrial.trial.id}</Text>
                  <Text style={styles.tooltipEnrolled}>Enrolled : {activeTrial.trial.enrolled}</Text>
                  <Text style={styles.tooltipTarget}>Target : {activeTrial.trial.target}</Text>
                </View>
              )}
            </View>
            {/* X-axis labels */}
            <View style={styles.xAxis}>
              {CHART_X_VALUES.map(v => (
                <Text key={v} style={styles.xAxisLabel}>
                  {v}
                </Text>
              ))}
            </View>
          </View>

          {/* Recent Matches */}
          <View style={styles.card}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Recent Matches</Text>
              <Pressable style={styles.viewAllBtn}>
                <Text style={styles.viewAllText}>View All</Text>
                <RightArrowIcon width={12} height={12} stroke={Colors.textMuted} style={{ marginLeft: 4 }} />
              </Pressable>
            </View>
            {RECENT_MATCHES.map((match, i) => (
              <Pressable key={i} style={({ pressed }) => [styles.matchRow, { opacity: pressed ? 0.7 : 1 }]}>
                <View style={[styles.scoreBox, { backgroundColor: match.scoreBg }]}>
                  <Text style={[styles.scoreText, { color: match.scoreColor }]}>{match.score}%</Text>
                </View>
                <View style={styles.matchInfo}>
                  <Text style={styles.matchName}>{match.name}</Text>
                  <Text style={styles.matchTrial}>→ {match.trial}</Text>
                </View>
                <View style={[styles.statusBadge, { backgroundColor: match.statusBg }]}>
                  <Text style={[styles.statusText, { color: match.statusColor }]}>{match.status}</Text>
                </View>
              </Pressable>
            ))}
          </View>

          {/* Action Items */}
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Action Items</Text>
            {ACTION_ITEMS.map((item, i) => (
              <View
                key={i}
                style={[styles.actionRow, { borderColor: item.borderColor, borderWidth: 1, backgroundColor: item.backgroundColor }]}>
                <View style={[styles.actionIconBox, { backgroundColor: item.iconBg }]}>
                  <item.Icon width={16} height={16} stroke={item.iconColor} />
                </View>
                <View style={styles.actionContent}>
                  <Text style={styles.actionTitle}>{item.title}</Text>
                  <Text style={styles.actionDesc}>{item.desc}</Text>
                </View>
                <Pressable>
                  <Text style={styles.actionBtn}>{item.action}</Text>
                </Pressable>
              </View>
            ))}
          </View>
        </Pressable>
      </ScrollView>
    </View>
  );
};


export default DashboardScreen;
