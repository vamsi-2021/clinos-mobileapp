import { StyleSheet } from 'react-native';
import { Colors } from '../../../constants/theme';

export const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  overlayTap: {
    ...StyleSheet.absoluteFillObject,
  },
  sheet: {
    backgroundColor: Colors.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '92%',
  },
  handle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: Colors.inputBorder,
    alignSelf: 'center',
    marginTop: 12,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 4,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.textHeading,
    flex: 1,
    marginLeft: 8,
  },
  closeBtn: {
    padding: 8,
  },
  closeText: {
    fontSize: 18,
    color: Colors.textMuted,
  },
  subtitle: {
    fontSize: 13,
    color: Colors.textBody,
    textAlign: 'center',
    paddingBottom: 14,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.inputBorder,
    marginHorizontal: 0,
  },
  content: {
    padding: 16,
    gap: 20,
  },

  // Section
  section: {
    gap: 10,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.textHeading,
  },
  sectionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },

  // Demographics
  demoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  demoLeft: {
    flex: 1,
    gap: 2,
  },
  demoRight: {
    alignItems: 'flex-end',
    gap: 2,
  },
  demoLabel: {
    fontSize: 12,
    color: Colors.textBody,
  },
  demoValue: {
    fontSize: 13,
    fontWeight: '500',
    color: Colors.textHeading,
  },
  diagnosisBlock: {
    gap: 2,
    marginBottom: 8,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationLabel: {
    fontSize: 12,
    color: Colors.textBody,
    marginLeft: 4,
  },
  locationValue: {
    fontSize: 13,
    fontWeight: '500',
    color: Colors.textHeading,
    marginLeft: 4,
  },

  // Pills
  pillRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  biomarkerPill: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: Colors.primaryLight,
    borderWidth: 1,
    borderColor: Colors.inputBorder,
  },
  biomarkerText: {
    fontSize: 12,
    color: Colors.textHeading,
  },
  treatmentPill: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.inputBorder,
    backgroundColor: Colors.white,
  },
  treatmentText: {
    fontSize: 12,
    color: Colors.textHeading,
  },

  // Lab values
  labRow: {
    flexDirection: 'row',
    gap: 8,
  },
  labItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: Colors.backgroundPage,
  },
  labLabel: {
    fontSize: 12,
    color: Colors.textBody,
  },
  labValue: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.textHeading,
  },

  // Matching trials
  trialRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.inputBorder,
  },
  trialInfo: {
    flex: 1,
  },
  trialName: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.textHeading,
  },
  trialNct: {
    fontSize: 11,
    color: Colors.textBody,
    marginTop: 2,
  },
  trialScore: {
    fontSize: 14,
    fontWeight: '700',
    marginRight: 10,
  },
  eligibleBadge: {
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 20,
  },
  eligibleBadgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.white,
  },

  // Footer
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 12,
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: Colors.inputBorder,
  },
  runMatchBtn: {
    height: 40,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  runMatchContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  runMatchText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.white,
  },
  editBtn: {
    flex: 1,
    height: 40,
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: Colors.inputBorder,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 6,
  },
  editBtnText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.textHeading,
  },
});
