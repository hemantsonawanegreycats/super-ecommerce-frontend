"use client";

import { useState, useEffect } from "react";
import { Plus, Minus, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

export interface GuestCount {
  adults: number;
  children: number;
  infants: number;
  pets: number;
}

interface GuestSelectorProps {
  maxGuests?: number;
  onChange?: (counts: GuestCount) => void;
  className?: string;
}

export function GuestSelector({ 
  maxGuests = 10, 
  onChange,
  className 
}: GuestSelectorProps) {
  const [counts, setCounts] = useState<GuestCount>({
    adults: 1,
    children: 0,
    infants: 0,
    pets: 0
  });

  const updateCount = (type: keyof GuestCount, delta: number) => {
    setCounts(prev => {
      const newCounts = { ...prev, [type]: Math.max(0, prev[type] + delta) };
      
      // Minimum 1 adult if there are any guests
      if (type === "adults" && newCounts.adults === 0 && (newCounts.children > 0 || newCounts.infants > 0)) {
        newCounts.adults = 1;
      }
      
      // Ensure total guests doesn't exceed maxGuests
      const totalGuests = newCounts.adults + newCounts.children;
      if (totalGuests > maxGuests) return prev;
      
      return newCounts;
    });
  };

  useEffect(() => {
    onChange?.(counts);
  }, [counts, onChange]);

  const totalGuests = counts.adults + counts.children;
  const summary = [
    `${totalGuests} guest${totalGuests !== 1 ? "s" : ""}`,
    counts.infants > 0 ? `${counts.infants} infant${counts.infants !== 1 ? "s" : ""}` : null,
    counts.pets > 0 ? `${counts.pets} pet${counts.pets !== 1 ? "s" : ""}` : null,
  ].filter(Boolean).join(", ");

  return (
    <Popover>
      <PopoverTrigger 
        render={
          <button className={cn("w-full flex items-center justify-between p-4 rounded-2xl border text-left hover:bg-muted/50 transition-all", className)}>
             <div className="flex flex-col">
                <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">GUESTS</span>
                <span className="text-sm font-bold italic">{summary}</span>
             </div>
             <Users className="h-4 w-4 text-muted-foreground" />
          </button>
        }
      />
      <PopoverContent className="w-80 p-6 rounded-[2rem] shadow-2xl border-none" align="end">
        <div className="space-y-6">
           <Counter 
              label="Adults" 
              sublabel="Ages 13 or above" 
              value={counts.adults} 
              onIncrement={() => updateCount("adults", 1)} 
              onDecrement={() => updateCount("adults", -1)}
              min={1}
           />
           <Counter 
              label="Children" 
              sublabel="Ages 2–12" 
              value={counts.children} 
              onIncrement={() => updateCount("children", 1)} 
              onDecrement={() => updateCount("children", -1)}
           />
           <Counter 
              label="Infants" 
              sublabel="Under 2" 
              value={counts.infants} 
              onIncrement={() => updateCount("infants", 1)} 
              onDecrement={() => updateCount("infants", -1)}
           />
           <Counter 
              label="Pets" 
              sublabel="Bringing a service animal?" 
              value={counts.pets} 
              onIncrement={() => updateCount("pets", 1)} 
              onDecrement={() => updateCount("pets", -1)}
           />
           
           <div className="pt-4 border-t border-dashed">
              <p className="text-[10px] font-medium text-muted-foreground leading-relaxed uppercase">
                 This property allows a maximum of <span className="font-black text-foreground">{maxGuests} guests</span>. Infants don&apos;t count toward the guest limit.
              </p>
           </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}

function Counter({ 
  label, 
  sublabel, 
  value, 
  onIncrement, 
  onDecrement,
  min = 0 
}: { 
  label: string; 
  sublabel: string; 
  value: number; 
  onIncrement: () => void; 
  onDecrement: () => void;
  min?: number;
}) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-col">
        <span className="font-black italic text-sm uppercase tracking-tight">{label}</span>
        <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-widest">{sublabel}</span>
      </div>
      <div className="flex items-center gap-4">
        <Button 
          variant="outline" 
          size="icon" 
          className="h-8 w-8 rounded-full border-2" 
          onClick={onDecrement}
          disabled={value <= min}
        >
          <Minus className="h-3 w-3" />
        </Button>
        <span className="w-4 text-center font-black italic">{value}</span>
        <Button 
          variant="outline" 
          size="icon" 
          className="h-8 w-8 rounded-full border-2" 
          onClick={onIncrement}
        >
          <Plus className="h-3 w-3" />
        </Button>
      </div>
    </div>
  );
}
