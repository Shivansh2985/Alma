import React, { useEffect, useRef } from "react";

const alumniByYearData = [
  { year: 2018, count: 45 },
  { year: 2019, count: 52 },
  { year: 2020, count: 48 },
  { year: 2021, count: 55 },
  { year: 2022, count: 62 },
  { year: 2023, count: 58 },
  { year: 2024, count: 65 },
];

const alumniByDepartmentData = [
  { department: "Computer Engineering", count: 125 },
  { department: "Mechanical Engineering", count: 98 },
  { department: "Civil Engineering", count: 87 },
  { department: "Electrical Engineering", count: 76 },
  { department: "Electronics & Communication", count: 69 },
];

const employmentStatusData = [
  { status: "Employed", count: 285, color: "#1e40af" },
  { status: "Higher Studies", count: 95, color: "#3b82f6" },
  { status: "Entrepreneur", count: 35, color: "#60a5fa" },
  { status: "Seeking Job", count: 40, color: "#93c5fd" },
];

const AlumniCharts = () => {
  const yearChartRef = useRef(null);
  const departmentChartRef = useRef(null);
  const employmentChartRef = useRef(null);

  useEffect(() => {
    const loadPlotly = async () => {
      const Plotly = (await import("plotly.js-dist-min")).default;

      // Alumni by Year Chart
      if (yearChartRef.current) {
        const yearTrace = {
          x: alumniByYearData.map((d) => d.year),
          y: alumniByYearData.map((d) => d.count),
          type: "scatter",
          mode: "lines+markers",
          line: { color: "#1e40af", width: 3 },
          marker: { color: "#1e40af", size: 8 },
          name: "Alumni Count",
        };
        Plotly.newPlot(
          yearChartRef.current,
          [yearTrace],
          {
            title: {
              text: "Alumni Graduation by Year",
              font: { size: 16, color: "#1f2937" },
            },
            xaxis: { title: "Year", gridcolor: "#f3f4f6" },
            yaxis: { title: "Number of Alumni", gridcolor: "#f3f4f6" },
            plot_bgcolor: "white",
            paper_bgcolor: "white",
            margin: { t: 60, r: 40, b: 60, l: 60 },
          },
          { responsive: true }
        );
      }
      // Alumni by Department Chart
      if (departmentChartRef.current) {
        const departmentTrace = {
          x: alumniByDepartmentData.map((d) => d.department),
          y: alumniByDepartmentData.map((d) => d.count),
          type: "bar",
          marker: { color: "#1e40af" },
          name: "Alumni Count",
        };
        Plotly.newPlot(
          departmentChartRef.current,
          [departmentTrace],
          {
            title: {
              text: "Alumni by Department",
              font: { size: 16, color: "#1f2937" },
            },
            xaxis: { title: "Department", gridcolor: "#f3f4f6" },
            yaxis: { title: "Number of Alumni", gridcolor: "#f3f4f6" },
            plot_bgcolor: "white",
            paper_bgcolor: "white",
            margin: { t: 60, r: 40, b: 100, l: 60 },
          },
          { responsive: true }
        );
      }
      // Employment Status Chart
      if (employmentChartRef.current) {
        const employmentTrace = {
          labels: employmentStatusData.map((d) => d.status),
          values: employmentStatusData.map((d) => d.count),
          type: "pie",
          marker: {
            colors: employmentStatusData.map((d) => d.color),
          },
          textinfo: "label+percent",
          textposition: "auto",
        };
        Plotly.newPlot(
          employmentChartRef.current,
          [employmentTrace],
          {
            title: {
              text: "Alumni Employment Status",
              font: { size: 16, color: "#1f2937" },
            },
            plot_bgcolor: "white",
            paper_bgcolor: "white",
            margin: { t: 60, r: 40, b: 40, l: 40 },
          },
          { responsive: true }
        );
      }
    };
    loadPlotly();
  }, []);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
      {/* Alumni by Year Chart */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div ref={yearChartRef} className="h-80"></div>
      </div>
      {/* Alumni by Department Chart */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div ref={departmentChartRef} className="h-80"></div>
      </div>
      {/* Employment Status Chart */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div ref={employmentChartRef} className="h-80"></div>
      </div>
    </div>
  );
};

export default AlumniCharts;
