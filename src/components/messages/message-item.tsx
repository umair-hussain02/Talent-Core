import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { formatMessageTime } from "@/lib/utils"
import type { Message } from "@/types/message"

interface MessageItemProps {
  message: Message
}

export function MessageItem({ message }: MessageItemProps) {
  const isFromCurrentUser = message.isFromCurrentUser

  return (
    <div className={`flex gap-3 ${isFromCurrentUser ? "justify-end" : "justify-start"}`}>
      {!isFromCurrentUser && (
        <Avatar className="h-8 w-8 flex-shrink-0">
          <AvatarImage src={message.senderAvatar || "/placeholder.svg?height=32&width=32"} alt={message.senderName} />
          <AvatarFallback>{message.senderName.charAt(0)}</AvatarFallback>
        </Avatar>
      )}

      <div
        className={`max-w-[70%] rounded-lg p-3 ${
          isFromCurrentUser ? "bg-purple-500 text-white" : "bg-gray-100 text-gray-900 border border-gray-200"
        }`}
      >
        <p className="text-sm whitespace-pre-wrap break-words">{message.content}</p>
        <p className={`text-xs mt-1 ${isFromCurrentUser ? "text-purple-100" : "text-gray-500"}`}>
          {formatMessageTime(message.timestamp)}
        </p>
      </div>

      {isFromCurrentUser && (
        <Avatar className="h-8 w-8 flex-shrink-0">
          <AvatarImage src={message.senderAvatar || "/placeholder.svg?height=32&width=32"} alt={message.senderName} />
          <AvatarFallback>{message.senderName.charAt(0)}</AvatarFallback>
        </Avatar>
      )}
    </div>
  )
}
