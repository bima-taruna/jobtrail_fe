import {
  JobTimelineInput,
  JobTimelines,
} from "@/app/definitions/job-timelines";
import { getAuthHeader } from "@/lib/services/job-application";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function createJobTimeline(
  data: JobTimelineInput,
  job_id: string,
): Promise<JobTimelines> {
  const headers = await getAuthHeader();
  const res = await fetch(
    `${API_URL}/job-applications/${job_id}/job-timelines`,
    {
      method: "POST",
      headers: {
        ...headers,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    },
  );

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || "Failed to create job timeline");
  }

  return res.json();
}

export async function undoJobTimeline(job_id: string) {
  const headers = await getAuthHeader();
  const res = await fetch(
    `${API_URL}/job-applications/${job_id}/job-timelines/undo`,
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
    throw new Error(errorData.message || "Failed to delete");
  }

  return res.json();
}

export async function resetJobTimeline(job_id: string) {
  const headers = await getAuthHeader();
  const res = await fetch(
    `${API_URL}/job-applications/${job_id}/job-timelines/reset`,
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
    throw new Error(errorData.message || "Failed to delete");
  }

  return res.json();
}

export async function updateTimelineNote(
  timeline_id: string,
  job_id: string,
  notes: string,
) {
  const headers = await getAuthHeader();
  const res = await fetch(
    `${API_URL}/job-applications/${job_id}/job-timelines/${timeline_id}/note`,
    {
      headers: {
        ...headers,
        "Content-Type": "application/json",
      },
      method: "PATCH",
      body: JSON.stringify(notes),
    },
  );
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(
      errorData.message ||
        `Failed to update timeline note with id: ${timeline_id}`,
    );
  }

  return res.json();
}
