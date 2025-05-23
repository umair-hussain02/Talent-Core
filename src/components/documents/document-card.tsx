import { useState } from 'react'
import { Document } from '@/types/document'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {  Download, Share2, MoreHorizontal, Eye, Edit, Trash2, Star, Lock, Users, Calendar, FileIcon, ImageIcon, Video, Music, Archive } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'

interface DocumentCardProps {
  document: Document
  onView?: (document: Document) => void
  onEdit?: (document: Document) => void
  onShare?: (document: Document) => void
  onDownload?: (document: Document) => void
  onDelete?: (document: Document) => void
  onToggleFavorite?: (document: Document) => void
}

const getFileIcon = (type: string, mimeType: string) => {
  if (type === 'image' || mimeType.startsWith('image/')) {
    return <ImageIcon className="h-8 w-8 text-green-500" />
  }
  if (type === 'video' || mimeType.startsWith('video/')) {
    return <Video className="h-8 w-8 text-red-500" />
  }
  if (type === 'audio' || mimeType.startsWith('audio/')) {
    return <Music className="h-8 w-8 text-purple-500" />
  }
  if (type === 'archive' || mimeType.includes('zip') || mimeType.includes('rar')) {
    return <Archive className="h-8 w-8 text-orange-500" />
  }
  return <FileIcon className="h-8 w-8 text-blue-500" />
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
    case 'public': return <Users className="h-3 w-3" />
    case 'internal': return <Users className="h-3 w-3" />
    case 'restricted': return <Lock className="h-3 w-3" />
    case 'private': return <Lock className="h-3 w-3" />
    default: return <Users className="h-3 w-3" />
  }
}

export function DocumentCard({
  document,
  onView,
  onEdit,
  onShare,
  onDownload,
  onDelete,
  onToggleFavorite
}: DocumentCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <Card 
      className="group relative overflow-hidden transition-all duration-200 hover:shadow-md cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onView?.(document)}
    >
      <CardContent className="p-4">
        {/* Header with file icon and actions */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center space-x-3">
            {document.thumbnailUrl ? (
              <img 
                src={document.thumbnailUrl || "/placeholder.svg"} 
                alt={document.name}
                className="h-12 w-9 object-cover rounded border"
              />
            ) : (
              <div className="h-12 w-9 flex items-center justify-center bg-gray-50 rounded border">
                {getFileIcon(document.type, document.mimeType)}
              </div>
            )}
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2">
                <h3 className="font-medium text-sm truncate" title={document.name}>
                  {document.name}
                </h3>
                {document.isFavorite && (
                  <Star className="h-3 w-3 text-yellow-500 fill-current" />
                )}
                {document.isLocked && (
                  <Lock className="h-3 w-3 text-red-500" />
                )}
              </div>
              <p className="text-xs text-gray-500 mt-1">
                {formatFileSize(document.size)}
              </p>
            </div>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
              <Button 
                variant="ghost" 
                size="sm" 
                className={`h-8 w-8 p-0 transition-opacity ${isHovered ? 'opacity-100' : 'opacity-0'}`}
              >
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem onClick={(e) => { e.stopPropagation(); onView?.(document) }}>
                <Eye className="mr-2 h-4 w-4" />
                View
              </DropdownMenuItem>
              <DropdownMenuItem onClick={(e) => { e.stopPropagation(); onDownload?.(document) }}>
                <Download className="mr-2 h-4 w-4" />
                Download
              </DropdownMenuItem>
              <DropdownMenuItem onClick={(e) => { e.stopPropagation(); onShare?.(document) }}>
                <Share2 className="mr-2 h-4 w-4" />
                Share
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={(e) => { e.stopPropagation(); onEdit?.(document) }}>
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem onClick={(e) => { e.stopPropagation(); onToggleFavorite?.(document) }}>
                <Star className="mr-2 h-4 w-4" />
                {document.isFavorite ? 'Remove from favorites' : 'Add to favorites'}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                onClick={(e) => { e.stopPropagation(); onDelete?.(document) }}
                className="text-red-600"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Description */}
        {document.description && (
          <p className="text-xs text-gray-600 mb-3 line-clamp-2">
            {document.description}
          </p>
        )}

        {/* Tags */}
        {document.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {document.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs px-1.5 py-0.5">
                {tag}
              </Badge>
            ))}
            {document.tags.length > 3 && (
              <Badge variant="secondary" className="text-xs px-1.5 py-0.5">
                +{document.tags.length - 3}
              </Badge>
            )}
          </div>
        )}

        {/* Status and visibility */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <Badge className={`text-xs ${getStatusColor(document.status)}`}>
              {document.status}
            </Badge>
            <div className="flex items-center space-x-1 text-xs text-gray-500">
              {getVisibilityIcon(document.visibility)}
              <span>{document.visibility}</span>
            </div>
          </div>
          <div className="flex items-center space-x-3 text-xs text-gray-500">
            <div className="flex items-center space-x-1">
              <Eye className="h-3 w-3" />
              <span>{document.views}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Download className="h-3 w-3" />
              <span>{document.downloads}</span>
            </div>
          </div>
        </div>

        {/* Footer with owner and date */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Avatar className="h-6 w-6">
              <AvatarImage src={document.owner.avatar || "/placeholder.svg"} alt={document.owner.name} />
              <AvatarFallback className="text-xs">
                {document.owner.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <span className="text-xs text-gray-600">{document.owner.name}</span>
          </div>
          <div className="flex items-center space-x-1 text-xs text-gray-500">
            <Calendar className="h-3 w-3" />
            <span>{formatDistanceToNow(document.updatedAt, { addSuffix: true })}</span>
          </div>
        </div>

        {/* Collaborators indicator */}
        {document.collaborators.length > 0 && (
          <div className="flex items-center space-x-1 mt-2 pt-2 border-t">
            <Users className="h-3 w-3 text-gray-400" />
            <span className="text-xs text-gray-500">
              {document.collaborators.length} collaborator{document.collaborators.length !== 1 ? 's' : ''}
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
