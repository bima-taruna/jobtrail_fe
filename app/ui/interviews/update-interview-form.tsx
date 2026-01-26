"use client";

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/select";
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
import { useRef } from "react";
import { Spinner } from "@/app/ui/components/spinner";
import {
  JobInterviewType,
  UpdateJobInterview,
  UpdateJobInterviewSchema,
} from "@/app/definitions/job-interviews";
import { useUpdateJobInterview } from "@/hooks/useJobInterviews";
import { Textarea } from "../components/textarea";

export interface UpdateInterviewProps {
  job_id: string;
  interview_id: string;
  data: UpdateJobInterview;
}
export function UpdateJobInterviewForm({
  job_id,
  interview_id,
  data,
}: UpdateInterviewProps) {
  const updateJobInterview = useUpdateJobInterview();
  const buttonClose = useRef<HTMLButtonElement>(null);

  const form = useForm({
    resolver: zodResolver(UpdateJobInterviewSchema),
    defaultValues: {
      ...data,
      interview_date: data.interview_date
        ? new Date(data.interview_date)
        : new Date(),
    },
  });

  function onSubmit(values: z.infer<typeof UpdateJobInterviewSchema>) {
    updateJobInterview.mutate(
      { data: values, interview_id, job_id },
      {
        onSuccess: () => {
          buttonClose.current?.click();
          form.reset(values);
        },
      },
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="interview_date"
            render={({ field }) => (
              <FormItem className="grid gap-3 ">
                <FormLabel>Interview Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[200px] md:w-[180px] pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground",
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
          <FormField
            control={form.control}
            name="interviewer_name"
            render={({ field }) => (
              <FormItem className="grid gap-3">
                <FormLabel>Interviewer Name :</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="interview_type"
            render={({ field }) => (
              <FormItem className="grid col-span-2 gap-3">
                <FormLabel>Interview Type</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a job interview type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {Object.values(JobInterviewType).map((value) => (
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
        </div>

        <DialogFooter className="mt-3">
          <DialogClose ref={buttonClose} asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button disabled={updateJobInterview.isPending} type="submit">
            {updateJobInterview.isPending ? (
              <>
                <Spinner />
                "Saving ..."
              </>
            ) : (
              "Save changes"
            )}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
}
