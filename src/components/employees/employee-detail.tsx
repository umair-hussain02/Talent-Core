"use client"

import { useState } from "react"
import {
  Mail,
  Phone,
  MapPin,
  Calendar,
  Clock,
  Globe,
  Briefcase,
  Users,
  MessageSquare,
  FileText,
  ChevronRight,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { EmployeeCard } from "./employee-card"
import type { Employee } from "@/types/employee"

interface EmployeeDetailProps {
  employee: Employee
  allEmployees: Employee[]
  onEmployeeClick?: (employee: Employee) => void
}

export function EmployeeDetail({ employee, allEmployees, onEmployeeClick }: EmployeeDetailProps) {
  const [activeTab, setActiveTab] = useState("overview")

  const getStatusColor = (status: Employee["status"]) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-700 border-green-200"
      case "on_leave":
        return "bg-amber-100 text-amber-700 border-amber-200"
      case "remote":
        return "bg-blue-100 text-blue-700 border-blue-200"
      case "contract":
        return "bg-purple-100 text-purple-700 border-purple-200"
      default:
        return "bg-gray-100 text-gray-700 border-gray-200"
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  const getManager = () => {
    if (!employee.manager) return null
    return allEmployees.find((emp) => emp.id === employee.manager)
  }

  const getDirectReports = () => {
    if (!employee.directReports || employee.directReports.length === 0) return []
    return allEmployees.filter((emp) => employee.directReports?.includes(emp.id))
  }

  const manager = getManager()
  const directReports = getDirectReports()

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex flex-col items-center text-center md:items-start md:text-left">
              <Avatar className="h-32 w-32 mb-4">
                <AvatarImage src={employee.avatar || "/placeholder.svg"} alt={employee.name} />
                <AvatarFallback className="text-2xl">{getInitials(employee.name)}</AvatarFallback>
              </Avatar>
              <div className="space-y-1">
                <h2 className="text-2xl font-bold text-gray-900">{employee.name}</h2>
                <p className="text-lg text-gray-600">{employee.position}</p>
                <p className="text-gray-500">{employee.department}</p>
                <div className="flex items-center gap-2 mt-2">
                  <Badge variant="outline" className={getStatusColor(employee.status)}>
                    {employee.status === "on_leave"
                      ? "On Leave"
                      : employee.status.charAt(0).toUpperCase() + employee.status.slice(1)}
                  </Badge>
                  {employee.pronouns && (
                    <Badge variant="outline" className="bg-gray-100 text-gray-700 border-gray-200">
                      {employee.pronouns}
                    </Badge>
                  )}
                </div>
              </div>
            </div>

            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="bg-gray-100 p-2 rounded-full">
                    <Mail className="h-5 w-5 text-gray-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium text-gray-900">{employee.email}</p>
                  </div>
                </div>
                {employee.phone && (
                  <div className="flex items-center gap-3">
                    <div className="bg-gray-100 p-2 rounded-full">
                      <Phone className="h-5 w-5 text-gray-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Phone</p>
                      <p className="font-medium text-gray-900">{employee.phone}</p>
                    </div>
                  </div>
                )}
                <div className="flex items-center gap-3">
                  <div className="bg-gray-100 p-2 rounded-full">
                    <MapPin className="h-5 w-5 text-gray-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Location</p>
                    <p className="font-medium text-gray-900">{employee.location}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-gray-100 p-2 rounded-full">
                    <Calendar className="h-5 w-5 text-gray-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Start Date</p>
                    <p className="font-medium text-gray-900">{formatDate(employee.startDate)}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                {employee.timeZone && (
                  <div className="flex items-center gap-3">
                    <div className="bg-gray-100 p-2 rounded-full">
                      <Clock className="h-5 w-5 text-gray-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Time Zone</p>
                      <p className="font-medium text-gray-900">{employee.timeZone.replace("_", " ")}</p>
                    </div>
                  </div>
                )}
                {employee.languages && employee.languages.length > 0 && (
                  <div className="flex items-center gap-3">
                    <div className="bg-gray-100 p-2 rounded-full">
                      <Globe className="h-5 w-5 text-gray-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Languages</p>
                      <p className="font-medium text-gray-900">{employee.languages.join(", ")}</p>
                    </div>
                  </div>
                )}
                {employee.officeHours && (
                  <div className="flex items-center gap-3">
                    <div className="bg-gray-100 p-2 rounded-full">
                      <Clock className="h-5 w-5 text-gray-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Office Hours</p>
                      <p className="font-medium text-gray-900">{employee.officeHours}</p>
                    </div>
                  </div>
                )}
                {manager && (
                  <div className="flex items-center gap-3">
                    <div className="bg-gray-100 p-2 rounded-full">
                      <Briefcase className="h-5 w-5 text-gray-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Reports To</p>
                      <Button
                        variant="link"
                        className="font-medium text-purple-600 p-0 h-auto"
                        onClick={() => onEmployeeClick?.(manager)}
                      >
                        {manager.name}
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mt-6">
            {employee.socialLinks?.linkedin && (
              <Button
                variant="outline"
                size="sm"
                className="gap-2"
                onClick={() => window.open(`https://${employee.socialLinks?.linkedin}`, "_blank")}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-[#0A66C2]"
                >
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect width="4" height="12" x="2" y="9" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
                LinkedIn
              </Button>
            )}
            {employee.socialLinks?.github && (
              <Button
                variant="outline"
                size="sm"
                className="gap-2"
                onClick={() => window.open(`https://${employee.socialLinks?.github}`, "_blank")}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-[#333]"
                >
                  <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                  <path d="M9 18c-4.51 2-5-2-7-2" />
                </svg>
                GitHub
              </Button>
            )}
            {employee.socialLinks?.twitter && (
              <Button
                variant="outline"
                size="sm"
                className="gap-2"
                onClick={() => window.open(`https://${employee.socialLinks?.twitter}`, "_blank")}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-[#1DA1F2]"
                >
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                </svg>
                Twitter
              </Button>
            )}
            <Button
              variant="outline"
              size="sm"
              className="gap-2"
              onClick={() => (window.location.href = `mailto:${employee.email}`)}
            >
              <Mail className="h-4 w-4" />
              Email
            </Button>
            {employee.phone && (
              <Button
                variant="outline"
                size="sm"
                className="gap-2"
                onClick={() => (window.location.href = `tel:${employee.phone}`)}
              >
                <Phone className="h-4 w-4" />
                Call
              </Button>
            )}
            <Button variant="outline" size="sm" className="gap-2">
              <MessageSquare className="h-4 w-4" />
              Message
            </Button>
          </div>
        </CardContent>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="team">Team</TabsTrigger>
          <TabsTrigger value="projects">Projects</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-6">
              {employee.bio && (
                <Card>
                  <CardHeader>
                    <CardTitle>About</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700">{employee.bio}</p>
                  </CardContent>
                </Card>
              )}

              {employee.skills && employee.skills.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Skills & Expertise</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {employee.skills.map((skill) => (
                        <Badge key={skill} variant="secondary" className="text-sm">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            <div className="space-y-6">
              {employee.projects && employee.projects.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Current Projects</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {employee.projects.map((project) => (
                        <li key={project} className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-gray-400" />
                          <span>{project}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}

              {directReports.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Team Size</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-2 text-2xl font-bold text-gray-900">
                      <Users className="h-6 w-6 text-gray-400" />
                      <span>{directReports.length}</span>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">Direct reports</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="team" className="mt-6">
          {manager && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-4">Reports To</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                <EmployeeCard employee={manager} onClick={onEmployeeClick} />
              </div>
            </div>
          )}

          {directReports.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-4">Direct Reports ({directReports.length})</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {directReports.map((report) => (
                  <EmployeeCard key={report.id} employee={report} onClick={onEmployeeClick} />
                ))}
              </div>
            </div>
          )}

          {!manager && directReports.length === 0 && (
            <Card>
              <CardContent className="p-6 text-center">
                <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No Team Information</h3>
                <p className="text-gray-600">This employee doesn't have any manager or direct reports assigned.</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="projects" className="mt-6">
          {employee.projects && employee.projects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {employee.projects.map((project) => (
                <Card key={project}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="bg-purple-100 p-2 rounded-full">
                          <FileText className="h-5 w-5 text-purple-600" />
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">{project}</h3>
                          <p className="text-sm text-gray-500">Active Project</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="icon">
                        <ChevronRight className="h-5 w-5" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="p-6 text-center">
                <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No Projects</h3>
                <p className="text-gray-600">This employee doesn't have any projects assigned.</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
