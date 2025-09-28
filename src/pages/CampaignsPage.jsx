import React, { useState } from 'react';
import CampaignsHero from '../components/Campaigns/CampaignsHero.jsx';
import CampaignsCard from '../components/Campaigns/CampaignsCard.jsx';
import CampaignsCharts from '../components/Campaigns/CampaignsCharts.jsx';
import StartCampaignsModal from '../components/Campaigns/StartCampaignsModal.jsx';

// Dummy data for running campaigns
const initialCampaigns = [
  { id: 1, title: 'Annual Scholarship Fund', goal: 50000, raised: 32500, category: 'Education', description: 'Support the next generation of leaders by contributing to our annual scholarship fund.' },
  { id: 2, title: 'New Tech Hub Initiative', goal: 75000, raised: 45000, category: 'Innovation', description: 'Help us build a state-of-the-art technology and innovation hub for students.' },
  { id: 3, title: 'Campus Green Project', goal: 25000, raised: 24500, category: 'Sustainability', description: 'Fund our initiative to create more green spaces and promote sustainability on campus.' },
];

export default function CampaignsPage() {
  const [runningCampaigns, setRunningCampaigns] = useState(initialCampaigns);
  const [isStartModalOpen, setIsStartModalOpen] = useState(false);

  const handleAddCampaign = (newCampaign) => {
    setRunningCampaigns(prevCampaigns => [newCampaign, ...prevCampaigns]);
  };

  return (
    <>
      <div className="bg-gray-50">
        <CampaignsHero onStartCampaignClick={() => setIsStartModalOpen(true)} />

        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          {/* Running Campaigns Section */}
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">Running Campaigns</h2>
            <p className="mt-2 text-lg text-gray-600">
              Join a cause you care about. Your support can make a real difference.
            </p>
            <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {runningCampaigns.map((campaign) => (
                <CampaignsCard key={campaign.id} {...campaign} />
              ))}
            </div>
          </div>

          {/* Charts Section */}
          <CampaignsCharts />
        </div>
      </div>
      
      <StartCampaignsModal 
        open={isStartModalOpen}
        onOpenChange={setIsStartModalOpen}
        onAddCampaign={handleAddCampaign}
      />
    </>
  );
}

