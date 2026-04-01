import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {DrawerParamList} from '../../types/navigation';
import {Colors} from '../../constants/theme';
import {styles} from './MatchesScreen.styles';
import {MenuIcon} from '../../assets/icons';

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
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.openDrawer()} style={styles.menuButton}>
          <MenuIcon width={24} height={24} fill={Colors.textHeading} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Matches</Text>
      </View>

      <FlatList
        data={MOCK_MATCHES}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
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
