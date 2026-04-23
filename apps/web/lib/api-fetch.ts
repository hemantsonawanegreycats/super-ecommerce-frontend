"use client";

import { toast } from "sonner";
import { useRateLimitStore } from "@/components/shared/RateLimitBanner";

interface FetchOptions extends RequestInit {
  retries?: number;
  backoff?: number; // ms
}

export async function apiFetch(url: string, options: FetchOptions = {}) {
  const { retries = 3, backoff = 1000, ...fetchOptions } = options;
  const setLimited = useRateLimitStore.getState().setLimited;

  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url, fetchOptions);

      if (response.status === 429) {
        const retryAfter = parseInt(response.headers.get("Retry-After") || "60");
        setLimited(retryAfter);
        throw new Error("Rate limit exceeded");
      }

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      return response;
    } catch (error: any) {
      if (i === retries - 1 || error.message === "Rate limit exceeded") {
        throw error;
      }

      const delay = backoff * Math.pow(2, i);
      console.warn(`Fetch failed, retrying in ${delay}ms...`, error);
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }
}
