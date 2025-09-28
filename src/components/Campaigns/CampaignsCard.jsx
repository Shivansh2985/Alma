import React from 'react';
import { Target } from 'lucide-react';

export default function CampaignCard({ title, goal, raised, category, description }) {
  const progress = Math.min((raised / goal) * 100, 100);

  return (
    <div className="flex flex-col rounded-lg bg-blue-200 shadow-lg transition-transform duration-300 hover:-translate-y-1">
      <div className="p-6">
        <span className="mb-2 inline-block rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold uppercase text-primary">
          {category}
        </span>
        <h3 className="text-xl font-bold text-gray-900">{title}</h3>
        <p className="mt-2 text-gray-600">{description}</p>
        
        <div className="mt-4">
          <div className="flex justify-between text-sm font-medium text-gray-700">
            <span>Raised: ${raised.toLocaleString()}</span>
            <span className="flex items-center gap-1"><Target size={14} /> Goal: ${goal.toLocaleString()}</span>
          </div>
          <div className="mt-1 h-2 rounded-full bg-gray-200">
            <div 
              className="h-2 rounded-full bg-primary" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      </div>
      <div className="mt-auto rounded-b-lg border-t bg-gray-50 p-4">
        <button className="w-full rounded-md bg-primary px-4 py-2 font-semibold text-black shadow-sm hover:bg-opacity-90">
          Donate Now
        </button>
      </div>
    </div>
  );
}