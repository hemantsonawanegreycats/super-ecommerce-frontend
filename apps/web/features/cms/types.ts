export type ContentStatus = "draft" | "published" | "scheduled";

export interface SEOMeta {
  title: string;
  description: string;
  slug: string;
  canonicalUrl?: string;
  ogImage?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string; // HTML from Tiptap
  coverImage: string;
  author: string;
  status: ContentStatus;
  publishedAt: Date | null;
  scheduledAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
  tags: string[];
  seo: SEOMeta;
  readingTimeMinutes: number;
}

export interface StaticPage {
  id: string;
  title: string;
  slug: string; // "about" | "faq" | "contact" etc.
  content: string;
  status: ContentStatus;
  updatedAt: Date;
  seo: SEOMeta;
}

export interface HelpArticle {
  id: string;
  title: string;
  category: string;
  content: string;
  status: ContentStatus;
  helpful: number;
  notHelpful: number;
  updatedAt: Date;
}
