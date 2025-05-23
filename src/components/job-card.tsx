import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, MapPin, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Job } from "@/types/job";

export function JobCard({
  title = "Sr. UX Designer",
  postedDays = 2,
  location = "Bengaluru",
  experience = "3 years exp.",
  applications = 45,
  recentApplications = 25,
  className,
}: Job) {
  return (
    <Card
      className={cn(
        "w-full max-w-sm border border-gray-100 relative overflow-hidden",
        "bg-gradient-to-br from-white to-gray-50",
        "transition-all duration-300 ease-in-out",
        "hover:shadow-lg hover:scale-[1.02] hover:border-purple-100",
        "hover:bg-gradient-to-br hover:from-white hover:to-purple-50",
        className
      )}
    >
      {/* Left accent line */}
      <div className="absolute left-0 top-0 w-1.5 h-full bg-gradient-to-b from-teal-400 to-blue-500" />

      <CardContent className="p-5">
        <div className="flex justify-between items-start mb-1">
          <div className="flex items-start gap-3">
            {/* Colorful job icon */}
            <div className="mt-1">
              <div className="flex flex-wrap w-6 h-6 rounded-md overflow-hidden shadow-sm">
                <div className="w-3 h-3 bg-red-400" />
                <div className="w-3 h-3 bg-blue-400" />
                <div className="w-3 h-3 bg-green-400" />
                <div className="w-3 h-3 bg-purple-400" />
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-lg text-gray-900">{title}</h3>
              <p className="text-sm text-gray-500">
                Posted {postedDays} days ago
              </p>
            </div>
          </div>

          <Button
            size="icon"
            variant="ghost"
            className="rounded-full h-8 w-8 bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors"
          >
            <ExternalLink className="h-4 w-4" />
            <span className="sr-only">Open job details</span>
          </Button>
        </div>

        <div className="flex gap-2 mt-4 mb-5">
          <Badge
            variant="outline"
            className="bg-gray-100 hover:bg-gray-200 text-gray-700 border-0 rounded-full px-3 py-1 flex items-center gap-1 transition-colors"
          >
            <MapPin className="h-3.5 w-3.5" />
            {location}
          </Badge>

          <Badge
            variant="outline"
            className="bg-gray-100 hover:bg-gray-200 text-gray-700 border-0 rounded-full px-3 py-1 flex items-center gap-1 transition-colors"
          >
            <Briefcase className="h-3.5 w-3.5" />
            {experience}
          </Badge>
        </div>

        <div className="flex items-end justify-between">
          <div>
            <span className="text-4xl font-bold text-gray-900">
              {applications}
            </span>
            <p className="text-sm text-gray-500">applications</p>
          </div>

          <p className="text-sm text-emerald-600 font-medium">
            {recentApplications} in last week
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
