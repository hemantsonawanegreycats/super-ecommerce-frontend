"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  Package, 
  ChevronRight, 
  TrendingUp, 
  Clock, 
  CheckCircle2, 
  Truck, 
  Search, 
  Filter, 
  Download,
  MoreVertical,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react";
import { OrderStatusBadge, OrderStatus } from "@/features/orders/components/OrderStatusBadge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

const format = (v: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(v);

const MOCK_VENDOR_ORDERS = [
  { id: "ORD-998877", date: "Apr 21, 2026", status: "CONFIRMED" as OrderStatus, total: 129.99, customer: "John Doe", items: 1, email: "john@example.com" },
  { id: "ORD-112233", date: "Apr 20, 2026", status: "PROCESSING" as OrderStatus, total: 85.00, customer: "Jane Smith", items: 2, email: "jane@smith.com" },
  { id: "ORD-223344", date: "Apr 18, 2026", status: "SHIPPED" as OrderStatus, total: 199.99, customer: "Bob Wilson", items: 1, email: "bob@wilson.net" },
  { id: "ORD-334455", date: "Apr 15, 2026", status: "DELIVERED" as OrderStatus, total: 45.00, customer: "Alice Brown", items: 3, email: "alice@brown.org" },
];

const STATS = [
  { label: "Pending Fulfillment", value: "03", icon: Clock, color: "text-amber-600", bg: "bg-amber-500/10", trend: "+12%", up: true },
  { label: "Shipped Today", value: "05", icon: Truck, color: "text-blue-600", bg: "bg-blue-500/10", trend: "+5%", up: true },
  { label: "Completed (Month)", value: "42", icon: CheckCircle2, color: "text-emerald-600", bg: "bg-emerald-500/10", trend: "+18%", up: true },
  { label: "Revenue (Month)", value: "$3.2k", icon: TrendingUp, color: "text-primary", bg: "bg-primary/10", trend: "-2%", up: false },
];

export default function VendorOrdersPage() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="space-y-12 pb-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <h1 className="text-4xl lg:text-5xl font-black italic tracking-tighter leading-none">ORDER FULFILLMENT</h1>
          <p className="text-muted-foreground font-medium">Manage logistics and customer transactions for your store.</p>
        </div>
        <div className="flex items-center gap-3">
           <Button variant="outline" className="rounded-full h-12 px-8 font-black italic gap-2 border-2">
              <Download className="h-4 w-4" /> EXPORT LOGS
           </Button>
           <Button className="rounded-full h-12 px-8 font-black italic gap-2 shadow-xl shadow-primary/10">
              <Package className="h-4 w-4" /> BATCH PROCESS
           </Button>
        </div>
      </div>

      {/* Stats Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {STATS.map((stat, idx) => {
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
                  {stat.up ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
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

      {/* Orders Management Container */}
      <div className="rounded-[2.5rem] border bg-background shadow-2xl shadow-primary/5 overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between p-10 gap-6 border-b border-dashed">
          <div className="space-y-1">
             <h2 className="text-2xl font-black italic tracking-tight uppercase">Recent Orders</h2>
             <p className="text-xs font-medium text-muted-foreground">Showing the latest 50 orders awaiting action.</p>
          </div>
          <div className="flex items-center gap-4">
             <div className="relative w-full md:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="ID, Customer, Status..." 
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
                <th className="text-left p-6 font-black uppercase tracking-widest text-[10px] text-muted-foreground/60">Reference</th>
                <th className="text-left p-6 font-black uppercase tracking-widest text-[10px] text-muted-foreground/60">Customer</th>
                <th className="text-left p-6 font-black uppercase tracking-widest text-[10px] text-muted-foreground/60">Filing Date</th>
                <th className="text-left p-6 font-black uppercase tracking-widest text-[10px] text-muted-foreground/60">Volume</th>
                <th className="text-left p-6 font-black uppercase tracking-widest text-[10px] text-muted-foreground/60">Status</th>
                <th className="text-right p-6 font-black uppercase tracking-widest text-[10px] text-muted-foreground/60">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-dashed border-t">
              <AnimatePresence mode="popLayout">
                {MOCK_VENDOR_ORDERS.map((order) => (
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
                          <p className="font-bold text-sm">{order.customer}</p>
                          <p className="text-[10px] font-medium text-muted-foreground tracking-tight">{order.email}</p>
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
                            href={`/vendor/orders/${order.id}`}
                            className={cn(buttonVariants({ variant: "ghost", size: "sm" }), "rounded-full h-10 px-5 font-black italic tracking-tight group-hover:bg-primary/5 group-hover:text-primary")}
                          >
                            FULFILL <ChevronRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" />
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
           <p className="text-xs font-medium text-muted-foreground">Showing 1 to 4 of 42 orders</p>
           <div className="flex items-center gap-2">
              <Button variant="outline" className="rounded-full px-6 font-bold" disabled>Previous</Button>
              <Button variant="outline" className="rounded-full px-6 font-bold">Next</Button>
           </div>
        </div>
      </div>
    </div>
  );
}
