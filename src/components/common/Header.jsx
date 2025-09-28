// Header.jsx
import React from 'react';
import { ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import sutra from '../common/Sutra.png'

// Data for our navigation dropdowns.
const navDropdowns = [
  {
		title:"Alumni Directory",
		href:"/alumni-directory",
		items: [
			'View Alumnis',
			'Connect',
		],

	},
  {
    title: 'Data Management',
    href: '/data-management',
    items: [
      'Add/delete Alumni',
      'Import Data',
      'Data Audit info',
      'Filter with AI',
      'Other alumni updates',
    ],
  },
  {
    title: 'Events',
    href: '/events',
    items: ['Upcoming events', 'Event request', 'Create an event'],
  },
  {
    title: 'Job Board',
    href: '/job-board',
    items: ['Post a job', 'View jobs', 'Job Analysis'],
  },
  {
    title: 'Campaigns',
    href: '/campaigns',
    items: ['Recent Campaigns', 'Upcoming Campaigns', 'Donation Insights'],
  },
  {
    title: 'Collaborate',
    href: '/collaborate',
    items: [
      'Dashboard',
      'Projects',
      'Team chats',
      'Resources',
      'Calendar',
      'Teams',
    ],
  },
  {
    title: 'Community',
    href: '/community',
    items: ['Achievements', 'Product Launches', 'Articles', 'Initiatives'],
  },
];

function NavDropdown({ dropdown }) {
  return (
    // `group` makes children react to hover on the parent container
    <div className="relative inline-block text-left group">
      {/* The visible button that the user hovers on */}
      <Link
        type="button"
        to={dropdown.href}
        aria-haspopup="true"
        aria-expanded="false"
        className="inline-flex items-center rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-blue-900 hover:text-white"
      >
        {dropdown.title}
        <ChevronDown className="ml-2 -mr-1 h-5 w-5" aria-hidden="true" />
      </Link>

      {/* Dropdown content: hidden by default, shown when parent is hovered */}
      <div
        className="invisible opacity-0 translate-y-1 group-hover:visible group-hover:opacity-100 group-hover:translate-y-0
                   absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5
                   transition-all duration-150 ease-out"
        role="menu"
        aria-label={`${dropdown.title} menu`}
      >
        <div className="py-1">
          {dropdown.items.map((item, idx) => (
            <Link
              key={idx}
              to={dropdown.href}
              role="menuitem"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
            >
              {item}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Header() {
  return (
    <header className="bg-white border-b shadow-sm">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-4">
        <div className="flex-shrink-0 h-10">
          <Link to="/">
            <img
              className="h-full w-full"
              src={sutra}
              alt="Sutra Logo"
            />
          </Link>
        </div>

        {/* Desktop nav (hidden on small screens) */}
        <div className="hidden lg:flex lg:gap-x-2">
          {navDropdowns.map((dropdown) => (
            <NavDropdown dropdown={dropdown} key={dropdown.title} />
          ))}
        </div>

        <div className="flex items-center gap-x-3 flex-shrink-0">
          <Link
            to="/login"
            className="border-1 rounded-md px-4 py-2 text-sm font-semibold text-primary transition-colors hover:bg-blue-900 hover:text-white"
          >
            Login
          </Link>
          
        </div>
      </nav>
    </header>
  );
}
