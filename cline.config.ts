const clineConfig = {
  Job: {
    id: "uuid",
    title: "job.title",
    department: "commerce.department",
    location: "location.city",
    description: "lorem.paragraphs",
    createdAt: "date.recent",
  },
  Candidate: {
    id: "uuid",
    name: "person.fullName",
    email: "internet.email",
    phone: "phone.number",
    experience: "number.int|1,10",
    resumeUrl: "internet.url",
    matchScore: "number.int|60,100",
    summary: "lorem.sentences",
    jobId: "uuid",
  },
};

export default clineConfig;
