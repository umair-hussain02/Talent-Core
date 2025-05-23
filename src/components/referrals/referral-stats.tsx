import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Users, Filter, DollarSign, Clock } from "lucide-react"
import type { ReferralStats } from "@/types/referral"

interface ReferralStatsProps {
  stats: ReferralStats
}

export function ReferralStats ({ stats }: ReferralStatsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-2">
            <div>
              <p className="text-sm text-gray-600">Total Referrals</p>
              <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
            </div>
            <div className="bg-purple-100 p-2 rounded-full">
              <Users className="h-5 w-5 text-purple-600" />
            </div>
          </div>
          <div className="space-y-1">
            <div className="flex justify-between text-xs">
              <span>Conversion Rate</span>
              <span className="font-medium">{stats.conversionRate}%</span>
            </div>
            <Progress value={stats.conversionRate} className="h-1.5" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-2">
            <div>
              <p className="text-sm text-gray-600">Active Pipeline</p>
              <p className="text-2xl font-bold text-gray-900">{stats.new + stats.contacted + stats.interviewing}</p>
            </div>
            <div className="bg-blue-100 p-2 rounded-full">
              <Filter className="h-5 w-5 text-blue-600" />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-1 text-xs">
            <div className="bg-blue-50 p-1 rounded text-center">
              <span className="block font-medium text-blue-700">{stats.new}</span>
              <span className="text-gray-600">New</span>
            </div>
            <div className="bg-purple-50 p-1 rounded text-center">
              <span className="block font-medium text-purple-700">{stats.contacted}</span>
              <span className="text-gray-600">Contacted</span>
            </div>
            <div className="bg-amber-50 p-1 rounded text-center">
              <span className="block font-medium text-amber-700">{stats.interviewing}</span>
              <span className="text-gray-600">Interviewing</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-2">
            <div>
              <p className="text-sm text-gray-600">Bonuses</p>
              <p className="text-2xl font-bold text-gray-900">${stats.totalBonusesPaid}</p>
            </div>
            <div className="bg-green-100 p-2 rounded-full">
              <DollarSign className="h-5 w-5 text-green-600" />
            </div>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-gray-600">Pending Bonuses</span>
            <span className="font-medium text-amber-600">${stats.pendingBonuses}</span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-2">
            <div>
              <p className="text-sm text-gray-600">Time to Hire</p>
              <p className="text-2xl font-bold text-gray-900">{stats.averageTimeToHire} days</p>
            </div>
            <div className="bg-amber-100 p-2 rounded-full">
              <Clock className="h-5 w-5 text-amber-600" />
            </div>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-gray-600">Hired Candidates</span>
            <span className="font-medium text-green-600">{stats.hired}</span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
