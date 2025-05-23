"use client"

import { Search } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { JobCard } from "./job-card"
import type { Job } from "@/types/job"

interface JobListingsProps {
  filteredJobs: Job[]
  publicJobsCount: number
  onJobClick: (job: Job) => void
  onApplyClick: (job: Job) => void
  onClearFilters: () => void
}

export function JobListings({
  filteredJobs,
  publicJobsCount,
  onJobClick,
  onApplyClick,
  onClearFilters,
}: JobListingsProps) {
  return (
    <>
      {/* Results Count */}
      <div className="mb-6">
        <p className="text-gray-600">
          Showing {filteredJobs.length} of {publicJobsCount} positions
        </p>
      </div>

      {/* Job Listings */}
      {filteredJobs.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredJobs.map((job) => (
            <JobCard key={job.id} job={job} onJobClick={onJobClick} onApplyClick={onApplyClick} />
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="p-12 text-center">
            <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-900 mb-2">No positions found</h3>
            <p className="text-gray-600 mb-6">
              Try adjusting your search criteria or check back later for new opportunities.
            </p>
            <Button variant="outline" onClick={onClearFilters}>
              Clear Filters
            </Button>
          </CardContent>
        </Card>
      )}
    </>
  )
}
