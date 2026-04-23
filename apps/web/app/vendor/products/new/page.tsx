"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ImageUploader } from "@/components/forms/ImageUploader";
import { ChevronLeft, Plus, Trash2 } from "lucide-react";

const productSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  price: z.coerce.number().positive("Price must be positive"),
  compareAtPrice: z.coerce.number().optional(),
  inventory: z.coerce.number().int().nonnegative("Inventory must be 0 or more"),
  sku: z.string().optional(),
});

type ProductFormData = z.infer<typeof productSchema>;

export default function NewProductPage() {
  const router = useRouter();
  const [variants, setVariants] = useState([{ name: "Size", values: "S, M, L, XL" }]);
  const [isSaving, setIsSaving] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema) as any,
    defaultValues: { inventory: 0 },
  });

  const onSubmit = async (data: ProductFormData) => {
    setIsSaving(true);
    await new Promise(r => setTimeout(r, 800));
    console.log("Product data:", data, "Variants:", variants);
    setIsSaving(false);
    router.push("/vendor/products");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="sm" onClick={() => router.back()} className="gap-1">
          <ChevronLeft className="h-4 w-4" /> Back
        </Button>
        <h1 className="text-2xl font-bold tracking-tight">Add New Product</h1>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Info */}
            <div className="rounded-xl border bg-card p-6 shadow-sm space-y-5">
              <h2 className="font-semibold">Basic Information</h2>

              <div className="space-y-2">
                <Label htmlFor="title">Product Title *</Label>
                <Input id="title" placeholder="e.g. Premium Weighted Blanket" {...register("title")} className={errors.title ? "border-destructive" : ""} />
                {errors.title && <p className="text-xs text-destructive">{errors.title.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <textarea
                  id="description"
                  rows={5}
                  placeholder="Describe your product in detail..."
                  {...register("description")}
                  className={`flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring resize-none ${errors.description ? "border-destructive" : ""}`}
                />
                {errors.description && <p className="text-xs text-destructive">{errors.description.message}</p>}
              </div>
            </div>

            {/* Media */}
            <div className="rounded-xl border bg-card p-6 shadow-sm">
              <h2 className="font-semibold mb-5">Product Images</h2>
              <ImageUploader maxFiles={8} label="" />
            </div>

            {/* Pricing */}
            <div className="rounded-xl border bg-card p-6 shadow-sm space-y-5">
              <h2 className="font-semibold">Pricing</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="price">Price (USD) *</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">$</span>
                    <Input id="price" type="number" step="0.01" placeholder="0.00" className={`pl-7 ${errors.price ? "border-destructive" : ""}`} {...register("price")} />
                  </div>
                  {errors.price && <p className="text-xs text-destructive">{errors.price.message}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="compareAtPrice">Compare-at Price</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">$</span>
                    <Input id="compareAtPrice" type="number" step="0.01" placeholder="0.00" className="pl-7" {...register("compareAtPrice")} />
                  </div>
                  <p className="text-xs text-muted-foreground">Shows as strikethrough (sale price).</p>
                </div>
              </div>
            </div>

            {/* Variants */}
            <div className="rounded-xl border bg-card p-6 shadow-sm space-y-5">
              <div className="flex items-center justify-between">
                <h2 className="font-semibold">Variants / Options</h2>
                <Button type="button" variant="outline" size="sm" className="gap-1" onClick={() => setVariants(v => [...v, { name: "", values: "" }])}>
                  <Plus className="h-3.5 w-3.5" /> Add Option
                </Button>
              </div>
              {variants.map((variant, idx) => (
                <div key={idx} className="grid grid-cols-[1fr_2fr_auto] gap-3 items-end">
                  <div className="space-y-1.5">
                    <Label className="text-xs">Option Name</Label>
                    <Input placeholder="e.g. Size" value={variant.name} onChange={e => setVariants(v => v.map((vv, i) => i === idx ? { ...vv, name: e.target.value } : vv))} />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs">Values (comma separated)</Label>
                    <Input placeholder="e.g. S, M, L, XL" value={variant.values} onChange={e => setVariants(v => v.map((vv, i) => i === idx ? { ...vv, values: e.target.value } : vv))} />
                  </div>
                  <Button type="button" variant="ghost" size="icon" className="text-muted-foreground hover:text-destructive" onClick={() => setVariants(v => v.filter((_, i) => i !== idx))}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6 sticky top-24">
            {/* Publish & Status */}
            <div className="rounded-xl border bg-card p-6 shadow-sm space-y-5">
              <h2 className="font-semibold">Publish</h2>
              <div className="space-y-2">
                <Label>Status</Label>
                <select className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
                  <option value="draft">Draft</option>
                  <option value="active">Active (Live)</option>
                  <option value="archived">Archived</option>
                </select>
              </div>
              <div className="flex flex-col gap-2 pt-2">
                <Button type="submit" className="w-full" disabled={isSaving}>
                  {isSaving ? "Saving..." : "Save Product"}
                </Button>
                <Button type="button" variant="outline" className="w-full" onClick={() => router.back()}>
                  Discard
                </Button>
              </div>
            </div>

            {/* Inventory */}
            <div className="rounded-xl border bg-card p-6 shadow-sm space-y-4">
              <h2 className="font-semibold">Inventory</h2>
              <div className="space-y-2">
                <Label htmlFor="sku">SKU</Label>
                <Input id="sku" placeholder="e.g. BLANKET-15LB-GRY" {...register("sku")} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="inventory">Stock Quantity *</Label>
                <Input id="inventory" type="number" placeholder="0" {...register("inventory")} className={errors.inventory ? "border-destructive" : ""} />
                {errors.inventory && <p className="text-xs text-destructive">{errors.inventory.message}</p>}
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
