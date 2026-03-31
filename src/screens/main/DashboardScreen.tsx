import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Pressable,
  Dimensions,
} from 'react-native';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {DrawerParamList} from '../../types/navigation';
import {Colors} from '../../constants/theme';
import {api} from '../../utils/api';

type DashboardScreenProps = {
  navigation: DrawerNavigationProp<DrawerParamList, 'Dashboard'>;
};

const {width: SCREEN_WIDTH} = Dimensions.get('window');

// ── Dashboard color palette ──────────────────────────────────────────────────
const DC = {
  // Status
  eligible:        '#2BAE66',
  eligibleBg:      '#D1FAE5',
  eligibleScore:   '#1FAD7D',
  likelyEligible:  '#127DA1',
  likelyBg:        '#EBF5F8',
  potential:       '#F8A007',
  potentialBg:     '#FEF3C7',
  potentialScore:  '#D97706',
  potentialBorder: '#FDE68A',
  needsReview:     '#E5484D',
  // Neutral
  iconBg:          '#EBF5F8',
  actionNeutralBg: '#F1F5F9',
  actionNeutralIcon:'#64748B',
  actionNeutralBorder:'#E2E8F0',
  eligibleBorder:  '#A7F3D0',
  // Chart
  barTargetBg:     '#E2E8F0',
  gridLine:        '#CBD5E1',
  axisLine:        '#94A3B8',
  barSelected:     '#CCCCCC',
  // Common
  white:           '#fff',
  shadow:          '#000',
};

// ── Stat cards ──────────────────────────────────────────────────────────────
const STAT_CARDS = [
  {
    label: 'Patients Screened',
    value: '5',
    trend: '+12%',
    trendLabel: 'vs last month',
    trendUp: true,
    iconBg: DC.iconBg,
    iconColor: Colors.primary,
    icon: '👥',
  },
  {
    label: 'Active Trials',
    value: '5',
    trend: '0%',
    trendLabel: 'vs last month',
    trendUp: null,
    iconBg: DC.iconBg,
    iconColor: Colors.primary,
    icon: '⚗',
  },
  {
    label: 'Eligible Matches',
    value: '3',
    trend: '+25%',
    trendLabel: 'vs last month',
    trendUp: true,
    subLabel: '+1 likely eligible',
    iconBg: DC.iconBg,
    iconColor: Colors.primary,
    icon: '✓',
  },
  {
    label: 'Avg Match Score',
    value: '88%',
    trend: '+5%',
    trendLabel: 'vs last month',
    trendUp: true,
    iconBg: DC.iconBg,
    iconColor: Colors.primary,
    icon: '◎',
  },
];

// ── Donut chart types & color map ────────────────────────────────────────────
type DistributionItem = {label: string; count: number; color: string};

const DISTRIBUTION_COLORS: Record<string, string> = {
  eligible: DC.eligible,
  likely_eligible: DC.likelyEligible,
  potential: DC.potential,
  needs_review: DC.needsReview,
};

const DEFAULT_DISTRIBUTION: DistributionItem[] = [
  {label: 'Eligible', count: 1, color: DISTRIBUTION_COLORS.eligible},
  {label: 'Likely Eligible', count: 1, color: DISTRIBUTION_COLORS.likely_eligible},
  {label: 'Potential', count: 1, color: DISTRIBUTION_COLORS.potential},
  {label: 'Needs Review', count: 6, color: DISTRIBUTION_COLORS.needs_review},
];

// ── Trial enrollment ─────────────────────────────────────────────────────────
const TRIALS = [
  {id: 'KRAS-LUNG-301', enrolled: 165, target: 450},
  {id: 'BRCA-TNBC-201', enrolled: 45, target: 600},
  {id: 'BRAF-CRC-301', enrolled: 90, target: 300},
  {id: 'MELANOMA-IO-101', enrolled: 30, target: 200},
  {id: 'BRCA-PANC-201', enrolled: 20, target: 150},
];
const MAX_CHART_VALUE = 600;
// content padding (16*2) + card padding (16*2) + label width (110) = 174
const BAR_AREA_WIDTH = SCREEN_WIDTH - 174;
// label width only — paddingRight is internal, bars start right at 110
const CHART_LABEL_WIDTH = 110;
const CHART_X_VALUES = [0, 150, 300, 450, 600];

// ── Recent matches ───────────────────────────────────────────────────────────
const RECENT_MATCHES = [
  {
    score: 85,
    name: 'Non-Small Cell Lung C...',
    trial: 'KRAS-LUNG-301',
    status: 'Likely Eligible',
    statusColor: DC.likelyEligible,
    statusBg: DC.likelyBg,
    scoreBg: DC.likelyBg,
    scoreColor: DC.likelyEligible,
  },
  {
    score: 95,
    name: 'Triple-Negative Breast Cancer',
    trial: 'BRCA-TNBC-201',
    status: 'Eligible',
    statusColor: DC.white,
    statusBg: DC.eligible,
    scoreBg: DC.eligibleBg,
    scoreColor: DC.eligibleScore,
  },
  {
    score: 72,
    name: 'Metastatic Colorec...',
    trial: 'BRAF-CRC-301',
    status: 'Potentially Eligible',
    statusColor: DC.white,
    statusBg: DC.potential,
    scoreBg: DC.potentialBg,
    scoreColor: DC.potentialScore,
  },
  {
    score: 98,
    name: 'Advanced Melanoma',
    trial: 'MELANOMA-IO-101',
    status: 'Eligible',
    statusColor: DC.white,
    statusBg: DC.eligible,
    scoreBg: DC.eligibleBg,
    scoreColor: DC.eligibleScore,
  },
];

// ── Action items ─────────────────────────────────────────────────────────────
const ACTION_ITEMS = [
  {
    icon: '✓',
    iconBg: DC.eligibleBg,
    iconColor: DC.eligibleScore,
    borderColor: DC.eligibleBorder,
    title: '3 Patients Ready for Referral',
    desc: 'High-confidence matches awaiting coordinator review',
    action: 'Review',
  },
  {
    icon: '!',
    iconBg: DC.potentialBg,
    iconColor: DC.potentialScore,
    borderColor: DC.potentialBorder,
    title: '1 Match Needs Verification',
    desc: 'Conflicting biomarker data requires clinical review',
    action: 'Verify',
  },
  {
    icon: '⏰',
    iconBg: DC.actionNeutralBg,
    iconColor: DC.actionNeutralIcon,
    borderColor: DC.actionNeutralBorder,
    title: '2 Trials Updated Eligibility',
    desc: 'Re-run matching for affected patients',
    action: 'Update',
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

  type SegmentRange = {startDeg: number; endDeg: number; color: string};
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

  const ticks: JSX.Element[] = [];
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
          transform: [{rotate: `${angleDeg}deg`}],
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
          transform: [{rotate: `${angle}deg`}],
        }}
      />
    );
  });

  return (
    <View style={{width: size, height: size}}>
      {ticks}
      {spokes}
    </View>
  );
};

// ── Dashed grid line ──────────────────────────────────────────────────────────
const DashedLine = ({height}: {height: number}) => {
  const dashH = 4;
  const gapH = 4;
  const count = Math.ceil(height / (dashH + gapH));
  return (
    <View style={{width: 1, height, overflow: 'hidden'}}>
      {Array.from({length: count}, (_, i) => (
        <View
          key={i}
          style={{width: 1, height: dashH, backgroundColor: DC.gridLine, marginBottom: gapH}}
        />
      ))}
    </View>
  );
};

// ── Enrollment bar ────────────────────────────────────────────────────────────
const BAR_ROW_HEIGHT = 36; // barStack(24) + marginBottom(12)

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
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => onPress(index * BAR_ROW_HEIGHT)}
        style={[styles.barStack, isActive && {backgroundColor: DC.barSelected, borderRadius: 4}]}>
        {/* Enrolled bar (teal) — top */}
        <View style={[styles.barEnrolled, {width: enrolledW}]} />
        {/* Target bar (grey) — bottom */}
        <View style={[styles.barTarget, {width: targetW}]} />
      </TouchableOpacity>
    </View>
  );
};

// ── Main screen ───────────────────────────────────────────────────────────────
const DashboardScreen = ({navigation}: DashboardScreenProps) => {
  const [distribution, setDistribution] = useState<DistributionItem[]>(DEFAULT_DISTRIBUTION);
  const [enrollChartHeight, setEnrollChartHeight] = useState(0);
  const [activeTrial, setActiveTrial] = useState<{trial: (typeof TRIALS)[0]; y: number} | null>(null);

  useEffect(() => {
    api
      .get<{eligible: number; likely_eligible: number; potential: number; needs_review: number}>(
        '/dashboard/match-distribution',
      )
      .then(res => {
        setDistribution([
          {label: 'Eligible', count: res.data.eligible, color: DISTRIBUTION_COLORS.eligible},
          {label: 'Likely Eligible', count: res.data.likely_eligible, color: DISTRIBUTION_COLORS.likely_eligible},
          {label: 'Potential', count: res.data.potential, color: DISTRIBUTION_COLORS.potential},
          {label: 'Needs Review', count: res.data.needs_review, color: DISTRIBUTION_COLORS.needs_review},
        ]);
      })
      .catch(() => {
        // Keep default distribution on error
      });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.openDrawer()} style={styles.menuButton}>
          <Text style={styles.menuIcon}>☰</Text>
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>TrialMatch Dashboard</Text>
          <Text style={styles.headerSub}>
            AI-powered patient-to-trial matching with explainable results
          </Text>
        </View>
        <TouchableOpacity style={styles.notifButton}>
          <Text style={styles.notifIcon}>🔔</Text>
          <View style={styles.notifBadge} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Pressable onPress={() => setActiveTrial(null)}>
        {/* Take a Tour */}
        <TouchableOpacity style={styles.tourButton} activeOpacity={0.8}>
          <Text style={styles.tourIcon}>?</Text>
          <Text style={styles.tourText}>Take a Tour</Text>
        </TouchableOpacity>

        {/* Stat Cards */}
        {STAT_CARDS.map(card => (
          <View key={card.label} style={styles.statCard}>
            <View style={styles.statCardLeft}>
              <Text style={styles.statCardLabel}>{card.label}</Text>
              <Text style={styles.statCardValue}>{card.value}</Text>
              {card.subLabel && <Text style={styles.statSubLabel}>{card.subLabel}</Text>}
              <View style={styles.statTrendRow}>
                {card.trendUp === true && <Text style={styles.trendArrow}>↗</Text>}
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
            <View style={[styles.statIconBox, {backgroundColor: card.iconBg}]}>
              <Text style={[styles.statIcon, {color: card.iconColor}]}>{card.icon}</Text>
            </View>
          </View>
        ))}

        {/* Match Distribution */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Match Distribution</Text>
          {/* Labels above chart */}
          <Text style={[styles.distLabel, {color: distribution[0].color, textAlign: 'center'}]}>
            {distribution[0].label}: {distribution[0].count}
          </Text>
          <View style={styles.distChartArea}>
            <Text style={[styles.distLabel, {color: distribution[1].color, flex: 1}]}>
              {distribution[1].label}: {distribution[1].count}
            </Text>
            <DonutSegments size={120} stroke={20} distribution={distribution} />
            <View style={{flex: 1, alignItems: 'flex-end'}}>
              <Text style={[styles.distLabel, {color: distribution[3].color}]}>
                {distribution[3].label}
              </Text>
            </View>
          </View>
          <Text style={[styles.distLabel, {color: distribution[2].color, textAlign: 'right', marginRight: 32}]}>
            {distribution[2].label}: {distribution[2].count}
          </Text>

          {/* Legend */}
          <View style={styles.legendRow}>
            {distribution.map(seg => (
              <View key={seg.label} style={styles.legendItem}>
                <View style={[styles.legendDot, {backgroundColor: seg.color}]} />
                <Text style={styles.legendText}>{seg.label}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Trial Enrollment Progress */}
        <View style={styles.card}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Trial Enrollment Progress</Text>
            <TouchableOpacity style={styles.viewAllBtn}>
              <Text style={styles.viewAllText}>View All →</Text>
            </TouchableOpacity>
          </View>
          <View
            onLayout={e => setEnrollChartHeight(e.nativeEvent.layout.height)}
            style={{position: 'relative'}}>
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
                borderColor: DC.axisLine,
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
                    prev?.trial.id === trial.id ? null : {trial, y},
                  )
                }
              />
            ))}
            {/* Tooltip — last child so it renders on top of bars */}
            {activeTrial && (
              <View
                style={[
                  styles.tooltip,
                  {top: Math.min(activeTrial.y, enrollChartHeight - 80)},
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
            <TouchableOpacity style={styles.viewAllBtn}>
              <Text style={styles.viewAllText}>View All →</Text>
            </TouchableOpacity>
          </View>
          {RECENT_MATCHES.map((match, i) => (
            <TouchableOpacity key={i} style={styles.matchRow} activeOpacity={0.7}>
              <View style={[styles.scoreBox, {backgroundColor: match.scoreBg}]}>
                <Text style={[styles.scoreText, {color: match.scoreColor}]}>{match.score}%</Text>
              </View>
              <View style={styles.matchInfo}>
                <Text style={styles.matchName}>{match.name}</Text>
                <Text style={styles.matchTrial}>→ {match.trial}</Text>
              </View>
              <View style={[styles.statusBadge, {backgroundColor: match.statusBg}]}>
                <Text style={[styles.statusText, {color: match.statusColor}]}>{match.status}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Action Items */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Action Items</Text>
          {ACTION_ITEMS.map((item, i) => (
            <View
              key={i}
              style={[styles.actionRow, {borderColor: item.borderColor, borderWidth: 1}]}>
              <View style={[styles.actionIconBox, {backgroundColor: item.iconBg}]}>
                <Text style={[styles.actionIcon, {color: item.iconColor}]}>{item.icon}</Text>
              </View>
              <View style={styles.actionContent}>
                <Text style={styles.actionTitle}>{item.title}</Text>
                <Text style={styles.actionDesc}>{item.desc}</Text>
              </View>
              <TouchableOpacity>
                <Text style={styles.actionBtn}>{item.action}</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundPage,
  },
  // ── Header ────────────────────────────────────────────────────
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: Colors.white,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.inputBorder,
  },
  menuButton: {
    width: 36,
    height: 36,
    justifyContent: 'center',
    marginTop: 2,
  },
  menuIcon: {
    fontSize: 22,
    color: Colors.textHeading,
  },
  headerCenter: {
    flex: 1,
    paddingHorizontal: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.textHeading,
  },
  headerSub: {
    fontSize: 12,
    color: Colors.textBody,
    lineHeight: 17,
    marginTop: 2,
  },
  notifButton: {
    position: 'relative',
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 2,
  },
  notifIcon: {
    fontSize: 22,
  },
  notifBadge: {
    position: 'absolute',
    top: 4,
    right: 4,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.notificationBadge,
  },
  // ── Content ───────────────────────────────────────────────────
  content: {
    padding: 16,
    paddingBottom: 40,
  },
  // ── Tour button ───────────────────────────────────────────────
  tourButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    borderWidth: 1.5,
    borderColor: Colors.inputBorder,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: Colors.white,
    marginBottom: 16,
    gap: 8,
  },
  tourIcon: {
    fontSize: 16,
    color: Colors.textBody,
    fontWeight: '700',
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: Colors.textBody,
    textAlign: 'center',
    lineHeight: 18,
  },
  tourText: {
    fontSize: 14,
    color: Colors.textHeading,
    fontWeight: '500',
  },
  // ── Stat cards ────────────────────────────────────────────────
  statCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
    shadowColor: DC.shadow,
    shadowOpacity: 0.04,
    shadowRadius: 6,
    shadowOffset: {width: 0, height: 2},
    elevation: 1,
  },
  statCardLeft: {
    flex: 1,
  },
  statCardLabel: {
    fontSize: 13,
    color: Colors.textBody,
    marginBottom: 4,
  },
  statCardValue: {
    fontSize: 36,
    fontWeight: '700',
    color: Colors.textHeading,
    lineHeight: 42,
  },
  statSubLabel: {
    fontSize: 12,
    color: Colors.textBody,
    marginTop: 2,
  },
  statTrendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  trendArrow: {
    fontSize: 14,
    color: Colors.success,
    marginRight: 2,
  },
  trendFlat: {
    fontSize: 14,
    color: Colors.textBody,
    marginRight: 4,
  },
  trendText: {
    fontSize: 13,
    fontWeight: '600',
  },
  trendUp: {
    color: Colors.success,
  },
  trendDown: {
    color: Colors.danger,
  },
  trendNeutral: {
    color: Colors.textBody,
  },
  trendLabel: {
    fontSize: 12,
    color: Colors.textMuted,
  },
  statIconBox: {
    width: 52,
    height: 52,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statIcon: {
    fontSize: 24,
  },
  // ── Card wrapper ──────────────────────────────────────────────
  card: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: DC.shadow,
    shadowOpacity: 0.04,
    shadowRadius: 6,
    shadowOffset: {width: 0, height: 2},
    elevation: 1,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.textHeading,
    marginBottom: 12,
  },
  viewAllBtn: {},
  viewAllText: {
    fontSize: 13,
    color: Colors.textBody,
    fontWeight: '500',
  },
  // ── Donut distribution ────────────────────────────────────────
  distLabel: {
    fontSize: 12,
    fontWeight: '600',
  },
  distChartArea: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 8,
  },
  legendRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 10,
    marginTop: 12,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  legendText: {
    fontSize: 11,
    color: Colors.textBody,
  },
  // ── Enrollment bars ───────────────────────────────────────────
  barRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  barLabel: {
    width: 110,
    fontSize: 10,
    color: Colors.textBody,
    textAlign: 'right',
    paddingRight: 8,
  },
  barStack: {
    flex: 1,
    gap: 4,
    paddingLeft: 2,
  },
  barTarget: {
    height: 10,
    backgroundColor: DC.barTargetBg,
    borderTopRightRadius: 2,
    borderBottomRightRadius: 2,
  },
  barEnrolled: {
    height: 10,
    backgroundColor: Colors.primary,
    borderTopRightRadius: 2,
    borderBottomRightRadius: 2,
  },
  tooltip: {
    position: 'absolute',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 8,
    shadowColor: DC.shadow,
    shadowOpacity: 0.12,
    shadowRadius: 6,
    shadowOffset: {width: 0, height: 3},
    elevation: 8,
    zIndex: 99,
    minWidth: 130,
  },
  tooltipTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.textHeading,
    marginBottom: 3,
  },
  tooltipEnrolled: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.primary,
    marginBottom: 1,
  },
  tooltipTarget: {
    fontSize: 13,
    fontWeight: '400',
    color: Colors.textMuted,
    opacity: 0.5,
  },
  xAxis: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 110,
    marginTop: 4,
  },
  xAxisLabel: {
    fontSize: 9,
    color: Colors.textMuted,
  },
  // ── Recent matches ────────────────────────────────────────────
  matchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.inputBorder,
    gap: 10,
  },
  scoreBox: {
    width: 52,
    height: 52,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scoreText: {
    fontSize: 14,
    fontWeight: '700',
  },
  matchInfo: {
    flex: 1,
  },
  matchName: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.textHeading,
    marginBottom: 2,
  },
  matchTrial: {
    fontSize: 12,
    color: Colors.textMuted,
  },
  statusBadge: {
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '600',
  },
  // ── Action items ──────────────────────────────────────────────
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
    gap: 12,
    backgroundColor: Colors.white,
  },
  actionIconBox: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionIcon: {
    fontSize: 18,
    fontWeight: '700',
  },
  actionContent: {
    flex: 1,
  },
  actionTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.textHeading,
    marginBottom: 2,
  },
  actionDesc: {
    fontSize: 11,
    color: Colors.textMuted,
    lineHeight: 16,
  },
  actionBtn: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.textHeading,
  },
});

export default DashboardScreen;
