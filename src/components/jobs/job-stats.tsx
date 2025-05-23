import { Card, CardContent } from "@/components/ui/card"
import { Briefcase, Eye, Users, Calendar } from "lucide-react"
import type { Job } from "@/types/job"

interface JobStatsProps {
  jobs: Job[]
}

export function JobStats({ jobs }: JobStatsProps) {
  const totalJobs = jobs.length
  const activeJobs = jobs.filter((job) => job.isFeatured).length
  const totalApplications = jobs.reduce((sum, job) => sum + job.applications, 0)
  const recentApplications = jobs.reduce((sum, job) => sum + job.recentApplications, 0)

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Jobs</p>
              <p className="text-2xl font-bold text-gray-900">{totalJobs}</p>
            </div>
            <div className="bg-purple-100 p-2 rounded-full">
              <Briefcase className="h-5 w-5 text-purple-600" aria-hidden="true" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Active Jobs</p>
              <p className="text-2xl font-bold text-gray-900">{activeJobs}</p>
            </div>
            <div className="bg-green-100 p-2 rounded-full">
              <Eye className="h-5 w-5 text-green-600" aria-hidden="true" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Applications</p>
              <p className="text-2xl font-bold text-gray-900">{totalApplications}</p>
            </div>
            <div className="bg-blue-100 p-2 rounded-full">
              <Users className="h-5 w-5 text-blue-600" aria-hidden="true" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">This Week</p>
              <p className="text-2xl font-bold text-gray-900">{recentApplications}</p>
            </div>
            <div className="bg-amber-100 p-2 rounded-full">
              <Calendar className="h-5 w-5 text-amber-600" aria-hidden="true" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
