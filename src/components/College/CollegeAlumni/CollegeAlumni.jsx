

import React from "react";
import Sidebar from "../CollegeDashboard/charts/Sidebar";
import AlumniList from "../alumni/AlumniList";
import AlumniCharts from "../alumni/AlumniCharts";


const CollegeAlumni = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex">
      <Sidebar />
      <div className="flex-1 max-w-7xl mx-auto px-4 py-8 space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Alumni</h1>
            <p className="text-gray-600 mt-1">Manage and track alumni information</p>
          </div>
          <div className="flex items-center space-x-3">
            <button className="p-2 text-gray-400 hover:text-gray-600">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5-5-5h5v-12h5v12z" />
              </svg>
            </button>
            <button className="p-2 text-gray-400 hover:text-gray-600">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </button>
          </div>
        </div>

        {/* Alumni Charts */}
        <AlumniCharts />

        {/* Alumni List */}
        <AlumniList />
      </div>
    </div>
  );
};

export default CollegeAlumni;
