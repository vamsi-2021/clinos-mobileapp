import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Lock, Eye, EyeOff, FlaskConical, Stethoscope } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

type Role = 'provider' | 'patient';

export default function RegisterPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [role, setRole] = useState<Role>('provider');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const nameLabel = role === 'provider' ? 'Full Name / Organization' : 'Full Name';
  const emailLabel = role === 'provider' ? 'Work Email' : 'Email';
  const emailPlaceholder = role === 'provider' ? 'you@hospital.org' : 'you@email.com';

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !password) {
      setError('Please fill in all fields');
      return;
    }
    setError('');
    login();
    navigate('/dashboard');
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{ backgroundColor: '#EEF2F6' }}
    >
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-sm border p-8" style={{ borderColor: '#E5E5EA' }}>
          {/* Logo */}
          <div className="flex items-center gap-3 mb-8">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: 'linear-gradient(135deg, #4DD9C0 0%, #127DA1 100%)' }}
            >
              <FlaskConical size={22} color="white" />
            </div>
            <span className="text-2xl font-bold" style={{ color: '#1A2332' }}>TrialMatch</span>
          </div>

          <h1 className="text-2xl font-bold mb-1.5" style={{ color: '#1A2332' }}>Create an account</h1>
          <p className="text-sm mb-6" style={{ color: '#64748B' }}>
            Join TrialMatch to start matching patients to clinical trials
          </p>

          {/* Role selector */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            {(['provider', 'patient'] as Role[]).map(r => (
              <button
                key={r}
                type="button"
                onClick={() => setRole(r)}
                className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${
                  role === r ? 'border-primary bg-primary-light' : 'border-gray-200 hover:border-gray-300'
                }`}
                style={
                  role === r
                    ? { borderColor: '#127DA1', backgroundColor: '#EBF5F8' }
                    : { borderColor: '#E5E5EA' }
                }
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center`}
                  style={{ backgroundColor: role === r ? '#EBF5F8' : '#F1F5F9' }}
                >
                  {r === 'provider'
                    ? <Stethoscope size={20} color={role === r ? '#127DA1' : '#94a3b8'} />
                    : <User size={20} color={role === r ? '#127DA1' : '#94a3b8'} />
                  }
                </div>
                <span
                  className="text-xs font-medium"
                  style={{ color: role === r ? '#127DA1' : '#64748B' }}
                >
                  {r === 'provider' ? 'Healthcare Provider' : 'Patient'}
                </span>
              </button>
            ))}
          </div>

          <form onSubmit={handleRegister} className="space-y-5">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium mb-1.5" style={{ color: '#1C1C1E' }}>
                {nameLabel}
              </label>
              <div
                className="flex items-center gap-2.5 px-3.5 py-3 rounded-xl border focus-within:border-primary"
                style={{ borderColor: '#E2E8F0' }}
              >
                <User size={18} color="#94a3b8" />
                <input
                  type="text"
                  placeholder={role === 'provider' ? 'Dr. Jane Smith' : 'Jane Smith'}
                  value={fullName}
                  onChange={e => setFullName(e.target.value)}
                  className="flex-1 text-sm bg-transparent outline-none"
                  style={{ color: '#1C1C1E' }}
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium mb-1.5" style={{ color: '#1C1C1E' }}>
                {emailLabel}
              </label>
              <div
                className="flex items-center gap-2.5 px-3.5 py-3 rounded-xl border focus-within:border-primary"
                style={{ borderColor: '#E2E8F0' }}
              >
                <Mail size={18} color="#94a3b8" />
                <input
                  type="email"
                  placeholder={emailPlaceholder}
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="flex-1 text-sm bg-transparent outline-none"
                  style={{ color: '#1C1C1E' }}
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium mb-1.5" style={{ color: '#1C1C1E' }}>
                Password
              </label>
              <div
                className="flex items-center gap-2.5 px-3.5 py-3 rounded-xl border focus-within:border-primary"
                style={{ borderColor: '#E2E8F0' }}
              >
                <Lock size={18} color="#94a3b8" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••••"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="flex-1 text-sm bg-transparent outline-none"
                  style={{ color: '#1C1C1E' }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(v => !v)}
                  className="p-0.5 hover:opacity-70 transition-opacity"
                >
                  {showPassword
                    ? <EyeOff size={18} color="#94a3b8" />
                    : <Eye size={18} color="#94a3b8" />
                  }
                </button>
              </div>
            </div>

            {error && <p className="text-sm text-red-500">{error}</p>}

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl text-white font-semibold text-sm transition-opacity hover:opacity-90"
              style={{ background: 'linear-gradient(135deg, #4DD9C0 0%, #127DA1 100%)' }}
            >
              Create Account
            </button>
          </form>

          <p className="text-center text-sm mt-6" style={{ color: '#64748B' }}>
            Already have an account?{' '}
            <Link
              to="/login"
              className="font-semibold hover:underline"
              style={{ color: '#127DA1' }}
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
