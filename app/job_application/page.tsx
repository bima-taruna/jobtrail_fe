import { poppins } from "@/app/ui/fonts";
import JobApplicationTable from "@/app/ui/job_application/job-application-table";
import { CustomDialog } from "@/app/ui/job_application/custom-dialog";
import { Suspense } from "react";
import { CreateJobApplicationForm } from "../ui/job_application/add-form";
import { Button } from "../ui/components/button";
import { PlusIcon } from "lucide-react";

export default async function Page() {
  return (
    <div className="mt-20 px-4 md:px-24">
      <h1 className={`${poppins.className} text-2xl font-bold`}>
        List of Job Application
      </h1>
      <section className="mt-3 flex-col">
        <div className="justify-self-end">
          <CustomDialog
            dialog_title="Add Job Application"
            dialog_action="Add Job Application"
            dialog_description="Fill the information of job application that you're currently hiring"
            triggerButton={
              <Button>
                <PlusIcon /> Add Job Application
              </Button>
            }
          >
            <CreateJobApplicationForm />
          </CustomDialog>
        </div>
        <Suspense fallback={<p>Loading....</p>}>
          <JobApplicationTable />
        </Suspense>
      </section>
    </div>
  );
}
