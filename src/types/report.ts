export interface Report {
  id: string
  name: string
  description: string
  category: ReportCategory
  type: ReportType
  status: ReportStatus
  createdBy: ReportUser
  createdAt: string
  updatedAt: string
  lastRun?: string
  nextRun?: string
  schedule?: ReportSchedule
  parameters: ReportParameter[]
  dataSource: string[]
  exportFormats: ExportFormat[]
  isPublic: boolean
  isFavorite: boolean
  tags: string[]
  views: number
  downloads: number
  size?: string
  thumbnail?: string
  permissions: ReportPermission[]
  charts: ChartConfig[]
}

export interface ReportCategory {
  id: string
  name: string
  description: string
  color: string
  icon: string
  reportCount: number
}

export interface ReportUser {
  id: string
  name: string
  email: string
  avatar: string
  department: string
  role: string
}

export interface ReportSchedule {
  frequency: 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'yearly'
  time: string
  timezone: string
  recipients: string[]
  format: ExportFormat
  isActive: boolean
}

export interface ReportParameter {
  id: string
  name: string
  type: 'text' | 'number' | 'date' | 'select' | 'multiselect' | 'boolean'
  label: string
  required: boolean
  defaultValue?: any
  options?: { label: string; value: any }[]
  validation?: {
    min?: number
    max?: number
    pattern?: string
  }
}

export interface ChartConfig {
  id: string
  type: 'bar' | 'line' | 'pie' | 'doughnut' | 'area' | 'scatter' | 'table'
  title: string
  data: any[]
  options: any
  position: { x: number; y: number; width: number; height: number }
}

export interface ReportPermission {
  userId: string
  role: 'viewer' | 'editor' | 'admin'
  grantedBy: string
  grantedAt: string
}

export interface ReportTemplate {
  id: string
  name: string
  description: string
  category: string
  thumbnail: string
  parameters: ReportParameter[]
  charts: ChartConfig[]
  isPopular: boolean
}

export interface ReportExecution {
  id: string
  reportId: string
  executedBy: string
  executedAt: string
  status: 'running' | 'completed' | 'failed'
  duration: number
  recordCount: number
  fileSize: string
  downloadUrl?: string
  error?: string
}

export interface ReportStatistics {
  totalReports: number
  scheduledReports: number
  reportsThisMonth: number
  totalDownloads: number
  avgExecutionTime: number
  popularCategories: { name: string; count: number }[]
  recentActivity: ReportActivity[]
}

export interface ReportActivity {
  id: string
  type: 'created' | 'updated' | 'executed' | 'shared' | 'deleted'
  reportName: string
  user: string
  timestamp: string
  details?: string
}

export type ReportType = 'standard' | 'dashboard' | 'scheduled' | 'ad-hoc' | 'template'
export type ReportStatus = 'draft' | 'published' | 'archived' | 'scheduled'
export type ExportFormat = 'pdf' | 'excel' | 'csv' | 'powerpoint' | 'json'
