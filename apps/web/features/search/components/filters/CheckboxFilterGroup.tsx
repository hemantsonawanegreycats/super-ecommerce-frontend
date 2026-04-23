"use client";

import { cn } from "@/lib/utils";

interface CheckboxOption {
  label: string;
  count: number;
  value: string;
}

interface CheckboxFilterGroupProps {
  title: string;
  options: CheckboxOption[];
  selectedValues: string[];
  onToggle: (value: string) => void;
}

export function CheckboxFilterGroup({ 
  title, 
  options, 
  selectedValues, 
  onToggle 
}: CheckboxFilterGroupProps) {
  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-sm">{title}</h3>
      <div className="space-y-3">
        {options.map((opt) => {
          const isChecked = selectedValues.includes(opt.value);
          
          return (
            <label 
              key={opt.value} 
              className="flex items-center space-x-3 cursor-pointer group"
            >
              <div className="relative flex items-center justify-center">
                <input 
                  type="checkbox" 
                  checked={isChecked}
                  onChange={() => onToggle(opt.value)}
                  className={cn(
                    "peer h-4 w-4 shrink-0 rounded-sm border border-input focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 appearance-none bg-background transition-colors cursor-pointer",
                    isChecked ? "bg-primary border-primary" : "hover:border-primary/50"
                  )}
                />
                <svg 
                  className={cn(
                    "absolute w-3 h-3 text-primary-foreground pointer-events-none transition-opacity",
                    isChecked ? "opacity-100" : "opacity-0"
                  )} 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor" 
                  strokeWidth={3}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className={cn(
                "text-sm transition-colors cursor-pointer",
                isChecked ? "font-medium text-foreground" : "text-muted-foreground group-hover:text-foreground"
              )}>
                {opt.label}
              </span>
              <span className="text-xs text-muted-foreground/60 group-hover:text-muted-foreground transition-colors ml-auto">
                ({opt.count})
              </span>
            </label>
          );
        })}
      </div>
    </div>
  );
}
