"use client";

import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface RatingFilterProps {
  value?: number | null;
  onChange?: (rating: number | null) => void;
}

export function RatingFilter({ value, onChange }: RatingFilterProps) {
  const options = [4, 3, 2, 1];

  return (
    <div className="space-y-3">
      <h3 className="font-semibold text-sm">Customer rating</h3>
      <div className="space-y-1.5">
        {options.map((rating) => {
          const selected = value === rating;
          return (
            <button
              key={rating}
              type="button"
              onClick={() => onChange?.(selected ? null : rating)}
              className={cn(
                "flex w-full items-center justify-between gap-2 rounded-md px-2 py-1.5 text-left transition-colors",
                selected ? "bg-primary/10 text-primary" : "hover:bg-muted/60"
              )}
            >
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={cn(
                      "h-4 w-4",
                      i < rating ? "fill-amber-400 text-amber-400" : "text-muted-foreground/30"
                    )}
                  />
                ))}
                <span className="text-xs text-muted-foreground ml-1">&amp; up</span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
