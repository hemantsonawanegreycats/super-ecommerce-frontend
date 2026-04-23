"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CreditCard, MapPin, Pencil, ShieldCheck, Truck, ArrowLeft, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { CheckoutStepper } from "@/features/checkout/components/CheckoutStepper";
import { OrderSummary } from "@/features/checkout/components/OrderSummary";
import { useCartStore } from "@/features/cart/store/cart.store";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export default function ReviewPage() {
  const router = useRouter();
  const clearCart = useCartStore((s) => s.clearCart);
  const items = useCartStore((s) => s.items);
  const [accepted, setAccepted] = useState(false);
  const [placing, setPlacing] = useState(false);

  const placeOrder = async () => {
    if (!accepted) {
      toast.error("Please accept the terms and conditions");
      return;
    }
    setPlacing(true);
    // Simulate luxury weight
    await new Promise((r) => setTimeout(r, 2000));
    const orderId = `ord_${Math.random().toString(36).slice(2, 10)}`;
    clearCart();
    router.push(`/checkout/success/${orderId}`);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col max-w-6xl mx-auto"
    >
      <CheckoutStepper />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        <div className="lg:col-span-7 space-y-10">
          <div className="space-y-2">
            <h2 className="text-4xl font-black italic tracking-tight">FINAL REVIEW</h2>
            <p className="text-muted-foreground font-medium">Verify your details and confirm your selection.</p>
          </div>

          <div className="bg-background rounded-[2.5rem] border shadow-2xl shadow-primary/5 p-10 space-y-10">
            <ReviewSection
              icon={<MapPin className="h-5 w-5" />}
              title="Shipping Destination"
              editHref="/checkout/address"
            >
              <div className="space-y-1">
                <p className="font-black italic">John Doe</p>
                <p className="text-sm text-muted-foreground font-medium leading-relaxed">
                  123 Main St, Suite 4<br />
                  San Francisco, CA 94103<br />
                  United States
                </p>
              </div>
            </ReviewSection>

            <Separator className="border-dashed" />

            <ReviewSection
              icon={<Truck className="h-5 w-5" />}
              title="Delivery Method"
              editHref="/checkout/shipping"
            >
              <div className="flex items-center justify-between bg-muted/20 p-4 rounded-2xl border border-border/40">
                <div>
                  <p className="text-sm font-black italic uppercase">Luxury Standard Shipping</p>
                  <p className="text-xs text-muted-foreground font-medium">Estimated 3–5 business days</p>
                </div>
                <span className="text-xs font-black italic text-emerald-600 bg-emerald-500/5 px-3 py-1 rounded-full">FREE</span>
              </div>
            </ReviewSection>

            <Separator className="border-dashed" />

            <ReviewSection
              icon={<CreditCard className="h-5 w-5" />}
              title="Payment Information"
              editHref="/checkout/payment"
            >
              <div className="flex items-center gap-4">
                 <div className="h-10 w-10 rounded-xl bg-muted flex items-center justify-center">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" className="h-3" alt="Visa" />
                 </div>
                 <div>
                    <p className="text-sm font-black italic uppercase">Visa ending in •••• 4242</p>
                    <p className="text-xs text-muted-foreground font-medium">Expires 12/2028</p>
                 </div>
              </div>
            </ReviewSection>

            <Separator className="border-dashed" />

            {/* Terms and Policies */}
            <div className="space-y-6">
              <div className="rounded-[1.5rem] border bg-emerald-500/5 border-emerald-500/10 p-6 flex gap-4">
                <ShieldCheck className="h-6 w-6 text-emerald-600 shrink-0" />
                <div className="text-xs text-emerald-700/80 leading-relaxed font-medium">
                  Your purchase is protected by our **Luxury Satisfaction Guarantee**. 
                  You have a 1-hour window to modify your order after confirmation. 
                  All payments are processed securely via SSL encryption.
                </div>
              </div>

              <div className="flex items-start gap-3 p-2 group cursor-pointer" onClick={() => setAccepted(!accepted)}>
                <div className={cn(
                  "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border-2 transition-all duration-300",
                  accepted ? "bg-primary border-primary" : "border-muted-foreground/30 group-hover:border-primary/50"
                )}>
                  {accepted && <CheckCircle2 className="h-3.5 w-3.5 text-primary-foreground" />}
                </div>
                <Label htmlFor="terms" className="text-xs font-bold leading-relaxed text-muted-foreground cursor-pointer select-none">
                  I confirm that all provided details are correct and I agree to the{" "}
                  <Link href="/terms" className="text-foreground underline underline-offset-2 hover:text-primary transition-colors">Terms of Service</Link>
                  .
                </Label>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button 
                variant="ghost" 
                className="flex-1 h-16 rounded-full font-black italic tracking-widest text-muted-foreground hover:text-foreground" 
                onClick={() => router.back()} 
                disabled={placing}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                GO BACK
              </Button>
              <Button 
                className={cn(
                  "flex-[2] h-16 rounded-full text-lg font-black italic group shadow-2xl transition-all duration-500",
                  accepted ? "shadow-primary/20" : "opacity-50 grayscale cursor-not-allowed"
                )} 
                onClick={placeOrder} 
                disabled={placing || !accepted || items.length === 0}
              >
                {placing ? (
                  <span className="flex items-center gap-3">
                     <span className="h-5 w-5 rounded-full border-2 border-primary-foreground border-r-transparent animate-spin" />
                     CONFIRMING ORDER...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    CONFIRM & PAY NOW
                    <CheckCircle2 className="ml-2 h-5 w-5" />
                  </span>
                )}
              </Button>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5">
          <OrderSummary />
        </div>
      </div>
    </motion.div>
  );
}

function ReviewSection({
  icon,
  title,
  editHref,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  editHref: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-primary/5 text-primary flex items-center justify-center">
            {icon}
          </div>
          <h3 className="font-black italic tracking-tight uppercase text-sm">{title}</h3>
        </div>
        <Link
          href={editHref}
          className="flex items-center gap-2 text-xs font-black italic uppercase tracking-widest text-primary hover:bg-primary/5 px-4 py-2 rounded-full transition-colors"
        >
          <Pencil className="h-3 w-3" />
          Edit
        </Link>
      </div>
      <div className="pl-[3.25rem]">{children}</div>
    </div>
  );
}
