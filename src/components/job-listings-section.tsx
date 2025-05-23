"use client";

import { useState, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { JobCard } from "@/components/job-card";
import { JobDetailsSheet } from "@/components/job-details-sheet";
import type { Job } from "@/types/job";
import { mockjobs } from "@/data/mockjobs";

export function JobListingsSection() {
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleJobClick = (job: Job) => {
    setSelectedJob(job);
    setIsDetailsOpen(true);
  };

  const handleCloseDetails = () => {
    setIsDetailsOpen(false);
  };

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  return (
    <div className="w-full bg-white rounded-lg shadow-sm border border-gray-100 p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-900">Featured Jobs</h2>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            className="rounded-full h-8 w-8 border-gray-200"
            onClick={scrollLeft}
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Scroll left</span>
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="rounded-full h-8 w-8 border-gray-200"
            onClick={scrollRight}
          >
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">Scroll right</span>
          </Button>
        </div>
      </div>

      <div
        ref={scrollContainerRef}
        className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {mockjobs.map((job) => (
          <div
            key={job.id}
            className="min-w-[300px]"
            onClick={() => handleJobClick(job)}
          >
            <JobCard
              id = {job.id}
              title={job.title}
              postedDays={job.postedDays}
              location={job.location}
              experience={job.experience}
              applications={job.applications}
              recentApplications={job.recentApplications}
              className="cursor-pointer h-full"
            />
          </div>
        ))}
      </div>

      <JobDetailsSheet
        isOpen={isDetailsOpen}
        onClose={handleCloseDetails}
        job={selectedJob}
      />

      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}
