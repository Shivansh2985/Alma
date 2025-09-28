import React, { useState } from 'react';
import CampaignCard from '../components/Campaigns/CampaignsCard';

// Dummy data for different campaign types
const runningCampaigns = [
  { id: 1, title: 'Annual Scholarship Fund', goal: 50000, raised: 32500, category: 'Education', description: 'Support the next generation of leaders.' },
];
const upcomingCampaigns = [
  { id: 2, title: 'Library Renovation Project', goal: 100000, raised: 0, category: 'Infrastructure', description: 'Help us modernize our campus library.' },
];
const pastCampaigns = [
    { id: 3, title: 'Campus Green Project', goal: 25000, raised: 25000, category: 'Sustainability', description: 'A successful campaign to create more green spaces on campus.' },
];

export default function ExploreCampaignsPage() {
  const [activeTab, setActiveTab] = useState('running');

  const campaignsToDisplay = {
    running: runningCampaigns,
    upcoming: upcomingCampaigns,
    past: pastCampaigns,
  }[activeTab];

  return (
    <div className="bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-center">Explore Campaigns</h1>
        
        {/* Tabs */}
        <div className="mt-8 border-b border-gray-200">
          <nav className="-mb-px flex justify-center space-x-8" aria-label="Tabs">
            <button onClick={() => setActiveTab('running')} className={`whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium ${activeTab === 'running' ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'}`}>
              Running
            </button>
            <button onClick={() => setActiveTab('upcoming')} className={`whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium ${activeTab === 'upcoming' ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'}`}>
              Upcoming
            </button>
            <button onClick={() => setActiveTab('past')} className={`whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium ${activeTab === 'past' ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'}`}>
              Past
            </button>
          </nav>
        </div>

        {/* Campaign Cards */}
        <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {campaignsToDisplay.map((campaign) => (
              <CampaignCard key={campaign.id} {...campaign} />
            ))}
        </div>
      </div>
    </div>
  );
}
