import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  FlaskConical,
  CheckCircle2,
  Sparkles,
  LogOut,
  X,
  User,
  ChevronRight,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

type NavItem = {
  label: string;
  path: string;
  Icon: React.ElementType;
};

const NAV_ITEMS: NavItem[] = [
  { label: 'Dashboard', path: '/dashboard', Icon: LayoutDashboard },
  { label: 'Patients', path: '/patients', Icon: Users },
  { label: 'Trials', path: '/trials', Icon: FlaskConical },
  { label: 'Matches', path: '/matches', Icon: CheckCircle2 },
];

type SidebarProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar panel */}
      <aside
        className={`
          fixed top-0 left-0 h-full w-72 z-30 flex flex-col
          transition-transform duration-300 ease-in-out
          md:relative md:translate-x-0 md:z-auto md:flex-shrink-0
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
        style={{ backgroundColor: '#141E29' }}
      >
        {/* Close button (mobile only) */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors md:hidden"
        >
          <X size={20} />
        </button>

        {/* Logo */}
        <div className="flex items-center gap-3 px-5 pt-8 pb-6">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: 'linear-gradient(135deg, #4DD9C0 0%, #127DA1 100%)' }}
          >
            <FlaskConical size={20} color="white" />
          </div>
          <span className="text-white text-xl font-bold tracking-tight">TrialMatch</span>
        </div>

        {/* AI-Powered banner */}
        <div
          className="mx-4 rounded-xl px-4 py-3 mb-6"
          style={{ background: 'linear-gradient(135deg, #4DD9C0 0%, #127DA1 100%)' }}
        >
          <div className="flex items-center gap-2">
            <Sparkles size={14} color="white" />
            <span className="text-white text-xs font-semibold tracking-wide uppercase">AI-Powered Matching</span>
          </div>
          <p className="text-white/80 text-xs mt-1 leading-relaxed">
            Real-time eligibility analysis with explainable AI results
          </p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 space-y-1">
          {NAV_ITEMS.map(({ label, path, Icon }) => (
            <NavLink
              key={path}
              to={path}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-150 group ${
                  isActive
                    ? 'text-white font-semibold'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`
              }
              style={({ isActive }) =>
                isActive ? { backgroundColor: '#1E2D3D' } : undefined
              }
            >
              {({ isActive }) => (
                <>
                  <Icon
                    size={20}
                    color={isActive ? '#4DD9C0' : undefined}
                    className={isActive ? '' : 'group-hover:text-gray-300'}
                  />
                  <span className="text-sm">{label}</span>
                  {isActive && (
                    <div
                      className="ml-auto w-1.5 h-1.5 rounded-full"
                      style={{ backgroundColor: '#4DD9C0' }}
                    />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* TrialMatch AI CTA */}
        <div className="px-4 pb-4">
          <button
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold transition-opacity hover:opacity-90"
            style={{ background: 'linear-gradient(135deg, #4DD9C0 0%, #127DA1 100%)', color: 'white' }}
          >
            <Sparkles size={16} />
            TrialMatch AI
          </button>
        </div>

        {/* User section */}
        <div
          className="border-t px-4 py-4"
          style={{ borderColor: '#1E2D3D' }}
        >
          <div className="flex items-center gap-3 mb-3">
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: '#1E2D3D' }}
            >
              <User size={18} color="#94a3b8" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white text-sm font-medium truncate">Dr. Sarah Mitchell</p>
              <p className="text-gray-500 text-xs truncate">Oncology Coordinator</p>
            </div>
            <ChevronRight size={16} color="#4b5563" />
          </div>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-all text-sm"
          >
            <LogOut size={16} />
            Sign Out
          </button>
        </div>
      </aside>
    </>
  );
}
