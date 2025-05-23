"use client"

import { useState, useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Upload, type File, X, Check, AlertCircle, FileText, ImageIcon, Video, Music, Archive } from "lucide-react"

interface UploadFile {
  id: string
  file: File
  name: string
  size: number
  type: string
  progress: number
  status: "pending" | "uploading" | "completed" | "error"
  error?: string
}

interface DocumentUploadProps {
  isOpen: boolean
  onClose: () => void
  folderId?: string | null
  onUploadComplete?: (files: UploadFile[]) => void
}

const getFileIcon = (type: string) => {
  if (type.startsWith("image/")) {
    return <ImageIcon className="h-8 w-8 text-green-500" />
  }
  if (type.startsWith("video/")) {
    return <Video className="h-8 w-8 text-red-500" />
  }
  if (type.startsWith("audio/")) {
    return <Music className="h-8 w-8 text-purple-500" />
  }
  if (type.includes("zip") || type.includes("rar")) {
    return <Archive className="h-8 w-8 text-orange-500" />
  }
  return <FileText className="h-8 w-8 text-blue-500" />
}

const formatFileSize = (bytes: number) => {
  if (bytes === 0) return "0 Bytes"
  const k = 1024
  const sizes = ["Bytes", "KB", "MB", "GB"]
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
}

export function DocumentUpload({ isOpen, onClose, onUploadComplete }: DocumentUploadProps) {
  const [files, setFiles] = useState<UploadFile[]>([])
  const [isUploading, setIsUploading] = useState(false)
  const [visibility, setVisibility] = useState("internal")
  const [tags, setTags] = useState("")
  const [description, setDescription] = useState("")

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newFiles: UploadFile[] = acceptedFiles.map((file) => ({
      id: Math.random().toString(36).substr(2, 9),
      file,
      name: file.name,
      size: file.size,
      type: file.type,
      progress: 0,
      status: "pending",
    }))
    setFiles((prev) => [...prev, ...newFiles])
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: true,
    maxSize: 100 * 1024 * 1024, // 100MB
  })

  const removeFile = (fileId: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== fileId))
  }

  const simulateUpload = async (file: UploadFile) => {
    return new Promise<void>((resolve) => {
      let progress = 0
      const interval = setInterval(() => {
        progress += Math.random() * 30
        if (progress >= 100) {
          progress = 100
          clearInterval(interval)
          setFiles((prev) => prev.map((f) => (f.id === file.id ? { ...f, progress: 100, status: "completed" } : f)))
          resolve()
        } else {
          setFiles((prev) => prev.map((f) => (f.id === file.id ? { ...f, progress, status: "uploading" } : f)))
        }
      }, 200)
    })
  }

  const handleUpload = async () => {
    if (files.length === 0) return

    setIsUploading(true)

    // Simulate upload for each file
    for (const file of files) {
      if (file.status === "pending") {
        await simulateUpload(file)
      }
    }

    setIsUploading(false)
    onUploadComplete?.(files)

    // Reset form after successful upload
    setTimeout(() => {
      setFiles([])
      setTags("")
      setDescription("")
      onClose()
    }, 1000)
  }

  const totalFiles = files.length
  const completedFiles = files.filter((f) => f.status === "completed").length
  const totalSize = files.reduce((sum, f) => sum + f.size, 0)

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle>Upload Documents</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 overflow-y-auto max-h-[60vh]">
          {/* Upload Area */}
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
              isDragActive ? "border-blue-400 bg-blue-50" : "border-gray-300 hover:border-gray-400"
            }`}
          >
            <input {...getInputProps()} />
            <Upload className="h-12 w-12 mx-auto mb-4 text-gray-400" />
            {isDragActive ? (
              <p className="text-blue-600">Drop the files here...</p>
            ) : (
              <div>
                <p className="text-gray-600 mb-2">Drag & drop files here, or click to select files</p>
                <p className="text-sm text-gray-500">Maximum file size: 100MB</p>
              </div>
            )}
          </div>

          {/* File List */}
          {files.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">Files to Upload</h3>
                <div className="text-sm text-gray-500">
                  {totalFiles} files • {formatFileSize(totalSize)}
                </div>
              </div>

              <div className="space-y-2 max-h-48 overflow-y-auto">
                {files.map((file) => (
                  <div key={file.id} className="flex items-center space-x-3 p-3 border rounded-lg">
                    {getFileIcon(file.type)}
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{file.name}</p>
                      <p className="text-sm text-gray-500">{formatFileSize(file.size)}</p>

                      {file.status === "uploading" && <Progress value={file.progress} className="mt-2" />}

                      {file.status === "error" && file.error && (
                        <p className="text-sm text-red-600 mt-1">{file.error}</p>
                      )}
                    </div>

                    <div className="flex items-center space-x-2">
                      {file.status === "completed" && <Check className="h-5 w-5 text-green-500" />}
                      {file.status === "error" && <AlertCircle className="h-5 w-5 text-red-500" />}
                      {file.status === "pending" && (
                        <Button variant="ghost" size="sm" onClick={() => removeFile(file.id)} className="h-8 w-8 p-0">
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Upload Options */}
          {files.length > 0 && (
            <div className="space-y-4 pt-4 border-t">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="visibility">Visibility</Label>
                  <Select value={visibility} onValueChange={setVisibility}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="private">Private</SelectItem>
                      <SelectItem value="internal">Internal</SelectItem>
                      <SelectItem value="restricted">Restricted</SelectItem>
                      <SelectItem value="public">Public</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="tags">Tags (comma separated)</Label>
                  <Input
                    id="tags"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                    placeholder="document, policy, important"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="description">Description (optional)</Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Brief description of the documents..."
                  rows={3}
                />
              </div>
            </div>
          )}
        </div>

        <DialogFooter>
          <div className="flex items-center justify-between w-full">
            <div className="text-sm text-gray-500">
              {completedFiles > 0 && (
                <span>
                  {completedFiles} of {totalFiles} files uploaded
                </span>
              )}
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" onClick={onClose} disabled={isUploading}>
                Cancel
              </Button>
              <Button onClick={handleUpload} disabled={files.length === 0 || isUploading}>
                {isUploading ? "Uploading..." : `Upload ${files.length} file${files.length !== 1 ? "s" : ""}`}
              </Button>
            </div>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
