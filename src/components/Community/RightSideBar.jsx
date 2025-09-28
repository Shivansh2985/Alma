
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Calendar } from "lucide-react";

const RightSidebar = ({ upcomingEvents, communityStats }) => (
  <aside className="space-y-6 w-80">
    {/* Upcoming Events */}
    <Card className="border border-blue-200 shadow-lg">
      <CardHeader className="pb-3 bg-blue-900 text-white rounded-t-lg">
        <CardTitle className="text-lg font-semibold">Upcoming Events</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 p-4">
        {upcomingEvents.map((event, index) => (
          <div key={index} className="p-4 rounded-lg bg-blue-50 border border-blue-200">
            <h4 className="font-medium text-blue-900 mb-2">{event.title}</h4>
            <div className="flex items-center text-sm text-gray-600 mb-2">
              <Calendar className="h-4 w-4 mr-2" />
              {event.date}
            </div>
            <p className="text-sm text-gray-600">{event.details}</p>
          </div>
        ))}
      </CardContent>
    </Card>

    {/* Community Stats */}
    <Card className="border border-blue-200 shadow-lg">
      <CardHeader className="pb-3 bg-blue-900 text-white rounded-t-lg">
        <CardTitle className="text-lg font-semibold">Community Stats</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 p-4">
        {communityStats.map((stat, index) => (
          <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-blue-50">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-full bg-blue-100">
                <stat.icon className="h-4 w-4 text-blue-900" />
              </div>
              <div>
                <p className="text-sm text-gray-600">{stat.label}</p>
                {stat.subtitle && (
                  <p className="text-xs text-gray-500">{stat.subtitle}</p>
                )}
              </div>
            </div>
            <div className="text-right">
              <p className="font-semibold text-blue-900">{stat.value}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  </aside>
);

export default RightSidebar;