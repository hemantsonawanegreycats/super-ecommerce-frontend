"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";

export function HCaptchaMock({ onVerify }: { onVerify: () => void }) {
  const [status, setStatus] = useState<"idle" | "verifying" | "success">("idle");

  const handleVerify = () => {
    setStatus("verifying");
    setTimeout(() => {
      setStatus("success");
      setTimeout(onVerify, 500);
    }, 1500);
  };

  return (
    <div className="p-4 rounded-2xl border bg-muted/20 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <ShieldCheck className="h-5 w-5 text-primary" />
          <span className="text-[10px] font-black uppercase tracking-widest">Security Verification</span>
        </div>
        <div className="text-[9px] font-bold text-muted-foreground uppercase">hCaptcha Mock</div>
      </div>

      <button
        onClick={handleVerify}
        disabled={status !== "idle"}
        className="w-full h-16 rounded-xl border bg-background flex items-center px-4 gap-4 transition-all hover:border-primary group disabled:opacity-80"
      >
        <div className="h-8 w-8 rounded-lg border-2 border-muted flex items-center justify-center group-hover:border-primary transition-colors">
          {status === "verifying" ? (
            <Loader2 className="h-4 w-4 animate-spin text-primary" />
          ) : status === "success" ? (
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="h-5 w-5 bg-emerald-500 rounded-md flex items-center justify-center">
               <ShieldCheck className="h-3 w-3 text-white" />
            </motion.div>
          ) : null}
        </div>
        <span className="text-sm font-bold">I am human</span>
        <div className="ml-auto opacity-10">
          <ShieldCheck className="h-10 w-10" />
        </div>
      </button>
    </div>
  );
}
