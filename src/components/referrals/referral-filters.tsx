"use client"

import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface ReferralFiltersProps {
  searchQuery: string
  setSearchQuery: (value: string) => void
  statusFilter: string
  setStatusFilter: (value: string) => void
  jobFilter: string
  setJobFilter: (value: string) => void
  referrerFilter: string
  setReferrerFilter: (value: string) => void
  viewMode: "grid" | "list" | "kanban"
  setViewMode: (value: "grid" | "list" | "kanban") => void
  uniqueJobs: (string | undefined)[]
  uniqueReferrers: { id: string; name: string; email: string; department: string; position: string; avatar?: string }[]
}

export function ReferralFilters({
  searchQuery,
  setSearchQuery,
  statusFilter,
  setStatusFilter,
  jobFilter,
  setJobFilter,
  referrerFilter,
  setReferrerFilter,
  viewMode,
  setViewMode,
  uniqueJobs,
  uniqueReferrers,
}: ReferralFiltersProps) {
  return (
    <div className="flex flex-col lg:flex-row gap-4">
      <div className="flex-1">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search referrals by name, email, or job..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="new">New</SelectItem>
            <SelectItem value="contacted">Contacted</SelectItem>
            <SelectItem value="interviewing">Interviewing</SelectItem>
            <SelectItem value="hired">Hired</SelectItem>
            <SelectItem value="rejected">Rejected</SelectItem>
            <SelectItem value="withdrawn">Withdrawn</SelectItem>
          </SelectContent>
        </Select>

        <Select value={jobFilter} onValueChange={setJobFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Job Position" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Positions</SelectItem>
            {uniqueJobs.map((job) => (
              <SelectItem key={job} value={job!}>
                {job}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={referrerFilter} onValueChange={setReferrerFilter}>
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="Referrer" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Referrers</SelectItem>
            {uniqueReferrers.map((referrer) => (
              <SelectItem key={referrer.id} value={referrer.id}>
                {referrer.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Tabs value={viewMode} onValueChange={(value) => setViewMode(value as "grid" | "list" | "kanban")}>
          <TabsList className="grid w-[180px] grid-cols-3">
            <TabsTrigger value="grid">Grid</TabsTrigger>
            <TabsTrigger value="list">List</TabsTrigger>
            <TabsTrigger value="kanban">Kanban</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
    </div>
  )
}
