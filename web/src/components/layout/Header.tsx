import { useLocation } from 'react-router-dom';
import { Menu, Bell } from 'lucide-react';

type HeaderProps = {
  onMenuClick: () => void;
};

const ROUTE_TITLES: Record<string, string> = {
  '/dashboard': 'Dashboard',
  '/patients': 'Patients',
  '/trials': 'Trials',
  '/matches': 'Matches',
};

export default function Header({ onMenuClick }: HeaderProps) {
  const location = useLocation();
  const title = ROUTE_TITLES[location.pathname] ?? 'TrialMatch';

  return (
    <header
      className="flex items-center justify-between px-4 py-3.5 border-b bg-white"
      style={{ borderColor: '#E5E5EA' }}
    >
      {/* Left: hamburger + title */}
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="p-2 rounded-xl hover:bg-gray-100 transition-colors md:hidden"
        >
          <Menu size={22} color="#1C1C1E" />
        </button>
        <span className="text-base font-semibold" style={{ color: '#1A2332' }}>
          {title}
        </span>
      </div>

      {/* Right: notification */}
      <div className="relative">
        <button className="p-2 rounded-xl hover:bg-gray-100 transition-colors">
          <Bell size={20} color="#64748B" />
        </button>
        {/* Notification dot */}
        <span
          className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full border-2 border-white"
          style={{ backgroundColor: '#EF4444' }}
        />
      </div>
    </header>
  );
}
