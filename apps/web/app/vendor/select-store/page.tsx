"use client";

import { useMultiStore } from "@/features/store-switcher/store";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ChevronRight, PlusCircle, Store as StoreIcon, Settings2, Globe } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

export default function SelectStorePage() {
  const { availableStores, setActiveStore } = useMultiStore();
  const router = useRouter();

  const handleSelectStore = (id: string) => {
    setActiveStore(id);
    router.push("/vendor/dashboard");
  };

  return (
    <div className="min-h-screen bg-muted/20 flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-4xl space-y-12">
        <div className="text-center space-y-4">
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
            <div className="h-16 w-16 bg-primary/10 text-primary rounded-3xl flex items-center justify-center mx-auto mb-6">
              <StoreIcon className="h-8 w-8" />
            </div>
            <h1 className="text-4xl md:text-5xl font-black italic tracking-tighter uppercase">Select a Store</h1>
            <p className="text-sm font-bold text-muted-foreground uppercase tracking-[0.2em] mt-4">
              Choose the storefront you want to manage
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {availableStores.map((store, i) => (
            <motion.button
              key={store.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              onClick={() => handleSelectStore(store.id)}
              className="group text-left p-6 rounded-[2.5rem] bg-background border-2 border-transparent hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/5 transition-all flex flex-col gap-6"
            >
              <div className="flex items-start justify-between w-full">
                <Avatar className="h-16 w-16 rounded-[1.5rem] shadow-sm">
                  <AvatarImage src={store.logoUrl} alt={store.name} />
                  <AvatarFallback className="bg-muted text-muted-foreground font-black italic text-xl rounded-[1.5rem]">
                    {store.name.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className={cn(
                    "text-[9px] font-black uppercase tracking-widest px-3 py-1 border-2",
                    store.status === "live" ? "text-emerald-600 border-emerald-500/20 bg-emerald-500/5" : "text-amber-600 border-amber-500/20 bg-amber-500/5"
                  )}>
                    {store.status}
                  </Badge>
                </div>
              </div>

              <div className="space-y-2">
                <h2 className="text-2xl font-black italic uppercase tracking-tight group-hover:text-primary transition-colors">
                  {store.name}
                </h2>
                <div className="flex items-center gap-4 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                  <span className="flex items-center gap-1.5"><Globe className="h-3 w-3" /> {store.domain ?? `${store.slug}.super-e.com`}</span>
                </div>
              </div>

              <div className="mt-auto pt-6 border-t border-dashed w-full flex items-center justify-between">
                <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                  Role: {store.role}
                </span>
                <div className="h-8 w-8 rounded-full bg-muted/50 flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                  <ChevronRight className="h-4 w-4" />
                </div>
              </div>
            </motion.button>
          ))}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: availableStores.length * 0.1 }}
          >
            <Link href="/vendor/onboarding" className="block h-full">
              <div className="h-full min-h-[280px] p-6 rounded-[2.5rem] border-2 border-dashed border-primary/20 hover:border-primary/50 bg-primary/5 hover:bg-primary/10 transition-all flex flex-col items-center justify-center text-center gap-6 group">
                <div className="h-16 w-16 bg-background rounded-[1.5rem] shadow-sm flex items-center justify-center group-hover:scale-110 transition-transform">
                  <PlusCircle className="h-8 w-8 text-primary" />
                </div>
                <div className="space-y-2">
                  <h2 className="text-xl font-black italic uppercase tracking-tight text-primary">
                    Create New Store
                  </h2>
                  <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                    Launch your next big idea
                  </p>
                </div>
              </div>
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
