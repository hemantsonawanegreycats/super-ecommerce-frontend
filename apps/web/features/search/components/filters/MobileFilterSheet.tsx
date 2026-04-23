"use client";

import { useState } from "react";
import { SlidersHorizontal } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { FilterSidebar } from "../FilterSidebar";

interface MobileFilterSheetProps {
  activeCount?: number;
}

export function MobileFilterSheet({ activeCount = 0 }: MobileFilterSheetProps) {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        render={
          <Button variant="outline" className="lg:hidden gap-2">
            <SlidersHorizontal className="h-4 w-4" />
            Filters
            {activeCount > 0 ? (
              <span className="ml-1 rounded-full bg-primary text-primary-foreground text-[10px] font-bold h-4 min-w-4 px-1 flex items-center justify-center">
                {activeCount}
              </span>
            ) : null}
          </Button>
        }
      />
      <SheetContent side="left" className="w-full max-w-sm p-0 flex flex-col">
        <SheetHeader className="px-6 py-4 border-b">
          <SheetTitle>Filters</SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto px-6 py-4">
          <FilterSidebar />
        </div>

        <SheetFooter className="border-t px-6 py-4 flex-row gap-2">
          <Button variant="outline" className="flex-1" onClick={() => setOpen(false)}>
            Reset
          </Button>
          <Button className="flex-1" onClick={() => setOpen(false)}>
            Apply filters
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
