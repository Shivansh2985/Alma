import React from "react";


const topPerformers = [
  {
    id: 1,
    name: "Aditya Rao",
    rollNo: "20CE089",
    department: "Computer Engineering",
    gpa: 9.6,
    achievements: ["Dean's List", "Research Excellence"],
  },
  {
    id: 2,
    name: "Arjun Singh",
    rollNo: "22CE032",
    department: "Computer Engineering",
    gpa: 9.5,
    achievements: ["Academic Excellence", "Innovation Award"],
  },
  {
    id: 3,
    name: "Sneha Desai",
    rollNo: "20EC012",
    department: "Electronics & Communication",
    gpa: 9.4,
    achievements: ["Outstanding Student", "Project Excellence"],
  },
  {
    id: 4,
    name: "Ananya Joshi",
    rollNo: "22EC019",
    department: "Electronics & Communication",
    gpa: 9.3,
    achievements: ["Merit Scholar", "Leadership Award"],
  },
  {
    id: 5,
    name: "Aarav Sharma",
    rollNo: "21CE001",
    department: "Computer Engineering",
    gpa: 9.2,
    achievements: ["Academic Honor", "Tech Innovation"],
  },
];

const TopPerformers = () => (
  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
    <div className="flex items-center justify-between mb-6">
      <h2 className="text-xl font-semibold text-gray-900">Top Performers</h2>
      <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
        <svg className="w-5 h-5 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      </div>
    </div>
    <div className="space-y-4">
      {topPerformers.map((student, index) => (
        <div key={student.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
          {/* <div className="flex items-center justify-center w-8 h-8 bg-blue-900 text-white rounded-full font-bold text-sm">
            {index + 1}
          </div> */}
          <div className="w-10 h-10 bg-blue-900 rounded-full flex items-center justify-center">
            <span className="text-white font-semibold text-sm">
              {student.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </span>
          </div>
          <div className="flex-1">
            <div className="font-semibold text-gray-900">{student.name}</div>
            <div className="text-sm text-gray-600">
              {student.rollNo} • {student.department}
            </div>
            <div className="flex items-center space-x-2 mt-1">
              <span className="text-sm font-medium text-blue-900">GPA: {student.gpa}</span>
              <div className="flex space-x-1">
                {student.achievements.slice(0, 2).map((achievement, idx) => (
                  <span key={idx} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                    {achievement}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
    <div className="mt-6 pt-4 border-t border-gray-200">
      <button className="w-full text-blue-900 font-medium hover:text-blue-800 transition-colors">
        View All Top Performers →
      </button>
    </div>
  </div>
);

export default TopPerformers;
