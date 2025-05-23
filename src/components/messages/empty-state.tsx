interface EmptyStateProps {
  title?: string
  description?: string
}

export function EmptyState({
  title = "Select a conversation",
  description = "Choose a conversation from the list to start messaging",
}: EmptyStateProps) {
  return (
    <div className="flex-1 flex items-center justify-center">
      <div className="text-center">
        <h3 className="text-lg font-medium text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-500">{description}</p>
      </div>
    </div>
  )
}
