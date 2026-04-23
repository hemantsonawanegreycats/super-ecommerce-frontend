import { create } from "zustand";
import { persist } from "zustand/middleware";
import { BUILT_IN_THEMES, DEFAULT_THEME_ID } from "./themes";
import type { ThemeConfig } from "./types";

interface ThemeStore {
  activeThemeId: string;
  customOverrides: Partial<ThemeConfig>;
  setTheme: (id: string) => void;
  setOverride: (key: keyof ThemeConfig, value: string) => void;
  resetOverrides: () => void;
  getActiveTheme: () => ThemeConfig;
}

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set, get) => ({
      activeThemeId: DEFAULT_THEME_ID,
      customOverrides: {},

      setTheme: (id) => set({ activeThemeId: id, customOverrides: {} }),

      setOverride: (key, value) =>
        set((state) => ({
          customOverrides: { ...state.customOverrides, [key]: value },
        })),

      resetOverrides: () => set({ customOverrides: {} }),

      getActiveTheme: () => {
        const { activeThemeId, customOverrides } = get();
        const base = BUILT_IN_THEMES[activeThemeId] ?? BUILT_IN_THEMES[DEFAULT_THEME_ID];
        return { ...base, ...customOverrides };
      },
    }),
    { name: "super-e-theme" }
  )
);
