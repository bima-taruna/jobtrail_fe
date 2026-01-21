import { JobInterview } from "@/app/definitions/job-interviews";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/ui/components/card";
import { formatDate, truncateMultiline } from "@/lib/utils";
import { Badge } from "@/app/ui/components/badge";
import { Button } from "@/app/ui/components/button";
import { NotebookPen, Trash } from "lucide-react";
import { CustomDialog } from "../job_application/custom-dialog";
import { DeleteDialog } from "./delete-dialog";
type InterviewCardProps = {
  interview: JobInterview;
  job_id: string;
};

export function InterviewCard({ interview, job_id }: InterviewCardProps) {
  return (
    <Card key={interview?.id}>
      <CardHeader>
        <CardTitle className="flex justify-between">
          <Badge>{interview.interview_type}</Badge>
          <div className="flex gap-2">
            <CustomDialog
              dialog_title="Delete Interview"
              dialog_description="Do you want to delete this interview?"
              triggerButton={
                <Button size={"sm"} variant={"destructive"}>
                  <Trash />
                </Button>
              }
            >
              <DeleteDialog job_id={job_id} interview_id={interview?.id!!} />
            </CustomDialog>
            <Button variant={"outline"} size={"sm"}>
              <NotebookPen />
            </Button>
          </div>
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
  );
}
