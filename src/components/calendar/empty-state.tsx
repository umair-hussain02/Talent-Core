"use client"

import { Calendar, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"

interface EmptyStateProps {
  onCreateEvent: () => void
}

export function EmptyState({ onCreateEvent }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center h-[400px] text-center">
      <div className="bg-gray-100 p-4 rounded-full mb-4">
        <Calendar className="h-8 w-8 text-gray-400" />
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-2">No events scheduled</h3>
      <p className="text-gray-500 mb-6 max-w-sm">
        Get started by creating your first event or interview to keep track of your schedule.
      </p>
      <Button className="bg-purple-500 hover:bg-purple-600" onClick={onCreateEvent}>
        <Plus className="h-4 w-4 mr-2" />
        Create Event
      </Button>
    </div>
  )
}
