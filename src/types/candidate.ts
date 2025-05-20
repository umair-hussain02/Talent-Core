export interface Candidate {
  id: string;
  name: string;
  email: string;
  phone: string;
  experience: number; // in years
  resumeUrl: string;
  matchScore: number; // percentage
  summary: string;
  jobId: string; // reference to Job
}
