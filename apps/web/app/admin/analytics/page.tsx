"use client";

import { useState } from "react";
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  ShoppingBag, 
  DollarSign, 
  ArrowUpRight, 
  ArrowDownRight,
  Calendar,
  Download,
  Filter,
  Activity
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { RevenueChart } from "@/features/analytics/components/RevenueChart";

export default function AdminAnalyticsPage() {
  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div className="space-y-2">
           <h1 className="text-4xl lg:text-6xl font-black italic tracking-tighter uppercase leading-none">Global Intelligence</h1>
           <p className="text-muted-foreground font-medium uppercase text-[10px] tracking-[0.2em]">Real-time market performance and ecosystem data</p>
        </div>
        <div className="flex gap-3">
           <Button variant="outline" className="rounded-full font-black italic uppercase h-14 px-8 border-2 gap-2 shadow-xl shadow-primary/5">
              <Calendar className="h-4 w-4" /> LAST 30 DAYS
           </Button>
           <Button className="rounded-full font-black italic uppercase h-14 px-8 shadow-xl gap-2">
              <Download className="h-4 w-4" /> EXPORT REPORT
           </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
         {[
           { label: "Gross Merchandise Value", value: "$124,563", change: "+14.2%", positive: true, icon: DollarSign },
           { label: "Active Transactions", value: "1,284", change: "+8.1%", positive: true, icon: ShoppingBag },
           { label: "Platform Sessions", value: "48.2k", change: "-2.4%", positive: false, icon: Activity },
           { label: "New Vendors", value: "52", change: "+12.5%", positive: true, icon: Users },
         ].map((stat, i) => (
           <motion.div 
             key={i}
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: i * 0.1 }}
             className="p-10 rounded-[3rem] bg-background border-4 border-white shadow-[0_20px_50px_rgba(0,0,0,0.05)] flex flex-col gap-4 relative overflow-hidden group"
           >
              <div className="h-12 w-12 rounded-2xl bg-muted/50 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                 <stat.icon className="h-6 w-6" />
              </div>
              <div className="space-y-1">
                 <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">{stat.label}</span>
                 <p className="text-4xl font-black italic tracking-tighter">{stat.value}</p>
              </div>
              <div className={cn(
                 "flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest",
                 stat.positive ? "text-emerald-600" : "text-destructive"
              )}>
                 {stat.positive ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                 {stat.change}
                 <span className="text-muted-foreground font-bold ml-1">VS PREV. PERIOD</span>
              </div>
              {/* Background Accent */}
              <div className="absolute -bottom-6 -right-6 h-24 w-24 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-all" />
           </motion.div>
         ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
         <Card className="lg:col-span-8 rounded-[3.5rem] border-4 border-white shadow-2xl overflow-hidden min-h-[500px]">
            <CardHeader className="p-10 border-b border-dashed bg-muted/10">
               <div className="flex items-center justify-between">
                  <div className="space-y-1">
                     <CardTitle className="text-2xl font-black italic uppercase tracking-tight">Revenue Trajectory</CardTitle>
                     <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Aggregate performance across all tenant stores</p>
                  </div>
                  <div className="flex gap-2">
                     <Badge className="bg-primary/10 text-primary border-none text-[8px] font-black uppercase tracking-widest px-4 py-1.5">UNITS</Badge>
                     <Badge variant="outline" className="border-2 text-[8px] font-black uppercase tracking-widest px-4 py-1.5">REVENUE</Badge>
                  </div>
               </div>
            </CardHeader>
            <CardContent className="p-10 h-[400px]">
               <RevenueChart />
            </CardContent>
         </Card>

         <Card className="lg:col-span-4 rounded-[3.5rem] border-4 border-white shadow-2xl overflow-hidden">
            <CardHeader className="p-10 border-b border-dashed bg-muted/10">
               <CardTitle className="text-2xl font-black italic uppercase tracking-tight">Top Categories</CardTitle>
            </CardHeader>
            <CardContent className="p-10 space-y-8">
               {[
                 { label: "Luxury Stays", value: "42%", color: "bg-primary" },
                 { label: "Premium Goods", value: "31%", color: "bg-zinc-800" },
                 { label: "Experiences", value: "18%", color: "bg-zinc-600" },
                 { label: "Art & Decor", value: "9%", color: "bg-zinc-400" },
               ].map((cat, i) => (
                 <div key={i} className="space-y-3">
                    <div className="flex justify-between items-end">
                       <span className="text-[10px] font-black uppercase tracking-widest leading-none">{cat.label}</span>
                       <span className="text-sm font-black italic leading-none">{cat.value}</span>
                    </div>
                    <div className="h-3 w-full bg-muted rounded-full overflow-hidden">
                       <motion.div 
                         initial={{ width: 0 }}
                         animate={{ width: cat.value }}
                         transition={{ delay: 0.5 + (i * 0.1), duration: 1 }}
                         className={cn("h-full rounded-full shadow-lg shadow-primary/10", cat.color)}
                       />
                    </div>
                 </div>
               ))}
               <Separator className="border-dashed my-8" />
               <div className="p-6 rounded-3xl bg-muted/30 border border-primary/10 flex items-center gap-4 group cursor-pointer hover:bg-primary/5 transition-all">
                  <div className="h-10 w-10 rounded-2xl bg-white shadow-sm flex items-center justify-center text-primary">
                     <Activity className="h-5 w-5" />
                  </div>
                  <div className="flex flex-col">
                     <span className="text-[10px] font-black uppercase tracking-widest leading-none">Market Share</span>
                     <span className="text-[10px] font-bold text-muted-foreground uppercase mt-1">Full sector analysis</span>
                  </div>
                  <ArrowUpRight className="h-4 w-4 ml-auto text-muted-foreground group-hover:text-primary transition-colors" />
               </div>
            </CardContent>
         </Card>
      </div>
    </div>
  );
}
