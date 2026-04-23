"use client";

import { cn } from "@/lib/utils";

const DEFAULT_SIZES = ["XS", "S", "M", "L", "XL", "XXL"];

interface SizeFilterGroupProps {
  sizes?: string[];
  selected?: string[];
  onToggle?: (size: string) => void;
}

export function SizeFilterGroup({
  sizes = DEFAULT_SIZES,
  selected = [],
  onToggle,
}: SizeFilterGroupProps) {
  return (
    <div className="space-y-3">
      <h3 className="font-semibold text-sm">Size</h3>
      <div className="grid grid-cols-4 gap-2">
        {sizes.map((size) => {
          const isActive = selected.includes(size);
          return (
            <button
              key={size}
              type="button"
              onClick={() => onToggle?.(size)}
              className={cn(
                "h-9 rounded-md border text-xs font-semibold transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground border-primary"
                  : "border-input hover:border-foreground hover:bg-muted/50"
              )}
            >
              {size}
            </button>
          );
        })}
      </div>
    </div>
  );
}
