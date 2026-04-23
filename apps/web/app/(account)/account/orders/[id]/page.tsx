"use client";

import { useState, use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  ChevronLeft, 
  Download, 
  Package, 
  Truck, 
  ShieldCheck, 
  MapPin, 
  CreditCard, 
  ExternalLink,
  RotateCcw,
  History
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { OrderStatusBadge, OrderStatus } from "@/features/orders/components/OrderStatusBadge";
import { OrderTimeline } from "@/features/orders/components/OrderTimeline";
import { ReturnDrawer } from "@/features/orders/components/ReturnDrawer";
import { Separator } from "@/components/ui/separator";
import { generateInvoicePDF, InvoiceData } from "@/features/orders/utils/generate-invoice";

const format = (v: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(v);

export default function CustomerOrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [isReturnOpen, setIsReturnOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  // Mock order data
  const order = {
    id,
    date: "April 21, 2026",
    status: "DELIVERED" as OrderStatus,
    total: 189.00,
    trackingNumber: "1Z9999W99999999999",
    carrier: "UPS",
    estimatedDelivery: "April 28 - April 30, 2026",
    paymentMethod: "Visa ending in •••• 4242",
    shippingAddress: { name: "John Doe", line1: "123 Main St, Suite 4", city: "San Francisco", state: "CA", zip: "94103", country: "US" },
    items: [
      { id: "1", title: "The Cloud-Weight Premium Blanket", price: 189.00, quantity: 1, imageUrl: "https://images.unsplash.com/photo-1583845258933-289c09d57a9e?q=80&w=200", vendor: "SleepWell Co." },
    ],
  };

  const handleDownloadInvoice = async () => {
    setIsGenerating(true);
    // Simulate luxury weight
    await new Promise(r => setTimeout(r, 1000));
    
    const invoiceData: InvoiceData = {
      orderId: order.id,
      date: order.date,
      customerName: order.shippingAddress.name,
      customerEmail: "john@example.com",
      shippingAddress: `${order.shippingAddress.line1}, ${order.shippingAddress.city}, ${order.shippingAddress.state} ${order.shippingAddress.zip}, ${order.shippingAddress.country}`,
      items: order.items.map(i => ({
        title: i.title,
        quantity: i.quantity,
        price: i.price,
        gstRate: 18
      })),
      subtotal: 160.17, // 189 / 1.18 approx
      totalGst: 28.83,
      total: 189.00
    };

    generateInvoicePDF(invoiceData);
    setIsGenerating(false);
  };

  const isEligibleForReturn = order.status === "DELIVERED" || order.status === "COMPLETED";

  return (
    <div className="container mx-auto max-w-6xl px-6 py-12">
      <div className="mb-10">
        <Link href="/account/orders" className="group inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-muted-foreground hover:text-foreground transition-all">
          <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center group-hover:bg-primary/10 group-hover:text-primary transition-colors">
            <ChevronLeft className="h-4 w-4" />
          </div>
          Back to Orders
        </Link>
      </div>

      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <h1 className="text-4xl lg:text-5xl font-black italic tracking-tighter leading-none">{order.id}</h1>
            <OrderStatusBadge status={order.status} />
          </div>
          <p className="text-muted-foreground font-medium">Placed on {order.date} • Secure Transaction</p>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          {isEligibleForReturn && (
            <Button 
              variant="outline" 
              onClick={() => setIsReturnOpen(true)}
              className="rounded-full h-12 px-8 font-black italic gap-2 border-2 border-primary/20 hover:border-primary text-primary"
            >
              <RotateCcw className="h-4 w-4" /> INITIATE RETURN
            </Button>
          )}
          <Button 
            variant="outline" 
            onClick={handleDownloadInvoice}
            disabled={isGenerating}
            className="rounded-full h-12 px-8 font-black italic gap-2 border-2"
          >
            {isGenerating ? (
               <span className="h-4 w-4 rounded-full border-2 border-primary border-r-transparent animate-spin" />
            ) : (
               <Download className="h-4 w-4" />
            )}
            {isGenerating ? "GENERATING..." : "DOWNLOAD INVOICE"}
          </Button>
          <Button className="rounded-full h-12 px-8 font-black italic gap-2 shadow-xl">
             SUPPORT
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left: Timeline + Items */}
        <div className="lg:col-span-8 space-y-12">
          
          {/* Shipment Tracking Card */}
          {order.trackingNumber && (
            <div className="rounded-[2.5rem] border bg-background p-10 shadow-2xl shadow-primary/5 space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                   <div className="h-12 w-12 rounded-2xl bg-primary/5 flex items-center justify-center">
                      <Truck className="h-6 w-6 text-primary" />
                   </div>
                   <div>
                      <h3 className="font-black italic text-lg uppercase tracking-tight">LOGISTICS TRACKING</h3>
                      <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">{order.carrier} · {order.trackingNumber}</p>
                   </div>
                </div>
                <Button variant="ghost" size="sm" className="rounded-full font-black italic gap-2">
                   TRACK ON CARRIER SITE <ExternalLink className="h-3 w-3" />
                </Button>
              </div>
              
              <div className="bg-muted/30 rounded-2xl p-6 border border-dashed flex flex-col md:flex-row md:items-center justify-between gap-4">
                 <div className="space-y-1">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Est. Arrival</span>
                    <p className="font-black italic text-xl">{order.estimatedDelivery}</p>
                 </div>
                 <div className="flex items-center gap-3 text-emerald-600">
                    <ShieldCheck className="h-5 w-5" />
                    <span className="text-xs font-black uppercase tracking-widest italic">Fully Insured Shipment</span>
                 </div>
              </div>
            </div>
          )}

          {/* Detailed Timeline */}
          <div className="rounded-[2.5rem] border bg-background p-10 shadow-2xl shadow-primary/5">
             <h3 className="font-black italic text-lg uppercase tracking-tight mb-10">ORDER PROGRESS</h3>
             <OrderTimeline currentStatus={order.status} trackingNumber={order.trackingNumber} carrier={order.carrier} />
          </div>

          {/* Items Table */}
          <div className="rounded-[2.5rem] border bg-background p-10 shadow-2xl shadow-primary/5 space-y-8">
             <h3 className="font-black italic text-lg uppercase tracking-tight">ITEMS IN ORDER</h3>
             <div className="space-y-6">
               {order.items.map((item) => (
                 <div key={item.id} className="flex flex-col sm:flex-row sm:items-center gap-6 border-b border-dashed border-border/60 pb-6 last:border-0 last:pb-0">
                    <div className="h-24 w-24 shrink-0 overflow-hidden rounded-2xl border bg-muted/30 shadow-sm">
                       <img src={item.imageUrl} alt={item.title} className="h-full w-full object-cover" />
                    </div>
                    <div className="flex-1 space-y-1">
                       <h4 className="font-black italic text-lg tracking-tight leading-tight">{item.title}</h4>
                       <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">{item.vendor}</p>
                       <div className="flex items-center gap-3 mt-2">
                          <span className="bg-muted px-2 py-0.5 rounded text-[10px] font-black uppercase">Qty: {item.quantity}</span>
                       </div>
                    </div>
                    <div className="text-right">
                       <p className="text-xl font-black italic">{format(item.price)}</p>
                    </div>
                 </div>
               ))}
             </div>
          </div>
        </div>

        {/* Right: Summary + Address */}
        <div className="lg:col-span-4 space-y-10">
          {/* Financial Summary */}
          <div className="rounded-[2rem] border bg-background p-8 shadow-2xl shadow-primary/5 space-y-6">
             <h3 className="font-black italic text-lg uppercase tracking-tight">FINANCIAL SUMMARY</h3>
             <div className="space-y-4">
                <div className="flex justify-between text-sm">
                   <span className="text-muted-foreground font-bold uppercase tracking-widest text-[10px]">Subtotal</span>
                   <span className="font-black italic">{format(order.total)}</span>
                </div>
                <div className="flex justify-between text-sm">
                   <span className="text-muted-foreground font-bold uppercase tracking-widest text-[10px]">Shipping</span>
                   <span className="text-emerald-600 font-black italic">FREE</span>
                </div>
                <div className="flex justify-between text-sm">
                   <span className="text-muted-foreground font-bold uppercase tracking-widest text-[10px]">Taxes</span>
                   <span className="font-black italic">$0.00</span>
                </div>
                <Separator className="border-dashed my-4" />
                <div className="flex justify-between items-end">
                   <div className="flex flex-col">
                      <span className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground mb-1">Total Paid</span>
                      <span className="text-3xl font-black italic tracking-tighter leading-none">{format(order.total)}</span>
                   </div>
                </div>
             </div>
          </div>

          {/* Payment Method */}
          <div className="rounded-[2rem] border bg-background p-8 shadow-2xl shadow-primary/5 space-y-4">
             <div className="flex items-center gap-3">
                <CreditCard className="h-4 w-4 text-muted-foreground" />
                <h3 className="font-black italic text-sm uppercase tracking-tight">PAYMENT METHOD</h3>
             </div>
             <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">{order.paymentMethod}</p>
          </div>

          {/* Shipping Address */}
          <div className="rounded-[2rem] border bg-background p-8 shadow-2xl shadow-primary/5 space-y-6">
             <div className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <h3 className="font-black italic text-sm uppercase tracking-tight">DELIVERY ADDRESS</h3>
             </div>
             <div className="space-y-1">
                <p className="font-black italic text-lg tracking-tight">{order.shippingAddress.name}</p>
                <div className="text-sm text-muted-foreground font-medium leading-relaxed">
                   <p>{order.shippingAddress.line1}</p>
                   <p>{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zip}</p>
                   <p>{order.shippingAddress.country}</p>
                </div>
             </div>
          </div>
        </div>
      </div>

      <ReturnDrawer 
        order={order} 
        isOpen={isReturnOpen} 
        onClose={() => setIsReturnOpen(false)} 
      />
    </div>
  );
}
