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
import PatientProfileModal, { PatientProfile } from './PatientProfileModal';

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

const PATIENT_PROFILES: Record<string, PatientProfile> = {
  'PT-001': {
    patientId: 'PT-001',
    lastUpdated: '23/03/2026',
    age: 58,
    gender: 'Female',
    ecog: 1,
    diagnosis: 'EGFR-mutated non-small cell lung adenocarcinoma - Stage IV',
    location: 'Boston, MA',
    biomarkers: [
      { label: 'EGFR', value: 'L858R mutation' },
      { label: 'PD-L1', value: '60%' },
      { label: 'ALK', value: 'Negative' },
    ],
    priorTreatments: ['Carboplatin/Pemetrexed', 'Pembrolizumab'],
    labValues: [
      { label: 'Hemoglobin', value: '12.5 g/dL' },
      { label: 'Creatinine', value: '0.9 mg/dL' },
    ],
    matchingTrials: [
      { name: 'FLAURA2', nct: 'NCT04035486', score: 85, eligible: true },
      { name: 'CodeBreaK 200', nct: 'NCT04303780', score: 10, eligible: false },
      { name: 'Nivo+Talazoparib Melanoma', nct: 'NCT04187833', score: 5, eligible: false },
      { name: 'DESTINY-Breast03', nct: 'NCT03529110', score: 0, eligible: false },
    ],
  },
  'PT-002': {
    patientId: 'PT-002',
    lastUpdated: '28/03/2026',
    age: 67,
    gender: 'Male',
    ecog: 0,
    diagnosis: 'KRAS G12C mutated non-small cell lung cancer - Stage IIIB',
    location: 'New York, NY',
    biomarkers: [
      { label: 'KRAS', value: 'G12C mutation' },
      { label: 'PD-L1', value: '35%' },
      { label: 'EGFR', value: 'Negative' },
    ],
    priorTreatments: ['Carboplatin/Paclitaxel', 'Bevacizumab'],
    labValues: [
      { label: 'Hemoglobin', value: '13.8 g/dL' },
      { label: 'Creatinine', value: '1.1 mg/dL' },
    ],
    matchingTrials: [
      { name: 'CodeBreaK 200', nct: 'NCT04303780', score: 78, eligible: true },
      { name: 'FLAURA2', nct: 'NCT04035486', score: 15, eligible: false },
    ],
  },
};

const PatientsScreen = ({ navigation }: PatientsScreenProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<FilterOption>(CANCER_TYPE_OPTIONS[0]);
  const [selectedProfile, setSelectedProfile] = useState<PatientProfile | null>(null);

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
        renderItem={({ item }) => (
          <PatientCard
            patient={item}
            onTrialsPress={() => {
              const profile = PATIENT_PROFILES[item.id];
              if (profile) setSelectedProfile(profile);
            }}
          />
        )}
      />
      {selectedProfile !== null && (
        <PatientProfileModal
          visible
          profile={selectedProfile}
          onClose={() => setSelectedProfile(null)}
        />
      )}
    </SafeAreaView>
  );
};

export default PatientsScreen;