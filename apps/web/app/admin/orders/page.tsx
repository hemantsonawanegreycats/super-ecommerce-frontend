"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  ChevronRight, 
  Search, 
  Filter, 
  Download, 
  ArrowUpRight, 
  ArrowDownRight, 
  Globe, 
  Users, 
  Store, 
  BarChart3,
  MoreVertical
} from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { OrderStatusBadge, OrderStatus } from "@/features/orders/components/OrderStatusBadge";
import { motion, AnimatePresence } from "framer-motion";

const format = (v: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(v);

const MOCK_ALL_ORDERS = [
  { id: "ORD-998877", date: "Apr 21, 2026", status: "SHIPPED" as OrderStatus, total: 189.00, customer: "John Doe", vendor: "SleepWell Co.", items: 1 },
  { id: "ORD-112233", date: "Apr 20, 2026", status: "PROCESSING" as OrderStatus, total: 85.00, customer: "Jane Smith", vendor: "AquaHydrate", items: 2 },
  { id: "ORD-223344", date: "Apr 18, 2026", status: "PENDING" as OrderStatus, total: 199.99, customer: "Bob Wilson", vendor: "Makers Studio", items: 1 },
  { id: "ORD-334455", date: "Apr 15, 2026", status: "DELIVERED" as OrderStatus, total: 45.00, customer: "Alice Brown", vendor: "SleepWell Co.", items: 3 },
  { id: "ORD-445566", date: "Apr 10, 2026", status: "CANCELLED" as OrderStatus, total: 299.00, customer: "Charlie Davis", vendor: "OfficePro", items: 1 },
  { id: "ORD-556677", date: "Apr 03, 2026", status: "COMPLETED" as OrderStatus, total: 34.50, customer: "Eve Martin", vendor: "Makers Studio", items: 1 },
];

const ADMIN_STATS = [
  { label: "Global Revenue", value: "$42.8k", icon: BarChart3, color: "text-primary", bg: "bg-primary/10", trend: "+12.5%", up: true },
  { label: "Active Customers", value: "1,204", icon: Users, color: "text-blue-600", bg: "bg-blue-500/10", trend: "+5.2%", up: true },
  { label: "Live Vendors", value: "86", icon: Store, color: "text-emerald-600", bg: "bg-emerald-500/10", trend: "+2.1%", up: true },
  { label: "System Uptime", value: "99.9%", icon: Globe, color: "text-indigo-600", bg: "bg-indigo-500/10", trend: "Stable", up: true },
];

export default function AdminOrdersPage() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="space-y-12 pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <h1 className="text-4xl lg:text-5xl font-black italic tracking-tighter leading-none">GLOBAL LOGISTICS</h1>
          <p className="text-muted-foreground font-medium uppercase tracking-widest text-[10px]">Platform-wide order monitoring and network health.</p>
        </div>
        <div className="flex items-center gap-3">
           <Button variant="outline" className="rounded-full h-12 px-8 font-black italic gap-2 border-2">
              <Download className="h-4 w-4" /> MASTER EXPORT
           </Button>
        </div>
      </div>

      {/* Admin Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {ADMIN_STATS.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <motion.div 
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="rounded-[2.5rem] border bg-background p-8 shadow-2xl shadow-primary/5 space-y-4 group hover:border-primary/30 transition-all duration-500"
            >
              <div className="flex items-center justify-between">
                <div className={cn("inline-flex p-3 rounded-2xl transition-transform duration-500 group-hover:rotate-6", stat.bg)}>
                  <Icon className={cn("h-6 w-6", stat.color)} />
                </div>
                <div className={cn(
                  "flex items-center gap-1 text-[10px] font-black uppercase tracking-widest",
                  stat.up ? "text-emerald-600" : "text-destructive"
                )}>
                  {stat.up && <ArrowUpRight className="h-3 w-3" />}
                  {stat.trend}
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-4xl font-black italic tracking-tighter leading-none group-hover:scale-105 origin-left transition-transform duration-500">{stat.value}</p>
                <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">{stat.label}</p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Master Transaction Table */}
      <div className="rounded-[2.5rem] border bg-background shadow-2xl shadow-primary/5 overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between p-10 gap-6 border-b border-dashed">
          <div className="space-y-1">
             <h2 className="text-2xl font-black italic tracking-tight uppercase">Master Ledger</h2>
             <p className="text-xs font-medium text-muted-foreground">Monitoring every transaction across the network.</p>
          </div>
          <div className="flex items-center gap-4">
             <div className="relative w-full md:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="ID, Vendor, Customer..." 
                  className="pl-10 h-12 rounded-full bg-muted/20 border-none focus-visible:ring-primary/20"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
             </div>
             <Button variant="outline" size="icon" className="h-12 w-12 rounded-full border-2">
                <Filter className="h-4 w-4" />
             </Button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-muted/5">
                <th className="text-left p-6 font-black uppercase tracking-widest text-[10px] text-muted-foreground/60">Order ID</th>
                <th className="text-left p-6 font-black uppercase tracking-widest text-[10px] text-muted-foreground/60">Entity Context</th>
                <th className="text-left p-6 font-black uppercase tracking-widest text-[10px] text-muted-foreground/60">Filing Date</th>
                <th className="text-left p-6 font-black uppercase tracking-widest text-[10px] text-muted-foreground/60">Volume</th>
                <th className="text-left p-6 font-black uppercase tracking-widest text-[10px] text-muted-foreground/60">Network Status</th>
                <th className="text-right p-6 font-black uppercase tracking-widest text-[10px] text-muted-foreground/60">Audit</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-dashed border-t">
              <AnimatePresence mode="popLayout">
                {MOCK_ALL_ORDERS.map((order) => (
                  <motion.tr 
                    layout
                    key={order.id} 
                    className="hover:bg-muted/5 transition-colors group cursor-default"
                  >
                    <td className="p-6">
                       <span className="font-black italic text-base tracking-tight text-foreground group-hover:text-primary transition-colors">{order.id}</span>
                    </td>
                    <td className="p-6">
                       <div className="space-y-0.5">
                          <p className="font-bold text-sm">C: {order.customer}</p>
                          <p className="text-[10px] font-black uppercase tracking-widest text-primary/60">V: {order.vendor}</p>
                       </div>
                    </td>
                    <td className="p-6">
                       <span className="text-[11px] font-black uppercase tracking-widest text-muted-foreground">{order.date}</span>
                    </td>
                    <td className="p-6">
                       <div className="space-y-0.5">
                          <p className="font-black italic text-lg">{format(order.total)}</p>
                          <p className="text-[10px] font-bold text-muted-foreground uppercase">{order.items} ITEM{order.items !== 1 ? 'S' : ''}</p>
                       </div>
                    </td>
                    <td className="p-6">
                       <OrderStatusBadge status={order.status} />
                    </td>
                    <td className="p-6 text-right">
                       <div className="flex items-center justify-end gap-2">
                          <Link
                            href={`/admin/orders/${order.id}`}
                            className={cn(buttonVariants({ variant: "ghost", size: "sm" }), "rounded-full h-10 px-5 font-black italic tracking-tight group-hover:bg-primary/5 group-hover:text-primary")}
                          >
                            AUDIT <ChevronRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" />
                          </Link>
                          <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full text-muted-foreground">
                             <MoreVertical className="h-4 w-4" />
                          </Button>
                       </div>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>

        <div className="p-10 border-t border-dashed bg-muted/5 flex flex-col md:flex-row md:items-center justify-between gap-6">
           <p className="text-xs font-medium text-muted-foreground">Global Registry • Displaying 6 of 1,240 records</p>
           <div className="flex items-center gap-2">
              <Button variant="outline" className="rounded-full px-6 font-bold" disabled>Previous</Button>
              <Button variant="outline" className="rounded-full px-6 font-bold">Next Page</Button>
           </div>
        </div>
      </div>
    </div>
  );
}
