"use client";

import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

const STEPS = [
  { id: "address", label: "Address", path: "/checkout/address" },
  { id: "shipping", label: "Shipping", path: "/checkout/shipping" },
  { id: "payment", label: "Payment", path: "/checkout/payment" },
  { id: "review", label: "Review", path: "/checkout/review" },
];

export function CheckoutStepper() {
  const pathname = usePathname();

  const currentStepIndex = STEPS.findIndex((step) => pathname === step.path);

  return (
    <nav aria-label="Checkout Progress" className="mb-16 mt-4">
      <ol className="flex items-center justify-between w-full relative max-w-2xl mx-auto px-4">
        {/* Background Line */}
        <div className="absolute top-1/2 left-0 w-full h-1 bg-muted/40 -translate-y-1/2 z-0 rounded-full" />
        
        {/* Active Line Progress */}
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${(Math.max(0, currentStepIndex) / (STEPS.length - 1)) * 100}%` }}
          className="absolute top-1/2 left-0 h-1 bg-primary -translate-y-1/2 z-0 rounded-full" 
          transition={{ duration: 0.8, ease: "easeInOut" }}
        />

        {STEPS.map((step, idx) => {
          const isCompleted = idx < currentStepIndex;
          const isActive = idx === currentStepIndex;

          return (
            <li key={step.id} className="relative z-10 flex flex-col items-center">
              <motion.div
                initial={false}
                animate={{
                  backgroundColor: isCompleted ? "var(--primary)" : isActive ? "var(--background)" : "var(--background)",
                  borderColor: isCompleted || isActive ? "var(--primary)" : "var(--muted)",
                  scale: isActive ? 1.1 : 1,
                }}
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all duration-300 shadow-sm",
                  isCompleted ? "text-primary-foreground" : isActive ? "text-primary ring-4 ring-primary/10" : "text-muted-foreground"
                )}
              >
                {isCompleted ? (
                  <Check className="h-5 w-5" />
                ) : (
                  <span className="text-sm font-black italic">{idx + 1}</span>
                )}
              </motion.div>
              <span
                className={cn(
                  "absolute -bottom-8 text-[10px] font-black uppercase tracking-[0.2em] whitespace-nowrap transition-colors duration-300",
                  isActive ? "text-primary" : "text-muted-foreground/60"
                )}
              >
                {step.label}
              </span>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
