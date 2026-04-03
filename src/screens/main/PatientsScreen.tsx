import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { DrawerParamList } from '../../types/navigation';
import { styles } from './PatientsScreen.styles';
import AppHeader from '../../components/common/AppHeader';
import { GlobalStyles } from '../../styles/GlobalStyles';

type PatientsScreenProps = {
  navigation: DrawerNavigationProp<DrawerParamList, 'Patients'>;
};

const MOCK_PATIENTS = [
  { id: '1', name: 'Sarah Johnson', condition: 'Type 2 Diabetes', matches: 4, status: 'Active' },
  { id: '2', name: 'Robert Chen', condition: 'Breast Cancer Stage II', matches: 2, status: 'Pending' },
  { id: '3', name: 'Maria Garcia', condition: 'COPD', matches: 6, status: 'Active' },
  { id: '4', name: 'James Wilson', condition: 'Hypertension', matches: 1, status: 'Active' },
  { id: '5', name: 'Emily Davis', condition: 'Multiple Sclerosis', matches: 3, status: 'Pending' },
];

const PatientsScreen = ({ navigation }: PatientsScreenProps) => {
  return (
    <SafeAreaView style={styles.container}>
      <AppHeader />

      <FlatList
        data={MOCK_PATIENTS}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        ListHeaderComponent={
          <View style={GlobalStyles.headerCenter}>
            <Text style={GlobalStyles.headerTitle}>Patients</Text>
            <Text style={GlobalStyles.headerSub}>
              Manage patient profiles and find matching trials
            </Text>
          </View>
        }
        renderItem={({ item }) => (
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


export default PatientsScreen;
