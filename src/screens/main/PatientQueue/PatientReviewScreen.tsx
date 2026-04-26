import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { MainStackParamList } from '../../../types/navigation';
import { Colors } from '../../../constants/theme';
import { CheckCircleIcon, CircleXMarkIcon, DnaIcon, TrendingIcon } from '../../../assets/icons';
import ActionModal, { ActionModalType } from '../../../components/common/ActionModal';
import { GlobalStyles } from '../../../styles/GlobalStyles';
import GradientBackground from '../../../components/common/GradientBackground';

type Props = {
  navigation: NativeStackNavigationProp<MainStackParamList, 'PatientReview'>;
  route: RouteProp<MainStackParamList, 'PatientReview'>;
};

type CriterionStatus = 'MET' | 'UNMET';

type TrialCriterion = {
  status: CriterionStatus;
  criterion: string;
  patientValue: string;
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
          },
          {
            status: 'MET',
            criterion: 'ECOG performance status 0-1',
            patientValue: '1',
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
          },
          {
            status: 'UNMET',
            criterion: 'KRAS G12C mutation confirmed by local or central testing',
            patientValue: 'ALK rearrangement',
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
        {/* Header */}
        <View style={styles.criteriaHeaderRow}>
          <Text style={[styles.criteriaHeaderCell, { flex: 1.1 }]}>Status</Text>
          <Text style={[styles.criteriaHeaderCell, { flex: 2 }]}>Criterion</Text>
          <Text style={[styles.criteriaHeaderCell, { flex: 1.5 }]}>Patient{'\n'}Value</Text>
        </View>
        {/* Rows */}
        {trial.criteria.map((c, i) => (
          <View key={i} style={[styles.criteriaRow, i < trial.criteria.length - 1 && styles.criteriaRowBorder]}>
            <View style={{ flex: 1.1 }}>
              <StatusChip status={c.status} />
            </View>
            <Text style={[styles.criteriaCriterionText, { flex: 2 }]}>{c.criterion}</Text>
            <Text style={[styles.criteriaValueText, { flex: 1.5 }]}>{c.patientValue}</Text>
          </View>
        ))}
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
            style={[GlobalStyles.button, { flex: 1, height: 40, borderRadius: 8, marginTop: 0, marginBottom: 0 }]}
            activeOpacity={0.85}
            onPress={() => setConfirmVisible(true)}
          >
            <GradientBackground style={{ ...GlobalStyles.buttonGradient }}>
              <View style={{ paddingHorizontal: 12, flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                <CheckCircleIcon width={16} height={16} stroke={Colors.white} />
                <Text style={styles.confirmBtnText}>Confirm Eligibility</Text>
              </View>
            </GradientBackground>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.ineligibleBtn}
            activeOpacity={0.85}
            onPress={() => setIneligibleVisible(true)}
          >
            <View style={{ paddingHorizontal: 12, flexDirection: 'row', alignItems: 'center', gap: 6 }}>
              <CircleXMarkIcon width={16} height={16} stroke={Colors.statusIneligible} />
              <Text style={styles.ineligibleBtnText}>Mark Ineligible</Text>
            </View>
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
            <Text style={styles.sectionIcon}>🛡</Text>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundPage,
  },
  topBar: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: Colors.white,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.inputBorder,
  },
  backBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  backArrow: {
    fontSize: 20,
    color: Colors.textHeading,
  },
  backLabel: {
    fontSize: 15,
    fontWeight: '500',
    color: Colors.textHeading,
  },
  scroll: {
    padding: 16,
    gap: 12,
  },

  // Section card
  sectionCard: {
    backgroundColor: Colors.white,
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
  },
  sectionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 14,
  },
  sectionIcon: {
    fontSize: 18,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.textHeading,
  },

  // Patient summary rows
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingVertical: 8,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.inputBorder,
  },
  summaryKey: {
    fontSize: 13,
    color: Colors.textBody,
    flexShrink: 0,
  },
  summaryVal: {
    fontSize: 13,
    fontWeight: '500',
    color: Colors.textHeading,
    textAlign: 'right',
    flexShrink: 1,
    marginLeft: 8,
  },
  summaryValDiagnosis: {
    textAlign: 'right',
    flexShrink: 1,
  },

  // Table rows (biomarkers / lab values)
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 4,
  },
  tableRowEven: {
    backgroundColor: Colors.backgroundPage,
  },
  tableRowOdd: {
    backgroundColor: Colors.white,
  },
  tableRowLabel: {
    fontSize: 13,
    color: Colors.textBody,
  },
  tableRowValue: {
    fontSize: 13,
    fontWeight: '500',
    color: Colors.textHeading,
  },

  // Trial card
  trialHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 14,
  },
  trialNameBlock: {
    flex: 1,
    marginRight: 12,
  },
  trialName: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.textHeading,
  },
  trialIndication: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.textHeading,
  },
  trialNct: {
    fontSize: 12,
    color: Colors.textMuted,
    marginTop: 2,
  },
  trialScoreBlock: {
    alignItems: 'flex-end',
    gap: 6,
  },
  trialScore: {
    fontSize: 22,
    fontWeight: '700',
  },
  trialBadge: {
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 20,
  },
  trialBadgeText: {
    fontSize: 11,
    fontWeight: '600',
  },

  // Criteria table
  criteriaTable: {
    borderWidth: 1,
    borderColor: Colors.inputBorder,
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 12,
  },
  criteriaHeaderRow: {
    flexDirection: 'row',
    backgroundColor: Colors.backgroundPage,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  criteriaHeaderCell: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.primary,
  },
  criteriaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  criteriaRowBorder: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.inputBorder,
  },
  criteriaCriterionText: {
    fontSize: 12,
    color: Colors.textBody,
    lineHeight: 17,
    paddingRight: 8,
  },
  criteriaValueText: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.textHeading,
    lineHeight: 17,
  },

  // Status chip
  statusChip: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 20,
    alignSelf: 'flex-start',
    borderWidth: 1,
  },
  chipMet: {
    backgroundColor: Colors.statusEligibleLight,
    borderColor: Colors.statusEligible,
  },
  chipUnmet: {
    backgroundColor: Colors.statusIneligibleLight,
    borderColor: Colors.statusIneligible,
  },
  statusChipText: {
    fontSize: 10,
    fontWeight: '600',
  },
  chipMetText: {
    color: Colors.statusEligible,
  },
  chipUnmetText: {
    color: Colors.statusIneligible,
  },

  // Summary box
  summaryBox: {
    backgroundColor: Colors.backgroundPage,
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
  },
  summaryLabel: {
    fontWeight: '700',
    color: Colors.textHeading,
    fontSize: 13,
  },
  summaryText: {
    fontSize: 13,
    color: Colors.textBody,
    lineHeight: 19,
  },

  // Trial action buttons
  trialActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 12,
  },
  confirmBtn: {
    flex: 1,
    backgroundColor: Colors.primary,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  confirmBtnText: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.white,
  },
  ineligibleBtn: {
    flex: 1,
    height: 40,
    borderWidth: 1.5,
    borderColor: Colors.statusIneligible,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ineligibleBtnText: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.statusIneligible,
  },

});
