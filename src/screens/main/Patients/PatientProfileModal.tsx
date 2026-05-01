import React from 'react';
import {
  View,
  Text,
  Modal,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '../../../constants/theme';
import {
  PersonIcon,
  DnaIcon,
  CirclesIcon,
  MapPinIcon,
} from '../../../assets/icons';
import { styles } from './PatientProfileModal.styles';
import GradientBackground from '../../../components/common/GradientBackground';

export type Biomarker = { label: string; value: string };
export type LabValue = { label: string; value: string };
export type MatchingTrial = {
  name: string;
  nct: string;
  score: number;
  eligible: boolean;
};

export type PatientProfile = {
  patientId: string;
  lastUpdated: string;
  age: number;
  gender: string;
  ecog: number;
  diagnosis: string;
  location: string;
  biomarkers: Biomarker[];
  priorTreatments: string[];
  labValues: LabValue[];
  matchingTrials: MatchingTrial[];
};

type Props = {
  visible: boolean;
  profile: PatientProfile;
  onClose: () => void;
};

function getScoreColor(score: number): string {
  if (score >= 70) return Colors.statusLikelyEligible;
  if (score >= 40) return Colors.warning;
  return Colors.statusIneligible;
}

const PatientProfileModal = ({ visible, profile, onClose }: Props) => {
  const insets = useSafeAreaInsets();

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <TouchableOpacity
          style={styles.overlayTap}
          activeOpacity={1}
          onPress={onClose}
        />

        <View style={styles.sheet}>
          <View style={styles.handle} />

          {/* Header */}
          <View style={styles.header}>
            <PersonIcon width={22} height={22} stroke={Colors.primary} />
            <Text style={styles.headerTitle}>Patient Profile</Text>
            <TouchableOpacity style={styles.closeBtn} onPress={onClose} hitSlop={8}>
              <Text style={styles.closeText}>✕</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.subtitle}>
            {profile.patientId} {'•'} Last updated: {profile.lastUpdated}
          </Text>

          <View style={styles.divider} />

          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.content}>

              {/* Demographics & Diagnosis */}
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Demographics & Diagnosis</Text>

                <View style={styles.demoRow}>
                  <View style={styles.demoLeft}>
                    <Text style={styles.demoLabel}>Age/Gender:</Text>
                    <Text style={styles.demoValue}>
                      {profile.age} years, {profile.gender}
                    </Text>
                  </View>
                  <View style={styles.demoRight}>
                    <Text style={styles.demoLabel}>ECOG:</Text>
                    <Text style={styles.demoValue}>{profile.ecog}</Text>
                  </View>
                </View>

                <View style={styles.diagnosisBlock}>
                  <Text style={styles.demoLabel}>Diagnosis:</Text>
                  <Text style={styles.demoValue}>{profile.diagnosis}</Text>
                </View>

                <View style={styles.locationRow}>
                  <MapPinIcon width={14} height={14} stroke={Colors.textBody} />
                  <Text style={styles.locationLabel}>Location:</Text>
                  <Text style={styles.locationValue}>{profile.location}</Text>
                </View>
              </View>

              {/* Biomarkers */}
              <View style={styles.section}>
                <View style={styles.sectionTitleRow}>
                  <DnaIcon width={18} height={18} stroke={Colors.primary} />
                  <Text style={styles.sectionTitle}>Biomarkers</Text>
                </View>
                <View style={styles.pillRow}>
                  {profile.biomarkers.map(b => (
                    <View key={b.label} style={styles.biomarkerPill}>
                      <Text style={styles.biomarkerText}>
                        {b.label}: {b.value}
                      </Text>
                    </View>
                  ))}
                </View>
              </View>

              {/* Prior Treatments */}
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Prior Treatments</Text>
                <View style={styles.pillRow}>
                  {profile.priorTreatments.map(t => (
                    <View key={t} style={styles.treatmentPill}>
                      <Text style={styles.treatmentText}>{t}</Text>
                    </View>
                  ))}
                </View>
              </View>

              {/* Lab Values */}
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Lab Values</Text>
                <View style={styles.labRow}>
                  {profile.labValues.map(l => (
                    <View key={l.label} style={styles.labItem}>
                      <Text style={styles.labLabel}>{l.label}</Text>
                      <Text style={styles.labValue}>{l.value}</Text>
                    </View>
                  ))}
                </View>
              </View>

              {/* Matching Trials */}
              <View style={styles.section}>
                <View style={styles.sectionTitleRow}>
                  <CirclesIcon width={18} height={18} stroke={Colors.primary} />
                  <Text style={styles.sectionTitle}>Matching Trials</Text>
                </View>
                {profile.matchingTrials.map(t => (
                  <View key={t.nct} style={styles.trialRow}>
                    <View style={styles.trialInfo}>
                      <Text style={styles.trialName}>{t.name}</Text>
                      <Text style={styles.trialNct}>{t.nct}</Text>
                    </View>
                    <Text style={[styles.trialScore, { color: getScoreColor(t.score) }]}>
                      {t.score}%
                    </Text>
                    <View
                      style={[
                        styles.eligibleBadge,
                        {
                          backgroundColor: t.eligible
                            ? Colors.statusEligible
                            : Colors.statusIneligible,
                        },
                      ]}
                    >
                      <Text style={styles.eligibleBadgeText}>
                        {t.eligible ? 'eligible' : 'ineligible'}
                      </Text>
                    </View>
                  </View>
                ))}
              </View>

            </View>
          </ScrollView>

          {/* Footer */}
          <View style={[styles.footer, { paddingBottom: insets.bottom || 16 }]}>
            <TouchableOpacity style={styles.runMatchBtn} activeOpacity={0.8}>
              <GradientBackground width="100%" height="100%" style={{ borderRadius: 8, overflow: 'hidden' }}>
                <View style={{...styles.runMatchContent}}>
                  <CirclesIcon width={16} height={16} stroke={Colors.white} />
                  <Text style={styles.runMatchText}>Run Matching</Text>
                </View>
              </GradientBackground>
            </TouchableOpacity>
            <TouchableOpacity style={styles.editBtn} activeOpacity={0.75}>
              <Text style={styles.editBtnText}>Edit Profile</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default PatientProfileModal;
