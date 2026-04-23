"use client";

import { ShoppingBag, ArrowRight } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useCartStore } from "../store/cart.store";
import { CartItem } from "./CartItem";
import { CartSummary } from "./CartSummary";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from "framer-motion";

export function CartDrawer() {
  const { items, isOpen, setOpen, totalItems } = useCartStore();

  return (
    <Sheet open={isOpen} onOpenChange={setOpen}>
      <SheetContent className="flex flex-col w-full sm:max-w-md p-0 rounded-l-[2rem] border-l-0 overflow-hidden shadow-2xl">
        <SheetHeader className="px-8 py-6 border-b border-border/40 bg-muted/10 backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <SheetTitle className="flex items-center gap-3 font-black italic text-xl tracking-tight">
              <div className="relative">
                <ShoppingBag className="h-6 w-6" />
                {totalItems() > 0 && (
                  <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-[10px] font-bold text-primary-foreground flex items-center justify-center animate-in zoom-in duration-300">
                    {totalItems()}
                  </span>
                )}
              </div>
              YOUR BASKET
            </SheetTitle>
          </div>
        </SheetHeader>

        <div className="flex-1 overflow-hidden">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center space-y-6 px-8 text-center">
              <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="rounded-full bg-muted/50 p-8 border border-dashed border-border/60"
              >
                <ShoppingBag className="h-12 w-12 text-muted-foreground/30" />
              </motion.div>
              <div className="space-y-2">
                <p className="text-xl font-bold">Your basket is empty</p>
                <p className="text-sm text-muted-foreground max-w-[200px]">
                  Looks like you haven't added any luxury goods yet.
                </p>
              </div>
              <Button 
                variant="outline" 
                className="rounded-full h-12 px-8 font-bold"
                onClick={() => setOpen(false)}
              >
                Start Shopping
              </Button>
            </div>
          ) : (
            <ScrollArea className="h-full px-8">
              <div className="flex flex-col py-2">
                <AnimatePresence mode="popLayout">
                  {items.map((item) => (
                    <CartItem key={`${item.id}-${item.variantId}`} item={item} />
                  ))}
                </AnimatePresence>
              </div>
            </ScrollArea>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-border/40 px-8 py-8 bg-muted/5">
            <CartSummary />
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
