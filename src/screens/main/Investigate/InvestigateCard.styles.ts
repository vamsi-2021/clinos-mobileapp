import { StyleSheet } from 'react-native';
import { Colors } from '../../../constants/theme';

export const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 16,
    gap: 12,
    borderWidth: 1,
    borderColor: Colors.inputBorder,
  },
  cardOverdue: {
    borderColor: Colors.danger,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    flex: 1,
  },
  tierBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  tierText: {
    fontSize: 12,
    fontWeight: '700',
  },
  patientId: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.textHeading,
  },
  arrow: {
    fontSize: 13,
    color: Colors.textMuted,
  },
  trial: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.primary,
    flex: 1,
  },
  overdueRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  overdueIcon: {
    fontSize: 13,
    color: Colors.danger,
  },
  overdueText: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.danger,
    letterSpacing: 0.3,
  },
  issue: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.textHeading,
    lineHeight: 20,
  },
  criterionBox: {
    backgroundColor: Colors.backgroundScreen,
    borderRadius: 8,
    padding: 12,
    gap: 4,
  },
  criterionLine: {
    fontSize: 13,
    color: Colors.textBody,
    lineHeight: 18,
  },
  criterionLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.primary,
  },
  actions: {
    flexDirection: 'row',
    gap: 10,
    flexWrap: 'wrap',
  },
  outlineBtn: {
    flex: 1,
    paddingHorizontal: 8,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.inputBorder,
    backgroundColor: Colors.white,
  },
  outlineBtnText: {
    fontSize: 13,
    fontWeight: '500',
    color: Colors.textHeading,
  },
  escalateBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
    paddingHorizontal: 16,
    height: 40,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.danger,
    backgroundColor: Colors.white,
  },
  escalateIcon: {
    fontSize: 14,
    color: Colors.danger,
  },
  escalateBtnText: {
    fontSize: 13,
    fontWeight: '500',
    color: Colors.danger,
  },
});
