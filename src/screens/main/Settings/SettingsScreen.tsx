import React, {useState} from 'react';
import {
  View,
  Text,
  Switch,
  TouchableOpacity,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Colors} from '../../../constants/theme';
import {styles} from './SettingsScreen.styles';

const SettingsScreen = () => {
  const [pushNotifications, setPushNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [locationAccess, setLocationAccess] = useState(true);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Settings</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Preferences</Text>
        <View style={styles.card}>
          <View style={styles.settingRow}>
            <Text style={styles.settingLabel}>Push Notifications</Text>
            <Switch
              value={pushNotifications}
              onValueChange={setPushNotifications}
              trackColor={{false: Colors.border, true: Colors.systemGreen}}
              thumbColor={Colors.white}
            />
          </View>
          <View style={[styles.settingRow, styles.borderTop]}>
            <Text style={styles.settingLabel}>Dark Mode</Text>
            <Switch
              value={darkMode}
              onValueChange={setDarkMode}
              trackColor={{false: Colors.border, true: Colors.systemGreen}}
              thumbColor={Colors.white}
            />
          </View>
          <View style={[styles.settingRow, styles.borderTop]}>
            <Text style={styles.settingLabel}>Location Access</Text>
            <Switch
              value={locationAccess}
              onValueChange={setLocationAccess}
              trackColor={{false: Colors.border, true: Colors.systemGreen}}
              thumbColor={Colors.white}
            />
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>About</Text>
        <View style={styles.card}>
          <TouchableOpacity style={styles.settingRow}>
            <Text style={styles.settingLabel}>Privacy Policy</Text>
            <Text style={styles.chevron}>›</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.settingRow, styles.borderTop]}>
            <Text style={styles.settingLabel}>Terms of Service</Text>
            <Text style={styles.chevron}>›</Text>
          </TouchableOpacity>
          <View style={[styles.settingRow, styles.borderTop]}>
            <Text style={styles.settingLabel}>Version</Text>
            <Text style={styles.settingValue}>1.0.0</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}


export default SettingsScreen;
