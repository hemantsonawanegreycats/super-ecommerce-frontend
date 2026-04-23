"use client";

import { useState } from "react";
import { AlertTriangle, ShieldAlert, Clock, ArrowLeft, Trash2, XCircle } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

export default function DeleteAccountPage() {
  const [stage, setStage] = useState<"initial" | "confirm" | "success">("initial");
  const [agreed, setAgreed] = useState(false);
  const [hasBlockers] = useState(true); // Mock check for active orders

  const handleDelete = async () => {
    if (!agreed) return;
    setStage("success");
    toast.success("Account deletion request submitted.");
  };

  return (
    <div className="max-w-2xl mx-auto space-y-10 py-10 px-6">
      <Link href="/account/privacy/export" className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground transition-colors">
        <ArrowLeft className="h-3 w-3" /> Back to Privacy
      </Link>

      <div className="space-y-2">
        <h1 className="text-4xl font-black italic tracking-tighter uppercase text-destructive">Delete Account</h1>
        <p className="text-muted-foreground font-medium uppercase text-[10px] tracking-[0.2em]">Permanently remove your digital footprint from Super-E</p>
      </div>

      <AnimatePresence mode="wait">
        {stage === "initial" && (
          <motion.div
            key="initial"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-8"
          >
            <Card className="rounded-[2.5rem] border-2 border-destructive/20 bg-destructive/5 overflow-hidden">
               <CardHeader className="p-8">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-2xl bg-destructive/10 flex items-center justify-center text-destructive">
                      <AlertTriangle className="h-6 w-6" />
                    </div>
                    <div>
                      <CardTitle className="text-2xl font-black italic uppercase tracking-tight text-destructive">Blocker Check</CardTitle>
                      <CardDescription className="text-destructive/70 text-[10px] font-bold uppercase tracking-widest mt-1">Status: Action Required</CardDescription>
                    </div>
                  </div>
               </CardHeader>
               <CardContent className="p-8 pt-0 space-y-6">
                  <div className="p-6 rounded-3xl bg-white border border-destructive/10 flex items-start gap-4">
                    <XCircle className="h-5 w-5 text-destructive shrink-0 mt-1" />
                    <div className="space-y-1">
                      <p className="text-sm font-black italic uppercase">Active Subscription or Order</p>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        You currently have an active order (#ORD_987) being processed. Accounts cannot be deleted until all transactions are fulfilled.
                      </p>
                    </div>
                  </div>
                  
                  <Button disabled className="w-full h-14 rounded-full font-black italic uppercase tracking-widest opacity-50">
                    CLEAR BLOCKERS TO CONTINUE
                  </Button>
               </CardContent>
            </Card>

            <div className="p-8 rounded-[2.5rem] border-2 border-dashed space-y-6">
               <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-xl bg-muted/50 flex items-center justify-center text-muted-foreground">
                    <Clock className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-black italic uppercase">30-Day Grace Period</h4>
                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Standard Safety Protocol</p>
                  </div>
               </div>
               <p className="text-sm text-muted-foreground leading-relaxed font-medium">
                 Once requested, your account will be deactivated immediately. All your data will be permanently purged after **30 days**. You can cancel the deletion at any time during this period by logging in.
               </p>
               <Button onClick={() => setStage("confirm")} variant="ghost" className="text-xs font-black italic uppercase underline underline-offset-4 text-muted-foreground hover:text-destructive">
                 I understand, proceed anyway (simulation)
               </Button>
            </div>
          </motion.div>
        )}

        {stage === "confirm" && (
          <motion.div
            key="confirm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-8"
          >
             <Card className="rounded-[2.5rem] border-4 border-destructive shadow-2xl shadow-destructive/10">
                <CardHeader className="p-10 text-center">
                   <ShieldAlert className="h-16 w-16 text-destructive mx-auto mb-6" />
                   <CardTitle className="text-3xl font-black italic uppercase tracking-tighter text-destructive">FINAL CONFIRMATION</CardTitle>
                   <CardDescription className="text-xs font-bold uppercase tracking-widest mt-4">This action is irreversible after 30 days.</CardDescription>
                </CardHeader>
                <CardContent className="p-10 pt-0 space-y-10">
                   <div className="flex items-start gap-4 p-6 rounded-3xl bg-muted/20">
                      <Checkbox id="terms" checked={agreed} onCheckedChange={(val) => setAgreed(!!val)} className="mt-1" />
                      <label htmlFor="terms" className="text-sm font-medium leading-relaxed cursor-pointer">
                        I confirm that I want to delete my Super-E account and all associated data. I understand that my loyalty points, order history, and digital assets will be permanently lost.
                      </label>
                   </div>

                   <Button 
                    variant="destructive"
                    disabled={!agreed}
                    onClick={handleDelete}
                    className="w-full h-16 rounded-full font-black italic uppercase tracking-widest text-lg shadow-xl shadow-destructive/20"
                   >
                     <Trash2 className="h-6 w-6 mr-3" /> PERMANENTLY DELETE ACCOUNT
                   </Button>
                </CardContent>
             </Card>
          </motion.div>
        )}

        {stage === "success" && (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center space-y-8 py-20"
          >
             <div className="h-24 w-24 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto">
                <Clock className="h-12 w-12 text-emerald-500" />
             </div>
             <div className="space-y-4">
                <h2 className="text-4xl font-black italic uppercase tracking-tighter">DELETION SCHEDULED</h2>
                <p className="text-muted-foreground font-medium max-w-sm mx-auto">
                  Your account is now deactivated. You have **29 days, 23 hours** remaining to restore your account before permanent purge.
                </p>
             </div>
             <Link 
              href="/" 
              className={cn(buttonVariants({ variant: "outline" }), "rounded-full h-12 px-8 font-black italic uppercase")}
             >
                RETURN TO HOMEPAGE
             </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
