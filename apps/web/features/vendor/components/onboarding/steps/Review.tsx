"use client";

import { useOnboardingStore } from "../../../store/onboarding.store";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

export function Review() {
  const { data, updateData } = useOnboardingStore();

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-8 text-sm">
        <div className="space-y-4">
          <div>
            <p className="text-muted-foreground uppercase text-[10px] font-bold tracking-wider mb-1">Business</p>
            <p className="font-medium">{data.businessName || "Not provided"}</p>
            <p className="text-muted-foreground">{data.businessType}</p>
          </div>
          <div>
            <p className="text-muted-foreground uppercase text-[10px] font-bold tracking-wider mb-1">Store</p>
            <p className="font-medium">{data.storeName || "Not provided"}</p>
            <p className="text-muted-foreground font-mono">supere.com/{data.storeSlug}</p>
          </div>
        </div>
        <div className="space-y-4">
          <div>
            <p className="text-muted-foreground uppercase text-[10px] font-bold tracking-wider mb-1">Banking</p>
            <p className="font-medium">{data.bankAccountName || "Not provided"}</p>
            <p className="text-muted-foreground">Ending in {data.bankAccountNumber.slice(-4) || "...."}</p>
          </div>
          <div>
            <p className="text-muted-foreground uppercase text-[10px] font-bold tracking-wider mb-1">Brand Color</p>
            <div className="flex items-center gap-2 mt-1">
              <div className="h-4 w-4 rounded-full border" style={{ backgroundColor: data.themeColor }} />
              <span className="font-mono text-xs">{data.themeColor}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-10 pt-6 border-t space-y-4">
        <div className="flex items-start gap-3">
          <Checkbox 
            id="terms" 
            checked={data.agreedToTerms}
            onCheckedChange={(checked) => updateData({ agreedToTerms: checked === true })}
          />
          <Label htmlFor="terms" className="text-xs leading-relaxed text-muted-foreground">
            I agree to the Super-E Platform Seller Agreement and confirm that the information provided is accurate and complies with all local laws.
          </Label>
        </div>
      </div>
    </div>
  );
}
