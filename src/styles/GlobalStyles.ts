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
    height: 52,
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
});
