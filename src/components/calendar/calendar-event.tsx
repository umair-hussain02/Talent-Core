"use client"

import { format, parseISO } from "date-fns"
import { Clock, MapPin, Video, Users } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import type { CalendarEvent as CalendarEventType } from "@/types/calendar"

interface CalendarEventProps {
  event: CalendarEventType
  view: "month" | "list"
  onClick: () => void
}

export function CalendarEvent({ event, view, onClick }: CalendarEventProps) {
  const formatEventTime = (startTime: string, endTime: string) => {
    const start = parseISO(startTime)
    const end = parseISO(endTime)
    return `${format(start, "h:mm a")} - ${format(end, "h:mm a")}`
  }

  if (view === "month") {
    return (
      <div
        className="text-xs p-1 rounded truncate cursor-pointer transition-colors hover:opacity-80"
        style={{ backgroundColor: event.color || "#8B5CF6", color: "white" }}
        onClick={onClick}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault()
            onClick()
          }
        }}
        aria-label={`${event.title} at ${format(parseISO(event.startTime), "h:mm a")}`}
      >
        {format(parseISO(event.startTime), "h:mm a")} {event.title}
      </div>
    )
  }

  // List view
  return (
    <div
      className="p-3 border-b border-gray-200 last:border-b-0 hover:bg-gray-50 cursor-pointer transition-colors"
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault()
          onClick()
        }
      }}
      aria-label={`${event.title} - ${event.description || "No description"}`}
    >
      <div className="flex items-start gap-3">
        <div
          className="w-1 h-full min-h-[40px] rounded-full flex-shrink-0"
          style={{ backgroundColor: event.color || "#8B5CF6" }}
          aria-hidden="true"
        ></div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <h4 className="font-medium text-gray-900 truncate">{event.title}</h4>
            <Badge
              variant="outline"
              className={`flex-shrink-0 ml-2 ${
                event.status === "scheduled"
                  ? "bg-blue-50 text-blue-700 border-blue-200"
                  : event.status === "completed"
                    ? "bg-green-50 text-green-700 border-green-200"
                    : event.status === "cancelled"
                      ? "bg-red-50 text-red-700 border-red-200"
                      : "bg-amber-50 text-amber-700 border-amber-200"
              }`}
            >
              {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
            </Badge>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Clock className="h-3.5 w-3.5 flex-shrink-0" aria-hidden="true" />
              <span>{formatEventTime(event.startTime, event.endTime)}</span>
            </div>

            {event.location && (
              <div className="flex items-center gap-2 text-sm text-gray-500">
                {event.isVirtual ? (
                  <Video className="h-3.5 w-3.5 flex-shrink-0" aria-hidden="true" />
                ) : (
                  <MapPin className="h-3.5 w-3.5 flex-shrink-0" aria-hidden="true" />
                )}
                <span className="truncate">{event.isVirtual ? "Virtual Meeting" : event.location}</span>
              </div>
            )}

            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Users className="h-3.5 w-3.5 flex-shrink-0" aria-hidden="true" />
              <div className="flex -space-x-2">
                {event.participants.slice(0, 3).map((participant) => (
                  <Avatar key={participant.id} className="h-6 w-6 border-2 border-white">
                    <AvatarImage src={participant.avatar || "/placeholder.svg"} alt={participant.name} />
                    <AvatarFallback className="text-xs">{participant.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                ))}
                {event.participants.length > 3 && (
                  <div className="h-6 w-6 rounded-full bg-gray-200 flex items-center justify-center text-xs font-medium border-2 border-white">
                    +{event.participants.length - 3}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
