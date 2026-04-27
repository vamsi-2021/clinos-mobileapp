import { StyleSheet } from 'react-native';
import { Colors } from '../../../constants/theme';

export const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 16,
    gap: 10,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 10,
  },
  headerLeft: {
    flex: 1,
    gap: 3,
  },
  trialName: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.textHeading,
  },
  nct: {
    fontSize: 12,
    color: Colors.textMuted,
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  infoLabel: {
    fontSize: 13,
    color: Colors.textMuted,
  },
  infoValue: {
    flex: 1,
    alignItems: 'flex-end',
  },
  infoValueText: {
    fontSize: 13,
    color: Colors.textHeading,
    textAlign: 'right',
  },
  approved: {
    color: Colors.statusEligible,
    fontWeight: '500',
  },
  pending: {
    color: Colors.warning,
    fontWeight: '500',
  },
  divider: {
    height: 1,
    backgroundColor: Colors.inputBorder,
    marginVertical: 2,
  },
  actions: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'stretch',
  },
  viewBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.inputBorder,
    backgroundColor: Colors.white,
  },
  viewBtnText: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.textHeading,
  },
  externalBtn: {
    alignSelf: 'stretch',
    paddingHorizontal: 14,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.white,
  },
});
