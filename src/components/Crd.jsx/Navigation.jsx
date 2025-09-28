import React from 'react';
import { LayoutDashboard, Folder, MessageSquare, Library, Calendar, Users } from 'lucide-react';
import { Button } from '../ui/button';
import { useNavigate, useLocation } from 'react-router-dom';

const navigationItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, path: '/collaborate/dashboard' },
  { id: 'projects', label: 'Projects', icon: Folder, path: '/collaborate/projects' },
  { id: 'chat', label: 'Team Chat', icon: MessageSquare, badge: 3, path: '/collaborate/chat' },
  { id: 'resources', label: 'Resources', icon: Library, path: '/collaborate/resources' },
  { id: 'calendar', label: 'Calendar', icon: Calendar, path: '/collaborate/calendar' },
  { id: 'teams', label: 'Teams', icon: Users, path: '/collaborate/teams' },
];
  // Redirect /collaborate/team-chats to /collaborate/chat
  React.useEffect(() => {
    if (location.pathname === '/collaborate/team-chats') {
      navigate('/collaborate/chat', { replace: true });
    }
  }, [location, navigate]);

export const Navigation = ({ activeSection, onSectionChange }) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const handleNavigation = (item) => {
    onSectionChange(item.id);
    navigate(item.path);
  };
  
  return (
    <div className="bg-white border-b px-8 shadow-sm mt-4">
      <div className="mx-auto max-w-7xl py-2">
        <nav className="flex items-center justify-center gap-2">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            
            return (
              <Button
                key={item.id}
                variant={isActive ? "default" : "ghost"}
                className={`relative h-auto px-5 py-3 font-medium transition-all duration-300 ${
                  isActive 
                    ? 'bg-gradient-to-r from-indigo-600 to-blue-600 text-white shadow-lg hover:shadow-xl hover:-translate-y-0.5' 
                    : 'hover:bg-gray-100 hover:-translate-y-0.5'
                }`}
                onClick={() => handleNavigation(item)}
              >
                <Icon className="mr-2 h-4 w-4" />
                {item.label}
                {item.badge && (
                  <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-semibold text-white animate-pulse">
                    {item.badge}
                  </span>
                )}
              </Button>
            );
          })}
        </nav>
        
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-semibold transition-all duration-300 hover:scale-110 shadow-lg">
            JD
          </div>
        </div>
      </div>
    </div>
  );
};