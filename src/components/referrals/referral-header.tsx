import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

export function ReferralHeader() {
  return (
    <div className="flex justify-between items-center mb-6 mt-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Referrals</h1>
        <p className="text-gray-600 mt-1">Manage employee referrals and track their progress</p>
      </div>
      <Button className="bg-purple-500 hover:bg-purple-600">
        <Plus className="h-4 w-4 mr-2" />
        New Referral
      </Button>
    </div>
  )
}
