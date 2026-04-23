"use client";

import { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";

interface PriceRangeSliderProps {
  min?: number;
  max?: number;
  step?: number;
  value?: [number, number];
  onChange?: (range: [number, number]) => void;
}

export function PriceRangeSlider({
  min = 0,
  max = 500,
  step = 5,
  value,
  onChange,
}: PriceRangeSliderProps) {
  const [internal, setInternal] = useState<[number, number]>(value ?? [min, max]);
  const range = value ?? internal;

  const update = (next: [number, number]) => {
    setInternal(next);
    onChange?.(next);
  };

  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-sm">Price range</h3>

      <Slider
        min={min}
        max={max}
        step={step}
        value={range}
        onValueChange={(v) => {
          const arr = Array.isArray(v) ? v : [v];
          update([arr[0] ?? min, arr[1] ?? max] as [number, number]);
        }}
      />

      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">$</span>
          <Input
            type="number"
            value={range[0]}
            min={min}
            max={range[1]}
            onChange={(e) => update([Number(e.target.value) || 0, range[1]])}
            className="pl-6 h-9 text-sm"
          />
        </div>
        <span className="text-muted-foreground">–</span>
        <div className="relative flex-1">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">$</span>
          <Input
            type="number"
            value={range[1]}
            min={range[0]}
            max={max}
            onChange={(e) => update([range[0], Number(e.target.value) || max])}
            className="pl-6 h-9 text-sm"
          />
        </div>
      </div>
    </div>
  );
}
