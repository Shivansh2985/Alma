import React, { useState } from "react";

const studentData = [
  {
    id: 1,
    name: "Aarav Sharma",
    rollNo: "21CE001",
    department: "Computer Engineering",
    year: "3rd Year",
    email: "aarav.sharma@tit.edu",
    phone: "+91 12345 67890",
    gpa: 9.2,
    profilePhoto: null,
  },
  {
    id: 2,
    name: "Diya Patel",
    rollNo: "21ME015",
    department: "Mechanical Engineering",
    year: "3rd Year",
    email: "diya.patel@tit.edu",
    phone: "+91 12345 67890",
    gpa: 8.8,
    profilePhoto: null,
  },
  {
    id: 3,
    name: "Arjun Singh",
    rollNo: "22CE032",
    department: "Computer Engineering",
    year: "2nd Year",
    email: "arjun.singh@tit.edu",
    phone: "+91 12345 67890",
    gpa: 9.5,
    profilePhoto: null,
  },
  {
    id: 4,
    name: "Kavya Reddy",
    rollNo: "20EE008",
    department: "Electrical Engineering",
    year: "4th Year",
    email: "kavya.reddy@tit.edu",
    phone: "+91 12345 67890",
    gpa: 9.1,
    profilePhoto: null,
  },
  {
    id: 5,
    name: "Rohit Kumar",
    rollNo: "21CE045",
    department: "Civil Engineering",
    year: "3rd Year",
    email: "rohit.kumar@tit.edu",
    phone: "+91 12345 67890",
    gpa: 8.6,
    profilePhoto: null,
  },
  {
    id: 6,
    name: "Ananya Joshi",
    rollNo: "22EC019",
    department: "Electronics & Communication",
    year: "2nd Year",
    email: "ananya.joshi@tit.edu",
    phone: "+91 12345 67890",
    gpa: 9.3,
    profilePhoto: null,
  },
  {
    id: 7,
    name: "Vikash Gupta",
    rollNo: "20ME027",
    department: "Mechanical Engineering",
    year: "4th Year",
    email: "vikash.gupta@tit.edu",
    phone: "+91 12345 67890",
    gpa: 8.9,
    profilePhoto: null,
  },
  {
    id: 8,
    name: "Priya Agarwal",
    rollNo: "21EE033",
    department: "Electrical Engineering",
    year: "3rd Year",
    email: "priya.agarwal@tit.edu",
    phone: "+91 12345 67890",
    gpa: 9.0,
    profilePhoto: null,
  },
  {
    id: 9,
    name: "Karan Mehta",
    rollNo: "22CE051",
    department: "Computer Engineering",
    year: "2nd Year",
    email: "karan.mehta@tit.edu",
    phone: "+91 12345 67890",
    gpa: 8.7,
    profilePhoto: null,
  },
  {
    id: 10,
    name: "Sneha Desai",
    rollNo: "20EC012",
    department: "Electronics & Communication",
    year: "4th Year",
    email: "sneha.desai@tit.edu",
    phone: "+91 12345 67890",
    gpa: 9.4,
    profilePhoto: null,
  },
];

const ITEMS_PER_PAGE = 7;


const StudentDirectory = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("All");
  const [selectedYear, setSelectedYear] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  const departments = [
    "All",
    "Computer Engineering",
    "Mechanical Engineering",
    "Civil Engineering",
    "Electrical Engineering",
    "Electronics & Communication",
  ];
  const years = ["All", "1st Year", "2nd Year", "3rd Year", "4th Year"];

  const filteredStudents = studentData.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.rollNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = selectedDepartment === "All" || student.department === selectedDepartment;
    const matchesYear = selectedYear === "All" || student.year === selectedYear;
    return matchesSearch && matchesDepartment && matchesYear;
  });

  const totalPages = Math.ceil(filteredStudents.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedStudents = filteredStudents.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      {/* Search and Filters */}
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex flex-col space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search students by name, roll number, or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
            />
            <svg
              className="absolute left-3 top-3.5 h-5 w-5 text-gray-400"
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
          {/* Quick Filters */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Quick Filters</h3>
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">By Department:</span>
                <select
                  value={selectedDepartment}
                  onChange={(e) => setSelectedDepartment(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {departments.map((dept) => (
                    <option key={dept} value={dept}>
                      {dept}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">By Year:</span>
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
        </div>
      </div>
      {/* Student Directory Table */}
      <div className="px-6 py-4">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Student Directory / List</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Profile</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Name</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Roll No.</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Department</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Year</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">GPA</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Contact</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedStudents.map((student) => (
                <tr key={student.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-4">
                    <div className="w-10 h-10 bg-blue-900 rounded-full flex items-center justify-center">
                      <span className="text-white font-semibold text-sm">
                        {student.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="font-medium text-gray-900">{student.name}</div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="text-gray-600">{student.rollNo}</div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="text-gray-600">{student.department}</div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="text-gray-600">{student.year}</div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="font-semibold text-blue-900">{student.gpa}</div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="text-sm text-gray-600">
                      <div>{student.email}</div>
                      <div>{student.phone}</div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex space-x-2">
                      <button className="px-3 py-1 bg-blue-900 text-white text-sm rounded hover:bg-blue-800">
                        View
                      </button>
                      <button className="px-3 py-1 border border-blue-900 text-blue-900 text-sm rounded hover:bg-blue-50">
                        Edit
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Pagination */}
        <div className="flex items-center justify-between mt-6">
          <div className="text-sm text-gray-600">
            Showing {startIndex + 1} to {Math.min(startIndex + ITEMS_PER_PAGE, filteredStudents.length)} of {filteredStudents.length} students
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="px-3 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-3 py-2 rounded-lg ${currentPage === page ? "bg-blue-900 text-white" : "border border-gray-300 hover:bg-gray-50"}`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="px-3 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDirectory;
