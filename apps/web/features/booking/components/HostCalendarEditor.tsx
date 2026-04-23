"use client";

import * as React from "react";
import { format, isSameDay, isBefore } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Lock, 
  Unlock, 
  Calendar as CalendarIcon, 
  Save, 
  RefreshCw,
  Info,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export function HostCalendarEditor() {
  const [blockedDates, setBlockedDates] = React.useState<Date[]>([
    new Date(2026, 4, 10),
    new Date(2026, 4, 11),
    new Date(2026, 4, 15),
  ]);
  const [selectedDates, setSelectedDates] = React.useState<Date[] | undefined>([]);

  const toggleBlocked = () => {
    if (!selectedDates || selectedDates.length === 0) return;

    setBlockedDates(prev => {
      let next = [...prev];
      selectedDates.forEach(date => {
        const index = next.findIndex(d => isSameDay(d, date));
        if (index > -1) {
          next.splice(index, 1);
        } else {
          next.push(date);
        }
      });
      return next;
    });
    
    setSelectedDates([]);
    toast.success("Calendar availability updated");
  };

  const isDateBlocked = (date: Date) => {
    return blockedDates.some(d => isSameDay(d, date));
  };

  return (
    <div className="bg-background rounded-[3rem] border p-10 shadow-2xl shadow-primary/5 space-y-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
         <div className="space-y-1">
            <h2 className="text-3xl font-black italic tracking-tighter uppercase leading-none">Availability Editor</h2>
            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Select dates to toggle private blocking</p>
         </div>
         <div className="flex gap-3">
            <Button 
              variant="outline" 
              className="rounded-full font-black italic uppercase border-2 h-12 px-8 gap-2"
              onClick={() => setSelectedDates([])}
              disabled={!selectedDates?.length}
            >
               <RefreshCw className="h-4 w-4" /> Reset
            </Button>
            <Button 
              onClick={toggleBlocked}
              disabled={!selectedDates?.length}
              className="rounded-full font-black italic uppercase h-12 px-10 shadow-xl gap-2"
            >
               <Lock className="h-4 w-4" /> Toggle Status
            </Button>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Calendar Grid */}
        <div className="lg:col-span-8">
           <Calendar
             mode="multiple"
             selected={selectedDates}
             onSelect={setSelectedDates}
             numberOfMonths={2}
             className="rounded-[2.5rem] border-2 border-dashed p-8 bg-muted/5"
             classNames={{
               months: "flex flex-col md:flex-row gap-10",
               month: "space-y-6",
               caption: "flex justify-center pt-1 relative items-center mb-4",
               caption_label: "text-sm font-black italic uppercase tracking-[0.2em]",
               nav: "flex items-center",
               nav_button: "h-9 w-9 bg-transparent p-0 opacity-50 hover:opacity-100 transition-opacity",
               table: "w-full border-collapse space-y-1",
               head_row: "flex",
               head_cell: "text-muted-foreground rounded-md w-10 font-black text-[10px] uppercase tracking-widest",
               row: "flex w-full mt-2",
               cell: "relative p-0 text-center text-sm focus-within:relative focus-within:z-20",
               day: cn(
                 "h-10 w-10 p-0 font-bold italic transition-all rounded-xl",
                 "hover:bg-primary/10 hover:text-primary"
               ),
               day_selected: "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
               day_today: "bg-muted text-foreground underline font-black",
               day_outside: "text-muted-foreground opacity-50",
               day_disabled: "text-muted-foreground opacity-50",
             }}
             components={{
                Day: (props) => {
                  const { day } = props;
                  const blocked = isDateBlocked(day.date);
                  return (
                    <div {...props} className="relative">
                       {blocked && (
                         <div className="absolute top-0 right-0 h-2 w-2 rounded-full bg-destructive z-30 shadow-sm" />
                       )}
                       <div className={cn(
                         "h-10 w-10 flex items-center justify-center rounded-xl transition-all cursor-pointer",
                         blocked ? "bg-destructive/5 text-destructive border border-destructive/20 line-through opacity-50" : "hover:bg-primary/5"
                       )}>
                          {day.date.getDate()}
                       </div>
                    </div>
                  );
                }
             }}
           />
        </div>

        {/* Legend & Summary */}
        <div className="lg:col-span-4 space-y-8">
           <div className="p-8 rounded-[2rem] bg-muted/20 border-2 border-dashed space-y-6">
              <h3 className="text-xs font-black uppercase tracking-[0.2em] text-muted-foreground">Legend</h3>
              <div className="space-y-4">
                 <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                       <div className="h-4 w-4 rounded-lg bg-background border-2" />
                       <span className="text-[10px] font-black uppercase tracking-widest">Available</span>
                    </div>
                    <Badge variant="outline" className="text-[8px] font-bold">DEFAULT</Badge>
                 </div>
                 <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                       <div className="h-4 w-4 rounded-lg bg-destructive/10 border-2 border-destructive/20 relative">
                          <div className="absolute top-1 right-1 h-1 w-1 rounded-full bg-destructive" />
                       </div>
                       <span className="text-[10px] font-black uppercase tracking-widest text-destructive">Blocked</span>
                    </div>
                    <Badge className="bg-destructive/10 text-destructive text-[8px] font-bold border-none">MANUAL</Badge>
                 </div>
                 <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                       <div className="h-4 w-4 rounded-lg bg-primary shadow-lg shadow-primary/20" />
                       <span className="text-[10px] font-black uppercase tracking-widest text-primary">Selected</span>
                    </div>
                    <Badge className="bg-primary/10 text-primary text-[8px] font-bold border-none">ACTIVE</Badge>
                 </div>
              </div>
           </div>

           <div className="p-8 rounded-[2rem] bg-background border shadow-xl space-y-6">
              <div className="flex items-center gap-3">
                 <Info className="h-5 w-5 text-primary" />
                 <h4 className="text-[10px] font-black uppercase tracking-widest">Quick Tip</h4>
              </div>
              <p className="text-[11px] font-medium text-muted-foreground leading-relaxed uppercase">
                 Blocking dates prevents all guests from seeing your property as available. Use this for private maintenance or personal use.
              </p>
              <Separator className="border-dashed" />
              <div className="flex items-center justify-between">
                 <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Blocked Days</span>
                 <span className="text-lg font-black italic">{blockedDates.length}</span>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
