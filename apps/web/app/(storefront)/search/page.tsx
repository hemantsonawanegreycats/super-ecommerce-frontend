"use client";

import { FilterSidebar } from "@/features/search/components/FilterSidebar";
import { ProductCard } from "@/features/catalog/components/ProductCard";
import { Button } from "@/components/ui/button";
import { SlidersHorizontal, ChevronDown, SearchIcon } from "lucide-react";
import { ActiveFilterChips } from "@/features/search/components/filters/ActiveFilterChips";
import { SortSelector } from "@/features/search/components/filters/SortSelector";
import { useSearchFilters } from "@/features/search/hooks/useSearchFilters";
import { motion, AnimatePresence } from "framer-motion";

// Mock data for search results
const mockProducts = [
  {
    id: "1",
    title: "Premium Weighted Blanket, 15lbs",
    slug: "premium-weighted-blanket",
    imageUrl: "https://images.unsplash.com/photo-1583845258933-289c09d57a9e?q=80&w=600",
    price: 129.99,
    vendorName: "SleepWell Co.",
    category: "Home & Bedding"
  },
  {
    id: "2",
    title: "Ultra-Soft Fleece Throw Blanket",
    slug: "fleece-throw",
    imageUrl: "https://images.unsplash.com/photo-1543335359-994c9ad6ef39?q=80&w=600",
    price: 45.00,
    compareAtPrice: 60.00,
    discountPercentage: 25,
    vendorName: "CozyHome",
    category: "Home & Bedding"
  },
  {
    id: "3",
    title: "Chunky Knit Weighted Blanket",
    slug: "chunky-knit-blanket",
    imageUrl: "https://images.unsplash.com/photo-1580828369065-27a3c75127ee?q=80&w=600",
    price: 199.99,
    vendorName: "Makers Studio",
    category: "Home & Bedding"
  },
  {
    id: "4",
    title: "Cooling Bamboo Blanket for Summer",
    slug: "cooling-bamboo-blanket",
    imageUrl: "https://images.unsplash.com/photo-1629853900989-1cdb71454c7d?q=80&w=600",
    price: 85.00,
    vendorName: "SleepWell Co.",
    category: "Home & Bedding"
  },
  {
    id: "5",
    title: "Minimalist Linen Bed Throw",
    slug: "linen-bed-throw",
    imageUrl: "https://images.unsplash.com/photo-1514734631336-db155a5b51c1?q=80&w=600",
    price: 110.00,
    vendorName: "Linen & Thread",
    category: "Home & Bedding"
  },
];

export default function SearchPage() {
  const { filters, updateFilters } = useSearchFilters();

  return (
    <div className="container mx-auto px-6 lg:px-8 py-12 min-h-screen">
      {/* Header Section */}
      <div className="flex flex-col gap-6 mb-12">
        <div className="flex flex-col gap-2">
          <h1 className="text-4xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/70">
            Search Results
          </h1>
          <p className="text-muted-foreground text-lg">
            {filters.query ? (
              <>Showing results for <span className="font-semibold text-foreground italic">"{filters.query}"</span></>
            ) : (
              "Explore our entire collection of premium goods."
            )}
          </p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-12 items-start">
        {/* Desktop Sidebar (Sticky) */}
        <aside className="hidden lg:block w-72 shrink-0 sticky top-28 h-[calc(100vh-10rem)] overflow-y-auto scrollbar-hide pr-2">
          <FilterSidebar />
        </aside>

        {/* Main Content Area */}
        <div className="flex-1 min-w-0">
          
          {/* Controls Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-4 w-full sm:w-auto">
              <Button variant="outline" className="lg:hidden gap-2 h-10 px-4 rounded-full">
                <SlidersHorizontal className="h-4 w-4" />
                Filters
              </Button>
              <div className="text-sm font-medium text-muted-foreground px-4 py-2 bg-muted/40 rounded-full">
                {mockProducts.length} Products
              </div>
            </div>
            
            <SortSelector 
              value={filters.sort} 
              onChange={(v) => updateFilters({ sort: v })} 
            />
          </div>

          <ActiveFilterChips />

          {/* Product Grid with Transitions */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8">
            <AnimatePresence mode="popLayout">
              {mockProducts.map((product) => (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                >
                  <ProductCard {...product} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Empty State Mock */}
          {mockProducts.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="h-20 w-20 rounded-full bg-muted flex items-center justify-center mb-6">
                <SearchIcon className="h-10 w-10 text-muted-foreground/40" />
              </div>
              <h2 className="text-2xl font-bold mb-2">No products found</h2>
              <p className="text-muted-foreground max-w-sm">
                Try adjusting your filters or search terms to find what you're looking for.
              </p>
            </div>
          )}

          {/* Pagination */}
          {mockProducts.length > 0 && (
            <div className="flex items-center justify-center pt-20">
              <Button 
                variant="outline" 
                className="rounded-full px-10 h-12 text-base font-semibold hover:bg-primary hover:text-primary-foreground transition-all duration-300"
              >
                Load More Products
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
