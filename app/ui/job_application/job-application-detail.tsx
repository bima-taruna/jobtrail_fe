"use client";

import { useGetJobApplicationById } from "@/hooks/useJobApplication";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/ui/components/card";
import { poppins } from "../fonts";
import { formatDate } from "@/lib/utils";

interface JobDetailProps {
  id: string;
}

export function JobApplicationDetail({ id }: JobDetailProps) {
  const { data, error } = useGetJobApplicationById(id);
  if (error) {
    console.log(error);
    return <p>something went wrong</p>;
  }
  return (
    <>
      <section>
        <h1 className={`${poppins.className} font-bold text-3xl`}>
          {data?.job_title}
        </h1>
        <h2 className={`${poppins.className} text-xl`}>
          {data?.company_name} • {data?.location}
        </h2>
      </section>
      <section className="mt-5">
        <Card>
          <CardHeader>
            <CardTitle>Job Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2">
              <p className="font-bold">Applied on : </p>{" "}
              <p>{formatDate(data ? data.application_date.toString() : "")}</p>
            </div>
            <div className="flex gap-2">
              <p className="font-bold">Status : </p> <p>{data?.status}</p>
            </div>
          </CardContent>
        </Card>
      </section>
    </>
  );
}
