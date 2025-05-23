import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function ReportsLoading() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Sidebar Skeleton */}
        <div className="w-80 bg-white border-r border-gray-200 p-6 space-y-6">
          <div className="space-y-4">
            <Skeleton className="h-6 w-40" />
            <div className="grid grid-cols-2 gap-3">
              {Array.from({ length: 4 }).map((_, i) => (
                <Card key={i}>
                  <CardContent className="p-4">
                    <Skeleton className="h-4 w-16 mb-2" />
                    <Skeleton className="h-6 w-12 mb-1" />
                    <Skeleton className="h-3 w-20" />
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <Skeleton className="h-5 w-24" />
            <div className="space-y-2">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="flex items-center justify-between p-3">
                  <div className="flex items-center space-x-2">
                    <Skeleton className="h-2 w-2 rounded-full" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                  <Skeleton className="h-5 w-6 rounded-full" />
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <Skeleton className="h-5 w-28" />
            <div className="space-y-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex items-start space-x-3">
                  <Skeleton className="h-6 w-6 rounded-full" />
                  <div className="flex-1 space-y-1">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-3 w-20" />
                    <Skeleton className="h-3 w-16" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content Skeleton */}
        <div className="flex-1 p-6">
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <Skeleton className="h-8 w-64 mb-2" />
                <Skeleton className="h-4 w-96" />
              </div>
              <Skeleton className="h-10 w-32" />
            </div>

            <div className="flex items-center space-x-4 mb-4">
              <Skeleton className="flex-1 h-10" />
              <Skeleton className="h-10 w-40" />
              <Skeleton className="h-10 w-40" />
              <Skeleton className="h-10 w-24" />
              <Skeleton className="h-10 w-20" />
            </div>

            <div className="flex items-center space-x-2">
              <Skeleton className="h-8 w-32" />
              <Skeleton className="h-8 w-28" />
              <Skeleton className="h-8 w-36" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <Card key={i}>
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-2">
                      <Skeleton className="h-10 w-10 rounded-lg" />
                      <div>
                        <Skeleton className="h-5 w-32 mb-2" />
                        <div className="flex space-x-2">
                          <Skeleton className="h-4 w-16 rounded-full" />
                          <Skeleton className="h-4 w-12 rounded-full" />
                        </div>
                      </div>
                    </div>
                    <Skeleton className="h-8 w-8" />
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-3/4 mb-4" />

                  <div className="flex items-center justify-between text-xs mb-4">
                    <div className="flex space-x-4">
                      <Skeleton className="h-3 w-8" />
                      <Skeleton className="h-3 w-8" />
                      <Skeleton className="h-3 w-12" />
                    </div>
                    <Skeleton className="h-3 w-16" />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Skeleton className="h-6 w-6 rounded-full" />
                      <div>
                        <Skeleton className="h-3 w-20 mb-1" />
                        <Skeleton className="h-3 w-16" />
                      </div>
                    </div>
                    <div className="flex space-x-1">
                      <Skeleton className="h-7 w-12" />
                      <Skeleton className="h-7 w-12" />
                    </div>
                  </div>

                  <div className="flex space-x-1 mt-3">
                    <Skeleton className="h-5 w-12 rounded-full" />
                    <Skeleton className="h-5 w-16 rounded-full" />
                    <Skeleton className="h-5 w-14 rounded-full" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
