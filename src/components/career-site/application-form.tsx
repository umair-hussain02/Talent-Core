"use client"

import type React from "react"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import type { Job } from "@/types/job"

interface ApplicationFormProps {
  job: Job | null
  isOpen: boolean
  onClose: () => void
}

export function ApplicationForm({ job, isOpen, onClose }: ApplicationFormProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("Application submitted for:", job?.title)
    onClose()
  }

  if (!job) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Apply for {job.title}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="firstName">First Name *</Label>
              <Input id="firstName" required />
            </div>
            <div>
              <Label htmlFor="lastName">Last Name *</Label>
              <Input id="lastName" required />
            </div>
          </div>

          <div>
            <Label htmlFor="email">Email Address *</Label>
            <Input id="email" type="email" required />
          </div>

          <div>
            <Label htmlFor="phone">Phone Number</Label>
            <Input id="phone" type="tel" />
          </div>

          <div>
            <Label htmlFor="linkedin">LinkedIn Profile</Label>
            <Input id="linkedin" placeholder="https://linkedin.com/in/yourprofile" />
          </div>

          <div>
            <Label htmlFor="portfolio">Portfolio/Website</Label>
            <Input id="portfolio" placeholder="https://yourportfolio.com" />
          </div>

          <div>
            <Label htmlFor="resume">Resume/CV *</Label>
            <Input id="resume" type="file" accept=".pdf,.doc,.docx" required />
            <p className="text-sm text-gray-500 mt-1">Please upload your resume in PDF or Word format</p>
          </div>

          <div>
            <Label htmlFor="coverLetter">Cover Letter</Label>
            <Textarea
              id="coverLetter"
              placeholder="Tell us why you're interested in this role and what makes you a great fit..."
              rows={4}
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="submit" className="flex-1 bg-purple-500 hover:bg-purple-600">
              Submit Application
            </Button>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
