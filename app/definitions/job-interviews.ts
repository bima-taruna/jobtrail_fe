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
