import {
  JobApplication,
  JobApplicationDetail,
  JobApplicationInput,
  JobApplicationResponse,
  JobStatus,
  UpdateJobApplication,
} from "@/app/definitions/job-application";
import {
  createJobApplication,
  deleteJobApplication,
  getJobApplicationById,
  getUsersJobApplication,
  updateJobApplication,
} from "@/lib/services/job-application";
import {
  useMutation,
  useQuery,
  useSuspenseQuery,
  useQueryClient,
} from "@tanstack/react-query";

export function useGetJobApplication(
  page: number = 1,
  pageSize: number = 10,
  search?: string,
  status?: JobStatus
) {
  return useSuspenseQuery<JobApplicationResponse>({
    queryKey: ["jobApplications", page, pageSize, search, status],
    queryFn: () =>
      getUsersJobApplication(
        page,
        pageSize,
        search ?? "",
        status ?? ("" as JobStatus)
      ),
  });
}

export function useGetJobApplicationById(id: string) {
  return useSuspenseQuery<JobApplicationDetail>({
    queryKey: ["jobApplication", id],
    queryFn: () => getJobApplicationById(id),
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

export function useDeleteJobApplication() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteJobApplication(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["jobApplications"] });
    },
  });
}

export function useUpdateJobApplication() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      update_data,
    }: {
      id: string;
      update_data: UpdateJobApplication;
    }) => updateJobApplication(id, update_data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["jobApplications"] });
    },
  });
}
