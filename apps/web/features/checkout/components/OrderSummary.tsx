"use client";

import { useCartStore } from "@/features/cart/store/cart.store";
import { Separator } from "@/components/ui/separator";
import { ShieldCheck, Info } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function OrderSummary() {
  const { items, subtotal } = useCartStore();
  const subtotalAmount = subtotal();

  const format = (v: number) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(v);

  return (
    <div className="rounded-[2rem] border bg-background p-8 shadow-2xl shadow-primary/5 sticky top-24">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-xl font-black italic tracking-tight">ORDER SUMMARY</h2>
        <span className="text-xs font-bold bg-primary/5 px-3 py-1 rounded-full text-primary">
          {items.reduce((acc, i) => acc + i.quantity, 0)} ITEMS
        </span>
      </div>
      
      <div className="space-y-6 max-h-[40vh] overflow-y-auto mb-8 pr-2 scrollbar-thin scrollbar-thumb-border">
        <AnimatePresence mode="popLayout">
          {items.map((item) => (
            <motion.div 
              layout
              key={`${item.id}-${item.variantId}`} 
              className="flex gap-4"
            >
              <div className="h-16 w-16 rounded-2xl border bg-muted/30 flex-shrink-0 overflow-hidden">
                {item.imageUrl ? (
                  <img src={item.imageUrl} alt={item.title} className="h-full w-full object-cover" />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-[10px] text-muted-foreground whitespace-nowrap">No Img</div>
                )}
              </div>
              <div className="flex-1 min-w-0 flex flex-col justify-center">
                <h4 className="text-sm font-bold line-clamp-1">{item.title}</h4>
                <div className="flex items-center justify-between mt-1">
                   <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">Qty: {item.quantity}</p>
                   <span className="text-sm font-black">{format(item.price * item.quantity)}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="space-y-4 pt-6 border-t border-dashed">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground font-bold uppercase tracking-wider text-[10px]">Subtotal</span>
          <span className="font-bold">{format(subtotalAmount)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground font-bold uppercase tracking-wider text-[10px]">Shipping</span>
          <span className="text-primary font-black italic text-[11px] bg-primary/5 px-2 py-0.5 rounded">NEXT STEP</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground font-bold uppercase tracking-wider text-[10px]">Estimated Tax</span>
          <span className="font-bold">$0.00</span>
        </div>
        
        <Separator className="my-6" />
        
        <div className="flex justify-between items-end">
           <div className="flex flex-col">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground mb-1">Total to Pay</span>
              <span className="text-3xl font-black italic tracking-tighter leading-none">{format(subtotalAmount)}</span>
           </div>
           <div className="flex items-center gap-1.5 text-[10px] font-bold text-emerald-600 bg-emerald-500/5 px-3 py-1.5 rounded-full border border-emerald-500/10 mb-1">
              <ShieldCheck className="h-3.5 w-3.5" />
              SECURE
           </div>
        </div>
      </div>
      
      <div className="mt-8 p-4 rounded-2xl bg-muted/30 border border-border/40 flex items-start gap-3">
         <Info className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
         <p className="text-[10px] text-muted-foreground font-medium leading-relaxed">
           Taxes and final shipping costs will be calculated based on your destination and chosen delivery method in the next steps.
         </p>
      </div>
    </div>
  );
}
