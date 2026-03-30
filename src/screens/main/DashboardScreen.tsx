import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
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

// ── Stat cards ──────────────────────────────────────────────────────────────
const STAT_CARDS = [
  {
    label: 'Patients Screened',
    value: '5',
    trend: '+12%',
    trendLabel: 'vs last month',
    trendUp: true,
    iconBg: '#EBF5F8',
    iconColor: Colors.primary,
    icon: '👥',
  },
  {
    label: 'Active Trials',
    value: '5',
    trend: '0%',
    trendLabel: 'vs last month',
    trendUp: null,
    iconBg: '#EBF5F8',
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
    iconBg: '#EBF5F8',
    iconColor: Colors.primary,
    icon: '✓',
  },
  {
    label: 'Avg Match Score',
    value: '88%',
    trend: '+5%',
    trendLabel: 'vs last month',
    trendUp: true,
    iconBg: '#EBF5F8',
    iconColor: Colors.primary,
    icon: '◎',
  },
];

// ── Donut chart types & color map ────────────────────────────────────────────
type DistributionItem = {label: string; count: number; color: string};

const DISTRIBUTION_COLORS: Record<string, string> = {
  eligible: '#2BAE66',
  likely_eligible: '#127DA1',
  potential: '#F8A007',
  needs_review: '#E5484D',
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
const MAX_TARGET = Math.max(...TRIALS.map(t => t.target));

// ── Recent matches ───────────────────────────────────────────────────────────
const RECENT_MATCHES = [
  {
    score: 85,
    name: 'Non-Small Cell Lung C...',
    trial: 'KRAS-LUNG-301',
    status: 'Likely Eligible',
    statusColor: '#127DA1',
    statusBg: '#EBF5F8',
    scoreBg: '#EBF5F8',
    scoreColor: '#127DA1',
  },
  {
    score: 95,
    name: 'Triple-Negative Breast Cancer',
    trial: 'BRCA-TNBC-201',
    status: 'Eligible',
    statusColor: '#fff',
    statusBg: '#2BAE66',
    scoreBg: '#D1FAE5',
    scoreColor: '#1FAD7D',
  },
  {
    score: 72,
    name: 'Metastatic Colorec...',
    trial: 'BRAF-CRC-301',
    status: 'Potentially Eligible',
    statusColor: '#fff',
    statusBg: '#F8A007',
    scoreBg: '#FEF3C7',
    scoreColor: '#D97706',
  },
  {
    score: 98,
    name: 'Advanced Melanoma',
    trial: 'MELANOMA-IO-101',
    status: 'Eligible',
    statusColor: '#fff',
    statusBg: '#2BAE66',
    scoreBg: '#D1FAE5',
    scoreColor: '#1FAD7D',
  },
];

// ── Action items ─────────────────────────────────────────────────────────────
const ACTION_ITEMS = [
  {
    icon: '✓',
    iconBg: '#D1FAE5',
    iconColor: '#1FAD7D',
    borderColor: '#A7F3D0',
    title: '3 Patients Ready for Referral',
    desc: 'High-confidence matches awaiting coordinator review',
    action: 'Review',
  },
  {
    icon: '!',
    iconBg: '#FEF3C7',
    iconColor: '#D97706',
    borderColor: '#FDE68A',
    title: '1 Match Needs Verification',
    desc: 'Conflicting biomarker data requires clinical review',
    action: 'Verify',
  },
  {
    icon: '⏰',
    iconBg: '#F1F5F9',
    iconColor: '#64748B',
    borderColor: '#E2E8F0',
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

// ── Tooltip state ─────────────────────────────────────────────────────────────
const EnrollmentBar = ({trial}: {trial: (typeof TRIALS)[0]}) => {
  const [showTip, setShowTip] = useState(false);
  const BAR_WIDTH = SCREEN_WIDTH - 140;
  const enrolledW = (trial.enrolled / MAX_TARGET) * BAR_WIDTH;
  const targetW = (trial.target / MAX_TARGET) * BAR_WIDTH;

  return (
    <View style={styles.barRow}>
      <Text style={styles.barLabel}>{trial.id}</Text>
      <View style={styles.barTrack}>
        {/* Target bar (grey) */}
        <View style={[styles.barTarget, {width: targetW}]} />
        {/* Enrolled bar (teal) */}
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => setShowTip(v => !v)}
          style={[styles.barEnrolled, {width: enrolledW}]}
        />
        {showTip && (
          <View style={styles.tooltip}>
            <Text style={styles.tooltipTitle}>{trial.id}</Text>
            <Text style={styles.tooltipEnrolled}>Enrolled : {trial.enrolled}</Text>
            <Text style={styles.tooltipTarget}>Target : {trial.target}</Text>
          </View>
        )}
      </View>
    </View>
  );
};

// ── Main screen ───────────────────────────────────────────────────────────────
const DashboardScreen = ({navigation}: DashboardScreenProps) => {
  const [distribution, setDistribution] = useState<DistributionItem[]>(DEFAULT_DISTRIBUTION);

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
          {TRIALS.map(trial => (
            <EnrollmentBar key={trial.id} trial={trial} />
          ))}
          {/* X-axis labels */}
          <View style={styles.xAxis}>
            {[0, 150, 300, 450, 600].map(v => (
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
    shadowColor: '#000',
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
    shadowColor: '#000',
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
    marginBottom: 10,
  },
  barLabel: {
    width: 110,
    fontSize: 10,
    color: Colors.textBody,
    textAlign: 'right',
    paddingRight: 8,
  },
  barTrack: {
    flex: 1,
    position: 'relative',
    height: 20,
    justifyContent: 'center',
  },
  barTarget: {
    position: 'absolute',
    height: 10,
    backgroundColor: '#E2E8F0',
    borderRadius: 5,
    top: 5,
  },
  barEnrolled: {
    position: 'absolute',
    height: 14,
    backgroundColor: Colors.primary,
    borderRadius: 5,
    top: 3,
  },
  tooltip: {
    position: 'absolute',
    top: 20,
    left: 20,
    backgroundColor: Colors.white,
    borderRadius: 10,
    padding: 10,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 8,
    shadowOffset: {width: 0, height: 3},
    elevation: 6,
    zIndex: 99,
    minWidth: 150,
  },
  tooltipTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.textHeading,
    marginBottom: 4,
  },
  tooltipEnrolled: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.primary,
  },
  tooltipTarget: {
    fontSize: 13,
    color: Colors.textMuted,
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
