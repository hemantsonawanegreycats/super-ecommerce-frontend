export interface ExperimentDraft {
  name: string;
  description: string;
  targetUrl: string;
  hypothesis: string;
  primaryMetric: "conversion_rate" | "click_through_rate" | "bounce_rate" | "revenue_per_visitor";
  trafficSplit: number; // Percentage sent to Variant B (1-99)
  variantBName: string;
  startDate: Date | null;
  durationDays: number;
}

export type WizardStep = "setup" | "variations" | "targeting" | "schedule" | "review";
