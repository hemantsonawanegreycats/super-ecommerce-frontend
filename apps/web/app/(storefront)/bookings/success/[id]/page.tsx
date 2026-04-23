"use client";

import { use } from "react";
import Link from "next/link";
import { Check, Calendar, MapPin, Users, ArrowRight, Download, Share2, CalendarPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { MOCK_STAYS } from "@/features/booking/data/mock-stays";
import { generateICS } from "@/features/booking/utils/generate-ics";

export default function BookingConfirmationPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const stay = MOCK_STAYS.find(s => s.id === id) || MOCK_STAYS[0];

  const handleDownloadCalendar = () => {
    generateICS({
      title: `Stay at ${stay.title}`,
      description: `Your luxury stay at ${stay.title} in ${stay.location}. Guests: 2 Adults.`,
      location: stay.location,
      start: new Date(2026, 4, 14, 15, 0), // May 14, 3 PM
      end: new Date(2026, 4, 19, 11, 0),   // May 19, 11 AM
      url: `https://supere.luxury/account/orders`
    });
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center bg-muted/5 py-20 px-6">
      <div className="max-w-4xl w-full text-center space-y-12">
        {/* Animated Success Icon */}
        <div className="flex justify-center">
           <motion.div 
             initial={{ scale: 0, rotate: -20 }}
             animate={{ scale: 1, rotate: 0 }}
             transition={{ type: "spring", damping: 12, stiffness: 200 }}
             className="h-32 w-32 rounded-[2.5rem] bg-emerald-500 flex items-center justify-center text-white shadow-2xl shadow-emerald-500/40 relative"
           >
              <Check className="h-16 w-16 stroke-[4px]" />
              <motion.div 
                animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0, 0.3] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute inset-0 rounded-[2.5rem] border-4 border-emerald-500/50"
              />
           </motion.div>
        </div>

        <div className="space-y-4">
           <motion.h1 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.2 }}
             className="text-5xl lg:text-7xl font-black italic tracking-tighter uppercase leading-none"
           >
              Pack Your Bags.
           </motion.h1>
           <motion.p 
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             transition={{ delay: 0.4 }}
             className="text-lg font-bold italic text-muted-foreground uppercase tracking-widest"
           >
              Your reservation at <span className="text-foreground">{stay.title}</span> is confirmed.
           </motion.p>
        </div>

        {/* Booking Card */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 }}
          className="bg-background rounded-[3.5rem] border-4 border-white shadow-[0_40px_100px_rgba(0,0,0,0.08)] overflow-hidden"
        >
           <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="p-12 text-left space-y-10">
                 <div className="space-y-2">
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">RESERVATION ID: #BK-77291</span>
                    <h2 className="text-3xl font-black italic tracking-tight uppercase leading-none">{stay.title}</h2>
                 </div>

                 <div className="grid grid-cols-2 gap-8">
                    <div className="flex items-center gap-4">
                       <div className="h-10 w-10 rounded-2xl bg-muted flex items-center justify-center">
                          <Calendar className="h-5 w-5 text-primary" />
                       </div>
                       <div className="flex flex-col">
                          <span className="text-[8px] font-black uppercase tracking-widest text-muted-foreground">DATE</span>
                          <span className="text-sm font-black italic uppercase">May 14—19</span>
                       </div>
                    </div>
                    <div className="flex items-center gap-4">
                       <div className="h-10 w-10 rounded-2xl bg-muted flex items-center justify-center">
                          <Users className="h-5 w-5 text-primary" />
                       </div>
                       <div className="flex flex-col">
                          <span className="text-[8px] font-black uppercase tracking-widest text-muted-foreground">GUESTS</span>
                          <span className="text-sm font-black italic uppercase">2 Adults</span>
                       </div>
                    </div>
                 </div>

                 <div className="flex items-start gap-4">
                    <div className="h-10 w-10 rounded-2xl bg-muted flex items-center justify-center shrink-0">
                       <MapPin className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex flex-col">
                       <span className="text-[8px] font-black uppercase tracking-widest text-muted-foreground">LOCATION</span>
                       <span className="text-sm font-black italic uppercase leading-tight">{stay.location}</span>
                    </div>
                 </div>

                 <div className="pt-4 flex flex-wrap gap-4">
                    <Button onClick={handleDownloadCalendar} className="rounded-full font-black italic uppercase h-12 px-8 shadow-xl gap-2">
                       <CalendarPlus className="h-4 w-4" /> ADD TO CALENDAR
                    </Button>
                    <Button variant="outline" className="rounded-full font-black italic uppercase border-2 h-12 px-8 gap-2">
                       <Download className="h-4 w-4" /> E-TICKET
                    </Button>
                 </div>
              </div>
              <div className="relative min-h-[300px]">
                 <img src={stay.images[0]} className="absolute inset-0 h-full w-full object-cover" alt="Stay" />
                 <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent" />
                 <div className="absolute bottom-10 right-10">
                    <Badge className="bg-white/90 backdrop-blur-md text-primary font-black italic px-6 py-2 rounded-full border-none shadow-2xl">
                       PAID IN FULL
                    </Badge>
                 </div>
              </div>
           </div>
        </motion.div>

        <div className="pt-6">
           <Link href="/account/orders">
              <Button variant="ghost" className="rounded-full font-black italic uppercase tracking-widest text-xs group">
                 Manage Booking in your Dashboard <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
           </Link>
        </div>
      </div>
    </div>
  );
}
