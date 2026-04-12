import {StyleSheet} from 'react-native';
import {Colors} from '../../../constants/theme';

export const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: Colors.backgroundPage},
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.textHeading,
    marginLeft: 12,
    backgroundColor: 'red',
  },
  list: {padding: 16, gap: 10},
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 14,
    padding: 14,
    gap: 12,
  },
  scoreBadge: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scoreText: {fontSize: 16, fontWeight: '700'},
  scoreLabel: {fontSize: 10, color: Colors.textMuted},
  info: {flex: 1},
  patient: {fontSize: 15, fontWeight: '600', color: Colors.textHeading, marginBottom: 2},
  trial: {fontSize: 13, color: Colors.textBody, marginBottom: 2},
  date: {fontSize: 12, color: Colors.textMuted},
  reviewButton: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderWidth: 1.5,
    borderColor: Colors.primary,
    borderRadius: 8,
  },
  reviewText: {fontSize: 13, fontWeight: '600', color: Colors.primary},
});
