export interface Message {
  id: string;
  content: string;
  timestamp: string;
  senderId: string;
  senderName: string;
  senderAvatar?: string;
  recipientId: string;
  recipientName: string;
  recipientAvatar?: string;
  conversationId: string;
  isRead: boolean;
  messageType: "text" | "file" | "image" | "system";
  attachments?: Attachment[];
  candidateId?: string; // Link to candidate if message is related to recruitment
  jobId?: string; // Link to job if message is related to specific job
  isFromCurrentUser: boolean;
}

export interface Attachment {
  id: string;
  name: string;
  type: string;
  size: number;
  url: string;
}

export interface Conversation {
  id: string;
  participantIds: string[];
  participantNames: string[];
  participantAvatars: string[];
  lastMessage: Message;
  unreadCount: number;
  title: string;
  type: "direct" | "group" | "candidate" | "recruiter";
  candidateId?: string; // If conversation is about a specific candidate
  jobId?: string; // If conversation is about a specific job
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: "recruiter" | "hr" | "manager" | "candidate";
  isOnline: boolean;
  lastSeen?: string;
}
