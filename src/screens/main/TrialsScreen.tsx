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
import { styles } from './TrialsScreen.styles';
import AppHeader from '../../components/common/AppHeader';
import { GlobalStyles } from '../../styles/GlobalStyles';

type TrialsScreenProps = {
  navigation: DrawerNavigationProp<DrawerParamList, 'Trials'>;
};

const MOCK_TRIALS = [
  { id: '1', title: 'Phase III Diabetes Study', sponsor: 'MedResearch Inc.', phase: 'Phase III', slots: 12, condition: 'Type 2 Diabetes' },
  { id: '2', title: 'Oncology Immunotherapy Trial', sponsor: 'CancerCare Labs', phase: 'Phase II', slots: 5, condition: 'Breast Cancer' },
  { id: '3', title: 'COPD Bronchodilator Study', sponsor: 'PulmoTech', phase: 'Phase II', slots: 20, condition: 'COPD' },
  { id: '4', title: 'Hypertension Drug Trial', sponsor: 'CardioResearch', phase: 'Phase IV', slots: 8, condition: 'Hypertension' },
];

const TrialsScreen = ({ navigation }: TrialsScreenProps) => {
  return (
    <SafeAreaView style={styles.container}>
      <AppHeader />

      <FlatList
        data={MOCK_TRIALS}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        ListHeaderComponent={
          <View style={GlobalStyles.headerCenter}>
            <Text style={GlobalStyles.headerTitle}>Trials</Text>
            <Text style={GlobalStyles.headerSub}>
              Browse recruiting oncology trials and their eligibility criteria
            </Text>
          </View>
        }
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card} activeOpacity={0.8}>
            <View style={styles.cardTop}>
              <Text style={styles.trialTitle}>{item.title}</Text>
              <View style={styles.phaseBadge}>
                <Text style={styles.phaseText}>{item.phase}</Text>
              </View>
            </View>
            <Text style={styles.sponsor}>{item.sponsor}</Text>
            <Text style={styles.condition}>{item.condition}</Text>
            <View style={styles.cardBottom}>
              <Text style={styles.slots}>{item.slots} slots available</Text>
              <TouchableOpacity style={styles.viewButton}>
                <Text style={styles.viewButtonText}>View</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}


export default TrialsScreen;
