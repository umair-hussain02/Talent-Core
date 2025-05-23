import type { Job } from "@/types/job"

/**
 * Filters jobs based on search criteria
 */
export function filterJobs(
  jobs: Job[],
  searchQuery: string,
  locationFilter: string,
  departmentFilter: string,
  experienceFilter: string,
  remoteFilter: string,
): Job[] {
  return jobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.skills?.some((skill) => skill.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesLocation = locationFilter === "all" || job.location === locationFilter

    const matchesDepartment =
      departmentFilter === "all" ||
      (departmentFilter === "engineering" && (job.title.includes("Developer") || job.title.includes("Engineer"))) ||
      (departmentFilter === "design" && job.title.includes("Designer")) ||
      (departmentFilter === "product" && job.title.includes("Product")) ||
      (departmentFilter === "data" && job.title.includes("Data")) ||
      (departmentFilter === "marketing" && job.title.includes("Marketing"))

    const matchesExperience = experienceFilter === "all" || job.experience === experienceFilter

    const matchesRemote =
      remoteFilter === "all" ||
      (remoteFilter === "remote" && job.isRemote) ||
      (remoteFilter === "onsite" && !job.isRemote)

    return matchesSearch && matchesLocation && matchesDepartment && matchesExperience && matchesRemote
  })
}

/**
 * Gets unique values from job array for filter options
 */
export function getUniqueJobValues(jobs: Job[]): {
  locations: string[]
  experiences: string[]
} {
  return {
    locations: [...new Set(jobs.map((job) => job.location))],
    experiences: [...new Set(jobs.map((job) => job.experience))],
  }
}

/**
 * Scrolls to a specific element by ID
 */
export function scrollToElement(elementId: string): void {
  document.getElementById(elementId)?.scrollIntoView({ behavior: "smooth" })
}
