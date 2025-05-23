"use client"

import { useMemo } from "react"
import { format, parseISO } from "date-fns"
import { CalendarIcon, Clock } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import type { CalendarEvent } from "@/types/calendar"

interface UpcomingEventsProps {
  events: CalendarEvent[]
  selectedEvent: CalendarEvent | null
  onEventClick: (event: CalendarEvent) => void
}

export function UpcomingEvents({ events, selectedEvent, onEventClick }: UpcomingEventsProps) {
  const sortedEvents = useMemo(() => {
    return events
      .filter((event) => event.status !== "cancelled")
      .sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime())
  }, [events])

  const formatEventTime = (startTime: string, endTime: string) => {
    const start = parseISO(startTime)
    const end = parseISO(endTime)
    return `${format(start, "h:mm a")} - ${format(end, "h:mm a")}`
  }

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center gap-2 mb-4">
          <CalendarIcon className="h-5 w-5 text-purple-500" />
          <h3 className="font-semibold text-gray-900">Upcoming Events</h3>
        </div>

        <ScrollArea className="h-[calc(100vh-350px)]">
          <div className="space-y-3">
            {sortedEvents.length > 0 ? (
              sortedEvents.map((event) => (
                <div
                  key={event.id}
                  className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                    selectedEvent?.id === event.id
                      ? "border-purple-300 bg-purple-50"
                      : "border-gray-200 hover:bg-gray-50"
                  }`}
                  onClick={() => onEventClick(event)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault()
                      onEventClick(event)
                    }
                  }}
                  aria-label={`${event.title} on ${format(parseISO(event.startTime), "EEEE, MMMM d")}`}
                >
                  <div className="flex items-start gap-2">
                    <div
                      className="w-1 h-full min-h-[40px] rounded-full flex-shrink-0"
                      style={{ backgroundColor: event.color || "#8B5CF6" }}
                      aria-hidden="true"
                    ></div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-gray-900 truncate">{event.title}</h4>
                      <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                        <Clock className="h-3 w-3 flex-shrink-0" aria-hidden="true" />
                        <span>
                          {format(parseISO(event.startTime), "EEE, MMM d")} •{" "}
                          {formatEventTime(event.startTime, event.endTime)}
                        </span>
                      </div>
                      {event.eventType === "interview" && (
                        <Badge className="mt-2 bg-purple-100 text-purple-700 border-0">Interview</Badge>
                      )}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center text-gray-500 py-4">No upcoming events</div>
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}

