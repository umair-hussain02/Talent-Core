"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Star, ChevronDown, Paperclip } from "lucide-react";
import type { Candidate } from "@/types/candidate";
import { CandidateDetailsSheet } from "./candidate-details-sheet";
import { mockcandidates } from "@/data/mockCandidates";

export function CandidatesSection() {
  const [activeTab, setActiveTab] = useState("all");
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(
    null
  );
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const filteredCandidates = mockcandidates.filter((candidate) => {
    if (activeTab === "accepted") return candidate.score >= 4.0;
    if (activeTab === "rejected") return candidate.stage === "Rejected";
    return true;
  });

  const handleCandidateClick = (candidate: Candidate) => {
    setSelectedCandidate(candidate);
    setIsDetailsOpen(true);
  };

  const handleCloseDetails = () => {
    setIsDetailsOpen(false);
  };

  return (
    <div className="w-full bg-white rounded-lg shadow-sm border border-gray-100">
      <div className="p-6 flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Candidates</h2>
        <Select defaultValue="march2023">
          <SelectTrigger className="w-[180px] bg-gray-50 border-gray-200">
            <SelectValue placeholder="Select month" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="march2023">March 2023</SelectItem>
            <SelectItem value="february2023">February 2023</SelectItem>
            <SelectItem value="january2023">January 2023</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
        <div className="px-6">
          <TabsList className="grid w-[300px] grid-cols-3 bg-gray-100">
            <TabsTrigger value="all" className="data-[state=active]:bg-white">
              All
            </TabsTrigger>
            <TabsTrigger
              value="accepted"
              className="data-[state=active]:bg-white"
            >
              Accepted
            </TabsTrigger>
            <TabsTrigger
              value="rejected"
              className="data-[state=active]:bg-white"
            >
              Rejected
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="all" className="mt-0">
          <CandidatesTable
            candidates={filteredCandidates}
            onCandidateClick={handleCandidateClick}
          />
        </TabsContent>
        <TabsContent value="accepted" className="mt-0">
          <CandidatesTable
            candidates={filteredCandidates}
            onCandidateClick={handleCandidateClick}
          />
        </TabsContent>
        <TabsContent value="rejected" className="mt-0">
          <CandidatesTable
            candidates={filteredCandidates}
            onCandidateClick={handleCandidateClick}
          />
        </TabsContent>
      </Tabs>

      <CandidateDetailsSheet
        isOpen={isDetailsOpen}
        onClose={handleCloseDetails}
        candidate={selectedCandidate}
      />
    </div>
  );
}

function CandidatesTable({
  candidates,
  onCandidateClick,
}: {
  candidates: Candidate[];
  onCandidateClick: (candidate: Candidate) => void;
}) {
  return (
    <div className="relative overflow-x-auto mt-4">
      <Table>
        <TableHeader className="bg-gray-50">
          <TableRow className="border-t border-b border-gray-200">
            <TableHead className="text-xs font-medium text-gray-500 uppercase tracking-wider py-4 pl-6">
              Candidate Name
            </TableHead>
            <TableHead className="text-xs font-medium text-gray-500 uppercase tracking-wider py-4">
              <div className="flex items-center">
                Score <ChevronDown className="ml-1 h-4 w-4" />
              </div>
            </TableHead>
            <TableHead className="text-xs font-medium text-gray-500 uppercase tracking-wider py-4">
              <div className="flex items-center">
                Stages <ChevronDown className="ml-1 h-4 w-4" />
              </div>
            </TableHead>
            <TableHead className="text-xs font-medium text-gray-500 uppercase tracking-wider py-4">
              Applied Role
            </TableHead>
            <TableHead className="text-xs font-medium text-gray-500 uppercase tracking-wider py-4">
              <div className="flex items-center">
                Application Date <ChevronDown className="ml-1 h-4 w-4" />
              </div>
            </TableHead>
            <TableHead className="text-xs font-medium text-gray-500 uppercase tracking-wider py-4 pr-6">
              Attachments
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {candidates.map((candidate) => (
            <TableRow
              key={candidate.id}
              className="border-b border-gray-200 hover:bg-gray-50 transition-colors cursor-pointer"
              onClick={() => onCandidateClick(candidate)}
            >
              <TableCell className="py-4 pl-6">
                <div className="flex items-center">
                  <Avatar className="h-10 w-10 mr-3">
                    <AvatarImage
                      src={candidate.avatar || "/placeholder.svg"}
                      alt={candidate.name}
                    />
                    <AvatarFallback>{candidate.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <span className="font-medium text-gray-900">
                    {candidate.name}
                  </span>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-yellow-400 mr-1 fill-yellow-400" />
                  <span className="font-medium">
                    {candidate.score.toFixed(1)}
                  </span>
                </div>
              </TableCell>
              <TableCell>
                <span className="text-gray-700">{candidate.stage}</span>
              </TableCell>
              <TableCell>
                <span className="text-gray-700">{candidate.role}</span>
              </TableCell>
              <TableCell>
                <span className="text-gray-700">{candidate.date}</span>
              </TableCell>
              <TableCell className="pr-6">
                <div className="flex items-center text-gray-700">
                  <Paperclip className="h-4 w-4 mr-1" />
                  <span>
                    {candidate.attachments}{" "}
                    {candidate.attachments === 1 ? "file" : "files"}
                  </span>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
