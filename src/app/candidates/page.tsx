"use client";

import { useState, useMemo } from "react";
import {
  Search,
  Plus,
  MapPin,
  Briefcase,
  Star,
  Users,
  MoreVertical,
  Eye,
  Mail,
  Phone,
  Calendar,
  Download,
  ArrowUpDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CandidateDetailsSheet } from "@/components/candidate-details-sheet";
import { mockcandidates } from "@/data/mockCandidates";
import type { Candidate } from "@/types/candidate";

export default function CandidatesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [stageFilter, setStageFilter] = useState("all");
  const [scoreFilter, setScoreFilter] = useState("all");
  const [sortBy, setSortBy] = useState<"name" | "score" | "date">("date");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(
    null
  );
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Filter and search candidates
  const filteredCandidates = useMemo(() => {
    const filtered = mockcandidates.filter((candidate) => {
      const matchesSearch =
        candidate.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        candidate.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
        candidate.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        candidate.location?.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesRole = roleFilter === "all" || candidate.role === roleFilter;
      const matchesStage =
        stageFilter === "all" || candidate.stage === stageFilter;

      const matchesScore =
        scoreFilter === "all" ||
        (scoreFilter === "high" && candidate.score >= 4.0) ||
        (scoreFilter === "medium" &&
          candidate.score >= 3.0 &&
          candidate.score < 4.0) ||
        (scoreFilter === "low" && candidate.score < 3.0);

      return matchesSearch && matchesRole && matchesStage && matchesScore;
    });

    // Sort candidates
    filtered.sort((a, b) => {
      if (sortBy === "name") {
        return sortOrder === "asc"
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      } else if (sortBy === "score") {
        return sortOrder === "asc" ? a.score - b.score : b.score - a.score;
      } else {
        // date
        return sortOrder === "asc"
          ? new Date(a.date).getTime() - new Date(b.date).getTime()
          : new Date(b.date).getTime() - new Date(a.date).getTime();
      }
    });

    return filtered;
  }, [searchQuery, roleFilter, stageFilter, scoreFilter, sortBy, sortOrder]);

  // Get unique values for filters
  const uniqueRoles = [
    ...new Set(mockcandidates.map((candidate) => candidate.role)),
  ];
  const uniqueStages = [
    ...new Set(mockcandidates.map((candidate) => candidate.stage)),
  ];

  const handleCandidateClick = (candidate: Candidate) => {
    setSelectedCandidate(candidate);
    setIsDetailsOpen(true);
  };

  const handleCloseDetails = () => {
    setIsDetailsOpen(false);
  };

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const getScoreBadgeColor = (score: number) => {
    if (score >= 4.0) return "bg-green-100 text-green-700 border-green-200";
    if (score >= 3.0) return "bg-amber-100 text-amber-700 border-amber-200";
    return "bg-red-100 text-red-700 border-red-200";
  };

  const getStageBadgeColor = (stage: string) => {
    if (stage === "Rejected") return "bg-red-100 text-red-700 border-red-200";
    if (stage === "HR Round" || stage === "Round 2 Interview")
      return "bg-blue-100 text-blue-700 border-blue-200";
    if (stage === "Hired")
      return "bg-green-100 text-green-700 border-green-200";
    if (stage === "Screening")
      return "bg-purple-100 text-purple-700 border-purple-200";
    return "bg-gray-100 text-gray-700 border-gray-200";
  };

  const renderCandidateCard = (candidate: Candidate) => (
    <Card
      key={candidate.id}
      className="hover:shadow-md transition-all duration-200 cursor-pointer group"
      onClick={() => handleCandidateClick(candidate)}
    >
      <CardHeader className="pb-2 pt-4 px-4">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-3">
            <Avatar className="h-12 w-12 border-2 border-gray-100">
              <AvatarImage
                src={candidate.avatar || "/placeholder.svg"}
                alt={candidate.name}
              />
              <AvatarFallback>{candidate.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-lg group-hover:text-purple-600 transition-colors">
                {candidate.name}
              </CardTitle>
              <p className="text-gray-600 text-sm">{candidate.role}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge
              variant="outline"
              className={getScoreBadgeColor(candidate.score)}
            >
              <Star className="h-3 w-3 mr-1 fill-current" />
              {candidate.score.toFixed(1)}
            </Badge>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem
                  onClick={() => handleCandidateClick(candidate)}
                >
                  <Eye className="h-4 w-4 mr-2" />
                  View Profile
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Mail className="h-4 w-4 mr-2" />
                  Send Email
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Phone className="h-4 w-4 mr-2" />
                  Call Candidate
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Download className="h-4 w-4 mr-2" />
                  Download Resume
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardHeader>
      <CardContent className="px-4 pb-4">
        <div className="space-y-3">
          <Badge
            variant="outline"
            className={getStageBadgeColor(candidate.stage)}
          >
            {candidate.stage}
          </Badge>

          {candidate.location && (
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <MapPin className="h-3.5 w-3.5" />
              <span>{candidate.location}</span>
            </div>
          )}

          {candidate.experience && candidate.experience.length > 0 && (
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Briefcase className="h-3.5 w-3.5" />
              <span>
                {candidate.experience[0].company} •{" "}
                {candidate.experience[0].years}
              </span>
            </div>
          )}

          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Calendar className="h-3.5 w-3.5" />
            <span>Applied on {candidate.date}</span>
          </div>

          <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-100">
            <div className="flex items-center gap-1 text-sm text-gray-600">
              <Users className="h-3.5 w-3.5" />
              <span>Skills:</span>
            </div>
            <div className="flex flex-wrap gap-1 justify-end">
              {candidate.skills?.slice(0, 2).map((skill) => (
                <Badge
                  key={skill.name}
                  variant="outline"
                  className="bg-gray-50 text-gray-700 text-xs"
                >
                  {skill.name}
                </Badge>
              ))}
              {candidate.skills && candidate.skills.length > 2 && (
                <Badge
                  variant="outline"
                  className="bg-gray-50 text-gray-700 text-xs"
                >
                  +{candidate.skills.length - 2}
                </Badge>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const renderCandidateListItem = (candidate: Candidate) => (
    <Card
      key={candidate.id}
      className="hover:shadow-md transition-all duration-200 cursor-pointer"
      onClick={() => handleCandidateClick(candidate)}
    >
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 flex-1">
            <Avatar className="h-12 w-12 border-2 border-gray-100">
              <AvatarImage
                src={candidate.avatar || "/placeholder.svg"}
                alt={candidate.name}
              />
              <AvatarFallback>{candidate.name.charAt(0)}</AvatarFallback>
            </Avatar>

            <div className="flex-1">
              <div className="flex items-center gap-3 mb-1">
                <h3 className="font-semibold text-gray-900 hover:text-purple-600 transition-colors">
                  {candidate.name}
                </h3>
                <Badge
                  variant="outline"
                  className={getScoreBadgeColor(candidate.score)}
                >
                  <Star className="h-3 w-3 mr-1 fill-current" />
                  {candidate.score.toFixed(1)}
                </Badge>
                <Badge
                  variant="outline"
                  className={getStageBadgeColor(candidate.stage)}
                >
                  {candidate.stage}
                </Badge>
              </div>

              <div className="flex items-center gap-4 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <Briefcase className="h-3.5 w-3.5" />
                  <span>{candidate.role}</span>
                </div>
                {candidate.location && (
                  <div className="flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5" />
                    <span>{candidate.location}</span>
                  </div>
                )}
                <div className="flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5" />
                  <span>Applied on {candidate.date}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex flex-wrap gap-1 justify-end">
              {candidate.skills?.slice(0, 3).map((skill) => (
                <Badge
                  key={skill.name}
                  variant="outline"
                  className="bg-gray-50 text-gray-700 text-xs"
                >
                  {skill.name}
                </Badge>
              ))}
              {candidate.skills && candidate.skills.length > 3 && (
                <Badge
                  variant="outline"
                  className="bg-gray-50 text-gray-700 text-xs"
                >
                  +{candidate.skills.length - 3}
                </Badge>
              )}
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem
                  onClick={() => handleCandidateClick(candidate)}
                >
                  <Eye className="h-4 w-4 mr-2" />
                  View Profile
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Mail className="h-4 w-4 mr-2" />
                  Send Email
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Phone className="h-4 w-4 mr-2" />
                  Call Candidate
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Download className="h-4 w-4 mr-2" />
                  Download Resume
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="container mx-auto p-4 max-w-[1080px] mt-8">
      <div className="flex justify-between items-center mb-6 mt-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Candidates</h1>
          <p className="text-gray-600 mt-1">
            Manage and track your candidate pipeline
          </p>
        </div>
        <Button className="bg-purple-500 hover:bg-purple-600">
          <Plus className="h-4 w-4 mr-2" />
          Add Candidate
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Candidates</p>
                <p className="text-2xl font-bold text-gray-900">
                  {mockcandidates.length}
                </p>
              </div>
              <div className="bg-purple-100 p-2 rounded-full">
                <Users className="h-5 w-5 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Pipeline</p>
                <p className="text-2xl font-bold text-gray-900">
                  {
                    mockcandidates.filter(
                      (c) => c.stage !== "Rejected" && c.stage !== "Hired"
                    ).length
                  }
                </p>
              </div>
              <div className="bg-blue-100 p-2 rounded-full">
                <Briefcase className="h-5 w-5 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">High Potential</p>
                <p className="text-2xl font-bold text-gray-900">
                  {mockcandidates.filter((c) => c.score >= 4.0).length}
                </p>
              </div>
              <div className="bg-green-100 p-2 rounded-full">
                <Star className="h-5 w-5 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">New This Month</p>
                <p className="text-2xl font-bold text-gray-900">
                  {
                    mockcandidates.filter((c) => {
                      const applyDate = new Date(
                        c.date.split("/").reverse().join("-")
                      );
                      const now = new Date();
                      return (
                        applyDate.getMonth() === now.getMonth() &&
                        applyDate.getFullYear() === now.getFullYear()
                      );
                    }).length
                  }
                </p>
              </div>
              <div className="bg-amber-100 p-2 rounded-full">
                <Calendar className="h-5 w-5 text-amber-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search candidates by name, role, or location..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <Select value={roleFilter} onValueChange={setRoleFilter}>
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="Role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Roles</SelectItem>
                  {uniqueRoles.map((role) => (
                    <SelectItem key={role} value={role}>
                      {role}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={stageFilter} onValueChange={setStageFilter}>
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="Stage" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Stages</SelectItem>
                  {uniqueStages.map((stage) => (
                    <SelectItem key={stage} value={stage}>
                      {stage}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={scoreFilter} onValueChange={setScoreFilter}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Score" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Scores</SelectItem>
                  <SelectItem value="high">High (4.0+)</SelectItem>
                  <SelectItem value="medium">Medium (3.0-3.9)</SelectItem>
                  <SelectItem value="low">Low (Below 3.0)</SelectItem>
                </SelectContent>
              </Select>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="gap-2">
                    <ArrowUpDown className="h-4 w-4" />
                    Sort by: {sortBy.charAt(0).toUpperCase() + sortBy.slice(1)}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setSortBy("name")}>
                    Name{" "}
                    {sortBy === "name" &&
                      (sortOrder === "asc" ? "(A-Z)" : "(Z-A)")}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortBy("score")}>
                    Score{" "}
                    {sortBy === "score" &&
                      (sortOrder === "desc" ? "(High-Low)" : "(Low-High)")}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortBy("date")}>
                    Date{" "}
                    {sortBy === "date" &&
                      (sortOrder === "desc" ? "(New-Old)" : "(Old-New)")}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={toggleSortOrder}>
                    Toggle Order (
                    {sortOrder === "asc" ? "Ascending" : "Descending"})
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <Tabs
                value={viewMode}
                onValueChange={(value) => setViewMode(value as "grid" | "list")}
              >
                <TabsList className="grid w-[120px] grid-cols-2">
                  <TabsTrigger value="grid">Grid</TabsTrigger>
                  <TabsTrigger value="list">List</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      <div className="mb-4">
        <p className="text-sm text-gray-600">
          Showing {filteredCandidates.length} of {mockcandidates.length}{" "}
          candidates
        </p>
      </div>

      {/* Candidates Display */}
      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCandidates.map(renderCandidateCard)}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredCandidates.map(renderCandidateListItem)}
        </div>
      )}

      {filteredCandidates.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No candidates found
            </h3>
            <p className="text-gray-600 mb-4">
              Try adjusting your search criteria or filters
            </p>
            <Button className="bg-purple-500 hover:bg-purple-600">
              <Plus className="h-4 w-4 mr-2" />
              Add Candidate
            </Button>
          </CardContent>
        </Card>
      )}

      <CandidateDetailsSheet
        isOpen={isDetailsOpen}
        onClose={handleCloseDetails}
        candidate={selectedCandidate}
      />
    </div>
  );
}
