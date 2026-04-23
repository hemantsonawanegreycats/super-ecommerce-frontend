import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { FeatureFlag, ABExperiment } from "./types";

const DEFAULT_FLAGS: FeatureFlag[] = [
  { id: "new_checkout_flow", name: "New Checkout Flow", description: "Enables the streamlined 3-step checkout (v2)", enabled: false, rolloutPercentage: 0, environment: "all", createdAt: new Date("2026-04-01") },
  { id: "ai_product_descriptions", name: "AI Product Descriptions", description: "Auto-generate product copy with AI", enabled: true, rolloutPercentage: 100, environment: "all", createdAt: new Date("2026-04-05") },
  { id: "new_search_ui", name: "Redesigned Search UI", description: "New faceted search experience with filter heatmaps", enabled: true, rolloutPercentage: 50, environment: "staging", createdAt: new Date("2026-04-10") },
  { id: "instant_booking", name: "Instant Booking", description: "Skip host confirmation for qualifying stays", enabled: false, rolloutPercentage: 0, environment: "production", createdAt: new Date("2026-04-15") },
  { id: "dark_mode_v2", name: "Dark Mode V2", description: "Redesigned dark mode with improved contrast ratios", enabled: false, rolloutPercentage: 25, environment: "all", createdAt: new Date("2026-04-18") },
];

const DEFAULT_EXPERIMENTS: ABExperiment[] = [
  { id: "exp-1", name: "Hero CTA Button Color", flagId: "new_checkout_flow", variantA: "Black CTA", variantB: "Primary CTA", trafficSplit: 50, status: "running" },
  { id: "exp-2", name: "PDP Layout", flagId: "new_search_ui", variantA: "Gallery Left", variantB: "Gallery Right", trafficSplit: 40, status: "paused", winner: "A" },
];

interface FlagStore {
  flags: FeatureFlag[];
  experiments: ABExperiment[];
  isEnabled: (flagId: string) => boolean;
  toggleFlag: (id: string) => void;
  setRollout: (id: string, pct: number) => void;
}

export const useFlagStore = create<FlagStore>()(
  persist(
    (set, get) => ({
      flags: DEFAULT_FLAGS,
      experiments: DEFAULT_EXPERIMENTS,

      isEnabled: (flagId) => {
        const flag = get().flags.find(f => f.id === flagId);
        return flag?.enabled ?? false;
      },

      toggleFlag: (id) =>
        set((state) => ({
          flags: state.flags.map(f => f.id === id ? { ...f, enabled: !f.enabled } : f),
        })),

      setRollout: (id, pct) =>
        set((state) => ({
          flags: state.flags.map(f => f.id === id ? { ...f, rolloutPercentage: pct } : f),
        })),
    }),
    { name: "super-e-flags" }
  )
);
