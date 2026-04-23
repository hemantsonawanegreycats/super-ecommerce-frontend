"use client";

import React, { createContext, useContext, useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface CartAnimationContextType {
  animateToCart: (element: HTMLElement) => void;
  cartIconRef: React.RefObject<HTMLDivElement | null>;
}

const CartAnimationContext = createContext<CartAnimationContextType | null>(null);

export function useCartAnimation() {
  const context = useContext(CartAnimationContext);
  if (!context) throw new Error("useCartAnimation must be used within CartAnimationProvider");
  return context;
}

export function CartAnimationProvider({ children }: { children: React.ReactNode }) {
  const [flyingItems, setFlyingItems] = useState<{ id: number; start: DOMRect; end: DOMRect; image?: string }[]>([]);
  const cartIconRef = useRef<HTMLDivElement>(null);
  const counter = useRef(0);

  const animateToCart = useCallback((element: HTMLElement) => {
    if (!cartIconRef.current) return;

    const startRect = element.getBoundingClientRect();
    const endRect = cartIconRef.current.getBoundingClientRect();
    const image = (element as any).src || (element.querySelector("img") as any)?.src;

    const id = counter.current++;
    setFlyingItems((prev) => [...prev, { id, start: startRect, end: endRect, image }]);

    setTimeout(() => {
      setFlyingItems((prev) => prev.filter((item) => item.id !== id));
    }, 800);
  }, []);

  return (
    <CartAnimationContext.Provider value={{ animateToCart, cartIconRef }}>
      {children}
      <AnimatePresence>
        {flyingItems.map((item) => (
          <motion.div
            key={item.id}
            initial={{
              position: "fixed",
              top: item.start.top,
              left: item.start.left,
              width: item.start.width,
              height: item.start.height,
              opacity: 1,
              zIndex: 9999,
              borderRadius: "1rem",
            }}
            animate={{
              top: item.end.top + item.end.height / 2,
              left: item.end.left + item.end.width / 2,
              width: 20,
              height: 20,
              opacity: 0.5,
              scale: 0.2,
            }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="bg-primary pointer-events-none overflow-hidden border-2 border-white shadow-xl"
          >
            {item.image && (
              <img src={item.image} alt="" className="w-full h-full object-cover" />
            )}
          </motion.div>
        ))}
      </AnimatePresence>
    </CartAnimationContext.Provider>
  );
}
