"use client";

import { useState } from "react";
import { MOCK_HELP_ARTICLES } from "@/features/cms/mock-data";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Search, ThumbsUp, ThumbsDown, BookOpen, ChevronRight } from "lucide-react";

const CATEGORIES = ["All", "Orders", "Returns", "Shipping", "Account"];

export default function HelpCenterPage() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = MOCK_HELP_ARTICLES.filter(a =>
    (activeCategory === "All" || a.category === activeCategory) &&
    a.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-zinc-950 text-white py-24 px-8 text-center space-y-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500 mb-4">SUPPORT CENTER</p>
          <h1 className="text-5xl lg:text-7xl font-black italic tracking-tighter uppercase leading-none mb-6">How can we help?</h1>
          <div className="relative max-w-xl mx-auto">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-500" />
            <input
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search articles..."
              className="w-full h-16 rounded-full bg-white/10 border border-white/20 pl-16 pr-6 text-white placeholder:text-zinc-500 font-medium text-sm outline-none focus:border-white/40 transition-colors"
            />
          </div>
        </motion.div>
      </div>

      <div className="container mx-auto max-w-4xl px-6 py-16 space-y-12">
        {/* Category Filter */}
        <div className="flex flex-wrap gap-3 justify-center">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                "h-10 px-6 rounded-full text-[10px] font-black uppercase tracking-widest border-2 transition-all",
                activeCategory === cat
                  ? "bg-primary text-primary-foreground border-primary"
                  : "border-dashed text-muted-foreground hover:border-primary/50 hover:text-primary"
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Articles */}
        <div className="space-y-4">
          {filtered.map((article, i) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="group p-8 bg-background rounded-[2.5rem] border hover:shadow-2xl hover:shadow-primary/5 transition-all cursor-pointer flex items-center gap-6"
            >
              <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shrink-0 group-hover:scale-110 transition-transform">
                <BookOpen className="h-5 w-5" />
              </div>
              <div className="flex-1 space-y-1">
                <h3 className="text-sm font-black italic uppercase tracking-tight group-hover:text-primary transition-colors">{article.title}</h3>
                <div className="flex items-center gap-4 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                  <span>{article.category}</span>
                  <span className="flex items-center gap-1"><ThumbsUp className="h-3 w-3 text-emerald-500" />{article.helpful}</span>
                  <span className="flex items-center gap-1"><ThumbsDown className="h-3 w-3 text-red-400" />{article.notHelpful}</span>
                </div>
              </div>
              <ChevronRight className="h-5 w-5 text-muted-foreground/30 group-hover:text-primary transition-colors shrink-0" />
            </motion.div>
          ))}

          {filtered.length === 0 && (
            <div className="text-center py-16 space-y-4">
              <Search className="h-12 w-12 text-muted-foreground/30 mx-auto" />
              <p className="font-black italic uppercase text-muted-foreground">No articles found for "{query}"</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
