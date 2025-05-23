"use client"

import { useState, useMemo } from "react"
import { HeroSection } from "@/components/career-site/hero-section"
import { CompanyValues } from "@/components/career-site/company-values"
import { BenefitsSection } from "@/components/career-site/benefits-section"
import { JobFilters } from "@/components/career-site/job-filters"
import { JobListings } from "@/components/career-site/job-listings"
import { JobDetailsDialog } from "@/components/career-site/job-details-dialog"
import { ApplicationForm } from "@/components/career-site/application-form"
import { Footer } from "@/components/career-site/footer"
import { mockjobs } from "@/data/mockjobs"
import { filterJobs, getUniqueJobValues } from "@/lib/career-site-utils"
import type { Job } from "@/types/job"

export default function CareerSitePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [locationFilter, setLocationFilter] = useState("all")
  const [departmentFilter, setDepartmentFilter] = useState("all")
  const [experienceFilter, setExperienceFilter] = useState("all")
  const [remoteFilter, setRemoteFilter] = useState("all")
  const [selectedJob, setSelectedJob] = useState<Job | null>(null)
  const [isApplicationOpen, setIsApplicationOpen] = useState(false)

  // Filter jobs for public display (only featured/active jobs)
  const publicJobs = useMemo(() => mockjobs.filter((job) => job.isFeatured), [])

  // Filter and search jobs
  const filteredJobs = useMemo(() => {
    return filterJobs(publicJobs, searchQuery, locationFilter, departmentFilter, experienceFilter, remoteFilter)
  }, [publicJobs, searchQuery, locationFilter, departmentFilter, experienceFilter, remoteFilter])

  // Get unique values for filters
  const { locations: uniqueLocations, experiences: uniqueExperience } = useMemo(() => {
    return getUniqueJobValues(publicJobs)
  }, [publicJobs])

  const handleJobClick = (job: Job) => {
    setSelectedJob(job)
  }

  const handleApplyClick = (job: Job) => {
    setSelectedJob(job)
    setIsApplicationOpen(true)
  }

  const handleClearFilters = () => {
    setSearchQuery("")
    setLocationFilter("all")
    setDepartmentFilter("all")
    setExperienceFilter("all")
    setRemoteFilter("all")
  }

  const handleCloseJobDetails = () => {
    setSelectedJob(null)
  }

  const handleCloseApplication = () => {
    setIsApplicationOpen(false)
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <HeroSection publicJobsCount={publicJobs.length} />

      {/* Company Values */}
      <CompanyValues />

      {/* Benefits Section */}
      <BenefitsSection />

      {/* Jobs Section */}
      <section id="jobs" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Open Positions</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Find your next opportunity and join our growing team.
            </p>
          </div>

          {/* Search and Filters */}
          <JobFilters
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            locationFilter={locationFilter}
            setLocationFilter={setLocationFilter}
            departmentFilter={departmentFilter}
            setDepartmentFilter={setDepartmentFilter}
            experienceFilter={experienceFilter}
            setExperienceFilter={setExperienceFilter}
            remoteFilter={remoteFilter}
            setRemoteFilter={setRemoteFilter}
            uniqueLocations={uniqueLocations}
            uniqueExperience={uniqueExperience}
          />

          {/* Job Listings */}
          <JobListings
            filteredJobs={filteredJobs}
            publicJobsCount={publicJobs.length}
            onJobClick={handleJobClick}
            onApplyClick={handleApplyClick}
            onClearFilters={handleClearFilters}
          />
        </div>
      </section>

      {/* Job Details Dialog */}
      <JobDetailsDialog
        job={selectedJob}
        isOpen={!!selectedJob && !isApplicationOpen}
        onClose={handleCloseJobDetails}
        onApplyClick={handleApplyClick}
      />

      {/* Application Form */}
      <ApplicationForm job={selectedJob} isOpen={isApplicationOpen} onClose={handleCloseApplication} />

      {/* Footer */}
      <Footer />
    </div>
  )
}
