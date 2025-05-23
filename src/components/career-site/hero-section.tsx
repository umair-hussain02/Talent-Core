"use client"

import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface HeroSectionProps {
  publicJobsCount: number
}

export function HeroSection({ publicJobsCount }: HeroSectionProps) {
  const handleViewPositions = () => {
    document.getElementById("jobs")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section className="relative bg-gradient-to-br from-purple-600 via-purple-500 to-orange-400 text-white py-20">
      <div className="absolute inset-0 bg-black/10"></div>
      <div className="relative container mx-auto px-4 text-center">
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-white"
            >
              <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
              <path d="M12 3a6 6 0 0 1-9 9 9 9 0 0 0 9-9Z" />
            </svg>
          </div>
          <h1 className="text-4xl font-bold">TalentCore</h1>
        </div>
        <h2 className="text-5xl font-bold mb-6">Join Our Mission</h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
          We are building the future of talent management. Join our team of passionate individuals who are transforming
          how companies find, hire, and develop talent.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            size="lg"
            className="bg-white text-purple-600 hover:bg-gray-100 font-semibold px-8 py-3"
            onClick={handleViewPositions}
          >
            View Open Positions
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-white text-white hover:bg-white/10 font-semibold px-8 py-3"
          >
            Learn About Us
          </Button>
        </div>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="text-3xl font-bold mb-2">{publicJobsCount}+</div>
            <div className="opacity-90">Open Positions</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold mb-2">50+</div>
            <div className="opacity-90">Team Members</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold mb-2">15+</div>
            <div className="opacity-90">Countries</div>
          </div>
        </div>
      </div>
    </section>
  )
}
