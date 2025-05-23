"use client"

import { Heart, Zap, Shield, Globe } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const companyValues = [
  {
    icon: <Heart className="h-8 w-8 text-red-500" />,
    title: "People First",
    description: "We believe our people are our greatest asset and invest in their growth and well-being.",
  },
  {
    icon: <Zap className="h-8 w-8 text-yellow-500" />,
    title: "Innovation",
    description: "We embrace new ideas and technologies to solve complex problems and drive progress.",
  },
  {
    icon: <Shield className="h-8 w-8 text-blue-500" />,
    title: "Integrity",
    description: "We act with honesty, transparency, and ethical principles in everything we do.",
  },
  {
    icon: <Globe className="h-8 w-8 text-green-500" />,
    title: "Global Impact",
    description: "We work to make a positive difference in the world through our products and services.",
  },
]

export function CompanyValues() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Values</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            These core values guide everything we do and shape our culture every day.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {companyValues.map((value, index) => (
            <Card key={index} className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-8">
                <div className="flex justify-center mb-4">{value.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
