import { poppins } from "@/app/ui/fonts";
import JobApplicationTable from "@/app/ui/job_application/job-application-table";
import { auth } from "@/app/api/auth/[...nextauth]/route";
import { AddDialog } from "@/app/ui/job_application/add-dialog";
import { Suspense } from "react";

export default async function Page() {
  const session = await auth();
  const userId = session?.user.id;
  return (
    <div className="mt-20 px-3 md:px-24">
      <h1 className={`${poppins.className} text-2xl font-bold`}>
        List of Job Application
      </h1>
      <section className="mt-3 flex-col">
        <div className="justify-self-end">
          <AddDialog />
        </div>
        {userId ? (
          <Suspense fallback={<p>Loading....</p>}>
            <JobApplicationTable userId={userId} />
          </Suspense>
        ) : (
          <p>No user logged in</p>
        )}
      </section>
    </div>
  );
}
