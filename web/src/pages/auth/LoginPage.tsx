import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, FlaskConical } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
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
        {/* Card */}
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

          {/* Heading */}
          <h1 className="text-2xl font-bold mb-1.5" style={{ color: '#1A2332' }}>Welcome back</h1>
          <p className="text-sm mb-8" style={{ color: '#64748B' }}>
            Sign in to access your clinical trial matching dashboard
          </p>

          <form onSubmit={handleLogin} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium mb-1.5" style={{ color: '#1C1C1E' }}>
                Email
              </label>
              <div
                className="flex items-center gap-2.5 px-3.5 py-3 rounded-xl border bg-white transition-colors focus-within:border-primary"
                style={{ borderColor: '#E2E8F0' }}
              >
                <Mail size={18} color="#94a3b8" />
                <input
                  type="email"
                  placeholder="you@hospital.org"
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
                className="flex items-center gap-2.5 px-3.5 py-3 rounded-xl border bg-white transition-colors focus-within:border-primary"
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
                  className="p-0.5 transition-opacity hover:opacity-70"
                >
                  {showPassword
                    ? <EyeOff size={18} color="#94a3b8" />
                    : <Eye size={18} color="#94a3b8" />
                  }
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <p className="text-sm text-red-500">{error}</p>
            )}

            {/* Submit */}
            <button
              type="submit"
              className="w-full py-3.5 rounded-xl text-white font-semibold text-sm transition-opacity hover:opacity-90 active:opacity-80"
              style={{ background: 'linear-gradient(135deg, #4DD9C0 0%, #127DA1 100%)' }}
            >
              Sign In
            </button>
          </form>

          {/* Sign up link */}
          <p className="text-center text-sm mt-6" style={{ color: '#64748B' }}>
            Don't have an account?{' '}
            <Link
              to="/register"
              className="font-semibold hover:underline"
              style={{ color: '#127DA1' }}
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
