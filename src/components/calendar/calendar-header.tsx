"use client"
import { ChevronLeft, ChevronRight, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { CalendarView } from "@/types/calendar"

interface CalendarHeaderProps {
  currentDate: Date
  view: CalendarView
  onViewChange: (view: CalendarView) => void
  onPrevious: () => void
  onNext: () => void
  onToday: () => void
  onNewEvent: () => void
  displayTitle: string
}

export function CalendarHeader({
  view,
  onViewChange,
  onPrevious,
  onNext,
  onToday,
  onNewEvent,
  displayTitle,
}: CalendarHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" onClick={onPrevious} aria-label="Previous period">
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="sm" onClick={onToday}>
          Today
        </Button>
        <Button variant="outline" size="sm" onClick={onNext} aria-label="Next period">
          <ChevronRight className="h-4 w-4" />
        </Button>
        <h2 className="text-lg font-semibold ml-2" aria-live="polite">
          {displayTitle}
        </h2>
      </div>

      <div className="flex items-center gap-4">
        <Tabs value={view} onValueChange={(value) => onViewChange(value as CalendarView)}>
          <TabsList className="grid w-[250px] grid-cols-3">
            <TabsTrigger value="day">Day</TabsTrigger>
            <TabsTrigger value="week">Week</TabsTrigger>
            <TabsTrigger value="month">Month</TabsTrigger>
          </TabsList>
        </Tabs>

        <Button className="bg-purple-500 hover:bg-purple-600" onClick={onNewEvent}>
          <Plus className="h-4 w-4 mr-2" />
          New Event
        </Button>
      </div>
    </div>
  )
}

