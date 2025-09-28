import React from 'react'; // Add this line
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="md:col-span-1">
            <h3 className="text-2xl font-bold text-white">Sutra</h3>
            <p className="mt-4">Stay Connected with Sutra Alumni Network.</p>
            <div className="mt-4 flex gap-4">
              <a href="#" className="hover:text-white"><Facebook size={24} /></a>
              <a href="#" className="hover:text-white"><Twitter size={24} /></a>
              <a href="#" className="hover:text-white"><Instagram size={24} /></a>
              {/* This is the corrected line */}
              <a href="#" className="hover:text-white"><Linkedin size={24} /></a>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-8 md:col-span-2 md:grid-cols-4">
            <div>
              <h4 className="font-semibold text-white">About Us</h4>
              <ul className="mt-4 space-y-2">
                <li><a href="#" className="hover:text-white">Our Story</a></li>
                <li><a href="#" className="hover:text-white">Mission</a></li>
                <li><a href="#" className="hover:text-white">Team</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white">Programs</h4>
              <ul className="mt-4 space-y-2">
                <li><a href="#" className="hover:text-white">Mentorship</a></li>
                <li><a href="#" className="hover:text-white">Scholarships</a></li>
                <li><a href="#" className="hover:text-white">Networking</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white">Resources</h4>
              <ul className="mt-4 space-y-2">
                <li><a href="#" className="hover:text-white">Career Hub</a></li>
                <li><a href="#" className="hover:text-white">Publications</a></li>
                <li><a href="#" className="hover:text-white">FAQs</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white">Contact Us</h4>
              <ul className="mt-4 space-y-2">
                <li><a href="#" className="hover:text-white">Support</a></li>
                <li><a href="#" className="hover:text-white">Partnerships</a></li>
                <li><a href="#" className="hover:text-white">Media</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-800 pt-8 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} Sutra Alumni Network. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}