"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Mail, Phone, User, Calendar, DollarSign } from "lucide-react"
import type { Referral } from "@/types/referral"
import { ReferralStatusBadge } from "./referral-status-badge"
import { ReferralBonusBadge } from "./referral-bonus-badge"
import { formatDate } from "@/lib/referral-utils"

interface ReferralCardProps {
  referral: Referral
  onClick: (referral: Referral) => void
}

export function ReferralCard({ referral, onClick }: ReferralCardProps) {
  return (
    <Card
      key={referral.id}
      className={`hover:shadow-md transition-all duration-200 cursor-pointer group ${
        referral.isHighPriority ? "border-l-4 border-l-amber-500" : ""
      }`}
      onClick={() => onClick(referral)}
    >
      <CardHeader className="pb-2 pt-4 px-4">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-3">
            <Avatar className="h-12 w-12 border-2 border-gray-100">
              <AvatarImage
                src={referral.referredPerson.avatar || "/placeholder.svg"}
                alt={referral.referredPerson.name}
              />
              <AvatarFallback>{referral.referredPerson.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-lg font-semibold group-hover:text-purple-600 transition-colors">
                {referral.referredPerson.name}
              </h3>
              <p className="text-gray-600 text-sm">{referral.jobTitle || "Open Referral"}</p>
            </div>
          </div>
          <ReferralStatusBadge status={referral.status} />
        </div>
      </CardHeader>
      <CardContent className="px-4 pb-4">
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Mail className="h-3.5 w-3.5" />
            <span>{referral.referredPerson.email}</span>
          </div>

          {referral.referredPerson.phone && (
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Phone className="h-3.5 w-3.5" />
              <span>{referral.referredPerson.phone}</span>
            </div>
          )}

          <div className="flex items-center gap-2 text-sm text-gray-600">
            <User className="h-3.5 w-3.5" />
            <span>
              Referred by <span className="font-medium">{referral.referrer.name}</span>
            </span>
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Calendar className="h-3.5 w-3.5" />
            <span>Referred on {formatDate(referral.dateReferred)}</span>
          </div>

          {referral.bonus && (
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <DollarSign className="h-3.5 w-3.5" />
                <span>Bonus: ${referral.bonus.amount}</span>
              </div>
              <ReferralBonusBadge status={referral.bonus.status} />
            </div>
          )}

          {referral.tags && referral.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 pt-2 border-t border-gray-100">
              {referral.tags.map((tag) => (
                <Badge key={tag} variant="outline" className="bg-gray-50 text-gray-700 text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
