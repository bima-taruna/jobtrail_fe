import { DialogClose, DialogFooter } from "@/app/ui/components/dialog";
import { Button } from "@/app/ui/components/button";
import { useRef } from "react";
import { Spinner } from "@/app/ui/components/spinner";
import { useDeleteJobInterview } from "@/hooks/useJobInterviews";

interface DeleteDialogProps {
  job_id: string;
  interview_id: string;
}

export function DeleteDialog({ job_id, interview_id }: DeleteDialogProps) {
  const deleteJobs = useDeleteJobInterview();
  const buttonClose = useRef<HTMLButtonElement>(null);

  const handleClick = () => {
    console.log(`interview id : ${interview_id}`);
    console.log(`job id : ${job_id}`);
    if (job_id) {
      deleteJobs.mutate({ interview_id, job_id });
      buttonClose.current?.click();
    }
  };

  return (
    <>
      <DialogFooter className="mt-3">
        <DialogClose ref={buttonClose} asChild>
          <Button className="cursor-pointer" variant="outline">
            Cancel
          </Button>
        </DialogClose>
        <Button disabled={deleteJobs.isPending} onClick={handleClick}>
          {deleteJobs.isPending ? (
            <>
              <Spinner />
              Deleting ...
            </>
          ) : (
            "Delete"
          )}
        </Button>
      </DialogFooter>
    </>
  );
}
