"use client"

import { useState, useMemo } from "react"
import type { Document, DocumentFolder, DocumentViewMode, DocumentSortBy } from "@/types/document"
import { mockDocuments, mockFolders, mockDocumentStats, mockRecentActivity } from "@/data/mockDocuments"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { DocumentCard } from "@/components/documents/document-card"
import { FolderTree } from "@/components/documents/folder-tree"
import { DocumentViewer } from "@/components/documents/document-viewer"
import { DocumentUpload } from "@/components/documents/document-upload"
import {
  Search,
  Upload,
  Grid3X3,
  List,
  Table,
  MoreHorizontal,
  FileText,
  Folder,
  Users,
  Download,
  Star,
  Activity,
  Settings,
  Mail,
} from "lucide-react"

const formatFileSize = (bytes: number) => {
  if (bytes === 0) return "0 Bytes"
  const k = 1024
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"]
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
}

export default function DocumentsPage() {
  const [documents] = useState<Document[]>(mockDocuments)
  const [folders] = useState<DocumentFolder[]>(mockFolders)
  const [selectedFolderId, setSelectedFolderId] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [viewMode, setViewMode] = useState<DocumentViewMode>("grid")
  const [sortBy, setSortBy] = useState<DocumentSortBy>("updated")
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null)
  const [isViewerOpen, setIsViewerOpen] = useState(false)
  const [isUploadOpen, setIsUploadOpen] = useState(false)
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [typeFilter, setTypeFilter] = useState<string>("all")

  // Filter and sort documents
  const filteredDocuments = useMemo(() => {
    let filtered = documents

    // Filter by folder
    if (selectedFolderId) {
      filtered = filtered.filter((doc) => doc.folderId === selectedFolderId)
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (doc) =>
          doc.name.toLowerCase().includes(query) ||
          doc.description?.toLowerCase().includes(query) ||
          doc.tags.some((tag) => tag.toLowerCase().includes(query)) ||
          doc.owner.name.toLowerCase().includes(query),
      )
    }

    // Filter by status
    if (statusFilter !== "all") {
      filtered = filtered.filter((doc) => doc.status === statusFilter)
    }

    // Filter by type
    if (typeFilter !== "all") {
      filtered = filtered.filter((doc) => doc.type === typeFilter)
    }

    // Sort documents
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name)
        case "size":
          return b.size - a.size
        case "type":
          return a.type.localeCompare(b.type)
        case "created":
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        case "updated":
          return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
        case "downloads":
          return b.downloads - a.downloads
        case "views":
          return b.views - a.views
        default:
          return 0
      }
    })

    return filtered
  }, [documents, selectedFolderId, searchQuery, statusFilter, typeFilter, sortBy])

  const handleDocumentView = (document: Document) => {
    setSelectedDocument(document)
    setIsViewerOpen(true)
  }

  const handleDocumentDownload = (document: Document) => {
    // Simulate download
    console.log("Downloading:", document.name)
  }

  const handleDocumentShare = (document: Document) => {
    // Simulate share
    console.log("Sharing:", document.name)
  }

  const handleDocumentEdit = (document: Document) => {
    // Simulate edit
    console.log("Editing:", document.name)
  }

  const handleDocumentDelete = (document: Document) => {
    // Simulate delete
    console.log("Deleting:", document.name)
  }

  const handleToggleFavorite = (document: Document) => {
    // Simulate toggle favorite
    console.log("Toggle favorite:", document.name)
  }

  const selectedFolder = selectedFolderId ? folders.find((f) => f.id === selectedFolderId) : null

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
        {/* Sidebar Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-gray-900">Documents</h1>
            <Button onClick={() => setIsUploadOpen(true)}>
              <Upload className="h-4 w-4 mr-2" />
              Upload
            </Button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 gap-3">
            <Card>
              <CardContent className="p-3">
                <div className="flex items-center space-x-2">
                  <FileText className="h-4 w-4 text-blue-500" />
                  <div>
                    <p className="text-xs text-gray-600">Documents</p>
                    <p className="text-lg font-semibold">{mockDocumentStats.totalDocuments}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-3">
                <div className="flex items-center space-x-2">
                  <Folder className="h-4 w-4 text-orange-500" />
                  <div>
                    <p className="text-xs text-gray-600">Folders</p>
                    <p className="text-lg font-semibold">{mockDocumentStats.totalFolders}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-3">
                <div className="flex items-center space-x-2">
                  <Users className="h-4 w-4 text-green-500" />
                  <div>
                    <p className="text-xs text-gray-600">Shared</p>
                    <p className="text-lg font-semibold">{mockDocumentStats.sharedDocuments}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-3">
                <div className="flex items-center space-x-2">
                  <Star className="h-4 w-4 text-yellow-500" />
                  <div>
                    <p className="text-xs text-gray-600">Favorites</p>
                    <p className="text-lg font-semibold">{mockDocumentStats.favoriteDocuments}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Folder Tree */}
        <div className="flex-1 overflow-y-auto p-4">
          <FolderTree
            folders={folders}
            selectedFolderId={selectedFolderId}
            onFolderSelect={setSelectedFolderId}
            onCreateFolder={(parentId) => console.log("Create folder in:", parentId)}
            onEditFolder={(folder) => console.log("Edit folder:", folder.name)}
            onDeleteFolder={(folder) => console.log("Delete folder:", folder.name)}
            onShareFolder={(folder) => console.log("Share folder:", folder.name)}
          />
        </div>

        {/* Recent Activity */}
        <div className="p-4 border-t border-gray-200">
          <h3 className="text-sm font-medium text-gray-900 mb-3">Recent Activity</h3>
          <div className="space-y-2">
            {mockRecentActivity.slice(0, 3).map((activity) => (
              <div key={activity.id} className="flex items-center space-x-2 text-xs">
                <Activity className="h-3 w-3 text-gray-400" />
                <span className="text-gray-600 truncate">
                  <strong>{activity.user.name}</strong> {activity.action} {activity.details}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                {selectedFolder ? selectedFolder.name : "All Documents"}
              </h2>
              <p className="text-sm text-gray-600">
                {filteredDocuments.length} documents
                {selectedFolder && <span> • {formatFileSize(selectedFolder.size)}</span>}
              </p>
            </div>

            <div className="flex items-center space-x-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    <MoreHorizontal className="h-4 w-4 mr-2" />
                    Actions
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <Download className="mr-2 h-4 w-4" />
                    Export All
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Mail className="mr-2 h-4 w-4" />
                    Email Links
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    Folder Settings
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="flex items-center space-x-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search documents..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="review">Review</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="published">Published</SelectItem>
                <SelectItem value="archived">Archived</SelectItem>
              </SelectContent>
            </Select>

            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="pdf">PDF</SelectItem>
                <SelectItem value="doc">Word</SelectItem>
                <SelectItem value="xlsx">Excel</SelectItem>
                <SelectItem value="pptx">PowerPoint</SelectItem>
                <SelectItem value="image">Images</SelectItem>
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={(value) => setSortBy(value as DocumentSortBy)}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="updated">Last Modified</SelectItem>
                <SelectItem value="created">Created Date</SelectItem>
                <SelectItem value="name">Name</SelectItem>
                <SelectItem value="size">Size</SelectItem>
                <SelectItem value="type">Type</SelectItem>
                <SelectItem value="downloads">Downloads</SelectItem>
                <SelectItem value="views">Views</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex items-center border rounded-md">
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
                className="rounded-none"
              >
                <List className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "table" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("table")}
                className="rounded-l-none"
              >
                <Table className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Document Grid */}
        <div className="flex-1 overflow-y-auto p-6">
          {filteredDocuments.length === 0 ? (
            <div className="text-center py-12">
              <FileText className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No documents found</h3>
              <p className="text-gray-600 mb-4">
                {searchQuery || statusFilter !== "all" || typeFilter !== "all"
                  ? "Try adjusting your search or filters"
                  : "Upload your first document to get started"}
              </p>
              {!searchQuery && statusFilter === "all" && typeFilter === "all" && (
                <Button onClick={() => setIsUploadOpen(true)}>
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Documents
                </Button>
              )}
            </div>
          ) : (
            <div
              className={
                viewMode === "grid"
                  ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                  : "space-y-4"
              }
            >
              {filteredDocuments.map((document) => (
                <DocumentCard
                  key={document.id}
                  document={document}
                  onView={handleDocumentView}
                  onEdit={handleDocumentEdit}
                  onShare={handleDocumentShare}
                  onDownload={handleDocumentDownload}
                  onDelete={handleDocumentDelete}
                  onToggleFavorite={handleToggleFavorite}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Document Viewer */}
      <DocumentViewer
        document={selectedDocument}
        isOpen={isViewerOpen}
        onClose={() => setIsViewerOpen(false)}
        onEdit={handleDocumentEdit}
        onShare={handleDocumentShare}
        onDownload={handleDocumentDownload}
        onToggleFavorite={handleToggleFavorite}
      />

      {/* Upload Dialog */}
      <DocumentUpload
        isOpen={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
        folderId={selectedFolderId}
        onUploadComplete={(files) => {
          console.log("Upload completed:", files)
        }}
      />
    </div>
  )
}
