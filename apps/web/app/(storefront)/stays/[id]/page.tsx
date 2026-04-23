"use client";

import { use, useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { 
  Star, 
  Share, 
  Heart, 
  MapPin, 
  Users, 
  Bed, 
  Bath, 
  Wifi, 
  Coffee, 
  Wind, 
  ShieldCheck, 
  ChevronLeft,
  Calendar as CalendarIcon,
  ChevronDown,
  Info,
  X,
  TrendingDown,
  Zap
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { MOCK_STAYS } from "@/features/booking/data/mock-stays";
import { BookingCalendar } from "@/features/booking/components/BookingCalendar";
import { GuestSelector, GuestCount } from "@/features/booking/components/GuestSelector";
import { DateRange } from "react-day-picker";
import { format, differenceInDays, eachDayOfInterval, isWeekend } from "date-fns";

export default function StayDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const stay = MOCK_STAYS.find(s => s.id === id) || MOCK_STAYS[0];

  const [range, setRange] = useState<DateRange | undefined>();
  const [guests, setGuests] = useState<GuestCount>({ adults: 1, children: 0, infants: 0, pets: 0 });
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  // Dynamic Pricing Logic
  const pricing = useMemo(() => {
    if (!range?.from || !range?.to) return null;

    const nights = differenceInDays(range.to, range.from);
    if (nights <= 0) return null;

    const days = eachDayOfInterval({ start: range.from, end: range.to });
    const stayDays = days.slice(0, -1);

    let baseTotal = 0;
    let weekendSurcharge = 0;
    const weekendRate = 80;

    stayDays.forEach(day => {
      baseTotal += stay.pricePerNight;
      if (isWeekend(day)) {
        weekendSurcharge += weekendRate;
      }
    });

    const weeklyDiscount = nights >= 7 ? Math.round(baseTotal * 0.1) : 0;
    const subtotal = baseTotal + weekendSurcharge - weeklyDiscount;
    const cleaningFee = 150;
    const serviceFee = Math.round(subtotal * 0.12);
    const total = subtotal + cleaningFee + serviceFee;

    return {
      nights,
      baseTotal,
      weekendSurcharge,
      weeklyDiscount,
      subtotal,
      cleaningFee,
      serviceFee,
      total
    };
  }, [range, stay.pricePerNight]);

  const handleReserve = () => {
    if (!range?.from || !range?.to) return;
    
    // Pass booking details via URL params (simplified for mock)
    const checkIn = format(range.from, "yyyy-MM-dd");
    const checkOut = format(range.to, "yyyy-MM-dd");
    
    router.push(`/bookings/checkout/${stay.id}?checkIn=${checkIn}&checkOut=${checkOut}&guests=${guests.adults}-${guests.children}-${guests.infants}-${guests.pets}`);
  };

  const blockedDates = [
    new Date(2026, 3, 25),
    new Date(2026, 3, 26),
    new Date(2026, 4, 2),
    new Date(2026, 4, 3),
  ];

  return (
    <div className="container mx-auto max-w-7xl px-6 py-12">
      {/* Navigation */}
      <div className="mb-8 flex items-center justify-between">
        <Link href="/stays" className="group inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-muted-foreground hover:text-foreground transition-all">
          <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center group-hover:bg-primary/10 group-hover:text-primary transition-colors">
            <ChevronLeft className="h-4 w-4" />
          </div>
          Back to Explorations
        </Link>
        <div className="flex items-center gap-4">
           <Button variant="ghost" size="sm" className="rounded-full font-bold italic gap-2 h-10 px-4">
              <Share className="h-4 w-4" /> SHARE
           </Button>
           <Button variant="ghost" size="sm" className="rounded-full font-bold italic gap-2 h-10 px-4">
              <Heart className="h-4 w-4" /> SAVE
           </Button>
        </div>
      </div>

      {/* Header */}
      <div className="mb-10 space-y-4">
        <h1 className="text-4xl lg:text-6xl font-black italic tracking-tighter uppercase leading-none">{stay.title}</h1>
        <div className="flex flex-wrap items-center gap-6">
           <div className="flex items-center gap-2">
              <Star className="h-4 w-4 fill-primary text-primary" />
              <span className="text-sm font-black italic">{stay.rating}</span>
              <span className="text-sm font-bold text-muted-foreground underline decoration-dashed uppercase tracking-widest ml-1">{stay.reviews} REVIEWS</span>
           </div>
           <div className="flex items-center gap-2 text-sm font-bold text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span className="uppercase tracking-widest underline decoration-dashed">{stay.location}</span>
           </div>
           <Badge variant="outline" className="rounded-full border-2 font-black italic px-4 uppercase text-[10px] tracking-widest">
              {stay.type}
           </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-16 rounded-[3rem] overflow-hidden aspect-[21/9]">
        <div className="md:col-span-4 h-full relative group cursor-pointer">
           <Image 
             src={stay.images[0]} 
             fill
             className="object-cover transition-transform duration-700 group-hover:scale-105" 
             alt="Main"
             sizes="100vw"
             priority
           />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        <div className="lg:col-span-8 space-y-16">
           <div className="flex flex-wrap items-center gap-10">
              <div className="flex items-center gap-3">
                 <div className="h-12 w-12 rounded-2xl bg-muted flex items-center justify-center">
                    <Users className="h-6 w-6 text-primary" />
                 </div>
                 <div className="flex flex-col">
                    <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">CAPACITY</span>
                    <span className="text-lg font-black italic">{stay.guests} GUESTS</span>
                 </div>
              </div>
              <div className="flex items-center gap-3">
                 <div className="h-12 w-12 rounded-2xl bg-muted flex items-center justify-center">
                    <Bed className="h-6 w-6 text-primary" />
                 </div>
                 <div className="flex flex-col">
                    <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">BEDROOMS</span>
                    <span className="text-lg font-black italic">{stay.bedrooms} ROOMS</span>
                 </div>
              </div>
              <div className="flex items-center gap-3">
                 <div className="h-12 w-12 rounded-2xl bg-muted flex items-center justify-center">
                    <Bath className="h-6 w-6 text-primary" />
                 </div>
                 <div className="flex flex-col">
                    <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">BATHROOMS</span>
                    <span className="text-lg font-black italic">{stay.bathrooms} BATHS</span>
                 </div>
              </div>
           </div>
           <Separator className="border-dashed" />
           <div className="space-y-6">
              <h2 className="text-2xl font-black italic tracking-tight uppercase">EXPERIENCE THE SPACE</h2>
              <p className="text-lg text-muted-foreground font-medium italic leading-relaxed">
                 {stay.description}
              </p>
           </div>
        </div>

        <div className="lg:col-span-4">
           <div className="sticky top-32">
              <div className="rounded-[2.5rem] border bg-background p-8 shadow-2xl shadow-primary/5 space-y-8">
                 <div className="flex items-end justify-between">
                    <div className="flex items-baseline gap-1">
                       <span className="text-3xl font-black italic">${stay.pricePerNight}</span>
                       <span className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">/ NIGHT</span>
                    </div>
                 </div>

                 <div className="space-y-4">
                    <Dialog open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
                       <DialogTrigger 
                         render={
                           <div className="grid grid-cols-2 rounded-2xl border overflow-hidden cursor-pointer group">
                             <div className="flex flex-col p-4 text-left group-hover:bg-muted/50 transition-all border-r">
                                <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">CHECK-IN</span>
                                <span className="text-sm font-bold italic">{range?.from ? format(range.from, "MMM d, yyyy") : "Add date"}</span>
                             </div>
                             <div className="flex flex-col p-4 text-left group-hover:bg-muted/50 transition-all">
                                <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">CHECK-OUT</span>
                                <span className="text-sm font-bold italic">{range?.to ? format(range.to, "MMM d, yyyy") : "Add date"}</span>
                             </div>
                           </div>
                         }
                       />
                       <DialogContent className="sm:max-w-4xl p-0 overflow-hidden rounded-[3rem] border-none shadow-2xl">
                          <DialogHeader className="p-10 border-b border-dashed bg-muted/10">
                             <DialogTitle className="text-3xl font-black italic tracking-tighter uppercase">Selection Calendar</DialogTitle>
                          </DialogHeader>
                          <div className="p-10">
                             <BookingCalendar 
                                blockedDates={blockedDates} 
                                onRangeSelect={(r) => setRange(r)} 
                                className="mx-auto"
                             />
                          </div>
                          <div className="p-8 border-t bg-muted/5 flex justify-end gap-3">
                             <Button variant="ghost" className="rounded-full px-8 font-bold" onClick={() => { setRange(undefined); setIsCalendarOpen(false); }}>RESET</Button>
                             <Button className="rounded-full px-12 h-12 font-black italic shadow-xl" onClick={() => setIsCalendarOpen(false)}>APPLY SELECTION</Button>
                          </div>
                       </DialogContent>
                    </Dialog>

                    <GuestSelector 
                      maxGuests={stay.guests} 
                      onChange={(c) => setGuests(c)} 
                    />
                 </div>

                 <Button 
                   onClick={handleReserve}
                   disabled={!pricing}
                   className="w-full h-14 rounded-full font-black italic text-lg shadow-xl shadow-primary/20 disabled:opacity-50"
                 >
                    {pricing ? "RESERVE NOW" : "SELECT DATES"}
                 </Button>

                 <AnimatePresence>
                   {pricing && (
                     <motion.div 
                       initial={{ opacity: 0, height: 0 }}
                       animate={{ opacity: 1, height: "auto" }}
                       exit={{ opacity: 0, height: 0 }}
                       className="space-y-4 overflow-hidden"
                     >
                        <div className="space-y-3 pt-4">
                           <div className="flex justify-between text-sm">
                              <span className="text-muted-foreground underline decoration-dashed">{pricing.nights} nights at ${stay.pricePerNight}</span>
                              <span className="font-bold italic">${pricing.baseTotal}</span>
                           </div>
                           {pricing.weekendSurcharge > 0 && (
                             <div className="flex justify-between text-sm text-amber-600">
                                <span className="flex items-center gap-1.5 underline decoration-dashed decoration-amber-600/30">
                                   <Zap className="h-3 w-3" /> Weekend surcharge
                                </span>
                                <span className="font-black italic">+${pricing.weekendSurcharge}</span>
                             </div>
                           )}
                           {pricing.weeklyDiscount > 0 && (
                             <div className="flex justify-between text-sm text-emerald-600">
                                <span className="flex items-center gap-1.5 underline decoration-dashed decoration-emerald-600/30">
                                   <TrendingDown className="h-3 w-3" /> Weekly stay discount
                                </span>
                                <span className="font-black italic">-${pricing.weeklyDiscount}</span>
                             </div>
                           )}
                           <div className="flex justify-between text-sm">
                              <span className="text-muted-foreground underline decoration-dashed">Cleaning fee</span>
                              <span className="font-bold italic">${pricing.cleaningFee}</span>
                           </div>
                           <div className="flex justify-between text-sm">
                              <span className="text-muted-foreground underline decoration-dashed">Super-E Service fee</span>
                              <span className="font-bold italic">${pricing.serviceFee}</span>
                           </div>
                        </div>
                        <Separator className="border-dashed" />
                        <div className="flex justify-between items-end">
                           <div className="flex flex-col">
                              <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">TOTAL ESTIMATE</span>
                              <span className="text-3xl font-black italic tracking-tighter leading-none">${pricing.total}</span>
                           </div>
                        </div>
                     </motion.div>
                   )}
                 </AnimatePresence>

                 <div className="p-4 rounded-2xl bg-emerald-500/5 border border-emerald-500/20 flex gap-4">
                    <ShieldCheck className="h-5 w-5 text-emerald-600 shrink-0" />
                    <p className="text-[10px] font-bold text-emerald-700 leading-relaxed uppercase tracking-tight">
                       Protected by Super-E Guarantee.
                    </p>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
