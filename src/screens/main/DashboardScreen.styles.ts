import {Dimensions, StyleSheet} from 'react-native';
import {Colors} from '../../constants/theme';


const {width: SCREEN_WIDTH} = Dimensions.get('window');

export const MAX_CHART_VALUE = 600;
export const BAR_AREA_WIDTH = SCREEN_WIDTH - 174;
export const CHART_LABEL_WIDTH = 110;
export const CHART_X_VALUES = [0, 150, 300, 450, 600];
export const BAR_ROW_HEIGHT = 36;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundPage,
  },
  // ── Header ────────────────────────────────────────────────────
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
    padding: 8,
    paddingBottom: 20,
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
    padding: 12,
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
    shadowColor: Colors.black,
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
    marginLeft: 4,
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
    width: 48,
    height: 48,
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
    shadowColor: Colors.black,
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
  viewAllBtn: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewAllText: {
    fontSize: 13,
    color: Colors.textBody,
    fontWeight: '500',
  },
  // ── Donut distribution ────────────────────────────────────────
  distLabel: {
    fontSize: 12,
    fontWeight: '400',
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
    height: 16,
    backgroundColor: Colors.inputBorder,
    borderTopRightRadius: 2,
    borderBottomRightRadius: 2,
  },
  barEnrolled: {
    height: 16,
    backgroundColor: Colors.primary,
    borderTopRightRadius: 2,
    borderBottomRightRadius: 2,
  },
  tooltip: {
    position: 'absolute',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 8,
    shadowColor: Colors.black,
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
    width: 32,
    height: 32,
    borderRadius: 8,
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
