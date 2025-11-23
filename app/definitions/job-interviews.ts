import z from "zod";

export enum JobInterviewType {
  PHONE = "phone",
  VIDEO = "video",
  ONSITE = "onsite",
}

export interface JobInterview {
  id: string | null;
  interview_type: JobInterviewType;
  interview_date: Date;
  interviewer_name: string;
  notes: string;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
}

export const jobInterviewSchema = z.object({
  interview_type: z.enum(JobInterviewType),
  interview_date: z.date(),
  interviewer_name: z.string().min(2).max(100),
  notes: z.string().min(10).max(500).optional(),
});

export type JobInterviewInput = z.infer<typeof jobInterviewSchema>;
