
import React from "react";
import Sidebar from '../../components/College/CollegeDashboard/charts/Sidebar';
import CollegeProjects from '../../components/College/CollegeProjects/CollegeProjects';

const CollegeProjectsPage = () => (
  <div className="min-h-screen bg-gray-100 flex">
    <Sidebar />
    <div className="flex-1 max-w-7xl mx-auto px-4 py-8">
      <CollegeProjects />
    </div>
  </div>
);

export default CollegeProjectsPage;