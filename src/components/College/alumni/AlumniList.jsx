import React, { useState } from "react";

const alumniData = [
  {
    id: 1,
    name: "Rajesh Kumar",
    graduationYear: 2020,
    department: "Computer Engineering",
    currentPosition: "Software Engineer",
    company: "Google India",
    location: "Bangalore, India",
    email: "rajesh.kumar@email.com",
    phone: "+91 98765 43210",
  },
  {
    id: 2,
    name: "Priya Sharma",
    graduationYear: 2019,
    department: "Electronics & Communication",
    currentPosition: "Product Manager",
    company: "Microsoft",
    location: "Hyderabad, India",
    email: "priya.sharma@email.com",
    phone: "+91 98765 43211",
  },
  {
    id: 3,
    name: "Amit Patel",
    graduationYear: 2021,
    department: "Mechanical Engineering",
    currentPosition: "Design Engineer",
    company: "Tata Motors",
    location: "Pune, India",
    email: "amit.patel@email.com",
    phone: "+91 98765 43212",
  },
  {
    id: 4,
    name: "Sneha Joshi",
    graduationYear: 2018,
    department: "Civil Engineering",
    currentPosition: "Project Manager",
    company: "L&T Construction",
    location: "Mumbai, India",
    email: "sneha.joshi@email.com",
    phone: "+91 98765 43213",
  },
  {
    id: 5,
    name: "Karan Singh",
    graduationYear: 2022,
    department: "Electrical Engineering",
    currentPosition: "Power Systems Engineer",
    company: "NTPC Limited",
    location: "Delhi, India",
    email: "karan.singh@email.com",
    phone: "+91 98765 43214",
  },
  {
    id: 6,
    name: "Anita Desai",
    graduationYear: 2020,
    department: "Computer Engineering",
    currentPosition: "Data Scientist",
    company: "Amazon",
    location: "Bangalore, India",
    email: "anita.desai@email.com",
    phone: "+91 98765 43215",
  },
  {
    id: 7,
    name: "Vikram Mehta",
    graduationYear: 2019,
    department: "Mechanical Engineering",
    currentPosition: "Entrepreneur",
    company: "TechStart Solutions",
    location: "Ahmedabad, India",
    email: "vikram.mehta@email.com",
    phone: "+91 98765 43216",
  },
  {
    id: 8,
    name: "Ritu Agarwal",
    graduationYear: 2021,
    department: "Electronics & Communication",
    currentPosition: "Research Scientist",
    company: "ISRO",
    location: "Bangalore, India",
    email: "ritu.agarwal@email.com",
    phone: "+91 98765 43217",
  },
];

const AlumniList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("All");
  const [selectedYear, setSelectedYear] = useState("All");

  const departments = [
    "All",
    "Computer Engineering",
    "Mechanical Engineering",
    "Civil Engineering",
    "Electrical Engineering",
    "Electronics & Communication",
  ];
  const years = ["All", "2018", "2019", "2020", "2021", "2022", "2023", "2024"];

  const filteredAlumni = alumniData.filter((alumni) => {
    const matchesSearch =
      alumni.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alumni.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alumni.currentPosition.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = selectedDepartment === "All" || alumni.department === selectedDepartment;
    const matchesYear = selectedYear === "All" || alumni.graduationYear.toString() === selectedYear;
    return matchesSearch && matchesDepartment && matchesYear;
  });

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <h2 className="text-xl font-semibold text-gray-900">Alumni Directory</h2>
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
            {/* Search */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search alumni..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <svg
                className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            {/* Department Filter */}
            <select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {departments.map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
            {/* Year Filter */}
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      {/* Alumni Cards */}
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAlumni.map((alumni) => (
            <div key={alumni.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-blue-900 rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold text-lg">
                      {alumni.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{alumni.name}</h3>
                    <p className="text-sm text-gray-500">Class of {alumni.graduationYear}</p>
                  </div>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <div>
                  <span className="font-medium text-gray-700">Department:</span>
                  <span className="ml-2 text-gray-600">{alumni.department}</span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Position:</span>
                  <span className="ml-2 text-gray-600">{alumni.currentPosition}</span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Company:</span>
                  <span className="ml-2 text-gray-600">{alumni.company}</span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Location:</span>
                  <span className="ml-2 text-gray-600">{alumni.location}</span>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-100 flex space-x-3">
                <button className="flex-1 bg-blue-900 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-blue-800 transition-colors">
                  Contact
                </button>
                <button className="flex-1 border border-blue-900 text-blue-900 py-2 px-4 rounded-lg text-sm font-medium hover:bg-blue-50 transition-colors">
                  View Profile
                </button>
              </div>
            </div>
          ))}
        </div>
        {filteredAlumni.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No alumni found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AlumniList;
