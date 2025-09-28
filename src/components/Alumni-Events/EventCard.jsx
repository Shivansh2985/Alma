import React from 'react';
import { ArrowRight, Calendar, MapPin } from 'lucide-react';

export default function EventCard({ imageSrc, tag, date, location, title, description, linkText }) {
  return (
    <div className="group overflow-hidden rounded-lg bg-white shadow-md transition-shadow duration-300 hover:shadow-xl">
      <div className="relative">
        <img 
          src={imageSrc} 
          alt={title} 
          className="cursor-pointer h-80 w-full object-cover transition-transform duration-300 group-hover:scale-80 hover:h-full"
        />
        <span className="absolute top-4 right-4 rounded-full bg-black/50 px-3 py-1 text-xs font-semibold text-white">
          {tag}
        </span>
      </div>
      <div className="p-6">
        <div className="mb-3 flex items-center gap-4 text-sm text-gray-500">
          <span className="flex items-center gap-2"><Calendar size={16} /> {date}</span>
          <span className="flex items-center gap-2"><MapPin size={16} /> {location}</span>
        </div>
        <h3 className="text-xl font-bold text-gray-900">{title}</h3>
        <p className="mt-2 text-gray-600 line-clamp-2">{description}</p>
        <a href="#" className="mt-4 inline-flex items-center gap-2 font-semibold text-primary transition-colors hover:text-blue-700">
          {linkText} <ArrowRight size={16} />
        </a>
      </div>
    </div>
  );
}