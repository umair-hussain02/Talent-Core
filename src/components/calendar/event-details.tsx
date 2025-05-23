"use client"

import { format, parseISO } from "date-fns"
import { Clock, MapPin, Video, Users, ChevronRight } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import type { CalendarEvent } from "@/types/calendar"

interface EventDetailsProps {
  event: CalendarEvent
  onClose?: () => void
}

export function EventDetails({ event, onClose }: EventDetailsProps) {
  const formatEventTime = (startTime: string, endTime: string) => {
    const start = parseISO(startTime)
    const end = parseISO(endTime)
    return `${format(start, "h:mm a")} - ${format(end, "h:mm a")}`
  }

  return (
    <Card className="mt-4">
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-4">
          <h3 className="font-semibold text-gray-900">Event Details</h3>
          {onClose && (
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={onClose}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          )}
        </div>

        <div className="space-y-4">
          <div>
            <h4 className="text-lg font-medium text-gray-900">{event.title}</h4>
            {event.description && <p className="text-sm text-gray-600 mt-1">{event.description}</p>}
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="bg-gray-100 p-2 rounded-full">
                <Clock className="h-4 w-4 text-gray-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">
                  {format(parseISO(event.startTime), "EEEE, MMMM d, yyyy")}
                </p>
                <p className="text-sm text-gray-600">{formatEventTime(event.startTime, event.endTime)}</p>
              </div>
            </div>

            {event.location && (
              <div className="flex items-center gap-3">
                <div className="bg-gray-100 p-2 rounded-full">
                  {event.isVirtual ? (
                    <Video className="h-4 w-4 text-gray-600" />
                  ) : (
                    <MapPin className="h-4 w-4 text-gray-600" />
                  )}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {event.isVirtual ? "Virtual Meeting" : event.location}
                  </p>
                  {event.isVirtual && event.meetingLink && (
                    <a
                      href={event.meetingLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-purple-600 hover:underline"
                    >
                      Join meeting
                    </a>
                  )}
                </div>
              </div>
            )}

            <div className="flex items-start gap-3">
              <div className="bg-gray-100 p-2 rounded-full">
                <Users className="h-4 w-4 text-gray-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900 mb-2">Participants</p>
                <div className="space-y-2">
                  {event.participants.map((participant) => (
                    <div key={participant.id} className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={participant.avatar || "/placeholder.svg"} alt={participant.name} />
                        <AvatarFallback className="text-xs">{participant.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <span className="text-sm text-gray-700 flex-1">{participant.name}</span>
                      {participant.role === "candidate" && (
                        <Badge className="bg-blue-100 text-blue-700 border-0">Candidate</Badge>
                      )}
                      <Badge
                        variant="outline"
                        className={`text-xs ${
                          participant.status === "accepted"
                            ? "bg-green-50 text-green-700 border-green-200"
                            : participant.status === "declined"
                              ? "bg-red-50 text-red-700 border-red-200"
                              : "bg-gray-50 text-gray-700 border-gray-200"
                        }`}
                      >
                        {participant.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-2 pt-4 border-t">
            <Button className="flex-1 bg-purple-500 hover:bg-purple-600">
              {event.eventType === "interview" ? "Start Interview" : "Join Meeting"}
            </Button>
            <Button variant="outline" className="flex-1">
              Reschedule
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
