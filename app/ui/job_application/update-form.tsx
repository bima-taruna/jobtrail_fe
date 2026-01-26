"use client";

import {
  UpdateJobApplication,
  updateJobApplicationSchema,
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
import { useUpdateJobApplication } from "@/hooks/useJobApplication";
import { useRef } from "react";
import { Spinner } from "@/app/ui/components/spinner";

export interface UpdateFormProps {
  id: string;
  data: UpdateJobApplication;
}
export function UpdateJobApplicationForm({ id, data }: UpdateFormProps) {
  const updateJobApplication = useUpdateJobApplication();
  const buttonClose = useRef<HTMLButtonElement>(null);

  const form = useForm({
    resolver: zodResolver(updateJobApplicationSchema),
    defaultValues: {
      ...data,
      application_date: data.application_date
        ? new Date(data.application_date)
        : new Date(),
    },
  });

  function onSubmit(values: z.infer<typeof updateJobApplicationSchema>) {
    updateJobApplication.mutate(
      { id, update_data: values },
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
            name="job_title"
            render={({ field }) => (
              <FormItem className="grid col-span-2 gap-3">
                <FormLabel>Job Title</FormLabel>
                <FormControl>
                  <Input placeholder="Software Engineer" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="company_name"
            render={({ field }) => (
              <FormItem className="grid col-span-2 gap-3">
                <FormLabel>Company Name</FormLabel>
                <FormControl>
                  <Input placeholder="Google" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem className="grid gap-3">
                <FormLabel>Location</FormLabel>
                <FormControl>
                  <Input placeholder="Los Angeles" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="application_date"
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
        </div>

        <DialogFooter className="mt-3">
          <DialogClose ref={buttonClose} asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button disabled={updateJobApplication.isPending} type="submit">
            {updateJobApplication.isPending ? (
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
