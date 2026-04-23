import type { VendorStore } from "./types";

export const MOCK_VENDOR_STORES: VendorStore[] = [
  {
    id: "store-1",
    name: "SleepWell Co.",
    slug: "sleepwell",
    domain: "sleepwell.com",
    role: "owner",
    status: "live",
    createdAt: new Date("2026-01-15"),
    revenueLast30Days: 14250.00,
    theme: {
      primary: "zinc-950",
      radius: "0.5rem",
      font: "inter",
    },
  },
  {
    id: "store-2",
    name: "Luxe Bedding",
    slug: "luxe-bedding",
    role: "owner",
    status: "draft",
    createdAt: new Date("2026-03-22"),
    revenueLast30Days: 0,
    theme: {
      primary: "amber-500",
      radius: "0",
      font: "serif",
    },
  },
  {
    id: "store-3",
    name: "Camping Gear Pros",
    slug: "camping-gear",
    domain: "campgearpros.com",
    role: "staff",
    status: "live",
    createdAt: new Date("2025-11-04"),
    revenueLast30Days: 8400.50,
    logoUrl: "https://images.unsplash.com/photo-1504280390224-e2a2225a0720?q=80&w=100&h=100&fit=crop",
    theme: {
      primary: "emerald-600",
      radius: "1rem",
      font: "sans",
    },
  },
];
