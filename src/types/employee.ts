export interface Employee {
  id: string
  name: string
  avatar: string
  position: string
  department: string
  email: string
  phone?: string
  location: string
  startDate: string
  skills: string[]
  bio?: string
  manager?: string // ID of the manager
  directReports?: string[] // IDs of direct reports
  socialLinks?: {
    linkedin?: string
    twitter?: string
    github?: string
  }
  status: "active" | "on_leave" | "remote" | "contract"
  projects?: string[]
  officeHours?: string
  timeZone?: string
  languages?: string[]
  pronouns?: string
}

export interface Department {
  id: string
  name: string
  description: string
  headCount: number
  leadId: string // ID of the department head
}

export interface Office {
  id: string
  name: string
  address: string
  city: string
  country: string
  phone: string
  email: string
  timezone: string
  headCount: number
}

export interface EmployeeStats {
  total: number
  active: number
  onLeave: number
  remote: number
  contract: number
  newHires: number // Joined in the last 30 days
  departmentDistribution: Record<string, number>
  locationDistribution: Record<string, number>
}
