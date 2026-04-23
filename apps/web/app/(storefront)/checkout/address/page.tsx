"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckoutStepper } from "@/features/checkout/components/CheckoutStepper";
import { OrderSummary } from "@/features/checkout/components/OrderSummary";
import { checkoutAddressSchema, CheckoutAddressData } from "@/features/checkout/validators/checkout-address.schema";
import { motion } from "framer-motion";
import { ArrowRight, MapPin, Mail, User, Phone } from "lucide-react";

export default function AddressPage() {
  const router = useRouter();
  
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<CheckoutAddressData>({
    resolver: zodResolver(checkoutAddressSchema),
    mode: "onChange",
  });

  const onSubmit = async (data: CheckoutAddressData) => {
    // Simulate luxury weight delay
    await new Promise(resolve => setTimeout(resolve, 800));
    router.push("/checkout/shipping");
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col max-w-6xl mx-auto"
    >
      <CheckoutStepper />
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Form Container */}
        <div className="lg:col-span-7 space-y-10">
          <div className="space-y-2">
            <h2 className="text-4xl font-black italic tracking-tight">SHIPPING DETAILS</h2>
            <p className="text-muted-foreground font-medium">Please provide your delivery information to continue.</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {/* Contact Info Group */}
            <div className="space-y-6 p-8 rounded-[2rem] bg-background border shadow-xl shadow-primary/5">
              <div className="flex items-center gap-3 mb-2">
                 <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <User className="h-4 w-4 text-primary" />
                 </div>
                 <h3 className="font-bold text-lg">Contact Information</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="fullName" className="text-xs font-black uppercase tracking-widest text-muted-foreground/80 ml-1">Full Name</Label>
                  <Input id="fullName" placeholder="John Doe" {...register("fullName")} className={cn("h-12 rounded-xl bg-muted/20 border-none focus-visible:ring-primary/20", errors.fullName && "ring-2 ring-destructive/50")} />
                  {errors.fullName && <p className="text-[10px] font-bold text-destructive ml-1">{errors.fullName.message}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-xs font-black uppercase tracking-widest text-muted-foreground/80 ml-1">Email Address</Label>
                  <Input id="email" type="email" placeholder="john@example.com" {...register("email")} className={cn("h-12 rounded-xl bg-muted/20 border-none focus-visible:ring-primary/20", errors.email && "ring-2 ring-destructive/50")} />
                  {errors.email && <p className="text-[10px] font-bold text-destructive ml-1">{errors.email.message}</p>}
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-xs font-black uppercase tracking-widest text-muted-foreground/80 ml-1">Phone Number</Label>
                <Input id="phone" placeholder="+1 (555) 000-0000" {...register("phone")} className={cn("h-12 rounded-xl bg-muted/20 border-none focus-visible:ring-primary/20", errors.phone && "ring-2 ring-destructive/50")} />
                {errors.phone && <p className="text-[10px] font-bold text-destructive ml-1">{errors.phone.message}</p>}
              </div>
            </div>

            {/* Address Group */}
            <div className="space-y-6 p-8 rounded-[2rem] bg-background border shadow-xl shadow-primary/5">
              <div className="flex items-center gap-3 mb-2">
                 <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <MapPin className="h-4 w-4 text-primary" />
                 </div>
                 <h3 className="font-bold text-lg">Delivery Address</h3>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address" className="text-xs font-black uppercase tracking-widest text-muted-foreground/80 ml-1">Street Address</Label>
                <Input id="address" placeholder="123 Main St, Suite 4" {...register("address")} className={cn("h-12 rounded-xl bg-muted/20 border-none focus-visible:ring-primary/20", errors.address && "ring-2 ring-destructive/50")} />
                {errors.address && <p className="text-[10px] font-bold text-destructive ml-1">{errors.address.message}</p>}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="city" className="text-xs font-black uppercase tracking-widest text-muted-foreground/80 ml-1">City</Label>
                  <Input id="city" placeholder="San Francisco" {...register("city")} className={cn("h-12 rounded-xl bg-muted/20 border-none focus-visible:ring-primary/20", errors.city && "ring-2 ring-destructive/50")} />
                  {errors.city && <p className="text-[10px] font-bold text-destructive ml-1">{errors.city.message}</p>}
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="state" className="text-xs font-black uppercase tracking-widest text-muted-foreground/80 ml-1">State</Label>
                    <Input id="state" placeholder="CA" {...register("state")} className={cn("h-12 rounded-xl bg-muted/20 border-none focus-visible:ring-primary/20", errors.state && "ring-2 ring-destructive/50")} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="zipCode" className="text-xs font-black uppercase tracking-widest text-muted-foreground/80 ml-1">ZIP</Label>
                    <Input id="zipCode" placeholder="94103" {...register("zipCode")} className={cn("h-12 rounded-xl bg-muted/20 border-none focus-visible:ring-primary/20", errors.zipCode && "ring-2 ring-destructive/50")} />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="country" className="text-xs font-black uppercase tracking-widest text-muted-foreground/80 ml-1">Country</Label>
                <Input id="country" placeholder="United States" {...register("country")} className={cn("h-12 rounded-xl bg-muted/20 border-none focus-visible:ring-primary/20", errors.country && "ring-2 ring-destructive/50")} />
                {errors.country && <p className="text-[10px] font-bold text-destructive ml-1">{errors.country.message}</p>}
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full h-16 rounded-full text-lg font-black italic group shadow-2xl shadow-primary/20 transition-all active:scale-95" 
              disabled={!isValid || isSubmitting}
            >
              {isSubmitting ? (
                <span className="flex items-center gap-3">
                   <span className="h-5 w-5 rounded-full border-2 border-primary-foreground border-r-transparent animate-spin" />
                   PROCESSING...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  CONTINUE TO SHIPPING
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </span>
              )}
            </Button>
          </form>
        </div>

        {/* Sidebar Summary */}
        <div className="lg:col-span-5">
          <OrderSummary />
        </div>
      </div>
    </motion.div>
  );
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(" ");
}
