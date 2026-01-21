import { JobTimelines } from "@/app/definitions/job-timelines";
import {
  Stepper,
  StepperContent,
  StepperDescription,
  StepperIndicator,
  StepperItem,
  StepperNav,
  StepperPanel,
  StepperSeparator,
  StepperTitle,
  StepperTrigger,
} from "@/app/ui/components/stepper";
import { formatDate } from "@/lib/utils";
import { Check, LoaderCircleIcon, NotebookPen, SquarePen } from "lucide-react";
import { Button } from "../components/button";
import { useUndoJobTimeline } from "@/hooks/useJobTimeline";
import { Spinner } from "../components/spinner";
import { CustomDialog } from "../job_application/custom-dialog";
import { UpdateNotesForm } from "./update-notes-form";

type JobTimelineProps = {
  timelines: JobTimelines[];
  job_id: string;
};

export default function JobDetailTimeline({
  timelines,
  job_id,
}: JobTimelineProps) {
  const undoJob = useUndoJobTimeline();
  if (!timelines || timelines.length < 1) return <p>timelines not found</p>;
  const handleUndo = () => {
    if (job_id) {
      undoJob.mutate(job_id);
    }
  };
  return (
    <div className="flex items-center justify-center">
      <Stepper
        value={timelines.length} // latest one automatically active
        orientation="vertical"
        indicators={{
          completed: <Check className="size-4" />,
          loading: <LoaderCircleIcon className="size-4 animate-spin" />,
        }}
      >
        <StepperNav>
          {timelines.map((timeline, index) => (
            <StepperItem
              key={index}
              step={index + 1}
              className="relative items-start not-last:flex-1"
            >
              <div className="flex gap-4">
                <StepperTrigger className="items-start pb-12 last:pb-0 gap-2.5">
                  <StepperIndicator
                    className="
              data-[state=completed]:bg-green-500 data-[state=completed]:text-white
              data-[state=active]:bg-primary data-[state=active]:text-primary-foreground
              data-[state=inactive]:text-gray-500
            "
                  >
                    {index + 1}
                  </StepperIndicator>
                  <div className="mt-0.5 text-left">
                    <StepperTitle>{timeline.event_type}</StepperTitle>
                    <StepperDescription>
                      {formatDate(timeline.event_date.toString())}
                    </StepperDescription>
                  </div>
                </StepperTrigger>
                <CustomDialog
                  dialog_title="Timeline Notes"
                  dialog_description="see or edit this timeline note"
                  triggerButton={
                    <Button
                      className="cursor-pointer"
                      variant={"outline"}
                      size={"sm"}
                    >
                      <NotebookPen />
                    </Button>
                  }
                >
                  <UpdateNotesForm
                    old_note={timeline.notes}
                    timeline_id={timeline.id!!}
                    job_id={job_id}
                  />
                </CustomDialog>
              </div>
              {index < timelines.length - 1 && (
                <StepperSeparator
                  className="
            absolute inset-y-0 top-7 left-3 -order-1 m-0
            -translate-x-1/2 group-data-[orientation=vertical]/stepper-nav:h-[calc(100%-2rem)]
            group-data-[state=completed]/step:bg-green-500
          "
                />
              )}
            </StepperItem>
          ))}
        </StepperNav>
        <StepperPanel className="text-sm w-full flex justify-between items-center mt-6">
          {/* {timelines.map((timeline, index) => (
            <StepperContent key={index} value={index + 1}>
              {timeline.notes}
            </StepperContent>
          ))} */}
          {timelines.length > 1 ? (
            <Button
              onClick={handleUndo}
              disabled={undoJob.isPending}
              variant={"destructive"}
              className="cursor-pointer"
            >
              {undoJob.isPending ? <Spinner /> : "Undo"}
            </Button>
          ) : (
            ""
          )}
        </StepperPanel>
      </Stepper>
    </div>
  );
}
