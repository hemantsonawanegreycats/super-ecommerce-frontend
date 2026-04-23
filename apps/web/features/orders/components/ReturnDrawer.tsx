"use client";

import { useState } from "react";
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle,
  SheetDescription
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle2, 
  AlertCircle, 
  Truck, 
  RotateCcw, 
  Camera,
  CreditCard,
  Wallet
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface ReturnDrawerProps {
  order: any;
  isOpen: boolean;
  onClose: () => void;
}

export function ReturnDrawer({ order, isOpen, onClose }: ReturnDrawerProps) {
  const [step, setStep] = useState(1);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [reason, setReason] = useState("");
  const [refundMethod, setRefundMethod] = useState("original");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const nextStep = () => setStep(s => s + 1);
  const prevStep = () => setStep(s => s - 1);

  const toggleItem = (id: string) => {
    setSelectedItems(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    await new Promise(r => setTimeout(r, 2000));
    setIsSubmitting(false);
    nextStep(); // Move to success step
  };

  const REASONS = [
    "Damaged or defective",
    "Not as described",
    "Changed my mind",
    "Found a better price",
    "Arrived too late",
    "Other"
  ];

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="flex flex-col w-full sm:max-w-2xl p-0 rounded-l-[3rem] border-l-0 overflow-hidden shadow-2xl">
        <SheetHeader className="px-10 py-8 border-b border-dashed bg-muted/10">
          <div className="flex items-center gap-4">
             <div className="h-12 w-12 rounded-2xl bg-primary/5 flex items-center justify-center text-primary">
                <RotateCcw className="h-6 w-6" />
             </div>
             <div>
                <SheetTitle className="text-2xl font-black italic tracking-tighter uppercase leading-none">Initiate Return</SheetTitle>
                <SheetDescription className="text-xs font-bold uppercase tracking-widest text-muted-foreground mt-1">
                   Step {Math.min(step, 4)} of 4 • {order.id}
                </SheetDescription>
             </div>
          </div>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto px-10 py-10">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div 
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <div className="space-y-2">
                   <h3 className="text-xl font-black italic uppercase tracking-tight">Select Items</h3>
                   <p className="text-sm text-muted-foreground font-medium">Which items from your order would you like to return?</p>
                </div>

                <div className="space-y-4">
                  {order.items.map((item: any) => (
                    <div 
                      key={item.id}
                      onClick={() => toggleItem(item.id)}
                      className={cn(
                        "group flex items-center gap-6 p-6 rounded-[2rem] border-2 cursor-pointer transition-all duration-300",
                        selectedItems.includes(item.id) ? "border-primary bg-primary/5" : "border-border hover:border-primary/30"
                      )}
                    >
                      <Checkbox 
                        checked={selectedItems.includes(item.id)} 
                        className="h-6 w-6 rounded-lg"
                      />
                      <div className="h-20 w-20 rounded-2xl border bg-muted/30 overflow-hidden shrink-0">
                         <img src={item.imageUrl} alt={item.title} className="h-full w-full object-cover" />
                      </div>
                      <div className="flex-1 space-y-1">
                         <h4 className="font-bold text-sm leading-tight">{item.title}</h4>
                         <p className="text-xs text-muted-foreground font-medium uppercase tracking-widest">{item.vendor}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div 
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <div className="space-y-2">
                   <h3 className="text-xl font-black italic uppercase tracking-tight">Reason for Return</h3>
                   <p className="text-sm text-muted-foreground font-medium">Please tell us why you are returning these items.</p>
                </div>

                <div className="grid grid-cols-1 gap-3">
                   {REASONS.map((r) => (
                      <button
                        key={r}
                        onClick={() => setReason(r)}
                        className={cn(
                          "flex items-center justify-between px-6 py-4 rounded-2xl border-2 font-bold text-sm transition-all",
                          reason === r ? "border-primary bg-primary/5 text-primary" : "border-border text-muted-foreground hover:border-primary/20"
                        )}
                      >
                        {r}
                        {reason === r && <CheckCircle2 className="h-4 w-4" />}
                      </button>
                   ))}
                </div>

                <div className="space-y-3">
                   <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Additional Details (Optional)</Label>
                   <textarea 
                     placeholder="Please provide any additional context..."
                     className="w-full h-32 rounded-[1.5rem] bg-muted/30 border-none p-6 text-sm font-medium focus:ring-2 focus:ring-primary/20 outline-none resize-none"
                   />
                </div>

                <div className="p-6 rounded-[2rem] border-2 border-dashed flex flex-col items-center justify-center text-center space-y-3 group hover:border-primary/30 transition-all cursor-pointer">
                   <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                      <Camera className="h-6 w-6" />
                   </div>
                   <div className="space-y-1">
                      <p className="text-xs font-black uppercase tracking-widest">Upload Evidence</p>
                      <p className="text-[10px] text-muted-foreground font-medium">Add photos of defects or damage</p>
                   </div>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div 
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <div className="space-y-2">
                   <h3 className="text-xl font-black italic uppercase tracking-tight">Refund Method</h3>
                   <p className="text-sm text-muted-foreground font-medium">How would you like to receive your credit?</p>
                </div>

                <div className="space-y-4">
                   <button
                     onClick={() => setRefundMethod("original")}
                     className={cn(
                       "w-full flex items-center gap-6 p-8 rounded-[2.5rem] border-2 text-left transition-all",
                       refundMethod === "original" ? "border-primary bg-primary/5" : "border-border"
                     )}
                   >
                      <div className={cn(
                        "h-12 w-12 rounded-2xl flex items-center justify-center shrink-0",
                        refundMethod === "original" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                      )}>
                         <CreditCard className="h-6 w-6" />
                      </div>
                      <div>
                         <p className="font-black italic text-lg uppercase tracking-tight">Original Payment</p>
                         <p className="text-xs text-muted-foreground font-medium">Refund to your Visa ending in 4242. (5-7 days)</p>
                      </div>
                   </button>

                   <button
                     onClick={() => setRefundMethod("credit")}
                     className={cn(
                       "w-full flex items-center gap-6 p-8 rounded-[2.5rem] border-2 text-left transition-all",
                       refundMethod === "credit" ? "border-primary bg-primary/5" : "border-border"
                     )}
                   >
                      <div className={cn(
                        "h-12 w-12 rounded-2xl flex items-center justify-center shrink-0",
                        refundMethod === "credit" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                      )}>
                         <Wallet className="h-6 w-6" />
                      </div>
                      <div>
                         <div className="flex items-center gap-2">
                            <p className="font-black italic text-lg uppercase tracking-tight">Super-E Credit</p>
                            <span className="text-[10px] font-black italic bg-emerald-500 text-white px-2 py-0.5 rounded">INSTANT</span>
                         </div>
                         <p className="text-xs text-muted-foreground font-medium">Credit your account balance immediately.</p>
                      </div>
                   </button>
                </div>

                <div className="bg-primary/5 rounded-2xl p-6 flex gap-4">
                   <AlertCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                   <p className="text-xs text-primary/80 font-medium leading-relaxed">
                      Refunds are finalized once items are received and inspected by our global logistics team.
                   </p>
                </div>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div 
                key="step4"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center text-center space-y-8 py-10"
              >
                <div className="h-32 w-32 rounded-full bg-emerald-500 flex items-center justify-center shadow-2xl shadow-emerald-500/20 border-4 border-white">
                   <CheckCircle2 className="h-16 w-16 text-white stroke-[3px]" />
                </div>
                <div className="space-y-4">
                   <h3 className="text-4xl font-black italic tracking-tighter uppercase leading-none">RETURN AUTHORIZED</h3>
                   <p className="text-muted-foreground font-medium max-w-sm mx-auto">
                      Your return request has been historically logged. A courier will contact you within 24 hours for pickup.
                   </p>
                </div>
                
                <div className="w-full bg-muted/20 rounded-[2rem] p-8 border border-dashed text-left space-y-4">
                   <div className="flex items-center gap-3">
                      <Truck className="h-5 w-5 text-primary" />
                      <span className="text-xs font-black uppercase tracking-widest">Return Tracking: RET-9912-X</span>
                   </div>
                   <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest leading-relaxed">
                      You will receive status updates as the items reach our inspection facility.
                   </p>
                </div>

                <Button 
                  className="w-full h-16 rounded-full font-black italic text-lg shadow-xl"
                  onClick={onClose}
                >
                   CLOSE TRACKER
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {step < 4 && (
          <div className="p-10 border-t border-dashed bg-muted/10 flex items-center gap-4">
             {step > 1 && (
               <Button 
                 variant="ghost" 
                 className="h-16 w-16 rounded-full shrink-0 border-2"
                 onClick={prevStep}
               >
                  <ArrowLeft className="h-5 w-5" />
               </Button>
             )}
             <Button 
               className="flex-1 h-16 rounded-full text-lg font-black italic gap-3 shadow-xl"
               disabled={step === 1 ? selectedItems.length === 0 : step === 2 ? !reason : isSubmitting}
               onClick={step === 3 ? handleSubmit : nextStep}
             >
                {isSubmitting ? (
                  <span className="flex items-center gap-3">
                     <span className="h-5 w-5 rounded-full border-2 border-primary-foreground border-r-transparent animate-spin" />
                     AUTHORIZING...
                  </span>
                ) : (
                  <>
                    {step === 3 ? "SUBMIT RETURN REQUEST" : "CONTINUE"}
                    <ArrowRight className="h-5 w-5" />
                  </>
                )}
             </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
