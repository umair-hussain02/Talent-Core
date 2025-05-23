"use client"

import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"

interface JobFiltersProps {
  searchQuery: string
  setSearchQuery: (query: string) => void
  locationFilter: string
  setLocationFilter: (location: string) => void
  departmentFilter: string
  setDepartmentFilter: (department: string) => void
  experienceFilter: string
  setExperienceFilter: (experience: string) => void
  remoteFilter: string
  setRemoteFilter: (remote: string) => void
  uniqueLocations: string[]
  uniqueExperience: string[]
}

export function JobFilters({
  searchQuery,
  setSearchQuery,
  locationFilter,
  setLocationFilter,
  departmentFilter,
  setDepartmentFilter,
  experienceFilter,
  setExperienceFilter,
  remoteFilter,
  setRemoteFilter,
  uniqueLocations,
  uniqueExperience,
}: JobFiltersProps) {
  return (
    <Card className="mb-8">
      <CardContent className="p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                placeholder="Search jobs by title, skills, or keywords..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12 text-lg"
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <Select value={locationFilter} onValueChange={setLocationFilter}>
              <SelectTrigger className="w-[140px] h-12">
                <SelectValue placeholder="Location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Locations</SelectItem>
                {uniqueLocations.map((location) => (
                  <SelectItem key={location} value={location}>
                    {location}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
              <SelectTrigger className="w-[140px] h-12">
                <SelectValue placeholder="Department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                <SelectItem value="engineering">Engineering</SelectItem>
                <SelectItem value="design">Design</SelectItem>
                <SelectItem value="product">Product</SelectItem>
                <SelectItem value="data">Data</SelectItem>
                <SelectItem value="marketing">Marketing</SelectItem>
              </SelectContent>
            </Select>

            <Select value={experienceFilter} onValueChange={setExperienceFilter}>
              <SelectTrigger className="w-[140px] h-12">
                <SelectValue placeholder="Experience" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Levels</SelectItem>
                {uniqueExperience.map((exp) => (
                  <SelectItem key={exp} value={exp}>
                    {exp}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={remoteFilter} onValueChange={setRemoteFilter}>
              <SelectTrigger className="w-[120px] h-12">
                <SelectValue placeholder="Remote" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="remote">Remote</SelectItem>
                <SelectItem value="onsite">On-site</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
