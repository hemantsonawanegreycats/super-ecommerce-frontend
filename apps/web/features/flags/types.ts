export interface FeatureFlag {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  rolloutPercentage: number; // 0-100
  environment: "all" | "production" | "staging";
  createdAt: Date;
}

export interface ABExperiment {
  id: string;
  name: string;
  flagId: string;
  variantA: string;
  variantB: string;
  trafficSplit: number; // 0-100 (% going to variant B)
  status: "running" | "paused" | "completed";
  winner?: "A" | "B";
}
