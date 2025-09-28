import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FolderKanban, 
  MessageSquare, 
  FileText, 
  Calendar, 
  Users,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Menu,
  User
} from 'lucide-react';

export const CollaborateSidebar = ({ activeSection, onSectionChange }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);
  
  // Mock user data - in a real app, this would come from authentication context
  const user = {
  name: "Yash",
    avatar: null, // If null, we'll show initials instead
    role: "Alumni"
  };

  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/collaborate/dashboard' },
    { id: 'projects', label: 'Projects', icon: <FolderKanban size={20} />, path: '/collaborate/projects' },
    { id: 'chat', label: 'Team Chat', icon: <MessageSquare size={20} />, path: '/collaborate/chat' },
    { id: 'resources', label: 'Resources', icon: <FileText size={20} />, path: '/collaborate/resources' },
    { id: 'calendar', label: 'Calendar', icon: <Calendar size={20} />, path: '/collaborate/calendar' },
    { id: 'teams', label: 'Teams', icon: <Users size={20} />, path: '/collaborate/teams' },
  ];

  const handleNavigation = (section) => {
    onSectionChange(section);
    navigate(sidebarItems.find(item => item.id === section).path);
  };

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  // Get user initials for avatar fallback
  const getUserInitials = (name) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  return (
    <div className={`${isCollapsed ? 'w-16' : 'w-64'} h-full bg-gray-50 border-r border-gray-200 flex flex-col transition-all duration-300 ease-in-out`}>
      {/* Removed top collapse arrow button */}
      
      {/* User Profile Section with collapsible arrow */}
      <div className={`mt-6 p-4 border-b border-gray-200 flex items-center relative justify-center`}>
        {isCollapsed ? (
          <button
            className="p-1 rounded hover:bg-gray-200 transition-colors flex items-center justify-center"
            aria-label="Expand sidebar"
            onClick={toggleSidebar}
          >
            <ChevronDown size={22} />
          </button>
        ) : (
          <>
            {user.avatar ? (
              <img 
                src={user.avatar} 
                alt={user.name} 
                className="w-10 h-10 rounded-full object-cover border-2 border-blue-500"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold">
                {getUserInitials(user.name)}
              </div>
            )}
            <div className="ml-3">
              <p className="font-medium text-gray-800">{user.name}</p>
              <p className="text-xs text-gray-500">{user.role}</p>
            </div>
            <button
              className="ml-2 p-1 rounded hover:bg-gray-200 transition-colors flex items-center"
              aria-label="Collapse sidebar"
              style={{ marginLeft: 'auto' }}
              onClick={toggleSidebar}
            >
              <ChevronUp size={18} />
            </button>
          </>
        )}
      </div>
      
      <nav className="flex-1 overflow-y-auto">
        <ul className="py-2">
          {sidebarItems.map((item) => (
            <li key={item.id} className="px-2 py-1">
              <button
                onClick={() => handleNavigation(item.id)}
                className={`w-full flex items-center ${isCollapsed ? 'justify-center' : 'justify-start'} px-4 py-3 rounded-lg text-left transition-colors duration-200 ${
                  activeSection === item.id
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
                title={isCollapsed ? item.label : ""}
              >
                <span className={isCollapsed ? "" : "mr-3"}>{item.icon}</span>
                {!isCollapsed && <span className="font-medium">{item.label}</span>}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};