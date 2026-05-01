import { StyleSheet } from 'react-native';
import { Colors } from '../../../constants/theme';

export const styles = StyleSheet.create({
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  patientName: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  patientDescription: {
    fontSize: 13,
    color: Colors.textSecondary,
    marginTop: 4,
    flexWrap: 'wrap',
    marginRight: 40,
  },
  ecogBadge: {
    backgroundColor: Colors.success,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  ecogText: {
    fontSize: 12,
    color: Colors.white,
  },
  metaRow: {
    flexDirection: 'row',
    marginTop: 6,
    alignItems: 'flex-start',
  },
  metaItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 6,
  },
  metaText: {
    fontSize: 12,
    color: Colors.textMuted,
    marginLeft: 4,
  },
  markerRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginTop: 10,
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  badgePos: {
    backgroundColor: Colors.primaryLight,
  },
  badgeNeg: {
    backgroundColor: Colors.negativeTagBg,
  },
  badgeText: {
    fontSize: 12,
  },
  badgeTextPos: {
    color: Colors.primary,
  },
  badgeTextNeg: {
    color: Colors.negativeTagText,
  },
  divider: {
    marginTop: 16,
    backgroundColor: Colors.inputBorder,
    height: 1,
  },
  trialsFooter: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  trialsLeft: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  trialsText: {
    fontSize: 12,
    color: Colors.primary,
    marginLeft: 4,
  },
});
