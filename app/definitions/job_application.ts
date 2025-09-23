"use client";

import { ColumnDef } from "@tanstack/react-table";

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
    accessorKey: "location",
    header: "Location",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
];
