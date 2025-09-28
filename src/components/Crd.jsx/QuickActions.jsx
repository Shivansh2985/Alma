// QuickActions component will be added here, styled to match HomePage.jsximport React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { 
  Plus, 
  Users, 
  Upload, 
  Calendar, 
  Package, 
  FileText, 
  BookOpen, 
  MessageSquare 
} from 'lucide-react';

const quickActions = [
  {
    id: 'new-project',
    title: 'Create Project',
    description: 'Start a new research initiative',
    icon: Plus,
    variant: 'gradient',
  },
  {
    id: 'join-team',
    title: 'Join Team',
    description: 'Connect with research groups',
    icon: Users,
    variant: 'success',
  },
  {
    id: 'upload-paper',
    title: 'Upload Paper',
    description: 'Share research findings',
    icon: Upload,
    variant: 'default',
  },
  {
    id: 'schedule-meeting',
    title: 'Schedule Meeting',
    description: 'Plan collaboration sessions',
    icon: Calendar,
    variant: 'warning',
  },
  {
    id: 'request-resources',
    title: 'Request Resources',
    description: 'Access lab equipment & tools',
    icon: Package,
    variant: 'purple',
  },
  {
    id: 'submit-report',
    title: 'Submit Report',
    description: 'Share progress updates',
    icon: FileText,
    variant: 'default',
  },
  {
    id: 'browse-publications',
    title: 'Browse Library',
    description: 'Explore research database',
    icon: BookOpen,
    variant: 'default',
  },
  {
    id: 'contact-mentor',
    title: 'Contact Mentor',
    description: 'Get guidance & feedback',
    icon: MessageSquare,
    variant: 'success',
  },
];

export const QuickActions = () => {
  return (
    <Card className="transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <CardHeader className="bg-gradient-to-r from-indigo-50 to-blue-50 border-b">
        <CardTitle className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-indigo-600 animate-pulse"></span>
          Quick Actions
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {quickActions.map((action) => (
            <Button
              key={action.id}
              variant={action.variant}
              className="flex flex-col items-center gap-3 h-auto p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg group"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/30 transition-all duration-300 group-hover:rotate-6 group-hover:scale-110">
                <action.icon className="h-6 w-6" />
              </div>
              <div className="text-center">
                <div className="font-semibold text-sm">{action.title}</div>
                <div className="text-xs opacity-70 mt-1">{action.description}</div>
              </div>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};