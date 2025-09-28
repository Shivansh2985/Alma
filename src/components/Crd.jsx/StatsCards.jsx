import React from 'react';
import { FolderOpen, Users, Clock, MessageCircle, TrendingUp, UserPlus, Calendar as CalendarIcon, Activity } from 'lucide-react';
import { Card, CardContent } from '../ui/card';

const StatCard = ({ title, value, change, icon: Icon, variant = 'default', changeIcon: ChangeIcon }) => {
  const variantStyles = {
    default: 'border-t-4 border-t-indigo-600',
    success: 'border-t-4 border-t-emerald-500',
    warning: 'border-t-4 border-t-amber-500',
    danger: 'border-t-4 border-t-red-500',
  };

  const iconVariants = {
    default: 'text-indigo-600',
    success: 'text-emerald-500',
    warning: 'text-amber-500',
    danger: 'text-red-500',
  };

  return (
    <Card className={`transition-all duration-300 hover:-translate-y-2 hover:shadow-xl ${variantStyles[variant]} group`}>
      <CardContent className="p-7">
        <div className="flex items-center justify-between mb-5">
          <span className="text-sm font-semibold uppercase tracking-wider text-gray-500">
            {title}
          </span>
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-100 transition-all duration-300 group-hover:rotate-12 group-hover:scale-110">
            <Icon className={`h-6 w-6 ${iconVariants[variant]}`} />
          </div>
        </div>
        <div className="text-4xl font-bold text-gray-900 mb-2">{value}</div>
        <div className="flex items-center gap-1 text-sm font-medium text-emerald-600">
          <ChangeIcon className="h-4 w-4" />
          {change}
        </div>
      </CardContent>
    </Card>
  );
};

export const StatsCards = () => {
  const stats = [
    {
      title: 'Active Projects',
      value: 12,
      change: '+2 this month',
      icon: FolderOpen,
      changeIcon: TrendingUp,
      variant: 'default',
    },
    {
      title: 'Team Members',
      value: 47,
      change: '+5 new joiners',
      icon: Users,
      changeIcon: UserPlus,
      variant: 'success',
    },
    {
      title: 'Upcoming Deadlines',
      value: 5,
      change: 'Next: Tomorrow',
      icon: Clock,
      changeIcon: CalendarIcon,
      variant: 'warning',
    },
    {
      title: 'Unread Messages',
      value: 23,
      change: '3 teams active',
      icon: MessageCircle,
      changeIcon: Activity,
      variant: 'danger',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
      {stats.map((stat) => (
        <StatCard
          key={stat.title}
          {...stat}
        />
      ))}
    </div>
  );
};