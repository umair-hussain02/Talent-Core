"use client"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Mail, User, ExternalLink, Tag, MoreVertical, Phone, FileText, Edit, Trash2 } from "lucide-react"
import type { Referral } from "@/types/referral"

interface ReferralActionsProps {
  referral: Referral
}

export function ReferralActions({ referral }: ReferralActionsProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={(e) => e.stopPropagation()}>
          <MoreVertical className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem>
          <Mail className="h-4 w-4 mr-2" />
          Contact Candidate
        </DropdownMenuItem>
        {referral.referredPerson.phone && (
          <DropdownMenuItem>
            <Phone className="h-4 w-4 mr-2" />
            Call Candidate
          </DropdownMenuItem>
        )}
        <DropdownMenuItem>
          <User className="h-4 w-4 mr-2" />
          Contact Referrer
        </DropdownMenuItem>
        {referral.referredPerson.linkedin && (
          <DropdownMenuItem>
            <ExternalLink className="h-4 w-4 mr-2" />
            View LinkedIn
          </DropdownMenuItem>
        )}
        {referral.referredPerson.resume && (
          <DropdownMenuItem>
            <FileText className="h-4 w-4 mr-2" />
            View Resume
          </DropdownMenuItem>
        )}
        <DropdownMenuItem>
          <Tag className="h-4 w-4 mr-2" />
          Manage Tags
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Edit className="h-4 w-4 mr-2" />
          Edit Referral
        </DropdownMenuItem>
        <DropdownMenuItem className="text-red-600">
          <Trash2 className="h-4 w-4 mr-2" />
          Delete Referral
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
