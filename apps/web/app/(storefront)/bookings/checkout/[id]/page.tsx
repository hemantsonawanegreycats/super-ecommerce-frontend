"use client";

import { use, useState, useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { 
  ChevronLeft, 
  CreditCard, 
  Lock, 
  Calendar, 
  Users, 
  Star,
  ShieldCheck,
  Zap,
  TrendingDown
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { MOCK_STAYS } from "@/features/booking/data/mock-stays";
import { format, differenceInDays, parseISO, eachDayOfInterval, isWeekend } from "date-fns";

export default function BookingCheckoutPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const searchParams = useSearchParams();
  const router = useRouter();
  const stay = MOCK_STAYS.find(s => s.id === id) || MOCK_STAYS[0];

  const checkIn = searchParams.get("checkIn");
  const checkOut = searchParams.get("checkOut");
  const guestData = searchParams.get("guests")?.split("-") || ["1", "0", "0", "0"];
  
  const guestCounts = {
    adults: parseInt(guestData[0]),
    children: parseInt(guestData[1]),
    infants: parseInt(guestData[2]),
    pets: parseInt(guestData[3]),
  };

  const pricing = useMemo(() => {
    if (!checkIn || !checkOut) return null;
    const from = parseISO(checkIn);
    const to = parseISO(checkOut);
    const nights = differenceInDays(to, from);
    const days = eachDayOfInterval({ start: from, end: to });
    const stayDays = days.slice(0, -1);

    let baseTotal = 0;
    let weekendSurcharge = 0;
    stayDays.forEach(day => {
      baseTotal += stay.pricePerNight;
      if (isWeekend(day)) weekendSurcharge += 80;
    });

    const weeklyDiscount = nights >= 7 ? Math.round(baseTotal * 0.1) : 0;
    const subtotal = baseTotal + weekendSurcharge - weeklyDiscount;
    const cleaningFee = 150;
    const serviceFee = Math.round(subtotal * 0.12);
    const total = subtotal + cleaningFee + serviceFee;

    return { nights, baseTotal, weekendSurcharge, weeklyDiscount, subtotal, cleaningFee, serviceFee, total };
  }, [checkIn, checkOut, stay.pricePerNight]);

  if (!pricing) return <div>Invalid Selection</div>;

  return (
    <div className="container mx-auto max-w-7xl px-6 py-12">
      <div className="mb-12">
        <Link href={`/stays/${stay.id}`} className="group inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-muted-foreground hover:text-foreground transition-all">
          <ChevronLeft className="h-4 w-4" />
          Modify Selection
        </Link>
        <h1 className="mt-4 text-4xl lg:text-5xl font-black italic tracking-tighter uppercase leading-none">Confirm and Pay</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
        {/* Left: Payment & Details */}
        <div className="lg:col-span-7 space-y-16">
           {/* Section 1: Your Trip */}
           <section className="space-y-8">
              <div className="flex items-center justify-between">
                 <h2 className="text-2xl font-black italic tracking-tight uppercase">Your Trip</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 <div className="space-y-2">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">DATES</span>
                    <p className="text-lg font-black italic">{format(parseISO(checkIn!), "MMM d")} – {format(parseISO(checkOut!), "MMM d, yyyy")}</p>
                 </div>
                 <div className="space-y-2">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">GUESTS</span>
                    <p className="text-lg font-black italic">{guestCounts.adults + guestCounts.children} guests{guestCounts.infants > 0 ? `, ${guestCounts.infants} infants` : ""}</p>
                 </div>
              </div>
           </section>

           <Separator className="border-dashed" />

           {/* Section 2: Payment Method */}
           <section className="space-y-8">
              <div className="flex items-center justify-between">
                 <h2 className="text-2xl font-black italic tracking-tight uppercase">Payment</h2>
                 <div className="flex gap-2">
                    <div className="h-6 w-10 bg-muted rounded border border-primary/20" />
                    <div className="h-6 w-10 bg-muted rounded border border-primary/20" />
                 </div>
              </div>
              
              <div className="space-y-4">
                 <div className="relative">
                    <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input className="pl-12 h-14 rounded-2xl border-2 font-bold" placeholder="Card number" defaultValue="4242 4242 4242 4242" />
                 </div>
                 <div className="grid grid-cols-2 gap-4">
                    <Input className="h-14 rounded-2xl border-2 font-bold" placeholder="Expiration" defaultValue="12/28" />
                    <Input className="h-14 rounded-2xl border-2 font-bold" placeholder="CVV" defaultValue="123" />
                 </div>
              </div>
           </section>

           <Separator className="border-dashed" />

           {/* Section 3: Policies */}
           <section className="space-y-6">
              <h2 className="text-2xl font-black italic tracking-tight uppercase">Cancellation Policy</h2>
              <p className="text-sm text-muted-foreground leading-relaxed font-medium">
                 Free cancellation before {format(parseISO(checkIn!), "MMM d")}. After that, the reservation is non-refundable. By selecting the button below, I agree to the <span className="text-foreground underline font-bold">House Rules</span> and <span className="text-foreground underline font-bold">Ground Rules</span> for guests.
              </p>
           </section>

           <Button 
             onClick={() => router.push(`/bookings/success/${stay.id}`)}
             className="w-full md:w-auto h-16 px-16 rounded-full font-black italic text-xl shadow-2xl shadow-primary/20"
           >
              CONFIRM BOOKING
           </Button>
        </div>

        {/* Right: Booking Summary Card */}
        <div className="lg:col-span-5">
           <div className="sticky top-32 rounded-[3rem] border bg-background p-8 shadow-2xl shadow-primary/5 space-y-8">
              <div className="flex gap-6">
                 <img src={stay.images[0]} className="h-28 w-28 rounded-3xl object-cover shadow-xl border-2 border-white" alt="Stay" />
                 <div className="flex flex-col justify-center gap-1">
                    <Badge variant="outline" className="w-fit text-[8px] font-black italic uppercase tracking-widest px-3">{stay.type}</Badge>
                    <h3 className="text-xl font-black italic tracking-tight uppercase leading-none">{stay.title}</h3>
                    <div className="flex items-center gap-1.5 mt-1">
                       <Star className="h-3 w-3 fill-primary text-primary" />
                       <span className="text-xs font-black italic">{stay.rating}</span>
                       <span className="text-[10px] font-bold text-muted-foreground uppercase ml-1">({stay.reviews} reviews)</span>
                    </div>
                 </div>
              </div>

              <Separator className="border-dashed" />

              <div className="space-y-6">
                 <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Price details</h4>
                 <div className="space-y-4">
                    <div className="flex justify-between text-sm">
                       <span className="text-muted-foreground font-medium underline decoration-dashed italic">${stay.pricePerNight} x {pricing.nights} nights</span>
                       <span className="font-black italic">${pricing.baseTotal}</span>
                    </div>
                    {pricing.weekendSurcharge > 0 && (
                      <div className="flex justify-between text-sm text-amber-600">
                         <span className="flex items-center gap-1.5 underline decoration-dashed decoration-amber-600/30 italic font-medium">
                            <Zap className="h-3 w-3" /> Weekend surcharge
                         </span>
                         <span className="font-black italic">+${pricing.weekendSurcharge}</span>
                      </div>
                    )}
                    {pricing.weeklyDiscount > 0 && (
                      <div className="flex justify-between text-sm text-emerald-600">
                         <span className="flex items-center gap-1.5 underline decoration-dashed decoration-emerald-600/30 italic font-medium">
                            <TrendingDown className="h-3 w-3" /> Weekly stay discount
                         </span>
                         <span className="font-black italic">-${pricing.weeklyDiscount}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-sm">
                       <span className="text-muted-foreground font-medium underline decoration-dashed italic">Cleaning fee</span>
                       <span className="font-black italic">${pricing.cleaningFee}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                       <span className="text-muted-foreground font-medium underline decoration-dashed italic">Super-E Service fee</span>
                       <span className="font-black italic">${pricing.serviceFee}</span>
                    </div>
                 </div>
                 
                 <Separator className="border-dashed" />
                 
                 <div className="flex justify-between items-end">
                    <div className="flex flex-col">
                       <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">TOTAL (USD)</span>
                       <span className="text-4xl font-black italic tracking-tighter leading-none">${pricing.total}</span>
                    </div>
                 </div>
              </div>

              <div className="p-6 rounded-[2rem] bg-muted/30 border-2 border-dashed flex items-start gap-4">
                 <ShieldCheck className="h-6 w-6 text-primary shrink-0 mt-1" />
                 <div className="space-y-1">
                    <p className="text-[10px] font-black uppercase tracking-widest leading-normal">Super-E Protection</p>
                    <p className="text-[10px] font-medium text-muted-foreground leading-relaxed uppercase">
                       Your payment is securely processed and held until check-in.
                    </p>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
