"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { vendorNavItems } from "./vendor-nav-items";
import { cn } from "@/lib/utils";
import { StoreSwitcher } from "@/features/store-switcher/components/StoreSwitcher";

export function VendorSidebar() {
  return (
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-64 flex-col border-r bg-background md:flex">
      <StoreSwitcher />
      <div className="flex-1 overflow-y-auto p-4">
        <VendorNavItems />
      </div>
    </aside>
  );
}

export function VendorNavItems() {
  const pathname = usePathname();

  return (
    <nav className="space-y-1">
      {vendorNavItems.map((item) => {
        const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
              isActive
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-muted"
            )}
          >
            <item.icon className="h-4 w-4" />
            {item.title}
          </Link>
        );
      })}
    </nav>
  );
}
