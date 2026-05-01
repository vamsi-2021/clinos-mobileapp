import React, { useMemo, useState } from 'react';
import { FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CompositeNavigationProp } from '@react-navigation/native';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { DrawerParamList, MainStackParamList } from '../../../types/navigation';
import { styles } from './PatientQueueScreen.styles';
import AppHeader from '../../../components/common/AppHeader';
import FlatListHeader from '../../../components/common/FlatListHeader';
import { FilterOption } from '../../../components/common/FilterBar';
import PatientQueueCard, { QueuePatient } from './PatientQueueCard';

type Props = {
  navigation: CompositeNavigationProp<
    DrawerNavigationProp<DrawerParamList, 'PatientQueue'>,
    NativeStackNavigationProp<MainStackParamList>
  >;
};

const DIAGNOSIS_OPTIONS: FilterOption[] = [
  { label: 'All Diagnoses',    value: 'all' },
  { label: 'Lung Cancer',      value: 'lung' },
  { label: 'Breast Cancer',    value: 'breast' },
  { label: 'Colorectal Cancer',value: 'colorectal' },
  { label: 'Prostate Cancer',  value: 'prostate' },
  { label: 'Melanoma',         value: 'melanoma' },
];

const SORT_OPTIONS: FilterOption[] = [
  { label: 'Match Score',      value: 'score' },
  { label: 'Date Added',       value: 'date' },
  { label: 'Data Completeness',value: 'completeness' },
];

const INITIAL_PATIENTS: QueuePatient[] = [
  {
    id: 'PT-003',
    diagnosis: 'HER2-positive metastatic breast cancer',
    age: 45,
    sex: 'Female',
    stage: 'Stage IV',
    ecog: 1,
    score: 95,
    dataCompleteness: 85,
    markers: [
      { label: 'HER2', positive: true },
      { label: 'ER',   positive: false },
      { label: 'PR',   positive: false },
    ],
  },
  {
    id: 'PT-001',
    diagnosis: 'EGFR-mutated non-small cell lung adenocarcinoma',
    age: 58,
    sex: 'Female',
    stage: 'Stage IV',
    ecog: 1,
    score: 85,
    dataCompleteness: 72,
    markers: [
      { label: 'EGFR',  positive: true },
      { label: 'PD-L1', positive: true },
      { label: 'ALK',   positive: false },
    ],
  },
  {
    id: 'PT-002',
    diagnosis: 'KRAS G12C mutated non-small cell lung cancer',
    age: 67,
    sex: 'Male',
    stage: 'Stage IIIB',
    ecog: 0,
    score: 80,
    dataCompleteness: 85,
    markers: [
      { label: 'KRAS',  positive: true },
      { label: 'PD-L1', positive: true },
      { label: 'EGFR',  positive: false },
    ],
  },
  {
    id: 'PT-010',
    diagnosis: 'ALK-rearranged non-small cell lung cancer',
    age: 63,
    sex: 'Male',
    stage: 'Stage IV',
    ecog: 1,
    score: 45,
    dataCompleteness: 85,
    investigateCount: 1,
    markers: [
      { label: 'ALK',   positive: true },
      { label: 'EGFR',  positive: false },
      { label: 'PD-L1', positive: true },
    ],
  },
];

const PatientQueueScreen = ({ navigation }: Props) => {
  const [patients, setPatients] = useState<QueuePatient[]>(INITIAL_PATIENTS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDiagnosis, setSelectedDiagnosis] = useState<FilterOption>(DIAGNOSIS_OPTIONS[0]);
  const [selectedSort, setSelectedSort] = useState<FilterOption>(SORT_OPTIONS[0]);

  const filtered = useMemo(() => {
    let list = patients.filter(p => {
      const matchesSearch =
        p.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.diagnosis.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesDiagnosis =
        selectedDiagnosis.value === 'all' ||
        p.diagnosis.toLowerCase().includes(selectedDiagnosis.value);
      return matchesSearch && matchesDiagnosis;
    });

    if (selectedSort.value === 'score') {
      list = [...list].sort((a, b) => b.score - a.score);
    } else if (selectedSort.value === 'completeness') {
      list = [...list].sort((a, b) => b.dataCompleteness - a.dataCompleteness);
    }

    return list;
  }, [patients, searchQuery, selectedDiagnosis, selectedSort]);

  return (
    <SafeAreaView style={styles.container}>
      <AppHeader />
      <FlatList
        data={filtered}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        ListHeaderComponent={
          <FlatListHeader
            headerTitle="Eligibility Queue"
            headerSub="Patient queue ranked by match score — review and confirm eligibility"
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            selectedFilter={selectedDiagnosis}
            onFilterSelect={setSelectedDiagnosis}
            filterOptions={DIAGNOSIS_OPTIONS}
            selectedSecondaryFilter={selectedSort}
            onSecondaryFilterSelect={setSelectedSort}
            secondaryFilterOptions={SORT_OPTIONS}
          />
        }
        renderItem={({ item }) => <PatientQueueCard patient={item} navigation={navigation} />}
      />
    </SafeAreaView>
  );
};

export default PatientQueueScreen;
