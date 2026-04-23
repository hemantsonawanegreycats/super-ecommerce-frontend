"use client";

import { useState } from "react";
import { 
  Calendar, 
  MapPin, 
  Users, 
  ChevronRight, 
  Clock, 
  Star, 
  Download, 
  CheckCircle2,
  TrendingUp,
  Wallet,
  ArrowUpRight,
  Filter,
  MoreHorizontal,
  Mail
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const MOCK_RESERVATIONS = [
  {
    id: "RES-44321",
    property: "Minimalist Desert Pavilion",
    guest: { name: "Sarah Johnson", avatar: "https://i.pravatar.cc/150?u=sarah", email: "sarah@example.com" },
    dates: "May 14 — May 19, 2026",
    guests: "2 Adults",
    payout: 4268.00,
    status: "CONFIRMED",
    requestedAt: "2 hours ago"
  },
  {
    id: "RES-55678",
    property: "Minimalist Desert Pavilion",
    guest: { name: "Marcus Chen", avatar: "https://i.pravatar.cc/150?u=marcus", email: "marcus@example.com" },
    dates: "June 02 — June 08, 2026",
    guests: "3 Adults",
    payout: 5120.50,
    status: "PENDING",
    requestedAt: "5 hours ago"
  }
];

export default function HostBookingsPage() {
  return (
    <div className="container mx-auto max-w-7xl px-6 py-12">
      <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div className="space-y-2">
           <h1 className="text-4xl lg:text-6xl font-black italic tracking-tighter uppercase leading-none">Reservations</h1>
           <p className="text-muted-foreground font-medium uppercase text-[10px] tracking-[0.3em]">Manage guest arrivals and stay logistics</p>
        </div>
        <div className="flex gap-3">
           <Button variant="outline" className="rounded-full font-black italic uppercase h-12 px-8 border-2">
              <Filter className="h-4 w-4 mr-2" /> Filter
           </Button>
           <Button className="rounded-full font-black italic uppercase h-12 px-8 shadow-xl">
              Export Schedule
           </Button>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
         {[
           { label: "Active Stays", value: "12", icon: Calendar, color: "text-blue-600", bg: "bg-blue-50" },
           { label: "Pending Requests", value: "05", icon: Clock, color: "text-amber-600", bg: "bg-amber-50" },
           { label: "Projected Payout", value: "$42.8k", icon: Wallet, color: "text-emerald-600", bg: "bg-emerald-50" }
         ].map((stat, i) => (
           <motion.div 
             key={i}
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: i * 0.1 }}
             className="p-8 rounded-[2.5rem] bg-background border-2 border-dashed flex items-center justify-between group hover:border-primary/30 transition-all"
           >
              <div className="space-y-1">
                 <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">{stat.label}</span>
                 <p className="text-4xl font-black italic tracking-tighter">{stat.value}</p>
              </div>
              <div className={cn("h-14 w-14 rounded-3xl flex items-center justify-center", stat.bg, stat.color)}>
                 <stat.icon className="h-7 w-7" />
              </div>
           </motion.div>
         ))}
      </div>

      {/* Reservation List */}
      <div className="space-y-6">
         {MOCK_RESERVATIONS.map((res, idx) => (
           <motion.div 
             key={res.id}
             initial={{ opacity: 0, scale: 0.98 }}
             animate={{ opacity: 1, scale: 1 }}
             transition={{ delay: 0.2 + (idx * 0.1) }}
             className="group bg-background rounded-[3rem] border p-10 flex flex-col lg:flex-row lg:items-center gap-10 hover:shadow-2xl hover:shadow-primary/5 transition-all"
           >
              {/* Guest Info */}
              <div className="flex items-center gap-6 lg:w-[250px] shrink-0">
                 <Avatar className="h-16 w-16 border-2 border-primary/20 shadow-lg">
                    <AvatarImage src={res.guest.avatar} />
                    <AvatarFallback>{res.guest.name[0]}</AvatarFallback>
                 </Avatar>
                 <div className="flex flex-col">
                    <span className="text-lg font-black italic uppercase leading-none">{res.guest.name}</span>
                    <span className="text-[10px] font-bold text-muted-foreground mt-1 uppercase tracking-tight">{res.requestedAt}</span>
                 </div>
              </div>

              {/* Booking Details */}
              <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-8">
                 <div className="space-y-1">
                    <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                       <MapPin className="h-3 w-3" /> PROPERTY
                    </span>
                    <p className="text-sm font-bold italic uppercase truncate">{res.property}</p>
                 </div>
                 <div className="space-y-1">
                    <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                       <Calendar className="h-3 w-3" /> DATES
                    </span>
                    <p className="text-sm font-bold italic uppercase">{res.dates}</p>
                 </div>
              </div>

              {/* Status & Payout */}
              <div className="flex items-center justify-between lg:flex-col lg:items-end gap-4 shrink-0">
                 <div className="text-right">
                    <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">PAYOUT</span>
                    <p className="text-2xl font-black italic tracking-tighter text-emerald-600">${res.payout.toLocaleString()}</p>
                 </div>
                 <Badge className={cn(
                    "font-black italic px-4 py-1.5 rounded-full uppercase text-[10px] tracking-widest border-2",
                    res.status === "CONFIRMED" ? "bg-emerald-500/5 text-emerald-600 border-emerald-500/20" : "bg-amber-500/5 text-amber-600 border-amber-500/20"
                 )}>
                    {res.status}
                 </Badge>
              </div>

              {/* Actions */}
              <div className="flex gap-2 shrink-0">
                 <Button size="icon" variant="ghost" className="h-12 w-12 rounded-2xl bg-muted/50 hover:bg-primary/10 hover:text-primary transition-all">
                    <Mail className="h-5 w-5" />
                 </Button>
                 <Button size="icon" variant="ghost" className="h-12 w-12 rounded-2xl bg-muted/50 hover:bg-primary/10 hover:text-primary transition-all">
                    <CheckCircle2 className="h-5 w-5" />
                 </Button>
                 <Button size="icon" variant="ghost" className="h-12 w-12 rounded-2xl bg-muted/50 hover:bg-primary/10 hover:text-primary transition-all">
                    <MoreHorizontal className="h-5 w-5" />
                 </Button>
              </div>
           </motion.div>
         ))}
      </div>
    </div>
  );
}
