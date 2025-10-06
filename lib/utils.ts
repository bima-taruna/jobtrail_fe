import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(params: string) {
  const date = new Date(params);
  const formattedDate = date.toLocaleDateString("id-ID");
  return formattedDate;
}
