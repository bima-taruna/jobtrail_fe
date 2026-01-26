import { DialogClose, DialogFooter } from "@/app/ui/components/dialog";
import { Button } from "@/app/ui/components/button";
import React, { useRef, useState } from "react";
import { useUpdateTimelineNote } from "@/hooks/useJobTimeline";
import { Spinner } from "@/app/ui/components/spinner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../components/form";
import { Textarea } from "../components/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { UpdateTimelineNoteSchema } from "@/app/definitions/job-timelines";
import { Edit } from "lucide-react";
interface NotesDialogProps {
  job_id: string;
  timeline_id: string;
  old_note: string;
}

export function UpdateNotesForm({
  job_id,
  timeline_id,
  old_note,
}: NotesDialogProps) {
  const updateTimelineNote = useUpdateTimelineNote();
  const buttonClose = useRef<HTMLButtonElement>(null);
  const form = useForm({
    resolver: zodResolver(UpdateTimelineNoteSchema),
    defaultValues: {
      notes: old_note,
    },
  });
  const [disableForm, setDisableForm] = useState(true);

  function handleDisableForm(e: React.FormEvent) {
    e.preventDefault();
    setDisableForm(!disableForm);
  }

  function onSubmit(values: z.infer<typeof UpdateTimelineNoteSchema>) {
    updateTimelineNote.mutate(
      {
        timeline_id,
        job_id,
        notes: values.notes ? values.notes : "",
      },
      {
        onSuccess: () => {
          buttonClose.current?.click();
          form.reset();
        },
      },
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Notes</FormLabel>
              <FormControl>
                <Textarea
                  disabled={disableForm}
                  placeholder="Today i do user interview with ..."
                  {...field}
                ></Textarea>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <DialogFooter className="mt-3">
          <DialogClose ref={buttonClose} asChild>
            <Button className="cursor-pointer" variant="outline">
              Cancel
            </Button>
          </DialogClose>
          {disableForm ? (
            <Button
              type="button"
              onClick={handleDisableForm}
              className="cursor-pointer"
            >
              <Edit />
              Edit
            </Button>
          ) : (
            <Button disabled={updateTimelineNote.isPending} type="submit">
              {updateTimelineNote.isPending ? (
                <>
                  <Spinner />
                  Updating ...
                </>
              ) : (
                "Update"
              )}
            </Button>
          )}
        </DialogFooter>
      </form>
    </Form>
  );
}
