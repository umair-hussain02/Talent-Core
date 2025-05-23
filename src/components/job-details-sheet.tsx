import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  MapPin,
  Briefcase,
  Calendar,
  DollarSign,
  Clock,
  X,
  ChevronRight,
} from "lucide-react";
import type { Job } from "@/types/job";

interface JobDetailsProps {
  isOpen: boolean;
  onClose: () => void;
  job: Job | null;
}

export function JobDetailsSheet({ isOpen, onClose, job }: JobDetailsProps) {
  if (!job) return null;

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <SheetContent className="sm:max-w-md overflow-y-auto p-4">
        <SheetHeader className="border-b pb-4">
          <div className="flex justify-between items-center">
            <SheetTitle>Job Details</SheetTitle>
            <SheetClose className="rounded-full h-6 w-6 flex items-center justify-center">
              <X className="h-4 w-4" />
            </SheetClose>
          </div>
        </SheetHeader>

        <div className="py-6">
          <div className="flex items-start gap-4 mb-6">
            <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-purple-100 to-blue-100 flex items-center justify-center">
              <span className="text-lg font-bold text-purple-600">
                {job?.company?.charAt(0)}
              </span>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900">
                {job.title}
              </h3>
              <p className="text-gray-600">{job.company}</p>
              <div className="flex flex-wrap gap-2 mt-2">
                <Badge
                  variant="outline"
                  className="bg-gray-100 text-gray-700 border-0 flex items-center gap-1"
                >
                  <MapPin className="h-3 w-3" />
                  {job.location}
                </Badge>
                <Badge
                  variant="outline"
                  className="bg-gray-100 text-gray-700 border-0 flex items-center gap-1"
                >
                  <Briefcase className="h-3 w-3" />
                  {job.experience}
                </Badge>
                <Badge
                  variant="outline"
                  className="bg-gray-100 text-gray-700 border-0 flex items-center gap-1"
                >
                  <Calendar className="h-3 w-3" />
                  Posted {job.postedDays} days ago
                </Badge>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-6">
            {job.salary && (
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="flex items-center gap-2 text-gray-600 mb-1">
                  <DollarSign className="h-4 w-4" />
                  <span className="text-xs font-medium">SALARY</span>
                </div>
                <p className="text-sm font-medium text-gray-900">
                  {job.salary}
                </p>
              </div>
            )}
            {job.jobType && (
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="flex items-center gap-2 text-gray-600 mb-1">
                  <Clock className="h-4 w-4" />
                  <span className="text-xs font-medium">JOB TYPE</span>
                </div>
                <p className="text-sm font-medium text-gray-900">
                  {job.jobType}
                </p>
              </div>
            )}
          </div>

          <div className="mb-6">
            <h4 className="text-lg font-semibold text-gray-900 mb-2">
              Job Description
            </h4>
            <p className="text-gray-700 text-sm">{job.description}</p>
          </div>

          {job.requirements && job.requirements.length > 0 && (
            <div className="mb-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-2">
                Requirements
              </h4>
              <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
                {job.requirements.map((req, index) => (
                  <li key={index}>{req}</li>
                ))}
              </ul>
            </div>
          )}

          {job.responsibilities && job.responsibilities.length > 0 && (
            <div className="mb-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-2">
                Responsibilities
              </h4>
              <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
                {job.responsibilities.map((resp, index) => (
                  <li key={index}>{resp}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="flex items-center justify-between py-3 px-4 bg-gray-50 rounded-lg mb-6">
            <div>
              <p className="text-sm font-medium text-gray-900">
                Total Applications
              </p>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-gray-900">
                  {job.applications}
                </span>
                <span className="text-xs text-emerald-600">
                  +{job.recentApplications} this week
                </span>
              </div>
            </div>
          </div>

          <div className="mt-auto">
            <Button className="w-full bg-gradient-to-r from-purple-500 to-orange-400 hover:from-purple-600 hover:to-orange-500">
              <span>Edit Job</span>
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
