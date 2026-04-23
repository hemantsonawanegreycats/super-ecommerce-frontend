import { create } from "zustand";
import { temporal } from "zundo";
import type { Section, PageBuilderState, SectionType } from "./types";
import { SECTION_REGISTRY } from "./section-registry";

interface PageBuilderStore extends PageBuilderState {
  // Section management
  addSection: (type: SectionType, atIndex?: number) => void;
  removeSection: (id: string) => void;
  moveSection: (fromIndex: number, toIndex: number) => void;
  updateSectionProp: (id: string, key: string, value: unknown) => void;
  duplicateSection: (id: string) => void;

  // Selection
  selectSection: (id: string | null) => void;

  // UI state
  setPreviewDevice: (device: PageBuilderState["previewDevice"]) => void;
  setIsDragging: (v: boolean) => void;

  // Publishing
  setPublishStatus: (status: PageBuilderState["publishStatus"]) => void;
  save: () => void;
}

export const usePageBuilderStore = create<PageBuilderStore>()(
  temporal(
    (set, get) => ({
      sections: [
        {
          id: "default-hero",
          type: "hero",
          props: { ...SECTION_REGISTRY["hero"].defaultProps },
        },
        {
          id: "default-products",
          type: "product-grid",
          props: { ...SECTION_REGISTRY["product-grid"].defaultProps },
        },
      ],
      selectedSectionId: null,
      isDragging: false,
      previewDevice: "desktop",
      publishStatus: "draft",
      lastSavedAt: null,

      addSection: (type, atIndex) => {
        const def = SECTION_REGISTRY[type];
        const newSection: Section = {
          id: `section-${Date.now()}`,
          type,
          props: { ...def.defaultProps },
        };
        set((state) => {
          const sections = [...state.sections];
          if (atIndex !== undefined) {
            sections.splice(atIndex, 0, newSection);
          } else {
            sections.push(newSection);
          }
          return { sections, selectedSectionId: newSection.id };
        });
      },

      removeSection: (id) =>
        set((state) => ({
          sections: state.sections.filter((s) => s.id !== id),
          selectedSectionId: state.selectedSectionId === id ? null : state.selectedSectionId,
        })),

      moveSection: (fromIndex, toIndex) =>
        set((state) => {
          const sections = [...state.sections];
          const [removed] = sections.splice(fromIndex, 1);
          sections.splice(toIndex, 0, removed);
          return { sections };
        }),

      updateSectionProp: (id, key, value) =>
        set((state) => ({
          sections: state.sections.map((s) =>
            s.id === id ? { ...s, props: { ...s.props, [key]: value } } : s
          ),
        })),

      duplicateSection: (id) =>
        set((state) => {
          const idx = state.sections.findIndex((s) => s.id === id);
          if (idx === -1) return state;
          const original = state.sections[idx];
          const copy: Section = { ...original, id: `section-${Date.now()}`, props: { ...original.props } };
          const sections = [...state.sections];
          sections.splice(idx + 1, 0, copy);
          return { sections, selectedSectionId: copy.id };
        }),

      selectSection: (id) => set({ selectedSectionId: id }),

      setPreviewDevice: (previewDevice) => set({ previewDevice }),

      setIsDragging: (isDragging) => set({ isDragging }),

      setPublishStatus: (publishStatus) => set({ publishStatus }),

      save: () => set({ lastSavedAt: new Date() }),
    }),
    {
      // Only track section mutations in undo history, not UI state
      partialize: (state) => ({ sections: state.sections }),
    }
  )
);

// Expose temporal store for undo/redo
export const useTemporalStore = () =>
  usePageBuilderStore.temporal;
