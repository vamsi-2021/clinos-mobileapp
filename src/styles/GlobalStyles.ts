import {StyleSheet} from 'react-native';
import {Colors} from '../constants/theme';

export const GlobalStyles = StyleSheet.create({
  // ── Logo ──────────────────────────────────────────────────────
  logoBox: {
    width: 52,
    height: 52,
    borderRadius: 14,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  logoText: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.textHeading,
    marginLeft: 12
  },
  card: {
    borderRadius: 12,
    borderColor: Colors.searchBorder,
    borderWidth: 1,
    marginBottom: 12,
    backgroundColor: Colors.white,
  },
  cardInner: {
    marginHorizontal: 16,
    marginVertical: 20,
    flex: 1,
  },
  statIconBox: {
    width: 48,
    height: 48,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statIcon: {
    fontSize: 24,
  },
  // ── Header ────────────────────────────────────────────────────
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
    paddingVertical: 12,
    backgroundColor: Colors.white,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.inputBorder,
  },
  menuButton: {
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 2,
  },
  menuIcon: {
    fontSize: 22,
    color: Colors.textHeading,
  },
  notifButton: {
    position: 'relative',
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 2,
  },
  notifIcon: {
    fontSize: 22,
  },
  notifBadge: {
    position: 'absolute',
    top: 4,
    right: 4,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.notificationBadge,
  },
 headerCenter: {
    flex: 1,
    padding: 4,
    paddingBottom: 10,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.textHeading,
  },
  headerSub: {
    fontSize: 12,
    color: Colors.textBody,
    lineHeight: 17,
    marginTop: 2,
  },
  // ── Form inputs ───────────────────────────────────────────────
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.inputBorder,
    borderRadius: 12,
    paddingHorizontal: 14,
    marginBottom: 20,
    height: 52,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: Colors.textHeading,
  },
  eyeButton: {
    padding: 4,
  },

  // ── Primary button ────────────────────────────────────────────
  button: {
    height: 48,
    borderRadius: 12,
    marginTop: 4,
    marginBottom: 20,
    overflow: 'hidden',
    shadowColor: Colors.primary,
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 5,
  },
  buttonGradient: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.white,
    letterSpacing: 0.3,
  },

  // ── Auth link ─────────────────────────────────────────────────
  linkButton: {
    alignItems: 'center',
    paddingVertical: 8,
  },
  linkText: {
    fontSize: 14,
    color: Colors.textBody,
  },
  linkHighlight: {
    color: Colors.primary,
    fontWeight: '600',
  },

  // ── Search ───────────────────────────────────────────────
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.searchBackground,
    borderWidth: 1,
    borderColor: Colors.searchBorder,
    borderRadius: 8,
    paddingHorizontal: 16,
    marginTop: 10,
    height: 40,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: Colors.textHeading,
    marginLeft: 8,
  },

  // ── Filter ───────────────────────────────────────────────
  filterWrapper: {
    alignSelf: 'flex-start',
    marginTop: 10,
  },
  filterBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.searchBackground,
    borderWidth: 1,
    borderColor: Colors.searchBorder,
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 9,
  },
  filterText: {
    fontSize: 12,
    fontWeight: '500',
    color: Colors.textBody,
    marginHorizontal: 8,
  },
});
