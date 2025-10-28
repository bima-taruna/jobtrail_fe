import { JobTimelineInput } from "@/app/definitions/job-timelines";
import {
  createJobTimeline,
  resetJobTimeline,
  undoJobTimeline,
  updateTimelineNote,
} from "@/lib/services/job-timelines";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCreateJobTimeline() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      data,
      job_id,
    }: {
      data: JobTimelineInput;
      job_id: string;
    }) => createJobTimeline(data, job_id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["jobApplication"] });
    },
  });
}

export function useUndoJobTimeline() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (job_id: string) => undoJobTimeline(job_id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["jobApplication"] });
    },
  });
}

export function useResetJobTimeline() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (job_id: string) => resetJobTimeline(job_id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["jobApplication"] });
    },
  });
}

export function useUpdateTimelineNote() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      timeline_id,
      job_id,
      notes,
    }: {
      timeline_id: string;
      job_id: string;
      notes: string;
    }) => updateTimelineNote(timeline_id, job_id, notes),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["jobApplication"] });
    },
  });
}
