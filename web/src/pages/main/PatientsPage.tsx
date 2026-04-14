import { useState, useMemo } from 'react';
import { Search, ChevronDown, ChevronUp, MapPin, FlaskConical } from 'lucide-react';
import { Colors } from '../../constants/theme';

type Marker = { label: string; positive: boolean };

type Patient = {
  id: string;
  diagnosis: string;
  age: number;
  sex: string;
  stage: string;
  location: string;
  ecog: number;
  markers: Marker[];
  eligibleTrials: number;
};

type FilterOption = { label: string; value: string };

const CANCER_TYPE_OPTIONS: FilterOption[] = [
  { label: 'All Cancer Types', value: 'all' },
  { label: 'Lung Cancer', value: 'lung' },
  { label: 'Breast Cancer', value: 'breast' },
  { label: 'Colorectal Cancer', value: 'colorectal' },
  { label: 'Prostate Cancer', value: 'prostate' },
  { label: 'Melanoma', value: 'melanoma' },
  { label: 'Bladder Cancer', value: 'bladder' },
];

const PATIENTS: Patient[] = [
  {
    id: 'PT-001',
    diagnosis: 'EGFR-mutated non-small cell lung adenocarcinoma',
    age: 58,
    sex: 'Female',
    stage: 'Stage IV',
    location: 'Boston, MA',
    ecog: 1,
    markers: [
      { label: 'EGFR', positive: true },
      { label: 'PD-L1', positive: true },
      { label: 'ALK', positive: false },
    ],
    eligibleTrials: 1,
  },
  {
    id: 'PT-002',
    diagnosis: 'KRAS G12C mutated non-small cell lung cancer',
    age: 67,
    sex: 'Male',
    stage: 'Stage IIIB',
    location: 'New York, NY',
    ecog: 0,
    markers: [
      { label: 'KRAS', positive: true },
      { label: 'PD-L1', positive: true },
      { label: 'EGFR', positive: false },
    ],
    eligibleTrials: 1,
  },
];

function PatientCard({ patient }: { patient: Patient }) {
  return (
    <div
      className="bg-white rounded-2xl border p-5 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
      style={{ borderColor: '#E5E5EA' }}
    >
      {/* Header row */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full" style={{ backgroundColor: Colors.primaryLight, color: Colors.primary }}>
              {patient.id}
            </span>
            <span className="text-xs px-2 py-0.5 rounded-full border" style={{ borderColor: '#CBD5E1', color: '#64748B' }}>
              ECOG {patient.ecog}
            </span>
          </div>
          <p className="text-sm font-semibold leading-snug" style={{ color: '#1A2332' }}>
            {patient.diagnosis}
          </p>
        </div>
        <div className="text-right flex-shrink-0">
          <span
            className="text-xs font-semibold px-2.5 py-1 rounded-full"
            style={{ backgroundColor: Colors.statusEligibleLight, color: Colors.success }}
          >
            {patient.eligibleTrials} trial{patient.eligibleTrials !== 1 ? 's' : ''}
          </span>
        </div>
      </div>

      {/* Demographics */}
      <div className="flex flex-wrap gap-x-4 gap-y-1 mb-3">
        <span className="text-xs" style={{ color: '#64748B' }}>{patient.age} yrs · {patient.sex}</span>
        <span className="text-xs" style={{ color: '#64748B' }}>{patient.stage}</span>
        <span className="flex items-center gap-1 text-xs" style={{ color: '#64748B' }}>
          <MapPin size={11} />
          {patient.location}
        </span>
      </div>

      {/* Biomarkers */}
      <div className="flex flex-wrap gap-2">
        {patient.markers.map(m => (
          <span
            key={m.label}
            className="text-xs font-medium px-2.5 py-1 rounded-full border"
            style={
              m.positive
                ? { backgroundColor: Colors.primaryLight, color: Colors.primary, borderColor: '#B8D9E6' }
                : { backgroundColor: '#F5F6F7', color: '#6C7C93', borderColor: '#E5E5EA' }
            }
          >
            {m.positive ? '+' : '–'} {m.label}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function PatientsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<FilterOption>(CANCER_TYPE_OPTIONS[0]);
  const [filterOpen, setFilterOpen] = useState(false);

  const filteredPatients = useMemo(() => {
    return PATIENTS.filter(p => {
      const matchesSearch =
        p.diagnosis.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.id.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesFilter =
        selectedFilter.value === 'all' ||
        p.diagnosis.toLowerCase().includes(selectedFilter.value);
      return matchesSearch && matchesFilter;
    });
  }, [searchQuery, selectedFilter]);

  return (
    <div className="p-4 md:p-6 max-w-4xl mx-auto space-y-4">
      {/* Header */}
      <div className="text-center pb-1">
        <h1 className="text-2xl font-bold" style={{ color: '#1A2332' }}>Patients</h1>
        <p className="text-sm mt-1" style={{ color: '#64748B' }}>
          Manage patient profiles and find matching trials
        </p>
      </div>

      {/* Search + Filter */}
      <div className="flex gap-2">
        <div
          className="flex-1 flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl border bg-white"
          style={{ borderColor: '#E0E6EB', backgroundColor: '#F9FAFB' }}
        >
          <Search size={16} color="#94a3b8" />
          <input
            type="text"
            placeholder="Search by diagnosis or patient ID..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="flex-1 text-sm bg-transparent outline-none"
            style={{ color: '#1C1C1E' }}
          />
        </div>

        {/* Filter dropdown */}
        <div className="relative">
          <button
            onClick={() => setFilterOpen(v => !v)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl border bg-white text-sm font-medium transition-colors hover:bg-gray-50"
            style={{ borderColor: '#E0E6EB', color: '#64748B' }}
          >
            <FlaskConical size={15} />
            <span className="hidden sm:inline">{selectedFilter.label}</span>
            {filterOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </button>
          {filterOpen && (
            <div
              className="absolute right-0 top-full mt-1 w-52 bg-white border rounded-xl shadow-lg z-10 py-1.5 overflow-hidden"
              style={{ borderColor: '#E5E5EA' }}
            >
              {CANCER_TYPE_OPTIONS.map(opt => (
                <button
                  key={opt.value}
                  onClick={() => { setSelectedFilter(opt); setFilterOpen(false); }}
                  className="w-full text-left px-4 py-2.5 text-sm transition-colors hover:bg-gray-50"
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
        {filteredPatients.length} patient{filteredPatients.length !== 1 ? 's' : ''} found
      </p>

      {/* Patient cards */}
      <div className="space-y-3">
        {filteredPatients.length > 0 ? (
          filteredPatients.map(p => <PatientCard key={p.id} patient={p} />)
        ) : (
          <div className="text-center py-16" style={{ color: '#94a3b8' }}>
            <Search size={36} className="mx-auto mb-3 opacity-40" />
            <p className="text-sm">No patients match your search</p>
          </div>
        )}
      </div>
    </div>
  );
}
