"use client"

import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

interface JobHeaderProps {
  onCreateJob?: () => void
}

export function JobHeader({ onCreateJob }: JobHeaderProps) {
  return (
    <div className="flex justify-between items-center mb-6 mt-20">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Jobs</h1>
        <p className="text-gray-600 mt-1">Manage and track your job postings</p>
      </div>
      <Button className="bg-purple-500 hover:bg-purple-600" onClick={onCreateJob}>
        <Plus className="h-4 w-4 mr-2" aria-hidden="true" />
        Post New Job
      </Button>
    </div>
  )
}
