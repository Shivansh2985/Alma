import React from 'react';
import { Newspaper, Bell, MonitorCheck } from 'lucide-react';

function InformedCard({ icon: Icon, title, description }) {
  return (
    <div className="rounded-lg bg-white p-8 text-center shadow transition-transform duration-300 hover:-translate-y-1">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-indigo-100">
        <Icon size={30} className="text-primary" />
      </div>
      <h3 className="mt-6 text-lg font-bold text-gray-900">{title}</h3>
      <p className="mt-2 text-gray-600">{description}</p>
    </div>
  );
}

export default function StayInformedSection() {
  const informedItems = [
    { icon: Newspaper, title: "Latest News & Updates", description: "Be the first to know about campus news and alumni achievements." },
    { icon: Bell, title: "Event Notifications", description: "Receive timely alerts for upcoming alumni gatherings and webinars." },
    { icon: MonitorCheck, title: "Personalized Content", description: "Get content tailored to your interests and career stage." },
  ];

  return (
    <div className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-4xl font-bold text-gray-900">Stay Informed & Engaged</h2>
        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
          {informedItems.map((item, index) => (
            <InformedCard key={index} {...item} />
          ))}
        </div>
      </div>
    </div>
  );
}