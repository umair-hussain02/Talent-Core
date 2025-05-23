"use client"

import { useState } from "react"
import { Send, Paperclip } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface MessageInputProps {
  onSendMessage: (message: string) => void
  disabled?: boolean
}

export function MessageInput({ onSendMessage, disabled = false }: MessageInputProps) {
  const [message, setMessage] = useState("")

  const handleSendMessage = () => {
    if (message.trim() && !disabled) {
      onSendMessage(message.trim())
      setMessage("")
    }
  }

  return (
    <div className="p-4 border-t border-gray-200">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="h-8 w-8" aria-label="Attach file" disabled={disabled}>
          <Paperclip className="h-4 w-4" />
        </Button>
        <Input
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
          className="flex-1"
          disabled={disabled}
          aria-label="Message input"
        />
        <Button
          onClick={handleSendMessage}
          disabled={!message.trim() || disabled}
          className="bg-purple-500 hover:bg-purple-600"
          aria-label="Send message"
        >
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
