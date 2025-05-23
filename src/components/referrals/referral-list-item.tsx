"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Mail, Briefcase, Calendar, User, DollarSign } from "lucide-react"
import type { Referral } from "@/types/referral"
import { ReferralStatusBadge } from "./referral-status-badge"
import { ReferralBonusBadge } from "./referral-bonus-badge"
import { formatDate } from "@/lib/referral-utils"
import { ReferralActions } from "./referral-actions"

interface ReferralListItemProps {
  referral: Referral
  onClick: (referral: Referral) => void
}

export function ReferralListItem({ referral, onClick }: ReferralListItemProps) {
  return (
    <Card
      key={referral.id}
      className={`hover:shadow-md transition-all duration-200 cursor-pointer ${
        referral.isHighPriority ? "border-l-4 border-l-amber-500" : ""
      }`}
      onClick={() => onClick(referral)}
    >
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 flex-1">
            <Avatar className="h-12 w-12 border-2 border-gray-100">
              <AvatarImage
                src={referral.referredPerson.avatar || "/placeholder.svg"}
                alt={referral.referredPerson.name}
              />
              <AvatarFallback>{referral.referredPerson.name.charAt(0)}</AvatarFallback>
            </Avatar>

            <div className="flex-1">
              <div className="flex items-center gap-3 mb-1">
                <h3 className="font-semibold text-gray-900 hover:text-purple-600 transition-colors">
                  {referral.referredPerson.name}
                </h3>
                <ReferralStatusBadge status={referral.status} />
                {referral.isHighPriority && (
                  <Badge className="bg-amber-100 text-amber-700 border-0">High Priority</Badge>
                )}
              </div>

              <div className="flex items-center gap-4 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <Mail className="h-3.5 w-3.5" />
                  <span>{referral.referredPerson.email}</span>
                </div>
                {referral.jobTitle && (
                  <div className="flex items-center gap-1">
                    <Briefcase className="h-3.5 w-3.5" />
                    <span>{referral.jobTitle}</span>
                  </div>
                )}
                <div className="flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5" />
                  <span>{formatDate(referral.dateReferred)}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-gray-500" />
                <span className="text-sm font-medium text-gray-900">{referral.referrer.name}</span>
              </div>
              {referral.bonus && (
                <div className="flex items-center gap-1">
                  <DollarSign className="h-3.5 w-3.5 text-gray-500" />
                  <span className="text-sm text-gray-600">${referral.bonus.amount}</span>
                  <ReferralBonusBadge status={referral.bonus.status} small />
                </div>
              )}
            </div>

            <ReferralActions referral={referral} />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
