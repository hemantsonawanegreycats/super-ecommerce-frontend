"use client";

import { motion } from "framer-motion";
import { useFileManagerStore } from "../store";
import { cn } from "@/lib/utils";

export function StorageQuota() {
  const quota = useFileManagerStore(s => s.quota);
  const pct = Math.round((quota.used / quota.total) * 100);
  const isWarning = pct > 75;
  const isDanger = pct > 90;

  return (
    <div className="p-6 rounded-[2rem] bg-muted/20 border border-dashed space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Storage Quota</span>
        <span className={cn(
          "text-[10px] font-black uppercase tracking-widest",
          isDanger ? "text-destructive" : isWarning ? "text-amber-600" : "text-primary"
        )}>
          {quota.used.toFixed(0)} / {quota.total} MB
        </span>
      </div>
      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
          className={cn(
            "h-full rounded-full",
            isDanger ? "bg-destructive" : isWarning ? "bg-amber-500" : "bg-primary"
          )}
        />
      </div>
      <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
        {pct}% used · {(quota.total - quota.used).toFixed(0)} MB free
      </p>
    </div>
  );
}
