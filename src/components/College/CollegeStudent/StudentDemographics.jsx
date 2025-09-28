import React, { useEffect, useRef } from "react";

const demographicsData = { domestic: 385, international: 65 };
const departmentDistribution = [
  { department: "Computer Engineering", count: 120, color: "#1e40af" },
  { department: "Mechanical Engineering", count: 95, color: "#3b82f6" },
  { department: "Civil Engineering", count: 85, color: "#60a5fa" },
  { department: "Electrical Engineering", count: 80, color: "#93c5fd" },
  { department: "Electronics & Communication", count: 70, color: "#bfdbfe" },
];

const StudentDemographics = () => {
  const chartRef = useRef(null);
  useEffect(() => {
    const loadPlotly = async () => {
      const Plotly = (await import("plotly.js-dist-min")).default;
      if (chartRef.current) {
        const trace = {
          labels: departmentDistribution.map((d) => d.department),
          values: departmentDistribution.map((d) => d.count),
          type: "pie",
          marker: { colors: departmentDistribution.map((d) => d.color) },
          textinfo: "label+percent",
          textposition: "auto",
          hole: 0.4,
        };
        Plotly.newPlot(
          chartRef.current,
          [trace],
          {
            title: { text: "Students by Department", font: { size: 14, color: "#1f2937" } },
            plot_bgcolor: "white",
            paper_bgcolor: "white",
            margin: { t: 40, r: 20, b: 20, l: 20 },
            showlegend: false,
          },
          { responsive: true }
        );
      }
    };
    loadPlotly();
  }, []);
  const totalStudents = demographicsData.domestic + demographicsData.international;
  const domesticPercentage = ((demographicsData.domestic / totalStudents) * 100).toFixed(1);
  const internationalPercentage = ((demographicsData.international / totalStudents) * 100).toFixed(1);
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Student Demographics</h2>
        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
          <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        </div>
      </div>
      {/* Domestic vs International */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-blue-900 rounded-full"></div>
            <span className="text-sm font-medium text-gray-700">Domestic</span>
          </div>
          <span className="text-sm font-semibold text-gray-900">{domesticPercentage}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
          <div className="bg-blue-900 h-2 rounded-full" style={{ width: `${domesticPercentage}%` }}></div>
        </div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <span className="text-sm font-medium text-gray-700">International</span>
          </div>
          <span className="text-sm font-semibold text-gray-900">{internationalPercentage}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
          <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${internationalPercentage}%` }}></div>
        </div>
      </div>
      {/* Department Distribution Chart */}
      <div className="border-t border-gray-200 pt-6">
        <div ref={chartRef} className="h-64"></div>
      </div>
      {/* Summary Stats */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-blue-900">{totalStudents}</div>
            <div className="text-sm text-gray-600">Total Students</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-blue-900">{departmentDistribution.length}</div>
            <div className="text-sm text-gray-600">Departments</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDemographics;
