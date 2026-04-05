import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {DrawerParamList} from '../../types/navigation';
import {Colors} from '../../constants/theme';
import {styles} from './MatchesScreen.styles';
import AppHeader from '../../components/common/AppHeader';
import { GlobalStyles } from '../../styles/GlobalStyles';

type MatchesScreenProps = {
  navigation: DrawerNavigationProp<DrawerParamList, 'Matches'>;
};

const MOCK_MATCHES = [
  {id: '1', patient: 'Sarah Johnson', trial: 'Phase III Diabetes Study', score: 94, date: 'Today'},
  {id: '2', patient: 'Robert Chen', trial: 'Oncology Immunotherapy Trial', score: 87, date: 'Today'},
  {id: '3', patient: 'Maria Garcia', trial: 'COPD Bronchodilator Study', score: 91, date: 'Yesterday'},
  {id: '4', patient: 'James Wilson', trial: 'Hypertension Drug Trial', score: 78, date: 'Yesterday'},
  {id: '5', patient: 'Emily Davis', trial: 'MS Neuroprotection Trial', score: 85, date: '2 days ago'},
];

function getScoreColor(score: number): string {
  if (score >= 90) return Colors.scoreHigh;
  if (score >= 75) return Colors.scoreMedium;
  return Colors.scoreLow;
}

const MatchesScreen = ({navigation}: MatchesScreenProps) => {
  return (
    <SafeAreaView style={styles.container}>
      <AppHeader />
      <FlatList
        data={MOCK_MATCHES}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        ListHeaderComponent={
          <View style={GlobalStyles.headerCenter}>
            <Text style={GlobalStyles.headerTitle}>Match Results</Text>
            <Text style={GlobalStyles.headerSub}>
              Review patient-trial matches with AI-powered eligibility analysis
            </Text>
          </View>
        }
        renderItem={({item}) => (
          <TouchableOpacity style={styles.card} activeOpacity={0.8}>
            <View style={[styles.scoreBadge, {backgroundColor: getScoreColor(item.score) + '20'}]}>
              <Text style={[styles.scoreText, {color: getScoreColor(item.score)}]}>
                {item.score}%
              </Text>
              <Text style={styles.scoreLabel}>match</Text>
            </View>
            <View style={styles.info}>
              <Text style={styles.patient}>{item.patient}</Text>
              <Text style={styles.trial}>{item.trial}</Text>
              <Text style={styles.date}>{item.date}</Text>
            </View>
            <TouchableOpacity style={styles.reviewButton}>
              <Text style={styles.reviewText}>Review</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}


export default MatchesScreen;
