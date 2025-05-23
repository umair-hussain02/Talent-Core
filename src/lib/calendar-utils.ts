import {
  format,
  addDays,
  addMonths,
  subMonths,
  parseISO,
  isWithinInterval,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
} from "date-fns"
import type { CalendarEvent, CalendarView } from "@/types/calendar"

/**
 * Formats the display title for the calendar header based on the current view
 */
export function getCalendarDisplayTitle(currentDate: Date, view: CalendarView, days: Date[]): string {
  if (view === "day") {
    return format(currentDate, "MMMM d, yyyy")
  } else if (view === "week") {
    return `${format(days[0], "MMM d")} - ${format(days[days.length - 1], "MMM d, yyyy")}`
  } else {
    return format(currentDate, "MMMM yyyy")
  }
}

/**
 * Navigates to the previous period based on the current view
 */
export function navigateToPrevious(currentDate: Date, view: CalendarView): Date {
  if (view === "day") {
    return addDays(currentDate, -1)
  } else if (view === "week") {
    return addDays(currentDate, -7)
  } else {
    return subMonths(currentDate, 1)
  }
}

/**
 * Navigates to the next period based on the current view
 */
export function navigateToNext(currentDate: Date, view: CalendarView): Date {
  if (view === "day") {
    return addDays(currentDate, 1)
  } else if (view === "week") {
    return addDays(currentDate, 7)
  } else {
    return addMonths(currentDate, 1)
  }
}

/**
 * Filters events for the current view period
 */
export function getEventsForView(events: CalendarEvent[], currentDate: Date, view: CalendarView): CalendarEvent[] {
  if (view === "day") {
    return events.filter((event) => {
      const eventDate = parseISO(event.startTime)
      return format(eventDate, "yyyy-MM-dd") === format(currentDate, "yyyy-MM-dd")
    })
  } else if (view === "week") {
    const weekStart = startOfWeek(currentDate, { weekStartsOn: 1 })
    const weekEnd = endOfWeek(currentDate, { weekStartsOn: 1 })
    return events.filter((event) => {
      const eventDate = parseISO(event.startTime)
      return isWithinInterval(eventDate, { start: weekStart, end: weekEnd })
    })
  } else {
    // Month view
    const monthStart = startOfMonth(currentDate)
    const monthEnd = endOfMonth(currentDate)
    return events.filter((event) => {
      const eventDate = parseISO(event.startTime)
      return isWithinInterval(eventDate, { start: monthStart, end: monthEnd })
    })
  }
}

/**
 * Formats event time for display
 */
export function formatEventTime(startTime: string, endTime: string): string {
  const start = parseISO(startTime)
  const end = parseISO(endTime)
  return `${format(start, "h:mm a")} - ${format(end, "h:mm a")}`
}

/**
 * Gets the status color for an event
 */
export function getEventStatusColor(status: string): string {
  switch (status) {
    case "scheduled":
      return "bg-blue-50 text-blue-700 border-blue-200"
    case "completed":
      return "bg-green-50 text-green-700 border-green-200"
    case "cancelled":
      return "bg-red-50 text-red-700 border-red-200"
    case "rescheduled":
      return "bg-amber-50 text-amber-700 border-amber-200"
    default:
      return "bg-gray-50 text-gray-700 border-gray-200"
  }
}

/**
 * Gets the participant status color
 */
export function getParticipantStatusColor(status: string): string {
  switch (status) {
    case "accepted":
      return "bg-green-50 text-green-700 border-green-200"
    case "declined":
      return "bg-red-50 text-red-700 border-red-200"
    case "tentative":
      return "bg-amber-50 text-amber-700 border-amber-200"
    default:
      return "bg-gray-50 text-gray-700 border-gray-200"
  }
}
