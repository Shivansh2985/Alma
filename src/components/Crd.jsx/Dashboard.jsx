import React from 'react';
import { StatsCards } from './StatsCards';
import { ProgressChart, ResourceChart, TeamActivityChart } from './Charts';
import { ActivityFeed } from './ActivityFeed';
import { ProjectCards } from './ProjectCards';
import { QuickActions } from './QuickActions';

export const Dashboard = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 to-indigo-800 text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-8 py-28 text-center relative z-10">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight">
            Drive Innovation Together
          </h1>
          <p className="text-lg md:text-xl mb-0 text-indigo-100 max-w-3xl mx-auto leading-relaxed">
            Where ideas meet execution — accelerate breakthroughs through collaboration and shared knowledge.
          </p>
        </div>
        {/* Background Decoration */}
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
      </section>

      {/* Main Content */}
      <main className="flex-1 bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Insights That Matter
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
              Track progress, monitor team activity, and visualize resources with real-time dashboards designed for researchers.
            </p>
          </div>

          {/* Stats Overview */}
          <section className="mb-20">
            <StatsCards />
          </section>

          {/* Quick Actions */}
          <section className="mb-20">
            <h3 className="text-2xl font-semibold text-gray-800 mb-6">
              Quick Actions
            </h3>
            <QuickActions />
          </section>

          {/* Charts */}
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
            <div className="lg:col-span-2 bg-white rounded-2xl shadow p-6">
              <ProgressChart />
            </div>
            <div className="bg-white rounded-2xl shadow p-6">
              <TeamActivityChart />
            </div>
          </section>

          {/* Feed + Resources */}
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
            <div className="bg-white rounded-2xl shadow p-6">
              <ActivityFeed />
            </div>
            <div className="bg-white rounded-2xl shadow p-6">
              <ResourceChart />
            </div>
          </section>

          {/* Projects */}
          <section>
            <h3 className="text-2xl font-semibold text-gray-800 mb-6">
              Featured Projects
            </h3>
            <ProjectCards />
          </section>
        </div>
      </main>
    </div>
  );
};
