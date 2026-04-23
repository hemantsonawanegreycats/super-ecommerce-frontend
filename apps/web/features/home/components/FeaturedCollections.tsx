"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

const collections = [
  {
    title: "Summer Essentials",
    description: "Lightweight fabrics and vibrant patterns for the warmer days.",
    image: "https://images.unsplash.com/photo-1523381235212-d7b2d7281215?q=80&w=2073&auto=format&fit=crop",
    href: "/search?category=summer",
    className: "md:col-span-2 md:row-span-2 min-h-[400px]",
  },
  {
    title: "Minimalist Workspace",
    description: "Curated desk essentials.",
    image: "https://images.unsplash.com/photo-1491933382434-500287f9b54b?q=80&w=2028&auto=format&fit=crop",
    href: "/search?category=workspace",
    className: "md:col-span-1 md:row-span-1 min-h-[200px]",
  },
  {
    title: "Eco-Friendly Footwear",
    description: "Style that respects nature.",
    image: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?q=80&w=1964&auto=format&fit=crop",
    href: "/search?category=footwear",
    className: "md:col-span-1 md:row-span-2 min-h-[300px]",
  },
  {
    title: "Travel Gear",
    description: "Ready for your next adventure.",
    image: "https://images.unsplash.com/photo-1553531384-cc64ac80f931?q=80&w=2070&auto=format&fit=crop",
    href: "/search?category=travel",
    className: "md:col-span-1 md:row-span-1 min-h-[200px]",
  },
];

export function FeaturedCollections() {
  return (
    <section className="py-12 bg-background">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <h2 className="text-3xl font-bold tracking-tight mb-4">Curated Collections</h2>
            <p className="text-muted-foreground max-w-md">
              Explore our hand-picked selections across multiple categories, designed to fit your unique lifestyle.
            </p>
          </div>
          <Link 
            href="/collections" 
            className="text-sm font-semibold flex items-center gap-1 group hover:text-primary transition-colors"
          >
            View all collections
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-fr">
          {collections.map((collection, index) => (
            <motion.div
              key={collection.title}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={cn(
                "group relative overflow-hidden rounded-3xl bg-muted",
                collection.className
              )}
            >
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                style={{ backgroundImage: `url(${collection.image})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              
              <div className="absolute inset-0 p-8 flex flex-col justify-end">
                <h3 className="text-2xl font-bold text-white mb-2">{collection.title}</h3>
                <p className="text-white/70 text-sm mb-6 max-w-xs transform translate-y-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  {collection.description}
                </p>
                <Link 
                  href={collection.href}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white text-black transition-transform duration-300 group-hover:scale-110"
                >
                  <ArrowUpRight className="h-5 w-5" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
