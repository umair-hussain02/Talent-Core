import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Check, ChevronRight, X } from "lucide-react";
import type { Candidate } from "@/types/candidate";
import { stages } from "@/data/mockCandidates";

interface CandidateDetailsProps {
  isOpen: boolean;
  onClose: () => void;
  candidate: Candidate | null;
}

export function CandidateDetailsSheet({
  isOpen,
  onClose,
  candidate,
}: CandidateDetailsProps) {
  if (!candidate) return null;

  // Determine current stage based on candidate.stage
  const currentStageIndex =
    stages.findIndex((s) => s.name === candidate.stage) !== -1
      ? stages.findIndex((s) => s.name === candidate.stage)
      : 1;

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <SheetContent className="sm:max-w-md overflow-y-auto p-4">
        <SheetHeader className="border-b pb-4">
          <div className="flex justify-between items-center">
            <SheetTitle>Candidate Details</SheetTitle>
            <SheetClose className="rounded-full h-6 w-6 flex items-center justify-center">
              <X className="h-4 w-4" />
            </SheetClose>
          </div>
        </SheetHeader>

        <div className="py-6 flex flex-col items-center text-center">
          <Avatar className="h-20 w-20 mb-3">
            <AvatarImage
              src={candidate.avatar || "/placeholder.svg"}
              alt={candidate.name}
            />
            <AvatarFallback className="text-lg">
              {candidate.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <h3 className="text-xl font-semibold text-gray-900">
            {candidate.name}
          </h3>
          <p className="text-gray-500">{candidate.role}</p>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="flex items-center gap-2 bg-gray-50 p-3 rounded-lg">
            <div className="bg-gray-200 rounded-full p-1.5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-gray-600"
              >
                <rect width="20" height="16" x="2" y="4" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="text-xs text-gray-500">EMAIL</span>
              <span className="text-sm font-medium text-gray-900">
                {candidate.email}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-gray-50 p-3 rounded-lg">
            <div className="bg-gray-200 rounded-full p-1.5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-gray-600"
              >
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="text-xs text-gray-500">PHONE NUMBER</span>
              <span className="text-sm font-medium text-gray-900">
                {candidate.phone}
              </span>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">
            Application Details
          </h4>
          <div className="space-y-3">
            {stages.map((stage, index) => (
              <div key={stage.id} className="flex items-start gap-3">
                <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full text-sm font-medium">
                  {index < currentStageIndex ? (
                    <div className="bg-green-100 text-green-600 w-8 h-8 rounded-full flex items-center justify-center">
                      <Check className="h-4 w-4" />
                    </div>
                  ) : index === currentStageIndex ? (
                    <div className="bg-yellow-100 text-yellow-600 w-8 h-8 rounded-full flex items-center justify-center">
                      {stage.id}
                    </div>
                  ) : (
                    <div className="bg-gray-100 text-gray-500 w-8 h-8 rounded-full flex items-center justify-center">
                      {stage.id}
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium text-gray-900">{stage.name}</p>
                      {stage.date && (
                        <p className="text-xs text-gray-500">{stage.date}</p>
                      )}
                    </div>
                    {index === currentStageIndex && (
                      <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded">
                        Under Review
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-8">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">
            Experience
          </h4>
          {candidate.experience && candidate.experience.length > 0 ? (
            <div className="space-y-4">
              {candidate.experience.map((exp, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="bg-red-100 h-8 w-8 rounded-lg flex items-center justify-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-red-500"
                        >
                          <path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7" />
                          <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
                          <path d="M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4" />
                          <path d="M2 7h20" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">
                          {exp.company}
                        </p>
                        <p className="text-xs text-gray-500">
                          {exp.role} • {exp.years}
                        </p>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">{exp.description}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-500">
              No experience information available.
            </p>
          )}
        </div>

        <div className="mt-auto">
          <Button className="w-full bg-gradient-to-r from-purple-500 to-orange-400 hover:from-purple-600 hover:to-orange-500">
            <span>Move to Next Step</span>
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
