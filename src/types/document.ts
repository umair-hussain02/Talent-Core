export interface Document {
  id: string
  name: string
  type: DocumentType
  size: number
  mimeType: string
  extension: string
  folderId: string | null
  path: string
  url?: string
  thumbnailUrl?: string
  description?: string
  tags: string[]
  status: DocumentStatus
  visibility: DocumentVisibility
  createdAt: Date
  updatedAt: Date
  createdBy: string
  updatedBy: string
  owner: DocumentUser
  collaborators: DocumentCollaborator[]
  versions: DocumentVersion[]
  downloads: number
  views: number
  isFavorite: boolean
  isLocked: boolean
  lockExpiry?: Date
  metadata?: DocumentMetadata
}

export interface DocumentFolder {
  id: string
  name: string
  parentId: string | null
  path: string
  description?: string
  color?: string
  icon?: string
  createdAt: Date
  updatedAt: Date
  createdBy: string
  documentsCount: number
  subFoldersCount: number
  size: number
  permissions: FolderPermission[]
}

export interface DocumentUser {
  id: string
  name: string
  email: string
  avatar?: string
  role: string
  department: string
}

export interface DocumentCollaborator {
  user: DocumentUser
  permission: DocumentPermission
  addedAt: Date
  addedBy: string
}

export interface DocumentVersion {
  id: string
  version: string
  size: number
  url: string
  createdAt: Date
  createdBy: string
  changelog?: string
  isCurrent: boolean
}

export interface DocumentMetadata {
  author?: string
  subject?: string
  keywords?: string[]
  pageCount?: number
  wordCount?: number
  language?: string
  lastPrintedAt?: Date
  revisionNumber?: number
}

export interface FolderPermission {
  userId: string
  permission: DocumentPermission
  inheritFromParent: boolean
}

export interface DocumentActivity {
  id: string
  documentId: string
  userId: string
  user: DocumentUser
  action: DocumentAction
  details?: string
  timestamp: Date
  ipAddress?: string
}

export interface DocumentStats {
  totalDocuments: number
  totalSize: number
  totalFolders: number
  recentUploads: number
  sharedDocuments: number
  favoriteDocuments: number
  documentsInReview: number
  archivedDocuments: number
}

export type DocumentType = 
  | 'pdf' 
  | 'doc' 
  | 'docx' 
  | 'xls' 
  | 'xlsx' 
  | 'ppt' 
  | 'pptx' 
  | 'txt' 
  | 'image' 
  | 'video' 
  | 'audio' 
  | 'archive' 
  | 'other'

export type DocumentStatus = 
  | 'draft' 
  | 'review' 
  | 'approved' 
  | 'published' 
  | 'archived' 
  | 'deleted'

export type DocumentVisibility = 
  | 'private' 
  | 'internal' 
  | 'public' 
  | 'restricted'

export type DocumentPermission = 
  | 'view' 
  | 'comment' 
  | 'edit' 
  | 'admin'

export type DocumentAction = 
  | 'created' 
  | 'viewed' 
  | 'downloaded' 
  | 'edited' 
  | 'shared' 
  | 'commented' 
  | 'moved' 
  | 'renamed' 
  | 'deleted' 
  | 'restored' 
  | 'version_created'

export type DocumentSortBy = 
  | 'name' 
  | 'size' 
  | 'type' 
  | 'created' 
  | 'updated' 
  | 'downloads' 
  | 'views'

export type DocumentViewMode = 
  | 'grid' 
  | 'list' 
  | 'table'
