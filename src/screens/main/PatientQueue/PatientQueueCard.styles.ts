import { StyleSheet } from 'react-native';
import { Colors } from '../../../constants/theme';

const RING_SIZE = 72;
const STROKE = 6;
const RADIUS = (RING_SIZE - STROKE) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export { RING_SIZE, STROKE, RADIUS, CIRCUMFERENCE };

export const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 16,
    gap: 10,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  patientId: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.textHeading,
  },
  stageBadge: {
    paddingHorizontal: 14,
    paddingVertical: 5,
    borderRadius: 20,
  },
  stageText: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.white,
  },
  diagnosis: {
    fontSize: 13,
    color: Colors.textBody,
    lineHeight: 18,
  },
  ringContainer: {
    width: RING_SIZE,
    height: RING_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ringAbsolute: {
    position: 'absolute',
  },
  ringScore: {
    fontSize: 20,
    fontWeight: '700',
  },
  scoreRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginTop: 4,
  },
  metaBlock: {
    flex: 1,
  },
  metaLabel: {
    fontSize: 13,
    color: Colors.textMuted,
  },
  metaValue: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.textHeading,
  },
  completenessRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  completenessLabel: {
    fontSize: 12,
    color: Colors.textMuted,
  },
  completenessPercent: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.textHeading,
  },
  progressTrack: {
    height: 6,
    backgroundColor: Colors.inputBorder,
    borderRadius: 3,
    marginTop: -4,
  },
  progressFill: {
    height: 6,
    backgroundColor: Colors.primary,
    borderRadius: 3,
  },
  markerRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  marker: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  markerPos: { backgroundColor: Colors.primaryLight },
  markerNeg: { backgroundColor: Colors.negativeTagBg },
  markerText: { fontSize: 12, fontWeight: '500' },
  markerTextPos: { color: Colors.primary },
  markerTextNeg: { color: Colors.negativeTagText },
  investigateBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.warning,
    backgroundColor: Colors.statusPendingBg,
  },
  investigateIcon: {
    fontSize: 11,
    color: Colors.warning,
  },
  investigateText: {
    fontSize: 11,
    fontWeight: '600',
    color: Colors.warning,
    letterSpacing: 0.3,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.inputBorder,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  reviewBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.inputBorder,
  },
  reviewText: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.textHeading,
  },
  flagBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  flagIcon: {
    fontSize: 14,
    color: Colors.warning,
  },
  flagText: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.warning,
  },
});
