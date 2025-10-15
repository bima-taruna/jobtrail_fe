import {
  JobApplication,
  JobApplicationDetail,
  JobApplicationInput,
  JobApplicationResponse,
  JobStatus,
  UpdateJobApplication,
} from "@/app/definitions/job_application";
import { getSession } from "next-auth/react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

async function getAuthHeader(): Promise<Record<string, string>> {
  const session = await getSession(); // ✅ client safe
  const accessToken = session?.accessToken as string | undefined;
  return accessToken ? { Authorization: `Bearer ${accessToken}` } : {};
}

export async function getUsersJobApplication(
  page: number = 1,
  page_size: number = 10,
  search: string,
  status: JobStatus
): Promise<JobApplicationResponse> {
  const headers = await getAuthHeader();
  const res = await fetch(
    `${API_URL}/job_applications/user?${page}&${page_size}${
      search ? `&${search}` : ""
    }${status ? `&${status}` : ""}`,
    {
      headers,
    }
  );
  if (!res.ok) throw new Error("Failed to fetch job applications");
  return res.json();
}

export async function getJobApplicationById(
  id: string
): Promise<JobApplicationDetail> {
  const headers = await getAuthHeader();
  const res = await fetch(`${API_URL}/job_applications/${id}`, {
    headers,
  });
  if (!res.ok) throw new Error("Failed to fetch job application");
  return res.json();
}

export async function createJobApplication(
  data: JobApplicationInput
): Promise<JobApplication> {
  const headers = await getAuthHeader();
  const res = await fetch(`${API_URL}/job_applications`, {
    method: "POST",
    headers: {
      ...headers,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || "Failed to create job application");
  }

  return res.json();
}

export async function deleteJobApplication(id: string) {
  const headers = await getAuthHeader();
  const res = await fetch(`${API_URL}/job_applications/${id}`, {
    headers,
    method: "DELETE",
  });
  if (!res.ok)
    throw new Error(`Failed to delete job applications with id : ${id}`);
  if (res.status === 204) return true;
  return await res.json();
}

export async function updateJobApplication(
  id: string,
  update_data: UpdateJobApplication
) {
  const headers = await getAuthHeader();
  const res = await fetch(`${API_URL}/job_applications/${id}`, {
    headers: {
      ...headers,
      "Content-Type": "application/json",
    },
    method: "PATCH",
    body: JSON.stringify(update_data),
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(
      errorData.message || `Failed to update job application with id: ${id}`
    );
  }

  return res.json();
}
