import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {DrawerParamList} from '../../types/navigation';
import {Colors} from '../../constants/theme';

type PatientsScreenProps = {
  navigation: DrawerNavigationProp<DrawerParamList, 'Patients'>;
};

const MOCK_PATIENTS = [
  {id: '1', name: 'Sarah Johnson', condition: 'Type 2 Diabetes', matches: 4, status: 'Active'},
  {id: '2', name: 'Robert Chen', condition: 'Breast Cancer Stage II', matches: 2, status: 'Pending'},
  {id: '3', name: 'Maria Garcia', condition: 'COPD', matches: 6, status: 'Active'},
  {id: '4', name: 'James Wilson', condition: 'Hypertension', matches: 1, status: 'Active'},
  {id: '5', name: 'Emily Davis', condition: 'Multiple Sclerosis', matches: 3, status: 'Pending'},
];

const PatientsScreen = ({navigation}: PatientsScreenProps) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.openDrawer()} style={styles.menuButton}>
          <Text style={styles.menuIcon}>☰</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Patients</Text>
      </View>

      <FlatList
        data={MOCK_PATIENTS}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        renderItem={({item}) => (
          <TouchableOpacity style={styles.card} activeOpacity={0.8}>
            <View style={styles.avatar}>
              <Text style={styles.avatarInitial}>{item.name[0]}</Text>
            </View>
            <View style={styles.info}>
              <Text style={styles.patientName}>{item.name}</Text>
              <Text style={styles.condition}>{item.condition}</Text>
              <Text style={styles.matches}>{item.matches} trial matches</Text>
            </View>
            <View style={[styles.statusBadge, item.status === 'Active' ? styles.statusActive : styles.statusPending]}>
              <Text style={styles.statusText}>{item.status}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
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

export default PatientsScreen;
