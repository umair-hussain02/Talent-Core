import { useState } from 'react'
import { Document } from '@/types/document'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Download, Share2, Edit, Star, MoreHorizontal, Eye, Users, Clock, FileText, Tag, Lock, Globe, Building, Shield, Calendar, User, MessageSquare, History } from 'lucide-react'
import { formatDistanceToNow, format } from 'date-fns'

interface DocumentViewerProps {
  document: Document | null
  isOpen: boolean
  onClose: () => void
  onEdit?: (document: Document) => void
  onShare?: (document: Document) => void
  onDownload?: (document: Document) => void
  onToggleFavorite?: (document: Document) => void
}

const formatFileSize = (bytes: number) => {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'draft': return 'bg-gray-100 text-gray-800'
    case 'review': return 'bg-yellow-100 text-yellow-800'
    case 'approved': return 'bg-green-100 text-green-800'
    case 'published': return 'bg-blue-100 text-blue-800'
    case 'archived': return 'bg-gray-100 text-gray-600'
    default: return 'bg-gray-100 text-gray-800'
  }
}

const getVisibilityIcon = (visibility: string) => {
  switch (visibility) {
    case 'public': return <Globe className="h-4 w-4" />
    case 'internal': return <Building className="h-4 w-4" />
    case 'restricted': return <Shield className="h-4 w-4" />
    case 'private': return <Lock className="h-4 w-4" />
    default: return <Globe className="h-4 w-4" />
  }
}

const getPermissionColor = (permission: string) => {
  switch (permission) {
    case 'view': return 'bg-blue-100 text-blue-800'
    case 'comment': return 'bg-green-100 text-green-800'
    case 'edit': return 'bg-orange-100 text-orange-800'
    case 'admin': return 'bg-red-100 text-red-800'
    default: return 'bg-gray-100 text-gray-800'
  }
}

export function DocumentViewer({
  document,
  isOpen,
  onClose,
  onEdit,
  onShare,
  onDownload,
  onToggleFavorite
}: DocumentViewerProps) {
  const [selectedVersion, setSelectedVersion] = useState<string>('')

  if (!document) return null

  const currentVersion = document.versions.find(v => v.isCurrent) || document.versions[0]

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden">
        <DialogHeader className="pb-4">
          <div className="flex items-start justify-between">
            <div className="flex-1 min-w-0">
              <DialogTitle className="text-xl font-semibold truncate">
                {document.name}
              </DialogTitle>
              <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                <div className="flex items-center space-x-1">
                  <FileText className="h-4 w-4" />
                  <span>{formatFileSize(document.size)}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Eye className="h-4 w-4" />
                  <span>{document.views} views</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Download className="h-4 w-4" />
                  <span>{document.downloads} downloads</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-2 ml-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onDownload?.(document)}
              >
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onShare?.(document)}
              >
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => onEdit?.(document)}>
                    <Edit className="mr-2 h-4 w-4" />
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onToggleFavorite?.(document)}>
                    <Star className="mr-2 h-4 w-4" />
                    {document.isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Add Comment
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </DialogHeader>

        <div className="flex-1 overflow-hidden">
          <Tabs defaultValue="preview" className="h-full flex flex-col">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="preview">Preview</TabsTrigger>
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="collaborators">Collaborators</TabsTrigger>
              <TabsTrigger value="versions">Versions</TabsTrigger>
            </TabsList>

            <TabsContent value="preview" className="flex-1 mt-4">
              <div className="h-96 bg-gray-50 rounded-lg flex items-center justify-center">
                {document.thumbnailUrl ? (
                  <img 
                    src={document.thumbnailUrl || "/placeholder.svg"} 
                    alt={document.name}
                    className="max-h-full max-w-full object-contain"
                  />
                ) : (
                  <div className="text-center text-gray-500">
                    <FileText className="h-16 w-16 mx-auto mb-4" />
                    <p>Preview not available</p>
                    <p className="text-sm">Click download to view the file</p>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="details" className="flex-1 mt-4 overflow-y-auto">
              <div className="space-y-6">
                {/* Basic Information */}
                <div>
                  <h3 className="text-lg font-medium mb-3">Basic Information</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700">File Name</label>
                      <p className="mt-1 text-sm text-gray-900">{document.name}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">File Type</label>
                      <p className="mt-1 text-sm text-gray-900">{document.extension.toUpperCase()}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Size</label>
                      <p className="mt-1 text-sm text-gray-900">{formatFileSize(document.size)}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Status</label>
                      <Badge className={`mt-1 ${getStatusColor(document.status)}`}>
                        {document.status}
                      </Badge>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Visibility</label>
                      <div className="flex items-center space-x-2 mt-1">
                        {getVisibilityIcon(document.visibility)}
                        <span className="text-sm text-gray-900 capitalize">{document.visibility}</span>
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Location</label>
                      <p className="mt-1 text-sm text-gray-900">{document.path}</p>
                    </div>
                  </div>
                </div>

                {/* Description */}
                {document.description && (
                  <div>
                    <h3 className="text-lg font-medium mb-3">Description</h3>
                    <p className="text-sm text-gray-700">{document.description}</p>
                  </div>
                )}

                {/* Tags */}
                {document.tags.length > 0 && (
                  <div>
                    <h3 className="text-lg font-medium mb-3">Tags</h3>
                    <div className="flex flex-wrap gap-2">
                      {document.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="flex items-center space-x-1">
                          <Tag className="h-3 w-3" />
                          <span>{tag}</span>
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Metadata */}
                {document.metadata && (
                  <div>
                    <h3 className="text-lg font-medium mb-3">Metadata</h3>
                    <div className="grid grid-cols-2 gap-4">
                      {document.metadata.author && (
                        <div>
                          <label className="text-sm font-medium text-gray-700">Author</label>
                          <p className="mt-1 text-sm text-gray-900">{document.metadata.author}</p>
                        </div>
                      )}
                      {document.metadata.subject && (
                        <div>
                          <label className="text-sm font-medium text-gray-700">Subject</label>
                          <p className="mt-1 text-sm text-gray-900">{document.metadata.subject}</p>
                        </div>
                      )}
                      {document.metadata.pageCount && (
                        <div>
                          <label className="text-sm font-medium text-gray-700">Pages</label>
                          <p className="mt-1 text-sm text-gray-900">{document.metadata.pageCount}</p>
                        </div>
                      )}
                      {document.metadata.wordCount && (
                        <div>
                          <label className="text-sm font-medium text-gray-700">Words</label>
                          <p className="mt-1 text-sm text-gray-900">{document.metadata.wordCount}</p>
                        </div>
                      )}
                      {document.metadata.language && (
                        <div>
                          <label className="text-sm font-medium text-gray-700">Language</label>
                          <p className="mt-1 text-sm text-gray-900">{document.metadata.language}</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Timestamps */}
                <div>
                  <h3 className="text-lg font-medium mb-3">Timestamps</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700">Created</label>
                      <div className="mt-1 flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-900">
                          {format(document.createdAt, 'PPP')}
                        </span>
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Last Modified</label>
                      <div className="mt-1 flex items-center space-x-2">
                        <Clock className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-900">
                          {formatDistanceToNow(document.updatedAt, { addSuffix: true })}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="collaborators" className="flex-1 mt-4 overflow-y-auto">
              <div className="space-y-4">
                {/* Owner */}
                <div>
                  <h3 className="text-lg font-medium mb-3">Owner</h3>
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <Avatar>
                      <AvatarImage src={document.owner.avatar || "/placeholder.svg"} alt={document.owner.name} />
                      <AvatarFallback>
                        {document.owner.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="font-medium">{document.owner.name}</p>
                      <p className="text-sm text-gray-600">{document.owner.email}</p>
                      <p className="text-sm text-gray-500">{document.owner.role} • {document.owner.department}</p>
                    </div>
                    <Badge className="bg-purple-100 text-purple-800">Owner</Badge>
                  </div>
                </div>

                {/* Collaborators */}
                {document.collaborators.length > 0 && (
                  <div>
                    <h3 className="text-lg font-medium mb-3">Collaborators</h3>
                    <div className="space-y-3">
                      {document.collaborators.map((collaborator) => (
                        <div key={collaborator.user.id} className="flex items-center space-x-3 p-3 border rounded-lg">
                          <Avatar>
                            <AvatarImage src={collaborator.user.avatar || "/placeholder.svg"} alt={collaborator.user.name} />
                            <AvatarFallback>
                              {collaborator.user.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <p className="font-medium">{collaborator.user.name}</p>
                            <p className="text-sm text-gray-600">{collaborator.user.email}</p>
                            <p className="text-sm text-gray-500">{collaborator.user.role} • {collaborator.user.department}</p>
                          </div>
                          <div className="text-right">
                            <Badge className={getPermissionColor(collaborator.permission)}>
                              {collaborator.permission}
                            </Badge>
                            <p className="text-xs text-gray-500 mt-1">
                              Added {formatDistanceToNow(collaborator.addedAt, { addSuffix: true })}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {document.collaborators.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    <Users className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                    <p>No collaborators yet</p>
                    <p className="text-sm">Share this document to add collaborators</p>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="versions" className="flex-1 mt-4 overflow-y-auto">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">Version History</h3>
                  <Badge variant="secondary">{document.versions.length} versions</Badge>
                </div>

                <div className="space-y-3">
                  {document.versions
                    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                    .map((version) => (
                    <div 
                      key={version.id} 
                      className={`p-4 border rounded-lg ${version.isCurrent ? 'border-blue-200 bg-blue-50' : 'border-gray-200'}`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="flex items-center space-x-2">
                            <History className="h-4 w-4 text-gray-400" />
                            <span className="font-medium">Version {version.version}</span>
                            {version.isCurrent && (
                              <Badge className="bg-blue-100 text-blue-800">Current</Badge>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-gray-500">{formatFileSize(version.size)}</span>
                          <Button variant="outline" size="sm">
                            <Download className="h-3 w-3 mr-1" />
                            Download
                          </Button>
                        </div>
                      </div>
                      
                      <div className="mt-2 flex items-center space-x-4 text-sm text-gray-600">
                        <div className="flex items-center space-x-1">
                          <User className="h-3 w-3" />
                          <span>{version.createdBy}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-3 w-3" />
                          <span>{format(version.createdAt, 'PPP')}</span>
                        </div>
                      </div>

                      {version.changelog && (
                        <div className="mt-2 p-2 bg-gray-50 rounded text-sm text-gray-700">
                          <strong>Changes:</strong> {version.changelog}
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {document.versions.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    <History className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                    <p>No version history available</p>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  )
}
