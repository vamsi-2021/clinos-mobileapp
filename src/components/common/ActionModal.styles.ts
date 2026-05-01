import { StyleSheet } from 'react-native';
import { Colors } from '../../constants/theme';

export const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'center',
    padding: 24,
  },
  card: {
    backgroundColor: Colors.white,
    borderRadius: 18,
    padding: 24,
  },
  close: {
    alignSelf: 'flex-end',
    padding: 4,
    marginBottom: 8,
  },
  closeText: {
    fontSize: 16,
    color: Colors.textMuted,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.textHeading,
  },
  subtitle: {
    fontSize: 13,
    color: Colors.textBody,
    textAlign: 'center',
    lineHeight: 18,
    marginBottom: 18,
  },
  patientBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.backgroundPage,
    borderRadius: 10,
    padding: 14,
    marginBottom: 16,
  },
  patientLabel: {
    fontSize: 14,
    color: Colors.textBody,
  },
  patientValue: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.textHeading,
  },
  noteLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.textHeading,
    marginBottom: 8,
  },
  textarea: {
    borderWidth: 1.5,
    borderRadius: 10,
    padding: 12,
    fontSize: 13,
    color: Colors.textHeading,
    minHeight: 110,
  },
  noteFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginTop: 6,
    marginBottom: 18,
    gap: 12,
  },
  validationText: {
    flex: 1,
    fontSize: 12,
    color: Colors.statusIneligible,
    lineHeight: 16,
  },
  charCount: {
    fontSize: 12,
    color: Colors.textMuted,
    flexShrink: 0,
  },
  actionBtn: {
    height: 40,
    borderRadius: 8,
    marginBottom: 10,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionBtnDisabled: {
    opacity: 0.4,
  },
  actionText: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.white,
  },
  cancelBtn: {
    height: 40,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.inputBorder,
  },
  cancelText: {
    fontSize: 15,
    fontWeight: '500',
    color: Colors.textHeading,
  },
});
