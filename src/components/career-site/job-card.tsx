"use client"

import { MapPin, Briefcase, Clock, DollarSign, Users } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { Job } from "@/types/job"

interface JobCardProps {
  job: Job
  onJobClick: (job: Job) => void
  onApplyClick: (job: Job) => void
}

export function JobCard({ job, onJobClick, onApplyClick }: JobCardProps) {
  return (
    <Card
      className="hover:shadow-lg transition-all duration-200 cursor-pointer group border-l-4 border-l-purple-500"
      onClick={() => onJobClick(job)}
    >
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <CardTitle className="text-xl group-hover:text-purple-600 transition-colors mb-2">{job.title}</CardTitle>
            <div className="flex flex-wrap gap-2 mb-3">
              <Badge variant="outline" className="bg-gray-100 text-gray-700 border-0 flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                {job.location}
              </Badge>
              <Badge variant="outline" className="bg-gray-100 text-gray-700 border-0 flex items-center gap-1">
                <Briefcase className="h-3 w-3" />
                {job.experience}
              </Badge>
              <Badge variant="outline" className="bg-gray-100 text-gray-700 border-0 flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {job.jobType}
              </Badge>
              {job.isRemote && <Badge className="bg-blue-100 text-blue-700 border-0">Remote Friendly</Badge>}
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <p className="text-gray-600 mb-4 line-clamp-2">{job.description}</p>

        {job.skills && job.skills.length > 0 && (
          <div className="mb-4">
            <div className="flex flex-wrap gap-1">
              {job.skills.slice(0, 4).map((skill) => (
                <Badge key={skill} variant="outline" className="bg-purple-50 text-purple-700 text-xs">
                  {skill}
                </Badge>
              ))}
              {job.skills.length > 4 && (
                <Badge variant="outline" className="bg-gray-50 text-gray-700 text-xs">
                  +{job.skills.length - 4} more
                </Badge>
              )}
            </div>
          </div>
        )}

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 text-sm text-gray-600">
            {job.salary && (
              <div className="flex items-center gap-1">
                <DollarSign className="h-4 w-4" />
                <span>{job.salary}</span>
              </div>
            )}
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              <span>{job.applications} applicants</span>
            </div>
          </div>
          <Button
            className="bg-purple-500 hover:bg-purple-600"
            onClick={(e) => {
              e.stopPropagation()
              onApplyClick(job)
            }}
          >
            Apply Now
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
