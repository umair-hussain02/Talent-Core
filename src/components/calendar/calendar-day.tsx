"use client"

import { format, isSameDay, parseISO } from "date-fns"
import { Badge } from "@/components/ui/badge"
import { CalendarEvent } from "./calendar-event"
import type { CalendarEvent as CalendarEventType } from "@/types/calendar"

interface CalendarDayProps {
  day: Date
  events: CalendarEventType[]
  isCurrentMonth?: boolean
  isToday?: boolean
  view: "day" | "week" | "month"
  onEventClick: (event: CalendarEventType) => void
}

export function CalendarDay({
  day,
  events,
  isCurrentMonth = true,
  isToday = false,
  view,
  onEventClick,
}: CalendarDayProps) {
  const dayEvents = events.filter((event) => {
    const eventDate = parseISO(event.startTime)
    return isSameDay(eventDate, day)
  })

  if (view === "month") {
    return (
      <div
        className={`min-h-[100px] border ${
          isToday
            ? "bg-purple-50 border-purple-200"
            : isCurrentMonth
              ? "bg-white border-gray-200"
              : "bg-gray-50 border-gray-100"
        } p-1 overflow-hidden`}
        role="gridcell"
        aria-label={`${format(day, "EEEE, MMMM d, yyyy")} - ${dayEvents.length} events`}
      >
        <div className="flex justify-between items-center mb-1">
          <span
            className={`text-sm font-medium ${
              isToday ? "text-purple-700" : isCurrentMonth ? "text-gray-900" : "text-gray-400"
            }`}
          >
            {format(day, "d")}
          </span>
          {isToday && <div className="h-2 w-2 rounded-full bg-purple-500" aria-hidden="true"></div>}
        </div>

        <div className="space-y-1">
          {dayEvents.slice(0, 2).map((event) => (
            <CalendarEvent key={event.id} event={event} view="month" onClick={() => onEventClick(event)} />
          ))}
          {dayEvents.length > 2 && <div className="text-xs text-gray-500 p-1">+{dayEvents.length - 2} more</div>}
        </div>
      </div>
    )
  }

  // Day/Week view
  return (
    <div className="mb-4">
      <div className={`flex items-center justify-between p-3 rounded-t-lg ${isToday ? "bg-purple-100" : "bg-gray-50"}`}>
        <h3 className="font-medium">
          {format(day, "EEEE, MMMM d")}
          {isToday && <Badge className="ml-2 bg-purple-500 text-white">Today</Badge>}
        </h3>
      </div>

      <div className="border border-gray-200 rounded-b-lg bg-white">
        {dayEvents.length > 0 ? (
          dayEvents.map((event) => (
            <CalendarEvent key={event.id} event={event} view="list" onClick={() => onEventClick(event)} />
          ))
        ) : (
          <div className="p-6 text-center text-gray-500">No events scheduled for this day</div>
        )}
      </div>
    </div>
  )
}
