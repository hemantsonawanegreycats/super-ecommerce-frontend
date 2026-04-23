"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo } from "react";

export function useSearchFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Parse current params
  const filters = useMemo(() => {
    const params = Object.fromEntries(searchParams.entries());
    return {
      query: params.q || "",
      categories: params.categories ? params.categories.split(",") : [],
      brands: params.brands ? params.brands.split(",") : [],
      priceRange: params.price ? params.price.split("-").map(Number) as [number, number] : [0, 1000] as [number, number],
      rating: params.rating ? Number(params.rating) : null,
      sort: params.sort || "recommended",
      page: Number(params.page) || 1,
    };
  }, [searchParams]);

  const updateFilters = useCallback((newFilters: Partial<typeof filters>) => {
    const params = new URLSearchParams(searchParams.toString());

    Object.entries(newFilters).forEach(([key, value]) => {
      if (value === null || value === "" || (Array.isArray(value) && value.length === 0)) {
        params.delete(key);
      } else if (key === "categories" || key === "brands") {
        params.set(key, (value as string[]).join(","));
      } else if (key === "priceRange") {
        params.set("price", (value as [number, number]).join("-"));
      } else {
        params.set(key, String(value));
      }
    });

    // Reset page on filter change
    if (!newFilters.page) {
      params.delete("page");
    }

    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  }, [pathname, router, searchParams]);

  const clearAll = useCallback(() => {
    router.push(pathname, { scroll: false });
  }, [pathname, router]);

  return {
    filters,
    updateFilters,
    clearAll,
  };
}
