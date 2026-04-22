import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { Colors } from '../../../constants/theme';
import { EyeIcon } from '../../../assets/icons';

export type QueuePatient = {
  id: string;
  diagnosis: string;
  age: number;
  sex: string;
  stage: string;
  ecog: number;
  score: number;
  dataCompleteness: number;
  markers: { label: string; positive: boolean }[];
  investigateCount?: number;
};

function scoreColor(score: number): string {
  if (score >= 90) return Colors.statusEligible;
  if (score >= 70) return Colors.warning;
  return Colors.textMuted;
}

function stageBadgeColor(stage: string): string {
  if (stage.includes('IV')) return Colors.statusEligible;
  if (stage.includes('III')) return Colors.warning;
  if (stage.includes('II')) return Colors.primary;
  return Colors.textMuted;
}

const RING_SIZE = 72;
const STROKE = 6;
const RADIUS = (RING_SIZE - STROKE) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

const ScoreRing = ({ score }: { score: number }) => {
  const color = scoreColor(score);
  const offset = CIRCUMFERENCE - (score / 100) * CIRCUMFERENCE;
  return (
    <View style={styles.ringContainer}>
      <Svg width={RING_SIZE} height={RING_SIZE} style={styles.ringAbsolute}>
        <Circle
          cx={RING_SIZE / 2} cy={RING_SIZE / 2} r={RADIUS}
          stroke={Colors.inputBorder} strokeWidth={STROKE} fill="none"
        />
        <Circle
          cx={RING_SIZE / 2} cy={RING_SIZE / 2} r={RADIUS}
          stroke={color} strokeWidth={STROKE} fill="none"
          strokeDasharray={`${CIRCUMFERENCE} ${CIRCUMFERENCE}`}
          strokeDashoffset={offset}
          strokeLinecap="round"
          rotation="-90"
          origin={`${RING_SIZE / 2}, ${RING_SIZE / 2}`}
        />
      </Svg>
      <Text style={[styles.ringScore, { color }]}>{score}</Text>
    </View>
  );
};

const EligibilityQueueCard = ({ patient }: { patient: QueuePatient }) => {
  const completionWidth = `${patient.dataCompleteness}%` as const;
  const stageColor = stageBadgeColor(patient.stage);

  return (
    <View style={styles.card}>
      {/* Header: patient ID + stage */}
      <View style={styles.cardHeader}>
        <Text style={styles.patientId}>{patient.id}</Text>
        <View style={[styles.stageBadge, { backgroundColor: stageColor }]}>
          <Text style={styles.stageText}>{patient.stage}</Text>
        </View>
      </View>

      <Text style={styles.diagnosis} numberOfLines={2}>{patient.diagnosis}</Text>

      {/* Score ring + age/ECOG */}
      <View style={styles.scoreRow}>
        <ScoreRing score={patient.score} />
        <View style={styles.metaBlock}>
          <Text style={styles.metaLabel}>
            Age/Gender: <Text style={styles.metaValue}>{patient.age}y, {patient.sex}</Text>
          </Text>
          <Text style={[styles.metaLabel, { marginTop: 8 }]}>
            ECOG: <Text style={styles.metaValue}>{patient.ecog}</Text>
          </Text>
        </View>
      </View>

      {/* Data completeness */}
      <View style={styles.completenessRow}>
        <Text style={styles.completenessLabel}>Data Completeness</Text>
        <Text style={styles.completenessPercent}>{patient.dataCompleteness}%</Text>
      </View>
      <View style={styles.progressTrack}>
        <View style={[styles.progressFill, { width: completionWidth }]} />
      </View>

      {/* Investigate tag */}
      {patient.investigateCount != null && patient.investigateCount > 0 && (
        <View style={styles.markerRow}>
          <View style={styles.investigateBadge}>
            <Text style={styles.investigateIcon}>⚠</Text>
            <Text style={styles.investigateText}>{patient.investigateCount} INVESTIGATE</Text>
          </View>
        </View>
      )}

      {/* Markers */}
      <View style={styles.markerRow}>
        {patient.markers.map(m => (
          <View key={m.label} style={[styles.marker, m.positive ? styles.markerPos : styles.markerNeg]}>
            <Text style={[styles.markerText, m.positive ? styles.markerTextPos : styles.markerTextNeg]}>
              {m.label}: {m.positive ? '+' : '-'}
            </Text>
          </View>
        ))}
      </View>

      <View style={styles.divider} />

      {/* Actions */}
      <View style={styles.actions}>
        <TouchableOpacity style={styles.reviewBtn} activeOpacity={0.75}>
          <EyeIcon width={16} height={16} stroke={Colors.textPrimary} />
          <Text style={styles.reviewText}>Review</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.flagBtn} activeOpacity={0.75}>
          <Text style={styles.flagIcon}>⚠</Text>
          <Text style={styles.flagText}>Flag</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default EligibilityQueueCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 16,
    gap: 10,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  patientId: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.textHeading,
  },
  stageBadge: {
    paddingHorizontal: 14,
    paddingVertical: 5,
    borderRadius: 20,
  },
  stageText: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.white,
  },
  diagnosis: {
    fontSize: 13,
    color: Colors.textBody,
    lineHeight: 18,
  },
  // Score ring
  ringContainer: {
    width: RING_SIZE,
    height: RING_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ringAbsolute: {
    position: 'absolute',
  },
  ringScore: {
    fontSize: 20,
    fontWeight: '700',
  },
  scoreRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginTop: 4,
  },
  metaBlock: {
    flex: 1,
  },
  metaLabel: {
    fontSize: 13,
    color: Colors.textMuted,
  },
  metaValue: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.textHeading,
  },
  // Completeness
  completenessRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  completenessLabel: {
    fontSize: 12,
    color: Colors.textMuted,
  },
  completenessPercent: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.textHeading,
  },
  progressTrack: {
    height: 6,
    backgroundColor: Colors.inputBorder,
    borderRadius: 3,
    marginTop: -4,
  },
  progressFill: {
    height: 6,
    backgroundColor: Colors.primary,
    borderRadius: 3,
  },
  // Markers row
  markerRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  marker: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  markerPos: { backgroundColor: Colors.primaryLight },
  markerNeg: { backgroundColor: Colors.negativeTagBg },
  markerText: { fontSize: 12, fontWeight: '500' },
  markerTextPos: { color: Colors.primary },
  markerTextNeg: { color: Colors.negativeTagText },
  // Investigate badge
  investigateBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.warning,
    backgroundColor: Colors.statusPendingBg,
  },
  investigateIcon: {
    fontSize: 11,
    color: Colors.warning,
  },
  investigateText: {
    fontSize: 11,
    fontWeight: '600',
    color: Colors.warning,
    letterSpacing: 0.3,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.inputBorder,
  },
  // Actions
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  reviewBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.inputBorder,
  },
  reviewText: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.textHeading,
  },
  flagBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  flagIcon: {
    fontSize: 14,
    color: Colors.warning,
  },
  flagText: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.warning,
  },
});
