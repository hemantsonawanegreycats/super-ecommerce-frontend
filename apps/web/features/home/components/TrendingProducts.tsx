"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Heart, Eye } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const products = [
  {
    id: "p1",
    name: "Classic Chronograph Watch",
    price: 199.00,
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1999&auto=format&fit=crop",
    tag: "Trending",
  },
  {
    id: "p2",
    name: "Premium Leather Backpack",
    price: 145.00,
    category: "Bags",
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=2069&auto=format&fit=crop",
    tag: "New",
  },
  {
    id: "p3",
    name: "Studio Wireless Headphones",
    price: 299.00,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=2070&auto=format&fit=crop",
    tag: "Best Seller",
  },
  {
    id: "p4",
    name: "Minimalist Desk Lamp",
    price: 79.00,
    category: "Home",
    image: "https://images.unsplash.com/photo-1534073828943-f801091bb18c?q=80&w=1887&auto=format&fit=crop",
  },
];

export function TrendingProducts() {
  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl font-bold tracking-tight mb-2">Trending Now</h2>
            <p className="text-muted-foreground">Most-loved products by our community.</p>
          </div>
          <Button variant="ghost" render={<Link href="/search" />}>View all</Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-white mb-4">
                {product.tag && (
                  <span className="absolute top-4 left-4 z-10 px-2 py-1 bg-white/90 backdrop-blur-md text-[10px] font-bold uppercase tracking-wider rounded">
                    {product.tag}
                  </span>
                )}
                
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />

                {/* Quick Actions Overlay */}
                <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full transition-transform duration-300 group-hover:translate-y-0 flex gap-2">
                  <Button className="flex-1 h-11 rounded-xl" size="sm">
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    Quick Add
                  </Button>
                  <Button variant="secondary" size="icon" className="h-11 w-11 shrink-0 bg-white/90 backdrop-blur-md rounded-xl">
                    <Heart className="h-4 w-4" />
                  </Button>
                  <Button variant="secondary" size="icon" className="h-11 w-11 shrink-0 bg-white/90 backdrop-blur-md rounded-xl" render={<Link href={`/products/${product.id}`} />}>
                    <Eye className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="space-y-1">
                <p className="text-xs text-muted-foreground uppercase tracking-widest">{product.category}</p>
                <h3 className="font-semibold text-lg leading-tight group-hover:text-primary transition-colors">
                  <Link href={`/products/${product.id}`}>{product.name}</Link>
                </h3>
                <p className="font-bold text-lg">${product.price.toFixed(2)}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
