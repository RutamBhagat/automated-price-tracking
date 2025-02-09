import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isValidUrl(url: string): boolean {
  try {
    const parsedUrl = new URL(url);

    // Check if scheme is http or https
    if (!["http:", "https:"].includes(parsedUrl.protocol)) {
      return false;
    }

    // Basic domain validation
    const domainPattern =
      /^[a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(\.[a-zA-Z]{2,})+$/;
    if (!domainPattern.test(parsedUrl.hostname)) {
      return false;
    }

    return true;
  } catch {
    return false;
  }
}

export function formatCurrency(amount: number, currency: string): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
  }).format(amount);
}
