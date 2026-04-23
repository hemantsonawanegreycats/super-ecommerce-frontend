"use client";

import { create } from "zustand";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, Clock, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

interface RateLimitStore {
  isLimited: boolean;
  retryAfter: number; // seconds
  setLimited: (seconds: number) => void;
  clearLimited: () => void;
}

export const useRateLimitStore = create<RateLimitStore>((set) => ({
  isLimited: false,
  retryAfter: 0,
  setLimited: (seconds) => set({ isLimited: true, retryAfter: seconds }),
  clearLimited: () => set({ isLimited: false, retryAfter: 0 }),
}));

export function RateLimitBanner() {
  const { isLimited, retryAfter, clearLimited } = useRateLimitStore();
  const [timeLeft, setTimeLeft] = useState(retryAfter);

  useEffect(() => {
    if (!isLimited) return;
    setTimeLeft(retryAfter);
    
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          clearLimited();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isLimited, retryAfter, clearLimited]);

  return (
    <AnimatePresence>
      {isLimited && (
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          className="fixed top-0 left-0 right-0 z-[100] p-4 flex justify-center"
        >
          <div className="bg-destructive text-destructive-foreground px-8 py-4 rounded-[2rem] shadow-2xl shadow-destructive/20 border-2 border-white/20 flex items-center gap-6 max-w-2xl w-full">
            <div className="h-10 w-10 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center shrink-0">
              <AlertTriangle className="h-6 w-6" />
            </div>
            <div className="flex-1 space-y-1">
              <p className="text-sm font-black italic uppercase tracking-tight">Access Restricted</p>
              <p className="text-xs font-medium opacity-80 leading-none">You are making requests too quickly. Please wait for the cooldown.</p>
            </div>
            <div className="flex items-center gap-4 bg-black/20 rounded-full px-4 py-2">
              <Clock className="h-4 w-4" />
              <span className="text-sm font-black italic">{timeLeft}s</span>
            </div>
            <Button 
              size="icon" 
              variant="ghost" 
              onClick={clearLimited}
              className="rounded-full hover:bg-white/10"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
