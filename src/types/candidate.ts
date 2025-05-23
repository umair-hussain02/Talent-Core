export interface Experience {
  company: string;
  role: string;
  description: string;
  years: string;
  startDate?: string;
  endDate?: string;
  isCurrent?: boolean;
  logo?: string;
}

export interface Education {
  institution: string;
  degree: string;
  field: string;
  startYear: number;
  endYear: number;
  logo?: string;
}

export interface Skill {
  name: string;
  level?: "Beginner" | "Intermediate" | "Advanced" | "Expert";
  yearsOfExperience?: number;
}

export interface Candidate {
  id: string;
  name: string;
  avatar: string;
  score: number;
  stage: string;
  role: string;
  date: string;
  attachments: number;
  email?: string;
  phone?: string;
  location?: string;
  experience?: Experience[];
  education?: Education[];
  skills?: Skill[];
  bio?: string;
  linkedin?: string;
  github?: string;
  portfolio?: string;
  currentStage?: number;
  status?: "Active" | "Hired" | "Rejected" | "On Hold";
  salary?: {
    current?: string;
    expected?: string;
  };
  availability?: string;
  notes?: string[];
}
