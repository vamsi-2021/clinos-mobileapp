import { StyleSheet } from 'react-native';
import { Colors } from '../../../constants/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundPage,
  },
  topBar: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: Colors.white,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.inputBorder,
  },
  backBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  backArrow: {
    fontSize: 20,
    color: Colors.textHeading,
  },
  backLabel: {
    fontSize: 15,
    fontWeight: '500',
    color: Colors.textHeading,
  },
  scroll: {
    padding: 16,
    gap: 12,
  },
  sectionCard: {
    backgroundColor: Colors.white,
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
  },
  sectionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 14,
  },
  sectionIcon: {
    fontSize: 18,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.textHeading,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingVertical: 8,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.inputBorder,
  },
  summaryKey: {
    fontSize: 13,
    color: Colors.textBody,
    flexShrink: 0,
  },
  summaryVal: {
    fontSize: 13,
    fontWeight: '500',
    color: Colors.textHeading,
    textAlign: 'right',
    flexShrink: 1,
    marginLeft: 8,
  },
  summaryValDiagnosis: {
    textAlign: 'right',
    flexShrink: 1,
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 4,
  },
  tableRowEven: {
    backgroundColor: Colors.backgroundPage,
  },
  tableRowOdd: {
    backgroundColor: Colors.white,
  },
  tableRowLabel: {
    fontSize: 13,
    color: Colors.textBody,
  },
  tableRowValue: {
    fontSize: 13,
    fontWeight: '500',
    color: Colors.textHeading,
  },
  trialHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 14,
  },
  trialNameBlock: {
    flex: 1,
    marginRight: 12,
  },
  trialName: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.textHeading,
  },
  trialIndication: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.textHeading,
  },
  trialNct: {
    fontSize: 12,
    color: Colors.textMuted,
    marginTop: 2,
  },
  trialScoreBlock: {
    alignItems: 'flex-end',
    gap: 6,
  },
  trialScore: {
    fontSize: 22,
    fontWeight: '700',
  },
  trialBadge: {
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 20,
  },
  trialBadgeText: {
    fontSize: 11,
    fontWeight: '600',
  },
  criteriaTable: {
    borderWidth: 1,
    borderColor: Colors.inputBorder,
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 12,
  },
  criteriaHeaderRow: {
    flexDirection: 'row',
    backgroundColor: Colors.backgroundPage,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  criteriaHeaderCell: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.primary,
  },
  criteriaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  criteriaRowBorder: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.inputBorder,
  },
  criteriaCriterionText: {
    fontSize: 12,
    color: Colors.textBody,
    lineHeight: 17,
    paddingRight: 8,
  },
  criteriaValueText: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.textHeading,
    lineHeight: 17,
  },
  statusChip: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 20,
    alignSelf: 'flex-start',
    borderWidth: 1,
  },
  chipMet: {
    backgroundColor: Colors.statusEligibleLight,
    borderColor: Colors.statusEligible,
  },
  chipUnmet: {
    backgroundColor: Colors.statusIneligibleLight,
    borderColor: Colors.statusIneligible,
  },
  statusChipText: {
    fontSize: 10,
    fontWeight: '600',
  },
  chipMetText: {
    color: Colors.statusEligible,
  },
  chipUnmetText: {
    color: Colors.statusIneligible,
  },
  summaryBox: {
    backgroundColor: Colors.backgroundPage,
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
  },
  summaryLabel: {
    fontWeight: '700',
    color: Colors.textHeading,
    fontSize: 13,
  },
  summaryText: {
    fontSize: 13,
    color: Colors.textBody,
    lineHeight: 19,
  },
  trialActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 12,
  },
  confirmBtnText: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.white,
  },
  ineligibleBtn: {
    flex: 1,
    height: 40,
    borderWidth: 1.5,
    borderColor: Colors.statusIneligible,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ineligibleBtnText: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.statusIneligible,
  },
});
