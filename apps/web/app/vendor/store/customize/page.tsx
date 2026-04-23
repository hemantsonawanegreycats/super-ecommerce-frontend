"use client";

import { useState } from "react";
import { 
  Palette, 
  LayoutTemplate, 
  Type, 
  Save, 
  MousePointer2, 
  Smartphone, 
  Monitor,
  CheckCircle2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const THEME_PRESETS = [
  { id: "monochrome", name: "Super-E Mono", bg: "bg-zinc-950", accent: "bg-white", active: true },
  { id: "minimal", name: "Minimal Dawn", bg: "bg-stone-100", accent: "bg-stone-900", active: false },
  { id: "luxury", name: "Midnight Gold", bg: "bg-slate-950", accent: "bg-amber-500", active: false },
  { id: "nature", name: "Botanical", bg: "bg-emerald-950", accent: "bg-emerald-400", active: false },
];

export default function StoreCustomizePage() {
  const [activeTheme, setActiveTheme] = useState("monochrome");
  const [device, setDevice] = useState<"desktop" | "mobile">("desktop");

  return (
    <div className="max-w-7xl mx-auto space-y-12 h-[calc(100vh-100px)] flex flex-col">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 shrink-0">
        <div className="space-y-2">
           <h1 className="text-4xl lg:text-6xl font-black italic tracking-tighter uppercase leading-none">Storefront Theme</h1>
           <p className="text-muted-foreground font-medium uppercase text-[10px] tracking-[0.2em]">Customize your tenant instance aesthetics</p>
        </div>
        <div className="flex gap-4">
           <div className="flex p-1 bg-muted/30 rounded-full border border-dashed border-primary/20">
              <button 
                onClick={() => setDevice("desktop")}
                className={cn("h-12 w-16 rounded-full flex items-center justify-center transition-all", device === "desktop" ? "bg-background shadow-md" : "text-muted-foreground hover:text-foreground")}
              >
                 <Monitor className="h-5 w-5" />
              </button>
              <button 
                onClick={() => setDevice("mobile")}
                className={cn("h-12 w-16 rounded-full flex items-center justify-center transition-all", device === "mobile" ? "bg-background shadow-md" : "text-muted-foreground hover:text-foreground")}
              >
                 <Smartphone className="h-5 w-5" />
              </button>
           </div>
           <Button className="rounded-full font-black italic uppercase h-14 px-10 shadow-xl gap-2">
              <Save className="h-5 w-5" />
              Publish Changes
           </Button>
        </div>
      </div>

      <div className="flex-1 flex flex-col lg:flex-row gap-8 min-h-0">
        
        {/* Sidebar Controls */}
        <div className="w-full lg:w-96 flex flex-col gap-6 overflow-y-auto pr-4 scrollbar-hide">
           
           <div className="p-8 rounded-[2.5rem] bg-background border shadow-2xl shadow-primary/5 space-y-8">
              <div className="flex items-center gap-4 border-b border-dashed pb-6">
                 <div className="h-10 w-10 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                    <Palette className="h-5 w-5" />
                 </div>
                 <h2 className="text-lg font-black italic uppercase tracking-tight">Color System</h2>
              </div>
              
              <div className="space-y-4">
                 <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Theme Presets</p>
                 <div className="grid grid-cols-2 gap-4">
                    {THEME_PRESETS.map((theme) => (
                      <button 
                        key={theme.id}
                        onClick={() => setActiveTheme(theme.id)}
                        className={cn(
                          "p-4 rounded-3xl border-2 transition-all flex flex-col gap-3 group",
                          activeTheme === theme.id ? "border-primary bg-primary/5" : "border-dashed border-muted hover:border-primary/50"
                        )}
                      >
                         <div className="flex gap-2">
                            <div className={cn("h-6 w-6 rounded-full border shadow-sm", theme.bg)} />
                            <div className={cn("h-6 w-6 rounded-full shadow-sm", theme.accent)} />
                         </div>
                         <div className="flex items-center justify-between w-full">
                            <span className="text-[10px] font-black uppercase tracking-tight text-left">{theme.name}</span>
                            {activeTheme === theme.id && <CheckCircle2 className="h-3 w-3 text-primary" />}
                         </div>
                      </button>
                    ))}
                 </div>
              </div>

              <div className="space-y-4 pt-4 border-t border-dashed">
                 <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Advanced Colors</p>
                 <div className="flex items-center justify-between p-4 rounded-[2rem] bg-muted/30">
                    <span className="text-xs font-bold uppercase tracking-tight">Primary Button</span>
                    <div className="h-6 w-12 rounded-full bg-primary border shadow-inner" />
                 </div>
              </div>
           </div>

           <div className="p-8 rounded-[2.5rem] bg-background border shadow-2xl shadow-primary/5 space-y-6">
              <div className="flex items-center gap-4 border-b border-dashed pb-6">
                 <div className="h-10 w-10 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                    <LayoutTemplate className="h-5 w-5" />
                 </div>
                 <h2 className="text-lg font-black italic uppercase tracking-tight">Layout Logic</h2>
              </div>
              
              <div className="space-y-4">
                 {[
                   { label: "Sticky Navigation", desc: "Header stays visible on scroll", active: true },
                   { label: "Bento Grids", desc: "Use masonry style layouts", active: true },
                   { label: "Hide Out-of-Stock", desc: "Don't show unavailable items", active: false },
                 ].map((toggle, i) => (
                   <div key={i} className="flex items-center justify-between p-4 rounded-3xl bg-muted/20 border border-dashed">
                      <div className="space-y-1">
                         <p className="text-xs font-black uppercase tracking-tight">{toggle.label}</p>
                         <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">{toggle.desc}</p>
                      </div>
                      <Switch defaultChecked={toggle.active} />
                   </div>
                 ))}
              </div>
           </div>

        </div>

        {/* Live Preview Area */}
        <div className="flex-1 bg-muted/20 rounded-[3rem] border-4 border-dashed border-primary/10 overflow-hidden flex flex-col">
           <div className="h-14 border-b border-dashed bg-background/50 flex items-center px-6 gap-4 shrink-0">
              <div className="flex gap-1.5">
                 <div className="h-3 w-3 rounded-full bg-red-400" />
                 <div className="h-3 w-3 rounded-full bg-amber-400" />
                 <div className="h-3 w-3 rounded-full bg-emerald-400" />
              </div>
              <div className="flex-1 max-w-sm mx-auto h-8 rounded-full bg-muted/50 border flex items-center justify-center">
                 <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                    <MousePointer2 className="h-3 w-3" /> Live Preview Mode
                 </span>
              </div>
           </div>
           
           {/* Preview Mock UI */}
           <div className={cn(
             "flex-1 overflow-y-auto bg-background transition-all duration-500 flex flex-col",
             device === "desktop" ? "p-12" : "max-w-[400px] mx-auto w-full border-x shadow-2xl p-6"
           )}>
              <div className="flex items-center justify-between border-b pb-6">
                 <div className="text-2xl font-black italic tracking-tighter">STORE_LOGO</div>
                 <div className="flex gap-6 text-[10px] font-bold uppercase tracking-widest">
                    <span>Shop</span>
                    <span>Collections</span>
                    <span>About</span>
                 </div>
              </div>
              <div className="py-20 flex flex-col items-center justify-center text-center space-y-6">
                 <h1 className="text-4xl lg:text-5xl font-black italic uppercase leading-none max-w-2xl">Elevate your lifestyle with premium curation</h1>
                 <Button className="rounded-full font-black italic uppercase h-12 px-10">Shop the Collection</Button>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                 {[1,2,3,4].map(i => (
                   <div key={i} className="aspect-[3/4] bg-muted rounded-3xl" />
                 ))}
              </div>
           </div>
        </div>

      </div>
    </div>
  );
}
