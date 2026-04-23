import type { BlogPost, StaticPage, HelpArticle } from "./types";

export const MOCK_POSTS: BlogPost[] = [
  {
    id: "1",
    title: "The Art of Slow Living: How Weighted Blankets Changed My Mornings",
    excerpt: "A personal exploration of how intentional bedding choices can transform your daily ritual.",
    content: "<h2>Introduction</h2><p>There's something deeply human about the desire to feel held...</p>",
    coverImage: "https://images.unsplash.com/photo-1522770179533-24471fcdba45?q=80&w=1200",
    author: "Elena Smith",
    status: "published",
    publishedAt: new Date("2026-04-01"),
    scheduledAt: null,
    createdAt: new Date("2026-03-28"),
    updatedAt: new Date("2026-04-01"),
    tags: ["lifestyle", "wellness", "sleep"],
    seo: { title: "The Art of Slow Living", description: "How weighted blankets changed my mornings.", slug: "art-of-slow-living" },
    readingTimeMinutes: 4,
  },
  {
    id: "2",
    title: "Material Science: Why Bamboo Outperforms Cotton for Summer Sleep",
    excerpt: "We break down the thermal regulation properties of natural bamboo fiber vs traditional cotton.",
    content: "<h2>Temperature Matters</h2><p>Bamboo fiber has unique thermoregulating properties...</p>",
    coverImage: "https://images.unsplash.com/photo-1583845258933-289c09d57a9e?q=80&w=1200",
    author: "Marcus Thorne",
    status: "draft",
    publishedAt: null,
    scheduledAt: new Date("2026-05-01"),
    createdAt: new Date("2026-04-15"),
    updatedAt: new Date("2026-04-20"),
    tags: ["materials", "science", "summer"],
    seo: { title: "Bamboo vs Cotton", description: "Material science for summer sleep.", slug: "bamboo-vs-cotton" },
    readingTimeMinutes: 6,
  },
];

export const MOCK_PAGES: StaticPage[] = [
  {
    id: "about",
    title: "About Us",
    slug: "about",
    content: "<h1>Our Story</h1><p>SleepWell was founded in 2023 with a singular mission...</p>",
    status: "published",
    updatedAt: new Date("2026-03-01"),
    seo: { title: "About SleepWell Co.", description: "Learn about our mission and team.", slug: "about" },
  },
  {
    id: "faq",
    title: "FAQ",
    slug: "faq",
    content: "<h1>Frequently Asked Questions</h1>",
    status: "published",
    updatedAt: new Date("2026-04-01"),
    seo: { title: "FAQ — SleepWell Co.", description: "Common questions answered.", slug: "faq" },
  },
  {
    id: "contact",
    title: "Contact",
    slug: "contact",
    content: "<h1>Get in Touch</h1><p>We'd love to hear from you...</p>",
    status: "published",
    updatedAt: new Date("2026-04-10"),
    seo: { title: "Contact Us", description: "Reach out to our support team.", slug: "contact" },
  },
];

export const MOCK_HELP_ARTICLES: HelpArticle[] = [
  { id: "1", title: "How to track my order", category: "Orders", content: "<p>You can track...</p>", status: "published", helpful: 142, notHelpful: 3, updatedAt: new Date("2026-04-01") },
  { id: "2", title: "Return & refund policy", category: "Returns", content: "<p>We accept returns...</p>", status: "published", helpful: 98, notHelpful: 12, updatedAt: new Date("2026-04-05") },
  { id: "3", title: "Changing my delivery address", category: "Shipping", content: "<p>To change your address...</p>", status: "published", helpful: 67, notHelpful: 4, updatedAt: new Date("2026-04-10") },
  { id: "4", title: "Setting up 2FA on your account", category: "Account", content: "<p>Two-factor authentication...</p>", status: "published", helpful: 211, notHelpful: 2, updatedAt: new Date("2026-04-12") },
];
