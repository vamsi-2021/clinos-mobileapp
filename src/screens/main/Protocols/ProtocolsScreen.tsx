import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../../constants/theme';
import AppHeader from '../../../components/common/AppHeader';
import FlatListHeader from '../../../components/common/FlatListHeader';
import ProtocolCard, { Protocol } from './ProtocolCard';


const ALL_PROTOCOLS: Protocol[] = [
  {
    id: 'FLAURA2',
    nctNumber: 'NCT04035486',
    phase: 'Phase 3',
    criteriaTotal: 20,
    criteriaApproved: 18,
    criteriaPending: 2,
    status: 'active not recruiting',
    reviewStatus: 'pending_review',
  },
  {
    id: 'CodeBreaK 200',
    nctNumber: 'NCT04303780',
    phase: 'Phase 3',
    criteriaTotal: 16,
    criteriaApproved: 14,
    criteriaPending: 2,
    status: 'active not recruiting',
    reviewStatus: 'pending_review',
  },
  {
    id: 'LUMINARY-1',
    nctNumber: 'NCT05112900',
    phase: 'Phase 2',
    criteriaTotal: 14,
    criteriaApproved: 14,
    criteriaPending: 0,
    status: 'recruiting',
    reviewStatus: 'approved',
  },
  {
    id: 'AURORA-3',
    nctNumber: 'NCT05289140',
    phase: 'Phase 3',
    criteriaTotal: 18,
    criteriaApproved: 16,
    criteriaPending: 2,
    status: 'recruiting',
    reviewStatus: 'pending_review',
  },
  {
    id: 'HORIZON-4',
    nctNumber: 'NCT05401630',
    phase: 'Phase 2',
    criteriaTotal: 12,
    criteriaApproved: 12,
    criteriaPending: 0,
    status: 'active not recruiting',
    reviewStatus: 'approved',
  },
];

const ProtocolsScreen = () => (
  <SafeAreaView style={styles.container}>
    <AppHeader />
    <FlatList
      data={ALL_PROTOCOLS}
      keyExtractor={item => item.id}
      contentContainerStyle={styles.list}
      ListHeaderComponent={
        <FlatListHeader
          headerTitle="Protocol Management"
          headerSub="Manage trial protocols and review eligibility criteria (H1 Gate)"
        />
      }
      renderItem={({ item }) => <ProtocolCard item={item} />}
    />
  </SafeAreaView>
);

export default ProtocolsScreen;

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
