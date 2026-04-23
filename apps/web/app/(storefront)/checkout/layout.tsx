"use client";

import Link from "next/link";
import { ChevronLeft, Rocket, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-muted/10 pb-20 selection:bg-primary selection:text-primary-foreground">
      {/* Minimal Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <Link
            href="/"
            className="group flex items-center gap-2 text-muted-foreground hover:text-foreground transition-all"
          >
            <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center group-hover:bg-primary/10 group-hover:text-primary transition-colors">
              <ChevronLeft className="h-4 w-4" />
            </div>
            <span className="text-xs font-black uppercase tracking-widest">Back to Shop</span>
          </Link>
          
          <Link href="/" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
              <Rocket className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="font-black italic text-xl tracking-tighter">SUPER-E</span>
          </Link>
          
          <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-emerald-600 bg-emerald-500/5 px-4 py-2 rounded-full border border-emerald-500/10">
             <ShieldCheck className="h-3.5 w-3.5" />
             <span className="hidden sm:inline">100% SECURE CHECKOUT</span>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-12">
        <div className="max-w-7xl mx-auto">
            {children}
        </div>
      </main>

      {/* Trust Footer */}
      <footer className="container mx-auto px-6 py-8 border-t border-border/40 mt-12">
         <div className="flex flex-col md:flex-row justify-between items-center gap-6 opacity-40 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-500">
            <div className="flex gap-8 items-center">
               <span className="text-sm font-black tracking-widest uppercase italic">Stripe Secure</span>
               <span className="text-sm font-black tracking-widest uppercase italic">McAfee Trusted</span>
               <span className="text-sm font-black tracking-widest uppercase italic">Global Delivery</span>
            </div>
            <p className="text-[10px] font-bold text-muted-foreground tracking-widest uppercase">
              POWERED BY SUPER-E COMMERCE ENGINE
            </p>
         </div>
      </footer>
    </div>
  );
}
