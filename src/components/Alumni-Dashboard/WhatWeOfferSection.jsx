import React from 'react';
import { Briefcase, Users, Megaphone, Calendar, Globe, Award } from 'lucide-react';

function OfferCard({ icon: Icon, title, description }) {
  return (
    <div className="flex items-start gap-4 rounded-lg bg-white p-6 shadow transition-transform duration-300 hover:-translate-y-1">
      <div className="flex-shrink-0">
        <Icon size={30} className="text-primary" />
      </div>
      <div>
        <h3 className="text-lg font-bold">{title}</h3>
        <p className="mt-1 text-gray-600">{description}</p>
      </div>
    </div>
  );
}

export default function WhatWeOfferSection() {
  const offers = [
    { icon: Users, title: "Alumni Directory", description: "Connect with classmates and expand your network." },
    { icon: Briefcase, title: "Career Opportunities", description: "Explore exclusive job opportunities." },
    { icon: Megaphone, title: "Events & Reunions", description: "Stay connected with alumni events and gatherings." },
  ];

  return (
    <div className="bg-blue-900 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-4xl font-bold text-white">What We Offer</h2>
        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {offers.map((offer, index) => (
            <OfferCard key={index} {...offer} />
          ))}
        </div>
      </div>
    </div>
  );
}