import React from "react";

const achievements = [
  { id: 1, title: "National Coding Championship Winner", description: "Our Computer Engineering student Aditya Rao won 1st place in the National Coding Championship 2024", date: "March 2024", category: "Competition", student: "Aditya Rao", department: "Computer Engineering" },
  { id: 2, title: "International Robotics Competition", description: "Team of 4 students from Mechanical Engineering participated in the International Robotics Competition and secured 3rd position", date: "February 2024", category: "Competition", student: "Team of 4", department: "Mechanical Engineering" },
  { id: 3, title: "Research Paper Published", description: "Sneha Desai published her research paper on 'Advanced Signal Processing' in IEEE International Conference", date: "January 2024", category: "Research", student: "Sneha Desai", department: "Electronics & Communication" },
  { id: 4, title: "Smart City Hackathon Winner", description: "Our students won the Smart City Hackathon organized by Gujarat Government with their innovative IoT solution", date: "December 2023", category: "Hackathon", student: "Mixed Team", department: "Multiple Departments" },
  { id: 5, title: "Best Project Award", description: "Civil Engineering final year project on 'Sustainable Construction Materials' won the Best Project Award at State Level", date: "November 2023", category: "Project", student: "Rohit Kumar", department: "Civil Engineering" },
  { id: 6, title: "International Conference Presentation", description: "Ananya Joshi presented her work on 'Machine Learning in Healthcare' at International Conference in Singapore", date: "October 2023", category: "Conference", student: "Ananya Joshi", department: "Electronics & Communication" },
];

const categoryColors = {
  Competition: "bg-yellow-100 text-yellow-800",
  Research: "bg-green-100 text-green-800",
  Hackathon: "bg-purple-100 text-purple-800",
  Project: "bg-blue-100 text-blue-800",
  Conference: "bg-indigo-100 text-indigo-800",
};

const StudentAchievements = () => (
  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
    <div className="flex items-center justify-between mb-6">
      <h2 className="text-xl font-semibold text-gray-900">Student Achievements</h2>
      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
        <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
      </div>
    </div>
    <div className="space-y-4 max-h-96 overflow-y-auto">
      {achievements.map((achievement) => (
        <div key={achievement.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between mb-2">
            <h3 className="font-semibold text-gray-900 text-sm leading-tight">{achievement.title}</h3>
            <span className={`px-2 py-1 text-xs rounded-full ${categoryColors[achievement.category]}`}>
              {achievement.category}
            </span>
          </div>
          <p className="text-sm text-gray-600 mb-3 leading-relaxed">{achievement.description}</p>
          <div className="flex items-center justify-between text-xs text-gray-500">
            <div className="flex items-center space-x-4">
              <span className="font-medium">{achievement.student}</span>
              <span>{achievement.department}</span>
            </div>
            <span>{achievement.date}</span>
          </div>
        </div>
      ))}
    </div>
    <div className="mt-6 pt-4 border-t border-gray-200">
      <button className="w-full text-blue-900 font-medium hover:text-blue-800 transition-colors">
        View All Achievements →
      </button>
    </div>
  </div>
);

export default StudentAchievements;
