"use client";

import Link from "next/link";
import { useCartStore } from "../store/cart.store";
import { Button } from "@/components/ui/button";
import { Truck, ArrowRight, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function CartSummary() {
  const subtotal = useCartStore((state) => state.subtotal());
  const setOpen = useCartStore((state) => state.setOpen);
  
  const FREE_SHIPPING_THRESHOLD = 150;
  const shippingProgress = Math.min((subtotal / FREE_SHIPPING_THRESHOLD) * 100, 100);
  const remainingForFreeShipping = Math.max(FREE_SHIPPING_THRESHOLD - subtotal, 0);

  const format = (v: number) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(v);

  return (
    <div className="space-y-6">
      {/* Free Shipping Progress */}
      <div className="bg-primary/5 rounded-2xl p-4 border border-primary/10">
        <div className="flex items-center gap-3 mb-3">
          <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
            <Truck className="h-4 w-4 text-primary" />
          </div>
          <p className="text-xs font-bold">
            {remainingForFreeShipping > 0 
              ? `Add ${format(remainingForFreeShipping)} more for FREE shipping`
              : "Congrats! You've unlocked FREE shipping"}
          </p>
        </div>
        <div className="h-1.5 w-full bg-primary/10 rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${shippingProgress}%` }}
            className="h-full bg-primary"
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
        </div>
      </div>

      {/* Totals */}
      <div className="space-y-3 px-1">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground font-medium">Subtotal</span>
          <span className="font-bold">{format(subtotal)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground font-medium">Shipping</span>
          <span className="text-emerald-600 font-bold">
            {subtotal >= FREE_SHIPPING_THRESHOLD ? "FREE" : "Calculated at checkout"}
          </span>
        </div>
        <div className="pt-4 border-t border-border/40">
          <div className="flex justify-between items-end">
             <div className="flex flex-col">
                <span className="text-xs font-black uppercase tracking-widest text-muted-foreground">Total Amount</span>
                <span className="text-2xl font-black italic">{format(subtotal)}</span>
             </div>
             <div className="flex items-center gap-1.5 text-[10px] font-bold text-muted-foreground/60 mb-1">
                <ShieldCheck className="h-3 w-3" />
                SECURE CHECKOUT
             </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col gap-3">
        <Button 
          size="lg" 
          className="w-full h-14 rounded-full text-base font-black italic group shadow-xl shadow-primary/10"
          render={<Link href="/checkout/address" onClick={() => setOpen(false)} />}
        >
          Proceed to Checkout
          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Button>
        <Button 
          variant="ghost" 
          size="sm" 
          className="w-full h-10 rounded-full text-xs font-bold text-muted-foreground hover:text-foreground"
          render={<Link href="/cart" onClick={() => setOpen(false)} />}
        >
          Review Full Cart
        </Button>
      </div>
    </div>
  );
}
