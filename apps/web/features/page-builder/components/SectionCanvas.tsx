"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence, Reorder } from "framer-motion";
import { usePageBuilderStore } from "../store";
import { SECTION_REGISTRY } from "../section-registry";
import type { Section } from "../types";
import { cn } from "@/lib/utils";
import { 
  Trash2, 
  Copy, 
  ChevronUp, 
  ChevronDown, 
  GripVertical,
  Plus
} from "lucide-react";
import { Button } from "@/components/ui/button";

// ---------- Section Renderers ----------

function HeroPreview({ props }: { props: Record<string, unknown> }) {
  return (
    <div
      className="relative w-full min-h-[400px] flex items-center overflow-hidden rounded-2xl"
      style={{ backgroundImage: `url(${props.imageUrl as string})`, backgroundSize: "cover", backgroundPosition: "center" }}
    >
      <div className="absolute inset-0 bg-black" style={{ opacity: (props.overlayOpacity as number) / 100 }} />
      <div className={cn("relative z-10 w-full px-16 py-20 text-white", props.layout === "center" && "text-center", props.layout === "right" && "text-right")}>
        <h2 className="text-5xl font-black italic uppercase tracking-tighter leading-none mb-4">{props.headline as string}</h2>
        <p className="text-lg font-medium mb-8 opacity-80">{props.subheadline as string}</p>
        <button className="bg-white text-black px-10 h-14 rounded-full font-black italic uppercase text-sm shadow-2xl hover:bg-white/90 transition-all">
          {props.ctaLabel as string}
        </button>
      </div>
    </div>
  );
}

function ProductGridPreview({ props }: { props: Record<string, unknown> }) {
  return (
    <div className="space-y-6 py-8">
      <h2 className="text-3xl font-black italic uppercase tracking-tighter">{props.title as string}</h2>
      <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${Math.min(props.columns as number, 4)}, 1fr)` }}>
        {Array.from({ length: props.columns as number }).map((_, i) => (
          <div key={i} className="aspect-[3/4] bg-muted/50 rounded-3xl animate-pulse" />
        ))}
      </div>
    </div>
  );
}

function BannerPreview({ props }: { props: Record<string, unknown> }) {
  return (
    <div className="w-full py-4 px-8 flex items-center justify-center text-sm font-black italic uppercase tracking-widest rounded-2xl"
      style={{ backgroundColor: props.bgColor as string, color: props.textColor as string }}>
      {props.text as string}
    </div>
  );
}

function TestimonialsPreview() {
  return (
    <div className="py-12 grid grid-cols-3 gap-6">
      {[1, 2, 3].map((i) => (
        <div key={i} className="p-6 rounded-3xl border bg-muted/20 space-y-4">
          <div className="flex gap-1">{Array.from({ length: 5 }).map((_, j) => <div key={j} className="h-3 w-3 rounded-full bg-amber-400" />)}</div>
          <div className="h-3 w-full bg-muted rounded-full" />
          <div className="h-3 w-4/5 bg-muted rounded-full" />
          <div className="h-3 w-3/5 bg-muted rounded-full" />
        </div>
      ))}
    </div>
  );
}

function RichTextPreview({ props }: { props: Record<string, unknown> }) {
  return (
    <div className="py-8 prose prose-zinc max-w-none" dangerouslySetInnerHTML={{ __html: props.content as string }} />
  );
}

function GalleryPreview({ props }: { props: Record<string, unknown> }) {
  return (
    <div className="py-8 grid gap-4" style={{ gridTemplateColumns: `repeat(${props.columns as number}, 1fr)` }}>
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="aspect-square bg-muted/50 rounded-3xl" />
      ))}
    </div>
  );
}

function FAQPreview({ props }: { props: Record<string, unknown> }) {
  return (
    <div className="py-8 space-y-4">
      <h2 className="text-3xl font-black italic uppercase tracking-tighter mb-6">{props.title as string}</h2>
      {[1, 2, 3].map((i) => (
        <div key={i} className="p-6 rounded-3xl border border-dashed flex items-center justify-between">
          <div className="h-3 w-1/2 bg-muted rounded-full" />
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        </div>
      ))}
    </div>
  );
}

function NewsletterPreview({ props }: { props: Record<string, unknown> }) {
  return (
    <div className="py-12 flex flex-col items-center text-center gap-6 bg-zinc-950 text-white rounded-3xl">
      <h2 className="text-4xl font-black italic uppercase tracking-tighter">{props.headline as string}</h2>
      <div className="flex gap-3 w-full max-w-md">
        <input className="flex-1 h-14 rounded-full bg-white/10 border border-white/20 px-6 text-sm placeholder:text-white/40" placeholder={props.placeholder as string} />
        <button className="h-14 px-8 bg-white text-black rounded-full font-black italic uppercase text-sm">Subscribe</button>
      </div>
    </div>
  );
}

function SpacerPreview({ props }: { props: Record<string, unknown> }) {
  return <div style={{ height: `${props.height as number}px` }} className="w-full flex items-center justify-center text-muted-foreground/30 text-[10px] font-black uppercase tracking-widest border border-dashed rounded-2xl">Spacer — {props.height as number}px</div>;
}

// ---------- Section Renderer Map ----------

const SECTION_RENDERERS: Record<string, React.FC<{ props: Record<string, unknown> }>> = {
  hero: HeroPreview,
  "product-grid": ProductGridPreview,
  banner: BannerPreview,
  testimonials: TestimonialsPreview,
  "rich-text": RichTextPreview,
  "image-gallery": GalleryPreview,
  faq: FAQPreview,
  newsletter: NewsletterPreview,
  spacer: SpacerPreview,
};

// ---------- Section Item ----------

function SectionItem({ section, index, isSelected, total }: { section: Section; index: number; isSelected: boolean; total: number }) {
  const { selectSection, removeSection, duplicateSection, moveSection } = usePageBuilderStore();
  const Renderer = SECTION_RENDERERS[section.type];
  const def = SECTION_REGISTRY[section.type];

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      onClick={() => selectSection(section.id)}
      className={cn(
        "group relative rounded-[2rem] border-2 transition-all duration-200 cursor-pointer overflow-hidden",
        isSelected
          ? "border-primary shadow-2xl shadow-primary/10 ring-4 ring-primary/10"
          : "border-transparent hover:border-primary/30 hover:shadow-xl"
      )}
    >
      {/* Section Label Chip */}
      <div className={cn(
        "absolute top-4 left-4 z-20 px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest flex items-center gap-1.5 transition-all",
        isSelected ? "bg-primary text-primary-foreground" : "bg-black/60 text-white opacity-0 group-hover:opacity-100"
      )}>
        <GripVertical className="h-2.5 w-2.5" />
        {def.label}
      </div>

      {/* Action Toolbar */}
      <div className={cn(
        "absolute top-4 right-4 z-20 flex gap-1.5 transition-all",
        isSelected ? "opacity-100" : "opacity-0 group-hover:opacity-100"
      )}>
        <button
          onClick={(e) => { e.stopPropagation(); moveSection(index, Math.max(0, index - 1)); }}
          disabled={index === 0}
          className="h-8 w-8 rounded-full bg-background/90 backdrop-blur-sm border shadow-lg flex items-center justify-center hover:bg-primary/10 hover:text-primary transition-all disabled:opacity-30"
        >
          <ChevronUp className="h-3.5 w-3.5" />
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); moveSection(index, Math.min(total - 1, index + 1)); }}
          disabled={index === total - 1}
          className="h-8 w-8 rounded-full bg-background/90 backdrop-blur-sm border shadow-lg flex items-center justify-center hover:bg-primary/10 hover:text-primary transition-all disabled:opacity-30"
        >
          <ChevronDown className="h-3.5 w-3.5" />
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); duplicateSection(section.id); }}
          className="h-8 w-8 rounded-full bg-background/90 backdrop-blur-sm border shadow-lg flex items-center justify-center hover:bg-primary/10 hover:text-primary transition-all"
        >
          <Copy className="h-3.5 w-3.5" />
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); removeSection(section.id); }}
          className="h-8 w-8 rounded-full bg-background/90 backdrop-blur-sm border shadow-lg flex items-center justify-center hover:bg-destructive/10 hover:text-destructive transition-all"
        >
          <Trash2 className="h-3.5 w-3.5" />
        </button>
      </div>

      {/* Section Render */}
      <div className="p-4">
        {Renderer ? <Renderer props={section.props} /> : (
          <div className="h-24 bg-muted/30 rounded-2xl flex items-center justify-center text-muted-foreground text-xs font-bold uppercase">
            {def.label}
          </div>
        )}
      </div>
    </motion.div>
  );
}

// ---------- Empty State ----------

function EmptyCanvas({ onAdd }: { onAdd: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center justify-center min-h-[400px] gap-6 text-center"
    >
      <div className="h-24 w-24 rounded-[2rem] border-4 border-dashed border-primary/20 bg-primary/5 flex items-center justify-center">
        <Plus className="h-10 w-10 text-primary/40" />
      </div>
      <div className="space-y-2">
        <p className="text-xl font-black italic uppercase tracking-tight">Canvas is empty</p>
        <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Add sections from the left panel to build your page</p>
      </div>
      <Button onClick={onAdd} className="rounded-full font-black italic uppercase h-12 px-8 gap-2">
        <Plus className="h-4 w-4" /> Add First Section
      </Button>
    </motion.div>
  );
}

// ---------- Main Canvas ----------

export function SectionCanvas({ onRequestAddSection }: { onRequestAddSection: () => void }) {
  const { sections, selectedSectionId } = usePageBuilderStore();

  return (
    <div className="relative flex-1 overflow-y-auto p-8 space-y-4 scrollbar-hide">
      <AnimatePresence mode="popLayout">
        {sections.length === 0 ? (
          <EmptyCanvas key="empty" onAdd={onRequestAddSection} />
        ) : (
          sections.map((section, index) => (
            <SectionItem
              key={section.id}
              section={section}
              index={index}
              isSelected={selectedSectionId === section.id}
              total={sections.length}
            />
          ))
        )}
      </AnimatePresence>

      {/* Add Section Button at Bottom */}
      {sections.length > 0 && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={onRequestAddSection}
          className="w-full h-14 rounded-[2rem] border-2 border-dashed border-primary/20 hover:border-primary/50 bg-primary/5 hover:bg-primary/10 transition-all flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground hover:text-primary"
        >
          <Plus className="h-4 w-4" /> Add Section Below
        </motion.button>
      )}
    </div>
  );
}
