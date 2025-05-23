/**
 * Formats a salary string for display
 * @param salary The salary string to format
 * @returns Formatted salary string
 */
export function formatSalary(salary?: string): string {
  if (!salary) return "Salary not specified"
  return salary
}

/**
 * Filters jobs based on search and filter criteria
 * @param jobs Array of jobs to filter
 * @param searchQuery Search query string
 * @param locationFilter Location filter value
 * @param experienceFilter Experience filter value
 * @param jobTypeFilter Job type filter value
 * @param statusFilter Status filter value
 * @returns Filtered array of jobs
 */
export function filterJobs(
  jobs: any[],
  searchQuery: string,
  locationFilter: string,
  experienceFilter: string,
  jobTypeFilter: string,
  statusFilter: string,
) {
  return jobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.description?.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesLocation = locationFilter === "all" || job.location === locationFilter
    const matchesExperience = experienceFilter === "all" || job.experience === experienceFilter
    const matchesJobType = jobTypeFilter === "all" || job.jobType === jobTypeFilter
    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "active" && job.isFeatured) ||
      (statusFilter === "draft" && !job.isFeatured)

    return matchesSearch && matchesLocation && matchesExperience && matchesJobType && matchesStatus
  })
}

/**
 * Extracts unique values from an array of jobs for a specific property
 * @param jobs Array of jobs
 * @param property Property to extract unique values for
 * @returns Array of unique values
 */
export function getUniqueValues(jobs: any[], property: string): string[] {
  return [...new Set(jobs.map((job) => job[property]).filter(Boolean))]
}
