"use client";

import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { motion, useAnimation } from "framer-motion";

export function RouteProgress() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const controls = useAnimation();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    controls.set({ width: "0%", opacity: 1 });
    controls.start({ 
      width: "60%", 
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
    });

    const timer = setTimeout(() => {
      controls.start({ 
        width: "100%", 
        transition: { duration: 0.3, ease: "easeOut" } 
      }).then(() => {
        controls.start({ 
          opacity: 0, 
          transition: { duration: 0.4, delay: 0.2 } 
        }).then(() => {
           setIsVisible(false);
           controls.set({ width: "0%" });
        });
      });
    }, 150);

    return () => clearTimeout(timer);
  }, [pathname, searchParams, controls]);

  if (!isVisible) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-[100] h-1 pointer-events-none">
      <motion.div
        className="h-full bg-gradient-to-r from-primary/40 via-primary to-primary shadow-[0_0_15px_rgba(var(--primary),0.6)]"
        initial={{ width: "0%", opacity: 1 }}
        animate={controls}
        style={{ originX: 0 }}
      >
        <div className="absolute right-0 top-0 h-full w-24 bg-gradient-to-r from-transparent to-white/30 blur-sm animate-pulse" />
      </motion.div>
    </div>
  );
}
