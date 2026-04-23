"use client";

import { useState } from "react";
import { ShoppingBag, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/features/cart/store/cart.store";
import { useCartAnimation } from "@/features/cart/components/CartAnimationProvider";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useRef } from "react";

interface AddToCartButtonProps {
  productId: string;
  variantId?: string;
  title: string;
  slug: string;
  price: number;
  imageUrl: string;
  vendorName?: string;
  quantity?: number;
  disabled?: boolean;
  size?: "icon" | "lg" | "full";
  className?: string;
}

export function AddToCartButton({ 
  productId, 
  variantId, 
  title,
  slug,
  price,
  imageUrl,
  vendorName,
  quantity = 1, 
  disabled,
  size = "icon",
  className
}: AddToCartButtonProps) {
  const [status, setStatus] = useState<"idle" | "adding" | "success">("idle");
  const { addItem, setOpen } = useCartStore();
  const { animateToCart } = useCartAnimation();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);

  const handleAdd = async () => {
    if (buttonRef.current) {
      // Trigger the flying animation from the button or its container
      animateToCart(buttonRef.current);
    }
    
    setStatus("adding");
    
    // Simulate luxury weight
    await new Promise(resolve => setTimeout(resolve, 600));
    
    addItem({
      id: productId,
      variantId,
      title,
      slug,
      price,
      imageUrl,
      vendorName,
    }, quantity);

    setStatus("success");
    
    // Brief success state before opening drawer
    await new Promise(resolve => setTimeout(resolve, 500));
    setStatus("idle");
    setOpen(true);
  };

  const isAdding = status === "adding";
  const isSuccess = status === "success";

  if (size === "icon") {
    return (
      <Button 
        ref={buttonRef}
        size="icon" 
        className={cn("h-10 w-10 rounded-full shrink-0 shadow-lg transition-all duration-300", isSuccess ? "bg-emerald-500 hover:bg-emerald-600" : "", className)} 
        disabled={disabled || isAdding}
        onClick={handleAdd}
      >
        <AnimatePresence mode="wait">
          {isAdding ? (
            <motion.span 
              key="adding"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="h-4 w-4 rounded-full border-2 border-primary-foreground border-r-transparent animate-spin" 
            />
          ) : isSuccess ? (
            <motion.div
              key="success"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
            >
              <Check className="h-5 w-5" />
            </motion.div>
          ) : (
            <motion.div
              key="idle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <ShoppingBag className="h-5 w-5" />
            </motion.div>
          )}
        </AnimatePresence>
        <span className="sr-only">Add to cart</span>
      </Button>
    );
  }

  return (
    <Button 
      ref={buttonRef}
      size="lg" 
      className={cn(
        "relative w-full h-14 rounded-full text-base font-black italic tracking-tight overflow-hidden transition-all duration-500 shadow-xl", 
        isSuccess ? "bg-emerald-600 shadow-emerald-500/20" : "shadow-primary/10",
        className
      )}
      disabled={disabled || isAdding}
      onClick={handleAdd}
    >
      <AnimatePresence mode="wait">
        {isAdding ? (
          <motion.span 
            key="adding"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            className="flex items-center gap-3"
          >
            <span className="h-4 w-4 rounded-full border-2 border-primary-foreground border-r-transparent animate-spin" />
            ADDING TO BASKET...
          </motion.span>
        ) : isSuccess ? (
          <motion.span 
            key="success"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            className="flex items-center gap-2"
          >
            <Check className="h-5 w-5" />
            ADDED!
          </motion.span>
        ) : (
          <motion.span 
            key="idle"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            className="flex items-center gap-3"
          >
            <ShoppingBag className="h-5 w-5" />
            ADD TO BASKET
          </motion.span>
        )}
      </AnimatePresence>
    </Button>
  );
}
