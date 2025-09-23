"use client";

import { useJobApplication } from "@/hooks/useJobApplication";
import { DataTable } from "../dashboard/data-table";
import { JobApplicationColumns } from "@/app/definitions/job_application";

export default function JobApplicationTable({ userId }: { userId: string }) {
  const { data, isLoading, error } = useJobApplication(userId);
  if (isLoading) return <p>Loading...</p>;
  if (error) {
    console.log(error);
    return <p>something went wrong</p>;
  }
  return (
    <section id="job-application-table" className="container mx-auto py-10">
      <DataTable columns={JobApplicationColumns} data={data?.data ?? []} />
    </section>
  );
}
