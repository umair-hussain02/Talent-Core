import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, Plus } from "lucide-react"

export function ReferralEmptyState() {
  return (
    <Card>
      <CardContent className="p-8 text-center">
        <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">No referrals found</h3>
        <p className="text-gray-600 mb-4">Try adjusting your search criteria or filters</p>
        <Button className="bg-purple-500 hover:bg-purple-600">
          <Plus className="h-4 w-4 mr-2" />
          New Referral
        </Button>
      </CardContent>
    </Card>
  )
}
