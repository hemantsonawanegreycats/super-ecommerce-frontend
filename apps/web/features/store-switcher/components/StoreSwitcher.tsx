"use client";

import { useMultiStore } from "../store";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { ChevronsUpDown, Check, PlusCircle, Store as StoreIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export function StoreSwitcher() {
  const { availableStores, getActiveStore, setActiveStore } = useMultiStore();
  const activeStore = getActiveStore();
  const router = useRouter();

  if (!activeStore) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={cn(
          "w-full h-16 flex items-center justify-between px-6 hover:bg-muted/50 rounded-none border-b",
          "focus:outline-none focus:ring-0"
        )}
      >
        <div className="flex items-center gap-3 overflow-hidden">
          <Avatar className="h-8 w-8 rounded-lg shrink-0">
            <AvatarImage src={activeStore.logoUrl} alt={activeStore.name} />
            <AvatarFallback className="rounded-lg bg-primary/10 text-primary font-black italic text-xs">
              {activeStore.name.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col items-start truncate text-left">
            <span className="text-sm font-black italic truncate uppercase">{activeStore.name}</span>
            <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest truncate">
              {activeStore.role}
            </span>
          </div>
        </div>
        <ChevronsUpDown className="h-4 w-4 shrink-0 text-muted-foreground opacity-50" />
      </DropdownMenuTrigger>
      
      <DropdownMenuContent className="w-64 rounded-2xl p-2 z-50" align="start" sideOffset={8}>
        <DropdownMenuLabel className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
          Your Stores
        </DropdownMenuLabel>
        
        {availableStores.map((store) => (
          <DropdownMenuItem
            key={store.id}
            onClick={() => {
              setActiveStore(store.id);
              router.refresh(); // Trigger context update for server components if any
            }}
            className="flex items-center gap-3 p-3 rounded-xl cursor-pointer"
          >
            <Avatar className="h-8 w-8 rounded-lg shrink-0">
              <AvatarImage src={store.logoUrl} alt={store.name} />
              <AvatarFallback className="rounded-lg bg-muted text-muted-foreground font-black italic text-xs">
                {store.name.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col flex-1 truncate">
              <span className="text-sm font-bold italic truncate">{store.name}</span>
              <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest truncate">
                {store.domain ?? `${store.slug}.super-e.com`}
              </span>
            </div>
            {store.id === activeStore.id && (
              <Check className="h-4 w-4 text-primary shrink-0 ml-auto" />
            )}
          </DropdownMenuItem>
        ))}

        <DropdownMenuSeparator className="my-2" />
        
        <Link href="/vendor/onboarding" passHref legacyBehavior>
          <DropdownMenuItem className="flex items-center gap-2 p-3 rounded-xl cursor-pointer text-primary focus:bg-primary/5 focus:text-primary">
            <PlusCircle className="h-4 w-4 shrink-0" />
            <span className="text-xs font-black italic uppercase tracking-tight">Create New Store</span>
          </DropdownMenuItem>
        </Link>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
