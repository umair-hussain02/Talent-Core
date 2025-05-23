"use client"

import { Mail, Phone, MapPin, Calendar } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import type { Employee } from "@/types/employee"

interface EmployeeCardProps {
  employee: Employee
  onClick?: (employee: Employee) => void
  variant?: "default" | "compact"
}

export function EmployeeCard({ employee, onClick, variant = "default" }: EmployeeCardProps) {
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

  if (variant === "compact") {
    return (
      <Card
        className="hover:shadow-md transition-all duration-200 cursor-pointer h-full"
        onClick={() => onClick?.(employee)}
      >
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={employee.avatar || "/placeholder.svg"} alt={employee.name} />
              <AvatarFallback>{getInitials(employee.name)}</AvatarFallback>
            </Avatar>
            <div className="min-w-0">
              <h3 className="font-medium text-gray-900 truncate">{employee.name}</h3>
              <p className="text-sm text-gray-500 truncate">{employee.position}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card
      className="hover:shadow-md transition-all duration-200 cursor-pointer h-full"
      onClick={() => onClick?.(employee)}
    >
      <CardHeader className="p-4 pb-0 flex justify-between">
        <div className="flex items-center justify-between w-full">
          <Badge variant="outline" className={getStatusColor(employee.status)}>
            {employee.status === "on_leave"
              ? "On Leave"
              : employee.status.charAt(0).toUpperCase() + employee.status.slice(1)}
          </Badge>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={(e) => {
                    e.stopPropagation()
                    window.location.href = `mailto:${employee.email}`
                  }}
                >
                  <Mail className="h-4 w-4" />
                  <span className="sr-only">Email</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Email {employee.name}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="flex flex-col items-center text-center mb-4">
          <Avatar className="h-24 w-24 mb-3">
            <AvatarImage src={employee.avatar || "/placeholder.svg"} alt={employee.name} />
            <AvatarFallback className="text-lg">{getInitials(employee.name)}</AvatarFallback>
          </Avatar>
          <h3 className="font-semibold text-lg text-gray-900">{employee.name}</h3>
          <p className="text-gray-600">{employee.position}</p>
          <p className="text-sm text-gray-500">{employee.department}</p>
        </div>

        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2 text-gray-600">
            <MapPin className="h-4 w-4 text-gray-400" />
            <span>{employee.location}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <Mail className="h-4 w-4 text-gray-400" />
            <span className="truncate">{employee.email}</span>
          </div>
          {employee.phone && (
            <div className="flex items-center gap-2 text-gray-600">
              <Phone className="h-4 w-4 text-gray-400" />
              <span>{employee.phone}</span>
            </div>
          )}
          <div className="flex items-center gap-2 text-gray-600">
            <Calendar className="h-4 w-4 text-gray-400" />
            <span>Joined {formatDate(employee.startDate)}</span>
          </div>
        </div>

        {employee.skills && employee.skills.length > 0 && (
          <div className="mt-4">
            <div className="flex flex-wrap gap-1">
              {employee.skills.slice(0, 3).map((skill) => (
                <Badge key={skill} variant="outline" className="bg-gray-50 text-gray-700 text-xs">
                  {skill}
                </Badge>
              ))}
              {employee.skills.length > 3 && (
                <Badge variant="outline" className="bg-gray-50 text-gray-700 text-xs">
                  +{employee.skills.length - 3}
                </Badge>
              )}
            </div>
          </div>
        )}

        {employee.socialLinks && Object.values(employee.socialLinks).some(Boolean) && (
          <div className="mt-4 flex justify-center gap-2">
            {employee.socialLinks.linkedin && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 rounded-full"
                      onClick={(e) => {
                        e.stopPropagation()
                        window.open(`https://${employee.socialLinks?.linkedin}`, "_blank")
                      }}
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
                      <span className="sr-only">LinkedIn</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>LinkedIn Profile</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
            {employee.socialLinks.github && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 rounded-full"
                      onClick={(e) => {
                        e.stopPropagation()
                        window.open(`https://${employee.socialLinks?.github}`, "_blank")
                      }}
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
                      <span className="sr-only">GitHub</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>GitHub Profile</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
            {employee.socialLinks.twitter && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 rounded-full"
                      onClick={(e) => {
                        e.stopPropagation()
                        window.open(`https://${employee.socialLinks?.twitter}`, "_blank")
                      }}
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
                      <span className="sr-only">Twitter</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Twitter Profile</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
