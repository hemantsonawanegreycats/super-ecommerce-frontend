"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingCart, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PricingBlock } from "./PricingBlock";
import { AddToCartButton } from "./AddToCartButton";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  id: string;
  title: string;
  slug: string;
  imageUrl: string;
  price: number;
  compareAtPrice?: number;
  discountPercentage?: number;
  rating?: number;
  reviewsCount?: number;
  vendorName?: string;
  role?: "CUSTOMER" | "VENDOR" | "ADMIN" | "SUPER_ADMIN" | "GUEST";
}

export function ProductCard({
  id,
  title,
  slug,
  imageUrl,
  price,
  compareAtPrice,
  discountPercentage,
  rating = 4.5,
  reviewsCount = 12,
  vendorName,
  role = "GUEST"
}: ProductCardProps) {
  return (
    <div className="group relative flex flex-col gap-4 rounded-2xl border bg-card text-card-foreground p-4 transition-all duration-300 hover:border-primary/30 shadow-sm hover:shadow-xl hover:-translate-y-1">
      {/* Action Overlays */}
      <div className="absolute right-6 top-6 z-10 flex flex-col gap-2 opacity-0 transition-all duration-300 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0">
        <Button 
          variant="secondary" 
          size="icon" 
          className="h-10 w-10 rounded-full bg-white/90 backdrop-blur-md shadow-md hover:bg-primary hover:text-white transition-all duration-300"
        >
          <Heart className="h-5 w-5" />
          <span className="sr-only">Add to wishlist</span>
        </Button>
      </div>

      {/* Image Container */}
      <Link 
        href={`/products/${slug}`} 
        className="relative aspect-[10/11] overflow-hidden rounded-xl bg-muted flex items-center justify-center"
      >
        {imageUrl ? (
          <img 
            src={imageUrl} 
            alt={title} 
            className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110" 
          />
        ) : (
          <span className="text-muted-foreground text-sm">No Image</span>
        )}
        
        {/* Quick Add Overlay */}
        <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full transition-transform duration-300 group-hover:translate-y-0">
           <Button className="w-full h-11 rounded-full shadow-lg" size="sm">
              <ShoppingCart className="mr-2 h-4 w-4" />
              Add to Cart
           </Button>
        </div>
      </Link>

      {/* Content */}
      <div className="flex flex-1 flex-col justify-between gap-3 px-1">
        <div className="space-y-2">
          {vendorName && (
            <p className="text-xs font-bold text-primary/70 uppercase tracking-widest leading-none">
              {vendorName}
            </p>
          )}
          <Link href={`/products/${slug}`}>
            <h3 className="font-bold text-base leading-snug line-clamp-2 hover:text-primary transition-colors">
              {title}
            </h3>
          </Link>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <span key={i} className={cn(
                  "text-[10px]",
                  i < Math.floor(rating) ? "text-amber-500" : "text-muted-foreground/30"
                )}>★</span>
              ))}
            </div>
            <span className="font-medium text-foreground/70">{rating} ({reviewsCount})</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-3 mt-auto border-t border-border/40">
          <PricingBlock 
            price={price} 
            compareAtPrice={compareAtPrice} 
            discountPercentage={discountPercentage} 
            role={role}
            size="sm"
          />
          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full hover:bg-primary/5 hover:text-primary" render={<Link href={`/products/${slug}`} />}>
            <Eye className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
