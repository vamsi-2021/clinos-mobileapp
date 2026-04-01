import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import {DrawerContentComponentProps} from '@react-navigation/drawer';
import {Colors} from '../../constants/theme';
import {styles} from './CustomDrawer.styles';

import {
  AiIcon,
  AiIntelligenceIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  CirclesIcon,
  DashboardIcon,
  LogoutIcon,
  PatientsIcon,
  TrialsIcon,
} from '../../assets/icons';
import GradientBackground from '../common/GradientBackground';
import { SvgProps } from 'react-native-svg';
import { GlobalStyles } from '../../styles/GlobalStyles';
import { useAuth } from '../../context/AuthContext';

type NavItem = {
  key: 'Dashboard' | 'Patients' | 'Trials' | 'Matches';
  label: string;
  Icon: React.FC<SvgProps>;
};

const NAV_ITEMS: NavItem[] = [
  {key: 'Dashboard', label: 'Dashboard', Icon: DashboardIcon},
  {key: 'Patients', label: 'Patients', Icon: PatientsIcon},
  {key: 'Trials', label: 'Trials', Icon: TrialsIcon},
  {key: 'Matches', label: 'Matches', Icon: CirclesIcon},
];

function CustomDrawer(props: DrawerContentComponentProps): JSX.Element {
  const {navigation, state} = props;
  const activeRoute = state.routes[state.index].name;
  const {logout} = useAuth();
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.logoRow}>
          <GradientBackground style={styles.logoBox} width={44} height={44}>
            <CirclesIcon width={22} height={22} stroke={Colors.white} />
          </GradientBackground>
          <Text style={styles.logoText}>TrialMatch</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.closeDrawer()} style={styles.closeButton}>
          <Text style={styles.closeIcon}>✕</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.divider} />

      {/* AI Banner */}
      <View style={styles.aiBanner}>
        <AiIntelligenceIcon width={20} height={20} stroke={Colors.secondary} />
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
              <item.Icon
                width={22}
                height={22}
                stroke={isActive ? Colors.secondary : Colors.textBody}
              />
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
        <TouchableOpacity style={{...GlobalStyles.button, paddingHorizontal: 12}} activeOpacity={0.85}>
          <GradientBackground style={{...GlobalStyles.buttonGradient, paddingHorizontal: 16, borderRadius: 12}}>
            <AiIcon width={20} height={20} stroke={Colors.white} style={{marginRight: 8}} />
            <Text style={styles.aiButtonText}>TrialMatch AI</Text>
            <ChevronRightIcon width={20} height={20} stroke={Colors.white}/>
          </GradientBackground>
        </TouchableOpacity>

        <View style={styles.divider} />

        {/* User Profile + overlaid Account Menu */}
        <View style={styles.userSection}>
          {accountMenuOpen && (
            <View style={styles.accountMenu}>
              <Text style={styles.accountMenuTitle}>My Account</Text>
              <View style={styles.accountMenuDivider} />
              <TouchableOpacity
                style={styles.signOutRow}
                activeOpacity={0.75}
                onPress={logout}>
                <LogoutIcon width={18} height={18} stroke={Colors.danger} />
                <Text style={styles.signOutText}>Sign Out</Text>
              </TouchableOpacity>
            </View>
          )}

          <TouchableOpacity
            style={styles.userRow}
            activeOpacity={0.8}
            onPress={() => setAccountMenuOpen(prev => !prev)}>
            <View style={styles.avatar}>
              <Text style={styles.avatarInitial}>N</Text>
            </View>
            <View style={styles.userInfo}>
              <Text style={styles.userName}>Nandini Kalidindi</Text>
              <Text style={styles.userEmail}>nandhini206@outlook.com</Text>
            </View>
            <ChevronDownIcon
              width={16}
              height={16}
              stroke={Colors.textBody}
              style={{transform: [{rotate: accountMenuOpen ? '180deg' : '0deg'}]}}
            />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}


export default CustomDrawer;
