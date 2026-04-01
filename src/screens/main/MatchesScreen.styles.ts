import {StyleSheet} from 'react-native';
import {Colors} from '../../constants/theme';

export const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: Colors.backgroundPage},
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 14,
    backgroundColor: Colors.white,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.inputBorder,
  },
  menuButton: {width: 36, height: 36, justifyContent: 'center'},
  menuIcon: {fontSize: 22, color: Colors.textHeading},
  headerTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: '700',
    color: Colors.textHeading,
    marginLeft: 12,
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
