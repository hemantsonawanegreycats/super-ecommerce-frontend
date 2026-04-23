"use client";

import { useOnboardingStore } from "../../../store/onboarding.store";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function Banking() {
  const { data, updateData } = useOnboardingStore();

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="bankAccountName">Account Holder Name</Label>
          <Input 
            id="bankAccountName" 
            placeholder="Name as per bank records" 
            value={data.bankAccountName}
            onChange={(e) => updateData({ bankAccountName: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="bankAccountNumber">Account Number</Label>
          <Input 
            id="bankAccountNumber" 
            placeholder="Enter your account number" 
            value={data.bankAccountNumber}
            onChange={(e) => updateData({ bankAccountNumber: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="ifscCode">IFSC / SWIFT Code</Label>
          <Input 
            id="ifscCode" 
            placeholder="Enter bank code" 
            value={data.ifscCode}
            onChange={(e) => updateData({ ifscCode: e.target.value.toUpperCase() })}
          />
        </div>
      </div>
    </div>
  );
}
