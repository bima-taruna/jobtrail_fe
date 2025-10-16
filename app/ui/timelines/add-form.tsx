"use client";

import {
  JobAppEvent,
  jobApplicationSchema,
} from "@/app/definitions/job-application";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/ui/components/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { DialogClose, DialogFooter } from "@/app/ui/components/dialog";

import { format } from "date-fns";

import { Button } from "@/app/ui/components/button";

import { CalendarIcon } from "lucide-react";
import { Input } from "@/app/ui/components/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/app/ui/components/popover";
import { Calendar } from "@/app/ui/components/calendar";
import { cn } from "@/lib/utils";
import z from "zod";
import { useCreateJobApplication } from "@/hooks/useJobApplication";
import { useRef } from "react";
import { jobTimelineSchema } from "@/app/definitions/job-timelines";
import { useCreateJobTimeline } from "@/hooks/useJobTimeline";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/select";
import { Textarea } from "../components/textarea";

interface JobTimelineProps {
  job_id: string;
}

export function CreateJobTimelineForm({ job_id }: JobTimelineProps) {
  const createJobTimeline = useCreateJobTimeline();
  const buttonClose = useRef<HTMLButtonElement>(null);

  const form = useForm({
    resolver: zodResolver(jobTimelineSchema),
    defaultValues: {
      event_type: JobAppEvent.SAVED,
      event_date: new Date(),
      notes: "",
    },
  });

  function onSubmit(values: z.infer<typeof jobTimelineSchema>) {
    console.log(values);
    createJobTimeline.mutate(
      { job_id, data: values },
      {
        onSuccess: () => {
          buttonClose.current?.click();
          form.reset();
        },
      }
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="event_type"
            render={({ field }) => (
              <FormItem className="grid col-span-2 gap-3">
                <FormLabel>Status</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a job application status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {Object.values(JobAppEvent).map((value) => (
                      <SelectItem key={value} value={value}>
                        {value}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="event_date"
            render={({ field }) => (
              <FormItem className="grid gap-3 ">
                <FormLabel>Application Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[200px] md:w-[180px] pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value as Date, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value as Date | undefined}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      captionLayout="dropdown"
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem className="grid col-span-2 gap-3">
              <FormLabel>Note :</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <DialogFooter className="mt-3">
          <DialogClose ref={buttonClose} asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </form>
    </Form>
  );
}
