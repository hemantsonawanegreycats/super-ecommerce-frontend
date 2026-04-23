import { create } from "zustand";
import type { FileAsset } from "./types";

interface FileManagerStore {
  files: FileAsset[];
  selectedIds: string[];
  view: "grid" | "list";
  quota: { used: number; total: number };
  toggleSelect: (id: string) => void;
  selectAll: () => void;
  clearSelection: () => void;
  removeSelected: () => void;
  setView: (v: "grid" | "list") => void;
}

const MOCK_FILES: FileAsset[] = [
  { id: "1", name: "hero-banner.jpg", mimeType: "image/jpeg", sizeBytes: 1240000, url: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=400", createdAt: new Date("2026-04-01"), folder: null },
  { id: "2", name: "product-blanket.jpg", mimeType: "image/jpeg", sizeBytes: 980000, url: "https://images.unsplash.com/photo-1583845258933-289c09d57a9e?q=80&w=400", createdAt: new Date("2026-04-05"), folder: null },
  { id: "3", name: "lifestyle-shoot.jpg", mimeType: "image/jpeg", sizeBytes: 2100000, url: "https://images.unsplash.com/photo-1522770179533-24471fcdba45?q=80&w=400", createdAt: new Date("2026-04-08"), folder: "campaigns" },
  { id: "4", name: "brand-logo.png", mimeType: "image/png", sizeBytes: 45000, url: "https://images.unsplash.com/photo-1578749553836-3a560424678b?q=80&w=400", createdAt: new Date("2026-04-10"), folder: "branding" },
  { id: "5", name: "size-guide.pdf", mimeType: "application/pdf", sizeBytes: 320000, url: "#", createdAt: new Date("2026-04-12"), folder: null },
  { id: "6", name: "model-shot.jpg", mimeType: "image/jpeg", sizeBytes: 1600000, url: "https://images.unsplash.com/photo-1514734631336-db155a5b51c1?q=80&w=400", createdAt: new Date("2026-04-15"), folder: "campaigns" },
];

export const useFileManagerStore = create<FileManagerStore>((set, get) => ({
  files: MOCK_FILES,
  selectedIds: [],
  view: "grid",
  quota: {
    used: MOCK_FILES.reduce((acc, f) => acc + f.sizeBytes, 0) / 1_000_000,
    total: 1000,
  },

  toggleSelect: (id) =>
    set((state) => ({
      selectedIds: state.selectedIds.includes(id)
        ? state.selectedIds.filter(i => i !== id)
        : [...state.selectedIds, id],
    })),

  selectAll: () => set((state) => ({ selectedIds: state.files.map(f => f.id) })),

  clearSelection: () => set({ selectedIds: [] }),

  removeSelected: () =>
    set((state) => ({
      files: state.files.filter(f => !state.selectedIds.includes(f.id)),
      selectedIds: [],
    })),

  setView: (view) => set({ view }),
}));
