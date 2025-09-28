import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Data for the charts
const contributionData = [
  { name: 'Alumni', value: 400 },
  { name: 'Corporate Sponsors', value: 300 },
  { name: 'Faculty & Staff', value: 150 },
  { name: 'Foundations', value: 150 },
];

const fundData = [
  { name: 'Scholarships', value: 450 },
  { name: 'Campus Infrastructure', value: 250 },
  { name: 'Research Grants', value: 200 },
  { name: 'Student Activities', value: 100 },
];

const COLORS = ['#3B82F6', '#87CEEB', '#FFA500', '#BE5504'];

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg bg-white p-2 shadow-md">
        <p className="font-bold">{`${payload[0].name}: $${payload[0].value.toLocaleString()}`}</p>
      </div>
    );
  }
  return null;
};

export default function CampaignCharts() {
  return (
    <div className="mt-16">
      <h2 className="text-center text-3xl font-bold text-gray-900">Campaign Analytics</h2>
      <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2">
        {/* Contributions Chart */}
        <div className="rounded-lg bg-white p-6 shadow-lg">
          <h3 className="text-center text-xl font-semibold">Contributions by Source</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={contributionData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                nameKey="name"
              >
                {contributionData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Funds Chart */}
        <div className="rounded-lg bg-white p-6 shadow-lg">
          <h3 className="text-center text-xl font-semibold">Fund Allocation</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={fundData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                nameKey="name"
              >
                {fundData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}