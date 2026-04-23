"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { CheckoutStepper } from "@/features/checkout/components/CheckoutStepper";
import { OrderSummary } from "@/features/checkout/components/OrderSummary";
import { CreditCard, Lock, ShieldCheck, ArrowLeft, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export default function PaymentPage() {
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayment = async () => {
    setIsProcessing(true);
    // Simulate luxury weight
    await new Promise((resolve) => setTimeout(resolve, 1500));
    router.push("/checkout/review");
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col max-w-6xl mx-auto"
    >
      <CheckoutStepper />
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Payment Container */}
        <div className="lg:col-span-7 space-y-10">
          <div className="space-y-2">
            <h2 className="text-4xl font-black italic tracking-tight">SECURE PAYMENT</h2>
            <p className="text-muted-foreground font-medium">Your transaction is protected by bank-grade encryption.</p>
          </div>

          {/* Secure Badge */}
          <div className="bg-emerald-500/5 border border-emerald-500/10 rounded-[1.5rem] p-6 flex items-center gap-4">
             <div className="h-10 w-10 rounded-full bg-emerald-500/10 flex items-center justify-center">
                <ShieldCheck className="h-5 w-5 text-emerald-600" />
             </div>
             <div>
                <p className="text-xs font-black uppercase tracking-[0.2em] text-emerald-700">
                  256-BIT SSL ENCRYPTED
                </p>
                <p className="text-[10px] text-emerald-600/70 font-bold uppercase tracking-widest mt-0.5">
                  PCI-DSS COMPLIANT PAYMENT GATEWAY
                </p>
             </div>
          </div>

          {/* Mock Stripe Element Area */}
          <div className="space-y-6">
            <div className="rounded-[2.5rem] border bg-background p-10 space-y-8 shadow-2xl shadow-primary/5">
              <div className="flex items-center justify-between border-b border-dashed pb-6">
                 <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-muted flex items-center justify-center">
                       <CreditCard className="h-5 w-5" />
                    </div>
                    <span className="font-black italic text-lg uppercase tracking-tight">Credit or Debit Card</span>
                 </div>
                 <div className="flex gap-2 opacity-50 grayscale hover:grayscale-0 transition-all cursor-default">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" className="h-5" alt="Visa" />
                    <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" className="h-5" alt="Mastercard" />
                 </div>
              </div>

              {/* Mock Inputs */}
              <div className="space-y-6">
                 <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Card Number</label>
                    <div className="flex h-14 w-full rounded-2xl border-none bg-muted/30 px-6 py-4 text-base font-bold shadow-inner opacity-60 cursor-not-allowed items-center">
                       •••• •••• •••• 4242
                    </div>
                 </div>
                 <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                       <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Expiry Date</label>
                       <div className="flex h-14 w-full rounded-2xl border-none bg-muted/30 px-6 py-4 text-base font-bold shadow-inner opacity-60 cursor-not-allowed items-center">
                           MM / YY
                       </div>
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">CVC</label>
                       <div className="flex h-14 w-full rounded-2xl border-none bg-muted/30 px-6 py-4 text-base font-bold shadow-inner opacity-60 cursor-not-allowed items-center">
                           •••
                       </div>
                    </div>
                 </div>
              </div>
              
              <div className="flex items-center gap-2 p-4 rounded-xl bg-primary/5 text-primary text-[10px] font-bold uppercase tracking-widest">
                 <Lock className="h-3 w-3" />
                 Your payment information is never stored on our servers.
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-6">
            <Button 
                variant="ghost" 
                className="flex-1 h-16 rounded-full font-black italic tracking-widest text-muted-foreground hover:text-foreground" 
                onClick={() => router.back()}
                disabled={isProcessing}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              GO BACK
            </Button>
            <Button 
              className="flex-1 h-16 rounded-full text-lg font-black italic group shadow-2xl shadow-primary/20" 
              onClick={handlePayment}
              disabled={isProcessing}
            >
              {isProcessing ? (
                <span className="flex items-center gap-3">
                   <span className="h-5 w-5 rounded-full border-2 border-primary-foreground border-r-transparent animate-spin" />
                   SECURING FUNDS...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  REVIEW FINAL ORDER
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </span>
              )}
            </Button>
          </div>
        </div>

        {/* Sidebar Summary */}
        <div className="lg:col-span-5">
          <OrderSummary />
        </div>
      </div>
    </motion.div>
  );
}
