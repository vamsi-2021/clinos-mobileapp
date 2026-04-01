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
  avatar: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarInitial: {fontSize: 20, fontWeight: '700', color: Colors.white},
  info: {flex: 1},
  patientName: {fontSize: 15, fontWeight: '600', color: Colors.textHeading, marginBottom: 2},
  condition: {fontSize: 13, color: Colors.textBody, marginBottom: 2},
  matches: {fontSize: 12, color: Colors.secondary, fontWeight: '600'},
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  statusActive: {backgroundColor: Colors.statusActiveBg},
  statusPending: {backgroundColor: Colors.statusPendingBg},
  statusText: {fontSize: 12, fontWeight: '600', color: Colors.textHeading},
});
