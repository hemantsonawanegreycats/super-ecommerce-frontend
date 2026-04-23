"use client";

import { useOnboardingStore } from "../../store/onboarding.store";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

const STEPS = [
  "Business Info",
  "Store Branding",
  "Banking Details",
  "First Product",
  "Review",
];

export function StepIndicator() {
  const { currentStep } = useOnboardingStore();

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        {STEPS.map((step, index) => {
          const stepNumber = index + 1;
          const isCompleted = currentStep > stepNumber;
          const isCurrent = currentStep === stepNumber;

          return (
            <div key={step} className="flex flex-col items-center relative z-10">
              <div
                className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-full border-2 text-sm font-semibold transition-colors",
                  isCompleted
                    ? "border-primary bg-primary text-primary-foreground"
                    : isCurrent
                    ? "border-primary text-primary"
                    : "border-muted text-muted-foreground bg-background"
                )}
              >
                {isCompleted ? <Check className="h-4 w-4" /> : stepNumber}
              </div>
              <span
                className={cn(
                  "absolute -bottom-6 w-max text-xs font-medium",
                  isCurrent ? "text-foreground" : "text-muted-foreground"
                )}
              >
                {step}
              </span>
            </div>
          );
        })}
      </div>
      {/* Progress Bar Background */}
      <div className="relative -mt-[1.125rem] h-1 w-full bg-muted z-0 rounded-full">
        <div
          className="h-full bg-primary transition-all duration-300 rounded-full"
          style={{ width: `${((currentStep - 1) / (STEPS.length - 1)) * 100}%` }}
        />
      </div>
    </div>
  );
}
