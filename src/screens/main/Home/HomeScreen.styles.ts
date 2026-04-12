import {StyleSheet} from 'react-native';
import {Colors} from '../../../constants/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundScreen,
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 8,
    backgroundColor: Colors.white,
  },
  greeting: {
    fontSize: 14,
    color: Colors.systemGray,
    marginBottom: 4,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  listContent: {
    padding: 16,
    gap: 12,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  itemDescription: {
    fontSize: 14,
    color: Colors.systemGray,
    marginBottom: 12,
  },
  actionButton: {
    alignSelf: 'flex-start',
    paddingVertical: 6,
    paddingHorizontal: 14,
    backgroundColor: Colors.systemBlue,
    borderRadius: 8,
  },
  actionButtonText: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.white,
  },
});
