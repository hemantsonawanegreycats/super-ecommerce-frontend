"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface StatisticalSignificanceMeterProps {
  confidence: number; // 0 to 100
  durationDays: number;
}

export function StatisticalSignificanceMeter({ confidence, durationDays }: StatisticalSignificanceMeterProps) {
  // Simple gauge logic
  const isSignificant = confidence >= 95;
  const isApproaching = confidence >= 80 && confidence < 95;
  const isLow = confidence < 80;

  const color = isSignificant ? "bg-emerald-500" : isApproaching ? "bg-amber-500" : "bg-destructive";
  const textColor = isSignificant ? "text-emerald-600" : isApproaching ? "text-amber-600" : "text-destructive";
  
  return (
    <div className="p-6 rounded-3xl border bg-background space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-sm font-black italic uppercase tracking-tight">Statistical Power</h4>
          <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
            Expected confidence after {durationDays} days
          </p>
        </div>
        <div className={cn("text-2xl font-black italic", textColor)}>
          {confidence}%
        </div>
      </div>
      
      {/* Gauge bar */}
      <div className="h-4 w-full bg-muted rounded-full overflow-hidden relative">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${confidence}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
          className={cn("h-full rounded-full", color)}
        />
        {/* 95% threshold marker */}
        <div className="absolute top-0 bottom-0 left-[95%] w-0.5 bg-foreground/20 z-10" />
      </div>
      
      <div className="flex justify-between text-[9px] font-black uppercase tracking-widest text-muted-foreground">
        <span>0%</span>
        <span>Target: 95%</span>
      </div>

      <div className={cn("p-3 rounded-xl border text-[10px] font-bold tracking-wide", 
        isSignificant ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-700" : 
        isApproaching ? "bg-amber-500/10 border-amber-500/20 text-amber-700" : 
        "bg-destructive/10 border-destructive/20 text-destructive"
      )}>
        {isSignificant 
          ? "✅ This test has high statistical power and is likely to produce conclusive results."
          : isApproaching
          ? "⚠️ This test is approaching significance. Consider increasing duration or traffic split."
          : "❌ Low statistical power. This test may produce inconclusive results."}
      </div>
    </div>
  );
}
