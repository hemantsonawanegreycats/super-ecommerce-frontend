"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PDPGalleryProps {
  images: string[];
}

export function PDPGallery({ images }: PDPGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (!images || images.length === 0) {
    return (
      <div className="aspect-square w-full rounded-2xl bg-muted flex items-center justify-center border border-dashed">
        <span className="text-muted-foreground text-sm">No image available</span>
      </div>
    );
  }

  const nextImage = () => setActiveIndex((prev) => (prev + 1) % images.length);
  const prevImage = () => setActiveIndex((prev) => (prev - 1 + images.length) % images.length);

  return (
    <div className="flex flex-col-reverse lg:flex-row gap-6">
      {/* Thumbnails */}
      <div className="flex lg:flex-col gap-3 overflow-x-auto lg:overflow-y-auto w-full lg:w-24 pb-2 lg:pb-0 scrollbar-hide">
        {images.map((img, idx) => (
          <button
            key={idx}
            className={cn(
              "relative aspect-[4/5] w-20 lg:w-full flex-shrink-0 cursor-pointer overflow-hidden rounded-xl border-2 transition-all duration-300",
              activeIndex === idx 
                ? "border-primary shadow-lg scale-105" 
                : "border-transparent opacity-50 hover:opacity-100"
            )}
            onClick={() => setActiveIndex(idx)}
          >
            <img 
              src={img} 
              alt={`Thumbnail ${idx + 1}`} 
              className="object-cover w-full h-full" 
            />
          </button>
        ))}
      </div>

      {/* Main Image Container */}
      <div className="group relative aspect-[4/5] w-full overflow-hidden rounded-3xl border bg-muted flex-1">
        <AnimatePresence mode="wait">
          <motion.img
            key={activeIndex}
            src={images[activeIndex]}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="absolute inset-0 object-cover w-full h-full"
            alt="Product view"
          />
        </AnimatePresence>

        {/* Overlays & Controls */}
        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
        
        {/* Navigation Arrows */}
        <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 flex justify-between opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-0 group-hover:-translate-y-1/2">
          <Button
            variant="secondary"
            size="icon"
            className="h-10 w-10 rounded-full bg-background/80 backdrop-blur-md shadow-lg"
            onClick={prevImage}
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <Button
            variant="secondary"
            size="icon"
            className="h-10 w-10 rounded-full bg-background/80 backdrop-blur-md shadow-lg"
            onClick={nextImage}
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>

        {/* Zoom Trigger */}
        <Button
          variant="secondary"
          size="icon"
          className="absolute bottom-4 right-4 h-10 w-10 rounded-full bg-background/80 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <Maximize2 className="h-4 w-4" />
        </Button>

        {/* Progress Dots (Mobile Only) */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 lg:hidden">
          {images.map((_, i) => (
            <div 
              key={i}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300",
                activeIndex === i ? "w-6 bg-primary" : "w-1.5 bg-white/50"
              )}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
