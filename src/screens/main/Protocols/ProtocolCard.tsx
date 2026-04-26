import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { CompositeNavigationProp } from '@react-navigation/native';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Colors } from '../../../constants/theme';
import { ChevronRightIcon, ProtocolIcon, ShareIcon } from '../../../assets/icons';
import { DrawerParamList, MainStackParamList } from '../../../types/navigation';

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

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 16,
    gap: 10,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 10,
  },
  headerLeft: {
    flex: 1,
    gap: 3,
  },
  trialName: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.textHeading,
  },
  nct: {
    fontSize: 12,
    color: Colors.textMuted,
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  infoLabel: {
    fontSize: 13,
    color: Colors.textMuted,
  },
  infoValue: {
    flex: 1,
    alignItems: 'flex-end',
  },
  infoValueText: {
    fontSize: 13,
    color: Colors.textHeading,
    textAlign: 'right',
  },
  approved: {
    color: Colors.statusEligible,
    fontWeight: '500',
  },
  pending: {
    color: Colors.warning,
    fontWeight: '500',
  },
  divider: {
    height: 1,
    backgroundColor: Colors.inputBorder,
    marginVertical: 2,
  },
  actions: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'stretch',
  },
  viewBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.inputBorder,
    backgroundColor: Colors.white,
  },
  viewBtnText: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.textHeading,
  },
  externalBtn: {
    alignSelf: 'stretch',
    paddingHorizontal: 14,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.white,
  },
});
