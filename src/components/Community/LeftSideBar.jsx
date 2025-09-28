import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";

const LeftSidebar = ({ filterItems, trendingTopics, activeFilter, setActiveFilter }) => (
  <aside className="space-y-6 w-64">
    {/* Filters */}
    <Card className="shadow-lg border border-blue-200 overflow-hidden">
      <CardHeader className="pb-3 bg-blue-900 text-white">
        <CardTitle className="text-lg font-semibold">Filters</CardTitle>
      </CardHeader>
      <CardContent className="space-y-1 p-4 bg-white">
        {filterItems.map((item) => (
          <Button
            key={item.name}
            variant={activeFilter === item.name ? "default" : "ghost"}
            className={`w-full justify-start text-sm transition-all duration-200 ${
              activeFilter === item.name
                ? "bg-blue-900 text-white hover:bg-blue-800 shadow-md"
                : "text-blue-900 hover:text-white hover:bg-blue-700 border border-transparent hover:border-blue-700"
            }`}
            size="sm"
            onClick={() => setActiveFilter(item.name)}
          >
            <item.icon className="mr-3 h-4 w-4" />
            {item.name}
          </Button>
        ))}
      </CardContent>
    </Card>

    {/* Trending Topics */}
    <Card className="shadow-lg border border-blue-200 overflow-hidden">
      <CardHeader className="pb-3 bg-blue-900 text-white">
        <CardTitle className="text-lg font-semibold">Trending Topics</CardTitle>
      </CardHeader>
      <CardContent className="p-4 bg-white">
        <div className="flex flex-wrap gap-2">
          {trendingTopics.map((topic) => (
            <Badge
              key={topic}
              variant="outline"
              className="border-blue-300 text-blue-700 hover:bg-blue-100 hover:border-blue-500 cursor-pointer transition-all duration-200 px-3 py-1"
            >
              {topic}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>

    {/* Featured Alumni Section */}
    <Card className="shadow-lg border border-blue-200 overflow-hidden">
      <CardHeader className="pb-3 bg-blue-900 text-white">
        <CardTitle className="text-lg font-semibold">Featured Alumni</CardTitle>
      </CardHeader>
      <CardContent className="p-4 bg-white">
        <div className="space-y-3">
          {/* Multiple Featured Alumni */}
          <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg border border-blue-100 hover:bg-blue-100 transition-colors duration-200 cursor-pointer">
            <img
              src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=50&h=50&fit=crop&crop=face"
              alt="Featured Alumni"
              className="w-12 h-12 rounded-full border-2 border-blue-200"
            />
            <div>
              <p className="font-medium text-blue-900">Alex Thompson</p>
              <p className="text-sm text-blue-700">CEO at TechCorp</p>
            </div>
          </div>
          
          
          
          {/* View More Button */}
          <Button 
            variant="outline" 
            className="w-full mt-3 border-blue-300 text-blue-700 hover:bg-blue-50 hover:border-blue-500"
            size="sm"
          >
            View More Alumni
          </Button>
        </div>
      </CardContent>
    </Card>
  </aside>
);

export default LeftSidebar;