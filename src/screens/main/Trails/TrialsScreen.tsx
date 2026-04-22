import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { DrawerParamList } from '../../../types/navigation';
import { styles } from './TrialsScreen.styles';
import AppHeader from '../../../components/common/AppHeader';
import { GlobalStyles } from '../../../styles/GlobalStyles';
import TrialCard from './TrialCard';
import FilterBar, { FilterOption } from '../../../components/common/FilterBar';
import SearchBar from '../../../components/common/SearchBar';
import FlatListHeader from '../../../components/common/FlatListHeader';

type TrialsScreenProps = {
  navigation: DrawerNavigationProp<DrawerParamList, 'Trials'>;
};

// Usage example:
const trials = [{
  name: 'MARIPOSA',
  status: 'Recruiting',
  phase: 'Phase 3',
  nctId: 'NCT04035486',
  description: 'A Study of Amivantamab and Lazertinib in Participants With Advanced Non-Small Cell Lung Cancer (NSCLC) With EGFR Exon 20 Insertion Mutations',
  tags: ['Non-Small Cell Lung Cancer', 'EGFR Mutation Positive'],
  location: 'Boston, MA +2 more',
  completion: '31/12/2025',
  enrolled: 850,
  target: 1074,
  eligiblePatients: 1,
}];

const CANCER_TYPE_OPTIONS: FilterOption[] = [
  { label: 'All Cancer Types', value: 'all' },
  { label: 'Lung Cancer',       value: 'lung' },
  { label: 'Breast Cancer',     value: 'breast' },
  { label: 'Colorectal Cancer', value: 'colorectal' },
  { label: 'Prostate Cancer',   value: 'prostate' },
  { label: 'Melanoma',          value: 'melanoma' },
  { label: 'Bladder Cancer',    value: 'bladder' },
];

const PHASE_OPTIONS: FilterOption[] = [
  { label: 'All Phases', value: 'all' },
  { label: 'Phase 1', value: 'phase 1' },
  { label: 'Phase 2', value: 'phase 2' },
  { label: 'Phase 3', value: 'phase 3' },
  { label: 'Phase 4', value: 'phase 4' },
];

const TrialsScreen = ({ navigation }: TrialsScreenProps) => {

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<FilterOption>(CANCER_TYPE_OPTIONS[0]);
  const [selectedSecondaryFilter, setSelectedSecondaryFilter] = useState<FilterOption>(PHASE_OPTIONS[0]);

    // ✅ Filtering + Search Logic
  const filteredTrials = useMemo(() => {
    return trials.filter(trial => {
      const matchesSearch =
        trial.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        trial.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesFilter =
        selectedFilter.value === 'all' ||
        trial.tags.some(tag =>
          tag.toLowerCase().includes(selectedFilter.value.toLowerCase())
        );

      return matchesSearch && matchesFilter;
    });
  }, [searchQuery, selectedFilter]);
  
  return (
    <SafeAreaView style={styles.container}>
      <AppHeader />

      <FlatList
        data={filteredTrials}
        keyExtractor={item => item.nctId}
        contentContainerStyle={styles.list}
        ListHeaderComponent={
          <FlatListHeader
            headerTitle="Trails"
            headerSub="Browse recruiting oncology trials and their eligibility criteria"
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            selectedFilter={selectedFilter}
            onFilterSelect={setSelectedFilter}
            filterOptions={CANCER_TYPE_OPTIONS}
            selectedSecondaryFilter={selectedSecondaryFilter}
            onSecondaryFilterSelect={setSelectedSecondaryFilter}
            secondaryFilterOptions={PHASE_OPTIONS}
          />
        }
        renderItem={({ item }) => (
          <TrialCard trial={item} />
        )}
      />
    </SafeAreaView>
  );
}


export default TrialsScreen;
