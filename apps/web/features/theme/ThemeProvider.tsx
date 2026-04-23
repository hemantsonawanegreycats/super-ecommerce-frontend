"use client";

import { useEffect } from "react";
import { useThemeStore } from "./store";

/**
 * ThemeProvider — injects CSS custom properties into :root
 * based on the active ThemeConfig. Wrap any preview area with this.
 */
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const getActiveTheme = useThemeStore((s) => s.getActiveTheme);

  useEffect(() => {
    const theme = getActiveTheme();
    const root = document.documentElement;

    // Inject color CSS vars (HSL values)
    root.style.setProperty("--primary", theme.primary);
    root.style.setProperty("--background", theme.background);
    root.style.setProperty("--foreground", theme.foreground);
    root.style.setProperty("--muted", theme.muted);
    root.style.setProperty("--accent", theme.accent);
    root.style.setProperty("--border", theme.border);

    // Typography
    root.style.setProperty("--font-sans", theme.fontFamily);
    root.style.setProperty("--font-mono", theme.fontFamilyMono);

    // Radius
    root.style.setProperty("--radius", theme.radiusBase);

    return () => {
      // Reset to defaults on unmount
      root.style.removeProperty("--primary");
      root.style.removeProperty("--background");
      root.style.removeProperty("--foreground");
      root.style.removeProperty("--muted");
      root.style.removeProperty("--accent");
      root.style.removeProperty("--border");
      root.style.removeProperty("--font-sans");
      root.style.removeProperty("--font-mono");
      root.style.removeProperty("--radius");
    };
  }, [getActiveTheme]);

  return <>{children}</>;
}
