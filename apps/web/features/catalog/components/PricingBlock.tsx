import { cn } from "@/lib/utils";

interface PricingBlockProps {
  price: number;
  compareAtPrice?: number;
  discountPercentage?: number;
  role?: "CUSTOMER" | "VENDOR" | "ADMIN" | "SUPER_ADMIN" | "GUEST";
  className?: string;
  size?: "sm" | "default" | "lg";
}

export function PricingBlock({
  price,
  compareAtPrice,
  discountPercentage,
  role = "GUEST",
  className,
  size = "default"
}: PricingBlockProps) {
  
  // Format currency
  const format = (v: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(v);

  return (
    <div className={cn("flex flex-col gap-1", className)}>
      <div className="flex items-end gap-2 flex-wrap">
        {/* Main Price */}
        <span className={cn(
          "font-bold tracking-tight text-foreground",
          size === "sm" ? "text-base" : size === "lg" ? "text-3xl" : "text-xl"
        )}>
          {format(price)}
        </span>
        
        {/* Strikethrough price if available */}
        {compareAtPrice && compareAtPrice > price && (
          <span className={cn(
            "text-muted-foreground line-through decoration-muted-foreground/40",
            size === "sm" ? "text-xs" : size === "lg" ? "text-base pb-1" : "text-sm pb-0.5"
          )}>
            {format(compareAtPrice)}
          </span>
        )}

        {/* Discount Badge */}
        {discountPercentage && discountPercentage > 0 && (
          <span className="bg-destructive/10 text-destructive text-xs font-semibold px-1.5 py-0.5 rounded-sm ml-1 mb-0.5">
            -{discountPercentage}%
          </span>
        )}
      </div>

      {/* Role-based specific metadata */}
      {(role === "VENDOR" || role === "ADMIN" || role === "SUPER_ADMIN") && (
        <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">
          Margin: {format(price * 0.15)} (15%)
        </span>
      )}
    </div>
  );
}
