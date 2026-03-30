import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import {DrawerContentComponentProps} from '@react-navigation/drawer';
import {Colors} from '../../constants/theme';

const NAV_ITEMS = [
  {key: 'Dashboard', label: 'Dashboard', icon: '⊞'},
  {key: 'Patients', label: 'Patients', icon: '👥'},
  {key: 'Trials', label: 'Trials', icon: '⚗'},
  {key: 'Matches', label: 'Matches', icon: '◎'},
] as const;

function CustomDrawer(props: DrawerContentComponentProps): React.JSX.Element {
  const {navigation, state} = props;
  const activeRoute = state.routes[state.index].name;

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.logoRow}>
          <View style={styles.logoBox}>
            <Text style={styles.logoIcon}>◎</Text>
          </View>
          <Text style={styles.logoText}>TrialMatch</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.closeDrawer()} style={styles.closeButton}>
          <Text style={styles.closeIcon}>✕</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.divider} />

      {/* AI Banner */}
      <View style={styles.aiBanner}>
        <Text style={styles.aiBannerIcon}>🧠</Text>
        <View>
          <Text style={styles.aiBannerLabel}>Eligibility Intelligence</Text>
          <Text style={styles.aiBannerTitle}>AI-Powered Matching</Text>
        </View>
      </View>

      <View style={styles.divider} />

      {/* Nav Items */}
      <View style={styles.navSection}>
        {NAV_ITEMS.map(item => {
          const isActive = activeRoute === item.key;
          return (
            <TouchableOpacity
              key={item.key}
              style={[styles.navItem, isActive && styles.navItemActive]}
              onPress={() => navigation.navigate(item.key)}
              activeOpacity={0.75}>
              <Text style={[styles.navIcon, isActive && styles.navIconActive]}>
                {item.icon}
              </Text>
              <Text style={[styles.navLabel, isActive && styles.navLabelActive]}>
                {item.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Bottom Section */}
      <View style={styles.bottom}>
        <View style={styles.divider} />

        {/* TrialMatch AI CTA */}
        <TouchableOpacity style={styles.aiButton} activeOpacity={0.85}>
          <Text style={styles.aiButtonIcon}>✦</Text>
          <Text style={styles.aiButtonText}>TrialMatch AI</Text>
          <Text style={styles.aiButtonArrow}>›</Text>
        </TouchableOpacity>

        <View style={styles.divider} />

        {/* User Profile */}
        <TouchableOpacity style={styles.userRow} activeOpacity={0.8}>
          <View style={styles.avatar}>
            <Text style={styles.avatarInitial}>N</Text>
          </View>
          <View style={styles.userInfo}>
            <Text style={styles.userName}>Nandini Kalidindi</Text>
            <Text style={styles.userEmail}>nandhini206@outlook.com</Text>
          </View>
          <Text style={styles.userChevron}>⌄</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.drawerBackground,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  logoBox: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoIcon: {
    fontSize: 22,
    color: Colors.white,
  },
  logoText: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.white,
  },
  closeButton: {
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeIcon: {
    fontSize: 18,
    color: Colors.textMuted,
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: Colors.drawerSurface,
    marginHorizontal: 0,
  },
  aiBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    margin: 16,
    padding: 14,
    backgroundColor: Colors.darkCard,
    borderRadius: 12,
  },
  aiBannerIcon: {
    fontSize: 24,
  },
  aiBannerLabel: {
    fontSize: 11,
    color: Colors.textBody,
    marginBottom: 2,
  },
  aiBannerTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.white,
  },
  navSection: {
    paddingHorizontal: 12,
    paddingTop: 8,
    flex: 1,
  },
  navItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    paddingVertical: 13,
    paddingHorizontal: 14,
    borderRadius: 10,
    marginBottom: 2,
  },
  navItemActive: {
    backgroundColor: Colors.drawerSurface,
  },
  navIcon: {
    fontSize: 20,
    color: Colors.textBody,
    width: 24,
    textAlign: 'center',
  },
  navIconActive: {
    color: Colors.secondary,
  },
  navLabel: {
    fontSize: 16,
    color: Colors.textMuted,
    fontWeight: '500',
  },
  navLabelActive: {
    color: Colors.secondary,
    fontWeight: '600',
  },
  bottom: {
    paddingBottom: 8,
  },
  aiButton: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 16,
    paddingVertical: 14,
    paddingHorizontal: 18,
    borderRadius: 12,
    backgroundColor: Colors.primary,
  },
  aiButtonIcon: {
    fontSize: 18,
    color: Colors.white,
    marginRight: 10,
  },
  aiButtonText: {
    flex: 1,
    fontSize: 15,
    fontWeight: '700',
    color: Colors.white,
  },
  aiButtonArrow: {
    fontSize: 22,
    color: Colors.white,
    fontWeight: '300',
  },
  userRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    gap: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.secondary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarInitial: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.drawerBackground,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.white,
  },
  userEmail: {
    fontSize: 12,
    color: Colors.textBody,
    marginTop: 1,
  },
  userChevron: {
    fontSize: 16,
    color: Colors.textBody,
  },
});

export default CustomDrawer;
