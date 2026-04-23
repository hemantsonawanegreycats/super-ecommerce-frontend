"use client";

import { VendorSidebar } from "./VendorSidebar";
import { VendorTopBar } from "./VendorTopBar";
import { BreadcrumbSystem } from "../shared/BreadcrumbSystem";

export function VendorShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-muted/20">
      <VendorSidebar />
      <div className="flex flex-col md:pl-64 h-full">
        <VendorTopBar />
        <main className="flex-1 p-6 lg:p-8">
          <BreadcrumbSystem />
          {children}
        </main>
      </div>
    </div>
  );
}
