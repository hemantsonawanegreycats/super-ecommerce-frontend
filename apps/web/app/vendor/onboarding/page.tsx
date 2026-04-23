import { OnboardingWizard } from "@/features/vendor/components/onboarding/OnboardingWizard";

export default function VendorOnboardingPage() {
  // Overrides standard layout if needed, but since it relies on VendorLayout, 
  // we could optionally force fullscreen. For now, render inside layout.
  return <OnboardingWizard />;
}
