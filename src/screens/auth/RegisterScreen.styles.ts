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
    paddingHorizontal: 28,
    paddingVertical: 48,
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: Colors.textHeading,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    color: Colors.textBody,
    marginBottom: 28,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.textHeading,
    marginBottom: 10,
  },
  roleRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  roleCard: {
    flex: 1,
    borderWidth: 1.5,
    borderColor: Colors.roleCardBorder,
    borderRadius: 14,
    paddingVertical: 16,
    paddingHorizontal: 12,
    alignItems: 'center',
    backgroundColor: Colors.white,
  },
  roleCardSelected: {
    borderColor: Colors.primary,
    backgroundColor: Colors.primaryLight,
  },
  roleCardIcon: {
    marginBottom: 8,
  },
  roleCardTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.textHeading,
    textAlign: 'center',
    marginBottom: 4,
  },
  roleCardTitleSelected: {
    color: Colors.primary,
  },
  roleCardSub: {
    fontSize: 12,
    color: Colors.textBody,
    textAlign: 'center',
    lineHeight: 16,
  },
});
