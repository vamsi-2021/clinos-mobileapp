import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Colors } from '../../../constants/theme';
import { styles } from './InvestigateCard.styles';

export type TierLevel = 'T1' | 'T2' | 'T3';

export type InvestigateCase = {
  id: string;
  trial: string;
  tier: TierLevel;
  issue: string;
  criterion: string;
  lastValue: string;
  isOverdue?: boolean;
};

const TIER_COLORS: Record<TierLevel, { bg: string; text: string }> = {
  T1: { bg: Colors.primaryLight, text: Colors.primary },
  T2: { bg: Colors.statusPendingBg, text: Colors.warning },
  T3: { bg: Colors.statusIneligibleLight, text: Colors.danger },
};

const InvestigateCard = ({ item }: { item: InvestigateCase }) => {
  const tierColor = TIER_COLORS[item.tier];

  return (
    <View style={[styles.card, item.isOverdue && styles.cardOverdue]}>
      <View style={styles.headerRow}>
        <View style={styles.headerLeft}>
          <View style={[styles.tierBadge, { backgroundColor: tierColor.bg }]}>
            <Text style={[styles.tierText, { color: tierColor.text }]}>{item.tier}</Text>
          </View>
          <Text style={styles.patientId}>{item.id}</Text>
          <Text style={styles.arrow}>{'→'}</Text>
          <Text style={styles.trial} numberOfLines={1}>{item.trial}</Text>
        </View>
        {item.isOverdue && (
          <View style={styles.overdueRow}>
            <Text style={styles.overdueIcon}>⏱</Text>
            <Text style={styles.overdueText}>OVERDUE</Text>
          </View>
        )}
      </View>

      <Text style={styles.issue}>{item.issue}</Text>

      <View style={styles.criterionBox}>
        <Text style={styles.criterionLine}>
          <Text style={styles.criterionLabel}>Criterion: </Text>
          {item.criterion}
        </Text>
        <Text style={styles.criterionLine}>
          <Text style={styles.criterionLabel}>Last Value: </Text>
          {item.lastValue}
        </Text>
      </View>

      <View style={styles.actions}>
        {item.tier === 'T1' && (
          <>
            <TouchableOpacity style={styles.outlineBtn} activeOpacity={0.75}>
              <Text style={styles.outlineBtnText}>Enter Value</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.outlineBtn} activeOpacity={0.75}>
              <Text style={styles.outlineBtnText}>Order Lab</Text>
            </TouchableOpacity>
          </>
        )}
        {item.tier === 'T2' && (
          <>
            <TouchableOpacity style={styles.outlineBtn} activeOpacity={0.75}>
              <Text style={styles.outlineBtnText}>Request PI Judgment</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.escalateBtn} activeOpacity={0.75}>
              <Text style={styles.escalateIcon}>↗</Text>
              <Text style={styles.escalateBtnText}>Escalate</Text>
            </TouchableOpacity>
          </>
        )}
        {item.tier === 'T3' && (
          <TouchableOpacity style={styles.outlineBtn} activeOpacity={0.75}>
            <Text style={styles.outlineBtnText}>Route to Medical Monitor</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default InvestigateCard;
