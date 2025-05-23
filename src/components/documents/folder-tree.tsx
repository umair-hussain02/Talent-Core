import { JSX, useState } from 'react'
import { DocumentFolder } from '@/types/document'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Collapsible,
  CollapsibleContent,
} from '@/components/ui/collapsible'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { ChevronRight, ChevronDown, Folder, FolderOpen, MoreHorizontal, Plus, Edit, Trash2, Share2, Users, Book, Scale, TrendingUp, Megaphone, Code } from 'lucide-react'

interface FolderTreeProps {
  folders: DocumentFolder[]
  selectedFolderId?: string | null
  onFolderSelect?: (folderId: string | null) => void
  onCreateFolder?: (parentId: string | null) => void
  onEditFolder?: (folder: DocumentFolder) => void
  onDeleteFolder?: (folder: DocumentFolder) => void
  onShareFolder?: (folder: DocumentFolder) => void
}

const getFolderIcon = (iconName?: string) => {
  switch (iconName) {
    case 'Users': return <Users className="h-4 w-4" />
    case 'Book': return <Book className="h-4 w-4" />
    case 'Scale': return <Scale className="h-4 w-4" />
    case 'TrendingUp': return <TrendingUp className="h-4 w-4" />
    case 'Megaphone': return <Megaphone className="h-4 w-4" />
    case 'Code': return <Code className="h-4 w-4" />
    default: return <Folder className="h-4 w-4" />
  }
}

const formatFileSize = (bytes: number) => {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

interface FolderItemProps {
  folder: DocumentFolder
  level: number
  isSelected: boolean
  isExpanded: boolean
  hasChildren: boolean
  onToggle: () => void
  onSelect: () => void
  onCreateFolder?: (parentId: string) => void
  onEditFolder?: (folder: DocumentFolder) => void
  onDeleteFolder?: (folder: DocumentFolder) => void
  onShareFolder?: (folder: DocumentFolder) => void
}

function FolderItem({
  folder,
  level,
  isSelected,
  isExpanded,
  hasChildren,
  onToggle,
  onSelect,
  onCreateFolder,
  onEditFolder,
  onDeleteFolder,
  onShareFolder
}: FolderItemProps) {
  return (
    <div className="group ">
      <div
        className={`flex items-center space-x-2 px-2 py-1.5 rounded-md cursor-pointer transition-colors ${
          isSelected 
            ? 'bg-blue-100 text-blue-900' 
            : 'hover:bg-gray-100'
        }`}
        style={{ paddingLeft: `${level * 16 + 8}px` }}
      >
        {hasChildren ? (
          <Button
            variant="ghost"
            size="sm"
            className="h-4 w-4 p-0"
            onClick={(e) => {
              e.stopPropagation()
              onToggle()
            }}
          >
            {isExpanded ? (
              <ChevronDown className="h-3 w-3" />
            ) : (
              <ChevronRight className="h-3 w-3" />
            )}
          </Button>
        ) : (
          <div className="h-4 w-4" />
        )}

        <div 
          className="flex items-center space-x-2 flex-1 min-w-0"
          onClick={onSelect}
        >
          <div 
            className="h-4 w-4 flex-shrink-0"
            style={{ color: folder.color }}
          >
            {getFolderIcon(folder.icon)}
          </div>
          <span className="text-sm font-medium truncate">{folder.name}</span>
          <div className="flex items-center space-x-1 ml-auto">
            <Badge variant="secondary" className="text-xs">
              {folder.documentsCount}
            </Badge>
          </div>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <MoreHorizontal className="h-3 w-3" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem onClick={() => onCreateFolder?.(folder.id)}>
              <Plus className="mr-2 h-4 w-4" />
              New Subfolder
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onShareFolder?.(folder)}>
              <Share2 className="mr-2 h-4 w-4" />
              Share Folder
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => onEditFolder?.(folder)}>
              <Edit className="mr-2 h-4 w-4" />
              Rename
            </DropdownMenuItem>
            <DropdownMenuItem 
              onClick={() => onDeleteFolder?.(folder)}
              className="text-red-600"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Folder details when selected */}
      {isSelected && (
        <div className="mt-2 px-4 py-2 bg-blue-50 rounded-md mx-2 text-xs text-gray-600">
          <div className="space-y-1">
            <div className="flex justify-between">
              <span>Documents:</span>
              <span>{folder.documentsCount}</span>
            </div>
            <div className="flex justify-between">
              <span>Subfolders:</span>
              <span>{folder.subFoldersCount}</span>
            </div>
            <div className="flex justify-between">
              <span>Size:</span>
              <span>{formatFileSize(folder.size)}</span>
            </div>
            {folder.description && (
              <div className="pt-1 border-t">
                <p className="text-xs text-gray-500">{folder.description}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export function FolderTree({
  folders,
  selectedFolderId,
  onFolderSelect,
  onCreateFolder,
  onEditFolder,
  onDeleteFolder,
  onShareFolder
}: FolderTreeProps) {
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set())

  const toggleFolder = (folderId: string) => {
    const newExpanded = new Set(expandedFolders)
    if (newExpanded.has(folderId)) {
      newExpanded.delete(folderId)
    } else {
      newExpanded.add(folderId)
    }
    setExpandedFolders(newExpanded)
  }

  const buildFolderTree = (parentId: string | null = null, level: number = 0): JSX.Element[] => {
    return folders
      .filter(folder => folder.parentId === parentId)
      .map(folder => {
        const hasChildren = folders.some(f => f.parentId === folder.id)
        const isExpanded = expandedFolders.has(folder.id)
        const isSelected = selectedFolderId === folder.id

        return (
          <Collapsible key={folder.id} open={isExpanded}>
            <FolderItem
              folder={folder}
              level={level}
              isSelected={isSelected}
              isExpanded={isExpanded}
              hasChildren={hasChildren}
              onToggle={() => toggleFolder(folder.id)}
              onSelect={() => onFolderSelect?.(folder.id)}
              onCreateFolder={onCreateFolder}
              onEditFolder={onEditFolder}
              onDeleteFolder={onDeleteFolder}
              onShareFolder={onShareFolder}
            />
            {hasChildren && (
              <CollapsibleContent>
                {buildFolderTree(folder.id, level + 1)}
              </CollapsibleContent>
            )}
          </Collapsible>
        )
      })
  }

  return (
    <div className="space-y-1">
      {/* All Documents option */}
      <div
        className={`flex items-center space-x-2 px-2 py-1.5 rounded-md cursor-pointer transition-colors ${
          selectedFolderId === null 
            ? 'bg-blue-100 text-blue-900' 
            : 'hover:bg-gray-100'
        }`}
        onClick={() => onFolderSelect?.(null)}
      >
        <div className="h-4 w-4" />
        <FolderOpen className="h-4 w-4 text-blue-500" />
        <span className="text-sm font-medium">All Documents</span>
        <Badge variant="secondary" className="text-xs ml-auto">
          {folders.reduce((sum, folder) => sum + folder.documentsCount, 0)}
        </Badge>
      </div>

      {/* Folder tree */}
      {buildFolderTree()}

      {/* Create new folder button */}
      <Button
        variant="ghost"
        size="sm"
        className="w-full justify-start text-gray-600 hover:text-gray-900"
        onClick={() => onCreateFolder?.(null)}
      >
        <Plus className="mr-2 h-4 w-4" />
        New Folder
      </Button>
    </div>
  )
}
