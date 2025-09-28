import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import {
  FileText,
  Trophy,
  BarChart3,
  BookOpen,
  Heart,
  MessageCircle,
  Share2,
  MoreHorizontal,
  Users,
  Calendar,
  MapPin,
  UserCheck,
  GraduationCap,
  TrendingUp,
  Activity,
  ArrowRight,
  Bell
} from 'lucide-react';

import LeftSidebar from '../components/Community/LeftSideBar';
import MainFeed from '../components/Community/MainFeed';
import RightSidebar from '../components/Community/RightSideBar';

const Community = () => {
  const [activeFilter, setActiveFilter] = useState('All Posts');
  const [likedPosts, setLikedPosts] = useState(new Set());

  // Dummy posts data
  const allPosts = [
    {
      id: 1,
      type: 'achievement',
      author: 'Sarah Johnson',
      authorImage: 'https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=150&h=150&fit=crop&crop=face',
      timestamp: '2 hours ago',
      content: 'Excited to share that I just got promoted to Senior Software Engineer at Google! 🎉',
      image: 'https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=500&h=300&fit=crop',
      likes: 45,
      comments: 12,
      hashtags: ['#Achievement', '#Google', '#Promotion', '#TechCareer']
    },
    {
      id: 2,
      type: 'poll',
      author: 'Mike Chen',
      authorImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      timestamp: '4 hours ago',
      content: 'Which programming language should I learn next for web development?',
      pollOptions: ['React', 'Vue.js', 'Angular', 'Svelte'],
      likes: 23,
      comments: 18,
      hashtags: ['#Poll', '#WebDevelopment', '#Programming', '#CareerAdvice']
    },
    {
      id: 3,
      type: 'article',
      author: 'Priya Singh',
      authorImage: 'https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=150&h=150&fit=crop&crop=face',
      timestamp: '1 day ago',
      content: 'Check out my new article on effective remote work strategies for software teams.',
      image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=500&h=300&fit=crop',
      likes: 31,
      comments: 7,
      hashtags: ['#Article', '#RemoteWork', '#Productivity', '#SoftwareTeams']
    }
  ];

  const communityStats = [
    { label: "Total Members", value: "12,847", icon: Users },
    { label: "Active Alumni", value: "8,592", icon: UserCheck },
    { label: "Current Students", value: "3,421", icon: GraduationCap },
    { label: "This Week", value: "847", subtitle: "New Posts", icon: TrendingUp },
    { label: "Activity Level", value: "High", subtitle: "Engagement", icon: Activity },
  ];

  const filteredPosts = allPosts.filter(post => {
    if (activeFilter === 'All Posts') return true;
    if (activeFilter === 'Achievements') return post.type === 'achievement';
    if (activeFilter === 'Polls') return post.type === 'poll';
    if (activeFilter === 'Articles') return post.type === 'article';
    return true;
  });

  const handleLike = (postId) => {
    const newLikedPosts = new Set(likedPosts);
    if (newLikedPosts.has(postId)) {
      newLikedPosts.delete(postId);
    } else {
      newLikedPosts.add(postId);
    }
    setLikedPosts(newLikedPosts);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-lg">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <h1 className="text-2xl font-bold">Alumni Connect</h1>

            {/* Right Side */}
            <div className="flex items-center space-x-6">
              {/* Notifications */}
              <button className="relative hover:text-gray-300">
                <Bell size={22} />
                <span className="absolute -top-1 -right-1 bg-red-600 text-xs text-white px-1.5 rounded-full">
                  3
                </span>
              </button>

              {/* Messages */}
              <button className="relative hover:text-gray-300">
                <MessageCircle size={22} />
                <span className="absolute -top-1 -right-1 bg-red-600 text-xs text-white px-1.5 rounded-full">
                  5
                </span>
              </button>

              {/* Profile */}
              <div className="flex items-center space-x-3 cursor-pointer">
                <img 
                  src="https://i.pinimg.com/originals/3f/94/70/3f9470b34a8e3f526dbdb022f9f19cf7.jpg"
                  alt="Profile"
                  className="w-20 h-20 rounded-full border-2 border-white"
                />
                <span className="font-medium">James</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Layout */}
      <div className="container mx-auto px-6 py-6">
        <div className="flex space-x-6">
          <LeftSidebar
            filterItems={[
              { name: 'All Posts', icon: FileText },
              { name: 'Achievements', icon: Trophy },
              { name: 'Polls', icon: BarChart3 },
              { name: 'Articles', icon: BookOpen },
            ]}
            trendingTopics={[
              '#Achievement', '#Google', '#Promotion', '#TechCareer',
              '#Poll', '#WebDevelopment', '#Programming', '#CareerAdvice',
              '#Article', '#RemoteWork', '#Productivity', '#SoftwareTeams'
            ]}
            activeFilter={activeFilter}
            setActiveFilter={setActiveFilter}
          />

          <MainFeed
            filteredPosts={filteredPosts}
            likedPosts={likedPosts}
            handleLike={handleLike}
          />

          <RightSidebar
            upcomingEvents={[
              {
                title: "Alumni Networking Night",
                date: "Dec 15, 2024",
                details: "Join us for an evening of networking and reconnecting with fellow alumni."
              },
              {
                title: "Tech Talk: Future of AI",
                date: "Dec 20, 2024",
                details: "Industry experts discuss the latest AI trends and opportunities."
              }
            ]}
            communityStats={communityStats}
          />
        </div>
      </div>
    </div>
  );
}

export default Community;
