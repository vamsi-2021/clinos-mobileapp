import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { CompositeNavigationProp } from '@react-navigation/native';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Colors } from '../../../constants/theme';
import { ChevronRightIcon, ProtocolIcon, ShareIcon } from '../../../assets/icons';
import { DrawerParamList, MainStackParamList } from '../../../types/navigation';
import { styles } from './ProtocolCard.styles';

type CardNavigation = CompositeNavigationProp<
  DrawerNavigationProp<DrawerParamList, 'Protocols'>,
  NativeStackNavigationProp<MainStackParamList>
>;

export type ReviewStatus = 'pending_review' | 'approved' | 'active';

export type Protocol = {
  id: string;
  nctNumber: string;
  phase: string;
  criteriaTotal: number;
  criteriaApproved: number;
  criteriaPending: number;
  status: string;
  reviewStatus: ReviewStatus;
};

const REVIEW_BADGE: Record<ReviewStatus, { label: string; bg: string; text: string }> = {
  pending_review: { label: 'PENDING REVIEW', bg: Colors.warning,           text: Colors.white },
  approved:       { label: 'APPROVED',        bg: Colors.statusEligible,    text: Colors.white },
  active:         { label: 'ACTIVE',          bg: Colors.statusActiveBg,    text: Colors.statusEligible },
};

const InfoRow = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <View style={styles.infoRow}>
    <Text style={styles.infoLabel}>{label}</Text>
    <View style={styles.infoValue}>{children}</View>
  </View>
);

const ProtocolCard = ({ item, navigation }: { item: Protocol; navigation: CardNavigation }) => {
  const badge = REVIEW_BADGE[item.reviewStatus];

  return (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <View style={styles.headerLeft}>
          <Text style={styles.trialName}>{item.id}</Text>
          <Text style={styles.nct}>{item.nctNumber}</Text>
        </View>
        <View style={[styles.badge, { backgroundColor: badge.bg }]}>
          <Text style={[styles.badgeText, { color: badge.text }]}>{badge.label}</Text>
        </View>
      </View>

      <InfoRow label="Phase:">
        <Text style={styles.infoValueText}>{item.phase}</Text>
      </InfoRow>

      <InfoRow label="Criteria:">
        <Text style={styles.infoValueText}>
          {item.criteriaTotal} total{'  —  '}
          <Text style={styles.approved}>{item.criteriaApproved} approved</Text>
          {', '}
          <Text style={styles.pending}>{item.criteriaPending} pending</Text>
        </Text>
      </InfoRow>

      <InfoRow label="Status:">
        <Text style={styles.infoValueText}>{item.status}</Text>
      </InfoRow>

      <View style={styles.divider} />

      <View style={styles.actions}>
        <TouchableOpacity
          style={styles.viewBtn}
          activeOpacity={0.75}
          onPress={() => navigation.navigate('ProtocolCriteria', { protocolId: item.id })}
        >
          <ProtocolIcon width={16} height={16} stroke={Colors.textHeading} />
          <Text style={styles.viewBtnText}>View Criteria</Text>
          <ChevronRightIcon width={16} height={16} stroke={Colors.textMuted} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.externalBtn} activeOpacity={0.75}>
          <ShareIcon width={18} height={18} stroke={Colors.textHeading} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProtocolCard;
