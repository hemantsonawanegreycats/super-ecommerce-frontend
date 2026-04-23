"use client";

import { SearchAnalyticsDashboard } from "@/features/search/components/SearchAnalyticsDashboard";

export default function SearchAnalyticsPage() {
  return (
    <div className="space-y-10">
      <div className="space-y-2">
        <h1 className="text-4xl lg:text-6xl font-black italic tracking-tighter uppercase leading-none">Search Analytics</h1>
        <p className="text-muted-foreground font-medium uppercase text-[10px] tracking-[0.2em]">
          Zero-results tracking, conversion funnels, and filter heatmaps
        </p>
      </div>
      <SearchAnalyticsDashboard />
    </div>
  );
}
