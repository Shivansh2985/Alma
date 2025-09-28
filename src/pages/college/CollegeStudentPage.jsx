
import React from "react";
import Sidebar from '../../components/College/CollegeDashboard/charts/Sidebar';
import StudentDirectory from '../../components/College/CollegeStudent/StudentDirectory';
import TopPerformers from '../../components/College/CollegeStudent/TopPerformers';
import StudentDemographics from '../../components/College/CollegeStudent/StudentDemographics';
import StudentAchievements from '../../components/College/CollegeStudent/StudentAchievements';

const CollegeStudentPage = () => (
	<div className="min-h-screen bg-gray-100 flex">
		<Sidebar />
		<div className="flex-1 max-w-7xl mx-auto px-4 py-8 space-y-8">
			{/* Header */}
			<div className="flex items-center justify-between">
				<div>
					<h1 className="text-3xl font-bold text-gray-900">Students</h1>
					<p className="text-gray-600 mt-1">Manage and track student information</p>
				</div>
				<div className="flex items-center space-x-3">
					<button className="px-4 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition-colors">
						Add Student
					</button>
					<button className="p-2 text-gray-400 hover:text-gray-600">
						<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5-5-5h5v-12h5v12z" />
						</svg>
					</button>
				</div>
			</div>

			{/* Student Directory */}
			<StudentDirectory />

			{/* Bottom Section with Three Components */}
			<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
				<TopPerformers />
				<StudentDemographics />
				<StudentAchievements />
			</div>
		</div>
	</div>
);

export default CollegeStudentPage;
