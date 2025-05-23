"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { formatMessageTime } from "@/lib/utils"
import type { Conversation } from "@/types/message"

interface ConversationItemProps {
  conversation: Conversation
  isSelected: boolean
  onClick: () => void
}

export function ConversationItem({ conversation, isSelected, onClick }: ConversationItemProps) {
  return (
    <div
      className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors ${
        isSelected ? "bg-purple-50 border border-purple-200" : "hover:bg-gray-50"
      }`}
      onClick={onClick}
      role="button"
      aria-selected={isSelected}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          onClick()
        }
      }}
    >
      <div className="relative">
        <Avatar className="h-12 w-12">
          <AvatarImage
            src={conversation.participantAvatars[1] || "/placeholder.svg?height=48&width=48"}
            alt={conversation.participantNames[1]}
          />
          <AvatarFallback>{conversation.participantNames[1]?.charAt(0)}</AvatarFallback>
        </Avatar>
        {conversation.type === "candidate" && (
          <div className="absolute -bottom-1 -right-1 h-4 w-4 bg-blue-500 rounded-full flex items-center justify-center">
            <span className="text-xs text-white">C</span>
          </div>
        )}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <h3 className="font-medium text-gray-900 truncate">{conversation.title}</h3>
          <span className="text-xs text-gray-500">{formatMessageTime(conversation.lastMessage.timestamp)}</span>
        </div>
        <p className="text-sm text-gray-600 truncate">{conversation.lastMessage.content}</p>
        <div className="flex items-center gap-2 mt-1">
          {conversation.type === "candidate" && (
            <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700 border-blue-200">
              Candidate
            </Badge>
          )}
          {conversation.unreadCount > 0 && (
            <Badge className="text-xs bg-purple-500 text-white">{conversation.unreadCount}</Badge>
          )}
        </div>
      </div>
    </div>
  )
}
