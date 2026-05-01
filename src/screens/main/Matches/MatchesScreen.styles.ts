import { StyleSheet } from 'react-native';
import { Colors } from '../../../constants/theme';

export const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.backgroundPage },
  list: { padding: 16, gap: 12 },

  // Card
  card: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 16,
    gap: 10,
  },

  // Top row: score badge + match info
  topRow: {
    flexDirection: 'row',
    gap: 12,
  },
  scoreBadge: {
    width: 64,
    height: 64,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
  },
  scoreText: {
    fontSize: 20,
    fontWeight: '700',
  },
  matchInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 6,
  },
  patientBlock: {
    flex: 1,
  },
  patientName: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.textHeading,
    marginBottom: 3,
  },
  condition: {
    fontSize: 12,
    color: Colors.textBody,
    lineHeight: 17,
  },
  arrow: {
    fontSize: 16,
    color: Colors.textMuted,
    marginTop: 2,
  },
  trialBlock: {
    alignItems: 'flex-end',
  },
  trialName: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.primary,
    textAlign: 'right',
    marginBottom: 3,
  },
  nctId: {
    fontSize: 12,
    color: Colors.textBody,
  },

  // Meta row
  metaRow: {
    fontSize: 12,
    color: Colors.textMuted,
  },

  // Location row
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  locationText: {
    fontSize: 12,
    color: Colors.textMuted,
  },
  locationDot: {
    fontSize: 12,
    color: Colors.textMuted,
  },

  // Bottom row
  bottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 2,
  },
  eligibilityBadge: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
  },
  eligibilityText: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.white,
  },

  // Legacy (unused but kept to avoid breaking imports)
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.textHeading,
    marginLeft: 12,
  },
  scoreMedium: {},
  scoreLow: {},
  info: {},
  trial: {},
  date: {},
  reviewButton: {},
  reviewText: {},
});
