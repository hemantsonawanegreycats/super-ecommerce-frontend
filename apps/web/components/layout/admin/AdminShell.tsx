"use client";

import { AdminSidebar } from "./AdminSidebar";
import { AdminTopBar } from "./AdminTopBar";
import { BreadcrumbSystem } from "../shared/BreadcrumbSystem";

export function AdminShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-muted/20">
      <AdminSidebar />
      <div className="flex flex-col md:pl-64 h-full">
        <AdminTopBar />
        <main className="flex-1 p-6 lg:p-8">
          <BreadcrumbSystem />
          {children}
        </main>
      </div>
    </div>
  );
}
