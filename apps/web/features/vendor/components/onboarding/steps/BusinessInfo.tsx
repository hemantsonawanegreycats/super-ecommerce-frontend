"use client";

import { useOnboardingStore } from "../../../store/onboarding.store";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function BusinessInfo() {
  const { data, updateData } = useOnboardingStore();

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="businessName">Legal Business Name</Label>
          <Input 
            id="businessName" 
            placeholder="e.g. Acme Corp LLC" 
            value={data.businessName}
            onChange={(e) => updateData({ businessName: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="businessType">Business Type</Label>
          <select 
            id="businessType"
            className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            value={data.businessType}
            onChange={(e) => updateData({ businessType: e.target.value })}
          >
            <option value="">Select type...</option>
            <option value="individual">Individual / Sole Proprietorship</option>
            <option value="partnership">Partnership</option>
            <option value="corporation">Corporation</option>
            <option value="nonprofit">Non-profit</option>
          </select>
        </div>
      </div>
    </div>
  );
}
