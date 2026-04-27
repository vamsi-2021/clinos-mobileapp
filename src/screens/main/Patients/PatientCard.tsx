import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Colors } from '../../../constants/theme';
import {
  CalenderIcon,
  CprIcon,
  MapPinIcon,
  CirclesIcon,
  ChevronRightIcon,
} from '../../../assets/icons';
import { Patient } from './PatientsScreen';
import { GlobalStyles } from '../../../styles/GlobalStyles';
import { styles } from './PatientCard.styles';

const PatientCard = ({ patient }: { patient: Patient }) => (
  <TouchableOpacity style={GlobalStyles.card} activeOpacity={0.8}>
    <View style={GlobalStyles.cardInner}>
      <View style={styles.cardHeader}>
        <Text style={styles.patientName}>{patient.id}</Text>
        <EcogBadge score={patient.ecog} />
      </View>
      <Text style={styles.patientDescription}>{patient.diagnosis}</Text>
      <PatientMeta patient={patient} />
      <View style={styles.markerRow}>
        {patient.markers.map(m => <MarkerBadge key={m.label} {...m} />)}
      </View>
      <View style={styles.divider} />
      <TrialsFooter count={patient.eligibleTrials} />
    </View>
  </TouchableOpacity>
);

const EcogBadge = ({ score }: { score: number }) => (
  <View style={styles.ecogBadge}>
    <Text style={styles.ecogText}>ECOG {score}</Text>
  </View>
);

const PatientMeta = ({ patient }: { patient: Patient }) => (
  <>
    <View style={styles.metaRow}>
      <MetaItem
        icon={<CalenderIcon width={16} height={16} stroke={Colors.textMuted} />}
        label={`${patient.age}y, ${patient.sex}`}
      />
      <MetaItem
        icon={<CprIcon width={16} height={16} stroke={Colors.textMuted} />}
        label={patient.stage}
      />
    </View>
    <View style={styles.metaRow}>
      <MetaItem
        icon={<MapPinIcon width={16} height={16} stroke={Colors.textMuted} />}
        label={patient.location}
      />
    </View>
  </>
);

const MetaItem = ({ icon, label }: { icon: React.ReactNode; label: string }) => (
  <View style={styles.metaItem}>
    {icon}
    <Text style={styles.metaText}>{label}</Text>
  </View>
);

const TrialsFooter = ({ count }: { count: number }) => (
  <View style={styles.trialsFooter}>
    <View style={styles.trialsLeft}>
      <CirclesIcon width={16} height={16} stroke={Colors.primary} />
      <Text style={styles.trialsText}>
        {count} Eligible Trial{count !== 1 ? 's' : ''}
      </Text>
    </View>
    <ChevronRightIcon width={16} height={16} stroke={Colors.textMuted} />
  </View>
);

const MarkerBadge = ({ label, positive }: { label: string; positive: boolean }) => (
  <View style={[styles.badge, positive ? styles.badgePos : styles.badgeNeg]}>
    <Text style={[styles.badgeText, positive ? styles.badgeTextPos : styles.badgeTextNeg]}>
      {label}: {positive ? '+' : '-'}
    </Text>
  </View>
);

export default PatientCard;

