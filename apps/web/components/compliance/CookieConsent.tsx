"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Cookie, X } from "lucide-react";

export function CookieConsent() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      const timer = setTimeout(() => setShow(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookie-consent", "accepted");
    setShow(false);
  };

  const handleDecline = () => {
    localStorage.setItem("cookie-consent", "declined");
    setShow(false);
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div 
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] w-[calc(100%-2rem)] max-w-2xl"
        >
          <div className="relative overflow-hidden rounded-3xl border border-white/20 bg-background/60 p-6 shadow-2xl backdrop-blur-xl">
            {/* Ambient Background Glow */}
            <div className="absolute -left-10 -top-10 h-32 w-32 rounded-full bg-primary/10 blur-3xl" />
            
            <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <Cookie className="h-6 w-6" />
              </div>
              
              <div className="flex-1 space-y-1">
                <h3 className="text-base font-bold tracking-tight">Cookie Preferences</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  We use cookies to personalize your experience and analyze our traffic. 
                  By continuing, you agree to our <button className="underline hover:text-foreground">Cookie Policy</button>.
                </p>
              </div>

              <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
                <Button variant="ghost" size="sm" onClick={handleDecline} className="text-xs font-semibold hover:bg-destructive/10 hover:text-destructive">
                  Decline
                </Button>
                <Button size="sm" onClick={handleAccept} className="rounded-xl px-6 text-xs font-bold shadow-lg shadow-primary/20">
                  Accept All
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
