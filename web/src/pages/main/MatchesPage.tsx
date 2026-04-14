import { Colors } from '../../constants/theme';

type Match = {
  id: string;
  patient: string;
  trial: string;
  score: number;
  date: string;
};

const MOCK_MATCHES: Match[] = [
  { id: '1', patient: 'Sarah Johnson', trial: 'Phase III Diabetes Study', score: 94, date: 'Today' },
  { id: '2', patient: 'Robert Chen', trial: 'Oncology Immunotherapy Trial', score: 87, date: 'Today' },
  { id: '3', patient: 'Maria Garcia', trial: 'COPD Bronchodilator Study', score: 91, date: 'Yesterday' },
  { id: '4', patient: 'James Wilson', trial: 'Hypertension Drug Trial', score: 78, date: 'Yesterday' },
  { id: '5', patient: 'Emily Davis', trial: 'MS Neuroprotection Trial', score: 85, date: '2 days ago' },
];

function getScoreColor(score: number): string {
  if (score >= 90) return Colors.scoreHigh;
  if (score >= 75) return Colors.scoreMedium;
  return Colors.scoreLow;
}

function getScoreBg(score: number): string {
  if (score >= 90) return Colors.statusEligibleLight;
  if (score >= 75) return Colors.statusPendingBg;
  return '#FDECEA';
}

function getScoreLabel(score: number): string {
  if (score >= 90) return 'High';
  if (score >= 75) return 'Medium';
  return 'Low';
}

function MatchCard({ match }: { match: Match }) {
  const scoreColor = getScoreColor(match.score);
  const scoreBg = getScoreBg(match.score);

  return (
    <div
      className="bg-white rounded-2xl border p-4 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow cursor-pointer"
      style={{ borderColor: '#E5E5EA' }}
    >
      {/* Score circle */}
      <div
        className="w-16 h-16 rounded-xl flex flex-col items-center justify-center flex-shrink-0"
        style={{ backgroundColor: scoreBg }}
      >
        <span className="text-lg font-bold leading-none" style={{ color: scoreColor }}>
          {match.score}%
        </span>
        <span className="text-xs font-medium mt-0.5" style={{ color: scoreColor }}>
          {getScoreLabel(match.score)}
        </span>
      </div>

      {/* Patient + trial info */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold truncate" style={{ color: '#1A2332' }}>
          {match.patient}
        </p>
        <p className="text-xs mt-0.5 truncate" style={{ color: '#64748B' }}>
          {match.trial}
        </p>
        <p className="text-xs mt-1" style={{ color: '#ADB1BD' }}>
          {match.date}
        </p>
      </div>

      {/* Review button */}
      <button
        className="flex-shrink-0 text-xs font-semibold px-3.5 py-2 rounded-xl transition-all hover:opacity-80"
        style={{ backgroundColor: Colors.primaryLight, color: Colors.primary }}
      >
        Review
      </button>
    </div>
  );
}

export default function MatchesPage() {
  const grouped = MOCK_MATCHES.reduce<Record<string, Match[]>>((acc, m) => {
    (acc[m.date] = acc[m.date] || []).push(m);
    return acc;
  }, {});

  return (
    <div className="p-4 md:p-6 max-w-3xl mx-auto space-y-4">
      {/* Header */}
      <div className="text-center pb-1">
        <h1 className="text-2xl font-bold" style={{ color: '#1A2332' }}>Match Results</h1>
        <p className="text-sm mt-1" style={{ color: '#64748B' }}>
          Review patient-trial matches with AI-powered eligibility analysis
        </p>
      </div>

      {/* Summary bar */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: 'High (≥90%)', count: MOCK_MATCHES.filter(m => m.score >= 90).length, color: Colors.scoreHigh, bg: Colors.statusEligibleLight },
          { label: 'Medium (75–89%)', count: MOCK_MATCHES.filter(m => m.score >= 75 && m.score < 90).length, color: Colors.scoreMedium, bg: Colors.statusPendingBg },
          { label: 'Low (<75%)', count: MOCK_MATCHES.filter(m => m.score < 75).length, color: Colors.scoreLow, bg: '#FDECEA' },
        ].map(s => (
          <div
            key={s.label}
            className="rounded-xl p-3 text-center"
            style={{ backgroundColor: s.bg }}
          >
            <p className="text-xl font-bold" style={{ color: s.color }}>{s.count}</p>
            <p className="text-xs mt-0.5" style={{ color: s.color }}>{s.label}</p>
          </div>
        ))}
      </div>

      {/* Grouped match cards */}
      {Object.entries(grouped).map(([date, matches]) => (
        <div key={date}>
          <p className="text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: '#94a3b8' }}>
            {date}
          </p>
          <div className="space-y-2">
            {matches.map(m => <MatchCard key={m.id} match={m} />)}
          </div>
        </div>
      ))}
    </div>
  );
}
