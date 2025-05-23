"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import type { Referral } from "@/types/referral"
import { formatDate } from "@/lib/referral-utils"

interface ReferralKanbanViewProps {
  filteredReferrals: Referral[]
  handleReferralClick: (referral: Referral) => void
}

export function ReferralKanbanView({ filteredReferrals, handleReferralClick }: ReferralKanbanViewProps) {
  const statusColumns = [
    { key: "new", label: "New" },
    { key: "contacted", label: "Contacted" },
    { key: "interviewing", label: "Interviewing" },
    { key: "hired", label: "Hired" },
    { key: "rejected", label: "Rejected" },
    { key: "withdrawn", label: "Withdrawn" },
  ]

  const getStatusBadgeColor = (status: Referral["status"]) => {
    switch (status) {
      case "new":
        return "bg-blue-100 text-blue-700 border-blue-200"
      case "contacted":
        return "bg-purple-100 text-purple-700 border-purple-200"
      case "interviewing":
        return "bg-amber-100 text-amber-700 border-amber-200"
      case "hired":
        return "bg-green-100 text-green-700 border-green-200"
      case "rejected":
        return "bg-red-100 text-red-700 border-red-200"
      case "withdrawn":
        return "bg-gray-100 text-gray-700 border-gray-200"
      default:
        return "bg-gray-100 text-gray-700 border-gray-200"
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {statusColumns.map((column) => {
        const columnReferrals = filteredReferrals.filter((r) => r.status === column.key)
        return (
          <div key={column.key} className="flex flex-col h-full">
            <div
              className={`p-2 rounded-t-lg font-medium text-center text-sm ${getStatusBadgeColor(
                column.key as Referral["status"],
              ).replace("border-", "")}`}
            >
              {column.label} ({columnReferrals.length})
            </div>
            <div className="bg-gray-50 rounded-b-lg p-2 flex-1 min-h-[500px]">
              <div className="space-y-2">
                {columnReferrals.map((referral) => (
                  <Card
                    key={referral.id}
                    className={`hover:shadow-md transition-all duration-200 cursor-pointer ${
                      referral.isHighPriority ? "border-l-4 border-l-amber-500" : ""
                    }`}
                    onClick={() => handleReferralClick(referral)}
                  >
                    <CardContent className="p-3">
                      <div className="flex items-center gap-2 mb-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage
                            src={referral.referredPerson.avatar || "/placeholder.svg"}
                            alt={referral.referredPerson.name}
                          />
                          <AvatarFallback>{referral.referredPerson.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-sm">{referral.referredPerson.name}</p>
                          <p className="text-xs text-gray-500">{referral.jobTitle || "Open Referral"}</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>Ref: {referral.referrer.name.split(" ")[0]}</span>
                        <span>{formatDate(referral.dateReferred)}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                {columnReferrals.length === 0 && (
                  <div className="text-center p-4 text-gray-500 text-sm">No referrals</div>
                )}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
