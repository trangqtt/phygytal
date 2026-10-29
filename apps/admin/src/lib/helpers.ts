import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const shortenString = (text: string) => {
  const prefix = text.slice(0, 4 + 2);
  const suffix = text.slice(-4);
  return prefix + "..." + suffix;
};
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}