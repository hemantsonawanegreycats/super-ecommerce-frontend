"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Plus } from "lucide-react";

export function FirstProduct() {
  return (
    <div className="space-y-6 text-center">
      <div className="max-w-md mx-auto space-y-4 py-8">
        <div className="flex justify-center">
          <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center">
            <Plus className="h-10 w-10 text-primary" />
          </div>
        </div>
        <h3 className="text-xl font-medium">Add your first product</h3>
        <p className="text-muted-foreground text-sm">
          You can skip this step and add products later from your dashboard. Adding a product now helps us set up your store faster.
        </p>
        <div className="pt-4">
          <Card className="border-dashed cursor-pointer hover:bg-muted/50 transition-colors">
            <CardContent className="py-10">
              <span className="text-sm font-medium text-primary">+ Create Product Listing</span>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
