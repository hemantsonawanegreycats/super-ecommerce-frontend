"use client";

import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";
import { CheckboxFilterGroup } from "./filters/CheckboxFilterGroup";
import { PriceRangeSlider } from "./filters/PriceRangeSlider";
import { RatingFilter } from "./filters/RatingFilter";
import { useSearchFilters } from "../hooks/useSearchFilters";

export function FilterSidebar() {
  const { filters, updateFilters, clearAll } = useSearchFilters();

  const toggleFilter = (key: "categories" | "brands", value: string) => {
    const current = filters[key];
    const next = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];
    updateFilters({ [key]: next });
  };

  const brandOptions = [
    { label: "SleepWell Co.", value: "SleepWell Co.", count: 42 },
    { label: "Makers Studio", value: "Makers Studio", count: 15 },
    { label: "AquaHydrate", value: "AquaHydrate", count: 9 },
    { label: "OfficePro", value: "OfficePro", count: 28 },
  ];

  const categoryOptions = [
    { label: "Home & Bedding", value: "Home & Bedding", count: 120 },
    { label: "Office Furniture", value: "Office Furniture", count: 45 },
    { label: "Fitness & Hydration", value: "Fitness & Hydration", count: 32 },
    { label: "Kitchenware", value: "Kitchenware", count: 56 },
  ];

  const hasFilters = filters.categories.length > 0 || 
                     filters.brands.length > 0 || 
                     filters.rating !== null || 
                     filters.priceRange[0] !== 0 || 
                     filters.priceRange[1] !== 1000;

  return (
    <div className="w-full space-y-6 pb-20">
      <div className="flex items-center justify-between">
        <h2 className="font-bold text-lg">Filters</h2>
        {hasFilters && (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={clearAll}
            className="h-8 px-2 text-xs text-muted-foreground hover:text-primary gap-1"
          >
            <RotateCcw className="h-3 w-3" />
            Clear All
          </Button>
        )}
      </div>

      <Separator className="opacity-50" />

      <CheckboxFilterGroup 
        title="Categories" 
        options={categoryOptions} 
        selectedValues={filters.categories}
        onToggle={(v) => toggleFilter("categories", v)}
      />
      
      <Separator className="opacity-50" />
      
      <CheckboxFilterGroup 
        title="Brands" 
        options={brandOptions} 
        selectedValues={filters.brands}
        onToggle={(v) => toggleFilter("brands", v)}
      />
      
      <Separator className="opacity-50" />
      
      <PriceRangeSlider 
        value={filters.priceRange}
        onChange={(v: [number, number]) => updateFilters({ priceRange: v })}
      />
      
      <Separator className="opacity-50" />
      
      <RatingFilter 
        value={filters.rating} 
        onChange={(v) => updateFilters({ rating: v })} 
      />
    </div>
  );
}
