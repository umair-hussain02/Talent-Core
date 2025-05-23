"use client"

import { useState, useMemo } from "react"
import {
  Search,
  Users,
  UserPlus,
  Building,
  MapPin,
  Grid,
  List,
  Network,
  X,
  Download,
  Mail,
  Phone,
  Calendar,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { EmployeeCard } from "@/components/employees/employee-card"
import { EmployeeDetail } from "@/components/employees/employee-detail"
import { OrgChart } from "@/components/org-chart"
import { mockEmployees, mockDepartments, mockOffices, mockEmployeeStats } from "@/data/mockEmployees"
import type { Employee } from "@/types/employee"

export default function EmployeesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [departmentFilter, setDepartmentFilter] = useState("all")
  const [locationFilter, setLocationFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [viewMode, setViewMode] = useState<"grid" | "list" | "org">("grid")
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null)

  // Filter employees based on search and filters
  const filteredEmployees = useMemo(() => {
    return mockEmployees.filter((employee) => {
      const matchesSearch =
        employee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        employee.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
        employee.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
        employee.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        employee.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        employee.skills.some((skill) => skill.toLowerCase().includes(searchQuery.toLowerCase()))

      const matchesDepartment = departmentFilter === "all" || employee.department === departmentFilter
      const matchesLocation = locationFilter === "all" || employee.location === locationFilter
      const matchesStatus = statusFilter === "all" || employee.status === statusFilter

      return matchesSearch && matchesDepartment && matchesLocation && matchesStatus
    })
  }, [searchQuery, departmentFilter, locationFilter, statusFilter])

  const handleEmployeeClick = (employee: Employee) => {
    setSelectedEmployee(employee)
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

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

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6 mt-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Employees</h1>
          <p className="text-gray-600 mt-1">Manage and view employee information</p>
        </div>
        <Button className="bg-purple-500 hover:bg-purple-600">
          <UserPlus className="h-4 w-4 mr-2" />
          Add Employee
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Employees</p>
                <p className="text-2xl font-bold text-gray-900">{mockEmployeeStats.total}</p>
              </div>
              <div className="bg-purple-100 p-2 rounded-full">
                <Users className="h-5 w-5 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Departments</p>
                <p className="text-2xl font-bold text-gray-900">{mockDepartments.length}</p>
              </div>
              <div className="bg-blue-100 p-2 rounded-full">
                <Building className="h-5 w-5 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Locations</p>
                <p className="text-2xl font-bold text-gray-900">{mockOffices.length}</p>
              </div>
              <div className="bg-green-100 p-2 rounded-full">
                <MapPin className="h-5 w-5 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <div>
                <p className="text-sm text-gray-600">New Hires</p>
                <p className="text-2xl font-bold text-gray-900">{mockEmployeeStats.newHires}</p>
              </div>
              <div className="bg-amber-100 p-2 rounded-full">
                <Calendar className="h-5 w-5 text-amber-600" />
              </div>
            </div>
            <div className="text-xs text-gray-500">Last 30 days</div>
          </CardContent>
        </Card>
      </div>

      {/* Department Distribution */}
      <Card className="mb-6">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Department Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {mockDepartments.map((dept) => (
              <div key={dept.id} className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="font-medium">{dept.name}</span>
                  <span className="text-gray-500">
                    {dept.headCount} ({Math.round((dept.headCount / mockEmployeeStats.total) * 100)}%)
                  </span>
                </div>
                <Progress value={(dept.headCount / mockEmployeeStats.total) * 100} className="h-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Filters and Search */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search employees by name, position, or skills..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  {mockDepartments.map((dept) => (
                    <SelectItem key={dept.id} value={dept.name}>
                      {dept.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={locationFilter} onValueChange={setLocationFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Locations</SelectItem>
                  {mockOffices.map((office) => (
                    <SelectItem key={office.id} value={office.name}>
                      {office.name}
                    </SelectItem>
                  ))}
                  <SelectItem value="Remote">Remote</SelectItem>
                </SelectContent>
              </Select>

              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="on_leave">On Leave</SelectItem>
                  <SelectItem value="remote">Remote</SelectItem>
                  <SelectItem value="contract">Contract</SelectItem>
                </SelectContent>
              </Select>

              <Tabs value={viewMode} onValueChange={(value) => setViewMode(value as "grid" | "list" | "org")}>
                <TabsList className="grid w-[180px] grid-cols-3">
                  <TabsTrigger value="grid">
                    <Grid className="h-4 w-4 mr-2" />
                    Grid
                  </TabsTrigger>
                  <TabsTrigger value="list">
                    <List className="h-4 w-4 mr-2" />
                    List
                  </TabsTrigger>
                  <TabsTrigger value="org">
                    <Network className="h-4 w-4 mr-2" />
                    Org
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>

          {(departmentFilter !== "all" || locationFilter !== "all" || statusFilter !== "all" || searchQuery) && (
            <div className="flex flex-wrap gap-2 mt-4">
              {departmentFilter !== "all" && (
                <Badge variant="secondary" className="gap-1">
                  Department: {departmentFilter}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-4 w-4 p-0 ml-1"
                    onClick={() => setDepartmentFilter("all")}
                  >
                    <X className="h-3 w-3" />
                    <span className="sr-only">Remove filter</span>
                  </Button>
                </Badge>
              )}
              {locationFilter !== "all" && (
                <Badge variant="secondary" className="gap-1">
                  Location: {locationFilter}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-4 w-4 p-0 ml-1"
                    onClick={() => setLocationFilter("all")}
                  >
                    <X className="h-3 w-3" />
                    <span className="sr-only">Remove filter</span>
                  </Button>
                </Badge>
              )}
              {statusFilter !== "all" && (
                <Badge variant="secondary" className="gap-1">
                  Status:{" "}
                  {statusFilter === "on_leave"
                    ? "On Leave"
                    : statusFilter.charAt(0).toUpperCase() + statusFilter.slice(1)}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-4 w-4 p-0 ml-1"
                    onClick={() => setStatusFilter("all")}
                  >
                    <X className="h-3 w-3" />
                    <span className="sr-only">Remove filter</span>
                  </Button>
                </Badge>
              )}
              {searchQuery && (
                <Badge variant="secondary" className="gap-1">
                  Search: {searchQuery}
                  <Button variant="ghost" size="icon" className="h-4 w-4 p-0 ml-1" onClick={() => setSearchQuery("")}>
                    <X className="h-3 w-3" />
                    <span className="sr-only">Clear search</span>
                  </Button>
                </Badge>
              )}
              <Button
                variant="ghost"
                size="sm"
                className="text-sm h-7"
                onClick={() => {
                  setDepartmentFilter("all")
                  setLocationFilter("all")
                  setStatusFilter("all")
                  setSearchQuery("")
                }}
              >
                Clear All
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Results Count */}
      <div className="mb-4 flex justify-between items-center">
        <p className="text-sm text-gray-600">
          Showing {filteredEmployees.length} of {mockEmployees.length} employees
        </p>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
          <Button variant="outline" size="sm" className="gap-2">
            <Mail className="h-4 w-4" />
            Email All
          </Button>
        </div>
      </div>

      {/* Employees Display */}
      {viewMode === "grid" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredEmployees.map((employee) => (
            <EmployeeCard key={employee.id} employee={employee} onClick={handleEmployeeClick} />
          ))}
        </div>
      )}

      {viewMode === "list" && (
        <div className="space-y-2">
          {filteredEmployees.map((employee) => (
            <Card
              key={employee.id}
              className="hover:shadow-md transition-all duration-200 cursor-pointer"
              onClick={() => handleEmployeeClick(employee)}
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 flex-1">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={employee.avatar || "/placeholder.svg"} alt={employee.name} />
                      <AvatarFallback>{getInitials(employee.name)}</AvatarFallback>
                    </Avatar>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="font-semibold text-gray-900">{employee.name}</h3>
                        <Badge variant="outline" className={getStatusColor(employee.status)}>
                          {employee.status === "on_leave"
                            ? "On Leave"
                            : employee.status.charAt(0).toUpperCase() + employee.status.slice(1)}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span>{employee.position}</span>
                        <span>•</span>
                        <span>{employee.department}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-6">
                    <div className="text-sm text-gray-600 hidden md:block">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-gray-400" />
                        <span>{employee.location}</span>
                      </div>
                    </div>
                    <div className="text-sm text-gray-600 hidden lg:block">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-gray-400" />
                        <span>Joined {formatDate(employee.startDate)}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
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
                      {employee.phone && (
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={(e) => {
                            e.stopPropagation()
                            window.location.href = `tel:${employee.phone}`
                          }}
                        >
                          <Phone className="h-4 w-4" />
                          <span className="sr-only">Call</span>
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {viewMode === "org" && <OrgChart employees={mockEmployees} onEmployeeClick={handleEmployeeClick} />}

      {filteredEmployees.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No employees found</h3>
            <p className="text-gray-600 mb-4">Try adjusting your search criteria or filters</p>
            <Button className="bg-purple-500 hover:bg-purple-600">
              <UserPlus className="h-4 w-4 mr-2" />
              Add Employee
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Employee Detail Dialog */}
      <Dialog open={!!selectedEmployee} onOpenChange={(open) => !open && setSelectedEmployee(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="sr-only">Employee Details</DialogTitle>
          </DialogHeader>
          {selectedEmployee && (
            <EmployeeDetail
              employee={selectedEmployee}
              allEmployees={mockEmployees}
              onEmployeeClick={handleEmployeeClick}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
