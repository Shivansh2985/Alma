import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import { motion } from 'framer-motion';

import RoleSelection from '../components/common/RoleSelection';
import img from '../components/common/Sutra.png'



// Improved SignupForm component with modern Tailwind styling and small UX improvements
// Usage: <SignupForm role={{ id: 'student', name: 'Student' }} onBack={() => {}} />

function SignupForm({ role = { id: 'user', name: 'User' }, onBack = () => {} }) {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);

    // Simple front-end validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.password) {
      setError('Please fill in all fields.');
      return;
    }

    setLoading(true);

    // Simulate signup
    setTimeout(() => {
      console.log('Simulating signup for:', { ...formData, role: role.id });
      setLoading(false);
      // Friendly success UI instead of alert
      navigate('/login');
    }, 700);
  };

  return (
    <div className="min-h-[65vh] flex items-center justify-center px-4 py-10">
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="w-full max-w-md bg-white/80 backdrop-blur-md border border-gray-200 rounded-2xl shadow-lg p-8"
      >
        <button
          onClick={onBack}
          className="-ml-2 mb-4 inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-800"
          aria-label="Back to role selection"
        >
          ← Back
        </button>

        <header className="mb-6">
          <h2 className="text-center text-2xl font-semibold text-gray-900">Create an account</h2>
          <p className="mt-1 text-center text-sm text-gray-500">
            Signing up as <span className="font-medium text-primary">{role.name}</span>
          </p>
        </header>

        <form className="space-y-5" onSubmit={handleSubmit} noValidate>
          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Full name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your full name"
              required
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-primary transition"
            />
          </div>

          {/* Email */}
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
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-primary transition"
            />
          </div>

          {/* Password with toggle */}
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
                placeholder="Choose a secure password"
                required
                className="w-full rounded-lg border border-gray-200 px-3 py-2 pr-10 text-sm placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-primary transition"
                aria-invalid={error ? 'true' : 'false'}
                aria-describedby={error ? 'signup-error' : undefined}
              />

              <button
                type="button"
                onClick={() => setShowPassword((s) => !s)}
                className="absolute right-2 top-1/2 -translate-y-1/2 inline-flex items-center justify-center rounded-md p-1 text-gray-500 hover:text-gray-700"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {/* Error */}
          {error && (
            <p id="signup-error" className="text-sm text-red-600" role="alert" aria-live="assertive">
              {error}
            </p>
          )}

          {/* Submit */}
          <div>
            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-black shadow-sm hover:opacity-95 disabled:opacity-60 disabled:cursor-not-allowed transition"
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
                'Create account'
              )}
            </button>
          </div>
        </form>

        <footer className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Already a member?{' '}
            <Link to="/login" className="font-medium text-primary hover:underline">
              Sign in
            </Link>
          </p>
        </footer>
      </motion.div>
    </div>
  );
}


// Main page component
export default function SignupPage() {
    const [selectedRole, setSelectedRole] = useState(null);

    return (
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 bg-white">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <img className="h-30 w-auto" src={img} alt="Sutra Logo" />

                {selectedRole ? (
                    <SignupForm role={selectedRole} onBack={() => setSelectedRole(null)} />
                ) : (
                    <RoleSelection title="Sign up as" onSelectRole={setSelectedRole} />
                )}
            </div>
        </div>
    );
}

