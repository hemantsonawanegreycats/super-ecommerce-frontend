"use client";

import { useOnboardingStore } from "../../../store/onboarding.store";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function Branding() {
  const { data, updateData } = useOnboardingStore();

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="storeName">Store Display Name</Label>
          <Input 
            id="storeName" 
            placeholder="e.g. Acme Boutique" 
            value={data.storeName}
            onChange={(e) => updateData({ storeName: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="storeSlug">Store URL (Slug)</Label>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground whitespace-nowrap">supere.com/</span>
            <Input 
              id="storeSlug" 
              placeholder="acme-boutique" 
              value={data.storeSlug}
              onChange={(e) => updateData({ storeSlug: e.target.value.toLowerCase().replace(/\s+/g, '-') })}
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="themeColor">Brand Color</Label>
          <div className="flex gap-3 items-center">
            <input 
              id="themeColor"
              type="color" 
              className="h-10 w-20 rounded border bg-transparent p-1 cursor-pointer"
              value={data.themeColor}
              onChange={(e) => updateData({ themeColor: e.target.value })}
            />
            <span className="text-sm font-mono">{data.themeColor}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
