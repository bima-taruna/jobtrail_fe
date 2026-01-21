import { JobInterview } from "@/app/definitions/job-interviews";
import { InterviewCard } from "./interview-card";

type JobInterviewProps = {
  interviews: JobInterview[];
  job_id: string;
};

export function JobDetailInterviews({ interviews, job_id }: JobInterviewProps) {
  if (!interviews || interviews.length < 1) return <p>interviews not found</p>;
  return (
    <div className="flex flex-col gap-3 md:grid md:grid-cols-2 md:gap-2">
      {interviews.map((interview) => (
        <InterviewCard
          key={interview.id}
          interview={interview}
          job_id={job_id}
        />
      ))}
    </div>
  );
}
