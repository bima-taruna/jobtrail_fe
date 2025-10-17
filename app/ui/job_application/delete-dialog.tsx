import { DialogClose, DialogFooter } from "@/app/ui/components/dialog";
import { Button } from "@/app/ui/components/button";
import { useRef } from "react";
import { useDeleteJobApplication } from "@/hooks/useJobApplication";

interface DeleteDialogProps {
  job_id: string;
}

export function DeleteDialog({ job_id }: DeleteDialogProps) {
  const deleteJobs = useDeleteJobApplication();
  const buttonClose = useRef<HTMLButtonElement>(null);

  const handleClick = () => {
    if (job_id) {
      deleteJobs.mutate(job_id);
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
        <Button
          className="cursor-pointer"
          variant={"destructive"}
          onClick={handleClick}
        >
          Delete
        </Button>
      </DialogFooter>
    </>
  );
}
