import React, { useMemo, useState } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { DrawerParamList } from '../../../types/navigation';
import { Colors } from '../../../constants/theme';
import AppHeader from '../../../components/common/AppHeader';
import FlatListHeader from '../../../components/common/FlatListHeader';
import { FilterOption } from '../../../components/common/FilterBar';
import InvestigateCard, { InvestigateCase, TierLevel } from './InvestigateCard';

type Props = {
  navigation: DrawerNavigationProp<DrawerParamList, 'Investigate'>;
};

const ALL_CASES: InvestigateCase[] = [
  {
    id: 'PT-A3F8C2',
    trial: 'LUMINARY-1',
    tier: 'T1',
    issue: 'Missing CrCl lab value within 90-day window',
    criterion: 'CrCl ≥ 50 mL/min within 90 days',
    lastValue: '58 mL/min (March 1)',
  },
  {
    id: 'PT-D7E1B4',
    trial: 'AURORA-3',
    tier: 'T1',
    issue: 'Missing BRCA mutation test result',
    criterion: 'BRCA1/2 germline or somatic mutation',
    lastValue: 'Not tested',
  },
  {
    id: 'PT-F2B9A1',
    trial: 'HORIZON-4',
    tier: 'T1',
    issue: 'Hemoglobin not recorded in past 14 days',
    criterion: 'Hemoglobin ≥ 9 g/dL within 14 days',
    lastValue: '10.2 g/dL (21 days ago)',
  },
  {
    id: 'PT-G5C3D8',
    trial: 'LUMINARY-1',
    tier: 'T1',
    issue: 'Missing platelet count within 30-day window',
    criterion: 'Platelets ≥ 100,000/µL within 30 days',
    lastValue: '145,000/µL (35 days ago)',
  },
  {
    id: 'PT-C8F2D6',
    trial: 'LUMINARY-1',
    tier: 'T2',
    issue: 'ECOG documented 45 days ago, protocol requires within 30 days',
    criterion: 'ECOG assessment within 30 days',
    lastValue: 'ECOG 1 (45 days ago)',
    isOverdue: true,
  },
  {
    id: 'PT-E1A4B9',
    trial: 'HORIZON-4',
    tier: 'T2',
    issue: 'Conflicting staging records between radiology and pathology',
    criterion: 'Confirmed stage via imaging',
    lastValue: 'Stage III (path) vs Stage IV (rad)',
    isOverdue: true,
  },
  {
    id: 'PT-H7D1E5',
    trial: 'AURORA-3',
    tier: 'T2',
    issue: 'Prior therapy documentation incomplete',
    criterion: '≥2 prior systemic therapies documented',
    lastValue: '1 confirmed line documented',
    isOverdue: true,
  },
  {
    id: 'PT-J3A8F2',
    trial: 'LUMINARY-1',
    tier: 'T2',
    issue: 'Tumor size measurement exceeds protocol limit',
    criterion: 'Target lesion ≤ 50mm at baseline',
    lastValue: '52mm (last scan)',
    isOverdue: true,
  },
  {
    id: 'PT-K9N1P5',
    trial: 'LUMINARY-1',
    tier: 'T3',
    issue: 'CrCl = 52 mL/min vs threshold of 50 mL/min (4% above)',
    criterion: 'CrCl ≥ 50 mL/min',
    lastValue: '52 mL/min',
  },
];

const tierCount = (tier: TierLevel) =>
  ALL_CASES.filter(c => c.tier === tier).length;

const TIER_TABS: FilterOption[] = [
  { label: `All (${ALL_CASES.length})`, value: 'all' },
  { label: `Tier 1 (${tierCount('T1')})`, value: 'T1' },
  { label: `Tier 2 (${tierCount('T2')})`, value: 'T2' },
  { label: `Tier 3 (${tierCount('T3')})`, value: 'T3' },
];

const InvestigateScreen = ({ navigation }: Props) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTab, setSelectedTab] = useState<FilterOption>(TIER_TABS[0]);

  const filtered = useMemo(() => {
    return ALL_CASES.filter(c => {
      const matchesTier =
        selectedTab.value === 'all' || c.tier === selectedTab.value;
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        !q ||
        c.id.toLowerCase().includes(q) ||
        c.trial.toLowerCase().includes(q) ||
        c.issue.toLowerCase().includes(q);
      return matchesTier && matchesSearch;
    });
  }, [searchQuery, selectedTab]);

  return (
    <SafeAreaView style={styles.container}>
      <AppHeader />
      <FlatList
        data={filtered}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        ListHeaderComponent={
          <FlatListHeader
            headerTitle="Investigate Queue"
            headerSub="Resolve open investigate cases across all patients"
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            tabFilterOptions={TIER_TABS}
            selectedTabFilter={selectedTab}
            onTabFilterSelect={setSelectedTab}
          />
        }
        renderItem={({ item }) => <InvestigateCard item={item} />}
      />
    </SafeAreaView>
  );
};

export default InvestigateScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundPage,
  },
  list: {
    padding: 16,
    gap: 12,
  },
});
