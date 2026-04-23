"use client";

import { useState } from "react";
import { Check, Loader2, Tag, X } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface AppliedCoupon {
  code: string;
  amount: number; // percentage off (0-100)
}

const VALID_CODES: Record<string, number> = {
  WELCOME10: 10,
  SUPER20: 20,
  LAUNCH25: 25,
};

interface CouponInputProps {
  onApply?: (coupon: AppliedCoupon | null) => void;
}

export function CouponInput({ onApply }: CouponInputProps) {
  const [code, setCode] = useState("");
  const [applied, setApplied] = useState<AppliedCoupon | null>(null);
  const [loading, setLoading] = useState(false);

  const apply = async () => {
    if (!code.trim()) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 500));
    const upper = code.trim().toUpperCase();
    const amount = VALID_CODES[upper];
    setLoading(false);
    if (!amount) {
      toast.error("Invalid code", { description: "This promo code is not recognized." });
      return;
    }
    const coupon = { code: upper, amount };
    setApplied(coupon);
    onApply?.(coupon);
    setCode("");
    toast.success(`${amount}% discount applied!`);
  };

  const remove = () => {
    setApplied(null);
    onApply?.(null);
  };

  if (applied) {
    return (
      <div className="flex items-center justify-between gap-2 rounded-md border border-emerald-500/30 bg-emerald-500/5 px-3 py-2">
        <div className="flex items-center gap-2 text-sm">
          <div className="rounded-full bg-emerald-500 p-0.5 text-white">
            <Check className="h-3 w-3" />
          </div>
          <span className="font-semibold text-emerald-700">{applied.code}</span>
          <span className="text-xs text-emerald-700/80">— {applied.amount}% off</span>
        </div>
        <button
          type="button"
          onClick={remove}
          className="text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Remove coupon"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    );
  }

  return (
    <div className="flex gap-2">
      <div className="relative flex-1">
        <Tag className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Promo code"
          className={cn("pl-9 uppercase")}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              apply();
            }
          }}
        />
      </div>
      <Button type="button" variant="outline" onClick={apply} disabled={!code.trim() || loading}>
        {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Apply"}
      </Button>
    </div>
  );
}
