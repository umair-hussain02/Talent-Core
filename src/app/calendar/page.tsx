"use client"

import { useState, useMemo, useCallback } from "react"
import { startOfWeek, endOfWeek, startOfMonth, endOfMonth, eachDayOfInterval, addDays } from "date-fns"
import { ScrollArea } from "@/components/ui/scroll-area"
import { CalendarHeader } from "@/components/calendar/calendar-header"
import { CalendarGrid } from "@/components/calendar/calendar-grid"
import { UpcomingEvents } from "@/components/calendar/upcoming-events"
import { EventDetails } from "@/components/calendar/event-details"
import { EmptyState } from "@/components/calendar/empty-state"
import { mockCalendarEvents } from "@/data/mockCalendarEvents"
import { getCalendarDisplayTitle, navigateToPrevious, navigateToNext, getEventsForView } from "@/lib/calendar-utils"
import type { CalendarEvent, CalendarView } from "@/types/calendar"

export default function InterviewsPage() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [view, setView] = useState<CalendarView>("week")
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null)

  // Get days for the current view
  const days = useMemo(() => {
    if (view === "day") {
      return [currentDate]
    } else if (view === "week") {
      const start = startOfWeek(currentDate, { weekStartsOn: 1 })
      return Array.from({ length: 7 }, (_, i) => addDays(start, i))
    } else {
      const start = startOfMonth(currentDate)
      const end = endOfMonth(currentDate)
      const firstDay = startOfWeek(start, { weekStartsOn: 1 })
      const lastDay = endOfWeek(end, { weekStartsOn: 1 })
      return eachDayOfInterval({ start: firstDay, end: lastDay })
    }
  }, [currentDate, view])

  // Filter events for the current view
  const eventsForView = useMemo(() => {
    return getEventsForView(mockCalendarEvents, currentDate, view)
  }, [currentDate, view])

  // Get display title for the header
  const displayTitle = useMemo(() => {
    return getCalendarDisplayTitle(currentDate, view, days)
  }, [currentDate, view, days])

  // Navigation handlers
  const handlePrevious = useCallback(() => {
    setCurrentDate((date) => navigateToPrevious(date, view))
  }, [view])

  const handleNext = useCallback(() => {
    setCurrentDate((date) => navigateToNext(date, view))
  }, [view])

  const handleToday = useCallback(() => {
    setCurrentDate(new Date())
  }, [])

  const handleViewChange = useCallback((newView: CalendarView) => {
    setView(newView)
  }, [])

  const handleEventClick = useCallback((event: CalendarEvent) => {
    setSelectedEvent(event)
  }, [])

  const handleNewEvent = useCallback(() => {
    // TODO: Implement new event creation
    console.log("Create new event")
  }, [])

  const hasEvents = mockCalendarEvents.length > 0

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6 mt-8">
        <h1 className="text-2xl font-bold text-gray-900">Interviews & Calendar</h1>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
        <CalendarHeader
          currentDate={currentDate}
          view={view}
          onViewChange={handleViewChange}
          onPrevious={handlePrevious}
          onNext={handleNext}
          onToday={handleToday}
          onNewEvent={handleNewEvent}
          displayTitle={displayTitle}
        />

        {hasEvents ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <ScrollArea className="h-[calc(100vh-300px)]">
                <CalendarGrid
                  currentDate={currentDate}
                  view={view}
                  events={mockCalendarEvents}
                  onEventClick={handleEventClick}
                />
              </ScrollArea>
            </div>

            <div>
              <UpcomingEvents events={eventsForView} selectedEvent={selectedEvent} onEventClick={handleEventClick} />

              {selectedEvent && <EventDetails event={selectedEvent} onClose={() => setSelectedEvent(null)} />}
            </div>
          </div>
        ) : (
          <EmptyState onCreateEvent={handleNewEvent} />
        )}
      </div>
    </div>
  )
}
