"use client"

import { useState } from "react"
import type { Report } from "@/types/report"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Download, Share2, Play, Edit, Calendar, Clock, Users, FileText, BarChart3, Eye, History } from "lucide-react"

interface ReportViewerProps {
  report: Report | null
  isOpen: boolean
  onClose: () => void
  onEdit?: (report: Report) => void
  onRun?: (report: Report) => void
  onShare?: (report: Report) => void
}

export function ReportViewer({ report, isOpen, onClose, onEdit, onRun, onShare }: ReportViewerProps) {
  const [activeTab, setActiveTab] = useState("preview")

  if (!report) return null

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

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader className="flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <BarChart3 className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <DialogTitle className="text-xl">{report.name}</DialogTitle>
                <DialogDescription className="mt-1">{report.description}</DialogDescription>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="outline" className={getStatusColor(report.status)}>
                {report.status}
              </Badge>
              <Badge variant="outline">{report.type}</Badge>
            </div>
          </div>

          <div className="flex items-center justify-between pt-4">
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <div className="flex items-center space-x-1">
                <Eye className="h-4 w-4" />
                <span>{report.views} views</span>
              </div>
              <div className="flex items-center space-x-1">
                <Download className="h-4 w-4" />
                <span>{report.downloads} downloads</span>
              </div>
              {report.size && (
                <div className="flex items-center space-x-1">
                  <FileText className="h-4 w-4" />
                  <span>{report.size}</span>
                </div>
              )}
            </div>

            <div className="flex space-x-2">
              <Button variant="outline" size="sm" onClick={() => onShare?.(report)}>
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
              <Button variant="outline" size="sm" onClick={() => onEdit?.(report)}>
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </Button>
              <Button size="sm" onClick={() => onRun?.(report)}>
                <Play className="h-4 w-4 mr-2" />
                Run Report
              </Button>
            </div>
          </div>
        </DialogHeader>

        <div className="flex-1 overflow-hidden">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full flex flex-col">
            <TabsList className="grid w-full grid-cols-4 flex-shrink-0">
              <TabsTrigger value="preview">Preview</TabsTrigger>
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="collaborators">Collaborators</TabsTrigger>
              <TabsTrigger value="history">History</TabsTrigger>
            </TabsList>

            <div className="flex-1 overflow-y-auto mt-4">
              <TabsContent value="preview" className="mt-0">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <BarChart3 className="h-5 w-5" />
                      <span>Report Preview</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {report.thumbnail && (
                        <div className="w-full h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                          <img
                            src={report.thumbnail || "/placeholder.svg"}
                            alt="Report preview"
                            className="max-w-full max-h-full object-contain"
                          />
                        </div>
                      )}

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {report.charts.map((chart) => (
                          <Card key={chart.id} className="border-dashed">
                            <CardContent className="p-4">
                              <div className="h-32 bg-gray-50 rounded flex items-center justify-center">
                                <div className="text-center text-gray-500">
                                  <BarChart3 className="h-8 w-8 mx-auto mb-2" />
                                  <p className="text-sm">{chart.title}</p>
                                  <p className="text-xs">{chart.type} chart</p>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="details" className="mt-0">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Report Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <label className="text-sm font-medium text-gray-500">Category</label>
                        <p className="text-sm">{report.category.name}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500">Data Sources</label>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {report.dataSource.map((source) => (
                            <Badge key={source} variant="secondary" className="text-xs">
                              {source}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500">Export Formats</label>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {report.exportFormats.map((format) => (
                            <Badge key={format} variant="outline" className="text-xs">
                              {format.toUpperCase()}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500">Tags</label>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {report.tags.map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Schedule & Automation</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {report.schedule ? (
                        <>
                          <div>
                            <label className="text-sm font-medium text-gray-500">Frequency</label>
                            <p className="text-sm capitalize">{report.schedule.frequency}</p>
                          </div>
                          <div>
                            <label className="text-sm font-medium text-gray-500">Time</label>
                            <p className="text-sm">
                              {report.schedule.time} {report.schedule.timezone}
                            </p>
                          </div>
                          <div>
                            <label className="text-sm font-medium text-gray-500">Recipients</label>
                            <div className="space-y-1 mt-1">
                              {report.schedule.recipients.map((recipient) => (
                                <p key={recipient} className="text-sm">
                                  {recipient}
                                </p>
                              ))}
                            </div>
                          </div>
                          <div>
                            <label className="text-sm font-medium text-gray-500">Status</label>
                            <Badge variant={report.schedule.isActive ? "default" : "secondary"} className="ml-2">
                              {report.schedule.isActive ? "Active" : "Inactive"}
                            </Badge>
                          </div>
                        </>
                      ) : (
                        <p className="text-sm text-gray-500">No schedule configured</p>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="collaborators" className="mt-0">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Users className="h-5 w-5" />
                      <span>Report Access & Permissions</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Avatar>
                            <AvatarImage src={report.createdBy.avatar || "/placeholder.svg"} />
                            <AvatarFallback>
                              {report.createdBy.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{report.createdBy.name}</p>
                            <p className="text-sm text-gray-500">{report.createdBy.email}</p>
                          </div>
                        </div>
                        <Badge variant="default">Owner</Badge>
                      </div>

                      <Separator />

                      {report.permissions.map((permission) => (
                        <div key={permission.userId} className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <Avatar>
                              <AvatarFallback>U</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">User {permission.userId}</p>
                              <p className="text-sm text-gray-500">
                                Added {new Date(permission.grantedAt).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                          <Badge variant="outline" className="capitalize">
                            {permission.role}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="history" className="mt-0">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <History className="h-5 w-5" />
                      <span>Execution History</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {report.lastRun && (
                        <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <div className="p-2 bg-green-100 rounded-full">
                              <Play className="h-4 w-4 text-green-600" />
                            </div>
                            <div>
                              <p className="font-medium">Last Execution</p>
                              <p className="text-sm text-gray-500">{new Date(report.lastRun).toLocaleString()}</p>
                            </div>
                          </div>
                          <Badge variant="outline" className="bg-green-100 text-green-800">
                            Completed
                          </Badge>
                        </div>
                      )}

                      {report.nextRun && (
                        <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <div className="p-2 bg-blue-100 rounded-full">
                              <Calendar className="h-4 w-4 text-blue-600" />
                            </div>
                            <div>
                              <p className="font-medium">Next Scheduled Run</p>
                              <p className="text-sm text-gray-500">{new Date(report.nextRun).toLocaleString()}</p>
                            </div>
                          </div>
                          <Badge variant="outline" className="bg-blue-100 text-blue-800">
                            Scheduled
                          </Badge>
                        </div>
                      )}

                      <div className="text-center py-8 text-gray-500">
                        <Clock className="h-8 w-8 mx-auto mb-2 opacity-50" />
                        <p>No additional execution history available</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  )
}
