import type { ThemeConfig } from "./types";

export const BUILT_IN_THEMES: Record<string, ThemeConfig> = {
  minimal: {
    id: "minimal",
    name: "Minimal Dawn",
    primary: "24 9.8% 10%",          // zinc-900
    background: "0 0% 100%",          // white
    foreground: "24 9.8% 10%",        // zinc-900
    muted: "60 4.8% 95.9%",           // stone-100
    accent: "60 4.8% 95.9%",
    border: "20 5.9% 90%",            // stone-200
    fontFamily: "'Inter', system-ui, sans-serif",
    fontFamilyMono: "'JetBrains Mono', monospace",
    radiusBase: "0.5rem",
    shadowStrength: "soft",
  },
  bold: {
    id: "bold",
    name: "Super-E Mono",
    primary: "0 0% 9%",               // zinc-950
    background: "0 0% 98%",           // near-white
    foreground: "0 0% 9%",
    muted: "0 0% 93%",
    accent: "0 0% 15%",
    border: "0 0% 89%",
    fontFamily: "'Geist', system-ui, sans-serif",
    fontFamilyMono: "'Geist Mono', monospace",
    radiusBase: "1rem",
    shadowStrength: "strong",
  },
  elegant: {
    id: "elegant",
    name: "Midnight Gold",
    primary: "45 93% 47%",            // amber-500
    background: "222 47% 11%",        // slate-900
    foreground: "210 40% 98%",        // slate-50
    muted: "217 33% 17%",             // slate-800
    accent: "45 93% 47%",             // amber-500
    border: "217 33% 22%",
    fontFamily: "'Cormorant Garamond', Georgia, serif",
    fontFamilyMono: "'JetBrains Mono', monospace",
    radiusBase: "0.75rem",
    shadowStrength: "medium",
  },
};

export const DEFAULT_THEME_ID = "bold";
