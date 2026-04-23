import type { StoreConfig } from "@/lib/tenant/store-context";

export interface VendorStore extends StoreConfig {
  role: "owner" | "staff";
  status: "live" | "draft" | "suspended";
  logoUrl?: string;
  createdAt: Date;
  revenueLast30Days?: number;
}
