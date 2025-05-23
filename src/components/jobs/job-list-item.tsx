"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Briefcase, DollarSign, Calendar, Users } from "lucide-react"
import type { Job } from "@/types/job"
import { JobActions } from "@/components/jobs/job-actions"
import { JobStatusBadge } from "@/components/jobs/job-status-badge"
import { formatSalary } from "@/lib/job-utils"

interface JobListItemProps {
  job: Job
  onClick: (job: Job) => void
}

export function JobListItem({ job, onClick }: JobListItemProps) {
  return (
    <Card className="hover:shadow-md transition-all duration-200 cursor-pointer">
      <CardContent className="p-4" onClick={() => onClick(job)}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 flex-1">
            <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-purple-100 to-blue-100 flex items-center justify-center">
              <span className="text-lg font-bold text-purple-600" aria-hidden="true">
                {job?.company?.charAt(0) || "Company"}
              </span>
            </div>

            <div className="flex-1">
              <div className="flex items-center gap-3 mb-1">
                <h3 className="font-semibold text-gray-900 hover:text-purple-600 transition-colors">{job.title}</h3>
                <JobStatusBadge status={job.isFeatured ? "active" : "draft"} />
                {job.isRemote && <Badge className="bg-blue-100 text-blue-700 border-0">Remote</Badge>}
              </div>
              <p className="text-gray-600 text-sm mb-2">{job.company}</p>
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>{job.location}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Briefcase className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>{job.experience}</span>
                </div>
                <div className="flex items-center gap-1">
                  <DollarSign className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>{formatSalary(job.salary)}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>Posted {job.postedDays} days ago</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-gray-500" aria-hidden="true" />
                <span className="text-sm font-medium text-gray-900">{job.applications}</span>
              </div>
              <span className="text-xs text-emerald-600">+{job.recentApplications} this week</span>
            </div>

            <JobActions job={job} onView={() => onClick(job)} />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
