import {
  JobApplicationResponse,
  JobStatus,
} from "@/app/definitions/job_application";
import { getUsersJobApplication } from "@/lib/api/jobApplication";
import { useQuery } from "@tanstack/react-query";

export function useJobApplication(
  userId: string,
  page: number = 1,
  pageSize: number = 10,
  search?: string,
  status?: JobStatus
) {
  return useQuery<JobApplicationResponse>({
    queryKey: ["jobApplications", userId, page, pageSize, search, status],
    queryFn: () =>
      getUsersJobApplication(
        userId,
        page,
        pageSize,
        search ?? "",
        status ?? ("" as JobStatus)
      ),
    enabled: !!userId,
  });
}
