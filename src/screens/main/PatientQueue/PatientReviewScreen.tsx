import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { MainStackParamList } from '../../../types/navigation';
import { Colors } from '../../../constants/theme';
import { CheckCircleIcon, CircleXMarkIcon, DefenceIcon, DnaIcon, TrendingIcon } from '../../../assets/icons';
import ActionModal, { ActionModalType } from '../../../components/common/ActionModal';
import GradientBackground from '../../../components/common/GradientBackground';
import { styles } from './PatientReviewScreen.styles';

type Props = {
  navigation: NativeStackNavigationProp<MainStackParamList, 'PatientReview'>;
  route: RouteProp<MainStackParamList, 'PatientReview'>;
};

type CriterionStatus = 'MET' | 'UNMET';

type TrialCriterion = {
  status: CriterionStatus;
  criterion: string;
  patientValue: string;
  required?: string;
};

type TrialMatch = {
  id: string;
  name: string;
  indication: string;
  nctId: string;
  score: number;
  badgeType: 'requires_review' | 'ineligible' | 'eligible';
  criteria: TrialCriterion[];
  summary: string;
};

const MOCK_DATA: Record<string, {
  token: string;
  age: number;
  gender: string;
  diagnosis: string;
  stage: string;
  ecog: number;
  biomarkers: { label: string; value: string }[];
  labValues: { label: string; value: string }[];
  trials: TrialMatch[];
}> = {
  'PT-010': {
    token: 'PT-010',
    age: 63,
    gender: 'Male',
    diagnosis: 'ALK-rearranged non-small cell lung cancer',
    stage: 'Stage IV',
    ecog: 1,
    biomarkers: [
      { label: 'ALK',  value: 'EML4-ALK fusion' },
      { label: 'EGFR', value: 'Wild type' },
      { label: 'PD-L1',value: '40%' },
    ],
    labValues: [
      { label: 'Creatinine', value: '0.95 mg/dL' },
      { label: 'AST',        value: '32 U/L' },
    ],
    trials: [
      {
        id: 't1',
        name: 'Nivo+Talazoparib',
        indication: 'Melanoma',
        nctId: 'NCT04187833',
        score: 45,
        badgeType: 'requires_review',
        criteria: [
          {
            status: 'MET',
            criterion: 'ALK rearrangement confirmed by FISH or NGS',
            patientValue: 'EML4-ALK fusion',
            required: 'FISH/NGS+',
          },
          {
            status: 'MET',
            criterion: 'ECOG performance status 0-1',
            patientValue: '1',
            required: '0-1',
          },
          {
            status: 'UNMET',
            criterion: 'No prior systemic treatment for advanced NSCLC',
            patientValue: 'Prior treatment with Alectinib, Brigatinib',
          },
        ],
        summary:
          'While the patient has the required ALK rearrangement, this trial (CROWN) is for first-line treatment and the patient has already progressed on two prior ALK TKIs.',
      },
      {
        id: 't2',
        name: 'CodeBreaK 200',
        indication: '',
        nctId: 'NCT04303780',
        score: 10,
        badgeType: 'ineligible',
        criteria: [
          {
            status: 'MET',
            criterion: 'ALK rearrangement confirmed by FISH or NGS',
            patientValue: 'EML4-ALK fusion',
            required: 'FISH/NGS+',
          },
          {
            status: 'UNMET',
            criterion: 'KRAS G12C mutation confirmed by local or central testing',
            patientValue: 'ALK rearrangement',
            required: 'KRAS G12C+',
          },
        ],
        summary:
          'Patient does not carry a KRAS G12C mutation, which is the primary eligibility criterion for this trial.',
      },
    ],
  },
};

function scoreColor(score: number) {
  if (score >= 70) return Colors.statusLikelyEligible;
  if (score >= 40) return Colors.warning;
  return Colors.statusIneligible;
}

function badgeStyle(type: TrialMatch['badgeType']) {
  if (type === 'requires_review') return { bg: Colors.warning, text: Colors.white };
  if (type === 'ineligible') return { bg: Colors.statusIneligible, text: Colors.white };
  return { bg: Colors.statusEligible, text: Colors.white };
}

function badgeLabel(type: TrialMatch['badgeType']) {
  if (type === 'requires_review') return 'requires review';
  if (type === 'ineligible') return 'ineligible';
  return 'eligible';
}

const COL_WIDTHS = { status: 90, criterion: 180, patientVal: 130, required: 110 };

const StatusChip = ({ status }: { status: CriterionStatus }) => (
  <View style={[styles.statusChip, status === 'MET' ? styles.chipMet : styles.chipUnmet]}>
    <Text style={[styles.statusChipText, status === 'MET' ? styles.chipMetText : styles.chipUnmetText]}>
      {status === 'MET' ? '⊙ MET' : '⊗ UNMET'}
    </Text>
  </View>
);

const TrialCard = ({
  trial,
  patientToken,
}: {
  trial: TrialMatch;
  patientToken: string;
}) => {
  const [confirmVisible, setConfirmVisible] = useState(false);
  const [ineligibleVisible, setIneligibleVisible] = useState(false);
  const badge = badgeStyle(trial.badgeType);

  return (
    <View style={styles.sectionCard}>
      {/* Trial header */}
      <View style={styles.trialHeader}>
        <View style={styles.trialNameBlock}>
          <Text style={styles.trialName}>{trial.name}</Text>
          {trial.indication ? <Text style={styles.trialIndication}>{trial.indication}</Text> : null}
          <Text style={styles.trialNct}>{trial.nctId}</Text>
        </View>
        <View style={styles.trialScoreBlock}>
          <Text style={[styles.trialScore, { color: scoreColor(trial.score) }]}>
            {trial.score}%
          </Text>
          <View style={[styles.trialBadge, { backgroundColor: badge.bg }]}>
            <Text style={[styles.trialBadgeText, { color: badge.text }]}>
              {badgeLabel(trial.badgeType)}
            </Text>
          </View>
        </View>
      </View>

      {/* Criteria table */}
      <View style={styles.criteriaTable}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.criteriaInner}>
            <View style={styles.criteriaHeaderRow}>
              <Text style={[styles.criteriaHeaderCell, { width: COL_WIDTHS.status }]}>Status</Text>
              <Text style={[styles.criteriaHeaderCell, { width: COL_WIDTHS.criterion }]}>Criterion</Text>
              <Text style={[styles.criteriaHeaderCell, { width: COL_WIDTHS.patientVal }]}>Patient Value</Text>
              <Text style={[styles.criteriaHeaderCell, { width: COL_WIDTHS.required }]}>Required</Text>
            </View>
            {trial.criteria.map((c, i) => (
              <View key={i} style={[styles.criteriaRow, i === trial.criteria.length - 1 && styles.criteriaRowLast]}>
                <View style={{ width: COL_WIDTHS.status, paddingRight: 8 }}>
                  <StatusChip status={c.status} />
                </View>
                <Text style={[styles.criteriaCriterionText, { width: COL_WIDTHS.criterion }]}>{c.criterion}</Text>
                <Text style={[styles.criteriaValueText, { width: COL_WIDTHS.patientVal }]}>{c.patientValue}</Text>
                <Text style={[styles.criteriaRequiredText, { width: COL_WIDTHS.required }]}>{c.required ?? '—'}</Text>
              </View>
            ))}
          </View>
        </ScrollView>
      </View>

      {/* Summary */}
      <View style={styles.summaryBox}>
        <Text style={styles.summaryText}>
          <Text style={styles.summaryLabel}>Summary: </Text>
          {trial.summary}
        </Text>
      </View>

      {/* Actions — only for requires_review */}
      {trial.badgeType === 'requires_review' && (
        <View style={styles.trialActions}>
          <TouchableOpacity
            style={styles.confirmBtn}
            activeOpacity={0.85}
            onPress={() => setConfirmVisible(true)}
          >
            <GradientBackground style={styles.confirmBtnGradient}>
              <CheckCircleIcon width={16} height={16} stroke={Colors.white} />
              <Text style={styles.confirmBtnText}>Confirm Eligibility</Text>
            </GradientBackground>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.ineligibleBtn}
            activeOpacity={0.85}
            onPress={() => setIneligibleVisible(true)}
          >
            <CircleXMarkIcon width={16} height={16} stroke={Colors.statusIneligible} />
            <Text style={styles.ineligibleBtnText}>Mark Ineligible</Text>
          </TouchableOpacity>
        </View>
      )}

      <ActionModal
        visible={confirmVisible}
        type={ActionModalType.Confirm}
        patientToken={patientToken}
        onClose={() => setConfirmVisible(false)}
        onConfirm={() => setConfirmVisible(false)}
      />
      <ActionModal
        visible={ineligibleVisible}
        type={ActionModalType.Ineligible}
        patientToken={patientToken}
        onClose={() => setIneligibleVisible(false)}
        onConfirm={() => setIneligibleVisible(false)}
      />
    </View>
  );
};

const PatientReviewScreen = ({ navigation, route }: Props) => {
  const { patientId } = route.params;
  const data = MOCK_DATA[patientId] ?? MOCK_DATA['PT-010'];

  return (
    <SafeAreaView style={styles.container}>
      {/* Back row */}
      <View style={styles.topBar}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()} hitSlop={8}>
          <Text style={styles.backArrow}>←</Text>
          <Text style={styles.backLabel}>Queue</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Patient Summary */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionTitleRow}>
            <DefenceIcon width={20} height={20} stroke={Colors.primary} />
            <Text style={styles.sectionTitle}>Patient Summary</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryKey}>Token:</Text>
            <Text style={styles.summaryVal}>{data.token}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryKey}>Age/Gender:</Text>
            <Text style={styles.summaryVal}>{data.age}y, {data.gender}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryKey}>Diagnosis:</Text>
            <Text style={[styles.summaryVal, styles.summaryValDiagnosis]}>{data.diagnosis}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryKey}>Stage:</Text>
            <Text style={styles.summaryVal}>{data.stage}</Text>
          </View>
          <View style={[styles.summaryRow, { borderBottomWidth: 0 }]}>
            <Text style={styles.summaryKey}>ECOG:</Text>
            <Text style={styles.summaryVal}>{data.ecog}</Text>
          </View>
        </View>

        {/* Biomarkers */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionTitleRow}>
            <DnaIcon width={20} height={20} stroke={Colors.primary} />
            <Text style={styles.sectionTitle}>Biomarkers</Text>
          </View>
          {data.biomarkers.map((b, i) => (
            <View
              key={b.label}
              style={[styles.tableRow, i % 2 === 0 ? styles.tableRowEven : styles.tableRowOdd]}
            >
              <Text style={styles.tableRowLabel}>{b.label}</Text>
              <Text style={styles.tableRowValue}>{b.value}</Text>
            </View>
          ))}
        </View>

        {/* Lab Values */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionTitleRow}>
            <TrendingIcon width={20} height={20} stroke={Colors.primary} />
            <Text style={styles.sectionTitle}>Lab Values</Text>
          </View>
          {data.labValues.map((l, i) => (
            <View
              key={l.label}
              style={[styles.tableRow, i % 2 === 0 ? styles.tableRowEven : styles.tableRowOdd]}
            >
              <Text style={styles.tableRowLabel}>{l.label}</Text>
              <Text style={styles.tableRowValue}>{l.value}</Text>
            </View>
          ))}
        </View>

        {/* Trial matches */}
        {data.trials.map(trial => (
          <TrialCard key={trial.id} trial={trial} patientToken={data.token} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default PatientReviewScreen;
