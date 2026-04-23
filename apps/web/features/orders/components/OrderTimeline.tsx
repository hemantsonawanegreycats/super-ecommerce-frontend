"use client";

import { cn } from "@/lib/utils";
import { Check, Clock, Package, Truck, CheckCircle2, AlertCircle } from "lucide-react";
import { OrderStatus } from "./OrderStatusBadge";
import { motion } from "framer-motion";

const TIMELINE_STEPS: { status: OrderStatus; label: string; description: string; icon: any }[] = [
  { status: "PENDING",    label: "Order Received",    description: "Your digital footprint has been secured.", icon: Clock },
  { status: "CONFIRMED",  label: "Payment Verified",  description: "Funds have been authenticated and cleared.", icon: CheckCircle2 },
  { status: "PROCESSING", label: "Artisan Packing",   description: "Your items are being prepared with care.", icon: Package },
  { status: "SHIPPED",    label: "In Transit",        description: "Your order is traversing the global network.", icon: Truck },
  { status: "DELIVERED",  label: "At Destination",    description: "Package has reached the final coordinate.", icon: MapPinIcon },
  { status: "COMPLETED",  label: "Experience Finalized", description: "The transaction is now historically sealed.", icon: Check },
];

function MapPinIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

const STATUS_ORDER: OrderStatus[] = [
  "PENDING", "CONFIRMED", "PROCESSING", "SHIPPED", "DELIVERED", "COMPLETED"
];

interface OrderTimelineProps {
  currentStatus: OrderStatus;
  trackingNumber?: string;
  carrier?: string;
}

export function OrderTimeline({ currentStatus, trackingNumber, carrier }: OrderTimelineProps) {
  const currentIndex = STATUS_ORDER.indexOf(currentStatus);
  const isCancelled = currentStatus === "CANCELLED" || currentStatus === "REFUNDED";

  if (isCancelled) {
    return (
      <div className="rounded-[1.5rem] border border-destructive/20 bg-destructive/5 p-8 flex items-center gap-6">
        <div className="h-12 w-12 rounded-full bg-destructive/10 flex items-center justify-center shrink-0">
           <AlertCircle className="h-6 w-6 text-destructive" />
        </div>
        <div className="space-y-1">
           <p className="font-black italic text-lg uppercase tracking-tight text-destructive">ORDER {currentStatus}</p>
           <p className="text-xs font-bold text-destructive/70 uppercase tracking-widest">This transaction has been voided and archived.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative space-y-0">
      {TIMELINE_STEPS.map((step, idx) => {
        const isCompleted = idx < currentIndex;
        const isActive = idx === currentIndex;
        const isUpcoming = idx > currentIndex;
        const Icon = step.icon;

        return (
          <div key={step.status} className="flex gap-8 group">
            {/* Left: Icon + Line */}
            <div className="flex flex-col items-center">
              <motion.div 
                initial={false}
                animate={{
                  backgroundColor: isCompleted ? "var(--primary)" : isActive ? "var(--background)" : "var(--muted)",
                  borderColor: isCompleted || isActive ? "var(--primary)" : "var(--muted)",
                  scale: isActive ? 1.2 : 1,
                }}
                className={cn(
                  "flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 transition-all duration-500 z-10 shadow-sm",
                  isCompleted ? "text-primary-foreground"
                    : isActive ? "text-primary ring-4 ring-primary/10"
                    : "text-muted-foreground/40"
                )}
              >
                <Icon className={cn("h-5 w-5", isCompleted || isActive ? "" : "opacity-50")} />
              </motion.div>
              {idx < TIMELINE_STEPS.length - 1 && (
                <div className="relative w-1 flex-1 min-h-[4rem]">
                   <div className="absolute inset-0 bg-muted/30 w-full" />
                   <motion.div 
                     initial={{ height: 0 }}
                     animate={{ height: isCompleted ? "100%" : isActive ? "50%" : "0%" }}
                     className="absolute inset-0 bg-primary w-full"
                     transition={{ duration: 0.8, ease: "easeInOut" }}
                   />
                </div>
              )}
            </div>

            {/* Right: Content */}
            <div className="pb-12 pt-2 flex-1">
              <div className="flex items-center justify-between mb-1">
                 <h4 className={cn(
                   "text-sm font-black italic uppercase tracking-widest transition-colors duration-500",
                   isActive ? "text-primary scale-105 origin-left" : isCompleted ? "text-foreground" : "text-muted-foreground/40"
                 )}>
                   {step.label}
                 </h4>
                 {isActive && (
                    <span className="text-[10px] font-black italic text-primary bg-primary/5 px-2 py-0.5 rounded border border-primary/10 animate-pulse">
                       CURRENT STATUS
                    </span>
                 )}
              </div>
              <p className={cn(
                "text-xs font-medium transition-colors duration-500",
                isUpcoming ? "text-muted-foreground/30" : "text-muted-foreground"
              )}>
                {step.description}
              </p>
              
              {step.status === "SHIPPED" && (isCompleted || isActive) && trackingNumber && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 p-4 rounded-xl bg-muted/20 border border-dashed flex items-center justify-between"
                >
                   <div className="space-y-1">
                      <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Waybill Number</span>
                      <p className="text-xs font-black italic tracking-tight">{trackingNumber}</p>
                   </div>
                   <div className="h-8 w-8 rounded-full bg-primary/5 flex items-center justify-center text-primary">
                      <Truck className="h-4 w-4" />
                   </div>
                </motion.div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
