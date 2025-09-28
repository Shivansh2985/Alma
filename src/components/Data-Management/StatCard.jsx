import React from 'react';

export default function StatCard({ icon: Icon, title, value, change }) {
  return (
    <div className="rounded-lg bg-white p-6 shadow">
      <div className="flex items-center">
        <div className="flex-shrink-0 rounded-md bg-primary p-3">
          <Icon className="h-6 w-6 text-black" />
        </div>
        <div className="ml-4">
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
        </div>
      </div>
      {change && <p className="mt-4 text-sm text-gray-500">{change}</p>}
    </div>
  );
}