import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="container mx-auto p-4">
      <Skeleton className="h-8 w-48 mt-8 mb-6" />

      <div className="bg-white rounded-lg shadow-sm border border-gray-100 h-[calc(100vh-200px)] flex">
        {/* Conversations List Skeleton */}
        <div className="w-1/3 border-r border-gray-200 flex flex-col p-4">
          <Skeleton className="h-10 w-full mb-4" />

          <div className="space-y-4">
            {Array(5)
              .fill(0)
              .map((_, i) => (
                <div key={i} className="flex items-center gap-3">
                  <Skeleton className="h-12 w-12 rounded-full" />
                  <div className="flex-1">
                    <Skeleton className="h-4 w-3/4 mb-2" />
                    <Skeleton className="h-3 w-full" />
                    <Skeleton className="h-3 w-1/4 mt-2" />
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* Message Thread Skeleton */}
        <div className="flex-1 flex flex-col">
          <div className="p-4 border-b border-gray-200 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Skeleton className="h-10 w-10 rounded-full" />
              <div>
                <Skeleton className="h-5 w-40 mb-1" />
                <Skeleton className="h-3 w-24" />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Skeleton className="h-8 w-8 rounded-md" />
              <Skeleton className="h-8 w-8 rounded-md" />
              <Skeleton className="h-8 w-8 rounded-md" />
            </div>
          </div>

          <div className="flex-1 p-4">
            <div className="space-y-4">
              {Array(4)
                .fill(0)
                .map((_, i) => (
                  <div key={i} className={`flex gap-3 ${i % 2 === 0 ? "justify-start" : "justify-end"}`}>
                    {i % 2 === 0 && <Skeleton className="h-8 w-8 rounded-full" />}
                    <Skeleton className={`h-20 ${i % 2 === 0 ? "w-2/3" : "w-1/2"} rounded-lg`} />
                    {i % 2 !== 0 && <Skeleton className="h-8 w-8 rounded-full" />}
                  </div>
                ))}
            </div>
          </div>

          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center gap-2">
              <Skeleton className="h-8 w-8 rounded-md" />
              <Skeleton className="h-10 flex-1 rounded-md" />
              <Skeleton className="h-10 w-10 rounded-md" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
