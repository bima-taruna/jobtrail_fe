import { JobInterview } from "@/app/definitions/job-interviews";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/ui/components/card";
import { formatDate, truncateMultiline } from "@/lib/utils";
import { Badge } from "@/app/ui/components/badge";

type JobInterviewProps = {
  interviews: JobInterview[];
  job_id: string;
};

export function JobDetailInterviews({ interviews, job_id }: JobInterviewProps) {
  if (!interviews || interviews.length < 1) return <p>interviews not found</p>;
  return (
    <div className="flex flex-col gap-3 md:grid md:grid-cols-2 md:gap-2">
      {interviews.map((interview) => (
        <Card key={interview?.id}>
          <CardHeader>
            <CardTitle>
              <Badge>{interview.interview_type}</Badge>
            </CardTitle>
            <div className="w-full flex justify-between">
              <h2>{interview.interviewer_name}</h2>
              <span>{formatDate(interview.interview_date.toString())}</span>
            </div>
          </CardHeader>
          <CardDescription className="px-5">
            {truncateMultiline(interview?.notes)}
          </CardDescription>
        </Card>
      ))}
    </div>
  );
}
