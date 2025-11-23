import { JobInterviewInput } from "@/app/definitions/job-interviews";
import { createJobInterview } from "@/lib/services/job-interviews";
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
