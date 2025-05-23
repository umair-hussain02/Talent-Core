"use client"

import { useState, useMemo, useCallback } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { JobCard } from "@/components/jobs/job-card"
import { JobListItem } from "@/components/jobs/job-list-item"
import { JobFilters } from "@/components/jobs/job-filters"
import { JobStats } from "@/components/jobs/job-stats"
import { JobEmptyState } from "@/components/jobs/job-empty-state"
import { JobHeader } from "@/components/jobs/job-header"
import { JobDetailsSheet } from "@/components/job-details-sheet"
import { mockjobs } from "@/data/mockjobs"
import { filterJobs, getUniqueValues } from "@/lib/job-utils"
import type { Job } from "@/types/job"

export default function JobsPage() {
  // State
  const [searchQuery, setSearchQuery] = useState("")
  const [locationFilter, setLocationFilter] = useState("all")
  const [experienceFilter, setExperienceFilter] = useState("all")
  const [jobTypeFilter, setJobTypeFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedJob, setSelectedJob] = useState<Job | null>(null)
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  // Get unique values for filters
  const uniqueLocations = useMemo(() => getUniqueValues(mockjobs, "location"), [])
  const uniqueExperience = useMemo(() => getUniqueValues(mockjobs, "experience"), [])
  const uniqueJobTypes = useMemo(() => getUniqueValues(mockjobs, "jobType"), [])

  // Filter and search jobs
  const filteredJobs = useMemo(
    () => filterJobs(mockjobs, searchQuery, locationFilter, experienceFilter, jobTypeFilter, statusFilter),
    [searchQuery, locationFilter, experienceFilter, jobTypeFilter, statusFilter],
  )

  // Event handlers
  const handleJobClick = useCallback((job: Job) => {
    setSelectedJob(job)
    setIsDetailsOpen(true)
  }, [])

  const handleCloseDetails = useCallback(() => {
    setIsDetailsOpen(false)
  }, [])

  const handleCreateJob = useCallback(() => {
    // Implement job creation logic
    console.log("Create new job")
  }, [])

  return (
    <div className="container mx-auto p-4 ">
      <JobHeader onCreateJob={handleCreateJob} />

      {/* Stats Cards */}
      <JobStats jobs={mockjobs} />

      {/* Filters and Search */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <JobFilters
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            locationFilter={locationFilter}
            onLocationChange={setLocationFilter}
            experienceFilter={experienceFilter}
            onExperienceChange={setExperienceFilter}
            jobTypeFilter={jobTypeFilter}
            onJobTypeChange={setJobTypeFilter}
            statusFilter={statusFilter}
            onStatusChange={setStatusFilter}
            viewMode={viewMode}
            onViewModeChange={setViewMode}
            locations={uniqueLocations}
            experiences={uniqueExperience}
            jobTypes={uniqueJobTypes}
          />
        </CardContent>
      </Card>

      {/* Results */}
      <div className="mb-4">
        <p className="text-sm text-gray-600">
          Showing {filteredJobs.length} of {mockjobs.length} jobs
        </p>
      </div>

      {/* Jobs Display */}
      {filteredJobs.length > 0 ? (
        viewMode === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredJobs.map((job) => (
              <JobCard key={job.id} job={job} onClick={handleJobClick} />
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredJobs.map((job) => (
              <JobListItem key={job.id} job={job} onClick={handleJobClick} />
            ))}
          </div>
        )
      ) : (
        <JobEmptyState onCreateJob={handleCreateJob} />
      )}

      <JobDetailsSheet isOpen={isDetailsOpen} onClose={handleCloseDetails} job={selectedJob} />
    </div>
  )
}
