"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface VariantOption {
  id: string;
  name: string;
  values: string[];
}

interface VariantSelectorProps {
  options: VariantOption[];
  onSelect?: (selections: Record<string, string>) => void;
}

export function VariantSelector({ options, onSelect }: VariantSelectorProps) {
  const [selections, setSelections] = useState<Record<string, string>>(() => {
    const defaultSelections: Record<string, string> = {};
    options.forEach(opt => {
        if(opt.values.length > 0) defaultSelections[opt.name] = opt.values[0];
    })
    return defaultSelections;
  });

  const handleSelect = (optionName: string, value: string) => {
    const next = { ...selections, [optionName]: value };
    setSelections(next);
    onSelect?.(next);
  };

  return (
    <div className="space-y-8">
      {options.map((option) => {
        const isColor = option.name.toLowerCase() === "color" || option.name.toLowerCase() === "colour";
        
        return (
          <div key={option.id} className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-sm font-bold tracking-wide uppercase text-foreground/70">
                {option.name}
              </label>
              <span className="text-sm font-medium text-primary bg-primary/5 px-2 py-0.5 rounded-md">
                {selections[option.name]}
              </span>
            </div>
            
            <div className="flex flex-wrap gap-3">
              {option.values.map((val) => {
                const isSelected = selections[option.name] === val;
                
                if (isColor) {
                  return (
                    <button
                      key={val}
                      onClick={() => handleSelect(option.name, val)}
                      className={cn(
                        "group relative h-10 w-10 rounded-full transition-all duration-300 ring-2 ring-offset-2",
                        isSelected ? "ring-primary scale-110" : "ring-transparent hover:ring-border hover:scale-105"
                      )}
                      aria-label={`Select ${val}`}
                    >
                      <div 
                        className="h-full w-full rounded-full border border-black/10 shadow-inner transition-transform group-hover:scale-95"
                        style={{ backgroundColor: val }}
                      />
                      {isSelected && (
                        <motion.div 
                          layoutId={`active-color-${option.id}`}
                          className="absolute -inset-1 rounded-full border border-primary pointer-events-none"
                        />
                      )}
                    </button>
                  );
                }

                return (
                  <button
                    key={val}
                    onClick={() => handleSelect(option.name, val)}
                    className={cn(
                      "relative min-w-[3.5rem] h-12 px-5 rounded-xl border-2 flex items-center justify-center text-sm font-bold transition-all duration-300",
                      isSelected
                        ? "border-primary bg-primary/5 text-primary"
                        : "border-border bg-background text-muted-foreground hover:border-primary/30 hover:text-foreground"
                    )}
                  >
                    {val}
                    {isSelected && (
                      <motion.div 
                        layoutId={`active-size-${option.id}`}
                        className="absolute inset-0 rounded-[10px] border border-primary pointer-events-none"
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
