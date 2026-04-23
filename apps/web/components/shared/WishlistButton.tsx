"use client";

import { useState } from "react";
import { Heart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface WishlistButtonProps {
  productId: string;
  className?: string;
  initialIsWishlisted?: boolean;
}

export function WishlistButton({ productId, className, initialIsWishlisted = false }: WishlistButtonProps) {
  const [isWishlisted, setIsWishlisted] = useState(initialIsWishlisted);

  const toggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
    // In a real app, this would call an API/Store
  };

  return (
    <button
      onClick={toggleWishlist}
      className={cn(
        "group relative h-10 w-10 flex items-center justify-center rounded-full bg-white/80 backdrop-blur-sm border shadow-sm transition-all hover:scale-110 active:scale-95",
        className
      )}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={isWishlisted ? "active" : "inactive"}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ duration: 0.2, type: "spring", stiffness: 400, damping: 17 }}
        >
          <Heart
            className={cn(
              "h-5 w-5 transition-colors duration-300",
              isWishlisted ? "fill-red-500 text-red-500" : "text-muted-foreground group-hover:text-foreground"
            )}
          />
        </motion.div>
      </AnimatePresence>
      
      {isWishlisted && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: [1, 1.5, 2], opacity: [0.5, 0.2, 0] }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 rounded-full bg-red-500 pointer-events-none"
        />
      )}
    </button>
  );
}
