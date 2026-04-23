"use client";

import { ConversionFunnel } from "@/features/analytics/components/ConversionFunnel";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

export default function FunnelAnalyticsPage() {
  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div className="space-y-2">
          <h1 className="text-4xl lg:text-6xl font-black italic tracking-tighter uppercase leading-none">Conversion Funnel</h1>
          <p className="text-muted-foreground font-medium uppercase text-[10px] tracking-[0.2em]">
            Analyze drop-off rates across the customer journey
          </p>
        </div>
        <Button className="rounded-full font-black italic uppercase h-12 px-6 gap-2 bg-indigo-500 hover:bg-indigo-600">
          <Sparkles className="h-4 w-4" /> AI Insights Disabled
        </Button>
      </div>

      <div className="p-8 rounded-[2.5rem] bg-background border shadow-2xl shadow-primary/5">
        <ConversionFunnel />
      </div>
    </div>
  );
}
