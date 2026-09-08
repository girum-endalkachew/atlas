import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateId(): string {
  return \\-\\;
}

export function formatRelativeTime(timestamp: number): string {
  const seconds = Math.floor((Date.now() - timestamp) / 1000);
  if (seconds < 60) return "just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return \\m ago\;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return \\h ago\;
  const days = Math.floor(hours / 24);
  if (days < 7) return \\d ago\;
  if (days < 30) return \\w ago\;
  return new Date(timestamp).toLocaleDateString();
}
