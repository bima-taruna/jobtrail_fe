import {
  JobApplicationInput,
  JobApplicationResponse,
  JobStatus,
} from "@/app/definitions/job_application";
import {
  createJobApplication,
  getUsersJobApplication,
} from "@/lib/api/jobApplication";
import {
  useMutation,
  useQuery,
  useSuspenseQuery,
  useQueryClient,
} from "@tanstack/react-query";

export function useGetJobApplication(
  userId: string,
  page: number = 1,
  pageSize: number = 10,
  search?: string,
  status?: JobStatus
) {
  return useSuspenseQuery<JobApplicationResponse>({
    queryKey: ["jobApplications", userId, page, pageSize, search, status],
    queryFn: () =>
      userId
        ? getUsersJobApplication(
            userId,
            page,
            pageSize,
            search ?? "",
            status ?? ("" as JobStatus)
          )
        : Promise.resolve({ data: [], page: 1, page_size: 0, total: 0 }),
  });
}

export function useCreateJobApplication() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: JobApplicationInput) => createJobApplication(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["jobApplications"] });
    },
  });
}
