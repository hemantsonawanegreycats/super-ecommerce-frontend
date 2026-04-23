"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { Star, CheckCircle2, MessageSquare, Info, ListChecks } from "lucide-react";

interface PDPTabsProps {
  description: string;
  specifications: { label: string; value: string }[];
  reviews: { id: string; author: string; rating: number; content: string; date: string }[];
}

export function PDPTabs({ description, specifications, reviews }: PDPTabsProps) {
  const [activeTab, setActiveTab] = useState("description");

  const tabs = [
    { id: "description", label: "Description", icon: <Info className="h-4 w-4" /> },
    { id: "specs", label: "Specifications", icon: <ListChecks className="h-4 w-4" /> },
    { id: "reviews", label: `Reviews (${reviews.length})`, icon: <MessageSquare className="h-4 w-4" /> },
  ];

  return (
    <div className="w-full mt-16 border-t pt-16">
      {/* Tab Navigation */}
      <div className="flex flex-wrap gap-4 mb-10 overflow-x-auto pb-2 scrollbar-hide">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "group relative flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold transition-all duration-300 whitespace-nowrap",
              activeTab === tab.id 
                ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20" 
                : "bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
          >
            {tab.icon}
            {tab.label}
            {activeTab === tab.id && (
              <motion.div
                layoutId="active-pdp-tab"
                className="absolute inset-0 rounded-full border border-primary/50"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="min-h-[300px]">
        <AnimatePresence mode="wait">
          {activeTab === "description" && (
            <motion.div
              key="description"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="prose prose-zinc dark:prose-invert max-w-none"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold">The Details</h3>
                  <p className="text-muted-foreground text-lg leading-relaxed">
                    {description}
                  </p>
                  <ul className="space-y-3">
                    {["Premium materials", "Eco-friendly production", "Handcrafted finish"].map((item, i) => (
                      <li key={i} className="flex items-center gap-3 text-sm font-medium">
                        <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-muted/30 rounded-3xl p-8 border">
                   <h4 className="font-bold mb-4">Care Instructions</h4>
                   <ul className="space-y-4 text-sm text-muted-foreground">
                      <li>• Dry clean recommended for best longevity</li>
                      <li>• Hand wash in cold water with mild detergent</li>
                      <li>• Do not bleach or tumble dry</li>
                      <li>• Iron on low heat if necessary</li>
                   </ul>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "specs" && (
            <motion.div
              key="specs"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4"
            >
              {specifications.map((spec, i) => (
                <div key={i} className="flex items-center justify-between py-4 border-b border-border/50">
                  <span className="text-muted-foreground font-medium">{spec.label}</span>
                  <span className="font-bold">{spec.value}</span>
                </div>
              ))}
            </motion.div>
          )}

          {activeTab === "reviews" && (
            <motion.div
              key="reviews"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-8"
            >
              <div className="flex flex-col md:flex-row gap-12">
                {/* Summary */}
                <div className="w-full md:w-64 space-y-4 shrink-0">
                   <div className="text-6xl font-black italic">4.9</div>
                   <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 fill-amber-500 text-amber-500" />
                      ))}
                   </div>
                   <p className="text-sm text-muted-foreground">Based on {reviews.length} verified reviews</p>
                </div>
                
                {/* Reviews List */}
                <div className="flex-1 space-y-8">
                  {reviews.map((review) => (
                    <div key={review.id} className="p-6 rounded-3xl bg-muted/20 border border-border/40 space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary">
                            {review.author[0]}
                          </div>
                          <div>
                            <div className="font-bold">{review.author}</div>
                            <div className="text-xs text-muted-foreground">{review.date}</div>
                          </div>
                        </div>
                        <div className="flex gap-0.5">
                           {[...Array(5)].map((_, i) => (
                             <Star key={i} className={cn("h-4 w-4", i < review.rating ? "fill-amber-500 text-amber-500" : "text-muted-foreground/20")} />
                           ))}
                        </div>
                      </div>
                      <p className="text-muted-foreground leading-relaxed italic">
                        "{review.content}"
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
