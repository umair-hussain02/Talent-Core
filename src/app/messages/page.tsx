"use client"

import { useState, useCallback } from "react"
import { ConversationList } from "@/components/messages/conversation-list"
import { ConversationHeader } from "@/components/messages/conversation-header"
import { MessageThread } from "@/components/messages/message-thread"
import { MessageInput } from "@/components/messages/message-input"
import { EmptyState } from "@/components/messages/empty-state"
import { mockConversations, mockMessages } from "@/data/mockMessages"
import type { Conversation } from "@/types/message"

export default function MessagesPage() {
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(mockConversations[0])

  // Filter messages for the selected conversation
  const conversationMessages = selectedConversation
    ? mockMessages.filter((message) => message.conversationId === selectedConversation.id)
    : []

  // Handle sending a new message
  const handleSendMessage = useCallback(
    (content: string) => {
      if (content && selectedConversation) {
        // In a real app, this would send the message to the backend
        console.log("Sending message:", content, "to conversation:", selectedConversation.id)
      }
    },
    [selectedConversation],
  )

  // Handle selecting a conversation
  const handleSelectConversation = useCallback((conversation: Conversation) => {
    setSelectedConversation(conversation)
  }, [])

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-gray-900 mt-8 mb-6">Messages</h1>

      <div className="bg-white rounded-lg shadow-sm border border-gray-100 h-[calc(100vh-200px)] flex">
        {/* Conversations List */}
        <div className="w-1/3 border-r border-gray-200 flex flex-col">
          <ConversationList
            conversations={mockConversations}
            selectedConversation={selectedConversation}
            onSelectConversation={handleSelectConversation}
          />
        </div>

        {/* Message Thread */}
        <div className="flex-1 flex flex-col">
          {selectedConversation ? (
            <>
              <ConversationHeader conversation={selectedConversation} />
              <MessageThread messages={conversationMessages} />
              <MessageInput onSendMessage={handleSendMessage} />
            </>
          ) : (
            <EmptyState />
          )}
        </div>
      </div>
    </div>
  )
}
