"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { adminNavItems } from "./admin-nav-items";
import { cn } from "@/lib/utils";

export function AdminSidebar() {
  return (
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-64 flex-col border-r bg-background md:flex">
      <div className="flex h-16 items-center border-b px-6">
        <h2 className="text-lg font-semibold tracking-tight">Super-E Admin</h2>
      </div>
      <div className="flex-1 overflow-y-auto p-4">
        <NavItems />
      </div>
    </aside>
  );
}

export function NavItems() {
  const pathname = usePathname();

  return (
    <nav className="space-y-1">
      {adminNavItems.map((item) => {
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
