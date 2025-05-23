import { ScrollArea } from "@/components/ui/scroll-area"
import { MessageItem } from "@/components/messages/message-item"
import type { Message } from "@/types/message"

interface MessageThreadProps {
  messages: Message[]
}

export function MessageThread({ messages }: MessageThreadProps) {
  return (
    <ScrollArea className="flex-1 p-4">
      <div className="space-y-4">
        {messages.length > 0 ? (
          messages.map((message) => <MessageItem key={message.id} message={message} />)
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-500">No messages yet</p>
          </div>
        )}
      </div>
    </ScrollArea>
  )
}
