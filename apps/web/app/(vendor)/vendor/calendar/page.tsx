"use client";

import { HostCalendarEditor } from "@/features/booking/components/HostCalendarEditor";
import { Button } from "@/components/ui/button";
import { ChevronLeft, SlidersHorizontal, Settings2, Calendar as CalendarIcon } from "lucide-react";
import Link from "next/link";

export default function VendorCalendarPage() {
  return (
    <div className="container mx-auto max-w-7xl px-6 py-12">
      <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div className="space-y-4">
           <Link href="/vendor/dashboard" className="group inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground hover:text-foreground transition-all">
              <ChevronLeft className="h-3 w-3" /> Dashboard
           </Link>
           <div className="space-y-2">
              <h1 className="text-4xl lg:text-7xl font-black italic tracking-tighter uppercase leading-none">Master Schedule</h1>
              <p className="text-muted-foreground font-medium uppercase text-xs tracking-[0.2em]">Inventory control & global availability management</p>
           </div>
        </div>
        <div className="flex gap-3">
           <Button variant="outline" className="rounded-full font-black italic uppercase h-14 px-8 border-2 gap-2 shadow-xl shadow-primary/5">
              <Settings2 className="h-4 w-4" /> AUTO-SYNC
           </Button>
        </div>
      </div>

      <HostCalendarEditor />
      
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
         <div className="p-10 rounded-[3rem] bg-zinc-900 text-white space-y-6">
            <div className="flex items-center justify-between">
               <h3 className="text-2xl font-black italic uppercase tracking-tight">Sync iCal</h3>
               <div className="h-10 w-10 rounded-2xl bg-white/10 flex items-center justify-center">
                  <SlidersHorizontal className="h-5 w-5" />
               </div>
            </div>
            <p className="text-sm font-medium opacity-60 leading-relaxed uppercase tracking-tight">
               Keep your Super-E availability in sync with Airbnb, VRBO, or Google Calendar by importing your external calendar feed.
            </p>
            <Button className="bg-white text-black hover:bg-white/90 rounded-full font-black italic uppercase h-12 px-8">
               CONFIGURE SYNC
            </Button>
         </div>

         <div className="p-10 rounded-[3rem] border-2 border-dashed border-primary/20 space-y-6">
            <div className="flex items-center justify-between">
               <h3 className="text-2xl font-black italic uppercase tracking-tight text-primary">Bulk Blocking</h3>
               <div className="h-10 w-10 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                  <CalendarIcon className="h-5 w-5" />
               </div>
            </div>
            <p className="text-sm font-medium text-muted-foreground leading-relaxed uppercase tracking-tight">
               Need to block an entire season? Use our bulk tool to select custom date ranges and apply global status overrides.
            </p>
            <Button variant="outline" className="rounded-full border-2 font-black italic uppercase h-12 px-8">
               OPEN BULK TOOL
            </Button>
         </div>
      </div>
    </div>
  );
}
