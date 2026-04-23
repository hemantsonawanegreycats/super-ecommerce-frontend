"use client";

import { useState } from "react";
import { 
  BarChart3, 
  TrendingUp, 
  ShoppingBag, 
  DollarSign, 
  ArrowUpRight, 
  ArrowDownRight,
  Calendar,
  Download,
  Eye,
  Activity
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export default function VendorAnalyticsPage() {
  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div className="space-y-2">
           <h1 className="text-4xl lg:text-6xl font-black italic tracking-tighter uppercase leading-none">Store Analytics</h1>
           <p className="text-muted-foreground font-medium uppercase text-[10px] tracking-[0.2em]">Track your performance and customer insights</p>
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
           { label: "Total Revenue", value: "$42,800", change: "+12.4%", positive: true, icon: DollarSign },
           { label: "Completed Orders", value: "342", change: "+8.1%", positive: true, icon: ShoppingBag },
           { label: "Store Views", value: "14.2k", change: "-1.2%", positive: false, icon: Eye },
           { label: "Conversion Rate", value: "2.4%", change: "+0.5%", positive: true, icon: Activity },
         ].map((stat, i) => (
           <motion.div 
             key={i}
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: i * 0.1 }}
             className="p-10 rounded-[3rem] bg-background border shadow-[0_20px_50px_rgba(0,0,0,0.02)] flex flex-col gap-4 relative overflow-hidden group hover:shadow-2xl hover:shadow-primary/5 transition-all"
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
                 <span className="text-muted-foreground font-bold ml-1">VS PREV. 30 DAYS</span>
              </div>
              {/* Background Accent */}
              <div className="absolute -bottom-6 -right-6 h-24 w-24 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-all" />
           </motion.div>
         ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
         <Card className="lg:col-span-8 rounded-[3.5rem] border shadow-2xl overflow-hidden min-h-[500px]">
            <CardHeader className="p-10 border-b border-dashed bg-muted/10">
               <div className="flex items-center justify-between">
                  <div className="space-y-1">
                     <CardTitle className="text-2xl font-black italic uppercase tracking-tight">Sales Overview</CardTitle>
                     <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Revenue timeline for your store</p>
                  </div>
                  <div className="flex gap-2">
                     <Badge className="bg-primary/10 text-primary border-none text-[8px] font-black uppercase tracking-widest px-4 py-1.5">REVENUE</Badge>
                     <Badge variant="outline" className="border-2 text-[8px] font-black uppercase tracking-widest px-4 py-1.5">ORDERS</Badge>
                  </div>
               </div>
            </CardHeader>
            <CardContent className="p-10 flex items-center justify-center h-[400px]">
               <div className="flex flex-col items-center gap-6 text-center">
                  <div className="h-20 w-20 rounded-[2rem] bg-muted/30 flex items-center justify-center border-4 border-dashed border-primary/20">
                     <BarChart3 className="h-8 w-8 text-primary/40" />
                  </div>
                  <div className="space-y-2">
                     <p className="text-lg font-black italic uppercase tracking-tighter">Visualization Engine</p>
                     <p className="text-xs text-muted-foreground font-medium uppercase tracking-widest max-w-xs mx-auto">Recharts will be integrated here to show your interactive sales metrics.</p>
                  </div>
               </div>
            </CardContent>
         </Card>

         <Card className="lg:col-span-4 rounded-[3.5rem] border shadow-2xl overflow-hidden">
            <CardHeader className="p-10 border-b border-dashed bg-muted/10">
               <CardTitle className="text-2xl font-black italic uppercase tracking-tight">Top Products</CardTitle>
            </CardHeader>
            <CardContent className="p-10 space-y-8">
               {[
                 { label: "Premium Weighted Blanket", value: "45 Units", rev: "$5,850" },
                 { label: "Ultra-Soft Fleece Throw", value: "32 Units", rev: "$1,440" },
                 { label: "Chunky Knit Throw", value: "28 Units", rev: "$5,599" },
                 { label: "Cooling Bamboo Blanket", value: "15 Units", rev: "$1,275" },
               ].map((product, i) => (
                 <div key={i} className="space-y-2 group cursor-pointer">
                    <div className="flex justify-between items-start">
                       <span className="text-xs font-black italic uppercase tracking-tight leading-tight group-hover:text-primary transition-colors">{product.label}</span>
                       <span className="text-sm font-black italic leading-none">{product.rev}</span>
                    </div>
                    <div className="flex items-center gap-2">
                       <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{product.value}</span>
                    </div>
                 </div>
               ))}
               <Separator className="border-dashed my-8" />
               <div className="p-6 rounded-3xl bg-muted/30 border border-primary/10 flex items-center gap-4 group cursor-pointer hover:bg-primary/5 transition-all">
                  <div className="h-10 w-10 rounded-2xl bg-white shadow-sm flex items-center justify-center text-primary">
                     <ShoppingBag className="h-5 w-5" />
                  </div>
                  <div className="flex flex-col">
                     <span className="text-[10px] font-black uppercase tracking-widest leading-none">View All Products</span>
                     <span className="text-[10px] font-bold text-muted-foreground uppercase mt-1">Manage inventory</span>
                  </div>
                  <ArrowUpRight className="h-4 w-4 ml-auto text-muted-foreground group-hover:text-primary transition-colors" />
               </div>
            </CardContent>
         </Card>
      </div>
    </div>
  );
}
