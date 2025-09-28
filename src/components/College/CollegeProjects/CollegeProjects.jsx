

import { useState } from "react"


const projectsData = [
  {
    id: 1,
    title: "Smart Campus Management System",
    owner: "Rajesh Kumar (Student)",
    ownerType: "student",
    department: "Computer Engineering",
    year: "2024",
    description:
      "A comprehensive web application for managing campus facilities, student records, and administrative tasks using modern web technologies.",
    status: "Ongoing",
    startDate: "2024-01-15",
    technologies: ["React", "Node.js", "MongoDB"],
    teamSize: 4,
  },
  {
    id: 2,
    title: "IoT-Based Water Quality Monitoring",
    owner: "Dr. Priya Sharma (Alumni)",
    ownerType: "alumni",
    department: "Electronics & Communication",
    year: "2023",
    description:
      "Real-time water quality monitoring system using IoT sensors and cloud-based data analytics for environmental protection.",
    status: "Completed",
    startDate: "2023-08-20",
    technologies: ["Arduino", "Python", "AWS"],
    teamSize: 3,
  },
  {
    id: 3,
    title: "Automated Traffic Signal Control",
    owner: "Amit Patel (Student)",
    ownerType: "student",
    department: "Electrical Engineering",
    year: "2024",
    description:
      "AI-powered traffic signal optimization system to reduce congestion and improve traffic flow in urban areas.",
    status: "Ongoing",
    startDate: "2024-02-10",
    technologies: ["Python", "OpenCV", "TensorFlow"],
    teamSize: 5,
  },
  {
    id: 4,
    title: "Sustainable Building Design Platform",
    owner: "Sneha Joshi (Alumni)",
    ownerType: "alumni",
    department: "Civil Engineering",
    year: "2023",
    description:
      "Web platform for architects and engineers to design energy-efficient and sustainable buildings with cost optimization.",
    status: "Completed",
    startDate: "2023-05-12",
    technologies: ["Vue.js", "Django", "PostgreSQL"],
    teamSize: 6,
  },
  {
    id: 5,
    title: "Robotic Arm for Manufacturing",
    owner: "Karan Singh (Student)",
    ownerType: "student",
    department: "Mechanical Engineering",
    year: "2024",
    description: "Precision robotic arm system for automated manufacturing processes with computer vision integration.",
    status: "Ongoing",
    startDate: "2024-03-05",
    technologies: ["ROS", "C++", "Computer Vision"],
    teamSize: 4,
  },
  {
    id: 6,
    title: "Blockchain-Based Voting System",
    owner: "Anita Desai (Student)",
    ownerType: "student",
    department: "Computer Engineering",
    year: "2023",
    description:
      "Secure and transparent digital voting platform using blockchain technology to ensure election integrity.",
    status: "Completed",
    startDate: "2023-09-18",
    technologies: ["Solidity", "Web3.js", "React"],
    teamSize: 3,
  },
  {
    id: 7,
    title: "Solar Panel Efficiency Optimizer",
    owner: "Vikram Mehta (Alumni)",
    ownerType: "alumni",
    department: "Electrical Engineering",
    year: "2024",
    description:
      "Machine learning system to optimize solar panel positioning and energy output based on weather conditions.",
    status: "Ongoing",
    startDate: "2024-01-28",
    technologies: ["Python", "Machine Learning", "IoT"],
    teamSize: 5,
  },
  {
    id: 8,
    title: "Smart Irrigation System",
    owner: "Ritu Agarwal (Student)",
    ownerType: "student",
    department: "Electronics & Communication",
    year: "2024",
    description:
      "Automated irrigation system using soil moisture sensors and weather data to optimize water usage in agriculture.",
    status: "Ongoing",
    startDate: "2024-02-22",
    technologies: ["Arduino", "Python", "Mobile App"],
    teamSize: 4,
  },
  {
    id: 9,
    title: "3D Printed Prosthetics Design",
    owner: "Arjun Reddy (Alumni)",
    ownerType: "alumni",
    department: "Mechanical Engineering",
    year: "2023",
    description:
      "Cost-effective 3D printed prosthetic limbs with customizable designs for improved accessibility and affordability.",
    status: "Completed",
    startDate: "2023-06-15",
    technologies: ["CAD", "3D Printing", "Biomechanics"],
    teamSize: 6,
  },
]

export default function ProjectsSection() {
  // Search and filter states
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedDepartment, setSelectedDepartment] = useState("All")
  const [selectedYear, setSelectedYear] = useState("All")
  const [selectedDate, setSelectedDate] = useState("")

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1)
  const projectsPerPage = 6

  const departments = [
    "All",
    "Computer Engineering",
    "Mechanical Engineering",
    "Civil Engineering",
    "Electrical Engineering",
    "Electronics & Communication",
  ]

  const years = ["All", "2020", "2021", "2022", "2023", "2024"]

  // Filter projects based on search and filters
  const filteredProjects = projectsData.filter((project) => {
    const matchesSearch =
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.owner.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesDepartment = selectedDepartment === "All" || project.department === selectedDepartment
    const matchesYear = selectedYear === "All" || project.year === selectedYear

    // Simple date matching - you can enhance this based on requirements
    const matchesDate = !selectedDate || project.startDate.includes(selectedDate.substring(0, 7))

    return matchesSearch && matchesDepartment && matchesYear && matchesDate
  })

  // Pagination calculations
  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage)
  const startIndex = (currentPage - 1) * projectsPerPage
  const currentProjects = filteredProjects.slice(startIndex, startIndex + projectsPerPage)

  // Reset to first page when filters change
  const handleFilterChange = () => {
    setCurrentPage(1)
  }

  const getStatusColor = (status) => {
    return status === "Ongoing"
      ? "bg-yellow-100 text-yellow-800 border-yellow-200"
      : "bg-green-100 text-green-800 border-green-200"
  }

  const getOwnerTypeColor = (ownerType) => {
    return ownerType === "student" ? "bg-blue-100 text-blue-800" : "bg-purple-100 text-purple-800"
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Projects</h1>
          <p className="text-gray-600 mt-1">Manage student and alumni projects</p>
        </div>
      </div>

      {/* Search and Filters Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="space-y-6">
          {/* Search Bar */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value)
                handleFilterChange()
              }}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
            />
            <svg
              className="absolute left-4 top-3.5 h-6 w-6 text-gray-400"
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

          {/* Filters Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Filtering on the basis of the Dept., Year and Date</h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Department Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
                <select
                  value={selectedDepartment}
                  onChange={(e) => {
                    setSelectedDepartment(e.target.value)
                    handleFilterChange()
                  }}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {departments.map((dept) => (
                    <option key={dept} value={dept}>
                      {dept}
                    </option>
                  ))}
                </select>
              </div>

              {/* Year Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Year</label>
                <select
                  value={selectedYear}
                  onChange={(e) => {
                    setSelectedYear(e.target.value)
                    handleFilterChange()
                  }}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {years.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>

              {/* Date Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => {
                    setSelectedDate(e.target.value)
                    handleFilterChange()
                  }}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 sm:justify-end">
            <button className="px-6 py-3 bg-blue-900 text-white rounded-lg font-medium hover:bg-blue-800 transition-colors">
              Host a new project
            </button>
            <button className="px-6 py-3 border border-blue-900 text-blue-900 rounded-lg font-medium hover:bg-blue-50 transition-colors">
              Manage Requests
            </button>
          </div>
        </div>
      </div>

      {/* Project Cards Section */}
      <div className="space-y-6">
        {/* Results Summary */}
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">Project Cards</h2>
          <span className="text-sm text-gray-600">
            {filteredProjects.length} project{filteredProjects.length !== 1 ? "s" : ""} found
          </span>
        </div>

        {/* Project Cards Grid */}
        {currentProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentProjects.map((project) => (
              <div
                key={project.id}
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
              >
                {/* Project Header */}
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">{project.title}</h3>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(project.status)}`}
                  >
                    {project.status}
                  </span>
                </div>

                {/* Owner Info */}
                <div className="flex items-center space-x-2 mb-3">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${getOwnerTypeColor(project.ownerType)}`}
                  >
                    {project.ownerType === "student" ? "Student" : "Alumni"}
                  </span>
                  <span className="text-sm text-gray-600">{project.owner}</span>
                </div>

                {/* Project Details */}
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Department:</span>
                    <span className="text-gray-900 font-medium">{project.department}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Year:</span>
                    <span className="text-gray-900 font-medium">{project.year}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Team Size:</span>
                    <span className="text-gray-900 font-medium">{project.teamSize} members</span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm text-gray-600 mb-4 line-clamp-3">{project.description}</p>

                {/* Technologies */}
                <div className="mb-4">
                  <div className="flex flex-wrap gap-1">
                    {project.technologies.slice(0, 3).map((tech, index) => (
                      <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md">
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md">
                        +{project.technologies.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                {/* View Details Button */}
                <button className="w-full bg-blue-900 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-blue-800 transition-colors">
                  View Details
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-gray-200">
            <p className="text-gray-500">No projects found matching your criteria.</p>
          </div>
        )}

        {/* Pagination */}
        {filteredProjects.length > projectsPerPage && (
          <div className="flex items-center justify-between bg-white rounded-xl shadow-sm border border-gray-200 px-6 py-4">
            <div className="text-sm text-gray-700">
              Showing {startIndex + 1} to {Math.min(startIndex + projectsPerPage, filteredProjects.length)} of{" "}
              {filteredProjects.length} projects
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>

              <div className="flex space-x-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-3 py-2 rounded-lg text-sm font-medium ${
                      currentPage === page ? "bg-blue-900 text-white" : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>

              <button
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}