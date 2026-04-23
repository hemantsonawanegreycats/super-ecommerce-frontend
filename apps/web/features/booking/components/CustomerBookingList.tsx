"use client";

import { useState } from "react";
import Link from "next/link";
import { Calendar, MapPin, Users, ChevronRight, Clock, Star, Download, XCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface Booking {
  id: string;
  title: string;
  location: string;
  startDate: string;
  endDate: string;
  guests: string;
  total: number;
  status: "UPCOMING" | "COMPLETED" | "CANCELLED";
  thumbnail: string;
  type: "Stay" | "Experience";
}

const MOCK_BOOKINGS: Booking[] = [
  {
    id: "BK-77291",
    title: "Minimalist Desert Pavilion",
    location: "Joshua Tree, CA",
    startDate: "May 14, 2026",
    endDate: "May 19, 2026",
    guests: "2 Adults",
    total: 4850,
    status: "UPCOMING",
    thumbnail: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=200",
    type: "Stay"
  },
  {
    id: "BK-88302",
    title: "Oaxacan Mezcal Odyssey",
    location: "Oaxaca, Mexico",
    startDate: "May 15, 2026",
    endDate: "May 15, 2026",
    guests: "2 People",
    total: 640,
    status: "UPCOMING",
    thumbnail: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=200",
    type: "Experience"
  }
];

export function CustomerBookingList() {
  return (
    <div className="space-y-6">
      {MOCK_BOOKINGS.map((booking, idx) => (
        <motion.div
          key={booking.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: idx * 0.1 }}
          className="group relative flex flex-col md:flex-row gap-8 rounded-[3rem] border bg-background p-8 transition-all hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/5 overflow-hidden"
        >
          {/* Status Overlay for Cancelled */}
          {booking.status === "CANCELLED" && (
            <div className="absolute inset-0 bg-background/60 backdrop-blur-[2px] z-10 flex items-center justify-center">
               <Badge className="bg-destructive text-destructive-foreground font-black italic px-8 py-3 rounded-full text-xl shadow-2xl rotate-[-5deg]">CANCELLED</Badge>
            </div>
          )}

          {/* Thumbnail */}
          <div className="h-40 w-40 shrink-0 overflow-hidden rounded-[2rem] border-4 border-white shadow-xl transition-transform group-hover:scale-105 group-hover:rotate-2">
            <img src={booking.thumbnail} alt={booking.title} className="h-full w-full object-cover" />
          </div>

          {/* Info */}
          <div className="flex-1 space-y-6 min-w-0">
             <div className="space-y-2">
                <div className="flex items-center gap-3">
                   <Badge variant="outline" className="text-[8px] font-black italic uppercase tracking-widest px-3 border-2">{booking.type}</Badge>
                   <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">{booking.id}</span>
                </div>
                <h3 className="text-3xl font-black italic tracking-tighter uppercase leading-none truncate">{booking.title}</h3>
             </div>

             <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8">
                <div className="flex items-center gap-3">
                   <Calendar className="h-4 w-4 text-primary" />
                   <div className="flex flex-col">
                      <span className="text-[8px] font-black uppercase tracking-widest text-muted-foreground">DATE</span>
                      <span className="text-sm font-bold italic uppercase">{booking.startDate} {booking.type === "Stay" && `— ${booking.endDate}`}</span>
                   </div>
                </div>
                <div className="flex items-center gap-3">
                   <Users className="h-4 w-4 text-primary" />
                   <div className="flex flex-col">
                      <span className="text-[8px] font-black uppercase tracking-widest text-muted-foreground">GUESTS</span>
                      <span className="text-sm font-bold italic uppercase">{booking.guests}</span>
                   </div>
                </div>
                <div className="flex items-center gap-3">
                   <MapPin className="h-4 w-4 text-primary" />
                   <div className="flex flex-col">
                      <span className="text-[8px] font-black uppercase tracking-widest text-muted-foreground">LOCATION</span>
                      <span className="text-sm font-bold italic uppercase truncate max-w-[200px]">{booking.location}</span>
                   </div>
                </div>
                <div className="flex items-center gap-3">
                   <Clock className="h-4 w-4 text-primary" />
                   <div className="flex flex-col">
                      <span className="text-[8px] font-black uppercase tracking-widest text-muted-foreground">STATUS</span>
                      <span className="text-sm font-black italic uppercase text-primary tracking-widest">{booking.status}</span>
                   </div>
                </div>
             </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col justify-between items-end gap-4 shrink-0">
             <div className="text-3xl font-black italic tracking-tighter leading-none">${booking.total.toLocaleString()}</div>
             <div className="flex flex-col gap-2 w-full sm:w-auto">
                <Button variant="outline" className="rounded-full font-black italic uppercase border-2 h-10 px-6 gap-2 hover:bg-primary/5 transition-colors">
                   <Download className="h-4 w-4" /> E-TICKET
                </Button>
                {booking.status === "UPCOMING" && (
                  <Button variant="ghost" className="rounded-full font-bold italic uppercase h-10 px-6 gap-2 text-destructive hover:bg-destructive/10 hover:text-destructive">
                     <XCircle className="h-4 w-4" /> CANCEL
                  </Button>
                )}
             </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
