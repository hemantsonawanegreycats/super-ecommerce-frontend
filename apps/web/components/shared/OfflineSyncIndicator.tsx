"use client";

import { useOfflineStatus } from "@/hooks/use-offline-status";
import { WifiOff, RefreshCw, CheckCircle2, CloudOff } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export function OfflineSyncIndicator() {
  const { isOnline, pendingCount } = useOfflineStatus();

  return (
    <AnimatePresence>
      {(!isOnline || pendingCount > 0) && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.9 }}
          className="fixed bottom-6 right-6 z-[100]"
        >
          <div className={cn(
            "flex items-center gap-3 px-6 py-3 rounded-full border shadow-2xl backdrop-blur-xl transition-colors duration-500",
            !isOnline 
              ? "bg-destructive/10 border-destructive/20 text-destructive" 
              : "bg-primary/10 border-primary/20 text-primary"
          )}>
            <div className="relative">
               {!isOnline ? (
                  <CloudOff className="h-4 w-4" />
               ) : (
                  <RefreshCw className="h-4 w-4 animate-spin" />
               )}
               {pendingCount > 0 && (
                  <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-current animate-ping" />
               )}
            </div>
            
            <div className="flex flex-col">
               <span className="text-[10px] font-black uppercase tracking-widest leading-none">
                  {!isOnline ? "Network Offline" : "Syncing Data"}
               </span>
               <span className="text-[9px] font-bold opacity-70 uppercase tracking-tight mt-1">
                  {pendingCount > 0 ? `${pendingCount} Items in Queue` : "Reconnecting..."}
               </span>
            </div>

            {!isOnline && (
               <div className="h-8 w-[1px] bg-destructive/20 mx-1" />
            )}
            
            {!isOnline && (
               <div className="flex items-center gap-2 text-[10px] font-black italic">
                  SAVE SECURED
               </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
