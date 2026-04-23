"use client";

import { useState } from "react";
import { UploadCloud, Image as ImageIcon, Trash2, Link as LinkIcon, Plus, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";

export default function StoreMediaPage() {
  const [images, setImages] = useState([
    "https://images.unsplash.com/photo-1541746972996-4e0b0f43e02a?q=80&w=400",
    "https://images.unsplash.com/photo-1578749553836-3a560424678b?q=80&w=400",
    "https://images.unsplash.com/photo-1522770179533-24471fcdba45?q=80&w=400"
  ]);

  return (
    <div className="max-w-6xl mx-auto space-y-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div className="space-y-2">
           <h1 className="text-4xl lg:text-6xl font-black italic tracking-tighter uppercase leading-none">Media Library</h1>
           <p className="text-muted-foreground font-medium uppercase text-[10px] tracking-[0.2em]">Manage your storefront assets and brand imagery</p>
        </div>
        <Button className="rounded-full font-black italic uppercase h-14 px-8 shadow-xl gap-2">
           <UploadCloud className="h-5 w-5" />
           UPLOAD NEW MEDIA
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-10">
           
           <section className="space-y-6">
              <div className="flex items-center justify-between">
                 <h2 className="text-2xl font-black italic uppercase tracking-tight">Gallery Assets</h2>
                 <span className="text-[10px] font-bold text-muted-foreground uppercase">{images.length} / 20 limits</span>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                 {images.map((src, i) => (
                   <motion.div 
                     key={i}
                     initial={{ opacity: 0, scale: 0.9 }}
                     animate={{ opacity: 1, scale: 1 }}
                     transition={{ delay: i * 0.1 }}
                     className="group relative aspect-square rounded-[2rem] overflow-hidden border-2 border-white shadow-xl bg-muted/20"
                   >
                      <img src={src} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" alt="Gallery item" />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 backdrop-blur-[2px]">
                         <Button variant="secondary" size="icon" className="h-10 w-10 rounded-full shadow-2xl"><Eye className="h-4 w-4" /></Button>
                         <Button variant="destructive" size="icon" className="h-10 w-10 rounded-full shadow-2xl"><Trash2 className="h-4 w-4" /></Button>
                      </div>
                   </motion.div>
                 ))}
                 
                 <button className="aspect-square rounded-[2rem] border-2 border-dashed border-primary/20 hover:border-primary/50 bg-primary/5 hover:bg-primary/10 transition-all flex flex-col items-center justify-center gap-3 text-primary/60 hover:text-primary">
                    <Plus className="h-8 w-8" />
                    <span className="text-[10px] font-black uppercase tracking-widest">Add Image</span>
                 </button>
              </div>
           </section>

           <Separator className="border-dashed" />

           <section className="space-y-6">
              <h2 className="text-2xl font-black italic uppercase tracking-tight">External Media Links</h2>
              <div className="space-y-4">
                 {[
                   { label: "YouTube Showcase Video", value: "https://youtube.com/watch?v=..." },
                   { label: "Instagram Feed Integration", value: "@super_e_store" }
                 ].map((link, i) => (
                   <div key={i} className="flex flex-col gap-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-4">{link.label}</label>
                      <div className="relative">
                         <LinkIcon className="absolute left-5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                         <Input defaultValue={link.value} className="h-14 pl-12 rounded-[2rem] bg-muted/20 border border-dashed font-medium italic" />
                      </div>
                   </div>
                 ))}
                 <Button variant="outline" className="w-full h-14 rounded-[2rem] border-dashed text-muted-foreground font-bold uppercase text-xs tracking-widest mt-4">
                    <Plus className="h-4 w-4 mr-2" /> Add Social Link
                 </Button>
              </div>
           </section>

        </div>

        {/* Sidebar */}
        <div className="space-y-8">
           <div className="p-8 rounded-[2.5rem] bg-zinc-900 text-white space-y-6 shadow-2xl relative overflow-hidden">
              <div className="relative z-10 space-y-4">
                 <div className="h-12 w-12 rounded-[1.5rem] bg-white/10 flex items-center justify-center">
                    <ImageIcon className="h-6 w-6" />
                 </div>
                 <div>
                    <h3 className="text-xl font-black italic uppercase tracking-tight">Brand Logo</h3>
                    <p className="text-[10px] font-bold text-white/50 uppercase tracking-widest mt-1">Recommended 512x512px</p>
                 </div>
                 
                 <div className="aspect-square bg-black/50 border-2 border-dashed border-white/20 rounded-[2rem] flex flex-col items-center justify-center mt-6">
                    <img src={images[0]} className="h-24 w-24 rounded-[1.5rem] object-cover mb-4 shadow-xl border-2 border-white/10" alt="Logo" />
                    <Button variant="secondary" size="sm" className="rounded-full font-bold text-[10px] uppercase h-8 px-6">Change</Button>
                 </div>
              </div>
              <div className="absolute top-0 right-0 h-40 w-40 bg-white/5 blur-3xl rounded-full" />
           </div>

           <div className="p-8 rounded-[2.5rem] border-2 border-dashed border-primary/20 space-y-4">
              <h4 className="font-black italic uppercase tracking-tight">Media Guidelines</h4>
              <ul className="space-y-3 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                 <li className="flex items-center gap-2"><div className="h-1.5 w-1.5 bg-primary rounded-full"/> Max file size: 5MB</li>
                 <li className="flex items-center gap-2"><div className="h-1.5 w-1.5 bg-primary rounded-full"/> Formats: JPEG, PNG, WEBP</li>
                 <li className="flex items-center gap-2"><div className="h-1.5 w-1.5 bg-primary rounded-full"/> Dimensions: 16:9 ratio</li>
                 <li className="flex items-center gap-2"><div className="h-1.5 w-1.5 bg-primary rounded-full"/> No watermarks allowed</li>
              </ul>
           </div>
        </div>
      </div>
    </div>
  );
}
