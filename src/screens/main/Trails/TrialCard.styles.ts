import { StyleSheet } from 'react-native';
import { Colors } from '../../../constants/theme';

export const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
  },
  iconBox: {
    width: 44,
    height: 44,
    borderRadius: 10,
    backgroundColor: '#E6F1FB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconText: { fontSize: 20 },
  titleBlock: { flex: 1, gap: 2 },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flexWrap: 'wrap',
  },
  trialName: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0C447C',
  },
  badge: {
    backgroundColor: '#1D9E75',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 3,
  },
  badgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  phase: { fontSize: 13, color: '#888' },
  nctId: { fontSize: 12, color: '#999' },
  description: { fontSize: 12, color: '#333', lineHeight: 20 },
  tags: { flexDirection: 'row', gap: 8, flexWrap: 'wrap' },
  tag: {
    backgroundColor: Colors.primaryLight,
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  tagText: { fontSize: 11, color: Colors.primary },
  meta: { flexDirection: 'row', justifyContent: 'space-between' },
  metaItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 6,
  },
  metaText: { fontSize: 12, color: '#888', flexWrap: 'wrap', marginRight: 20 },
  enrollBox: { gap: 6 },
  enrollHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  enrollLabel: { fontSize: 13, color: '#555' },
  enrollCount: { fontSize: 15, fontWeight: '700', color: '#222' },
  barTrack: {
    height: 8,
    backgroundColor: '#E8E8E8',
    borderRadius: 4,
  },
  barFill: {
    height: 8,
    backgroundColor: '#185FA5',
    borderRadius: 4,
  },
  pctText: { fontSize: 12, color: '#888' },
  eligibleBox: {
    backgroundColor: '#F0FBF6',
    borderRadius: 4,
    padding: 12,
    alignItems: 'center',
    flexDirection: 'row',
  },
  eligibleText: {
    fontSize: 14,
    color: '#0F6E56',
    fontWeight: '500',
    marginLeft: 8,
  },
});
