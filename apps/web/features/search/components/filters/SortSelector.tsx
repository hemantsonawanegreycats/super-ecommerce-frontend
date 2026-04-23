"use client";

import { ArrowUpDown } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const SORT_OPTIONS = [
  { value: "recommended", label: "Recommended" },
  { value: "newest", label: "Newest first" },
  { value: "price-asc", label: "Price: Low to high" },
  { value: "price-desc", label: "Price: High to low" },
  { value: "rating", label: "Top rated" },
  { value: "popular", label: "Best sellers" },
];

interface SortSelectorProps {
  value?: string;
  onChange?: (value: string) => void;
}

export function SortSelector({ value = "recommended", onChange }: SortSelectorProps) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-muted-foreground hidden sm:inline-block">Sort</span>
      <Select value={value} onValueChange={(v: any) => onChange?.(v as string)}>
        <SelectTrigger className="w-[180px] gap-2">
          <ArrowUpDown className="h-3.5 w-3.5 text-muted-foreground" />
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          {SORT_OPTIONS.map((opt) => (
            <SelectItem key={opt.value} value={opt.value}>
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
