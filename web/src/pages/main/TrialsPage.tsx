import { useState, useMemo } from 'react';
import { Search, ChevronDown, ChevronUp, MapPin, Calendar, Users, FlaskConical } from 'lucide-react';
import { Colors } from '../../constants/theme';

type FilterOption = { label: string; value: string };

type Trial = {
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
};

const CANCER_TYPE_OPTIONS: FilterOption[] = [
  { label: 'All Cancer Types', value: 'all' },
  { label: 'Lung Cancer', value: 'lung' },
  { label: 'Breast Cancer', value: 'breast' },
  { label: 'Colorectal Cancer', value: 'colorectal' },
  { label: 'Prostate Cancer', value: 'prostate' },
  { label: 'Melanoma', value: 'melanoma' },
  { label: 'Bladder Cancer', value: 'bladder' },
];

const TRIALS: Trial[] = [
  {
    name: 'MARIPOSA',
    status: 'Recruiting',
    phase: 'Phase 3',
    nctId: 'NCT04035486',
    description:
      'A Study of Amivantamab and Lazertinib in Participants With Advanced Non-Small Cell Lung Cancer (NSCLC) With EGFR Exon 20 Insertion Mutations',
    tags: ['Non-Small Cell Lung Cancer', 'EGFR Mutation Positive'],
    location: 'Boston, MA +2 more',
    completion: '31/12/2025',
    enrolled: 850,
    target: 1074,
    eligiblePatients: 1,
  },
];

function ProgressBar({ enrolled, target }: { enrolled: number; target: number }) {
  const pct = Math.min(100, Math.round((enrolled / target) * 100));
  return (
    <div>
      <div className="flex justify-between text-xs mb-1" style={{ color: '#94a3b8' }}>
        <span>Enrollment Progress</span>
        <span>{enrolled} / {target} ({pct}%)</span>
      </div>
      <div className="h-2 rounded-full overflow-hidden" style={{ backgroundColor: '#E2E8F0' }}>
        <div
          className="h-full rounded-full transition-all"
          style={{ width: `${pct}%`, backgroundColor: Colors.secondary }}
        />
      </div>
    </div>
  );
}

function TrialCard({ trial }: { trial: Trial }) {
  return (
    <div
      className="bg-white rounded-2xl border p-5 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
      style={{ borderColor: '#E5E5EA' }}
    >
      {/* Top row */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1.5 flex-wrap">
            <span className="text-base font-bold" style={{ color: '#1A2332' }}>{trial.name}</span>
            <span
              className="text-xs font-semibold px-2 py-0.5 rounded-full"
              style={{ backgroundColor: Colors.statusActiveBg, color: Colors.success }}
            >
              {trial.status}
            </span>
            <span
              className="text-xs px-2 py-0.5 rounded-full border"
              style={{ borderColor: '#CBD5E1', color: '#64748B' }}
            >
              {trial.phase}
            </span>
          </div>
          <p className="text-xs font-mono" style={{ color: '#94a3b8' }}>{trial.nctId}</p>
        </div>
        <div className="flex-shrink-0">
          <span
            className="text-xs font-semibold px-2.5 py-1 rounded-full"
            style={{ backgroundColor: Colors.statusEligibleLight, color: Colors.success }}
          >
            {trial.eligiblePatients} eligible
          </span>
        </div>
      </div>

      {/* Description */}
      <p
        className="text-sm leading-relaxed mb-3 line-clamp-2"
        style={{ color: '#64748B' }}
      >
        {trial.description}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-3">
        {trial.tags.map(tag => (
          <span
            key={tag}
            className="text-xs px-2.5 py-1 rounded-full"
            style={{ backgroundColor: Colors.primaryLight, color: Colors.primary }}
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Meta row */}
      <div className="flex flex-wrap gap-4 mb-4">
        <span className="flex items-center gap-1.5 text-xs" style={{ color: '#64748B' }}>
          <MapPin size={13} color="#94a3b8" />
          {trial.location}
        </span>
        <span className="flex items-center gap-1.5 text-xs" style={{ color: '#64748B' }}>
          <Calendar size={13} color="#94a3b8" />
          Est. completion: {trial.completion}
        </span>
        <span className="flex items-center gap-1.5 text-xs" style={{ color: '#64748B' }}>
          <Users size={13} color="#94a3b8" />
          {trial.eligiblePatients} eligible patient{trial.eligiblePatients !== 1 ? 's' : ''}
        </span>
      </div>

      {/* Progress */}
      <ProgressBar enrolled={trial.enrolled} target={trial.target} />
    </div>
  );
}

export default function TrialsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<FilterOption>(CANCER_TYPE_OPTIONS[0]);
  const [filterOpen, setFilterOpen] = useState(false);

  const filteredTrials = useMemo(() => {
    return TRIALS.filter(trial => {
      const matchesSearch =
        trial.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        trial.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesFilter =
        selectedFilter.value === 'all' ||
        trial.tags.some(tag => tag.toLowerCase().includes(selectedFilter.value.toLowerCase()));
      return matchesSearch && matchesFilter;
    });
  }, [searchQuery, selectedFilter]);

  return (
    <div className="p-4 md:p-6 max-w-4xl mx-auto space-y-4">
      {/* Header */}
      <div className="text-center pb-1">
        <h1 className="text-2xl font-bold" style={{ color: '#1A2332' }}>Trials</h1>
        <p className="text-sm mt-1" style={{ color: '#64748B' }}>
          Browse recruiting oncology trials and their eligibility criteria
        </p>
      </div>

      {/* Search + Filter */}
      <div className="flex gap-2">
        <div
          className="flex-1 flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl border"
          style={{ borderColor: '#E0E6EB', backgroundColor: '#F9FAFB' }}
        >
          <Search size={16} color="#94a3b8" />
          <input
            type="text"
            placeholder="Search by trial name or description..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="flex-1 text-sm bg-transparent outline-none"
            style={{ color: '#1C1C1E' }}
          />
        </div>

        <div className="relative">
          <button
            onClick={() => setFilterOpen(v => !v)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl border bg-white text-sm font-medium hover:bg-gray-50 transition-colors"
            style={{ borderColor: '#E0E6EB', color: '#64748B' }}
          >
            <FlaskConical size={15} />
            <span className="hidden sm:inline">{selectedFilter.label}</span>
            {filterOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </button>
          {filterOpen && (
            <div
              className="absolute right-0 top-full mt-1 w-52 bg-white border rounded-xl shadow-lg z-10 py-1.5"
              style={{ borderColor: '#E5E5EA' }}
            >
              {CANCER_TYPE_OPTIONS.map(opt => (
                <button
                  key={opt.value}
                  onClick={() => { setSelectedFilter(opt); setFilterOpen(false); }}
                  className="w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50 transition-colors"
                  style={{
                    color: selectedFilter.value === opt.value ? Colors.primary : '#1C1C1E',
                    fontWeight: selectedFilter.value === opt.value ? 600 : 400,
                  }}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Results count */}
      <p className="text-xs" style={{ color: '#94a3b8' }}>
        {filteredTrials.length} trial{filteredTrials.length !== 1 ? 's' : ''} found
      </p>

      {/* Trial cards */}
      <div className="space-y-3">
        {filteredTrials.length > 0 ? (
          filteredTrials.map(trial => <TrialCard key={trial.nctId} trial={trial} />)
        ) : (
          <div className="text-center py-16" style={{ color: '#94a3b8' }}>
            <Search size={36} className="mx-auto mb-3 opacity-40" />
            <p className="text-sm">No trials match your search</p>
          </div>
        )}
      </div>
    </div>
  );
}
