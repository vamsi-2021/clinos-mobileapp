import React, { useState } from 'react';
import { FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { DrawerParamList } from '../../../types/navigation';
import { styles } from './PatientsScreen.styles';
import AppHeader from '../../../components/common/AppHeader';
import PatientCard from './PatientCard';
import { FilterOption } from '../../../components/common/FilterBar';
import FlatListHeader from '../../../components/common/FlatListHeader';

type PatientsScreenProps = {
  navigation: DrawerNavigationProp<DrawerParamList, 'Patients'>;
};

type Marker = { label: string; positive: boolean };

export type Patient = {
  id: string;
  diagnosis: string;
  age: number;
  sex: string;
  stage: string;
  location: string;
  ecog: number;
  markers: Marker[];
  eligibleTrials: number;
};

const CANCER_TYPE_OPTIONS: FilterOption[] = [
  { label: 'All Cancer Types', value: 'all' },
  { label: 'Lung Cancer',       value: 'lung' },
  { label: 'Breast Cancer',     value: 'breast' },
  { label: 'Colorectal Cancer', value: 'colorectal' },
  { label: 'Prostate Cancer',   value: 'prostate' },
  { label: 'Melanoma',          value: 'melanoma' },
  { label: 'Bladder Cancer',    value: 'bladder' },
];

const patients: Patient[] = [
  {
    id: 'PT-001',
    diagnosis: 'EGFR-mutated non-small cell lung adenocarcinoma',
    age: 58,
    sex: 'Female',
    stage: 'Stage IV',
    location: 'Boston, MA',
    ecog: 1,
    markers: [
      { label: 'EGFR', positive: true },
      { label: 'PD-L1', positive: true },
      { label: 'ALK', positive: false },
    ],
    eligibleTrials: 1,
  },
  {
    id: 'PT-002',
    diagnosis: 'KRAS G12C mutated non-small cell lung cancer',
    age: 67,
    sex: 'Male',
    stage: 'Stage IIIB',
    location: 'New York, NY',
    ecog: 0,
    markers: [
      { label: 'KRAS', positive: true },
      { label: 'PD-L1', positive: true },
      { label: 'EGFR', positive: false },
    ],
    eligibleTrials: 1,
  },
];

const PatientsScreen = ({ navigation }: PatientsScreenProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<FilterOption>(CANCER_TYPE_OPTIONS[0]);

  const filteredPatients = patients.filter(p => {
    const matchesSearch =
      p.diagnosis.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.id.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesFilter =
      selectedFilter.value === 'all' ||
      p.diagnosis.toLowerCase().includes(selectedFilter.value);

    return matchesSearch && matchesFilter;
  });

  return (
    <SafeAreaView style={styles.container}>
      <AppHeader />
      <FlatList
        data={filteredPatients}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        ListHeaderComponent={
          <FlatListHeader
            headerTitle="Patients"
            headerSub="Manage patient profiles and find matching trials"
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            selectedFilter={selectedFilter}
            onFilterSelect={setSelectedFilter}
            filterOptions={CANCER_TYPE_OPTIONS}
          />
        }
        renderItem={({ item }) => <PatientCard patient={item} />}
      />
    </SafeAreaView>
  );
};

export default PatientsScreen;