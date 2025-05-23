export interface CalendarEvent {
  id: string;
  title: string;
  description?: string;
  startTime: string;
  endTime: string;
  location?: string;
  isVirtual?: boolean;
  meetingLink?: string;
  eventType: "interview" | "meeting" | "task" | "reminder" | "other";
  status: "scheduled" | "completed" | "cancelled" | "rescheduled";
  participants: Participant[];
  candidateId?: string; // Link to candidate if event is an interview
  jobId?: string; // Link to job if event is related to a specific job
  color?: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface Participant {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: "recruiter" | "hr" | "manager" | "candidate" | "team_member";
  status: "accepted" | "declined" | "pending" | "tentative";
}

export type CalendarView = "day" | "week" | "month";

export interface CalendarDay {
  date: Date;
  isCurrentMonth: boolean;
  isToday: boolean;
  events: CalendarEvent[];
}

export interface CalendarWeek {
  days: CalendarDay[];
}

export interface CalendarMonth {
  weeks: CalendarWeek[];
}
