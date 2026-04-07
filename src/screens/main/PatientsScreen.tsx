import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { DrawerParamList } from '../../types/navigation';
import { styles } from './PatientsScreen.styles';
import AppHeader from '../../components/common/AppHeader';
import { GlobalStyles } from '../../styles/GlobalStyles';
import { CalenderIcon, ChevronDownIcon, ChevronRightIcon, CirclesIcon, CprIcon, FilterIcon, LocationIcon, MapPinIcon, SearchIcon } from '../../assets/icons';
import { Colors } from '../../constants/theme';

type PatientsScreenProps = {
  navigation: DrawerNavigationProp<DrawerParamList, 'Patients'>;
};

type Marker = { label: string; positive: boolean };

type Patient = {
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
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('All Cancer Types');
  
  return (
    <SafeAreaView style={styles.container}>
      <AppHeader />

      <FlatList
        data={patients}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        ListHeaderComponent={
          <View style={GlobalStyles.headerCenter}>
            <Text style={GlobalStyles.headerTitle}>Patients</Text>
            <Text style={GlobalStyles.headerSub}>
              Manage patient profiles and find matching trials
            </Text>
            {/* Search */}
            <View style={GlobalStyles.searchBar}>
              <SearchIcon width={16} height={16} style={GlobalStyles.searchIcon} stroke={Colors.textMuted}/>
              <TextInput
                placeholder="Search patients..."
                placeholderTextColor={Colors.textMuted}
                style={GlobalStyles.searchInput}
              />
            </View>
            {/* Filter */}
            <View style={GlobalStyles.filterWrapper}>
              <TouchableOpacity
                style={GlobalStyles.filterBtn}
                activeOpacity={0.7}
                onPress={() => setFilterOpen(true)}
              >
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <FilterIcon width={16} height={16} stroke={Colors.textMuted} />
                  <Text style={GlobalStyles.filterText}> {selectedFilter} </Text>
                  <ChevronDownIcon width={16} height={16} stroke={Colors.textMuted} />
                </View>
              </TouchableOpacity>
            </View>
          </View>
        }
        renderItem={({ item }) => (
          <PatientCard key={item.id} patient={item} />
        )}
      />
    </SafeAreaView>
  );
}

function PatientCard({ patient }: { patient: Patient; selected?: boolean }) {
  return (
    <TouchableOpacity style={{ ...styles.card, borderRadius: 12, borderColor: Colors.searchBorder, borderWidth: 1 }} activeOpacity={0.8}>
      <View style={{ marginHorizontal: 4, marginVertical: 8, flex: 1, }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={styles.patientName}>{patient.id}</Text>
          <View style={{ flexDirection: 'row', gap: 6, flexWrap: 'wrap', backgroundColor: Colors.success, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 12 }}>
            <Text style={styles.patientTag}>ECOG {patient.ecog}</Text>
          </View>
        </View>
        <Text style={styles.patientDescription}>{patient.diagnosis}</Text>
        <View style={{ flexDirection: 'row', marginTop: 6, justifyContent: 'space-evenly', alignItems: 'flex-start' }}>
          <View style={{ flex:1, flexDirection: 'row', marginTop: 6, gap: 4}}>
            <CalenderIcon width={16} height={16} stroke={Colors.textMuted} />
            <Text style={{ fontSize: 12, color: Colors.textMuted, marginLeft: 4 }}>
              {patient.age}y, {patient.sex}
            </Text>
          </View>
          <View style={{ flex: 1, flexDirection: 'row', marginTop: 6, gap: 4}}>
            <CprIcon width={16} height={16} stroke={Colors.textMuted} />
            <Text style={{ fontSize: 12, color: Colors.textMuted, marginLeft: 4 }}>
              {patient.stage}
            </Text>
          </View>
        </View>
        <View style={{ flexDirection: 'row', marginTop: 6, justifyContent: 'space-evenly', alignItems: 'flex-start' }}>
          <View style={{ flex:1, flexDirection: 'row', marginTop: 6, gap: 4}}>
            <MapPinIcon width={16} height={16} stroke={Colors.textMuted} />
            <Text style={{ fontSize: 12, color: Colors.textMuted, marginLeft: 4 }}>
              {patient.location}
            </Text>
          </View>
        </View>
        <View style={styles.markerRow}>
          {patient.markers.map((m) => (
            <MarkerBadge key={m.label} {...m} />
          ))}
        </View>
        <View style={{ marginTop: 16, backgroundColor: Colors.inputBorder, height: 1 }}></View>
        <View style={{ flex: 1, flexDirection: 'row', marginTop: 10, alignItems: 'center', justifyContent: 'center'}}>
          <View style={{ flex:1, flexDirection: 'row', alignItems: 'center', gap: 4}}>
            <CirclesIcon width={16} height={16} stroke={Colors.primary} />
            <Text style={{ fontSize: 12, color: Colors.primary, marginLeft: 4 }}>
              {patient.eligibleTrials} Eligible Trial{patient.eligibleTrials !== 1 ? 's' : ''}
            </Text>
          </View>
          <ChevronRightIcon width={16} height={16} stroke={Colors.textMuted} />
        </View>
      </View>
    </TouchableOpacity>
  );
}

function MarkerBadge({ label, positive }: Marker) {
  return (
    <View style={[styles.badge, positive ? styles.badgePos : styles.badgeNeg]}>
      <Text style={[styles.badgeText, positive ? styles.badgeTextPos : styles.badgeTextNeg]}>
        {label}: {positive ? '+' : '-'}
      </Text>
    </View>
  );
}

export default PatientsScreen;

