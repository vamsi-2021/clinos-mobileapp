import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { GlobalStyles } from '../../../styles/GlobalStyles';
import { Colors } from '../../../constants/theme';
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

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: 10,
    },
    iconBox: {
        width: 44,
        height: 44,
        borderRadius: 10,
        backgroundColor: '#E6F1FB',
        alignItems: 'center',
        justifyContent: 'center',
    },
    iconText: { fontSize: 20 },
    titleBlock: { flex: 1, gap: 2 },
    titleRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        flexWrap: 'wrap',
    },
    trialName: {
        fontSize: 15,
        fontWeight: '700',
        color: '#0C447C',
    },
    badge: {
        backgroundColor: '#1D9E75',
        borderRadius: 20,
        paddingHorizontal: 10,
        paddingVertical: 3,
    },
    badgeText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: '600',
    },
    phase: { fontSize: 13, color: '#888' },
    nctId: { fontSize: 12, color: '#999' },
    description: { fontSize: 12, color: '#333', lineHeight: 20 },
    tags: { flexDirection: 'row', gap: 8, flexWrap: 'wrap' },
    tag: {
        backgroundColor: Colors.primaryLight,
        borderRadius: 20,
        paddingHorizontal: 10,
        paddingVertical: 4,
    },
    tagText: { fontSize: 11, color: Colors.primary },
    meta: { flexDirection: 'row', justifyContent: 'space-between' },
    metaText: { fontSize: 12, color: '#888', flexWrap: 'wrap', marginRight: 20 },
    enrollBox: { gap: 6 },
    enrollHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    enrollLabel: { fontSize: 13, color: '#555' },
    enrollCount: { fontSize: 15, fontWeight: '700', color: '#222' },
    barTrack: {
        height: 8,
        backgroundColor: '#E8E8E8',
        borderRadius: 4,
    },
    barFill: {
        height: 8,
        backgroundColor: '#185FA5',
        borderRadius: 4,
    },
    pctText: { fontSize: 12, color: '#888' },
    eligibleBox: {
        backgroundColor: '#F0FBF6',
        borderRadius: 4,
        padding: 12,
        alignItems: 'center',
        flexDirection: 'row'
    },
    eligibleText: {
        fontSize: 14,
        color: '#0F6E56',
        fontWeight: '500',
        marginLeft: 8
    },
    metaItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 6,
  },
});

export default TrialCard;

