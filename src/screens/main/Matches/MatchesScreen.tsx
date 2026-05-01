import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { DrawerParamList } from '../../../types/navigation';
import { Colors } from '../../../constants/theme';
import { styles } from './MatchesScreen.styles';
import AppHeader from '../../../components/common/AppHeader';
import { GlobalStyles } from '../../../styles/GlobalStyles';
import { MapPinIcon, LocationIcon, EyeIcon } from '../../../assets/icons';

type MatchesScreenProps = {
  navigation: DrawerNavigationProp<DrawerParamList, 'Matches'>;
};

type MatchItem = {
  id: string;
  score: number;
  patient: string;
  condition: string;
  trialName: string;
  nctId: string;
  criteriaMet: number;
  criteriaTotal: number;
  matchedDate: string;
  patientLocation: string;
  trialLocation: string;
  eligible: boolean;
};

const MOCK_MATCHES: MatchItem[] = [
  {
    id: '1',
    score: 85,
    patient: 'Sarah Chen',
    condition: 'EGFR-mutated non-small cell lung adenocarcinoma',
    trialName: 'FLAURA2',
    nctId: 'NCT04035486',
    criteriaMet: 3,
    criteriaTotal: 3,
    matchedDate: '31/03/2026',
    patientLocation: 'Boston, MA',
    trialLocation: 'Boston, MA',
    eligible: true,
  },
  {
    id: '2',
    score: 10,
    patient: 'Sarah Chen',
    condition: 'EGFR-mutated non-small cell lung adenocarcinoma',
    trialName: 'CodeBreaK 200',
    nctId: 'NCT04303780',
    criteriaMet: 0,
    criteriaTotal: 2,
    matchedDate: '31/03/2026',
    patientLocation: 'Boston, MA',
    trialLocation: 'Boston, MA',
    eligible: false,
  },
];

function getScoreColor(score: number): string {
  if (score >= 70) return Colors.statusLikelyEligible;
  if (score >= 40) return Colors.warning;
  return Colors.statusIneligible;
}

function getScoreBgColor(score: number): string {
  if (score >= 70) return Colors.statusLikelyEligibleLight;
  if (score >= 40) return Colors.statusPendingBg;
  return Colors.statusIneligibleLight;
}

const MatchCard = ({ item }: { item: MatchItem }) => (
  <View style={styles.card}>
    {/* Top row: score badge + patient/trial info */}
    <View style={styles.topRow}>
      <View style={[styles.scoreBadge, { backgroundColor: getScoreBgColor(item.score) }]}>
        <Text style={[styles.scoreText, { color: getScoreColor(item.score) }]}>
          {item.score}%
        </Text>
      </View>

      <View style={styles.matchInfo}>
        {/* Patient side */}
        <View style={styles.patientBlock}>
          <Text style={styles.patientName}>{item.patient}</Text>
          <Text style={styles.condition} numberOfLines={2}>{item.condition}</Text>
        </View>

        {/* Arrow */}
        <Text style={styles.arrow}>→</Text>

        {/* Trial side */}
        <View style={styles.trialBlock}>
          <Text style={styles.trialName}>{item.trialName}</Text>
          <Text style={styles.nctId}>{item.nctId}</Text>
        </View>
      </View>
    </View>

    {/* Criteria & date row */}
    <Text style={styles.metaRow}>
      {item.criteriaMet}/{item.criteriaTotal} criteria met{'  •  '}Matched {item.matchedDate}{'  •'}
    </Text>

    {/* Location row */}
    <View style={styles.locationRow}>
      <MapPinIcon width={13} height={13} stroke={Colors.textMuted} />
      <Text style={styles.locationText}>Patient: {item.patientLocation}</Text>
      <Text style={styles.locationDot}>  •  </Text>
      <LocationIcon width={13} height={13} stroke={Colors.textMuted} />
      <Text style={styles.locationText}>Trial: {item.trialLocation}</Text>
    </View>

    {/* Eligibility & eye icon */}
    <View style={styles.bottomRow}>
      <View style={[
        styles.eligibilityBadge,
        { backgroundColor: item.eligible ? Colors.statusEligible : Colors.statusIneligible },
      ]}>
        <Text style={styles.eligibilityText}>
          {item.eligible ? 'Eligible' : 'Ineligible'}
        </Text>
      </View>
      <TouchableOpacity hitSlop={8}>
        <EyeIcon width={22} height={22} stroke={Colors.textMuted} />
      </TouchableOpacity>
    </View>
  </View>
);

const MatchesScreen = ({ navigation }: MatchesScreenProps) => (
  <SafeAreaView style={styles.container}>
    <AppHeader />
    <FlatList
      data={MOCK_MATCHES}
      keyExtractor={item => item.id}
      contentContainerStyle={styles.list}
      ListHeaderComponent={
        <View style={GlobalStyles.headerCenter}>
          <Text style={GlobalStyles.headerTitle}>Match Results</Text>
          <Text style={GlobalStyles.headerSub}>
            Review patient-trial matches with AI-powered eligibility analysis
          </Text>
        </View>
      }
      renderItem={({ item }) => <MatchCard item={item} />}
    />
  </SafeAreaView>
);

export default MatchesScreen;
