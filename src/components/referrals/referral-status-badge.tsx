import { Badge } from "@/components/ui/badge"
import { CheckCircle, XCircle, AlertCircle, Users, Mail, Star } from "lucide-react"
import type { Referral } from "@/types/referral"

interface ReferralStatusBadgeProps {
  status: Referral["status"]
}

export function ReferralStatusBadge({ status }: ReferralStatusBadgeProps) {
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

  const getStatusIcon = (status: Referral["status"]) => {
    switch (status) {
      case "hired":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "rejected":
        return <XCircle className="h-4 w-4 text-red-600" />
      case "withdrawn":
        return <AlertCircle className="h-4 w-4 text-gray-600" />
      case "interviewing":
        return <Users className="h-4 w-4 text-amber-600" />
      case "contacted":
        return <Mail className="h-4 w-4 text-purple-600" />
      case "new":
        return <Star className="h-4 w-4 text-blue-600" />
      default:
        return null
    }
  }

  return (
    <Badge variant="outline" className={getStatusBadgeColor(status)}>
      {getStatusIcon(status)}
      <span className="ml-1 capitalize">{status}</span>
    </Badge>
  )
}
