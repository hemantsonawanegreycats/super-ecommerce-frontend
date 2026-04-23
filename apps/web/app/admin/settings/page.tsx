"use client";

import { useState } from "react";
import { 
  Settings, 
  Globe, 
  ShieldCheck, 
  Bell, 
  CreditCard, 
  Database, 
  Cloud, 
  Terminal,
  Save,
  Check
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export default function AdminSettingsPage() {
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      toast.success("Platform settings updated successfully");
    }, 1500);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div className="space-y-2">
           <h1 className="text-4xl lg:text-6xl font-black italic tracking-tighter uppercase leading-none">Configuration</h1>
           <p className="text-muted-foreground font-medium uppercase text-[10px] tracking-[0.2em]">Platform-wide overrides and global state</p>
        </div>
        <Button 
          onClick={handleSave} 
          disabled={isSaving}
          className="rounded-full font-black italic uppercase h-14 px-12 shadow-xl gap-2"
        >
           {isSaving ? <span className="animate-spin mr-2">/</span> : <Save className="h-4 w-4" />}
           {isSaving ? "SYNCING..." : "COMMIT CHANGES"}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
         {/* Sidebar Nav */}
         <div className="space-y-2">
            {[
              { label: "General", icon: Globe, active: true },
              { label: "Security", icon: ShieldCheck, active: false },
              { label: "Notifications", icon: Bell, active: false },
              { label: "Billing", icon: CreditCard, active: false },
              { label: "Advanced", icon: Terminal, active: false },
            ].map((item, i) => (
              <button 
                key={i}
                className={cn(
                  "w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all",
                  item.active ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20" : "text-muted-foreground hover:bg-muted"
                )}
              >
                 <item.icon className="h-4 w-4" />
                 {item.label}
              </button>
            ))}
         </div>

         {/* Content */}
         <div className="md:col-span-3 space-y-12">
            <section className="space-y-8">
               <div className="space-y-1">
                  <h3 className="text-2xl font-black italic uppercase tracking-tight">General Branding</h3>
                  <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Manage platform identity across all storefronts</p>
               </div>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                     <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-2">PLATFORM NAME</label>
                     <Input defaultValue="Super-E Global" className="h-12 rounded-2xl bg-muted/20 border-none font-bold" />
                  </div>
                  <div className="space-y-3">
                     <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-2">SUPPORT EMAIL</label>
                     <Input defaultValue="support@supere.luxury" className="h-12 rounded-2xl bg-muted/20 border-none font-bold" />
                  </div>
               </div>
            </section>

            <Separator className="border-dashed" />

            <section className="space-y-8">
               <div className="space-y-1">
                  <h3 className="text-2xl font-black italic uppercase tracking-tight">Marketplace Logic</h3>
                  <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Global switches for platform behavior</p>
               </div>
               <div className="space-y-6">
                  {[
                    { label: "Multi-Vendor Capability", desc: "Allow multiple stores per tenant instance", active: true },
                    { label: "Auto-Verification", desc: "Instantly approve new vendor applications", active: false },
                    { label: "Maintenance Mode", desc: "Toggle global storefront accessibility", active: false },
                    { label: "Live Transactions", desc: "Enable real-time Stripe processing", active: true },
                  ].map((toggle, i) => (
                    <div key={i} className="flex items-center justify-between p-8 rounded-[2.5rem] bg-muted/20 border border-dashed hover:bg-muted/30 transition-all group">
                       <div className="space-y-1">
                          <p className="text-sm font-black italic uppercase tracking-tight group-hover:text-primary transition-colors">{toggle.label}</p>
                          <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{toggle.desc}</p>
                       </div>
                       <Switch defaultChecked={toggle.active} />
                    </div>
                  ))}
               </div>
            </section>

            <section className="p-10 rounded-[3rem] bg-zinc-900 text-white space-y-6 relative overflow-hidden">
               <div className="flex items-center gap-4 relative z-10">
                  <div className="h-12 w-12 rounded-2xl bg-white/10 flex items-center justify-center text-white">
                     <Database className="h-6 w-6" />
                  </div>
                  <div>
                     <h4 className="text-xl font-black italic uppercase tracking-tight">Data Purge</h4>
                     <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Critical action area</p>
                  </div>
               </div>
               <p className="text-[11px] font-medium text-white/60 leading-relaxed uppercase tracking-tight relative z-10">
                  Permanently delete all staging data and reset platform counters. This action is irreversible and requires root authorization.
               </p>
               <Button variant="destructive" className="relative z-10 rounded-full font-black italic uppercase h-12 px-10 shadow-2xl">
                  PURGE STAGING DATA
               </Button>
               {/* Decorative Element */}
               <div className="absolute -bottom-20 -left-20 h-64 w-64 bg-destructive/20 blur-[100px] rounded-full" />
            </section>
         </div>
      </div>
    </div>
  );
}
