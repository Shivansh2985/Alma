import React from 'react';
import { Building2, User, Briefcase, GraduationCap, School, UserCog } from 'lucide-react';

const roles = [
  { id: 'college-admin', name: 'College Admin', icon: UserCog },
  { id: 'student', name: 'Student', icon: GraduationCap },
  { id: 'hr', name: 'HR', icon: Briefcase },
  { id: 'alumni', name: 'Alumni', icon: User },
  { id: 'university', name: 'University', icon: School },
  { id: 'faculty', name: 'Faculty', icon: Building2 },
];

export default function RoleSelection({ title, onSelectRole }) {
  return (
    <div>
      <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
        {title}
      </h2>
      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3">
        {roles.map((role) => (
          <button
            key={role.id}
            onClick={() => onSelectRole(role)}
            className="flex flex-col items-center justify-center gap-2 rounded-lg border bg-white p-4 text-center font-semibold text-gray-700 shadow-sm transition hover:border-primary hover:bg-indigo-50"
          >
            <role.icon className="h-8 w-8 text-primary" />
            <span>{role.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}