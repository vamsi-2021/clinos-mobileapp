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
  list: {padding: 16, gap: 12},
  card: {
    backgroundColor: Colors.white,
    borderRadius: 14,
    padding: 16,
  },
  cardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 6,
    gap: 8,
  },
  trialTitle: {flex: 1, fontSize: 15, fontWeight: '700', color: Colors.textHeading},
  phaseBadge: {
    backgroundColor: Colors.primaryLight,
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 20,
  },
  phaseText: {fontSize: 12, fontWeight: '600', color: Colors.primary},
  sponsor: {fontSize: 13, color: Colors.textBody, marginBottom: 2},
  condition: {fontSize: 13, color: Colors.textMuted, marginBottom: 12},
  cardBottom: {flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'},
  slots: {fontSize: 13, color: Colors.secondary, fontWeight: '600'},
  viewButton: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    backgroundColor: Colors.primary,
    borderRadius: 8,
  },
  viewButtonText: {fontSize: 13, fontWeight: '600', color: Colors.white},
});
