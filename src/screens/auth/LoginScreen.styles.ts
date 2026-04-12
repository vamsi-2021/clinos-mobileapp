import {StyleSheet} from 'react-native';
import {Colors} from '../../constants/theme';

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.backgroundPage,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundPage,
  },
  inner: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 28,
    paddingVertical: 48,
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 36,
  },
  title: {
    fontSize: 30,
    fontWeight: '700',
    color: Colors.textHeading,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    color: Colors.textBody,
    lineHeight: 22,
    marginBottom: 32,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.textHeading,
    marginBottom: 8,
  },
});
