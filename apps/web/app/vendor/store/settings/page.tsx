"use client";

import { useState } from "react";
import { 
  Store, 
  MapPin, 
  CreditCard, 
  Bell, 
  Truck, 
  RefreshCcw, 
  Save,
  Globe,
  Mail,
  Phone
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export default function StoreSettingsPage() {
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      toast.success("Store settings updated successfully");
    }, 1000);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div className="space-y-2">
           <h1 className="text-4xl lg:text-6xl font-black italic tracking-tighter uppercase leading-none">Settings</h1>
           <p className="text-muted-foreground font-medium uppercase text-[10px] tracking-[0.2em]">Manage your store profile and operational policies</p>
        </div>
        <Button 
          onClick={handleSave} 
          disabled={isSaving}
          className="rounded-full font-black italic uppercase h-14 px-12 shadow-xl gap-2"
        >
           {isSaving ? <span className="animate-spin mr-2">/</span> : <Save className="h-4 w-4" />}
           {isSaving ? "SAVING..." : "SAVE CHANGES"}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
         {/* Sidebar Nav */}
         <div className="space-y-2">
            {[
              { label: "Store Profile", icon: Store, active: true },
              { label: "Locations", icon: MapPin, active: false },
              { label: "Payments", icon: CreditCard, active: false },
              { label: "Notifications", icon: Bell, active: false },
              { label: "Shipping", icon: Truck, active: false },
              { label: "Returns", icon: RefreshCcw, active: false },
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
                  <h3 className="text-2xl font-black italic uppercase tracking-tight">Basic Information</h3>
                  <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Public-facing details for your customers</p>
               </div>
               
               <div className="space-y-6">
                  <div className="space-y-3">
                     <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-2">STORE NAME</label>
                     <Input defaultValue="SleepWell Co." className="h-14 rounded-2xl bg-muted/20 border-none font-bold text-lg" />
                  </div>
                  
                  <div className="space-y-3">
                     <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-2">STORE BIO</label>
                     <Textarea 
                       defaultValue="Premium comfort products designed for a better night's rest. We specialize in weighted blankets and luxury throws." 
                       className="min-h-[120px] rounded-[2rem] bg-muted/20 border-none font-medium resize-none p-6" 
                     />
                  </div>
               </div>
            </section>

            <Separator className="border-dashed" />

            <section className="space-y-8">
               <div className="space-y-1">
                  <h3 className="text-2xl font-black italic uppercase tracking-tight">Contact Details</h3>
                  <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">How customers and the platform reach you</p>
               </div>
               
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                     <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-2">CUSTOMER SUPPORT EMAIL</label>
                     <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input defaultValue="hello@sleepwell.co" className="h-14 pl-12 rounded-2xl bg-muted/20 border-none font-medium" />
                     </div>
                  </div>
                  <div className="space-y-3">
                     <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-2">SUPPORT PHONE</label>
                     <div className="relative">
                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input defaultValue="+1 (555) 123-4567" className="h-14 pl-12 rounded-2xl bg-muted/20 border-none font-medium" />
                     </div>
                  </div>
                  <div className="space-y-3 md:col-span-2">
                     <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-2">WEBSITE OR SOCIAL LINK</label>
                     <div className="relative">
                        <Globe className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input defaultValue="https://sleepwell.co" className="h-14 pl-12 rounded-2xl bg-muted/20 border-none font-medium" />
                     </div>
                  </div>
               </div>
            </section>

            <Separator className="border-dashed" />

            <section className="space-y-8">
               <div className="space-y-1">
                  <h3 className="text-2xl font-black italic uppercase tracking-tight">Store Operations</h3>
                  <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Manage how your store behaves on the platform</p>
               </div>
               
               <div className="space-y-6">
                  {[
                    { label: "Accepting Orders", desc: "Allow customers to place new orders", active: true },
                    { label: "Auto-Accept Bookings", desc: "Instantly confirm stay and experience bookings", active: false },
                    { label: "Show Inventory Levels", desc: "Display remaining stock to customers", active: true },
                    { label: "Vacation Mode", desc: "Temporarily pause your store", active: false },
                  ].map((toggle, i) => (
                    <div key={i} className="flex items-center justify-between p-6 rounded-[2rem] bg-muted/20 border border-dashed hover:bg-muted/30 transition-all group">
                       <div className="space-y-1">
                          <p className="text-sm font-black italic uppercase tracking-tight group-hover:text-primary transition-colors">{toggle.label}</p>
                          <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{toggle.desc}</p>
                       </div>
                       <Switch defaultChecked={toggle.active} />
                    </div>
                  ))}
               </div>
            </section>
         </div>
      </div>
    </div>
  );
}
