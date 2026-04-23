"use client";

import { useState } from "react";
import { 
  Map as MapIcon, 
  List, 
  Filter, 
  Star, 
  Heart, 
  ChevronRight, 
  Users, 
  Calendar as CalendarIcon,
  Search,
  MapPin,
  SlidersHorizontal
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { MOCK_STAYS, Stay } from "@/features/booking/data/mock-stays";

export default function StayListingPage() {
  const [view, setView] = useState<"list" | "map">("list");
  const [selectedStay, setSelectedStay] = useState<Stay | null>(null);

  return (
    <div className="relative flex flex-col h-[calc(100vh-80px)] overflow-hidden bg-background">
      {/* Search & Filter Header */}
      <div className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur-xl px-6 py-4">
        <div className="mx-auto max-w-7xl flex flex-col md:flex-row items-center justify-between gap-4">
           <div className="flex items-center gap-2 w-full md:w-auto bg-muted/50 rounded-full border px-4 py-2 hover:border-primary/30 transition-all cursor-pointer">
              <div className="flex items-center gap-3 px-3 border-r">
                 <MapPin className="h-4 w-4 text-primary" />
                 <span className="text-sm font-bold italic">Anywhere</span>
              </div>
              <div className="flex items-center gap-3 px-3 border-r">
                 <CalendarIcon className="h-4 w-4 text-primary" />
                 <span className="text-sm font-bold italic">Any week</span>
              </div>
              <div className="flex items-center gap-3 px-3">
                 <Users className="h-4 w-4 text-primary" />
                 <span className="text-sm font-bold italic">Add guests</span>
              </div>
              <div className="ml-auto h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground shadow-lg">
                 <Search className="h-4 w-4" />
              </div>
           </div>

           <div className="flex items-center gap-3">
              <Button variant="outline" className="rounded-full font-black italic gap-2 h-11 border-2">
                 <SlidersHorizontal className="h-4 w-4" /> FILTERS
              </Button>
           </div>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* List View */}
        <div className={cn(
          "flex-1 overflow-y-auto scrollbar-hide px-6 py-8 transition-all duration-500",
          view === "map" ? "hidden lg:block lg:max-w-[600px]" : "w-full"
        )}>
          <div className="mx-auto max-w-5xl space-y-12">
            <div className="space-y-1">
               <h1 className="text-3xl font-black italic tracking-tighter uppercase">Extraordinary Stays</h1>
               <p className="text-muted-foreground font-medium uppercase text-[10px] tracking-[0.2em]">Curated architectural sanctuaries across the globe</p>
            </div>

            <div className={cn(
              "grid gap-8",
              view === "list" ? "grid-cols-1 md:grid-cols-2 xl:grid-cols-3" : "grid-cols-1 md:grid-cols-2"
            )}>
              {MOCK_STAYS.map((stay) => (
                <StayCard key={stay.id} stay={stay} />
              ))}
            </div>
          </div>
        </div>

        {/* Map View */}
        <div className={cn(
          "bg-muted/30 relative transition-all duration-500",
          view === "map" ? "flex-1" : "hidden lg:block lg:w-[400px] xl:w-[600px]"
        )}>
          <div className="absolute inset-0 bg-[url('https://api.mapbox.com/styles/v1/mapbox/dark-v11/static/-120.0324,39.0968,9,0/800x800?access_token=MOCK')] bg-cover bg-center grayscale opacity-60" />
          
          {/* Interactive Placeholder */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
             <div className="bg-background/90 backdrop-blur-md px-6 py-3 rounded-full border-2 border-primary/20 shadow-2xl">
                <span className="text-xs font-black italic tracking-widest uppercase">MAP ENGINE ACTIVE</span>
             </div>
          </div>

          {/* Markers (Mock) */}
          {MOCK_STAYS.map(stay => (
            <div 
              key={`marker-${stay.id}`}
              className="absolute group cursor-pointer"
              style={{ 
                top: `${40 + (Math.random() * 20)}%`, 
                left: `${40 + (Math.random() * 20)}%` 
              }}
            >
              <div className="bg-background px-3 py-1.5 rounded-full border-2 border-primary shadow-xl group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                 <span className="text-xs font-black italic">${stay.pricePerNight}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Floating Toggle */}
      <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50">
        <Button 
          onClick={() => setView(view === "list" ? "map" : "list")}
          className="rounded-full h-14 px-8 font-black italic gap-3 shadow-[0_20px_50px_rgba(0,0,0,0.3)] hover:scale-105 transition-all"
        >
          {view === "list" ? (
            <>SHOW MAP <MapIcon className="h-4 w-4" /></>
          ) : (
            <>SHOW LIST <List className="h-4 w-4" /></>
          )}
        </Button>
      </div>
    </div>
  );
}

function StayCard({ stay }: { stay: Stay }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group cursor-pointer space-y-4"
    >
      <div className="relative aspect-[4/5] overflow-hidden rounded-[2.5rem] bg-muted shadow-2xl shadow-primary/5 transition-all duration-500 group-hover:shadow-primary/20">
        <img 
          src={stay.images[0]} 
          alt={stay.title} 
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute top-6 right-6">
           <button className="h-10 w-10 rounded-full bg-black/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white hover:text-primary transition-all shadow-xl">
              <Heart className="h-5 w-5" />
           </button>
        </div>
        <div className="absolute bottom-6 left-6">
           <Badge className="bg-white/90 backdrop-blur-md text-primary font-black italic px-4 py-1.5 rounded-full border-none">
              {stay.type}
           </Badge>
        </div>
      </div>

      <div className="px-2 space-y-1">
         <div className="flex items-center justify-between">
            <h3 className="font-black italic text-lg tracking-tight uppercase">{stay.title}</h3>
            <div className="flex items-center gap-1">
               <Star className="h-3.5 w-3.5 fill-primary text-primary" />
               <span className="text-xs font-black">{stay.rating}</span>
            </div>
         </div>
         <p className="text-muted-foreground text-sm font-medium">{stay.location}</p>
         <div className="flex items-center gap-3 pt-2">
            <div className="flex items-center gap-1 text-[10px] font-black uppercase text-muted-foreground/60 tracking-widest">
               <Users className="h-3 w-3" /> {stay.guests} GUESTS
            </div>
            <div className="h-1 w-1 rounded-full bg-muted-foreground/30" />
            <div className="flex items-center gap-1 text-[10px] font-black uppercase text-muted-foreground/60 tracking-widest">
               {stay.bedrooms} BEDS
            </div>
         </div>
         <div className="pt-3 flex items-baseline gap-1">
            <span className="text-xl font-black italic">${stay.pricePerNight}</span>
            <span className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">/ night</span>
         </div>
      </div>
    </motion.div>
  );
}
