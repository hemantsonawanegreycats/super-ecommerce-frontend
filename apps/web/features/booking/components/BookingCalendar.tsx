"use client";

import * as React from "react";
import { addDays, isBefore, isSameDay, differenceInDays } from "date-fns";
import { DateRange } from "react-day-picker";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Info } from "lucide-react";

interface BookingCalendarProps {
  blockedDates?: Date[];
  minNights?: number;
  onRangeSelect?: (range: DateRange | undefined) => void;
  className?: string;
}

export function BookingCalendar({ 
  blockedDates = [], 
  minNights = 2,
  onRangeSelect,
  className 
}: BookingCalendarProps) {
  const [range, setRange] = React.useState<DateRange | undefined>();

  const isDateBlocked = (date: Date) => {
    return blockedDates.some(blockedDate => isSameDay(blockedDate, date)) || isBefore(date, new Date().setHours(0,0,0,0));
  };

  const handleSelect = (newRange: DateRange | undefined) => {
    setRange(newRange);
    onRangeSelect?.(newRange);
  };

  const nights = range?.from && range?.to ? differenceInDays(range.to, range.from) : 0;
  const isInvalidRange = nights > 0 && nights < minNights;

  return (
    <div className={cn("space-y-6", className)}>
      <div className="flex flex-col gap-4">
        <Calendar
          mode="range"
          selected={range}
          onSelect={handleSelect}
          disabled={isDateBlocked}
          numberOfMonths={2}
          className="rounded-[2rem] border bg-background p-6 shadow-2xl shadow-primary/5"
          classNames={{
            months: "flex flex-col md:flex-row gap-8",
            day: "h-12 w-12 text-sm font-bold transition-all",
            range_start: "bg-primary text-primary-foreground rounded-l-full",
            range_end: "bg-primary text-primary-foreground rounded-r-full",
            range_middle: "bg-primary/10 text-primary rounded-none",
            today: "bg-muted text-foreground font-black underline",
          }}
        />

        <div className="flex flex-wrap items-center justify-between px-2">
           <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                 <div className="h-3 w-3 rounded-full bg-primary" />
                 <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Selected</span>
              </div>
              <div className="flex items-center gap-2">
                 <div className="h-3 w-3 rounded-full bg-muted border" />
                 <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Blocked</span>
              </div>
           </div>

           {isInvalidRange && (
             <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-destructive/10 text-destructive animate-pulse">
                <Info className="h-3.5 w-3.5" />
                <span className="text-[10px] font-black uppercase tracking-widest">MINIMUM {minNights} NIGHTS REQUIRED</span>
             </div>
           )}
           
           {nights >= minNights && (
              <Badge variant="outline" className="rounded-full border-2 border-emerald-500/20 text-emerald-600 font-black italic px-4 uppercase tracking-widest">
                 {nights} NIGHTS SELECTED
              </Badge>
           )}
        </div>
      </div>
    </div>
  );
}
