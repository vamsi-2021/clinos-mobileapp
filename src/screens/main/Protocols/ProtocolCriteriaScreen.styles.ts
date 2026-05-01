import { StyleSheet } from 'react-native';
import { Colors } from '../../../constants/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundPage,
  },
  header: {
    backgroundColor: Colors.white,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.inputBorder,
  },
  backBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    alignSelf: 'flex-start',
  },
  backArrow: {
    fontSize: 18,
    color: Colors.textHeading,
  },
  backLabel: {
    fontSize: 15,
    color: Colors.textHeading,
  },
  content: {
    padding: 16,
    gap: 16,
  },
  protocolTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: Colors.textHeading,
    letterSpacing: -0.5,
  },
  protocolMeta: {
    fontSize: 14,
    color: Colors.textMuted,
    marginTop: 4,
    marginBottom: 4,
  },
  tableCard: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 16,
    gap: 0,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.textHeading,
    marginBottom: 14,
  },
  rowWrap: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.inputBorder,
  },
  colHeader: {
    fontSize: 12,
    color: Colors.negativeTagText,
    fontWeight: '600',
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 12,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  badgeApproved: {
    backgroundColor: Colors.statusEligibleLight,
    borderWidth: 1,
    borderColor: Colors.statusEligible,
  },
  badgePending: {
    backgroundColor: Colors.statusPendingBg,
    borderWidth: 1,
    borderColor: Colors.warning,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '600',
  },
  badgeTextApproved: {
    color: Colors.statusEligible,
  },
  badgeTextPending: {
    color: Colors.warning,
  },
  criterionText: {
    fontSize: 13,
    color: Colors.textHeading,
    lineHeight: 18,
  },
  pendingNote: {
    fontSize: 11,
    color: Colors.textMuted,
    marginTop: 3,
    fontStyle: 'italic',
  },
  reviewerName: {
    fontSize: 12,
    color: Colors.textBody,
    lineHeight: 16,
  },
  reviewerDate: {
    fontSize: 11,
    color: Colors.textMuted,
    marginTop: 2,
  },
  reviewerDash: {
    fontSize: 13,
    color: Colors.textMuted,
  },
  approveBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.inputBorder,
    backgroundColor: Colors.white,
  },
  approveBtnText: {
    fontSize: 12,
    color: Colors.textHeading,
    fontWeight: '500',
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontSize: 14,
    color: Colors.textMuted,
  },
});
