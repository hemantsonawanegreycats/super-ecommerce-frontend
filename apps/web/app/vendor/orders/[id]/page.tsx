"use client";

import { useState, use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  ChevronLeft, 
  Truck, 
  CheckCircle2, 
  Package, 
  User, 
  MapPin, 
  CreditCard, 
  ClipboardCheck,
  Zap,
  ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { OrderStatusBadge, OrderStatus } from "@/features/orders/components/OrderStatusBadge";
import { OrderTimeline } from "@/features/orders/components/OrderTimeline";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

const CARRIERS = ["UPS Premium", "FedEx Express", "DHL Global", "BlueDart Priority"];

const format = (v: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(v);

export default function VendorOrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const [status, setStatus] = useState<OrderStatus>("CONFIRMED");
  const [trackingNumber, setTrackingNumber] = useState("");
  const [carrier, setCarrier] = useState(CARRIERS[0]);
  const [isUpdating, setIsUpdating] = useState(false);

  const order = {
    id,
    date: "April 21, 2026",
    customer: { name: "John Doe", email: "john@example.com", phone: "+1 (555) 000-0000", loyalty: "Platinum Member" },
    total: 189.00,
    items: [
      { id: "1", title: "The Cloud-Weight Premium Blanket", price: 189.00, quantity: 1, imageUrl: "https://images.unsplash.com/photo-1583845258933-289c09d57a9e?q=80&w=200" },
    ],
    shippingAddress: { name: "John Doe", line1: "123 Main St, Suite 4", city: "San Francisco", state: "CA", zip: "94103", country: "US" },
  };

  const handleUpdateStatus = async (newStatus: OrderStatus) => {
    setIsUpdating(true);
    // Simulate luxury weight
    await new Promise(r => setTimeout(r, 800));
    setStatus(newStatus);
    setIsUpdating(false);
  };

  return (
    <div className="space-y-12 pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="flex items-center gap-6">
           <button 
             onClick={() => router.back()} 
             className="h-12 w-12 rounded-full bg-muted/50 flex items-center justify-center hover:bg-primary/10 hover:text-primary transition-all group"
           >
              <ChevronLeft className="h-5 w-5 transition-transform group-hover:-translate-x-1" />
           </button>
           <div className="space-y-1">
              <h1 className="text-4xl lg:text-5xl font-black italic tracking-tighter leading-none uppercase">{order.id}</h1>
              <p className="text-muted-foreground font-medium uppercase tracking-widest text-[10px]">Received {order.date} • Electronic Filing</p>
           </div>
        </div>
        <OrderStatusBadge status={status} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left: Actions + Items */}
        <div className="lg:col-span-8 space-y-10">
          
          {/* FULFILLMENT CONTROL CENTER */}
          <div className="rounded-[2.5rem] border bg-background p-10 shadow-2xl shadow-primary/5 space-y-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-5">
               <Zap className="h-32 w-32 rotate-12" />
            </div>

            <div className="relative z-10 space-y-6">
              <div className="flex items-center gap-3">
                 <div className="h-10 w-10 rounded-xl bg-primary/5 flex items-center justify-center">
                    <ClipboardCheck className="h-5 w-5 text-primary" />
                 </div>
                 <h2 className="text-xl font-black italic tracking-tight uppercase">Control Center</h2>
              </div>

              <AnimatePresence mode="wait">
                {status === "CONFIRMED" && (
                  <motion.div 
                    key="confirmed"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    className="space-y-6"
                  >
                    <p className="text-sm font-medium text-muted-foreground max-w-md">
                      Payment has been verified. You can now initiate the artisan packing process for this order.
                    </p>
                    <Button 
                      className="w-full h-16 rounded-full text-lg font-black italic gap-3 shadow-xl" 
                      onClick={() => handleUpdateStatus("PROCESSING")} 
                      disabled={isUpdating}
                    >
                      {isUpdating ? "PROCESSING..." : "INITIATE PACKING"}
                      <Package className="h-5 w-5" />
                    </Button>
                  </motion.div>
                )}

                {status === "PROCESSING" && (
                  <motion.div 
                    key="processing"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    className="space-y-8"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60 ml-1">Logistic Carrier</Label>
                        <select
                          className="flex h-12 w-full rounded-xl bg-muted/30 border-none px-4 py-2 text-sm font-bold focus:ring-2 focus:ring-primary/20 outline-none"
                          value={carrier}
                          onChange={(e) => setCarrier(e.target.value)}
                        >
                          {CARRIERS.map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60 ml-1">Waybill / Tracking</Label>
                        <Input 
                          placeholder="ENTER NUMBER..." 
                          className="h-12 rounded-xl bg-muted/30 border-none font-bold" 
                          value={trackingNumber} 
                          onChange={(e) => setTrackingNumber(e.target.value)} 
                        />
                      </div>
                    </div>
                    <Button 
                      className="w-full h-16 rounded-full text-lg font-black italic gap-3 shadow-xl" 
                      onClick={() => handleUpdateStatus("SHIPPED")} 
                      disabled={isUpdating || !trackingNumber}
                    >
                      {isUpdating ? "UPDATING LOGISTICS..." : "DISPATCH SHIPMENT"}
                      <Truck className="h-5 w-5" />
                    </Button>
                  </motion.div>
                )}

                {status === "SHIPPED" && (
                  <motion.div 
                    key="shipped"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    className="space-y-6"
                  >
                    <p className="text-sm font-medium text-muted-foreground max-w-md">
                      Package is currently with {carrier}. Monitor tracking or manually confirm final delivery.
                    </p>
                    <Button 
                      className="w-full h-16 rounded-full text-lg font-black italic gap-3 shadow-xl bg-emerald-600 hover:bg-emerald-700" 
                      onClick={() => handleUpdateStatus("DELIVERED")} 
                      disabled={isUpdating}
                    >
                      CONFIRM FINAL DELIVERY
                      <CheckCircle2 className="h-5 w-5" />
                    </Button>
                  </motion.div>
                )}

                {(status === "DELIVERED" || status === "COMPLETED") && (
                  <motion.div 
                    key="completed"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="rounded-[1.5rem] bg-emerald-500/5 border border-emerald-500/10 p-8 flex items-center gap-6"
                  >
                    <div className="h-12 w-12 rounded-full bg-emerald-500/10 flex items-center justify-center shrink-0">
                       <CheckCircle2 className="h-6 w-6 text-emerald-600" />
                    </div>
                    <div className="space-y-1">
                       <p className="font-black italic text-lg uppercase tracking-tight text-emerald-700">FULFILLMENT COMPLETE</p>
                       <p className="text-xs font-bold text-emerald-600/70 uppercase tracking-widest">The luxury cycle for this order is finished.</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* ITEM MANIFEST */}
          <div className="rounded-[2.5rem] border bg-background p-10 shadow-2xl shadow-primary/5 space-y-8">
             <h3 className="font-black italic text-lg uppercase tracking-tight">ITEM MANIFEST</h3>
             <div className="space-y-6">
               {order.items.map((item) => (
                 <div key={item.id} className="flex flex-col sm:flex-row sm:items-center gap-6 border-b border-dashed border-border/60 pb-6 last:border-0 last:pb-0">
                    <div className="h-24 w-24 shrink-0 overflow-hidden rounded-2xl border bg-muted/30">
                       <img src={item.imageUrl} alt={item.title} className="h-full w-full object-cover" />
                    </div>
                    <div className="flex-1 space-y-1">
                       <h4 className="font-black italic text-lg tracking-tight leading-tight">{item.title}</h4>
                       <div className="flex items-center gap-3 mt-2">
                          <span className="bg-muted px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">Qty: {item.quantity}</span>
                          <span className="text-xs font-bold text-muted-foreground">UNIT PRICE: {format(item.price)}</span>
                       </div>
                    </div>
                    <div className="text-right">
                       <p className="text-xl font-black italic">{format(item.price * item.quantity)}</p>
                    </div>
                 </div>
               ))}
             </div>
          </div>
        </div>

        {/* Right: Customer + Address */}
        <div className="lg:col-span-4 space-y-10">
          {/* CUSTOMER INTELLIGENCE */}
          <div className="rounded-[2rem] border bg-background p-8 shadow-2xl shadow-primary/5 space-y-6">
             <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-lg bg-primary/5 flex items-center justify-center">
                   <User className="h-4 w-4 text-primary" />
                </div>
                <h3 className="font-black italic text-sm uppercase tracking-tight">Customer Context</h3>
             </div>
             <div className="space-y-4">
                <div className="space-y-1">
                   <p className="font-black italic text-xl tracking-tight">{order.customer.name}</p>
                   <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">{order.customer.loyalty}</p>
                </div>
                <div className="space-y-2 pt-4 border-t border-dashed">
                   <div className="flex items-center justify-between text-xs font-bold uppercase tracking-widest text-muted-foreground">
                      <span>Email</span>
                      <span className="text-foreground">{order.customer.email}</span>
                   </div>
                   <div className="flex items-center justify-between text-xs font-bold uppercase tracking-widest text-muted-foreground">
                      <span>Phone</span>
                      <span className="text-foreground">{order.customer.phone}</span>
                   </div>
                </div>
                <Button variant="ghost" className="w-full h-10 rounded-full font-black italic tracking-widest text-[10px] uppercase group">
                   CONTACT CUSTOMER <ArrowRight className="h-3 w-3 ml-2 transition-transform group-hover:translate-x-1" />
                </Button>
             </div>
          </div>

          {/* DELIVERY COORDINATES */}
          <div className="rounded-[2rem] border bg-background p-8 shadow-2xl shadow-primary/5 space-y-6">
             <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-lg bg-primary/5 flex items-center justify-center">
                   <MapPin className="h-4 w-4 text-primary" />
                </div>
                <h3 className="font-black italic text-sm uppercase tracking-tight">Delivery Coordinates</h3>
             </div>
             <div className="text-sm text-muted-foreground font-medium leading-relaxed">
                <p className="text-foreground font-black italic mb-1 uppercase tracking-tight">{order.shippingAddress.name}</p>
                <p>{order.shippingAddress.line1}</p>
                <p>{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zip}</p>
                <p className="font-black uppercase tracking-widest text-[10px] mt-2">{order.shippingAddress.country}</p>
             </div>
          </div>

          {/* INTERNAL STATUS */}
          <div className="rounded-[2rem] border bg-background p-8 shadow-2xl shadow-primary/5">
             <h3 className="font-black italic text-xs uppercase tracking-widest text-muted-foreground mb-6">Historical Log</h3>
             <OrderTimeline currentStatus={status} trackingNumber={trackingNumber} carrier={carrier} />
          </div>
        </div>
      </div>
    </div>
  );
}
