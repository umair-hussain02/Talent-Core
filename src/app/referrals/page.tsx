"use client"

import { useState, useMemo } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { mockReferrals, mockReferralStats } from "@/data/mockReferrals"
import type { Referral } from "@/types/referral"
import { ReferralHeader } from "@/components/referrals/referral-header"
import { ReferralStats } from "@/components/referrals/referral-stats"
import { ReferralFilters } from "@/components/referrals/referral-filters"
import { ReferralCard } from "@/components/referrals/referral-card"
import { ReferralListItem } from "@/components/referrals/referral-list-item"
import { ReferralKanbanView } from "@/components/referrals/referral-kanban-view"
import { ReferralEmptyState } from "@/components/referrals/referral-empty-state"

export default function ReferralsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [jobFilter, setJobFilter] = useState("all")
  const [referrerFilter, setReferrerFilter] = useState("all")
  const [viewMode, setViewMode] = useState<"grid" | "list" | "kanban">("grid")
  const [selectedReferral, setSelectedReferral] = useState<Referral | null>(null)

  // Filter and search referrals
  const filteredReferrals = useMemo(() => {
    return mockReferrals.filter((referral) => {
      const matchesSearch =
        referral.referredPerson.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        referral.referredPerson.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        referral.referrer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        referral.jobTitle?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        referral.notes?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        referral.tags?.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))

      const matchesStatus = statusFilter === "all" || referral.status === statusFilter
      const matchesJob = jobFilter === "all" || referral.jobTitle === jobFilter
      const matchesReferrer = referrerFilter === "all" || referral.referrer.id === referrerFilter

      return matchesSearch && matchesStatus && matchesJob && matchesReferrer
    })
  }, [searchQuery, statusFilter, jobFilter, referrerFilter])

  // Get unique values for filters
  const uniqueJobs = [...new Set(mockReferrals.map((referral) => referral.jobTitle).filter(Boolean))]
  const uniqueReferrers = [
    ...new Map(mockReferrals.map((referral) => [referral.referrer.id, referral.referrer])).values(),
  ]

  const handleReferralClick = (referral: Referral) => {
    setSelectedReferral(referral)
    // In a real app, this would open a modal or navigate to a details page
    console.log("Selected referral:", referral)
  }

  return (
    <div className="container mx-auto p-4">
      <ReferralHeader />

      {/* Stats Cards */}
      <ReferralStats stats={mockReferralStats} />

      {/* Filters and Search */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <ReferralFilters
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            jobFilter={jobFilter}
            setJobFilter={setJobFilter}
            referrerFilter={referrerFilter}
            setReferrerFilter={setReferrerFilter}
            viewMode={viewMode}
            setViewMode={setViewMode}
            uniqueJobs={uniqueJobs}
            uniqueReferrers={uniqueReferrers}
          />
        </CardContent>
      </Card>

      {/* Results */}
      <div className="mb-4">
        <p className="text-sm text-gray-600">
          Showing {filteredReferrals.length} of {mockReferrals.length} referrals
        </p>
      </div>

      {/* Referrals Display */}
      {viewMode === "kanban" ? (
        <ReferralKanbanView filteredReferrals={filteredReferrals} handleReferralClick={handleReferralClick} />
      ) : viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReferrals.map((referral) => (
            <ReferralCard key={referral.id} referral={referral} onClick={handleReferralClick} />
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredReferrals.map((referral) => (
            <ReferralListItem key={referral.id} referral={referral} onClick={handleReferralClick} />
          ))}
        </div>
      )}

      {filteredReferrals.length === 0 && <ReferralEmptyState />}
    </div>
  )
}
