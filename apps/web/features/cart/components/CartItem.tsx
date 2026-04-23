"use client";

import { Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CartItem as CartItemType, useCartStore } from "../store/cart.store";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface CartItemProps {
  item: CartItemType;
}

export function CartItem({ item }: CartItemProps) {
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);

  const format = (v: number) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(v);

  return (
    <motion.div 
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="flex gap-5 py-6 border-b border-border/40 group last:border-0"
    >
      <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-2xl border border-border/60 bg-muted/30 shadow-sm">
        {item.imageUrl ? (
          <img
            src={item.imageUrl}
            alt={item.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-xs text-muted-foreground">
            No Image
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col justify-between py-1">
        <div className="space-y-1">
          <div className="flex justify-between items-start gap-4">
            <h4 className="text-sm font-bold leading-tight line-clamp-2 hover:text-primary transition-colors">
              {item.title}
            </h4>
            <span className="text-sm font-black text-foreground shrink-0">{format(item.price)}</span>
          </div>
          {item.vendorName && (
            <p className="text-[10px] font-black uppercase tracking-widest text-primary/70">{item.vendorName}</p>
          )}
        </div>

        <div className="flex items-center justify-between mt-auto">
          <div className="flex items-center bg-muted/40 rounded-full p-0.5 border border-border/30">
            <Button
              variant="ghost"
              size="icon-xs"
              onClick={() => updateQuantity(item.id, item.quantity - 1, item.variantId)}
              className="h-7 w-7 rounded-full hover:bg-background shadow-none"
              disabled={item.quantity <= 1}
            >
              <Minus className="h-3 w-3" />
            </Button>
            <span className="px-3 text-xs font-bold tabular-nums min-w-[2.5rem] text-center">
              {item.quantity}
            </span>
            <Button
              variant="ghost"
              size="icon-xs"
              onClick={() => updateQuantity(item.id, item.quantity + 1, item.variantId)}
              className="h-7 w-7 rounded-full hover:bg-background shadow-none"
            >
              <Plus className="h-3 w-3" />
            </Button>
          </div>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => removeItem(item.id, item.variantId)}
            className="h-8 w-8 rounded-full text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
