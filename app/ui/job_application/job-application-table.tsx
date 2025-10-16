"use client";

import { useGetJobApplication } from "@/hooks/useJobApplication";
import { DataTable } from "@/app/ui/dashboard/data-table";
import { JobApplicationColumns } from "@/app/definitions/job-application";

export default function JobApplicationTable() {
  const { data, error } = useGetJobApplication();
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
