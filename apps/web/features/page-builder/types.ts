// Section types for the page builder
export type SectionType =
  | "hero"
  | "product-grid"
  | "banner"
  | "testimonials"
  | "rich-text"
  | "image-gallery"
  | "faq"
  | "newsletter"
  | "spacer";

export interface SectionProp {
  key: string;
  label: string;
  type: "text" | "textarea" | "image" | "color" | "number" | "boolean" | "select";
  defaultValue: unknown;
  options?: { label: string; value: string }[];
}

export interface SectionDefinition {
  type: SectionType;
  label: string;
  icon: string; // lucide icon name
  description: string;
  defaultProps: Record<string, unknown>;
  propSchema: SectionProp[];
}

export interface Section {
  id: string;
  type: SectionType;
  props: Record<string, unknown>;
}

export interface PageBuilderState {
  sections: Section[];
  selectedSectionId: string | null;
  isDragging: boolean;
  previewDevice: "desktop" | "tablet" | "mobile";
  publishStatus: "draft" | "published";
  lastSavedAt: Date | null;
}
