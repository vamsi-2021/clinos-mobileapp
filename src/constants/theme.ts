export const Colors = {
  // Core brand
  primary: '#127DA1',
  primaryLight: '#EBF5F8',
  secondary: '#4DD9C0',
  success: '#1FAD7D',
  warning: '#F8A007',
  danger: '#FF3636',
  eligibleBlue: '#1192EC',

  // Page backgrounds
  backgroundPage: '#EEF2F6',
  backgroundScreen: '#F2F2F7',

  // Text hierarchy
  textPrimary: '#1C1C1E',
  textSecondary: '#ADB1BD',
  textTertiary: '#C7C7CC',
  textHeading: '#1A2332',
  textBody: '#64748B',
  textMuted: '#94A3B8',

  // Borders & separators
  border: '#E5E5EA',
  separator: '#D1D1D6',
  inputBorder: '#E2E8F0',
  roleCardBorder: '#CBD5E1',

  // Drawer
  drawerBackground: '#141E29',
  drawerSurface: '#1E2D3D',

  // Dark surface cards (dashboard stats, drawer banner)
  darkCard: '#1A2535',
  statIconBox: '#253548',

  // Eligibility status
  statusEligible: '#1FAD7D',
  statusEligibleLight: '#D1FAE5',
  statusIneligible: '#E5484D',
  statusIneligibleLight: '#FDECEA',
  statusLikelyEligible: '#127DA1',
  statusLikelyEligibleLight: '#EBF5F8',

  // Card states
  cardBorderSelected: '#B8D9E6',

  // Status & score indicators
  scoreHigh: '#22C55E',
  scoreMedium: '#F59E0B',
  scoreLow: '#EF4444',
  notificationBadge: '#EF4444',

  // System / platform colors
  systemBlue: '#007AFF',
  systemRed: '#FF3B30',
  systemGreen: '#34C759',
  systemGray: '#8E8E93',

  // Basic
  white: '#FFFFFF',
  black: '#000000',
} as const;

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
} as const;

export const BorderRadius = {
  sm: 8,
  md: 12,
  lg: 16,
  full: 9999,
} as const;

export const FontSize = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 20,
  xl: 24,
  xxl: 28,
  xxxl: 32,
} as const;

export const FontWeight = {
  regular: '400' as const,
  medium: '500' as const,
  semibold: '600' as const,
  bold: '700' as const,
};
