export interface Job {
  id: string;
  title: string;
  company: string;
  logo: string;
  location: string;
  experience: string;
  applications: number;
  recentApplications: number;
  postedDays: number;
  salary?: string;
  jobType?: string;
  description?: string;
  requirements?: string[];
  responsibilities?: string[];
  skills?: string[];
  benefits?: string[];
  isRemote?: boolean;
  isFeatured?: boolean;
}
