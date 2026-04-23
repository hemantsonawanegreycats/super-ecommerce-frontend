"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CheckoutStepper } from "@/features/checkout/components/CheckoutStepper";
import { OrderSummary } from "@/features/checkout/components/OrderSummary";
import { Truck, Zap, Globe, ArrowRight, ArrowLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const SHIPPING_METHODS = [
  {
    id: "standard",
    name: "Luxury Standard",
    price: 0,
    time: "3-5 Business Days",
    description: "Reliable global shipping with premium packaging.",
    icon: Truck,
  },
  {
    id: "express",
    name: "Priority Express",
    price: 15.99,
    time: "1-2 Business Days",
    description: "Next-day dispatch with real-time white-glove tracking.",
    icon: Zap,
  },
  {
    id: "international",
    name: "Global Concierge",
    price: 45.00,
    time: "5-7 Business Days",
    description: "Insured international transit with customs handling.",
    icon: Globe,
  },
];

export default function ShippingPage() {
  const router = useRouter();
  const [selectedMethod, setSelectedMethod] = useState(SHIPPING_METHODS[0].id);

  const format = (v: number) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(v);

  const handleContinue = async () => {
    // Simulate luxury weight
    await new Promise(resolve => setTimeout(resolve, 600));
    router.push("/checkout/payment");
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="flex flex-col max-w-6xl mx-auto"
    >
      <CheckoutStepper />
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Selection Container */}
        <div className="lg:col-span-7 space-y-10">
          <div className="space-y-2">
            <h2 className="text-4xl font-black italic tracking-tight">SHIPPING METHOD</h2>
            <p className="text-muted-foreground font-medium">Select the delivery cadence that suits your lifestyle.</p>
          </div>

          <div className="space-y-6">
            {SHIPPING_METHODS.map((method, idx) => {
              const Icon = method.icon;
              const isSelected = selectedMethod === method.id;
              
              return (
                <motion.div
                  key={method.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  onClick={() => setSelectedMethod(method.id)}
                  className={cn(
                    "group relative flex items-center justify-between p-6 rounded-[2rem] border-2 cursor-pointer transition-all duration-300 overflow-hidden",
                    isSelected 
                      ? "border-primary bg-primary/5 shadow-2xl shadow-primary/5" 
                      : "border-border bg-background hover:border-primary/30 hover:bg-muted/30"
                  )}
                >
                  <div className="flex items-center gap-6 z-10">
                    <div className={cn(
                      "h-14 w-14 rounded-2xl flex items-center justify-center transition-all duration-500",
                      isSelected ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30 rotate-3" : "bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary"
                    )}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-black text-lg italic tracking-tight">{method.name}</h4>
                      <p className="text-xs text-muted-foreground font-medium">{method.description}</p>
                      <div className="flex items-center gap-2 mt-2">
                         <span className="text-[10px] font-black uppercase tracking-widest bg-muted px-2 py-0.5 rounded text-muted-foreground">
                            {method.time}
                         </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right z-10">
                    <p className="text-xl font-black italic">
                      {method.price === 0 ? "FREE" : format(method.price)}
                    </p>
                  </div>

                  {isSelected && (
                    <motion.div 
                      layoutId="active-shipping-bg"
                      className="absolute inset-0 bg-primary/5 pointer-events-none"
                    />
                  )}
                </motion.div>
              );
            })}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-6">
            <Button 
                variant="ghost" 
                className="flex-1 h-16 rounded-full font-black italic tracking-widest text-muted-foreground hover:text-foreground" 
                onClick={() => router.back()}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              GO BACK
            </Button>
            <Button 
              className="flex-1 h-16 rounded-full text-lg font-black italic group shadow-2xl shadow-primary/20" 
              onClick={handleContinue}
            >
              CONTINUE TO PAYMENT
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        </div>

        {/* Sidebar Summary */}
        <div className="lg:col-span-5">
          <OrderSummary />
        </div>
      </div>
    </motion.div>
  );
}
