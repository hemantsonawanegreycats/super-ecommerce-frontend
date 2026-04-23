"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Check, Package, ArrowRight, Download, Gift, Share2, Rocket } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import confetti from "canvas-confetti";
import { motion } from "framer-motion";
import { AnimatedCheckmark } from "@/components/shared/AnimatedCheckmark";

export default function SuccessPage() {
  const { orderId } = useParams();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    
    // Luxury Confetti Burst
    const end = Date.now() + 3 * 1000;
    const colors = ["#000000", "#ffffff", "#71717a"];

    (function frame() {
      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors,
      });
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  }, []);

  if (!isClient) return null;

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-6 py-20 overflow-hidden">
      {/* Animated Checkmark */}
      <motion.div 
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", damping: 12, stiffness: 200, delay: 0.2 }}
        className="relative mb-10"
      >
        <div className="absolute inset-0 scale-[2.5] blur-3xl opacity-20 bg-emerald-500 rounded-full animate-pulse" />
        <div className="h-32 w-32 rounded-full bg-emerald-500 flex items-center justify-center shadow-2xl shadow-emerald-500/20 relative z-10 border-4 border-white dark:border-zinc-950 p-6">
           <AnimatedCheckmark className="h-full w-full text-white" />
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="text-center space-y-4 mb-16"
      >
        <h1 className="text-5xl lg:text-7xl font-black italic tracking-tighter leading-none">ORDER SECURED</h1>
        <p className="text-muted-foreground text-xl font-medium max-w-xl mx-auto">
          The luxury experience has begun. Your items are being prepared for white-glove dispatch.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl w-full">
        {/* Order Details Card */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-background rounded-[2.5rem] border shadow-2xl shadow-primary/5 p-10 space-y-8"
        >
          <div className="flex items-center gap-3">
             <div className="h-10 w-10 rounded-xl bg-primary/5 flex items-center justify-center">
                <Rocket className="h-5 w-5 text-primary" />
             </div>
             <h3 className="font-black italic tracking-tight uppercase text-sm">Logistics Status</h3>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center text-sm">
              <span className="text-muted-foreground font-bold uppercase tracking-widest text-[10px]">Reference Number</span>
              <span className="font-black italic text-lg">{orderId}</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-muted-foreground font-bold uppercase tracking-widest text-[10px]">Processing Status</span>
              <span className="bg-emerald-500/5 text-emerald-600 border border-emerald-500/10 px-4 py-1.5 rounded-full font-black italic text-[10px] uppercase">
                Dispatching Soon
              </span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-muted-foreground font-bold uppercase tracking-widest text-[10px]">Arrival Estimate</span>
              <span className="font-black italic">3-5 Business Days</span>
            </div>
          </div>

          <div className="pt-8 border-t border-dashed space-y-4">
             <Button variant="outline" className="w-full h-14 rounded-full font-black italic gap-3 border-2">
                <Download className="h-4 w-4" />
                GET INVOICE PDF
             </Button>
             <Link href="/account/orders" className={cn(buttonVariants({ size: "lg" }), "w-full h-14 rounded-full font-black italic gap-3 shadow-xl")}>
                <Package className="h-5 w-5" />
                TRACK SHIPMENT
             </Link>
          </div>
        </motion.div>

        {/* Loyalty/Referral Card */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-primary rounded-[2.5rem] p-10 text-primary-foreground space-y-8 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-8 opacity-10">
             <Gift className="h-40 w-40 rotate-12" />
          </div>
          
          <div className="relative z-10 space-y-6">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center">
                 <Gift className="h-5 w-5" />
              </div>
              <h3 className="font-black italic tracking-tight uppercase text-sm">Exclusive Privilege</h3>
            </div>

            <div className="space-y-4">
               <h2 className="text-3xl font-black italic tracking-tighter leading-tight">GIVE $50,<br />GET $50</h2>
               <p className="text-primary-foreground/80 font-medium leading-relaxed">
                 Invite your inner circle to the Super-E experience. When they place their first order, we'll credit $50 to your next purchase.
               </p>
            </div>

            <Button variant="secondary" className="w-full h-14 rounded-full font-black italic gap-3 shadow-2xl">
               <Share2 className="h-5 w-5" />
               SHARE INVITE CODE
            </Button>
          </div>
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="mt-20 flex flex-col items-center gap-6"
      >
        <p className="text-muted-foreground font-medium text-sm">
          A confirmation of your order has been dispatched to your email.
        </p>
        <Link href="/" className="group flex items-center gap-3 text-lg font-black italic tracking-tight hover:text-primary transition-all">
          CONTINUE BROWSING 
          <ArrowRight className="h-5 w-5 group-hover:translate-x-2 transition-transform" />
        </Link>
      </motion.div>
    </div>
  );
}
