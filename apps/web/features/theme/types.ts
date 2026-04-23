export interface ThemeConfig {
  id: string;
  name: string;
  // Color tokens
  primary: string;
  background: string;
  foreground: string;
  muted: string;
  accent: string;
  border: string;
  // Typography
  fontFamily: string;
  fontFamilyMono: string;
  // Radii
  radiusBase: string; // e.g. "0.75rem"
  // Shadows
  shadowStrength: "none" | "soft" | "medium" | "strong";
}

export type BuiltInThemeId = "minimal" | "bold" | "elegant";
