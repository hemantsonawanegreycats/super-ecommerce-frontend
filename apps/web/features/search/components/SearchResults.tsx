"use client";

import { Frown } from "lucide-react";
import { ProductCard } from "@/features/catalog/components/ProductCard";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

export interface SearchResultItem {
  id: string;
  title: string;
  slug: string;
  imageUrl: string;
  price: number;
  compareAtPrice?: number;
  discountPercentage?: number;
  vendorName?: string;
  rating?: number;
  reviewsCount?: number;
}

interface SearchResultsProps {
  items: SearchResultItem[];
  isLoading?: boolean;
  onClearFilters?: () => void;
}

export function SearchResults({ items, isLoading, onClearFilters }: SearchResultsProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="space-y-3">
            <Skeleton className="aspect-square w-full rounded-lg" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        ))}
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center text-center py-16 px-6 rounded-2xl border border-dashed bg-muted/20 space-y-4">
        <div className="rounded-full bg-muted p-4">
          <Frown className="h-8 w-8 text-muted-foreground" />
        </div>
        <div className="space-y-1">
          <h3 className="text-lg font-bold">No results match your filters</h3>
          <p className="text-sm text-muted-foreground max-w-sm">
            Try removing a filter or broadening your search to see more products.
          </p>
        </div>
        {onClearFilters ? (
          <Button onClick={onClearFilters} variant="outline">
            Clear all filters
          </Button>
        ) : null}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
      {items.map((item) => (
        <ProductCard key={item.id} {...item} />
      ))}
    </div>
  );
}
