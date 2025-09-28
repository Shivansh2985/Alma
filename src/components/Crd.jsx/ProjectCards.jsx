import React from 'react';

export const ProjectCards = () => {
  // Using the enhanced project cards component below
  return <EnhancedProjectCards />;
};
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Plus } from 'lucide-react';

const projects = [
  {
    id: '1',
    title: 'AI-Powered Medical Diagnosis',
    mentor: 'Dr. Sarah Johnson',
    status: 'active',
    description: 'Developing advanced machine learning models for early disease detection using medical imaging data and deep neural networks.',
    members: [
      { name: 'Sarah Johnson', initials: 'SJ' },
      { name: 'Alex Kumar', initials: 'AK' },
      { name: 'Maria Rodriguez', initials: 'MR' },
    ],
    memberCount: 6,
  },
  {
    id: '2',
    title: 'Quantum Computing Research',
    mentor: 'Prof. Alex Chen',
    status: 'active',
    description: 'Exploring quantum algorithms for cryptography and optimization problems using IBM\'s quantum processors.',
    members: [
      { name: 'Alex Chen', initials: 'AC' },
      { name: 'David Park', initials: 'DP' },
      { name: 'Lisa Wang', initials: 'LW' },
    ],
    memberCount: 5,
  },
  {
    id: '3',
    title: 'Sustainable Energy Systems',
    mentor: 'Dr. Emma Thompson',
    status: 'planning',
    description: 'Researching innovative approaches to renewable energy storage and distribution using smart grid technologies.',
    members: [
      { name: 'Emma Thompson', initials: 'ET' },
      { name: 'John Smith', initials: 'JS' },
    ],
    memberCount: 4,
  },
];

export const EnhancedProjectCards = () => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'completed':
        return 'bg-gray-100 text-gray-700 border-gray-300';
      case 'planning':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  return (
    <Card className="transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between bg-gradient-to-r from-indigo-50 to-blue-50 border-b">
        <CardTitle className="flex items-center gap-2">
          Active Projects
        </CardTitle>
        <Button className="bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700">
          <Plus className="mr-2 h-4 w-4" />
          New Project
        </Button>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        {projects.map((project) => (
          <Card key={project.id} className="transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:border-indigo-200 group cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-lg group-hover:text-indigo-600 transition-all duration-300">
                    {project.title}
                  </h3>
                  <p className="text-sm text-gray-500 font-medium">
                    Mentor: {project.mentor}
                  </p>
                </div>
                <Badge className={`${getStatusColor(project.status)} font-semibold uppercase tracking-wide`}>
                  {project.status}
                </Badge>
              </div>
              
              <p className="text-sm text-gray-600 mb-6 leading-relaxed">
                {project.description}
              </p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-2">
                    {project.members.slice(0, 3).map((member, index) => (
                      <div
                        key={index}
                        className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-indigo-600 to-blue-600 text-white text-xs font-semibold border-2 border-white shadow-sm transition-all duration-300 hover:scale-110 hover:z-10"
                      >
                        {member.initials}
                      </div>
                    ))}
                    {project.memberCount > 3 && (
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-600 text-xs font-semibold border-2 border-white">
                        +{project.memberCount - 3}
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="transition-all duration-300 hover:border-indigo-600 hover:text-indigo-600">
                    View
                  </Button>
                  <Button size="sm" className="bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700">
                    Join
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </CardContent>
    </Card>
  );
};