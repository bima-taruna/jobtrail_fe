import { JobApplicationDetail } from "@/app/ui/job_application/job-application-detail";
import { Suspense } from "react";

export default async function Page(props: {
  params: Promise<{
    id: string;
  }>;
}) {
  const params = await props.params;
  const id = params.id;
  return (
    <section className="w-full mt-20 p-4">
      <Suspense fallback={<p>loading...</p>}>
        <JobApplicationDetail id={id} />
      </Suspense>
    </section>
  );
}
