import {
  JobInterview,
  JobInterviewInput,
} from "../../app/definitions/job-interviews";
import { getAuthHeader } from "./job-application";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function createJobInterview(
  data: JobInterviewInput,
  job_id: string,
): Promise<JobInterview> {
  const headers = await getAuthHeader();
  const res = await fetch(`${API_URL}/job-applications/${job_id}/interviews`, {
    method: "POST",
    headers: {
      ...headers,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || "Failed to create job timeline");
  }

  return res.json();
}

export async function deleteJobInterview(interview_id: string, job_id: string) {
  const headers = await getAuthHeader();
  const res = await fetch(
    `${API_URL}/job-applications/${job_id}/interviews/${interview_id}`,
    {
      method: "DELETE",
      headers: {
        ...headers,
        "Content-Type": "application/json",
      },
    },
  );

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || "Failed to delete job ");
  }

  return null;
}
