"use client";

import { useState } from "react";
import { MOCK_POSTS } from "@/features/cms/mock-data";
import type { BlogPost } from "@/features/cms/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  Plus, Search, BookOpen, Calendar, Clock, Edit3,
  Trash2, Eye, FileText, Send, ArrowUpRight
} from "lucide-react";
import Link from "next/link";

function StatusBadge({ status }: { status: BlogPost["status"] }) {
  return (
    <Badge variant="outline" className={cn(
      "font-black italic text-[8px] uppercase tracking-widest px-3 border-2",
      status === "published" ? "text-emerald-600 border-emerald-500/20 bg-emerald-500/5" :
      status === "scheduled" ? "text-amber-600 border-amber-500/20 bg-amber-500/5" :
      "text-zinc-500 border-zinc-300 bg-zinc-50"
    )}>
      {status}
    </Badge>
  );
}

export default function VendorBlogPage() {
  const [filter, setFilter] = useState<"all" | BlogPost["status"]>("all");
  const [search, setSearch] = useState("");

  const filtered = MOCK_POSTS.filter(p =>
    (filter === "all" || p.status === filter) &&
    p.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div className="space-y-2">
           <h1 className="text-4xl lg:text-6xl font-black italic tracking-tighter uppercase leading-none">Blog</h1>
           <p className="text-muted-foreground font-medium uppercase text-[10px] tracking-[0.2em]">Create, publish, and manage your store content</p>
        </div>
        <Link href="/vendor/blog/new">
          <Button className="rounded-full font-black italic uppercase h-14 px-8 shadow-xl gap-2">
            <Plus className="h-5 w-5" /> New Post
          </Button>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-6">
        {[
          { label: "Published", value: MOCK_POSTS.filter(p => p.status === "published").length, icon: Send },
          { label: "Drafts", value: MOCK_POSTS.filter(p => p.status === "draft").length, icon: FileText },
          { label: "Scheduled", value: MOCK_POSTS.filter(p => p.status === "scheduled").length, icon: Calendar },
        ].map((s, i) => (
          <div key={i} className="p-8 rounded-[2.5rem] bg-background border flex items-center gap-5">
            <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
              <s.icon className="h-6 w-6" />
            </div>
            <div>
              <p className="text-3xl font-black italic">{s.value}</p>
              <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col md:flex-row items-center gap-4 p-6 bg-background rounded-[2.5rem] border border-dashed">
        <div className="relative w-full md:w-80">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search posts..." className="pl-12 h-12 rounded-full bg-muted/20 border-none font-medium" />
        </div>
        <div className="flex gap-2 ml-auto">
          {(["all", "published", "draft", "scheduled"] as const).map(s => (
            <button key={s} onClick={() => setFilter(s)} className={cn(
              "h-10 px-5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all",
              filter === s ? "bg-primary text-primary-foreground" : "bg-muted/40 text-muted-foreground hover:bg-muted"
            )}>{s}</button>
          ))}
        </div>
      </div>

      {/* Post List */}
      <div className="space-y-4">
        {filtered.map((post, i) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="group p-8 bg-background rounded-[2.5rem] border hover:shadow-2xl hover:shadow-primary/5 transition-all flex flex-col md:flex-row gap-8 items-start"
          >
            <div className="h-24 w-40 rounded-3xl overflow-hidden bg-muted/20 shrink-0">
              <img src={post.coverImage} alt={post.title} className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="flex-1 space-y-3">
              <div className="flex items-center gap-3 flex-wrap">
                <StatusBadge status={post.status} />
                {post.tags.map(t => (
                  <span key={t} className="text-[8px] font-black uppercase tracking-widest text-muted-foreground border border-dashed px-2 py-0.5 rounded-full">{t}</span>
                ))}
              </div>
              <h2 className="text-xl font-black italic uppercase tracking-tight group-hover:text-primary transition-colors leading-tight">{post.title}</h2>
              <p className="text-xs text-muted-foreground font-medium line-clamp-2">{post.excerpt}</p>
              <div className="flex items-center gap-4 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{post.readingTimeMinutes} min read</span>
                {post.publishedAt && <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />{post.publishedAt.toLocaleDateString()}</span>}
              </div>
            </div>
            <div className="flex gap-2 shrink-0">
              <Link href={`/vendor/blog/${post.id}`}>
                <Button variant="ghost" size="icon" className="h-11 w-11 rounded-2xl bg-muted/50 hover:bg-primary/10 hover:text-primary">
                  <Edit3 className="h-5 w-5" />
                </Button>
              </Link>
              <Button variant="ghost" size="icon" className="h-11 w-11 rounded-2xl bg-muted/50 hover:bg-destructive/10 hover:text-destructive">
                <Trash2 className="h-5 w-5" />
              </Button>
            </div>
          </motion.div>
        ))}
        {filtered.length === 0 && (
          <div className="flex flex-col items-center gap-4 py-20 text-center">
            <BookOpen className="h-12 w-12 text-muted-foreground/30" />
            <p className="font-black italic uppercase tracking-tight text-muted-foreground">No posts found</p>
          </div>
        )}
      </div>
    </div>
  );
}
