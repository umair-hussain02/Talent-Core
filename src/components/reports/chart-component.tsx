"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BarChart3, LineChart, PieChart, TrendingUp } from "lucide-react"

interface ChartData {
  id: string
  title: string
  type: "bar" | "line" | "pie" | "doughnut" | "area" | "metric"
  value?: string | number
  change?: string
  changeType?: "positive" | "negative" | "neutral"
  data?: []
  color?: string
}

interface ChartComponentProps {
  chart: ChartData
  className?: string
}

export function ChartComponent({ chart, className }: ChartComponentProps) {
  const getIcon = (type: string) => {
    switch (type) {
      case "bar":
        return <BarChart3 className="h-5 w-5" />
      case "line":
        return <LineChart className="h-5 w-5" />
      case "pie":
      case "doughnut":
        return <PieChart className="h-5 w-5" />
      case "metric":
        return <TrendingUp className="h-5 w-5" />
      default:
        return <BarChart3 className="h-5 w-5" />
    }
  }

  const getChangeColor = (changeType?: string) => {
    switch (changeType) {
      case "positive":
        return "text-green-600"
      case "negative":
        return "text-red-600"
      default:
        return "text-gray-600"
    }
  }

  if (chart.type === "metric") {
    return (
      <Card className={className}>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">{chart.title}</p>
              <p className="text-2xl font-bold text-gray-900">{chart.value}</p>
              {chart.change && <p className={`text-sm ${getChangeColor(chart.changeType)}`}>{chart.change}</p>}
            </div>
            <div className={`p-3 rounded-full ${chart.color || "bg-blue-100"}`}>{getIcon(chart.type)}</div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className={className}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-semibold flex items-center space-x-2">
            {getIcon(chart.type)}
            <span>{chart.title}</span>
          </CardTitle>
          <Badge variant="outline" className="text-xs">
            {chart.type}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-48 bg-gray-50 rounded-lg flex items-center justify-center">
          <div className="text-center text-gray-500">
            {getIcon(chart.type)}
            <p className="text-sm mt-2">Chart Preview</p>
            <p className="text-xs text-gray-400">Data visualization will appear here</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// Sample chart data for demonstration
export const sampleCharts: ChartData[] = [
  {
    id: "1",
    title: "Total Hires",
    type: "metric",
    value: "156",
    change: "+12% from last month",
    changeType: "positive",
    color: "bg-blue-100",
  },
  {
    id: "2",
    title: "Time to Hire",
    type: "metric",
    value: "18 days",
    change: "-3 days from last month",
    changeType: "positive",
    color: "bg-green-100",
  },
  {
    id: "3",
    title: "Cost per Hire",
    type: "metric",
    value: "$3,240",
    change: "+5% from last month",
    changeType: "negative",
    color: "bg-orange-100",
  },
  {
    id: "4",
    title: "Candidate Pipeline",
    type: "bar",
    data: [],
    color: "bg-purple-100",
  },
]
