"use client";

import { useState, useEffect, useCallback } from "react";
import { usePageBuilderStore, useTemporalStore } from "../store";
import { SECTION_REGISTRY, SECTION_CATEGORIES } from "../section-registry";
import { SectionCanvas } from "./SectionCanvas";
import { PropertyEditor } from "./PropertyEditor";
import { PreviewBanner } from "./PreviewBanner";
import type { SectionType } from "../types";
import { cn } from "@/lib/utils";
import {
  Monitor, Tablet, Smartphone, Undo2, Redo2, Eye, Save, 
  ChevronRight, Plus, Layers, Zap
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";
import { toast } from "sonner";
import * as LucideIcons from "lucide-react";

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  LayoutTemplate: LucideIcons.LayoutTemplate,
  LayoutGrid: LucideIcons.LayoutGrid,
  Megaphone: LucideIcons.Megaphone,
  Quote: LucideIcons.Quote,
  FileText: LucideIcons.FileText,
  Images: LucideIcons.Images,
  HelpCircle: LucideIcons.HelpCircle,
  Mail: LucideIcons.Mail,
  AlignJustify: LucideIcons.AlignJustify,
};

export function PageBuilder() {
  const {
    sections,
    publishStatus,
    lastSavedAt,
    previewDevice,
    addSection,
    setPreviewDevice,
    setPublishStatus,
    save,
  } = usePageBuilderStore();

  const temporalStore = useTemporalStore();
  const [showAddPanel, setShowAddPanel] = useState(false);
  const [showPreviewBanner, setShowPreviewBanner] = useState(true);

  // Keyboard shortcuts for undo/redo
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "z" && !e.shiftKey) {
        e.preventDefault();
        temporalStore.getState().undo();
        toast.info("Undone", { duration: 1200 });
      }
      if ((e.metaKey || e.ctrlKey) && (e.key === "y" || (e.key === "z" && e.shiftKey))) {
        e.preventDefault();
        temporalStore.getState().redo();
        toast.info("Redone", { duration: 1200 });
      }
    },
    [temporalStore]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  const handleSave = () => {
    save();
    toast.success("Page saved");
  };

  const handlePublish = () => {
    setPublishStatus("published");
    save();
    toast.success("Page published successfully!");
  };

  return (
    <div className="flex flex-col h-screen bg-muted/10 overflow-hidden">
      {/* Preview Banner */}
      {publishStatus === "draft" && (
        <PreviewBanner visible={showPreviewBanner} onDismiss={() => setShowPreviewBanner(false)} />
      )}

      {/* Top Toolbar */}
      <header className="h-16 border-b bg-background flex items-center justify-between px-6 shrink-0 shadow-sm z-40">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-xl bg-primary flex items-center justify-center">
              <Layers className="h-4 w-4 text-primary-foreground" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-black italic uppercase tracking-tight leading-none">Page Builder</span>
              <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">
                {sections.length} section{sections.length !== 1 ? "s" : ""}
              </span>
            </div>
          </div>

          <Separator orientation="vertical" className="h-8" />

          {/* Undo / Redo */}
          <div className="flex gap-1">
            <button
              onClick={() => { temporalStore.getState().undo(); toast.info("Undone", { duration: 1000 }); }}
              title="Undo (Ctrl+Z)"
              className="h-9 w-9 rounded-xl border border-dashed flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-all"
            >
              <Undo2 className="h-4 w-4" />
            </button>
            <button
              onClick={() => { temporalStore.getState().redo(); toast.info("Redone", { duration: 1000 }); }}
              title="Redo (Ctrl+Y)"
              className="h-9 w-9 rounded-xl border border-dashed flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-all"
            >
              <Redo2 className="h-4 w-4" />
            </button>
          </div>

          <Separator orientation="vertical" className="h-8" />

          {/* Device Preview */}
          <div className="flex p-0.5 bg-muted/50 rounded-xl border border-dashed">
            {([
              { id: "desktop", icon: Monitor },
              { id: "tablet", icon: Tablet },
              { id: "mobile", icon: Smartphone },
            ] as const).map(({ id, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setPreviewDevice(id as "desktop" | "tablet" | "mobile")}
                className={cn(
                  "h-8 w-10 rounded-lg flex items-center justify-center transition-all",
                  previewDevice === id
                    ? "bg-background shadow text-primary"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <Icon className="h-4 w-4" />
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3">
          {lastSavedAt && (
            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
              Saved {lastSavedAt.toLocaleTimeString()}
            </span>
          )}
          <Button
            variant="outline"
            onClick={handleSave}
            className="h-9 rounded-full font-black italic uppercase text-[11px] gap-2 border-2 px-5"
          >
            <Save className="h-3.5 w-3.5" /> Save Draft
          </Button>
          <Button
            onClick={handlePublish}
            className="h-9 rounded-full font-black italic uppercase text-[11px] gap-2 px-5 shadow-xl shadow-primary/20"
          >
            <Zap className="h-3.5 w-3.5" /> Publish
          </Button>
        </div>
      </header>

      {/* Main 3-Panel Layout */}
      <div className="flex flex-1 overflow-hidden">
        {/* LEFT PANEL — Section Library */}
        <aside className="w-72 shrink-0 border-r bg-background flex flex-col overflow-y-auto scrollbar-hide">
          <div className="p-4 border-b border-dashed bg-muted/10 shrink-0">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Section Library</p>
          </div>
          <div className="flex-1 p-4 space-y-6 overflow-y-auto scrollbar-hide">
            {SECTION_CATEGORIES.map((cat) => (
              <div key={cat.label} className="space-y-2">
                <p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/60 px-1">{cat.label}</p>
                <div className="space-y-1.5">
                  {cat.types.map((type) => {
                    const def = SECTION_REGISTRY[type];
                    const Icon = ICON_MAP[def.icon] ?? LucideIcons.Square;
                    return (
                      <motion.button
                        key={type}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => addSection(type)}
                        className="w-full flex items-center gap-3 p-3 rounded-2xl border border-dashed hover:border-primary/40 hover:bg-primary/5 transition-all group text-left"
                      >
                        <div className="h-9 w-9 rounded-xl bg-muted/50 flex items-center justify-center text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary transition-all shrink-0">
                          <Icon className="h-4 w-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-[11px] font-black uppercase tracking-tight group-hover:text-primary transition-colors">{def.label}</p>
                          <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest truncate">{def.description}</p>
                        </div>
                        <ChevronRight className="h-3.5 w-3.5 text-muted-foreground/30 group-hover:text-primary/50 transition-colors shrink-0" />
                      </motion.button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </aside>

        {/* CENTER — Canvas */}
        <main className={cn(
          "flex-1 flex flex-col overflow-hidden bg-muted/10 transition-all duration-500",
        )}>
          <div className={cn(
            "flex-1 overflow-y-auto mx-auto w-full transition-all duration-500",
            previewDevice === "tablet" ? "max-w-2xl" : previewDevice === "mobile" ? "max-w-sm" : "max-w-none"
          )}>
            <SectionCanvas onRequestAddSection={() => addSection("hero")} />
          </div>
        </main>

        {/* RIGHT PANEL — Property Editor */}
        <aside className="w-80 shrink-0 border-l bg-background flex flex-col overflow-hidden">
          <PropertyEditor />
        </aside>
      </div>
    </div>
  );
}
