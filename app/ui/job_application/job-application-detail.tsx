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
import JobDetailTimeline from "@/app/ui/job_application/job-detail-timeline";
import { CustomDialog } from "@/app/ui/job_application/custom-dialog";
import { Button } from "@/app/ui/components/button";
import { PlusIcon } from "lucide-react";
import { CreateJobApplicationForm } from "@/app/ui/job_application/add-form";
import { CreateJobTimelineForm } from "../timelines/add-form";

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
      <section className="overflow-x-hidden">
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
            <CardTitle className={`${poppins.className} text-xl font-bold`}>
              Job Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2">
              <p className="font-bold">Applied on : </p>{" "}
              <p>{formatDate(data ? data.application_date.toString() : "")}</p>
            </div>
            <div className="flex gap-2">
              <p className="font-bold">Status : </p>{" "}
              <p>{data?.current_status}</p>
            </div>
          </CardContent>
        </Card>
      </section>
      <section className="mt-5 grid grid-cols-1 gap-4">
        <Card>
          <CardHeader>
            <CardTitle
              className={`${poppins.className} text-xl font-bold flex justify-between`}
            >
              Job Timelines
              <CustomDialog
                dialog_title="Add Job Application"
                dialog_action="Add Job Application"
                dialog_description="Fill the information of job application that you're currently hiring"
                triggerButton={
                  <Button>
                    <PlusIcon /> Add Timelines
                  </Button>
                }
              >
                <CreateJobTimelineForm job_id={id!!} />
              </CustomDialog>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <JobDetailTimeline timelines={data.timelines} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className={`${poppins.className} text-xl font-bold`}>
              Job Interviews
            </CardTitle>
          </CardHeader>
          <CardContent>
            <JobDetailTimeline timelines={data.timelines} />
          </CardContent>
        </Card>
      </section>
    </>
  );
}
