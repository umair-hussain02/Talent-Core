"use client"

import { useMemo } from "react"
import {
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  addDays,
} from "date-fns"
import { CalendarDay } from "./calendar-day"
import type { CalendarEvent, CalendarView } from "@/types/calendar"

interface CalendarGridProps {
  currentDate: Date
  view: CalendarView
  events: CalendarEvent[]
  onEventClick: (event: CalendarEvent) => void
}

export function CalendarGrid({ currentDate, view, events, onEventClick }: CalendarGridProps) {
  // Get days for the current view
  const days = useMemo(() => {
    if (view === "day") {
      return [currentDate]
    } else if (view === "week") {
      const start = startOfWeek(currentDate, { weekStartsOn: 1 }) // Start on Monday
      return Array.from({ length: 7 }, (_, i) => addDays(start, i))
    } else {
      // Month view
      const start = startOfMonth(currentDate)
      const end = endOfMonth(currentDate)
      // Include days from previous and next month to fill the calendar grid
      const firstDay = startOfWeek(start, { weekStartsOn: 1 })
      const lastDay = endOfWeek(end, { weekStartsOn: 1 })
      return eachDayOfInterval({ start: firstDay, end: lastDay })
    }
  }, [currentDate, view])

  if (view === "month") {
    return (
      <div className="grid grid-cols-7 gap-1" role="grid" aria-label="Calendar grid">
        {/* Day headers */}
        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
          <div key={day} className="p-2 text-center font-medium text-gray-500 text-sm" role="columnheader">
            {day}
          </div>
        ))}

        {/* Calendar days */}
        {days.map((day) => {
          const isCurrentMonth = isSameMonth(day, currentDate)
          const isToday = isSameDay(day, new Date())

          return (
            <CalendarDay
              key={day.toString()}
              day={day}
              events={events}
              isCurrentMonth={isCurrentMonth}
              isToday={isToday}
              view="month"
              onEventClick={onEventClick}
            />
          )
        })}
      </div>
    )
  }

  // Day/Week view
  return (
    <div className="grid grid-cols-1 gap-4">
      {days.map((day) => (
        <CalendarDay
          key={day.toString()}
          day={day}
          events={events}
          isToday={isSameDay(day, new Date())}
          view={view}
          onEventClick={onEventClick}
        />
      ))}
    </div>
  )
}
