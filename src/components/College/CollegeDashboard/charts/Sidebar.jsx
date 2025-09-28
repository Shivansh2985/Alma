import { useState,useRef } from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  FolderOpen,
  Calendar,
  GraduationCap,
  Briefcase,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", to: "/college-dashboard" },
  { icon: GraduationCap, label: "Alumni", to: "/college/alumni" },
  { icon: Users, label: "Students", to: "/college/students" },
    { icon: FolderOpen, label: "Projects", to: "/college/projects" },
  { icon: Calendar, label: "Events & Campaign", to: "/college/events" },

  { icon: Briefcase, label: "Jobs", to: "/college/jobs" },
  { icon: FolderOpen, label: "Research", to: "/college/research" },
];

export default function Sidebar() {
  // Collapsed by default ✅
  const [collapsed, setCollapsed] = useState(true);
  const collapseTimer = useRef(null);

  const handleMouseEnter = () => {
    // cancel collapse if timer is still pending
    if (collapseTimer.current) {
      clearTimeout(collapseTimer.current);
      collapseTimer.current = null;
    }
    setCollapsed(false);
  };

  const handleMouseLeave = () => {
    // start collapse timer
    collapseTimer.current = setTimeout(() => {
      setCollapsed(true);
    }, 1000); // 5s delay
  };

  return (
    <div
      className={`bg-white border-r border-gray-200 min-h-screen shadow-md transition-all duration-200 ${
        collapsed ? "w-20" : "w-64"
      }`}
    >
       <div
      className="flex flex-col h-full"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
        {/* Collapse Button at the Top */}
        <div className="flex items-center justify-between p-4">
          {!collapsed && (
            <span className="text-lg font-semibold text-blue-900">Menu</span>
          )}
          <button
            className="text-gray-700 cursor-pointer hover:text-blue-900 focus:outline-none"
          >
            {collapsed ? (
              <ChevronRight className="w-5 h-5" />
            ) : (
              <ChevronLeft className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Navigation Menu */}
        <nav className="space-y-2 flex-1 mt-2">
          {menuItems.map((item, index) => (
            <NavLink
              key={index}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center ${
                  collapsed ? "justify-center" : "space-x-3"
                } px-4 py-3 rounded-lg transition-colors duration-200 ` +
                (isActive
                  ? "bg-blue-900 text-white"
                  : "text-gray-700 hover:bg-gray-200")
              }
              end
            >
              <item.icon className="w-5 h-5" />
              {!collapsed && (
                <span className="text-sm cursor-pointer font-medium">{item.label}</span>
              )}
            </NavLink>
          ))}
        </nav>
      </div>
    </div>
  );
}
