"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  Search, TrendingDown, TrendingUp, Flame, Filter, 
  BarChart3, ArrowUpRight, ArrowDownRight
} from "lucide-react";

const ZERO_RESULTS = [
  { query: "bamboo pillowcase king size", count: 142, date: "Today" },
  { query: "weighted blanket 25lbs", count: 98, date: "Today" },
  { query: "organic cotton duvet", count: 87, date: "Yesterday" },
  { query: "cooling mattress topper queen", count: 71, date: "Yesterday" },
  { query: "electric blanket safe", count: 64, date: "3 days ago" },
];

const TOP_SEARCHES = [
  { query: "weighted blanket", count: 2401, conversion: "8.2%", trend: "up" },
  { query: "bamboo throw", count: 1820, conversion: "12.4%", trend: "up" },
  { query: "fleece blanket", count: 1540, conversion: "6.1%", trend: "down" },
  { query: "linen throw", count: 980, conversion: "9.8%", trend: "up" },
  { query: "knit blanket", count: 740, conversion: "5.3%", trend: "down" },
];

const FILTER_HEATMAP = [
  { filter: "Price: Under $50", count: 3420 },
  { filter: "Material: Bamboo", count: 2810 },
  { filter: "Color: Neutral", count: 2340 },
  { filter: "Size: King", count: 1980 },
  { filter: "Rating: 4★+", count: 1760 },
  { filter: "Brand: SleepWell", count: 1230 },
];

export function SearchAnalyticsDashboard() {
  const maxFilter = Math.max(...FILTER_HEATMAP.map(f => f.count));

  return (
    <div className="space-y-10">
      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Total Searches", value: "24.1k", change: "+18%", up: true },
          { label: "Zero-Result Rate", value: "4.2%", change: "-0.8%", up: true },
          { label: "Search→Purchase", value: "7.4%", change: "+1.2%", up: true },
          { label: "Avg. Filters Used", value: "2.3", change: "+0.4", up: true },
        ].map((kpi, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
            className="p-8 rounded-[2.5rem] bg-background border space-y-3">
            <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">{kpi.label}</p>
            <p className="text-4xl font-black italic tracking-tighter">{kpi.value}</p>
            <div className={cn("flex items-center gap-1 text-[10px] font-black uppercase tracking-widest", kpi.up ? "text-emerald-600" : "text-destructive")}>
              {kpi.up ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
              {kpi.change} vs last 30d
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Zero-Result Queries */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-2xl bg-destructive/10 flex items-center justify-center text-destructive">
              <TrendingDown className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-lg font-black italic uppercase tracking-tight">Zero-Result Queries</h3>
              <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">Search terms returning no products</p>
            </div>
          </div>
          <div className="rounded-[2.5rem] border bg-background overflow-hidden">
            {ZERO_RESULTS.map((item, i) => (
              <div key={i} className={cn("flex items-center gap-4 p-5 hover:bg-muted/10 transition-all", i < ZERO_RESULTS.length - 1 && "border-b border-dashed")}>
                <div className="h-8 w-8 rounded-xl bg-destructive/10 flex items-center justify-center text-destructive text-[10px] font-black shrink-0">
                  {i + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold italic truncate">{item.query}</p>
                  <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{item.date}</p>
                </div>
                <span className="text-sm font-black italic shrink-0">{item.count}x</span>
              </div>
            ))}
          </div>
        </div>

        {/* Top Searches */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-600">
              <Flame className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-lg font-black italic uppercase tracking-tight">Top Performing Searches</h3>
              <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">Volume + conversion rates</p>
            </div>
          </div>
          <div className="rounded-[2.5rem] border bg-background overflow-hidden">
            {TOP_SEARCHES.map((item, i) => (
              <div key={i} className={cn("flex items-center gap-6 p-5 hover:bg-muted/10 transition-all", i < TOP_SEARCHES.length - 1 && "border-b border-dashed")}>
                <div className="h-8 w-8 rounded-xl bg-muted/30 flex items-center justify-center text-[10px] font-black shrink-0">{i + 1}</div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold italic truncate">{item.query}</p>
                  <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{item.count.toLocaleString()} searches</p>
                </div>
                <div className="flex items-center gap-2">
                  {item.trend === "up"
                    ? <TrendingUp className="h-3.5 w-3.5 text-emerald-500" />
                    : <TrendingDown className="h-3.5 w-3.5 text-destructive" />
                  }
                  <span className={cn("text-sm font-black italic", item.trend === "up" ? "text-emerald-600" : "text-destructive")}>{item.conversion}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Filter Heatmap */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
            <Filter className="h-4 w-4" />
          </div>
          <div>
            <h3 className="text-lg font-black italic uppercase tracking-tight">Filter Usage Heatmap</h3>
            <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">Most-applied facet filters</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {FILTER_HEATMAP.map((f, i) => {
            const pct = Math.round((f.count / maxFilter) * 100);
            const intensity = pct > 80 ? "bg-primary" : pct > 50 ? "bg-primary/70" : pct > 30 ? "bg-primary/40" : "bg-primary/20";
            return (
              <motion.div key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 + i * 0.05 }}
                className="p-6 rounded-3xl border bg-background space-y-3">
                <div className="flex justify-between items-start">
                  <span className="text-sm font-black italic uppercase tracking-tight">{f.filter}</span>
                  <span className="text-lg font-black italic">{(f.count / 1000).toFixed(1)}k</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${pct}%` }}
                    transition={{ duration: 1, delay: 0.6 + i * 0.05, ease: "easeOut" }}
                    className={cn("h-full rounded-full", intensity)}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
