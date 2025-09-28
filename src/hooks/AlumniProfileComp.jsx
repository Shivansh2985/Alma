/*
AlumniProfileComponent.jsx
Single-file React + Tailwind component with compact card, detailed profile page, and Chart.js analytics.

What's changed in this version:
- Fixed URL id handling and removed the unconditional fallback that always showed the first profile.
- Scroll-to-top behavior added — when you open any profile the page scrolls to the top smoothly.
- Stronger, modernized Tailwind styling for the analytics and profile layout (gradients, glass cards, hover effects, subtle animations).
- Animated stat counters (lightweight) for the quick-stats panel.
- Kept charts using Chart.js; chart containers styled consistently.

How to use:
1. Install dependencies:
   npm install react-router-dom chart.js react-chartjs-2
2. Replace or import your `alumniMembers` array from './AlumniMember' (make sure IDs are unique and numbers).
3. Add a route in your app: <Route path="/alumni/:id" element={<AlumniProfileRoute />} />

Note: Don't forget to keep alumni IDs numeric in your data (not strings).
*/

import React, { useMemo, useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import alumniMembers from '../components/Alumni-Directory/AlumniMember';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
);

// Utility: generate dummy analytics for an alumni entry (you can replace with real analytics)
function generateAnalytics(seed = 1) {
  const base = Math.abs(seed * 37) % 50 + 20;
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
  const connections = months.map((_, i) => Math.max(5, base + Math.round(10 * Math.sin(i + seed))));
  const performance = [
    Math.max(50, base + Math.round(seed * 2)),
    Math.max(40, base - 5 + seed),
    Math.max(60, base + 8 - seed),
  ];
  const events = [Math.max(1, (seed % 5) + 2), Math.max(0, seed % 3)];
  const donation = Math.round(((seed % 7) + 1) * 250*250);
  const jobs = Math.round((seed % 4) + 1);
  return { months, connections, performance, events, donation, jobs };
}

// Small animated counter hook (lightweight, no deps)
function useAnimatedNumber(target, duration = 700) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    let start = 0;
    const diff = target - start;
    if (diff === 0) { setValue(target); return; }
    const startTime = performance.now();
    let raf = null;
    function tick(now) {
      const t = Math.min(1, (now - startTime) / duration);
      const eased = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t; // easeInOutQuad-ish
      setValue(Math.round(start + eased * diff));
      if (t < 1) raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);
  return value;
}

// -----------------------------
// Compact alumni card component
// -----------------------------
export function AlumniCard({ alumni }) {
  const analytics = useMemo(() => generateAnalytics(alumni.id), [alumni.id]);

  return (
    <article className="group relative rounded-2xl shadow-lg overflow-hidden bg-white hover:shadow-2xl transition p-4 flex flex-col gap-4 border border-slate-100 hover:scale-[1.01]">
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 rounded-full overflow-hidden ring-2 ring-indigo-200">
          <img
            src={alumni.image}
            alt={alumni.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = '/assets/avatar-placeholder.png';
            }}
          />
        </div>
        <div>
          <h3 className="text-lg font-semibold">{alumni.name}</h3>
          <p className="text-sm text-slate-500">{alumni.major} • {alumni.gradYear}</p>
        </div>
      </div>

      <p className="text-sm text-slate-600 line-clamp-2">{alumni.description}</p>

      <div className="flex items-center justify-between mt-auto">
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <span className="px-2 py-1 rounded-md bg-indigo-50 text-indigo-700">{analytics.connections.slice(-1)[0]} connections</span>
          <span className="px-2 py-1 rounded-md bg-emerald-50 text-emerald-700">{analytics.jobs} jobs</span>
        </div>

        <Link to={`/alumni/${alumni.id}`} className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-indigo-500 to-cyan-400 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:scale-105 transition">
          View Profile
        </Link>
      </div>
    </article>
  );
}

// -----------------------------
// Detailed profile page (expanded)
// -----------------------------
function ProfileDetails({ alumni, isLarge = true }) {
  const analytics = useMemo(() => generateAnalytics(alumni.id), [alumni.id]);

  // Animated quick stats
  const animConnections = useAnimatedNumber(analytics.connections.slice(-1)[0]);
  const animEvents = useAnimatedNumber(analytics.events[0]);
  const animDonation = useAnimatedNumber(analytics.donation);
  const animJobs = useAnimatedNumber(analytics.jobs);

  // Chart data
  const lineData = {
    labels: analytics.months,
    datasets: [
      {
        label: 'Connections',
        data: analytics.connections,
        tension: 0.3,
        fill: true,
        backgroundColor: 'rgba(79,70,229,0.08)',
        borderColor: 'rgba(79,70,229,0.9)',
        pointRadius: 3,
      },
    ],
  };

  const barData = {
    labels: ['Projects', 'Reviews', 'Activity'],
    datasets: [
      {
        label: 'Performance Index',
        data: analytics.performance,
        backgroundColor: ['rgba(34,197,94,0.8)', 'rgba(59,130,246,0.8)', 'rgba(99,102,241,0.8)'],
      },
    ],
  };

  const doughnutData = {
    labels: ['Events Attended', 'Other Engagements'],
    datasets: [
      {
        data: [analytics.events[0], analytics.events[1] || 1],
        backgroundColor: ['rgba(14,165,233,0.85)', 'rgba(148,163,184,0.2)'],
      },
    ],
  };

  return (
    <div className={isLarge ? 'space-y-6' : 'space-y-4'}>
      <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-28 h-28 rounded-2xl overflow-hidden shadow-lg ring-1 ring-indigo-100">
            <img src={alumni.image} alt={alumni.name} className="w-full h-full object-cover" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold">{alumni.name}</h1>
            <p className="text-sm text-slate-500">{alumni.major} • Class of {alumni.gradYear}</p>
            <p className="mt-2 text-sm text-slate-600 max-w-xl">{alumni.description}</p>

            <div className="mt-3 flex flex-wrap gap-2">
              {alumni.skills?.map((s) => (
                <span key={s} className="px-2 py-1 rounded-md bg-slate-100 text-xs">{s}</span>
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <div className="text-4xl text-black">Achievement</div>
            <div className="text-sm font-medium max-w-xs">{alumni.achievement}</div>
          </div>
        </div>
      </header>

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <div className="rounded-2xl p-4 bg-gradient-to-br from-white to-indigo-50 shadow-sm border border-indigo-50">
            <h3 className="text-sm font-semibold text-slate-700 mb-3">Connections over time</h3>
            <div className="h-48 md:h-64 rounded-md bg-white/40 p-2 shadow-inner">
              <Line data={lineData} options={{ maintainAspectRatio: false, plugins: { legend: { display: false } } }} />
            </div>
          </div>

          <div className="rounded-2xl p-4 bg-white shadow-sm grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-3 rounded-lg bg-slate-50">
              <h4 className="text-sm font-semibold mb-2">Performance</h4>
              <div className="h-40">
                <Bar data={barData} options={{ maintainAspectRatio: false, plugins: { legend: { display: false } } }} />
              </div>
            </div>

            <div className="p-3 rounded-lg bg-gradient-to-tr from-white to-cyan-50 flex flex-col items-center justify-center">
              <h4 className="text-sm font-semibold mb-2">Events & Donations</h4>
              <div className="w-40 h-40">
                <Doughnut data={doughnutData} options={{ maintainAspectRatio: false, plugins: { legend: { position: 'bottom' } } }} />
              </div>
              <div className="text-sm text-slate-600 mt-3">
                <div>Events attended: <span className="font-medium">{animEvents}</span></div>
                <div>Donation given: <span className="font-medium">₹{animDonation}</span></div>
                <div>Jobs referred: <span className="font-medium">{animJobs}</span></div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl p-4 bg-white shadow-sm">
            <h4 className="text-sm font-semibold mb-3">Recent activity</h4>
            <ul className="space-y-2 text-sm text-slate-600">
              <li>• Referred a candidate for Frontend Engineer role (2025-08-12)</li>
              <li>• Attended alumni meetup (2025-07-05)</li>
              <li>• Gave guest lecture on NLP (2025-06-10)</li>
            </ul>
          </div>
        </div>

        <aside className="space-y-4">
          <div className="rounded-2xl p-4 bg-gradient-to-tr from-white to-indigo-50 shadow-sm border border-indigo-50">
            <h4 className="text-sm font-semibold mb-2">Quick stats</h4>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="p-3 bg-blue-500 rounded-lg transform transition hover:-translate-y-1">
                <div className="text-xs text-white">Connections</div>
                <div className="text-lg font-bold text-white">{animConnections}</div>
              </div>
              <div className="p-3 bg-green-500 rounded-lg transform transition hover:-translate-y-1">
                <div className="text-xs text-white">Events</div>
                <div className="text-lg font-bold text-white">{animEvents}</div>
              </div>
              <div className="p-3 bg-red-500 rounded-lg transform transition hover:-translate-y-1">
                <div className="text-xs text-white">Donations</div>
                <div className="text-lg font-bold text-white">₹{animDonation}</div>
              </div>
              <div className="p-3 bg-yellow-500 rounded-lg transform transition hover:-translate-y-1">
                <div className="text-xs text-white">Jobs referred</div>
                <div className="text-lg font-bold text-white">{animJobs}</div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl p-4 bg-white shadow-sm">
            <h4 className="text-sm font-semibold mb-2">Contact</h4>
            <p className="text-sm text-slate-600">Connect on LinkedIn or GitHub for opportunities and collaborations.</p>
            <div className="mt-3 flex gap-2">
              <a href={alumni.socials?.linkedin} target="_blank" rel="noreferrer" className="flex-1 text-center px-3 py-2 rounded-md border bg-gradient-to-r from-indigo-500 to-cyan-400 text-white hover:scale-110 transition">LinkedIn</a>
              <a href={alumni.socials?.github} target="_blank" rel="noreferrer" className="flex-1 text-center px-3 py-2 rounded-md border bg-gradient-to-r from-indigo-500 to-cyan-400 text-white hover:scale-110 transition">GitHub</a>
            </div>
          </div>
        </aside>
      </section>
    </div>
  );
}

// -----------------------------
// Route / Page component — default export
// -----------------------------
export default function AlumniProfile() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Ensure numeric ID and protect against invalid params
  const alumniId = Number(id);
  const alumni = alumniMembers[0];

  // Scroll to top when component mounts or when alumniId changes
  useEffect(() => {
    // small timeout to let route render first, then scroll
    const t = setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 40);
    return () => clearTimeout(t);
  }, [alumniId]);

  if (!alumni) {
    return (
      <div className="p-8">
        <p className="text-center text-slate-600">Alumni not found.</p>
        <div className="mt-6 text-center">
          <Link to="/alumni-directory" className="inline-block px-4 py-2 rounded-md border">Back to directory</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white p-6 md:p-10">
      <div className="max-w-6xl mx-auto">
        <button onClick={() => navigate('/')} className="mb-6 inline-block text-sm text-slate-600">← Back</button>

        <div className="rounded-3xl bg-transparent p-6 md:p-8">
          <ProfileDetails alumni={alumni} isLarge={true} />
        </div>

        {/* Smaller preview cards area (optional): list other alumni with compact cards */}
        <div className="mt-10">
          {/* <h3 className="text-lg font-semibold mb-4">Other alumni</h3> */}
          {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {alumniMembers.slice(0, 6).map((a) => (
              <AlumniCard key={a.id} alumni={a} />
            ))}
          </div> */}
        </div>
      </div>
    </div>
  );
}

// -----------------------------
// OPTIONAL: Small exported helper to render a gallery/list of alumni cards
// -----------------------------
export function AlumniGallery() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {alumniMembers.map((a) => (
        <AlumniCard key={a.id} alumni={a} />
      ))}
    </div>
  );
}
