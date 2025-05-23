import { Document, DocumentFolder, DocumentUser, DocumentStats, DocumentActivity } from '@/types/document'

export const mockUsers: DocumentUser[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@talentcore.com',
    avatar: '/placeholder.svg?height=40&width=40',
    role: 'HR Manager',
    department: 'Human Resources'
  },
  {
    id: '2',
    name: 'Michael Chen',
    email: 'michael.chen@talentcore.com',
    avatar: '/placeholder.svg?height=40&width=40',
    role: 'Senior Developer',
    department: 'Engineering'
  },
  {
    id: '3',
    name: 'Emily Davis',
    email: 'emily.davis@talentcore.com',
    avatar: '/placeholder.svg?height=40&width=40',
    role: 'Legal Counsel',
    department: 'Legal'
  },
  {
    id: '4',
    name: 'David Wilson',
    email: 'david.wilson@talentcore.com',
    avatar: '/placeholder.svg?height=40&width=40',
    role: 'Finance Director',
    department: 'Finance'
  },
  {
    id: '5',
    name: 'Lisa Anderson',
    email: 'lisa.anderson@talentcore.com',
    avatar: '/placeholder.svg?height=40&width=40',
    role: 'Marketing Manager',
    department: 'Marketing'
  }
]

export const mockFolders: DocumentFolder[] = [
  {
    id: 'folder-1',
    name: 'HR Policies',
    parentId: null,
    path: '/HR Policies',
    description: 'Company policies and procedures',
    color: '#3B82F6',
    icon: 'Users',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-20'),
    createdBy: '1',
    documentsCount: 12,
    subFoldersCount: 3,
    size: 15728640,
    permissions: []
  },
  {
    id: 'folder-2',
    name: 'Employee Handbook',
    parentId: 'folder-1',
    path: '/HR Policies/Employee Handbook',
    description: 'Employee guidelines and handbook',
    color: '#10B981',
    icon: 'Book',
    createdAt: new Date('2024-01-16'),
    updatedAt: new Date('2024-01-18'),
    createdBy: '1',
    documentsCount: 5,
    subFoldersCount: 0,
    size: 8388608,
    permissions: []
  },
  {
    id: 'folder-3',
    name: 'Legal Documents',
    parentId: null,
    path: '/Legal Documents',
    description: 'Contracts, agreements, and legal files',
    color: '#8B5CF6',
    icon: 'Scale',
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-25'),
    createdBy: '3',
    documentsCount: 8,
    subFoldersCount: 2,
    size: 25165824,
    permissions: []
  },
  {
    id: 'folder-4',
    name: 'Financial Reports',
    parentId: null,
    path: '/Financial Reports',
    description: 'Financial statements and reports',
    color: '#F59E0B',
    icon: 'TrendingUp',
    createdAt: new Date('2024-01-12'),
    updatedAt: new Date('2024-01-22'),
    createdBy: '4',
    documentsCount: 15,
    subFoldersCount: 4,
    size: 31457280,
    permissions: []
  },
  {
    id: 'folder-5',
    name: 'Marketing Materials',
    parentId: null,
    path: '/Marketing Materials',
    description: 'Branding, campaigns, and marketing assets',
    color: '#EF4444',
    icon: 'Megaphone',
    createdAt: new Date('2024-01-14'),
    updatedAt: new Date('2024-01-24'),
    createdBy: '5',
    documentsCount: 20,
    subFoldersCount: 5,
    size: 52428800,
    permissions: []
  },
  {
    id: 'folder-6',
    name: 'Technical Documentation',
    parentId: null,
    path: '/Technical Documentation',
    description: 'API docs, system architecture, and technical guides',
    color: '#06B6D4',
    icon: 'Code',
    createdAt: new Date('2024-01-11'),
    updatedAt: new Date('2024-01-23'),
    createdBy: '2',
    documentsCount: 18,
    subFoldersCount: 3,
    size: 41943040,
    permissions: []
  }
]

export const mockDocuments: Document[] = [
  {
    id: 'doc-1',
    name: 'Employee Code of Conduct.pdf',
    type: 'pdf',
    size: 2097152,
    mimeType: 'application/pdf',
    extension: 'pdf',
    folderId: 'folder-2',
    path: '/HR Policies/Employee Handbook/Employee Code of Conduct.pdf',
    url: '/documents/employee-code-of-conduct.pdf',
    thumbnailUrl: '/placeholder.svg?height=200&width=150',
    description: 'Guidelines for professional behavior and ethics',
    tags: ['policy', 'ethics', 'conduct', 'guidelines'],
    status: 'approved',
    visibility: 'internal',
    createdAt: new Date('2024-01-16'),
    updatedAt: new Date('2024-01-18'),
    createdBy: '1',
    updatedBy: '1',
    owner: mockUsers[0],
    collaborators: [
      {
        user: mockUsers[2],
        permission: 'view',
        addedAt: new Date('2024-01-17'),
        addedBy: '1'
      }
    ],
    versions: [
      {
        id: 'v1',
        version: '1.0',
        size: 2097152,
        url: '/documents/employee-code-of-conduct-v1.pdf',
        createdAt: new Date('2024-01-16'),
        createdBy: '1',
        isCurrent: true
      }
    ],
    downloads: 45,
    views: 128,
    isFavorite: true,
    isLocked: false,
    metadata: {
      author: 'Sarah Johnson',
      subject: 'Employee Code of Conduct',
      keywords: ['policy', 'conduct', 'ethics'],
      pageCount: 12,
      language: 'en-US'
    }
  },
  {
    id: 'doc-2',
    name: 'Q4 Financial Report.xlsx',
    type: 'xlsx',
    size: 5242880,
    mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    extension: 'xlsx',
    folderId: 'folder-4',
    path: '/Financial Reports/Q4 Financial Report.xlsx',
    url: '/documents/q4-financial-report.xlsx',
    thumbnailUrl: '/placeholder.svg?height=200&width=150',
    description: 'Quarterly financial performance and analysis',
    tags: ['finance', 'quarterly', 'report', 'analysis'],
    status: 'approved',
    visibility: 'restricted',
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-01-22'),
    createdBy: '4',
    updatedBy: '4',
    owner: mockUsers[3],
    collaborators: [
      {
        user: mockUsers[0],
        permission: 'view',
        addedAt: new Date('2024-01-21'),
        addedBy: '4'
      }
    ],
    versions: [
      {
        id: 'v2',
        version: '2.0',
        size: 5242880,
        url: '/documents/q4-financial-report-v2.xlsx',
        createdAt: new Date('2024-01-22'),
        createdBy: '4',
        isCurrent: true
      },
      {
        id: 'v1',
        version: '1.0',
        size: 4718592,
        url: '/documents/q4-financial-report-v1.xlsx',
        createdAt: new Date('2024-01-20'),
        createdBy: '4',
        isCurrent: false
      }
    ],
    downloads: 12,
    views: 34,
    isFavorite: false,
    isLocked: true,
    lockExpiry: new Date('2024-02-01'),
    metadata: {
      author: 'David Wilson',
      subject: 'Q4 Financial Report',
      keywords: ['finance', 'quarterly', 'revenue'],
      language: 'en-US'
    }
  },
  {
    id: 'doc-3',
    name: 'API Documentation.pdf',
    type: 'pdf',
    size: 8388608,
    mimeType: 'application/pdf',
    extension: 'pdf',
    folderId: 'folder-6',
    path: '/Technical Documentation/API Documentation.pdf',
    url: '/documents/api-documentation.pdf',
    thumbnailUrl: '/placeholder.svg?height=200&width=150',
    description: 'Complete API reference and integration guide',
    tags: ['api', 'documentation', 'technical', 'integration'],
    status: 'published',
    visibility: 'public',
    createdAt: new Date('2024-01-18'),
    updatedAt: new Date('2024-01-23'),
    createdBy: '2',
    updatedBy: '2',
    owner: mockUsers[1],
    collaborators: [],
    versions: [
      {
        id: 'v1',
        version: '1.0',
        size: 8388608,
        url: '/documents/api-documentation-v1.pdf',
        createdAt: new Date('2024-01-18'),
        createdBy: '2',
        isCurrent: true
      }
    ],
    downloads: 89,
    views: 256,
    isFavorite: true,
    isLocked: false,
    metadata: {
      author: 'Michael Chen',
      subject: 'API Documentation',
      keywords: ['api', 'rest', 'endpoints'],
      pageCount: 45,
      language: 'en-US'
    }
  },
  {
    id: 'doc-4',
    name: 'Brand Guidelines.pptx',
    type: 'pptx',
    size: 15728640,
    mimeType: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    extension: 'pptx',
    folderId: 'folder-5',
    path: '/Marketing Materials/Brand Guidelines.pptx',
    url: '/documents/brand-guidelines.pptx',
    thumbnailUrl: '/placeholder.svg?height=200&width=150',
    description: 'Company branding standards and visual identity',
    tags: ['branding', 'guidelines', 'visual', 'identity'],
    status: 'approved',
    visibility: 'internal',
    createdAt: new Date('2024-01-19'),
    updatedAt: new Date('2024-01-24'),
    createdBy: '5',
    updatedBy: '5',
    owner: mockUsers[4],
    collaborators: [
      {
        user: mockUsers[0],
        permission: 'view',
        addedAt: new Date('2024-01-20'),
        addedBy: '5'
      },
      {
        user: mockUsers[1],
        permission: 'comment',
        addedAt: new Date('2024-01-21'),
        addedBy: '5'
      }
    ],
    versions: [
      {
        id: 'v1',
        version: '1.0',
        size: 15728640,
        url: '/documents/brand-guidelines-v1.pptx',
        createdAt: new Date('2024-01-19'),
        createdBy: '5',
        isCurrent: true
      }
    ],
    downloads: 23,
    views: 67,
    isFavorite: false,
    isLocked: false,
    metadata: {
      author: 'Lisa Anderson',
      subject: 'Brand Guidelines',
      keywords: ['brand', 'logo', 'colors'],
      language: 'en-US'
    }
  },
  {
    id: 'doc-5',
    name: 'Employment Contract Template.docx',
    type: 'docx',
    size: 1048576,
    mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    extension: 'docx',
    folderId: 'folder-3',
    path: '/Legal Documents/Employment Contract Template.docx',
    url: '/documents/employment-contract-template.docx',
    thumbnailUrl: '/placeholder.svg?height=200&width=150',
    description: 'Standard employment contract template',
    tags: ['legal', 'contract', 'employment', 'template'],
    status: 'approved',
    visibility: 'restricted',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-25'),
    createdBy: '3',
    updatedBy: '3',
    owner: mockUsers[2],
    collaborators: [
      {
        user: mockUsers[0],
        permission: 'edit',
        addedAt: new Date('2024-01-16'),
        addedBy: '3'
      }
    ],
    versions: [
      {
        id: 'v3',
        version: '3.0',
        size: 1048576,
        url: '/documents/employment-contract-template-v3.docx',
        createdAt: new Date('2024-01-25'),
        createdBy: '3',
        changelog: 'Updated compensation section',
        isCurrent: true
      },
      {
        id: 'v2',
        version: '2.0',
        size: 1024000,
        url: '/documents/employment-contract-template-v2.docx',
        createdAt: new Date('2024-01-20'),
        createdBy: '3',
        changelog: 'Added remote work clause',
        isCurrent: false
      }
    ],
    downloads: 31,
    views: 78,
    isFavorite: true,
    isLocked: false,
    metadata: {
      author: 'Emily Davis',
      subject: 'Employment Contract Template',
      keywords: ['contract', 'employment', 'legal'],
      wordCount: 2500,
      language: 'en-US'
    }
  }
]

export const mockDocumentStats: DocumentStats = {
  totalDocuments: 78,
  totalSize: 157286400, // ~150MB
  totalFolders: 15,
  recentUploads: 12,
  sharedDocuments: 34,
  favoriteDocuments: 8,
  documentsInReview: 5,
  archivedDocuments: 3
}

export const mockRecentActivity: DocumentActivity[] = [
  {
    id: 'activity-1',
    documentId: 'doc-1',
    userId: '2',
    user: mockUsers[1],
    action: 'viewed',
    details: 'Employee Code of Conduct.pdf',
    timestamp: new Date('2024-01-25T10:30:00'),
    ipAddress: '192.168.1.100'
  },
  {
    id: 'activity-2',
    documentId: 'doc-2',
    userId: '4',
    user: mockUsers[3],
    action: 'version_created',
    details: 'Created version 2.0 of Q4 Financial Report.xlsx',
    timestamp: new Date('2024-01-25T09:15:00'),
    ipAddress: '192.168.1.101'
  },
  {
    id: 'activity-3',
    documentId: 'doc-3',
    userId: '1',
    user: mockUsers[0],
    action: 'downloaded',
    details: 'API Documentation.pdf',
    timestamp: new Date('2024-01-25T08:45:00'),
    ipAddress: '192.168.1.102'
  },
  {
    id: 'activity-4',
    documentId: 'doc-4',
    userId: '5',
    user: mockUsers[4],
    action: 'shared',
    details: 'Shared Brand Guidelines.pptx with Michael Chen',
    timestamp: new Date('2024-01-24T16:20:00'),
    ipAddress: '192.168.1.103'
  },
  {
    id: 'activity-5',
    documentId: 'doc-5',
    userId: '3',
    user: mockUsers[2],
    action: 'edited',
    details: 'Updated Employment Contract Template.docx',
    timestamp: new Date('2024-01-24T14:10:00'),
    ipAddress: '192.168.1.104'
  }
]
