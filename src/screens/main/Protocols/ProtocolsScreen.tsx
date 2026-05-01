import React from 'react';
import { FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CompositeNavigationProp } from '@react-navigation/native';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { DrawerParamList, MainStackParamList } from '../../../types/navigation';
import AppHeader from '../../../components/common/AppHeader';
import FlatListHeader from '../../../components/common/FlatListHeader';
import ProtocolCard, { Protocol } from './ProtocolCard';
import { styles } from './ProtocolsScreen.styles';

type Props = {
  navigation: CompositeNavigationProp<
    DrawerNavigationProp<DrawerParamList, 'Protocols'>,
    NativeStackNavigationProp<MainStackParamList>
  >;
};


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

const ProtocolsScreen = ({ navigation }: Props) => (
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
      renderItem={({ item }) => <ProtocolCard item={item} navigation={navigation} />}
    />
  </SafeAreaView>
);

export default ProtocolsScreen;
