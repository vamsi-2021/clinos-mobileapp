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

type TrialsScreenProps = {
  navigation: DrawerNavigationProp<DrawerParamList, 'Trials'>;
};

const MOCK_TRIALS = [
  {id: '1', title: 'Phase III Diabetes Study', sponsor: 'MedResearch Inc.', phase: 'Phase III', slots: 12, condition: 'Type 2 Diabetes'},
  {id: '2', title: 'Oncology Immunotherapy Trial', sponsor: 'CancerCare Labs', phase: 'Phase II', slots: 5, condition: 'Breast Cancer'},
  {id: '3', title: 'COPD Bronchodilator Study', sponsor: 'PulmoTech', phase: 'Phase II', slots: 20, condition: 'COPD'},
  {id: '4', title: 'Hypertension Drug Trial', sponsor: 'CardioResearch', phase: 'Phase IV', slots: 8, condition: 'Hypertension'},
];

const TrialsScreen = ({navigation}: TrialsScreenProps) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.openDrawer()} style={styles.menuButton}>
          <Text style={styles.menuIcon}>☰</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Trials</Text>
      </View>

      <FlatList
        data={MOCK_TRIALS}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        renderItem={({item}) => (
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
  list: {padding: 16, gap: 12},
  card: {
    backgroundColor: Colors.white,
    borderRadius: 14,
    padding: 16,
  },
  cardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 6,
    gap: 8,
  },
  trialTitle: {flex: 1, fontSize: 15, fontWeight: '700', color: Colors.textHeading},
  phaseBadge: {
    backgroundColor: Colors.primaryLight,
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 20,
  },
  phaseText: {fontSize: 12, fontWeight: '600', color: Colors.primary},
  sponsor: {fontSize: 13, color: Colors.textBody, marginBottom: 2},
  condition: {fontSize: 13, color: Colors.textMuted, marginBottom: 12},
  cardBottom: {flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'},
  slots: {fontSize: 13, color: Colors.secondary, fontWeight: '600'},
  viewButton: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    backgroundColor: Colors.primary,
    borderRadius: 8,
  },
  viewButtonText: {fontSize: 13, fontWeight: '600', color: Colors.white},
});

export default TrialsScreen;
