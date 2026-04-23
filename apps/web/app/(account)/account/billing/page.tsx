"use client";

import { useState } from "react";
import { 
  CreditCard, 
  Download, 
  Plus, 
  ShieldCheck, 
  Zap, 
  History, 
  Wallet,
  ArrowUpRight,
  MoreVertical
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { generateInvoicePDF, InvoiceData } from "@/features/orders/utils/generate-invoice";

const format = (v: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(v);

const MOCK_INVOICES = [
  { id: "INV-998877", date: "April 21, 2026", amount: 189.00, status: "Paid", method: "Visa •••• 4242" },
  { id: "INV-887766", date: "April 15, 2026", amount: 34.50, status: "Paid", method: "Visa •••• 4242" },
  { id: "INV-776655", date: "April 10, 2026", amount: 299.00, status: "Paid", method: "Visa •••• 4242" },
];

export default function BillingHistoryPage() {
  const [isGenerating, setIsGenerating] = useState<string | null>(null);

  const handleDownloadInvoice = async (invoiceId: string) => {
    setIsGenerating(invoiceId);
    await new Promise(r => setTimeout(r, 800));
    
    // Mock data for PDF
    const invoiceData: InvoiceData = {
      orderId: invoiceId,
      date: "April 21, 2026",
      customerName: "John Doe",
      customerEmail: "john@example.com",
      shippingAddress: "123 Main St, San Francisco, CA 94103, US",
      items: [
        { title: "Premium Platform Access", quantity: 1, price: 189.00, gstRate: 18 }
      ],
      subtotal: 160.17,
      totalGst: 28.83,
      total: 189.00
    };

    generateInvoicePDF(invoiceData);
    setIsGenerating(null);
  };

  return (
    <div className="container mx-auto max-w-5xl px-6 py-12">
      <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <h1 className="text-4xl lg:text-5xl font-black italic tracking-tighter leading-none uppercase">BILLING & FINANCE</h1>
          <p className="text-muted-foreground font-medium">Manage your subscription, payment methods, and historical ledger.</p>
        </div>
        <Button className="rounded-full h-12 px-8 font-black italic gap-2 shadow-xl">
           ADD CREDIT <Plus className="h-4 w-4" />
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
        {/* Subscription Status Card */}
        <div className="lg:col-span-7 rounded-[2.5rem] border bg-background p-10 shadow-2xl shadow-primary/5 space-y-8 relative overflow-hidden">
           <div className="absolute top-0 right-0 p-8 opacity-5">
              <Zap className="h-32 w-32" />
           </div>
           <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-4">
                 <div className="flex items-center gap-3">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] bg-primary text-primary-foreground px-3 py-1 rounded-full">ACTIVE PLAN</span>
                    <h2 className="text-2xl font-black italic tracking-tight uppercase">SUPER-E PLATINUM</h2>
                 </div>
                 <p className="text-sm font-medium text-muted-foreground max-w-xs">
                    Your luxury commerce privileges are active. Next billing cycle commences on <span className="text-foreground font-bold">May 21, 2026</span>.
                 </p>
              </div>
              <div className="text-right">
                 <p className="text-4xl font-black italic tracking-tighter">$49<span className="text-sm">/mo</span></p>
                 <Button variant="link" className="font-black italic text-xs uppercase tracking-tight text-primary p-0">MANAGE SUBSCRIPTION</Button>
              </div>
           </div>
           
           <div className="grid grid-cols-3 gap-4 pt-8 border-t border-dashed">
              {[
                { label: "Free Shipping", active: true },
                { label: "VIP Concierge", active: true },
                { label: "Early Access", active: true },
              ].map(feat => (
                <div key={feat.label} className="flex items-center gap-2">
                   <ShieldCheck className="h-4 w-4 text-emerald-500" />
                   <span className="text-[10px] font-black uppercase tracking-widest">{feat.label}</span>
                </div>
              ))}
           </div>
        </div>

        {/* Account Balance Card */}
        <div className="lg:col-span-5 rounded-[2.5rem] border bg-primary text-primary-foreground p-10 shadow-2xl shadow-primary/20 space-y-6 flex flex-col justify-between">
           <div className="flex items-center justify-between">
              <div className="h-12 w-12 rounded-2xl bg-white/10 flex items-center justify-center">
                 <Wallet className="h-6 w-6" />
              </div>
              <span className="text-[10px] font-black uppercase tracking-[0.2em] opacity-60">ACCOUNT CREDITS</span>
           </div>
           <div>
              <p className="text-5xl font-black italic tracking-tighter">$1,240.50</p>
              <p className="text-xs font-bold uppercase tracking-widest opacity-60 mt-2">Available for immediate use</p>
           </div>
           <Button variant="outline" className="w-full h-12 rounded-full border-2 border-white/20 hover:bg-white/10 font-black italic gap-2 transition-all">
              VIEW LEDGER <ArrowUpRight className="h-4 w-4" />
           </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
         {/* Payment Methods */}
         <div className="lg:col-span-4 space-y-6">
            <h3 className="font-black italic text-lg uppercase tracking-tight ml-2">PAYMENT METHODS</h3>
            <div className="space-y-4">
               <div className="rounded-[2rem] border bg-background p-6 shadow-xl shadow-primary/5 space-y-6 group hover:border-primary/30 transition-all">
                  <div className="flex items-center justify-between">
                     <div className="h-10 w-16 rounded-lg bg-muted/50 border flex items-center justify-center text-[10px] font-black italic">VISA</div>
                     <MoreVertical className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div>
                     <p className="font-black italic text-lg tracking-tight leading-none">•••• •••• •••• 4242</p>
                     <div className="flex items-center justify-between mt-4">
                        <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Expires 12/28</span>
                        <span className="text-[10px] font-black italic text-primary bg-primary/5 px-2 py-1 rounded">DEFAULT</span>
                     </div>
                  </div>
               </div>
               <Button variant="outline" className="w-full h-24 rounded-[2rem] border-2 border-dashed border-border hover:border-primary/30 bg-muted/5 font-black italic gap-3 group transition-all">
                  <div className="h-10 w-10 rounded-full bg-background border flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                     <Plus className="h-4 w-4" />
                  </div>
                  ADD NEW CARD
               </Button>
            </div>
         </div>

         {/* Invoice History */}
         <div className="lg:col-span-8 space-y-6">
            <h3 className="font-black italic text-lg uppercase tracking-tight ml-2">HISTORICAL LEDGER</h3>
            <div className="rounded-[2.5rem] border bg-background shadow-2xl shadow-primary/5 overflow-hidden">
               <table className="w-full">
                  <thead>
                     <tr className="bg-muted/5">
                        <th className="text-left p-6 font-black uppercase tracking-widest text-[10px] text-muted-foreground/60">ID</th>
                        <th className="text-left p-6 font-black uppercase tracking-widest text-[10px] text-muted-foreground/60">DATE</th>
                        <th className="text-left p-6 font-black uppercase tracking-widest text-[10px] text-muted-foreground/60">VOLUME</th>
                        <th className="text-right p-6 font-black uppercase tracking-widest text-[10px] text-muted-foreground/60">ACTION</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-dashed border-t">
                     {MOCK_INVOICES.map((inv) => (
                        <tr key={inv.id} className="hover:bg-muted/5 transition-colors group">
                           <td className="p-6">
                              <span className="font-black italic text-base tracking-tight">{inv.id}</span>
                           </td>
                           <td className="p-6">
                              <span className="text-[11px] font-black uppercase tracking-widest text-muted-foreground">{inv.date}</span>
                           </td>
                           <td className="p-6">
                              <p className="font-black italic text-lg">{format(inv.amount)}</p>
                           </td>
                           <td className="p-6 text-right">
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                onClick={() => handleDownloadInvoice(inv.id)}
                                disabled={isGenerating === inv.id}
                                className="rounded-full h-10 px-5 font-black italic tracking-tight gap-2 hover:bg-primary/5 hover:text-primary"
                              >
                                 {isGenerating === inv.id ? (
                                    <span className="h-3 w-3 rounded-full border-2 border-primary border-r-transparent animate-spin" />
                                 ) : (
                                    <Download className="h-4 w-4" />
                                 )}
                                 {isGenerating === inv.id ? "GENERATING..." : "PDF"}
                              </Button>
                           </td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </div>
         </div>
      </div>
    </div>
  );
}
