import { cn } from "@/lib/utils";

export type OrderStatus =
  | "PENDING"
  | "CONFIRMED"
  | "PROCESSING"
  | "SHIPPED"
  | "DELIVERED"
  | "COMPLETED"
  | "CANCELLED"
  | "REFUNDED";

const STATUS_CONFIG: Record<OrderStatus, { label: string; className: string }> = {
  PENDING:    { label: "Pending",    className: "bg-yellow-500/10 text-yellow-600 border-yellow-200" },
  CONFIRMED:  { label: "Confirmed",  className: "bg-blue-500/10 text-blue-600 border-blue-200" },
  PROCESSING: { label: "Processing", className: "bg-purple-500/10 text-purple-600 border-purple-200" },
  SHIPPED:    { label: "Shipped",    className: "bg-indigo-500/10 text-indigo-600 border-indigo-200" },
  DELIVERED:  { label: "Delivered",  className: "bg-emerald-500/10 text-emerald-600 border-emerald-200" },
  COMPLETED:  { label: "Completed",  className: "bg-green-500/10 text-green-600 border-green-200" },
  CANCELLED:  { label: "Cancelled",  className: "bg-red-500/10 text-red-600 border-red-200" },
  REFUNDED:   { label: "Refunded",   className: "bg-gray-500/10 text-gray-600 border-gray-200" },
};

export function OrderStatusBadge({ status }: { status: OrderStatus }) {
  const cfg = STATUS_CONFIG[status] ?? STATUS_CONFIG.PENDING;
  return (
    <span className={cn(
      "inline-flex items-center rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider",
      cfg.className
    )}>
      {cfg.label}
    </span>
  );
}
