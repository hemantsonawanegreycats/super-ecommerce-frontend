import { create } from "zustand";

interface OnboardingState {
  currentStep: number;
  data: {
    businessName: string;
    businessType: string;
    storeName: string;
    storeSlug: string;
    themeColor: string;
    bankAccountName: string;
    bankAccountNumber: string;
    ifscCode: string;
    agreedToTerms: boolean;
  };
  setStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  updateData: (data: Partial<OnboardingState["data"]>) => void;
}

export const useOnboardingStore = create<OnboardingState>((set) => ({
  currentStep: 1,
  data: {
    businessName: "",
    businessType: "",
    storeName: "",
    storeSlug: "",
    themeColor: "#0ea5e9", // Default brand color
    bankAccountName: "",
    bankAccountNumber: "",
    ifscCode: "",
    agreedToTerms: false,
  },
  setStep: (step) => set({ currentStep: step }),
  nextStep: () => set((state) => ({ currentStep: Math.min(state.currentStep + 1, 5) })),
  prevStep: () => set((state) => ({ currentStep: Math.max(state.currentStep - 1, 1) })),
  updateData: (newData) => set((state) => ({ data: { ...state.data, ...newData } })),
}));
