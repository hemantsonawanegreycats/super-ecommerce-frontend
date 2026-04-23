"use client";

import { useState } from "react";
import { 
  Store, 
  Search, 
  Filter, 
  MoreHorizontal, 
  ExternalLink, 
  Settings2, 
  TrendingUp,
  AlertCircle,
  LayoutGrid,
  List
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const MOCK_STORES = [
  { id: "1", name: "Modern Minimalist", vendor: "Alex Rivers", status: "ACTIVE", gmv: 42800, products: 24, health: 98, logo: "https://images.unsplash.com/photo-1541746972996-4e0b0f43e02a?q=80&w=100" },
  { id: "2", name: "Artisan Ceramics", vendor: "Elena Smith", status: "PENDING", gmv: 12500, products: 12, health: 85, logo: "https://images.unsplash.com/photo-1578749553836-3a560424678b?q=80&w=100" },
  { id: "3", name: "The Sleep Lab", vendor: "Marcus Thorne", status: "ACTIVE", gmv: 89300, products: 45, health: 92, logo: "https://images.unsplash.com/photo-1522770179533-24471fcdba45?q=80&w=100" },
  { id: "4", name: "Eco Luxe", vendor: "Sarah Vance", status: "SUSPENDED", gmv: 0, products: 8, health: 40, logo: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=100" },
];

export default function AdminStoresPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
           <h1 className="text-4xl font-black italic tracking-tighter uppercase leading-none">Store Ecosystem</h1>
           <p className="text-muted-foreground font-medium uppercase text-[10px] tracking-[0.2em]">Platform-wide vendor monitoring and oversight</p>
        </div>
        <div className="flex gap-3">
           <Button variant="outline" className="rounded-full font-black italic uppercase h-12 px-8 border-2">
              <TrendingUp className="h-4 w-4 mr-2" /> Global Growth
           </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
         {[
           { label: "Total Stores", value: "842", sub: "+12 this week" },
           { label: "Active Revenue", value: "$1.2M", sub: "Last 30 days" },
           { label: "System Health", value: "94%", sub: "Service uptime" },
           { label: "Pending Verification", value: "24", sub: "Awaiting review" },
         ].map((stat, i) => (
           <motion.div 
             key={i}
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: i * 0.1 }}
             className="p-8 rounded-[2.5rem] bg-background border-2 border-dashed flex flex-col gap-1 group hover:border-primary/30 transition-all"
           >
              <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">{stat.label}</span>
              <p className="text-3xl font-black italic tracking-tighter">{stat.value}</p>
              <span className="text-[10px] font-bold text-primary uppercase mt-1">{stat.sub}</span>
           </motion.div>
         ))}
      </div>

      <div className="grid grid-cols-1 gap-6">
         {MOCK_STORES.map((store, idx) => (
           <motion.div 
             key={store.id}
             initial={{ opacity: 0, scale: 0.98 }}
             animate={{ opacity: 1, scale: 1 }}
             transition={{ delay: 0.4 + (idx * 0.1) }}
             className="bg-background rounded-[3rem] border p-8 flex flex-col lg:flex-row lg:items-center gap-10 hover:shadow-2xl hover:shadow-primary/5 transition-all group"
           >
              <div className="flex items-center gap-6 lg:w-[300px] shrink-0">
                 <div className="h-20 w-20 rounded-3xl overflow-hidden border-2 border-white shadow-xl bg-muted/20">
                    <img src={store.logo} alt={store.name} className="h-full w-full object-cover" />
                 </div>
                 <div className="flex flex-col">
                    <h3 className="text-xl font-black italic uppercase tracking-tight leading-none truncate max-w-[200px]">{store.name}</h3>
                    <span className="text-[10px] font-bold text-muted-foreground mt-1 uppercase tracking-widest">{store.vendor}</span>
                    <Badge variant="outline" className={cn(
                       "w-fit mt-3 font-black italic text-[8px] uppercase tracking-widest px-3 border-2",
                       store.status === "ACTIVE" ? "text-emerald-600 border-emerald-500/20 bg-emerald-500/5" : store.status === "PENDING" ? "text-amber-600 border-amber-500/20 bg-amber-500/5" : "text-destructive border-destructive/20 bg-destructive/5"
                    )}>
                       {store.status}
                    </Badge>
                 </div>
              </div>

              <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-8">
                 <div className="space-y-1">
                    <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">GMV (30D)</span>
                    <p className="text-lg font-black italic">${store.gmv.toLocaleString()}</p>
                 </div>
                 <div className="space-y-1">
                    <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">PRODUCTS</span>
                    <p className="text-lg font-black italic">{store.products}</p>
                 </div>
                 <div className="md:col-span-2 space-y-3">
                    <div className="flex items-center justify-between">
                       <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">ECOSYSTEM HEALTH</span>
                       <span className="text-[10px] font-black text-primary">{store.health}%</span>
                    </div>
                    <Progress value={store.health} className="h-1.5" />
                 </div>
              </div>

              <div className="flex gap-2 shrink-0">
                 <Button variant="ghost" size="icon" className="h-12 w-12 rounded-2xl bg-muted/50 hover:bg-primary/10 hover:text-primary">
                    <ExternalLink className="h-5 w-5" />
                 </Button>
                 <Button variant="ghost" size="icon" className="h-12 w-12 rounded-2xl bg-muted/50 hover:bg-primary/10 hover:text-primary">
                    <Settings2 className="h-5 w-5" />
                 </Button>
              </div>
           </motion.div>
         ))}
      </div>
    </div>
  );
}
