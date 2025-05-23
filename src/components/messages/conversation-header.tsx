import { Phone, Video, MoreVertical } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import type { Conversation } from "@/types/message"

interface ConversationHeaderProps {
  conversation: Conversation
}

export function ConversationHeader({ conversation }: ConversationHeaderProps) {
  const participantName = conversation.participantNames[1]
  const participantAvatar = conversation.participantAvatars[1]

  return (
    <div className="p-4 border-b border-gray-200 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <Avatar className="h-10 w-10">
          <AvatarImage src={participantAvatar || "/placeholder.svg?height=40&width=40"} alt={participantName} />
          <AvatarFallback>{participantName?.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <h2 className="font-semibold text-gray-900">{conversation.title}</h2>
          <p className="text-sm text-gray-500">{conversation.type === "candidate" ? "Candidate" : "Team Member"}</p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="h-8 w-8" aria-label="Call">
          <Phone className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8" aria-label="Video call">
          <Video className="h-4 w-4" />
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8" aria-label="More options">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>View Profile</DropdownMenuItem>
            <DropdownMenuItem>Archive Conversation</DropdownMenuItem>
            <DropdownMenuItem>Delete Conversation</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}
