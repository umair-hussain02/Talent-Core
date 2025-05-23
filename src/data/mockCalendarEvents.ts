import type { CalendarEvent } from "@/types/calendar";

export const mockCalendarEvents: CalendarEvent[] = [
  // Today's events
  {
    id: "event-1",
    title: "Interview with Malaika Brown",
    description: "First round interview for Sr. UX Designer position",
    startTime: new Date(new Date().setHours(10, 0, 0, 0)).toISOString(),
    endTime: new Date(new Date().setHours(11, 0, 0, 0)).toISOString(),
    location: "Meeting Room 3",
    isVirtual: true,
    meetingLink: "https://meet.google.com/abc-defg-hij",
    eventType: "interview",
    status: "scheduled",
    participants: [
      {
        id: "user-1",
        name: "John Doe",
        email: "john.doe@talentcore.com",
        avatar: "/placeholder.svg?height=40&width=40",
        role: "recruiter",
        status: "accepted",
      },
      {
        id: "user-3",
        name: "Mike Johnson",
        email: "mike.johnson@talentcore.com",
        avatar: "/placeholder.svg?height=40&width=40",
        role: "manager",
        status: "accepted",
      },
      {
        id: "2", // Malaika Brown
        name: "Malaika Brown",
        email: "malaika.b@gmail.com",
        avatar: "/placeholder.svg?height=40&width=40",
        role: "candidate",
        status: "accepted",
      },
    ],
    candidateId: "2",
    jobId: "1",
    color: "#8B5CF6", // Purple
    createdBy: "user-1",
    createdAt: new Date(
      new Date().setDate(new Date().getDate() - 3)
    ).toISOString(),
    updatedAt: new Date(
      new Date().setDate(new Date().getDate() - 2)
    ).toISOString(),
  },
  {
    id: "event-2",
    title: "Team Standup",
    description: "Daily recruitment team standup",
    startTime: new Date(new Date().setHours(9, 0, 0, 0)).toISOString(),
    endTime: new Date(new Date().setHours(9, 30, 0, 0)).toISOString(),
    isVirtual: true,
    meetingLink: "https://meet.google.com/xyz-abcd-efg",
    eventType: "meeting",
    status: "scheduled",
    participants: [
      {
        id: "user-1",
        name: "John Doe",
        email: "john.doe@talentcore.com",
        avatar: "/placeholder.svg?height=40&width=40",
        role: "recruiter",
        status: "accepted",
      },
      {
        id: "user-2",
        name: "Sarah Wilson",
        email: "sarah.wilson@talentcore.com",
        avatar: "/placeholder.svg?height=40&width=40",
        role: "hr",
        status: "accepted",
      },
      {
        id: "user-3",
        name: "Mike Johnson",
        email: "mike.johnson@talentcore.com",
        avatar: "/placeholder.svg?height=40&width=40",
        role: "manager",
        status: "accepted",
      },
    ],
    color: "#10B981", // Green
    createdBy: "user-1",
    createdAt: new Date(
      new Date().setDate(new Date().getDate() - 7)
    ).toISOString(),
    updatedAt: new Date(
      new Date().setDate(new Date().getDate() - 7)
    ).toISOString(),
  },

  // Tomorrow's events
  {
    id: "event-3",
    title: "Final Interview with Nishant Talwar",
    description: "Final round interview for Sr. UX Designer position",
    startTime: new Date(new Date().setDate(new Date().getDate() + 1))
      .setHours(14, 0, 0, 0)
      .toString(),
    endTime: new Date(new Date().setDate(new Date().getDate() + 1))
      .setHours(15, 30, 0, 0)
      .toString(),
    location: "Conference Room A",
    isVirtual: false,
    eventType: "interview",
    status: "scheduled",
    participants: [
      {
        id: "user-1",
        name: "John Doe",
        email: "john.doe@talentcore.com",
        avatar: "/placeholder.svg?height=40&width=40",
        role: "recruiter",
        status: "accepted",
      },
      {
        id: "user-2",
        name: "Sarah Wilson",
        email: "sarah.wilson@talentcore.com",
        avatar: "/placeholder.svg?height=40&width=40",
        role: "hr",
        status: "accepted",
      },
      {
        id: "user-3",
        name: "Mike Johnson",
        email: "mike.johnson@talentcore.com",
        avatar: "/placeholder.svg?height=40&width=40",
        role: "manager",
        status: "accepted",
      },
      {
        id: "5", // Nishant Talwar
        name: "Nishant Talwar",
        email: "nishant.t@gmail.com",
        avatar: "/placeholder.svg?height=40&width=40",
        role: "candidate",
        status: "accepted",
      },
    ],
    candidateId: "5",
    jobId: "1",
    color: "#8B5CF6", // Purple
    createdBy: "user-2",
    createdAt: new Date(
      new Date().setDate(new Date().getDate() - 5)
    ).toISOString(),
    updatedAt: new Date(
      new Date().setDate(new Date().getDate() - 2)
    ).toISOString(),
  },

  // Day after tomorrow
  {
    id: "event-4",
    title: "Design Challenge Review - Charlie Kristen",
    description:
      "Review design challenge submission for Sr. UX Designer position",
    startTime: new Date(new Date().setDate(new Date().getDate() + 2))
      .setHours(11, 0, 0, 0)
      .toString(),
    endTime: new Date(new Date().setDate(new Date().getDate() + 2))
      .setHours(12, 0, 0, 0)
      .toString(),
    isVirtual: true,
    meetingLink: "https://meet.google.com/pqr-stuv-wxy",
    eventType: "meeting",
    status: "scheduled",
    participants: [
      {
        id: "user-1",
        name: "John Doe",
        email: "john.doe@talentcore.com",
        avatar: "/placeholder.svg?height=40&width=40",
        role: "recruiter",
        status: "accepted",
      },
      {
        id: "user-3",
        name: "Mike Johnson",
        email: "mike.johnson@talentcore.com",
        avatar: "/placeholder.svg?height=40&width=40",
        role: "manager",
        status: "accepted",
      },
    ],
    candidateId: "1", // Charlie Kristen
    jobId: "1",
    color: "#F59E0B", // Amber
    createdBy: "user-1",
    createdAt: new Date(
      new Date().setDate(new Date().getDate() - 1)
    ).toISOString(),
    updatedAt: new Date(
      new Date().setDate(new Date().getDate() - 1)
    ).toISOString(),
  },

  // Next week
  {
    id: "event-5",
    title: "Quarterly Recruitment Planning",
    description: "Plan recruitment strategy for next quarter",
    startTime: new Date(new Date().setDate(new Date().getDate() + 7))
      .setHours(13, 0, 0, 0)
      .toString(),
    endTime: new Date(new Date().setDate(new Date().getDate() + 7))
      .setHours(16, 0, 0, 0)
      .toString(),
    location: "Board Room",
    isVirtual: false,
    eventType: "meeting",
    status: "scheduled",
    participants: [
      {
        id: "user-1",
        name: "John Doe",
        email: "john.doe@talentcore.com",
        avatar: "/placeholder.svg?height=40&width=40",
        role: "recruiter",
        status: "accepted",
      },
      {
        id: "user-2",
        name: "Sarah Wilson",
        email: "sarah.wilson@talentcore.com",
        avatar: "/placeholder.svg?height=40&width=40",
        role: "hr",
        status: "accepted",
      },
      {
        id: "user-3",
        name: "Mike Johnson",
        email: "mike.johnson@talentcore.com",
        avatar: "/placeholder.svg?height=40&width=40",
        role: "manager",
        status: "accepted",
      },
    ],
    color: "#EF4444", // Red
    createdBy: "user-2",
    createdAt: new Date(
      new Date().setDate(new Date().getDate() - 14)
    ).toISOString(),
    updatedAt: new Date(
      new Date().setDate(new Date().getDate() - 14)
    ).toISOString(),
  },

  // Last week (completed)
  {
    id: "event-6",
    title: "Phone Screening - Simon Minter",
    description: "Initial phone screening for Financial Analyst position",
    startTime: new Date(new Date().setDate(new Date().getDate() - 7))
      .setHours(10, 0, 0, 0)
      .toString(),
    endTime: new Date(new Date().setDate(new Date().getDate() - 7))
      .setHours(10, 30, 0, 0)
      .toString(),
    isVirtual: true,
    eventType: "interview",
    status: "completed",
    participants: [
      {
        id: "user-2",
        name: "Sarah Wilson",
        email: "sarah.wilson@talentcore.com",
        avatar: "/placeholder.svg?height=40&width=40",
        role: "hr",
        status: "accepted",
      },
      {
        id: "3", // Simon Minter
        name: "Simon Minter",
        email: "simon.m@gmail.com",
        avatar: "/placeholder.svg?height=40&width=40",
        role: "candidate",
        status: "accepted",
      },
    ],
    candidateId: "3",
    jobId: "3",
    color: "#8B5CF6", // Purple
    createdBy: "user-2",
    createdAt: new Date(
      new Date().setDate(new Date().getDate() - 14)
    ).toISOString(),
    updatedAt: new Date(
      new Date().setDate(new Date().getDate() - 8)
    ).toISOString(),
  },
];
