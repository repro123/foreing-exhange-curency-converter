import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const today = new Date().toISOString().split("T")[0];

export const yesterday = new Date(Date.now() - 86400000)
  .toISOString()
  .split("T")[0];
