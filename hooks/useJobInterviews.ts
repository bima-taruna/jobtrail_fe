import {
  JobInterviewInput,
  UpdateJobInterview,
} from "@/app/definitions/job-interviews";
import {
  createJobInterview,
  deleteJobInterview,
  updateJobInterview,
} from "@/lib/services/job-interviews";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCreateJobInterview() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      data,
      job_id,
    }: {
      data: JobInterviewInput;
      job_id: string;
    }) => createJobInterview(data, job_id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["jobApplication"] });
    },
  });
}

export function useUpdateJobInterview() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      data,
      interview_id,
      job_id,
    }: {
      data: UpdateJobInterview;
      interview_id: string;
      job_id: string;
    }) => updateJobInterview(interview_id, job_id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["jobApplication"] });
    },
  });
}

export function useDeleteJobInterview() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      interview_id,
      job_id,
    }: {
      interview_id: string;
      job_id: string;
    }) => deleteJobInterview(interview_id, job_id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["jobApplication"] });
    },
  });
}
