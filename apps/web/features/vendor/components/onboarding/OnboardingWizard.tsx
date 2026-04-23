"use client";

import { useOnboardingStore } from "../../store/onboarding.store";
import { StepIndicator } from "./StepIndicator";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { BusinessInfo } from "./steps/BusinessInfo";
import { Branding } from "./steps/Branding";
import { Banking } from "./steps/Banking";
import { FirstProduct } from "./steps/FirstProduct";
import { Review } from "./steps/Review";

export function OnboardingWizard() {
  const { currentStep, nextStep, prevStep, data } = useOnboardingStore();

  const handleNext = () => {
    if (currentStep === 5) {
      // Simulate submission
      console.log("Onboarding Data:", data);
      window.location.href = "/vendor/dashboard";
      return;
    }
    nextStep();
  };

  return (
    <div className="mx-auto max-w-3xl w-full pt-10">
      <div className="mb-10 text-center text-balance space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">Set up your vendor store</h1>
        <p className="text-muted-foreground">Complete these steps to activate your seller account and start receiving orders.</p>
      </div>

      <StepIndicator />

      <Card className="mt-12">
        <CardContent className="pt-6 min-h-[400px] flex flex-col">
          <div className="flex-1">
            {currentStep === 1 && <BusinessInfo />}
            {currentStep === 2 && <Branding />}
            {currentStep === 3 && <Banking />}
            {currentStep === 4 && <FirstProduct />}
            {currentStep === 5 && <Review />}
          </div>

          <div className="mt-8 flex justify-between pt-4 border-t">
            <Button 
               variant="outline" 
               onClick={prevStep} 
               disabled={currentStep === 1}
            >
              Back
            </Button>
            <Button onClick={handleNext} disabled={currentStep === 5 && !data.agreedToTerms}>
              {currentStep === 5 ? "Submit Application" : "Continue"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
