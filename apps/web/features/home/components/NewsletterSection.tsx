"use client";

import { useState } from "react";
import { Loader2, Mail, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const subscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes("@")) {
      toast.error("Please enter a valid email");
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 600));
    setLoading(false);
    setEmail("");
    toast.success("You're in!", {
      description: "Keep an eye on your inbox for fresh drops and deals.",
    });
  };

  return (
    <section className="container mx-auto px-4 pb-16">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary to-primary/70 p-8 md:p-12 text-primary-foreground">
        <div className="absolute -top-16 -right-16 h-64 w-64 rounded-full bg-white/15 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />

        <div className="relative grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/15 backdrop-blur px-3 py-1 text-xs font-medium">
              <Sparkles className="h-3 w-3" />
              Join the list
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
              Be the first to know.
            </h2>
            <p className="text-sm text-primary-foreground/80 max-w-sm">
              Exclusive drops, early-access sales and 10% off your first order — straight to
              your inbox, no spam.
            </p>
          </div>

          <form onSubmit={subscribe} className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-9 h-12 bg-white text-foreground"
                disabled={loading}
              />
            </div>
            <Button
              type="submit"
              size="lg"
              variant="secondary"
              className="h-12 px-6 font-semibold"
              disabled={loading}
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Subscribe"}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
