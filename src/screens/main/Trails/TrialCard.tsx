import React from 'react';
import { View, Text } from 'react-native';
import { GlobalStyles } from '../../../styles/GlobalStyles';
import { Colors } from '../../../constants/theme';
import { styles } from './TrialCard.styles';
import { CalenderIcon, CirclesIcon, MapPinIcon, TrialsIcon } from '../../../assets/icons';

interface Trial {
    name: string;
    status: string;
    phase: string;
    nctId: string;
    description: string;
    tags: string[];
    location: string;
    completion: string;
    enrolled: number;
    target: number;
    eligiblePatients: number;
}

const MetaItem = ({ icon, label }: { icon: React.ReactNode; label: string }) => (
  <View style={styles.metaItem}>
    {icon}
    <Text style={styles.metaText}>{label}</Text>
  </View>
);

const TrialCard = ({ trial }: { trial: Trial }) => {
    const pct = Math.round((trial.enrolled / trial.target) * 100);

    return (
        <View style={GlobalStyles.card}>
            <View style={{ ...GlobalStyles.cardInner, gap: 12 }}>
                {/* Header */}
                <View style={styles.header}>
                    <View style={[GlobalStyles.statIconBox, { backgroundColor: Colors.primaryLight, width: 32, height: 32, borderRadius: 8 }]}>
                        <TrialsIcon width={20} height={20} stroke={Colors.primary} />
                    </View>
                    <View style={styles.titleBlock}>
                        <View style={styles.titleRow}>
                            <Text style={styles.trialName}>{trial.name}</Text>
                            <View style={styles.badge}>
                                <Text style={styles.badgeText}>{trial.status}</Text>
                            </View>
                            <Text style={styles.phase}>{trial.phase}</Text>
                        </View>
                        <Text style={styles.nctId}>{trial.nctId}</Text>
                    </View>
                </View>

                {/* Description */}
                <Text style={styles.description} numberOfLines={3}>
                    {trial.description}
                </Text>

                {/* Tags */}
                <View style={styles.tags}>
                    {trial.tags.map((tag: string, i: number) => (
                        <View key={i} style={styles.tag}>
                            <Text style={styles.tagText}>{tag}</Text>
                        </View>
                    ))}
                </View>

                {/* Meta row */}
                <View style={styles.meta}>
                    <MetaItem
                        icon={<MapPinIcon width={16} height={16} stroke={Colors.textMuted} />}
                        label={trial.location}
                    />
                    <MetaItem
                        icon={<CalenderIcon width={16} height={16} stroke={Colors.textMuted} />}
                        label={`Est. completion: ${trial.completion}`}
                    />
                </View>

                {/* Enrollment */}
                <View style={styles.enrollBox}>
                    <View style={styles.enrollHeader}>
                        <Text style={styles.enrollLabel}>Enrollment</Text>
                        <Text style={styles.enrollCount}>
                            {trial.enrolled}/{trial.target}
                        </Text>
                    </View>
                    <View style={styles.barTrack}>
                        <View style={[styles.barFill, { width: `${pct}%` }]} />
                    </View>
                    <Text style={styles.pctText}>{pct}% complete</Text>
                </View>

                {/* Eligible patients */}
                <View style={styles.eligibleBox}>
                    <CirclesIcon width={16} height={16} stroke={Colors.success} />
                    <Text style={styles.eligibleText}>
                    {trial.eligiblePatients} eligible patient{trial.eligiblePatients !== 1 ? 's' : ''}
                    </Text>
                </View>
            </View>
        </View>
    );
};

export default TrialCard;