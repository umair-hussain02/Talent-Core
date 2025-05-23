import { CandidatesSection } from "@/components/candidate-section";
import { JobListingsSection } from "@/components/job-listings-section";

export default function Home() {
  return (
    <div className="mt-20 mx-8 max-w-[1080px]">
      <JobListingsSection />
      <CandidatesSection />
    </div>
  );
}
