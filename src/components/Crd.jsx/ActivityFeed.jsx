import React from 'react';
import { GitCommit, CheckCircle, Upload, Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';

const activityItems = [
  {
    id: '1',
    type: 'commit',
    title: 'New AI model committed',
    description: 'Sarah Chen committed new AI model to Vision Project',
    timestamp: '2 hours ago',
    user: 'SC',
  },
  {
    id: '2',
    type: 'milestone',
    title: 'Project milestone completed',
    description: 'IoT Smart Home project milestone completed successfully',
    timestamp: '5 hours ago',
    user: 'System',
  },
  {
    id: '3',
    type: 'upload',
    title: 'Research paper uploaded',
    description: 'Dr. Patel uploaded research paper on Quantum Computing',
    timestamp: '1 day ago',
    user: 'DP',
  },
  {
    id: '4',
    type: 'join',
    title: 'New team member',
    description: 'Alex Kumar joined Blockchain Research team',
    timestamp: '2 days ago',
    user: 'AK',
  },
];

export const ActivityFeed = () => {
  const getActivityIcon = (type) => {
    switch (type) {
      case 'commit':
        return { icon: GitCommit, gradient: 'bg-gradient-to-r from-indigo-600 to-blue-600' };
      case 'milestone':
        return { icon: CheckCircle, gradient: 'bg-gradient-to-r from-emerald-500 to-emerald-600' };
      case 'upload':
        return { icon: Upload, gradient: 'bg-gradient-to-r from-amber-500 to-amber-600' };
      case 'join':
        return { icon: Users, gradient: 'bg-gradient-to-r from-purple-600 to-purple-700' };
      default:
        return { icon: GitCommit, gradient: 'bg-gradient-to-r from-indigo-600 to-blue-600' };
    }
  };

  return (
    <Card className="transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <CardHeader className="pb-4 bg-gradient-to-r from-indigo-50 to-blue-50 border-b">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-3">
            <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></div>
            Recent Activity
          </CardTitle>
          <Button variant="outline" size="sm">
            View All
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        {activityItems.map((item) => {
          const activityMeta = getActivityIcon(item.type);
          const Icon = activityMeta.icon;
          
          return (
            <div
              key={item.id}
              className="group flex gap-4 p-6 transition-all duration-300 hover:bg-gray-50 border-b last:border-b-0"
            >
              <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${activityMeta.gradient} shadow-md transition-all duration-300 group-hover:scale-110`}>
                <Icon className="h-5 w-5 text-white" />
              </div>
              <div className="flex-1 space-y-1">
                <div className="text-sm font-medium leading-none group-hover:text-indigo-600 transition-all duration-300">
                  {item.description}
                </div>
                <div className="text-xs text-gray-500 font-medium">
                  {item.timestamp}
                </div>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
};