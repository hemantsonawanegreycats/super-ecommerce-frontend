"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function HeroSection() {
  return (
    <section className="relative h-[85vh] w-full overflow-hidden flex items-center">
      {/* Background with overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 scale-105"
        style={{ 
          backgroundImage: "url('https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070&auto=format&fit=crop')",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-background via-background/60 to-transparent" />

      <div className="container relative z-10 mx-auto px-6 lg:px-8">
        <div className="max-w-2xl text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold tracking-wider uppercase mb-6">
              New Collection 2026
            </span>
            <h1 className="text-5xl lg:text-7xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/70 leading-[1.1]">
              Elegance in Every Detail.
            </h1>
            <p className="text-lg lg:text-xl text-muted-foreground mb-10 leading-relaxed max-w-lg">
              Discover our curated selection of premium essentials designed for those who value quality and timeless style.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="h-14 px-8 text-base font-semibold group rounded-full" render={<Link href="/search" />}>
                Shop Collection
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button size="lg" variant="outline" className="h-14 px-8 text-base font-semibold backdrop-blur-sm bg-background/30 rounded-full" render={<Link href="/collections" />}>
                View Lookbook
              </Button>
            </div>
          </motion.div>

          {/* Stats/Badge */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="mt-16 flex items-center gap-8 pt-8 border-t border-foreground/10"
          >
            <div>
              <p className="text-2xl font-bold">12k+</p>
              <p className="text-xs text-muted-foreground uppercase tracking-wider">Happy Customers</p>
            </div>
            <div className="h-8 w-px bg-foreground/10" />
            <div>
              <p className="text-2xl font-bold">24/7</p>
              <p className="text-xs text-muted-foreground uppercase tracking-wider">Premium Support</p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Decorative element */}
      <div className="absolute bottom-10 right-10 hidden lg:block">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="relative w-32 h-32 flex items-center justify-center"
        >
          <svg className="w-full h-full" viewBox="0 0 100 100">
            <path
              id="circlePath"
              d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
              fill="transparent"
            />
            <text className="text-[10px] uppercase font-bold tracking-[2px] fill-muted-foreground">
              <textPath href="#circlePath">
                • Quality Guaranteed • Sustainable Fashion • Luxury Essentials
              </textPath>
            </text>
          </svg>
        </motion.div>
      </div>
    </section>
  );
}
