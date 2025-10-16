import z from "zod";
import { JobAppEvent } from "@/app/definitions/job-application";

export interface JobTimelines {
  id: string | null;
  event_type: JobAppEvent;
  event_date: Date;
  notes: string;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
}

export const jobTimelineSchema = z.object({
  event_type: z.enum(JobAppEvent),
  event_date: z.coerce.date(),
  notes: z.string().max(255).optional(),
});

export type JobTimelineInput = z.infer<typeof jobTimelineSchema>;
