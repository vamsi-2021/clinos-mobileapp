import { StyleSheet } from 'react-native';
import { Colors } from '../../../constants/theme';

export const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.backgroundPage },
  list: { padding: 16, gap: 12 },

  // Header
  headerTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: Colors.textHeading,
    marginBottom: 4,
  },
  headerSub: {
    fontSize: 13,
    color: Colors.textBody,
    lineHeight: 19,
    marginBottom: 16,
  },

  // Demo buttons row
  demoRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 16,
  },
  demoBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 7,
    paddingVertical: 11,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.inputBorder,
    backgroundColor: Colors.white,
  },
  demoBtnText: {
    fontSize: 13,
    fontWeight: '500',
    color: Colors.textHeading,
  },
});
