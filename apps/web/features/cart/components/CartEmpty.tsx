import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface CartEmptyProps {
  compact?: boolean;
}

export function CartEmpty({ compact }: CartEmptyProps) {
  return (
    <div className={compact ? "flex flex-col items-center justify-center text-center py-12 px-6" : "flex flex-col items-center justify-center text-center py-24 px-6"}>
      <div className="relative mb-6">
        <div className="absolute inset-0 scale-150 blur-2xl opacity-20 bg-primary rounded-full" />
        <div className="relative z-10 rounded-full bg-muted p-6">
          <ShoppingBag className="h-10 w-10 text-muted-foreground" />
        </div>
      </div>
      <h3 className="text-lg font-bold mb-1">Your cart is empty</h3>
      <p className="text-sm text-muted-foreground max-w-xs mb-6">
        Looks like you haven&apos;t added anything yet. Browse the marketplace to find something you love.
      </p>
      <Link href="/" className={cn(buttonVariants({ size: "lg" }), "px-6 h-11")}>
        Start shopping
      </Link>
    </div>
  );
}
