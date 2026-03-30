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
          <Text style={styles.menuIcon}>☰</Text>
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
  scoreBadge: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scoreText: {fontSize: 16, fontWeight: '700'},
  scoreLabel: {fontSize: 10, color: Colors.textMuted},
  info: {flex: 1},
  patient: {fontSize: 15, fontWeight: '600', color: Colors.textHeading, marginBottom: 2},
  trial: {fontSize: 13, color: Colors.textBody, marginBottom: 2},
  date: {fontSize: 12, color: Colors.textMuted},
  reviewButton: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderWidth: 1.5,
    borderColor: Colors.primary,
    borderRadius: 8,
  },
  reviewText: {fontSize: 13, fontWeight: '600', color: Colors.primary},
});

export default MatchesScreen;
