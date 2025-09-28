import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import RoleSelection from '../components/common/RoleSelection';
import imgSutra from '../components/common/Sutra.png';
// Replace or add these images in your project (examples placed in same folder)
import imgCollege from '../components/common/college.jpg';
import imgUniversity from '../components/common/University.jpg';
import imgStudent from '../components/common/Student.jpg';
import imgAlumni from '../components/common/Alumni.webp';

import { Eye, EyeOff } from 'lucide-react';
import { motion } from 'framer-motion';

// Map role id -> asset and accent color
const ROLE_ASSETS = {
  'college-admin': { img: imgCollege, name: 'College Admin', color: 'from-purple-500 to-indigo-500' },
  university: { img: imgUniversity, name: 'University', color: 'from-emerald-400 to-teal-500' },
  student: { img: imgStudent, name: 'Student', color: 'from-yellow-400 to-orange-400' },
  alumni: { img: imgAlumni, name: 'Alumni', color: 'from-sky-400 to-blue-500' },
  default: { img: imgSutra, name: 'Sutra', color: 'from-gray-300 to-gray-400' },
};

function LoginForm({ role = { id: 'student', name: 'Student' }, onBack = () => {} }) {
  const defaultCreds = role.id === 'college-admin'
    ? { email: 'admin@example.com', password: 'password123' }
    : role.id === 'university'
    ? { email: 'university@example.com', password: 'password123' }
    : { email: 'user@example.com', password: 'password123' };

  const [formData, setFormData] = useState(defaultCreds);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const accent = ROLE_ASSETS[role.id]?.color || ROLE_ASSETS.default.color;

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);

    if (!formData.email.trim() || !formData.password) {
      setError('Please fill in both email and password.');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      console.log('Simulating login for:', { ...formData, role: role.id });
      setLoading(false);
      if (role.id === 'college-admin' || role.id === 'university') {
        navigate('/college-dashboard');
      } else {
        navigate('/profile');
      }
    }, 700);
  };

  return (
    <div className="w-full">
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="bg-white/90 backdrop-blur-md border border-gray-100 rounded-2xl shadow-lg p-8"
      >
        <button
          onClick={onBack}
          className="-ml-2 mb-4 inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-800"
          aria-label="Back to role selection"
        >
          ← Back
        </button>

        <header className="mb-6">
          <h2 className="text-center text-2xl font-semibold text-gray-900">Sign in</h2>
          <p className="mt-1 text-center text-sm text-gray-500">
            Signing in as <span className="font-medium text-primary">{role.name}</span>
          </p>
        </header>

        <form className="space-y-5" onSubmit={handleSubmit} noValidate>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@company.com"
              required
              className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm placeholder-gray-400 shadow-sm focus:outline-none focus:ring-4 focus:ring-offset-1 transition" 
              style={{ boxShadow: '0 6px 18px rgba(22,24,35,0.06)' }}
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                required
                className="w-full rounded-xl border border-gray-200 px-4 py-3 pr-10 text-sm placeholder-gray-400 shadow-sm focus:outline-none focus:ring-4 focus:ring-offset-1 transition"
                style={{ boxShadow: '0 6px 18px rgba(22,24,35,0.06)' }}
              />
              <button
                type="button"
                onClick={() => setShowPassword((s) => !s)}
                className="absolute right-3 top-1/2 -translate-y-1/2 inline-flex items-center justify-center rounded-md p-1 text-gray-500 hover:text-gray-700"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {error && (
            <p className="text-sm text-red-600" role="alert" aria-live="assertive">
              {error}
            </p>
          )}

          <div>
            <button
              type="submit"
              disabled={loading}
              className={`flex w-full items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-semibold text-white shadow-md transition disabled:opacity-60 disabled:cursor-not-allowed bg-gradient-to-r ${accent}`}
            >
              {loading ? (
                <svg
                  className="h-4 w-4 animate-spin"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                </svg>
              ) : (
                'Sign in'
              )}
            </button>
          </div>
        </form>

        <footer className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Not a member?{' '}
            <Link to="/signup" className="font-medium text-primary hover:underline">
              Sign up
            </Link>
          </p>
        </footer>
      </motion.div>
    </div>
  );
}

export default function LoginPage() {
  const [selectedRole, setSelectedRole] = useState(null);

  const roleMeta = selectedRole ? ROLE_ASSETS[selectedRole.id] : ROLE_ASSETS.default;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      {/* container */}
      <div className="w-full max-w-5xl bg-transparent rounded-3xl overflow-hidden shadow-xl grid grid-cols-1 md:grid-cols-2">
        {/* LEFT: image / branding (changes with role) */}
        <div className="hidden md:flex items-center justify-center p-8 relative" style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01))' }}>
          <div className="w-full h-full flex flex-col items-center justify-center gap-6 p-6">
            <div className="w-full h-full rounded-xl overflow-hidden shadow-inner flex items-center justify-center">
              <img
                src={roleMeta.img}
                alt={`${roleMeta.name} artwork`}
                className={
    roleMeta === ROLE_ASSETS.default
      ? "object-contain max-h-80"
      : "object-cover h-full w-full"
  }/>
                
            </div>

            <div className="text-center">
              <h3 className="text-xl font-semibold text-gray-900">Welcome{selectedRole ? `, ${selectedRole.name}` : ''}</h3>
              <p className="mt-2 text-sm text-gray-600">Access your dashboard and resources tailored for <span className="font-medium">{selectedRole ? selectedRole.name : 'Sutra users'}</span>.</p>
            </div>
          </div>

          {/* subtle overlay for color accent */}
          <div className="pointer-events-none absolute inset-0" aria-hidden>
            <div className={`absolute -bottom-20 -right-20 w-80 h-80 rounded-full blur-3xl opacity-40 bg-gradient-to-r ${roleMeta.color}`}></div>
          </div>
        </div>

        {/* RIGHT: role selection or login form */}
        <div className="p-8 flex items-center justify-center">
          <div className="w-full max-w-md">
            

            {selectedRole ? (
              <LoginForm role={selectedRole} onBack={() => setSelectedRole(null)} />
            ) : (
              <div className="space-y-6">
                <RoleSelection title="Sign in as" onSelectRole={setSelectedRole} />

                <p className="text-center text-sm text-gray-500">Or continue as a guest</p>

                <div className="flex justify-center">
                  <Link to="/explore" className="px-4 py-2 rounded-md text-sm font-medium bg-white border border-gray-200 shadow-sm hover:bg-gray-50">Explore</Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
