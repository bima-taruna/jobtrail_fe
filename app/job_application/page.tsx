import { poppins } from "@/app/ui/fonts";
import JobApplicationTable from "../ui/job_application/job-application-table";
import { auth } from "../api/auth/[...nextauth]/route";

export default async function Page() {
  const session = await auth();
  const userId = session?.user.id;
  return (
    <div className="mt-20 px-3 md:px-24">
      <h1 className={`${poppins.className} text-2xl font-bold`}>
        List of Job Application
      </h1>
      {userId ? (
        <JobApplicationTable userId={userId} />
      ) : (
        <p>No user logged in</p>
      )}
    </div>
  );
}
