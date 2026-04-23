"use client";

import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ColorOption {
  value: string;
  label: string;
  hex: string;
}

const DEFAULT_COLORS: ColorOption[] = [
  { value: "black", label: "Black", hex: "#111827" },
  { value: "white", label: "White", hex: "#ffffff" },
  { value: "gray", label: "Gray", hex: "#9ca3af" },
  { value: "beige", label: "Beige", hex: "#e8d9c2" },
  { value: "navy", label: "Navy", hex: "#1e3a8a" },
  { value: "emerald", label: "Emerald", hex: "#10b981" },
  { value: "rose", label: "Rose", hex: "#f472b6" },
  { value: "amber", label: "Amber", hex: "#f59e0b" },
];

interface ColorSwatchFilterProps {
  options?: ColorOption[];
  selected?: string[];
  onToggle?: (value: string) => void;
}

export function ColorSwatchFilter({
  options = DEFAULT_COLORS,
  selected = [],
  onToggle,
}: ColorSwatchFilterProps) {
  return (
    <div className="space-y-3">
      <h3 className="font-semibold text-sm">Color</h3>
      <div className="flex flex-wrap gap-2">
        {options.map((c) => {
          const isActive = selected.includes(c.value);
          return (
            <button
              key={c.value}
              type="button"
              onClick={() => onToggle?.(c.value)}
              title={c.label}
              className={cn(
                "relative h-8 w-8 rounded-full border-2 transition-all",
                isActive
                  ? "border-primary scale-110 shadow-sm"
                  : "border-border hover:scale-105"
              )}
              style={{ backgroundColor: c.hex }}
            >
              {isActive && (
                <Check
                  className={cn(
                    "absolute inset-0 m-auto h-4 w-4",
                    c.value === "white" ? "text-foreground" : "text-white"
                  )}
                />
              )}
              <span className="sr-only">{c.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
