"use client";

import Link from "next/link";
import { Search, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CommandPalette } from "../shared/CommandPalette";
import { useCartStore } from "@/features/cart/store/cart.store";
import { useCartAnimation } from "@/features/cart/components/CartAnimationProvider";

export function Navbar() {
  const { setOpen, totalItems } = useCartStore();
  const { cartIconRef } = useCartAnimation();
  
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 flex h-16 items-center justify-between">
        <div className="flex gap-6 md:gap-10">
          <Link href="/" className="flex items-center space-x-2">
            <span className="font-bold text-xl inline-block tracking-tight">Super-E</span>
          </Link>
          <nav className="hidden md:flex gap-6">
            <Link href="/products" className="flex items-center text-sm font-medium text-muted-foreground hover:text-foreground">
              Products
            </Link>
            <Link href="/collections" className="flex items-center text-sm font-medium text-muted-foreground hover:text-foreground">
              Collections
            </Link>
          </nav>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="hidden lg:block">
            <CommandPalette />
          </div>
          <div 
            ref={cartIconRef as any}
            className="flex items-center"
          >
            <Button 
              variant="ghost" 
              size="icon" 
              className="relative group"
              onClick={() => setOpen(true)}
            >
              <ShoppingBag className="h-5 w-5 text-muted-foreground group-hover:text-foreground transition-colors" />
              {totalItems() > 0 && (
                <span className="absolute top-1 right-1 h-4 w-4 rounded-full bg-primary text-[10px] font-bold text-primary-foreground flex items-center justify-center animate-in zoom-in duration-300">
                  {totalItems()}
                </span>
              )}
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
