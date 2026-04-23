"use client";

import { useState } from "react";
import { MOCK_PAGES } from "@/features/cms/mock-data";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { FileText, Edit3, ExternalLink, CheckCircle2, Clock } from "lucide-react";
import Link from "next/link";

export default function VendorPagesPage() {
  return (
    <div className="space-y-10">
      <div className="space-y-2">
        <h1 className="text-4xl lg:text-6xl font-black italic tracking-tighter uppercase leading-none">Static Pages</h1>
        <p className="text-muted-foreground font-medium uppercase text-[10px] tracking-[0.2em]">CMS-driven pages for your storefront</p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {MOCK_PAGES.map((page, i) => (
          <motion.div
            key={page.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="group bg-background p-8 rounded-[2.5rem] border hover:shadow-2xl hover:shadow-primary/5 transition-all flex items-center gap-8"
          >
            <div className="h-16 w-16 rounded-3xl bg-primary/10 flex items-center justify-center text-primary shrink-0 group-hover:scale-110 transition-transform">
              <FileText className="h-8 w-8" />
            </div>

            <div className="flex-1 space-y-2">
              <div className="flex items-center gap-3">
                <h2 className="text-2xl font-black italic uppercase tracking-tight">{page.title}</h2>
                <Badge variant="outline" className={cn(
                  "font-black italic text-[8px] uppercase tracking-widest px-3 border-2",
                  page.status === "published"
                    ? "text-emerald-600 border-emerald-500/20 bg-emerald-500/5"
                    : "text-zinc-500 border-zinc-300"
                )}>
                  {page.status === "published"
                    ? <><CheckCircle2 className="h-2.5 w-2.5 mr-1 inline" />Published</>
                    : <><Clock className="h-2.5 w-2.5 mr-1 inline" />Draft</>
                  }
                </Badge>
              </div>
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                /{page.slug} · Updated {page.updatedAt.toLocaleDateString()}
              </p>
            </div>

            <div className="flex gap-3 shrink-0">
              <Button variant="ghost" size="icon" className="h-12 w-12 rounded-2xl bg-muted/50 hover:bg-primary/10 hover:text-primary">
                <ExternalLink className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="h-12 w-12 rounded-2xl bg-muted/50 hover:bg-primary/10 hover:text-primary">
                <Edit3 className="h-5 w-5" />
              </Button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
