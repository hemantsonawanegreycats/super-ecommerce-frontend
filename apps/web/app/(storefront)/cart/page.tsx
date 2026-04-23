"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ShoppingBag } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { useCartStore } from "@/features/cart/store/cart.store";
import { CartItem } from "@/features/cart/components/CartItem";
import { CartEmpty } from "@/features/cart/components/CartEmpty";
import { CouponInput } from "@/features/cart/components/CouponInput";

export default function CartPage() {
  const items = useCartStore((s) => s.items);
  const subtotal = useCartStore((s) => s.subtotal());
  const [discount, setDiscount] = useState(0);

  const shipping = subtotal > 50 ? 0 : items.length ? 5.99 : 0;
  const tax = subtotal * 0.08;
  const discountAmount = subtotal * (discount / 100);
  const total = Math.max(0, subtotal - discountAmount + shipping + tax);

  const format = (v: number) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(v);

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-10">
        <CartEmpty />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10 space-y-8">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-extrabold tracking-tight flex items-center gap-2">
            <ShoppingBag className="h-7 w-7" />
            Your cart
          </h1>
          <p className="text-sm text-muted-foreground">
            {items.length} item{items.length === 1 ? "" : "s"} ready for checkout
          </p>
        </div>
        <Link
          href="/"
          className="hidden sm:flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Continue shopping
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <section className="lg:col-span-7 xl:col-span-8 rounded-xl border bg-card p-4 sm:p-6">
          <div className="divide-y">
            {items.map((item) => (
              <CartItem key={`${item.id}-${item.variantId ?? ""}`} item={item} />
            ))}
          </div>
        </section>

        <aside className="lg:col-span-5 xl:col-span-4 space-y-4 rounded-xl border bg-card p-6 lg:sticky lg:top-24">
          <h2 className="text-lg font-bold">Order summary</h2>

          <CouponInput
            onApply={(c) => setDiscount(c ? c.amount : 0)}
          />

          <Separator />

          <div className="space-y-2 text-sm">
            <Row label="Subtotal" value={format(subtotal)} />
            {discount > 0 ? (
              <Row
                label={`Discount (${discount}%)`}
                value={`- ${format(discountAmount)}`}
                accent
              />
            ) : null}
            <Row
              label="Shipping"
              value={shipping === 0 ? "FREE" : format(shipping)}
              accent={shipping === 0}
            />
            <Row label="Tax (est.)" value={format(tax)} muted />
          </div>

          <Separator />

          <div className="flex justify-between text-base font-bold">
            <span>Total</span>
            <span>{format(total)}</span>
          </div>

          <Link
            href="/checkout/address"
            className={cn(buttonVariants({ size: "lg" }), "w-full h-12 font-bold")}
          >
            Proceed to checkout
          </Link>

          <p className="text-[11px] text-muted-foreground text-center">
            Shipping and taxes finalized at checkout
          </p>
        </aside>
      </div>
    </div>
  );
}

function Row({
  label,
  value,
  muted,
  accent,
}: {
  label: string;
  value: string;
  muted?: boolean;
  accent?: boolean;
}) {
  return (
    <div className="flex justify-between">
      <span className={muted ? "text-muted-foreground" : "text-muted-foreground"}>{label}</span>
      <span
        className={
          accent
            ? "font-semibold text-emerald-600"
            : muted
            ? "text-muted-foreground"
            : "font-medium"
        }
      >
        {value}
      </span>
    </div>
  );
}
