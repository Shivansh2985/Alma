import { Bell, Mail, Settings, Users, GraduationCap, Building, Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";

const stats = [
  {
    title: "Enrolled Students",
    value: "1000",
    icon: Users,
    change: "+12%",
    changeType: "positive",
  },
  {
    title: "Alumni",
    value: "509",
    icon: GraduationCap,
    change: "+8%",
    changeType: "positive",
  },
  {
    title: "Tied Up Companies",
    value: "32",
    icon: Building,
    change: "+23%",
    changeType: "positive",
  },
  {
    title: "Upcoming Events",
    value: "12",
    icon: Calendar,
    change: "+3",
    changeType: "neutral",
  },
];

export function Header() {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <h2 className="text-xl font-semibold text-gray-600">Dashboard</h2>
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-sm text-gray-600">Welcome back, Admin</div>
        </div>
      </div>
    </header>
  );
}

export function InstituteOverview() {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        
        
      </div>
     
      <div className="flex items-start space-x-8">
        {/* College Logo */}
        <div className="flex-shrink-0">
          <div className="w-32 h-32 rounded-full flex items-center justify-center">
            <img src="https://www.sikshapedia.com/public/data/colleges/technocrats-institute-of-technology-bhopal-madhya-pradesh/technocrats-institute-of-technology-bhopal-madhya-pradesh-logo.webp" alt="TIT" />
          </div>
        </div>
        {/* College Details */}
        <div className="flex-1">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Technocrats Institute Of Technology , Bhopal </h3>
          <div className="space-y-2 mb-4">
            <p className="text-gray-600">
              <span className="font-semibold">Established:</span> 1999
            </p>
            <p className="text-gray-600">
              <span className="font-semibold">Location:</span> Bhopal , Madhya Pradesh , India
            </p>
            <p className="text-gray-600">
              <span className="font-semibold">Website:</span>{" "}
              <a
                href="https://technocratsgroup.edu.in/"
                target="_blank"
                // rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 underline"
              >
                https://technocratsgroup.edu.in/
              </a>
            </p>
          </div>
          <p className="text-gray-700 leading-relaxed">
            Technocrats Institute of Technology (TIT), Bhopal, established in 1999, is one of Central India’s leading institutes under RGPV. It offers quality education in engineering, management, pharmacy, and computer applications with modern infrastructure, active research, and strong industry connect.
          </p>
        </div>
      </div>
    </div>
  );
}

export function StatsCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <Card key={index} className="border-gray-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white">{stat.title}</CardTitle>
            <stat.icon className="h-4 w-4 text-blue-900" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-900">{stat.value}</div>
            <p
              className={`text-xs ${
                stat.changeType === "positive"
                  ? "text-green-600"
                  : stat.changeType === "negative"
                    ? "text-red-600"
                    : "text-gray-600"
              }`}
            >
              {stat.change} from last month
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
