"use client";

import { useEffect } from "react";
import { useStore } from "./use-store";

/**
 * Injects dynamic CSS variables into the :root based on the current store's theme config.
 */
export function ThemeInjector() {
  const { store } = useStore();

  useEffect(() => {
    if (!store?.theme) return;

    const root = document.documentElement;
    // Map theme settings to CSS variables
    // For OKLCH colors, we'd need a converter or expect the value to be valid okLCH string.
    if (store.theme.primary) {
      root.style.setProperty("--primary", store.theme.primary);
      // Generate --primary-foreground etc if needed based on contrast.
    }
    if (store.theme.radius) {
      root.style.setProperty("--radius", store.theme.radius);
    }
    
    // Apply layout-level font class if needed
  }, [store?.theme]);

  // Render nothing visually
  return null;
}
