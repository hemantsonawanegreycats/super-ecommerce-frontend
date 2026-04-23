"use client";

import Link from "next/link";
import { Plus, Search, MoreHorizontal } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { OrderStatusBadge } from "@/features/orders/components/OrderStatusBadge";
import { cn } from "@/lib/utils";

const MOCK_PRODUCTS = [
  { id: "p_1", title: "Premium Weighted Blanket, 15lbs", sku: "BLANKET-15LB", price: 129.99, inventory: 47, status: "COMPLETED" as const, imageUrl: "https://images.unsplash.com/photo-1583845258933-289c09d57a9e?q=80&w=80" },
  { id: "p_2", title: "Cooling Bamboo Blanket for Summer", sku: "BLANKET-BAMBOO", price: 85.00, inventory: 12, status: "PROCESSING" as const, imageUrl: "https://images.unsplash.com/photo-1629853900989-1cdb71454c7d?q=80&w=80" },
  { id: "p_3", title: "Chunky Knit Weighted Blanket", sku: "BLANKET-KNIT-L", price: 199.99, inventory: 0, status: "PENDING" as const, imageUrl: "https://images.unsplash.com/photo-1580828369065-27a3c75127ee?q=80&w=80" },
];

export default function VendorProductsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Products</h1>
          <p className="text-sm text-muted-foreground">Manage your store's product catalogue.</p>
        </div>
        <Link
          href="/vendor/products/new"
          className={cn(buttonVariants(), "gap-2")}
        >
          <Plus className="h-4 w-4" /> Add Product
        </Link>
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Search products..." className="pl-9" />
      </div>

      {/* Table */}
      <div className="rounded-xl border bg-card shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b bg-muted/30">
              {["Product", "SKU", "Price", "Stock", "Status", ""].map(h => (
                <th key={h} className="text-left p-4 font-medium text-muted-foreground">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y">
            {MOCK_PRODUCTS.map((p) => (
              <tr key={p.id} className="hover:bg-muted/30 transition-colors">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 shrink-0 rounded-md border overflow-hidden bg-muted">
                      <img src={p.imageUrl} alt={p.title} className="h-full w-full object-cover" />
                    </div>
                    <span className="font-medium line-clamp-1">{p.title}</span>
                  </div>
                </td>
                <td className="p-4 font-mono text-xs text-muted-foreground">{p.sku}</td>
                <td className="p-4 font-semibold">${p.price.toFixed(2)}</td>
                <td className="p-4">
                  <span className={p.inventory === 0 ? "text-destructive font-medium" : ""}>{p.inventory} units</span>
                </td>
                <td className="p-4">
                  {/* Reuse status badge with product statuses */}
                  <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider border ${p.inventory === 0 ? "bg-red-500/10 text-red-600 border-red-200" : "bg-emerald-500/10 text-emerald-600 border-emerald-200"}`}>
                    {p.inventory === 0 ? "Out of Stock" : "Active"}
                  </span>
                </td>
                <td className="p-4 text-right">
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
