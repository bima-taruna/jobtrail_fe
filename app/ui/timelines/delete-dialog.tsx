import { DialogClose, DialogFooter } from "@/app/ui/components/dialog";
import { Button } from "@/app/ui/components/button";
import { useRef } from "react";
import { useResetJobTimeline } from "@/hooks/useJobTimeline";
import { Spinner } from "@/app/ui/components/spinner";

interface DeleteDialogProps {
  job_id: string;
}

export function DeleteDialog({ job_id }: DeleteDialogProps) {
  const resetTimelines = useResetJobTimeline();
  const buttonClose = useRef<HTMLButtonElement>(null);

  const handleClick = () => {
    if (job_id) {
      resetTimelines.mutate(job_id);
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
        <Button disabled={resetTimelines.isPending} onClick={handleClick}>
          {resetTimelines.isPending ? (
            <>
              <Spinner />
              Resetting ...
            </>
          ) : (
            "Reset"
          )}
        </Button>
      </DialogFooter>
    </>
  );
}
