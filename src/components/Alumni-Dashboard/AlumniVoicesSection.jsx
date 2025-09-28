import React from 'react'; // Add this line
import { Star } from 'lucide-react';

function TestimonialCard({ name, quote, rating }) {
  return (
    <div className="h-full rounded-lg bg-white p-6 shadow transition-transform duration-300 hover:-translate-y-1">
      <div className="flex items-center">
        {[...Array(rating)].map((_, i) => (
          <Star key={i} size={20} className="fill-yellow-400 text-yellow-400" />
        ))}
      </div>
      <p className="mt-4 text-gray-600 italic">"{quote}"</p>
      <p className="mt-4 font-bold text-gray-900">- {name}</p>
    </div>
  );
}

export default function AlumniVoicesSection() {
  const testimonials = [
    { name: "Sarah K.", quote: "The alumni network helped me land my dream job. Invaluable connections!", rating: 5 },
    { name: "David L.", quote: "I've reconnected with old friends and found great mentors through the events. It's truly amazing.", rating: 5 },
    { name: "Maria G.", quote: "The volunteering committees allowed me to give back in a meaningful way. Highly recommend!", rating: 5 },
  ];

  return (
    <div className="bg-blue-200 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-4xl font-bold text-white">Alumni Voices</h2>
        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} {...testimonial} />
          ))}
        </div>
      </div>
    </div>
  );
}