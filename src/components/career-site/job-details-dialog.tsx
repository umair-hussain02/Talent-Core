"use client"

import { MapPin, Briefcase, Clock, ArrowRight } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { Job } from "@/types/job"

interface JobDetailsDialogProps {
  job: Job | null
  isOpen: boolean
  onClose: () => void
  onApplyClick: (job: Job) => void
}

export function JobDetailsDialog({ job, isOpen, onClose, onApplyClick }: JobDetailsDialogProps) {
  if (!job) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex justify-between items-start">
            <div>
              <DialogTitle className="text-2xl mb-2">{job.title}</DialogTitle>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="bg-gray-100 text-gray-700 border-0 flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  {job.location}
                </Badge>
                <Badge variant="outline" className="bg-gray-100 text-gray-700 border-0 flex items-center gap-1">
                  <Briefcase className="h-3 w-3" />
                  {job.experience}
                </Badge>
                <Badge variant="outline" className="bg-gray-100 text-gray-700 border-0 flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {job.jobType}
                </Badge>
                {job.isRemote && <Badge className="bg-blue-100 text-blue-700 border-0">Remote Friendly</Badge>}
              </div>
            </div>
            <Button className="bg-purple-500 hover:bg-purple-600" onClick={() => onApplyClick(job)}>
              Apply Now
            </Button>
          </div>
        </DialogHeader>

        <div className="space-y-6 mt-6">
          <div>
            <h3 className="text-lg font-semibold mb-3">About This Role</h3>
            <p className="text-gray-700">{job.description}</p>
          </div>

          {job.responsibilities && job.responsibilities.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-3">What You'll Do</h3>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                {job.responsibilities.map((resp, index) => (
                  <li key={index}>{resp}</li>
                ))}
              </ul>
            </div>
          )}

          {job.requirements && job.requirements.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-3">What We're Looking For</h3>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                {job.requirements.map((req, index) => (
                  <li key={index}>{req}</li>
                ))}
              </ul>
            </div>
          )}

          {job.skills && job.skills.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-3">Skills & Technologies</h3>
              <div className="flex flex-wrap gap-2">
                {job.skills.map((skill) => (
                  <Badge key={skill} variant="outline" className="bg-purple-50 text-purple-700">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {job.benefits && job.benefits.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-3">What We Offer</h3>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                {job.benefits.map((benefit, index) => (
                  <li key={index}>{benefit}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="bg-gray-50 p-6 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">Ready to Apply?</h4>
                <p className="text-gray-600">Join our team and make an impact from day one.</p>
              </div>
              <Button size="lg" className="bg-purple-500 hover:bg-purple-600" onClick={() => onApplyClick(job)}>
                Apply Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
