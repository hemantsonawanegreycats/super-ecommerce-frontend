import { create } from "zustand";
import type { ExperimentDraft, WizardStep } from "./types";

interface ExperimentWizardStore {
  step: WizardStep;
  draft: ExperimentDraft;
  setStep: (step: WizardStep) => void;
  updateDraft: (updates: Partial<ExperimentDraft>) => void;
  reset: () => void;
}

const DEFAULT_DRAFT: ExperimentDraft = {
  name: "",
  description: "",
  targetUrl: "/",
  hypothesis: "",
  primaryMetric: "conversion_rate",
  trafficSplit: 50,
  variantBName: "Variant B",
  startDate: null,
  durationDays: 14,
};

export const useExperimentWizard = create<ExperimentWizardStore>((set) => ({
  step: "setup",
  draft: DEFAULT_DRAFT,
  setStep: (step) => set({ step }),
  updateDraft: (updates) => set((state) => ({ draft: { ...state.draft, ...updates } })),
  reset: () => set({ step: "setup", draft: DEFAULT_DRAFT }),
}));
