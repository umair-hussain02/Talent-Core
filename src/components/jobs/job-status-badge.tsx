import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

type JobStatus = "active" | "draft" | "archived" | "expired"

interface JobStatusBadgeProps {
  status: JobStatus
  className?: string
}

export function JobStatusBadge({ status, className }: JobStatusBadgeProps) {
  const getStatusStyles = () => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-700 border-green-200"
      case "draft":
        return "bg-gray-100 text-gray-700 border-gray-200"
      case "archived":
        return "bg-amber-100 text-amber-700 border-amber-200"
      case "expired":
        return "bg-red-100 text-red-700 border-red-200"
      default:
        return "bg-gray-100 text-gray-700 border-gray-200"
    }
  }

  const getStatusLabel = () => {
    switch (status) {
      case "active":
        return "Active"
      case "draft":
        return "Draft"
      case "archived":
        return "Archived"
      case "expired":
        return "Expired"
      default:
        return status
    }
  }

  return (
    <Badge variant="outline" className={cn(getStatusStyles(), className)}>
      {getStatusLabel()}
    </Badge>
  )
}
