"use client"

import { useState, useMemo } from "react"
import { mockReports, reportCategories, reportTemplates, reportStatistics } from "@/data/mockReports"
import type { Report } from "@/types/report"
import { ReportCard } from "@/components/reports/report-card"
import { ReportBuilder } from "@/components/reports/report-builder"
import { ReportViewer } from "@/components/reports/report-viewer"
import { ChartComponent, sampleCharts } from "@/components/reports/chart-component"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Separator } from "@/components/ui/separator"
import { Search, SortAsc, Grid3X3, List, Download, Mail, BarChart3, Play, Settings } from "lucide-react"

export default function ReportsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [selectedStatus, setSelectedStatus] = useState<string>("all")
  const [selectedType, setSelectedType] = useState<string>("all")
  const [sortBy, setSortBy] = useState<string>("updated")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [selectedReport, setSelectedReport] = useState<Report | null>(null)
  const [isViewerOpen, setIsViewerOpen] = useState(false)

  const filteredReports = useMemo(() => {
    return mockReports
      .filter((report) => {
        const matchesSearch =
          report.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          report.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          report.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))

        const matchesCategory = selectedCategory === "all" || report.category.id === selectedCategory
        const matchesStatus = selectedStatus === "all" || report.status === selectedStatus
        const matchesType = selectedType === "all" || report.type === selectedType

        return matchesSearch && matchesCategory && matchesStatus && matchesType
      })
      .sort((a, b) => {
        switch (sortBy) {
          case "name":
            return a.name.localeCompare(b.name)
          case "created":
            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          case "updated":
            return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
          case "views":
            return b.views - a.views
          case "downloads":
            return b.downloads - a.downloads
          default:
            return 0
        }
      })
  }, [searchQuery, selectedCategory, selectedStatus, selectedType, sortBy])

  const handleViewReport = (report: Report) => {
    setSelectedReport(report)
    setIsViewerOpen(true)
  }

  const handleRunReport = (report: Report) => {
    console.log("Running report:", report.name)
    // Implement report execution logic
  }

  const handleShareReport = (report: Report) => {
    console.log("Sharing report:", report.name)
    // Implement report sharing logic
  }

  const handleDeleteReport = (report: Report) => {
    console.log("Deleting report:", report.name)
    // Implement report deletion logic
  }

  const handleToggleFavorite = (report: Report) => {
    console.log("Toggling favorite for report:", report.name)
    // Implement favorite toggle logic
  }

  
  const handleCreateReport = () => { // erorr in this line 
    console.log("Creating new report:", )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-80 bg-white border-r border-gray-200 p-6 space-y-6">
          {/* Statistics Cards */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-900">Analytics Overview</h2>
            <div className="grid grid-cols-2 gap-3">
              {sampleCharts.slice(0, 4).map((chart) => (
                <ChartComponent key={chart.id} chart={chart} className="h-auto" />
              ))}
            </div>
          </div>

          <Separator />

          {/* Categories */}
          <div className="space-y-3">
            <h3 className="font-semibold text-gray-900">Categories</h3>
            <div className="space-y-2">
              <button
                onClick={() => setSelectedCategory("all")}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                  selectedCategory === "all" ? "bg-blue-100 text-blue-700" : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span>All Reports</span>
                  <Badge variant="secondary">{mockReports.length}</Badge>
                </div>
              </button>
              {reportCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                    selectedCategory === category.id ? "bg-blue-100 text-blue-700" : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className={`w-2 h-2 rounded-full ${category.color}`} />
                      <span>{category.name}</span>
                    </div>
                    <Badge variant="secondary">{category.reportCount}</Badge>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <Separator />

          {/* Recent Activity */}
          <div className="space-y-3">
            <h3 className="font-semibold text-gray-900">Recent Activity</h3>
            <div className="space-y-3">
              {reportStatistics.recentActivity.slice(0, 5).map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3">
                  <div className="p-1 bg-blue-100 rounded-full mt-1">
                    <Play className="h-3 w-3 text-blue-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-900 truncate">{activity.reportName}</p>
                    <p className="text-xs text-gray-500">
                      {activity.type} by {activity.user}
                    </p>
                    <p className="text-xs text-gray-400">{new Date(activity.timestamp).toLocaleDateString()}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          {/* Header */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Reports & Analytics</h1>
                <p className="text-gray-600">Create, manage, and analyze your business reports</p>
              </div>
              <ReportBuilder templates={reportTemplates} onCreateReport={handleCreateReport} />
            </div>

            {/* Filters and Search */}
            <div className="flex items-center space-x-4 mb-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search reports..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="published">Published</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="scheduled">Scheduled</SelectItem>
                  <SelectItem value="archived">Archived</SelectItem>
                </SelectContent>
              </Select>

              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="dashboard">Dashboard</SelectItem>
                  <SelectItem value="standard">Standard</SelectItem>
                  <SelectItem value="scheduled">Scheduled</SelectItem>
                  <SelectItem value="ad-hoc">Ad-hoc</SelectItem>
                </SelectContent>
              </Select>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    <SortAsc className="h-4 w-4 mr-2" />
                    Sort
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setSortBy("name")}>Name</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortBy("updated")}>Last Updated</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortBy("created")}>Created Date</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortBy("views")}>Most Viewed</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortBy("downloads")}>Most Downloaded</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <div className="flex border rounded-lg">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className="rounded-r-none"
                >
                  <Grid3X3 className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className="rounded-l-none"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export Selected
              </Button>
              <Button variant="outline" size="sm">
                <Mail className="h-4 w-4 mr-2" />
                Email Reports
              </Button>
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Manage Templates
              </Button>
            </div>
          </div>

          {/* Reports Grid/List */}
          <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}>
            {filteredReports.map((report) => (
              <ReportCard
                key={report.id}
                report={report}
                onView={handleViewReport}
                onRun={handleRunReport}
                onShare={handleShareReport}
                onDelete={handleDeleteReport}
                onToggleFavorite={handleToggleFavorite}
              />
            ))}
          </div>

          {filteredReports.length === 0 && (
            <div className="text-center py-12">
              <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No reports found</h3>
              <p className="text-gray-600 mb-4">Try adjusting your search criteria or create a new report.</p>
              <ReportBuilder templates={reportTemplates} onCreateReport={handleCreateReport} />
            </div>
          )}
        </div>
      </div>

      {/* Report Viewer Modal */}
      <ReportViewer
        report={selectedReport}
        isOpen={isViewerOpen}
        onClose={() => setIsViewerOpen(false)}
        onRun={handleRunReport}
        onShare={handleShareReport}
      />
    </div>
  )
}
