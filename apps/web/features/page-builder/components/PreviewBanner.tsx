"use client";

import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";

export function PreviewBanner({ visible, onDismiss }: { visible: boolean; onDismiss: () => void }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: -60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -60, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="sticky top-0 z-50 w-full bg-amber-500 text-amber-950 px-6 py-3 flex items-center justify-between shadow-xl"
        >
          <div className="flex items-center gap-3">
            <Eye className="h-4 w-4 shrink-0" />
            <span className="text-[11px] font-black uppercase tracking-[0.2em]">
              Preview Mode — This is a draft. Changes are not live.
            </span>
          </div>
          <button
            onClick={onDismiss}
            className="text-[10px] font-black uppercase tracking-widest underline underline-offset-4 hover:opacity-70 transition-opacity flex items-center gap-1"
          >
            <EyeOff className="h-3.5 w-3.5" /> Dismiss
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
