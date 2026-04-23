"use client";

import { useState } from "react";
import Link from "next/link";
import { Package, ChevronRight, Search, Filter, ArrowRight, ShoppingBag, Bed, Ticket } from "lucide-react";
import { OrderStatusBadge, OrderStatus } from "@/features/orders/components/OrderStatusBadge";
import { CustomerBookingList } from "@/features/booking/components/CustomerBookingList";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const MOCK_ORDERS = [
  { id: "ORD-998877", date: "April 21, 2026", status: "SHIPPED" as OrderStatus, total: 189.00, itemCount: 1, thumbnail: "https://images.unsplash.com/photo-1583845258933-289c09d57a9e?q=80&w=200", title: "The Cloud-Weight Premium Blanket" },
  { id: "ORD-887766", date: "April 15, 2026", status: "DELIVERED" as OrderStatus, total: 34.50, itemCount: 1, thumbnail: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?q=80&w=200", title: "Silk Sleep Mask" },
];

const format = (v: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(v);

export default function CustomerOrdersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeType, setActiveType] = useState<"products" | "bookings">("products");
  const [activeTab, setActiveTab] = useState("all");

  const filteredOrders = MOCK_ORDERS.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         order.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = activeTab === "all" || order.status.toLowerCase() === activeTab.toLowerCase();
    return matchesSearch && matchesTab;
  });

  return (
    <div className="container mx-auto max-w-6xl px-6 py-12">
      <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <h1 className="text-4xl lg:text-5xl font-black italic tracking-tighter leading-none uppercase">Purchases & Bookings</h1>
          <p className="text-muted-foreground font-medium uppercase text-[10px] tracking-[0.2em]">Manage your global luxury transactions</p>
        </div>
        
        <div className="relative w-full md:w-72">
           <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
           <Input 
             placeholder="Search IDs or items..." 
             className="pl-10 h-12 rounded-full bg-muted/20 border-none focus-visible:ring-primary/20"
             value={searchQuery}
             onChange={(e) => setSearchQuery(e.target.value)}
           />
        </div>
      </div>

      {/* Main Mode Toggles */}
      <div className="flex gap-4 mb-12">
         <button 
           onClick={() => setActiveType("products")}
           className={cn(
             "flex-1 group relative p-6 rounded-[2.5rem] border-2 transition-all text-left overflow-hidden",
             activeType === "products" ? "border-primary bg-primary/5 shadow-2xl shadow-primary/10" : "border-border hover:border-primary/30"
           )}
         >
            <div className="flex items-center justify-between mb-4">
               <div className={cn("h-12 w-12 rounded-2xl flex items-center justify-center transition-colors", activeType === "products" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground")}>
                  <ShoppingBag className="h-6 w-6" />
               </div>
               <div className={cn("h-2 w-2 rounded-full", activeType === "products" ? "bg-primary" : "bg-transparent")} />
            </div>
            <div className="space-y-1">
               <h3 className="font-black italic text-xl uppercase leading-none">Product Orders</h3>
               <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Physical Goods & Hardware</p>
            </div>
         </button>

         <button 
           onClick={() => setActiveType("bookings")}
           className={cn(
             "flex-1 group relative p-6 rounded-[2.5rem] border-2 transition-all text-left overflow-hidden",
             activeType === "bookings" ? "border-primary bg-primary/5 shadow-2xl shadow-primary/10" : "border-border hover:border-primary/30"
           )}
         >
            <div className="flex items-center justify-between mb-4">
               <div className={cn("h-12 w-12 rounded-2xl flex items-center justify-center transition-colors", activeType === "bookings" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground")}>
                  <Bed className="h-6 w-6" />
               </div>
               <div className={cn("h-2 w-2 rounded-full", activeType === "bookings" ? "bg-primary" : "bg-transparent")} />
            </div>
            <div className="space-y-1">
               <h3 className="font-black italic text-xl uppercase leading-none">Stay & Experience</h3>
               <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Bookings & Travel Records</p>
            </div>
         </button>
      </div>

      <div className="space-y-10">
        <AnimatePresence mode="wait">
          {activeType === "products" ? (
            <motion.div
              key="products"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {filteredOrders.map((order, idx) => (
                <Link
                  key={order.id}
                  href={`/account/orders/${order.id}`}
                  className="group flex flex-col md:flex-row md:items-center gap-6 rounded-[2.5rem] border bg-background p-8 transition-all hover:border-primary/30"
                >
                  <div className="h-24 w-24 shrink-0 overflow-hidden rounded-2xl border bg-muted/30">
                    <img src={order.thumbnail} alt={order.title} className="h-full w-full object-cover" />
                  </div>
                  <div className="flex flex-1 flex-col gap-2">
                    <div className="flex items-center gap-3">
                      <span className="font-black italic text-lg uppercase tracking-tight">{order.id}</span>
                      <OrderStatusBadge status={order.status} />
                    </div>
                    <h3 className="font-bold text-sm text-muted-foreground line-clamp-1">{order.title}</h3>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <div className="text-xl font-black italic">{format(order.total)}</div>
                    <div className="flex items-center gap-2 text-primary font-black italic text-[10px] tracking-widest">
                       DETAILS <ChevronRight className="h-3 w-3" />
                    </div>
                  </div>
                </Link>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="bookings"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <CustomerBookingList />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
