"use client";

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
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() =>
                navigator.clipboard.writeText(
                  job_application.id ? job_application.id : ""
                )
              }
            >
              Copy payment ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
