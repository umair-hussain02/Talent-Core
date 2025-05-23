"use client"

import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface JobFiltersProps {
  searchQuery: string
  onSearchChange: (value: string) => void
  locationFilter: string
  onLocationChange: (value: string) => void
  experienceFilter: string
  onExperienceChange: (value: string) => void
  jobTypeFilter: string
  onJobTypeChange: (value: string) => void
  statusFilter: string
  onStatusChange: (value: string) => void
  viewMode: "grid" | "list"
  onViewModeChange: (value: "grid" | "list") => void
  locations: string[]
  experiences: string[]
  jobTypes: string[]
}

export function JobFilters({
  searchQuery,
  onSearchChange,
  locationFilter,
  onLocationChange,
  experienceFilter,
  onExperienceChange,
  jobTypeFilter,
  onJobTypeChange,
  statusFilter,
  onStatusChange,
  viewMode,
  onViewModeChange,
  locations,
  experiences,
  jobTypes,
}: JobFiltersProps) {
  return (
    <div className="flex flex-col lg:flex-row gap-4">
      <div className="flex-1">
        <div className="relative">
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400"
            aria-hidden="true"
          />
          <Input
            placeholder="Search jobs by title, company, or description..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10"
            aria-label="Search jobs"
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <Select value={locationFilter} onValueChange={onLocationChange}>
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Location" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Locations</SelectItem>
            {locations.map((location) => (
              <SelectItem key={location} value={location}>
                {location}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={experienceFilter} onValueChange={onExperienceChange}>
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Experience" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Experience</SelectItem>
            {experiences.map((exp) => (
              <SelectItem key={exp} value={exp}>
                {exp}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={jobTypeFilter} onValueChange={onJobTypeChange}>
          <SelectTrigger className="w-[120px]">
            <SelectValue placeholder="Job Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            {jobTypes.map((type) => (
              <SelectItem key={type} value={type}>
                {type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={statusFilter} onValueChange={onStatusChange}>
          <SelectTrigger className="w-[120px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="draft">Draft</SelectItem>
          </SelectContent>
        </Select>

        <Tabs value={viewMode} onValueChange={(value) => onViewModeChange(value as "grid" | "list")}>
          <TabsList className="grid w-[120px] grid-cols-2">
            <TabsTrigger value="grid">Grid</TabsTrigger>
            <TabsTrigger value="list">List</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
    </div>
  )
}
