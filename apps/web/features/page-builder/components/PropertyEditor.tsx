"use client";

import { usePageBuilderStore } from "../store";
import { SECTION_REGISTRY } from "../section-registry";
import type { SectionProp } from "../types";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Settings2, 
  ChevronRight, 
  Sliders, 
  Copy, 
  Trash2,
  MoveUp,
  MoveDown
} from "lucide-react";
import { cn } from "@/lib/utils";

function PropControl({
  prop,
  value,
  onChange,
}: {
  prop: SectionProp;
  value: unknown;
  onChange: (v: unknown) => void;
}) {
  switch (prop.type) {
    case "text":
      return (
        <Input
          value={(value as string) ?? ""}
          onChange={(e) => onChange(e.target.value)}
          className="h-12 rounded-2xl bg-muted/20 border-none font-medium"
        />
      );
    case "textarea":
      return (
        <Textarea
          value={(value as string) ?? ""}
          onChange={(e) => onChange(e.target.value)}
          className="rounded-[1.5rem] bg-muted/20 border-none font-medium min-h-[100px] resize-none p-4"
        />
      );
    case "number":
      return (
        <Input
          type="number"
          value={(value as number) ?? 0}
          onChange={(e) => onChange(Number(e.target.value))}
          className="h-12 rounded-2xl bg-muted/20 border-none font-medium"
        />
      );
    case "boolean":
      return (
        <Switch
          checked={Boolean(value)}
          onCheckedChange={onChange}
        />
      );
    case "color":
      return (
        <div className="flex items-center gap-3">
          <input
            type="color"
            value={(value as string) ?? "#000000"}
            onChange={(e) => onChange(e.target.value)}
            className="h-12 w-12 rounded-2xl border-none cursor-pointer"
          />
          <Input
            value={(value as string) ?? ""}
            onChange={(e) => onChange(e.target.value)}
            className="h-12 rounded-2xl bg-muted/20 border-none font-mono text-sm"
          />
        </div>
      );
    case "select":
      return (
        <div className="flex flex-wrap gap-2">
          {prop.options?.map((opt) => (
            <button
              key={opt.value}
              onClick={() => onChange(opt.value)}
              className={cn(
                "px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest border-2 transition-all",
                value === opt.value
                  ? "bg-primary text-primary-foreground border-primary"
                  : "border-dashed border-muted-foreground/30 hover:border-primary/50 text-muted-foreground"
              )}
            >
              {opt.label}
            </button>
          ))}
        </div>
      );
    case "image":
      return (
        <Input
          value={(value as string) ?? ""}
          onChange={(e) => onChange(e.target.value)}
          placeholder="https://..."
          className="h-12 rounded-2xl bg-muted/20 border-none font-medium"
        />
      );
    default:
      return null;
  }
}

export function PropertyEditor() {
  const { sections, selectedSectionId, updateSectionProp, removeSection, duplicateSection, moveSection } = usePageBuilderStore();

  const section = sections.find((s) => s.id === selectedSectionId);
  const sectionIndex = sections.findIndex((s) => s.id === selectedSectionId);
  const def = section ? SECTION_REGISTRY[section.type] : null;

  return (
    <div className="h-full flex flex-col">
      <div className="px-6 py-5 border-b border-dashed bg-muted/10 shrink-0">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
            <Settings2 className="h-4 w-4" />
          </div>
          <div>
            <h3 className="text-sm font-black italic uppercase tracking-tight leading-none">
              {def ? def.label : "Properties"}
            </h3>
            <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest mt-0.5">
              {def ? def.description : "Select a section to edit"}
            </p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-hide">
        <AnimatePresence mode="wait">
          {!section || !def ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center h-full gap-4 text-center p-8"
            >
              <div className="h-16 w-16 rounded-[1.5rem] border-2 border-dashed border-primary/20 bg-primary/5 flex items-center justify-center">
                <Sliders className="h-7 w-7 text-primary/40" />
              </div>
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest leading-relaxed">
                Click any section on the canvas to start editing its properties
              </p>
            </motion.div>
          ) : (
            <motion.div
              key={section.id}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="p-6 space-y-6"
            >
              {/* Quick Actions */}
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => duplicateSection(section.id)}
                  className="h-10 rounded-2xl border border-dashed flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground hover:text-primary hover:border-primary/50 transition-all"
                >
                  <Copy className="h-3.5 w-3.5" /> Duplicate
                </button>
                <button
                  onClick={() => removeSection(section.id)}
                  className="h-10 rounded-2xl border border-dashed flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-widest text-destructive/60 hover:text-destructive hover:border-destructive/30 transition-all"
                >
                  <Trash2 className="h-3.5 w-3.5" /> Delete
                </button>
                <button
                  onClick={() => moveSection(sectionIndex, Math.max(0, sectionIndex - 1))}
                  disabled={sectionIndex === 0}
                  className="h-10 rounded-2xl border border-dashed flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground hover:text-primary hover:border-primary/50 transition-all disabled:opacity-30"
                >
                  <MoveUp className="h-3.5 w-3.5" /> Move Up
                </button>
                <button
                  onClick={() => moveSection(sectionIndex, Math.min(sections.length - 1, sectionIndex + 1))}
                  disabled={sectionIndex === sections.length - 1}
                  className="h-10 rounded-2xl border border-dashed flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground hover:text-primary hover:border-primary/50 transition-all disabled:opacity-30"
                >
                  <MoveDown className="h-3.5 w-3.5" /> Move Down
                </button>
              </div>

              <Separator className="border-dashed" />

              {/* Property Controls */}
              <div className="space-y-6">
                {def.propSchema.map((prop) => (
                  <div key={prop.key} className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">
                      {prop.label}
                    </label>
                    <PropControl
                      prop={prop}
                      value={section.props[prop.key]}
                      onChange={(v) => updateSectionProp(section.id, prop.key, v)}
                    />
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
