"use client";

import { z } from "zod";
import { ColumnDef } from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/app/ui/components/dropdown-menu";
import { Button } from "@/app/ui/components/button";
import { MoreHorizontal } from "lucide-react";
import { useDeleteJobApplication } from "@/hooks/useJobApplication";
import { CustomDialog } from "../ui/job_application/custom-dialog";
import { UpdateJobApplicationForm } from "../ui/job_application/update-form";
import { DeleteDialog } from "../ui/job_application/delete-dialog";
import { JobTimelines } from "./job-timelines";

export enum JobStatus {
  SAVED = "saved",
  APPLIED = "applied",
  INTERVIEWED = "interviewed",
  OFFERED = "offered",
  REJECTED = "rejected",
  ACCEPTED = "accepted",
  WITHDRAWN = "withdrawn",
}

export enum JobAppEvent {
  SAVED = "SAVED",
  APPLIED = "APPLIED",
  INTERVIEW_SCHEDULED = "INTERVIEW_SCHEDULED",
  INTERVIEW_COMPLETED = "INTERVIEW_COMPLETED",
  OFFER_RECEIVED = "OFFER_RECEIVED",
  OFFER_ACCEPTED = "OFFER_ACCEPTED",
  OFFER_DECLINED = "OFFER_DECLINED",
  REJECTED = "REJECTED",
  WITHDRAWN = "WITHDRAWN",
}

export interface JobApplication {
  id: string | null;
  job_title: string;
  company_name: string;
  location: string;
  application_date: Date;
  current_status?: JobStatus | null;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
}

export interface JobApplicationDetail extends JobApplication {
  timelines: JobTimelines[];
  job_interviews: [];
}

export interface UpdateJobApplication {
  job_title?: string;
  company_name?: string;
  location?: string;
  application_date?: Date;
}

export interface JobApplicationResponse {
  data: JobApplication[] | [];
  page: number;
  page_size: number;
  total: number;
}

export const JobApplicationColumns: ColumnDef<JobApplication>[] = [
  {
    accessorKey: "job_title",
    header: "Job Title",
  },
  {
    accessorKey: "company_name",
    header: "Company Name",
  },
  {
    accessorKey: "application_date",
    header: "Apply Date",
  },
  {
    accessorKey: "location",
    header: "Location",
  },
  {
    accessorKey: "current_status",
    header: "Status",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const job_application = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel className="text-center">
              Actions
            </DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() =>
                navigator.clipboard.writeText(
                  job_application.id ? job_application.id : ""
                )
              }
            >
              Copy payment ID
            </DropdownMenuItem>

            <CustomDialog
              dialog_title="Update Job Application"
              dialog_description="Change the data that you want to update"
              triggerButton={
                <Button className="bg-blue-600 text-white hover:bg-blue-500 cursor-pointer">
                  Update Job Application
                </Button>
              }
            >
              <UpdateJobApplicationForm
                id={job_application.id!!}
                data={job_application}
              />
            </CustomDialog>

            <DropdownMenuSeparator />
            <CustomDialog
              dialog_title="Delete Job Application"
              dialog_description="Do you want to delete this job application?"
              triggerButton={
                <Button className="bg-red-600 text-white hover:bg-red-500 cursor-pointer">
                  Delete Job Application
                </Button>
              }
            >
              <DeleteDialog job_id={job_application.id!!} />
            </CustomDialog>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export const jobApplicationSchema = z.object({
  job_title: z.string().min(1, "Job title is required"),
  company_name: z.string().min(1, "Company name is required"),
  location: z.string().min(1, "Location is required"),
  application_date: z.coerce.date(),
});

export type JobApplicationInput = z.infer<typeof jobApplicationSchema>;
export const updateJobApplicationSchema = jobApplicationSchema.partial();
