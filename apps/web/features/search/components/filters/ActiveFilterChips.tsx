"use client";

import { X } from "lucide-react";
import { useSearchFilters } from "../../hooks/useSearchFilters";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";

export function ActiveFilterChips() {
  const { filters, updateFilters } = useSearchFilters();

  const activeFilters = [
    ...filters.categories.map(c => ({ label: c, key: 'categories', value: c })),
    ...filters.brands.map(b => ({ label: b, key: 'brands', value: b })),
    ...(filters.rating ? [{ label: `${filters.rating} Stars & Up`, key: 'rating', value: null }] : []),
    ...(filters.priceRange[0] !== 0 || filters.priceRange[1] !== 1000 
        ? [{ label: `$${filters.priceRange[0]} - $${filters.priceRange[1]}`, key: 'priceRange', value: [0, 1000] }] 
        : [])
  ];

  if (activeFilters.length === 0) return null;

  const removeFilter = (key: string, value: any) => {
    if (key === 'categories' || key === 'brands') {
      const next = (filters[key as 'categories' | 'brands'] as string[]).filter(v => v !== value);
      updateFilters({ [key]: next });
    } else {
      updateFilters({ [key]: value });
    }
  };

  return (
    <div className="flex flex-wrap gap-2 mb-6">
      <AnimatePresence mode="popLayout">
        {activeFilters.map((filter) => (
          <motion.div
            key={`${filter.key}-${filter.label}`}
            layout
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
          >
            <Badge 
              variant="secondary" 
              className="h-7 pl-3 pr-1 gap-1 bg-primary/5 hover:bg-primary/10 border-primary/10 text-primary-foreground/80 hover:text-primary transition-colors rounded-full font-medium"
            >
              <span className="text-foreground/70">{filter.label}</span>
              <button 
                onClick={() => removeFilter(filter.key, filter.value)}
                className="ml-1 rounded-full p-0.5 hover:bg-primary/20 transition-colors"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
