import { Card, CardContent, CardHeader, CardTitle } from "../../../ui/card";
import AlumniGrowthChart from "./AlumniGrowthChart";
import StudentPlacementChart from "./StudentPlacementChart";
import ResearchFundingChart from "./ResearchFundingChart";

export default function ChartsSection() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
      <Card className="border-gray-200 p-2">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg font-semibold text-white">Alumni Growth</CardTitle>
        </CardHeader>
        <CardContent className="pt-2 pb-6">
          <AlumniGrowthChart />
        </CardContent>
      </Card>

      <Card className="border-gray-200 p-2">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg font-semibold text-white">Student Placement</CardTitle>
        </CardHeader>
        <CardContent className="pt-2 pb-6">
          <StudentPlacementChart />
        </CardContent>
      </Card>

      <Card className="border-gray-200 p-2">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg font-semibold text-white">Research Funding</CardTitle>
        </CardHeader>
        <CardContent className="pt-2 pb-6">
          <ResearchFundingChart />
        </CardContent>
      </Card>
    </div>
  );
}
