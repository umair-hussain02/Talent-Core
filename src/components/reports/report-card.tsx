"use client"

import { useState } from "react"
import type { Report } from "@/types/report"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Play,
  Download,
  Share2,
  Edit,
  Copy,
  Trash2,
  MoreHorizontal,
  Eye,
  Calendar,
  Clock,
  Star,
  StarOff,
  FileText,
  BarChart3,
  Settings,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface ReportCardProps {
  report: Report
  onView?: (report: Report) => void
  onEdit?: (report: Report) => void
  onRun?: (report: Report) => void
  onShare?: (report: Report) => void
  onDelete?: (report: Report) => void
  onToggleFavorite?: (report: Report) => void
}

export function ReportCard({ report, onView, onEdit, onRun, onShare, onDelete, onToggleFavorite }: ReportCardProps) {
  const [isRunning, setIsRunning] = useState(false)

  const handleRun = async () => {
    setIsRunning(true)
    await new Promise((resolve) => setTimeout(resolve, 2000)) // Simulate execution
    setIsRunning(false)
    onRun?.(report)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "published":
        return "bg-green-100 text-green-800 border-green-200"
      case "draft":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "archived":
        return "bg-gray-100 text-gray-800 border-gray-200"
      case "scheduled":
        return "bg-blue-100 text-blue-800 border-blue-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "dashboard":
        return <BarChart3 className="h-4 w-4" />
      case "scheduled":
        return <Calendar className="h-4 w-4" />
      default:
        return <FileText className="h-4 w-4" />
    }
  }

  return (
    <Card className="group hover:shadow-lg transition-all duration-200 border-gray-200 hover:border-gray-300">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-2">
            <div
              className={cn(
                "p-2 rounded-lg",
                report.category.color.replace("bg-", "bg-").replace("-500", "-100"),
                report.category.color.replace("bg-", "text-").replace("-500", "-600"),
              )}
            >
              {getTypeIcon(report.type)}
            </div>
            <div>
              <h3
                className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors cursor-pointer"
                onClick={() => onView?.(report)}
              >
                {report.name}
              </h3>
              <div className="flex items-center space-x-2 mt-1">
                <Badge variant="outline" className={getStatusColor(report.status)}>
                  {report.status}
                </Badge>
                <Badge variant="outline" className="text-xs">
                  {report.type}
                </Badge>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onToggleFavorite?.(report)}
              className="opacity-0 group-hover:opacity-100 transition-opacity"
            >
              {report.isFavorite ? (
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              ) : (
                <StarOff className="h-4 w-4" />
              )}
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem onClick={() => onView?.(report)}>
                  <Eye className="h-4 w-4 mr-2" />
                  View Report
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onEdit?.(report)}>
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Report
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleRun} disabled={isRunning}>
                  <Play className="h-4 w-4 mr-2" />
                  {isRunning ? "Running..." : "Run Report"}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => onShare?.(report)}>
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Copy className="h-4 w-4 mr-2" />
                  Duplicate
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onDelete?.(report)} className="text-red-600 focus:text-red-600">
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">{report.description}</p>

        <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Eye className="h-3 w-3" />
              <span>{report.views}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Download className="h-3 w-3" />
              <span>{report.downloads}</span>
            </div>
            {report.size && (
              <div className="flex items-center space-x-1">
                <FileText className="h-3 w-3" />
                <span>{report.size}</span>
              </div>
            )}
          </div>
          {report.schedule && (
            <div className="flex items-center space-x-1 text-blue-600">
              <Clock className="h-3 w-3" />
              <span>{report.schedule.frequency}</span>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Avatar className="h-6 w-6">
              <AvatarImage src={report.createdBy.avatar || "/placeholder.svg"} />
              <AvatarFallback className="text-xs">
                {report.createdBy.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="text-xs text-gray-600">
              <div>{report.createdBy.name}</div>
              <div className="text-gray-400">{new Date(report.updatedAt).toLocaleDateString()}</div>
            </div>
          </div>

          <div className="flex space-x-1">
            <Button variant="outline" size="sm" onClick={() => onView?.(report)} className="text-xs">
              <Eye className="h-3 w-3 mr-1" />
              View
            </Button>
            <Button variant="default" size="sm" onClick={handleRun} disabled={isRunning} className="text-xs">
              <Play className="h-3 w-3 mr-1" />
              {isRunning ? "Running..." : "Run"}
            </Button>
          </div>
        </div>

        {report.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-3">
            {report.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs px-2 py-0">
                {tag}
              </Badge>
            ))}
            {report.tags.length > 3 && (
              <Badge variant="secondary" className="text-xs px-2 py-0">
                +{report.tags.length - 3}
              </Badge>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
