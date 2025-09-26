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

export enum JobStatus {
  SAVED = "saved",
  APPLIED = "applied",
  INTERVIEWED = "interviewed",
  OFFERED = "offered",
  REJECTED = "rejected",
  ACCEPTED = "accepted",
}

export interface JobApplication {
  id: string | null;
  job_title: string;
  company_name: string;
  location: string;
  application_date: Date;
  status: JobStatus;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
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
    accessorKey: "status",
    header: "Status",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const job_application = row.original;
      const deleteJobs = useDeleteJobApplication();
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
            <DropdownMenuItem className="bg-blue-600 mt-2 hover:bg-blue-300 ">
              Update
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="bg-red-600 text-white hover:bg-red-400"
              onClick={() => deleteJobs.mutate(job_application.id!!)}
            >
              Delete
            </DropdownMenuItem>
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
  status: z.enum(JobStatus),
});

export type JobApplicationInput = z.infer<typeof jobApplicationSchema>;
