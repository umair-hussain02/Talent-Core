"use client"

import { Coffee, Laptop, GraduationCap, Heart, Building, Users } from "lucide-react"

const benefits = [
  {
    icon: <Coffee className="h-6 w-6 text-brown-500" />,
    title: "Flexible Work",
    description: "Remote-first culture with flexible hours",
  },
  {
    icon: <Laptop className="h-6 w-6 text-blue-500" />,
    title: "Top Equipment",
    description: "Latest MacBook Pro and equipment allowance",
  },
  {
    icon: <GraduationCap className="h-6 w-6 text-purple-500" />,
    title: "Learning Budget",
    description: "$2,000 annual learning and development budget",
  },
  {
    icon: <Heart className="h-6 w-6 text-red-500" />,
    title: "Health & Wellness",
    description: "Comprehensive health insurance and wellness programs",
  },
  {
    icon: <Building className="h-6 w-6 text-gray-500" />,
    title: "Modern Offices",
    description: "Beautiful offices in prime locations worldwide",
  },
  {
    icon: <Users className="h-6 w-6 text-green-500" />,
    title: "Team Events",
    description: "Regular team building and company-wide events",
  },
]

export function BenefitsSection() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Work With Us</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            We offer competitive benefits and a supportive environment where you can thrive.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div key={index} className="flex items-start gap-4 p-6 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="flex-shrink-0 p-3 bg-gray-100 rounded-lg">{benefit.icon}</div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
