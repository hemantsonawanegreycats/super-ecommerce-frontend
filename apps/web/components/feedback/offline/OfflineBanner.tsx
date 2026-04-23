"use client";

import { useState, useEffect } from "react";
import { WifiOff } from "lucide-react";
import { useOnlineStatus } from "@/lib/hooks/useOnlineStatus";
import { motion, AnimatePresence } from "framer-motion";

export function OfflineBanner() {
  const isOnline = useOnlineStatus();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <AnimatePresence>
      {!isOnline && (
        <motion.div 
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -50, opacity: 0 }}
          className="fixed top-4 left-1/2 -translate-x-1/2 z-[110]"
        >
          <div className="flex items-center gap-3 rounded-full border border-destructive/20 bg-destructive/90 px-6 py-2.5 text-sm font-semibold text-white shadow-xl backdrop-blur-md">
            <motion.div
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <WifiOff className="h-4 w-4" />
            </motion.div>
            <span>You&apos;re offline. Changes will sync later.</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
