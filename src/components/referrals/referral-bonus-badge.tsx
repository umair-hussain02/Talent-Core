import { Badge } from "@/components/ui/badge"

interface ReferralBonusBadgeProps {
  status: string
  small?: boolean
}

export function ReferralBonusBadge({ status, small = false }: ReferralBonusBadgeProps) {
  const getBonusStatusColor = (status: string) => {
    switch (status) {
      case "paid":
        return "bg-green-100 text-green-700 border-green-200"
      case "approved":
        return "bg-blue-100 text-blue-700 border-blue-200"
      case "pending":
        return "bg-amber-100 text-amber-700 border-amber-200"
      case "denied":
        return "bg-red-100 text-red-700 border-red-200"
      default:
        return "bg-gray-100 text-gray-700 border-gray-200"
    }
  }

  return (
    <Badge variant="outline" className={`${getBonusStatusColor(status)} ${small ? "text-xs py-0 px-1" : ""}`}>
      {status}
    </Badge>
  )
}
