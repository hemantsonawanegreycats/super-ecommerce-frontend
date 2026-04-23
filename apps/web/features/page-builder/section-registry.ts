import type { SectionDefinition, SectionType } from "./types";

export const SECTION_REGISTRY: Record<SectionType, SectionDefinition> = {
  hero: {
    type: "hero",
    label: "Hero Banner",
    icon: "LayoutTemplate",
    description: "Full-width hero with headline, subtext, and CTA button",
    defaultProps: {
      headline: "Elevate Your Lifestyle",
      subheadline: "Premium products curated for the discerning few.",
      ctaLabel: "Shop Now",
      ctaHref: "/search",
      imageUrl: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1200",
      layout: "center",
      overlayOpacity: 40,
    },
    propSchema: [
      { key: "headline", label: "Headline", type: "text", defaultValue: "Elevate Your Lifestyle" },
      { key: "subheadline", label: "Subheadline", type: "textarea", defaultValue: "" },
      { key: "ctaLabel", label: "Button Label", type: "text", defaultValue: "Shop Now" },
      { key: "ctaHref", label: "Button Link", type: "text", defaultValue: "/search" },
      { key: "imageUrl", label: "Background Image", type: "image", defaultValue: "" },
      {
        key: "layout",
        label: "Text Alignment",
        type: "select",
        defaultValue: "center",
        options: [
          { label: "Center", value: "center" },
          { label: "Left", value: "left" },
          { label: "Right", value: "right" },
        ],
      },
    ],
  },
  "product-grid": {
    type: "product-grid",
    label: "Product Grid",
    icon: "LayoutGrid",
    description: "Showcase a curated set of products in a responsive grid",
    defaultProps: { title: "Featured Products", columns: 4, showPrices: true, showBadges: true },
    propSchema: [
      { key: "title", label: "Section Title", type: "text", defaultValue: "Featured Products" },
      { key: "columns", label: "Columns", type: "number", defaultValue: 4 },
      { key: "showPrices", label: "Show Prices", type: "boolean", defaultValue: true },
    ],
  },
  banner: {
    type: "banner",
    label: "Promo Banner",
    icon: "Megaphone",
    description: "Announcement bar or promotional strip",
    defaultProps: { text: "Free shipping on orders over $100", bgColor: "#18181b", textColor: "#ffffff", link: "" },
    propSchema: [
      { key: "text", label: "Banner Text", type: "text", defaultValue: "" },
      { key: "bgColor", label: "Background Color", type: "color", defaultValue: "#18181b" },
      { key: "textColor", label: "Text Color", type: "color", defaultValue: "#ffffff" },
    ],
  },
  testimonials: {
    type: "testimonials",
    label: "Testimonials",
    icon: "Quote",
    description: "Social proof section with customer reviews",
    defaultProps: { title: "What Our Customers Say", layout: "grid" },
    propSchema: [
      { key: "title", label: "Section Title", type: "text", defaultValue: "What Our Customers Say" },
      {
        key: "layout",
        label: "Layout",
        type: "select",
        defaultValue: "grid",
        options: [
          { label: "Grid", value: "grid" },
          { label: "Carousel", value: "carousel" },
        ],
      },
    ],
  },
  "rich-text": {
    type: "rich-text",
    label: "Rich Text",
    icon: "FileText",
    description: "Free-form text content block with full formatting",
    defaultProps: { content: "<p>Add your content here.</p>", maxWidth: "prose" },
    propSchema: [
      { key: "content", label: "Content", type: "textarea", defaultValue: "" },
    ],
  },
  "image-gallery": {
    type: "image-gallery",
    label: "Image Gallery",
    icon: "Images",
    description: "Multi-image gallery with lightbox support",
    defaultProps: { title: "", columns: 3, images: [] },
    propSchema: [
      { key: "title", label: "Gallery Title", type: "text", defaultValue: "" },
      { key: "columns", label: "Columns", type: "number", defaultValue: 3 },
    ],
  },
  faq: {
    type: "faq",
    label: "FAQ Accordion",
    icon: "HelpCircle",
    description: "Frequently asked questions with collapsible answers",
    defaultProps: { title: "Frequently Asked Questions", items: [{ q: "Question?", a: "Answer." }] },
    propSchema: [
      { key: "title", label: "Section Title", type: "text", defaultValue: "FAQ" },
    ],
  },
  newsletter: {
    type: "newsletter",
    label: "Newsletter Signup",
    icon: "Mail",
    description: "Email capture form with a promotional headline",
    defaultProps: { headline: "Join the Inner Circle", placeholder: "Enter your email" },
    propSchema: [
      { key: "headline", label: "Headline", type: "text", defaultValue: "Join the Inner Circle" },
      { key: "placeholder", label: "Input Placeholder", type: "text", defaultValue: "Enter your email" },
    ],
  },
  spacer: {
    type: "spacer",
    label: "Spacer",
    icon: "AlignJustify",
    description: "Add vertical whitespace between sections",
    defaultProps: { height: 80 },
    propSchema: [
      { key: "height", label: "Height (px)", type: "number", defaultValue: 80 },
    ],
  },
};

export const SECTION_CATEGORIES = [
  { label: "Layout", types: ["hero", "banner", "spacer"] as SectionType[] },
  { label: "Commerce", types: ["product-grid"] as SectionType[] },
  { label: "Content", types: ["rich-text", "image-gallery", "faq", "newsletter"] as SectionType[] },
  { label: "Social", types: ["testimonials"] as SectionType[] },
];
