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
import { CheckCircleIcon, DefenceIcon, InfoIcon } from '../../../assets/icons';
import ActionModal, { ActionModalType } from '../../../components/common/ActionModal';
import { styles } from './ProtocolCriteriaScreen.styles';

type Props = {
  navigation: NativeStackNavigationProp<MainStackParamList, 'ProtocolCriteria'>;
  route: RouteProp<MainStackParamList, 'ProtocolCriteria'>;
};

type CriterionStatus = 'approved' | 'pending';

type Criterion = {
  status: CriterionStatus;
  text: string;
  reviewer?: string;
  reviewDate?: string;
};

type ProtocolCriteriaData = {
  id: string;
  nctNumber: string;
  phase: string;
  inclusion: Criterion[];
  exclusion: Criterion[];
};

const CRITERIA_DATA: Record<string, ProtocolCriteriaData> = {
  FLAURA2: {
    id: 'FLAURA2',
    nctNumber: 'NCT04035486',
    phase: 'phase 3',
    inclusion: [
      { status: 'approved', text: 'Histologically confirmed diagnosis', reviewer: 'Dr. Sarah Chen, PharmD', reviewDate: '2026-03-01' },
      { status: 'approved', text: 'Age ≥ 18 years at time of consent', reviewer: 'Dr. Sarah Chen, PharmD', reviewDate: '2026-03-01' },
      { status: 'approved', text: 'ECOG Performance Status 0-2', reviewer: 'Dr. Michael Torres, MD', reviewDate: '2026-03-02' },
      { status: 'approved', text: 'CrCl ≥ 50 mL/min within 90 days', reviewer: 'Dr. Sarah Chen, PharmD', reviewDate: '2026-03-01' },
      { status: 'approved', text: 'Adequate bone marrow function (ANC ≥ 1.5 K/uL)', reviewer: 'Dr. Sarah Chen, PharmD', reviewDate: '2026-03-01' },
      { status: 'pending', text: 'At least one measurable lesion per RECIST 1.1' },
    ],
    exclusion: [
      { status: 'approved', text: 'No active autoimmune disease requiring systemic treatment', reviewer: 'Dr. Amanda Foster, MD', reviewDate: '2026-03-03' },
      { status: 'approved', text: 'No prior treatment with investigational agent within 28 days', reviewer: 'Dr. Sarah Chen, PharmD', reviewDate: '2026-03-01' },
      { status: 'pending', text: 'No known CNS metastases (unless stable >4 weeks)' },
      { status: 'approved', text: 'No pregnancy or active breastfeeding', reviewer: 'Dr. Amanda Foster, MD', reviewDate: '2026-03-03' },
    ],
  },
  'CodeBreaK 200': {
    id: 'CodeBreaK 200',
    nctNumber: 'NCT04303780',
    phase: 'phase 3',
    inclusion: [
      { status: 'approved', text: 'Histologically confirmed NSCLC with KRAS G12C mutation', reviewer: 'Dr. Sarah Chen, PharmD', reviewDate: '2026-03-01' },
      { status: 'approved', text: 'Age ≥ 18 years', reviewer: 'Dr. Sarah Chen, PharmD', reviewDate: '2026-03-01' },
      { status: 'approved', text: 'ECOG Performance Status 0-1', reviewer: 'Dr. Michael Torres, MD', reviewDate: '2026-03-02' },
      { status: 'approved', text: 'Prior platinum-based chemotherapy', reviewer: 'Dr. Sarah Chen, PharmD', reviewDate: '2026-03-01' },
      { status: 'pending', text: 'Measurable disease per RECIST 1.1' },
      { status: 'pending', text: 'Adequate organ function within 14 days' },
    ],
    exclusion: [
      { status: 'approved', text: 'No prior KRAS inhibitor treatment', reviewer: 'Dr. Amanda Foster, MD', reviewDate: '2026-03-03' },
      { status: 'approved', text: 'No active CNS metastases', reviewer: 'Dr. Sarah Chen, PharmD', reviewDate: '2026-03-01' },
      { status: 'approved', text: 'No active autoimmune disease', reviewer: 'Dr. Amanda Foster, MD', reviewDate: '2026-03-03' },
      { status: 'approved', text: 'No pregnancy or breastfeeding', reviewer: 'Dr. Amanda Foster, MD', reviewDate: '2026-03-03' },
      { status: 'pending', text: 'No prior treatment with investigational agent within 28 days' },
      { status: 'approved', text: 'No uncontrolled intercurrent illness', reviewer: 'Dr. Sarah Chen, PharmD', reviewDate: '2026-03-01' },
    ],
  },
};

const StatusBadge = ({ status }: { status: CriterionStatus }) => (
  <View style={[styles.badge, status === 'approved' ? styles.badgeApproved : styles.badgePending]}>
    {status === 'approved' ? <CheckCircleIcon width={12} height={12} stroke={Colors.statusEligible} /> : <InfoIcon width={12} height={12} stroke={Colors.warning} />}
    <Text style={[styles.badgeText, status === 'approved' ? styles.badgeTextApproved : styles.badgeTextPending]}>
      {status === 'approved' ? 'Approved' : 'Pending'}
    </Text>
  </View>
);

const COL_WIDTH = 140;

const CriteriaTable = ({ title, criteria, onApprove }: { title: string; criteria: Criterion[]; onApprove: () => void }) => (
  <View style={styles.tableCard}>
    <Text style={styles.sectionTitle}>{title}</Text>
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <View style={{borderWidth: 1, borderColor: Colors.inputBorder, borderRadius: 8}}>
        {/* Header row */}
        <View style={[styles.tableRow, styles.rowWrap, { backgroundColor: Colors.negativeTagBg, paddingHorizontal: 12 }]}>
          <Text style={[styles.colHeader, { width: COL_WIDTH }]}>Status</Text>
          <Text style={[styles.colHeader, { width: COL_WIDTH }]}>Criterion</Text>
          <Text style={[styles.colHeader, { width: COL_WIDTH }]}>Reviewer</Text>
          <Text style={[styles.colHeader, { width: COL_WIDTH }]}>Action</Text>
        </View>

        {/* Data rows — every row gets a border */}
        {criteria.map((item, index) => (
          <View key={index} style={[styles.tableRow, styles.rowWrap, { paddingHorizontal: 12 }]}>
            <View style={{ width: COL_WIDTH, paddingRight: 12 }}>
              <StatusBadge status={item.status} />
            </View>
            <View style={{ width: COL_WIDTH, paddingRight: 12 }}>
              <Text style={styles.criterionText}>{item.text}</Text>
              {item.status === 'pending' && (
                <Text style={styles.pendingNote}>Not yet active — cannot affect patient evaluations</Text>
              )}
            </View>
            <View style={{ width: COL_WIDTH, paddingRight: 12 }}>
              {item.reviewer ? (
                <>
                  <Text style={styles.reviewerName}>{item.reviewer}</Text>
                  <Text style={styles.reviewerDate}>{item.reviewDate}</Text>
                </>
              ) : (
                <Text style={styles.reviewerDash}>—</Text>
              )}
            </View>
            <View style={{ width: COL_WIDTH - 40 }}>
              {item.status === 'pending' && (
                <TouchableOpacity style={styles.approveBtn} activeOpacity={0.75} onPress={onApprove}>
                  <DefenceIcon width={14} height={14} stroke={Colors.textHeading} />
                  <Text style={styles.approveBtnText}>Approve</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  </View>
);

const ProtocolCriteriaScreen = ({ navigation, route }: Props) => {
  const { protocolId } = route.params;
  const data = CRITERIA_DATA[protocolId];
  const [approveVisible, setApproveVisible] = useState(false);

  if (!data) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()} hitSlop={8}>
            <Text style={styles.backArrow}>←</Text>
            <Text style={styles.backLabel}>Protocols</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.emptyState}>
          <Text style={styles.emptyText}>No criteria data found.</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()} hitSlop={8}>
          <Text style={styles.backArrow}>←</Text>
          <Text style={styles.backLabel}>Protocols</Text>
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.protocolTitle}>{data.id}</Text>
        <Text style={styles.protocolMeta}>{data.nctNumber} • {data.phase}</Text>
        <CriteriaTable title="Inclusion Criteria" criteria={data.inclusion} onApprove={() => setApproveVisible(true)} />
        <CriteriaTable title="Exclusion Criteria" criteria={data.exclusion} onApprove={() => setApproveVisible(true)} />
      </ScrollView>
      <ActionModal
        visible={approveVisible}
        type={ActionModalType.ApproveCriterion}
        onClose={() => setApproveVisible(false)}
        onConfirm={() => setApproveVisible(false)}
      />
    </SafeAreaView>
  );
};

export default ProtocolCriteriaScreen;
