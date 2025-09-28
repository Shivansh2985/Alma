import React from 'react';
import { Link } from 'react-router-dom';

export default function CampaignsHero({ onStartCampaignClick }) {
  return (
    <section className="bg-blue-900 text-white">
      <div className="mx-auto max-w-4xl px-4 py-24 text-center">
        <h1 className="text-5xl font-extrabold tracking-tight md:text-6xl">
          Drive Change with Alumni Campaigns
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-indigo-100">
          Join fellow alumni in supporting meaningful causes, from scholarships to campus innovations. Your contribution makes a lasting impact.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Link
            to="/campaigns/explore"
            className="rounded-md border border-white bg-primary/20 px-6 py-3 font-bold text-white shadow-md transition hover:bg-white/10"
          >
            Explore Campaigns
          </Link>
          <button
            onClick={onStartCampaignClick}
            className="rounded-md border border-white bg-primary/20 px-6 py-3 font-bold text-white shadow-md transition hover:bg-white/10"
          >
            Start a Campaign
          </button>
        </div>
      </div>
    </section>
  );
}

