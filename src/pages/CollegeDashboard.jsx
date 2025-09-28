import React from "react";
import { Header, InstituteOverview, StatsCards } from "../components/College/CollegeDashboard/Dashboard";
import ChartsSection from "../components/College/CollegeDashboard/charts/ChartsSection";
import Sidebar from "../components/College/CollegeDashboard/charts/Sidebar";

export default function CollegeDashboard() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="flex">
        <Sidebar />
        <div className="flex-1 max-w-7xl mx-auto px-4 py-8 space-y-8">
          <InstituteOverview />
          <StatsCards />
          <ChartsSection />
        </div>
      </div>
    </div>
  );
}
