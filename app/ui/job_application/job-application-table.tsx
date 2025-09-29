"use client";

import { useGetJobApplication } from "@/hooks/useJobApplication";
import { DataTable } from "@/app/ui/dashboard/data-table";
import { JobApplicationColumns } from "@/app/definitions/job_application";

export default function JobApplicationTable({ userId }: { userId: string }) {
  const { data, error } = useGetJobApplication(userId);
  if (error) {
    console.log(error);
    return <p>something went wrong</p>;
  }
  return (
    <section id="job-application-table" className="container mx-auto mt-4">
      <DataTable columns={JobApplicationColumns} data={data?.data ?? []} />
    </section>
  );
}
