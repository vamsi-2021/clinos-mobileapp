import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import {
  Users,
  FlaskConical,
  CheckCircle2,
  Activity,
  TrendingUp,
  Minus,
  ArrowRight,
  AlertCircle,
  RefreshCw,
} from 'lucide-react';
import { Colors } from '../../constants/theme';

// ── Stat Cards ───────────────────────────────────────────────────────────────
const STAT_CARDS = [
  {
    label: 'Patients Screened',
    value: '5',
    trend: '+12%',
    trendLabel: 'vs last month',
    trendUp: true as boolean | null,
    subLabel: null as string | null,
    Icon: Users,
  },
  {
    label: 'Active Trials',
    value: '5',
    trend: '0%',
    trendLabel: 'vs last month',
    trendUp: null as boolean | null,
    subLabel: null as string | null,
    Icon: FlaskConical,
  },
  {
    label: 'Eligible Matches',
    value: '3',
    trend: '+25%',
    trendLabel: 'vs last month',
    trendUp: true as boolean | null,
    subLabel: '+1 likely eligible',
    Icon: CheckCircle2,
  },
  {
    label: 'Avg Match Score',
    value: '88%',
    trend: '+5%',
    trendLabel: 'vs last month',
    trendUp: true as boolean | null,
    subLabel: null as string | null,
    Icon: Activity,
  },
];

// ── Match distribution ────────────────────────────────────────────────────────
const DISTRIBUTION = [
  { name: 'Eligible', value: 1, color: Colors.eligible },
  { name: 'Likely Eligible', value: 1, color: Colors.primary },
  { name: 'Potential', value: 1, color: Colors.warning },
  { name: 'Needs Review', value: 6, color: Colors.statusIneligible },
];

// ── Trial enrollment ──────────────────────────────────────────────────────────
const ENROLLMENT_DATA = [
  { id: 'KRAS-LUNG-301', enrolled: 165, target: 450 },
  { id: 'BRCA-TNBC-201', enrolled: 45, target: 600 },
  { id: 'BRAF-CRC-301', enrolled: 90, target: 300 },
  { id: 'MELANOMA-IO-101', enrolled: 30, target: 200 },
  { id: 'BRCA-PANC-201', enrolled: 20, target: 150 },
];

// ── Recent matches ────────────────────────────────────────────────────────────
const RECENT_MATCHES = [
  {
    score: 85,
    name: 'Non-Small Cell Lung Cancer',
    trial: 'KRAS-LUNG-301',
    status: 'Likely Eligible',
    statusColor: Colors.white,
    statusBg: Colors.primary,
    scoreBg: Colors.primaryLight,
    scoreColor: Colors.primary,
  },
  {
    score: 95,
    name: 'Triple-Negative Breast Cancer',
    trial: 'BRCA-TNBC-201',
    status: 'Eligible',
    statusColor: Colors.white,
    statusBg: Colors.eligible,
    scoreBg: Colors.statusEligibleLight,
    scoreColor: Colors.success,
  },
  {
    score: 72,
    name: 'Metastatic Colorectal Cancer',
    trial: 'BRAF-CRC-301',
    status: 'Potentially Eligible',
    statusColor: Colors.white,
    statusBg: Colors.warning,
    scoreBg: Colors.statusPendingBg,
    scoreColor: Colors.potentialScore,
  },
  {
    score: 98,
    name: 'Advanced Melanoma',
    trial: 'MELANOMA-IO-101',
    status: 'Eligible',
    statusColor: Colors.white,
    statusBg: Colors.eligible,
    scoreBg: Colors.statusEligibleLight,
    scoreColor: Colors.success,
  },
];

// ── Action items ──────────────────────────────────────────────────────────────
const ACTION_ITEMS = [
  {
    Icon: CheckCircle2,
    iconBg: Colors.statusActiveBg,
    iconColor: Colors.success,
    borderColor: Colors.eligibleBorder,
    backgroundColor: Colors.statusActiveBgLight,
    title: '3 Patients Ready for Referral',
    desc: 'High-confidence matches awaiting coordinator review',
    action: 'Review',
  },
  {
    Icon: AlertCircle,
    iconBg: Colors.statusPendingBg,
    iconColor: Colors.potentialScore,
    borderColor: Colors.potentialBorder,
    backgroundColor: Colors.statusPendingBgLight,
    title: '1 Match Needs Verification',
    desc: 'Conflicting biomarker data requires clinical review',
    action: 'Verify',
  },
  {
    Icon: RefreshCw,
    iconBg: Colors.statusNeutralBg,
    iconColor: Colors.textBody,
    borderColor: Colors.inputBorder,
    backgroundColor: Colors.statusNeutralBgLight,
    title: '2 Trials Updated Eligibility',
    desc: 'Re-run matching for affected patients',
    action: 'Update',
  },
];

// ── Custom tooltip for enrollment chart ──────────────────────────────────────
const EnrollmentTooltip = ({ active, payload, label }: {
  active?: boolean;
  payload?: Array<{ name: string; value: number; color: string }>;
  label?: string;
}) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border rounded-xl shadow-lg px-4 py-3" style={{ borderColor: '#E5E5EA' }}>
      <p className="text-xs font-semibold mb-1.5" style={{ color: '#1A2332' }}>{label}</p>
      {payload.map(p => (
        <p key={p.name} className="text-xs" style={{ color: p.color }}>
          {p.name}: <span className="font-semibold">{p.value}</span>
        </p>
      ))}
    </div>
  );
};

// ── Custom donut label ────────────────────────────────────────────────────────
const DonutCenterLabel = ({ cx, cy, total }: { cx: number; cy: number; total: number }) => (
  <text x={cx} y={cy} textAnchor="middle" dominantBaseline="central">
    <tspan x={cx} dy="-0.4em" fontSize="22" fontWeight="700" fill="#1A2332">{total}</tspan>
    <tspan x={cx} dy="1.4em" fontSize="11" fill="#94a3b8">matches</tspan>
  </text>
);

// ── Card wrapper ─────────────────────────────────────────────────────────────
function Card({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`bg-white rounded-2xl p-5 shadow-sm border ${className}`}
      style={{ borderColor: '#E5E5EA' }}
    >
      {children}
    </div>
  );
}

// ── Section header ─────────────────────────────────────────────────────────────
function SectionHeader({ title, onViewAll }: { title: string; onViewAll?: () => void }) {
  return (
    <div className="flex items-center justify-between mb-4">
      <h3 className="text-base font-semibold" style={{ color: '#1A2332' }}>{title}</h3>
      {onViewAll && (
        <button
          onClick={onViewAll}
          className="flex items-center gap-1 text-xs hover:underline transition-colors"
          style={{ color: '#94a3b8' }}
        >
          View All <ArrowRight size={11} />
        </button>
      )}
    </div>
  );
}

export default function DashboardPage() {
  const total = DISTRIBUTION.reduce((s, d) => s + d.value, 0);

  return (
    <div className="p-4 md:p-6 space-y-4 max-w-5xl mx-auto">
      {/* Page header */}
      <div className="text-center pb-2">
        <h1 className="text-2xl font-bold" style={{ color: '#1A2332' }}>TrialMatch Dashboard</h1>
        <p className="text-sm mt-1" style={{ color: '#64748B' }}>
          AI-powered patient-to-trial matching with explainable results
        </p>
      </div>

      {/* Stat Cards — 2 cols on mobile, 4 on desktop */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {STAT_CARDS.map(card => (
          <Card key={card.label}>
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium truncate" style={{ color: '#64748B' }}>{card.label}</p>
                <p className="text-2xl font-bold mt-1" style={{ color: '#1A2332' }}>{card.value}</p>
                {card.subLabel && (
                  <p className="text-xs mt-0.5" style={{ color: '#127DA1' }}>{card.subLabel}</p>
                )}
                <div className="flex items-center gap-1 mt-1.5">
                  {card.trendUp === true && <TrendingUp size={13} color={Colors.success} />}
                  {card.trendUp === null && <Minus size={13} color="#94a3b8" />}
                  <span
                    className="text-xs font-medium"
                    style={{
                      color: card.trendUp === true
                        ? Colors.success
                        : card.trendUp === false
                        ? Colors.danger
                        : '#94a3b8',
                    }}
                  >
                    {card.trend}
                  </span>
                  <span className="text-xs" style={{ color: '#94a3b8' }}>{card.trendLabel}</span>
                </div>
              </div>
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ml-2"
                style={{ backgroundColor: Colors.primaryLight }}
              >
                <card.Icon size={20} color={Colors.primary} />
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Match Distribution Donut */}
        <Card>
          <SectionHeader title="Match Distribution" />
          <div className="flex flex-col items-center">
            <PieChart width={220} height={220}>
              <Pie
                data={DISTRIBUTION}
                cx={110}
                cy={110}
                innerRadius={62}
                outerRadius={95}
                dataKey="value"
                paddingAngle={3}
                startAngle={90}
                endAngle={-270}
              >
                {DISTRIBUTION.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <DonutCenterLabel cx={110} cy={110} total={total} />
              <Tooltip
                formatter={(value: number, name: string) => [value, name]}
                contentStyle={{
                  borderRadius: 12,
                  border: '1px solid #E5E5EA',
                  fontSize: 12,
                }}
              />
            </PieChart>

            {/* Legend */}
            <div className="grid grid-cols-2 gap-x-6 gap-y-2 mt-2 w-full max-w-xs">
              {DISTRIBUTION.map(seg => (
                <div key={seg.name} className="flex items-center gap-2">
                  <div
                    className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                    style={{ backgroundColor: seg.color }}
                  />
                  <span className="text-xs" style={{ color: '#64748B' }}>
                    {seg.name}: <span className="font-semibold" style={{ color: '#1A2332' }}>{seg.value}</span>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Trial Enrollment Progress */}
        <Card>
          <SectionHeader title="Trial Enrollment Progress" onViewAll={() => {}} />
          <ResponsiveContainer width="100%" height={220}>
            <BarChart
              data={ENROLLMENT_DATA}
              layout="vertical"
              margin={{ top: 0, right: 16, left: 0, bottom: 0 }}
              barSize={10}
              barGap={3}
            >
              <CartesianGrid horizontal={false} strokeDasharray="4 4" stroke="#E2E8F0" />
              <XAxis
                type="number"
                domain={[0, 700]}
                tickCount={5}
                tick={{ fontSize: 10, fill: '#94a3b8' }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                type="category"
                dataKey="id"
                width={100}
                tick={{ fontSize: 10, fill: '#64748B' }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip content={<EnrollmentTooltip />} cursor={{ fill: 'rgba(18,125,161,0.06)' }} />
              <Legend
                iconType="circle"
                iconSize={8}
                wrapperStyle={{ fontSize: 11, paddingTop: 8 }}
              />
              <Bar
                dataKey="enrolled"
                name="Enrolled"
                fill={Colors.secondary}
                radius={[0, 4, 4, 0]}
              />
              <Bar
                dataKey="target"
                name="Target"
                fill="#E2E8F0"
                radius={[0, 4, 4, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Recent Matches */}
      <Card>
        <SectionHeader title="Recent Matches" onViewAll={() => {}} />
        <div className="space-y-2">
          {RECENT_MATCHES.map((match, i) => (
            <button
              key={i}
              className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors text-left"
            >
              {/* Score */}
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: match.scoreBg }}
              >
                <span className="text-base font-bold" style={{ color: match.scoreColor }}>
                  {match.score}%
                </span>
              </div>
              {/* Info */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate" style={{ color: '#1A2332' }}>{match.name}</p>
                <p className="text-xs mt-0.5" style={{ color: '#94a3b8' }}>→ {match.trial}</p>
              </div>
              {/* Status badge */}
              <span
                className="text-xs font-semibold px-2.5 py-1 rounded-full flex-shrink-0"
                style={{ backgroundColor: match.statusBg, color: match.statusColor }}
              >
                {match.status}
              </span>
            </button>
          ))}
        </div>
      </Card>

      {/* Action Items */}
      <Card>
        <SectionHeader title="Action Items" />
        <div className="space-y-3">
          {ACTION_ITEMS.map((item, i) => (
            <div
              key={i}
              className="flex items-start gap-3 p-3.5 rounded-xl border"
              style={{ borderColor: item.borderColor, backgroundColor: item.backgroundColor }}
            >
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                style={{ backgroundColor: item.iconBg }}
              >
                <item.Icon size={16} color={item.iconColor} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold" style={{ color: '#1A2332' }}>{item.title}</p>
                <p className="text-xs mt-0.5 leading-relaxed" style={{ color: '#64748B' }}>{item.desc}</p>
              </div>
              <button
                className="text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors hover:opacity-80 flex-shrink-0"
                style={{ color: Colors.primary, backgroundColor: Colors.primaryLight }}
              >
                {item.action}
              </button>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
