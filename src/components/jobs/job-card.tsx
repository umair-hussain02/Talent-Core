"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Briefcase, Calendar, DollarSign, Users } from "lucide-react"
import type { Job } from "@/types/job"
import { JobActions } from "@/components/jobs/job-actions"
import { JobStatusBadge } from "@/components/jobs/job-status-badge"
import { formatSalary } from "@/lib/job-utils"

interface JobCardProps {
  job: Job
  onClick: (job: Job) => void
}

export function JobCard({ job, onClick }: JobCardProps) {
  return (
    <Card className="hover:shadow-md transition-all duration-200 cursor-pointer group h-full">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div className="flex items-start gap-3">
            <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-purple-100 to-blue-100 flex items-center justify-center">
              <span className="text-lg font-bold text-purple-600" aria-hidden="true">
                {job.company.charAt(0)}
              </span>
            </div>
            <div className="flex-1">
              <CardTitle className="text-lg group-hover:text-purple-600 transition-colors">{job.title}</CardTitle>
              <p className="text-gray-600 text-sm">{job.company}</p>
              <div className="flex flex-wrap gap-2 mt-2">
                <Badge variant="outline" className="bg-gray-100 text-gray-700 border-0 flex items-center gap-1">
                  <MapPin className="h-3 w-3" aria-hidden="true" />
                  <span>{job.location}</span>
                </Badge>
                <Badge variant="outline" className="bg-gray-100 text-gray-700 border-0 flex items-center gap-1">
                  <Briefcase className="h-3 w-3" aria-hidden="true" />
                  <span>{job.experience}</span>
                </Badge>
                <JobStatusBadge status={job.isFeatured ? "active" : "draft"} />
              </div>
            </div>
          </div>
          <JobActions job={job} onView={() => onClick(job)} />
        </div>
      </CardHeader>
      <CardContent className="pt-0" onClick={() => onClick(job)}>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{job.description}</p>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex items-center gap-2">
            <DollarSign className="h-4 w-4 text-gray-500" aria-hidden="true" />
            <span className="text-sm text-gray-700">{formatSalary(job.salary)}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-gray-500" aria-hidden="true" />
            <span className="text-sm text-gray-700">Posted {job.postedDays} days ago</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-gray-500" aria-hidden="true" />
            <span className="text-sm text-gray-700">{job.applications} applications</span>
            <span className="text-xs text-emerald-600">+{job.recentApplications} this week</span>
          </div>
          {job.isRemote && <Badge className="bg-blue-100 text-blue-700 border-0">Remote</Badge>}
        </div>
      </CardContent>
    </Card>
  )
}
