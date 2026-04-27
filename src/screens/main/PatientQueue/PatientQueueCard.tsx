import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { CompositeNavigationProp } from '@react-navigation/native';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Colors } from '../../../constants/theme';
import { EyeIcon } from '../../../assets/icons';
import { DrawerParamList, MainStackParamList } from '../../../types/navigation';
import { styles, RING_SIZE, STROKE, RADIUS, CIRCUMFERENCE } from './PatientQueueCard.styles';

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

type CardNavigation = CompositeNavigationProp<
  DrawerNavigationProp<DrawerParamList, 'PatientQueue'>,
  NativeStackNavigationProp<MainStackParamList>
>;

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

const EligibilityQueueCard = ({ patient, navigation }: { patient: QueuePatient; navigation: CardNavigation }) => {
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
        <TouchableOpacity
          style={styles.reviewBtn}
          activeOpacity={0.75}
          onPress={() => navigation.navigate('PatientReview', { patientId: patient.id })}
        >
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
