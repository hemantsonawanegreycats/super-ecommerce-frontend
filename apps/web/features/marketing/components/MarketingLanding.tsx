"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { 
  Rocket, 
  ShieldCheck, 
  Zap, 
  Globe, 
  Store, 
  ArrowRight, 
  CheckCircle2,
  Users,
  LayoutDashboard
} from "lucide-react";
import Link from "next/link";

export function MarketingLanding() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,hsl(var(--primary)/0.15),transparent_70%)]" />
        <div className="container relative mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/5 border border-primary/10 text-primary text-sm font-medium mb-8"
          >
            <Rocket className="h-4 w-4" />
            <span>The Future of Commerce is Here</span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl lg:text-7xl font-bold tracking-tight mb-8 bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/70"
          >
            Build your own <span className="text-primary">Commerce Empire</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed"
          >
            The high-performance, multi-tenant engine for modern brands. 
            From single stores to global multi-vendor marketplaces, Super-E handles it all.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button size="lg" className="h-14 px-8 rounded-full text-base font-semibold group" render={<Link href="/signup" />}>
              Start for Free
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button size="lg" variant="outline" className="h-14 px-8 rounded-full text-base font-semibold" render={<Link href="/demo" />}>
              Watch Demo
            </Button>
          </motion.div>

          {/* Visual Preview */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-20 relative max-w-5xl mx-auto rounded-3xl border border-border/50 shadow-2xl overflow-hidden bg-muted/20 backdrop-blur-sm"
          >
            <img 
              src="/marketing-dashboard.png"
              alt="Super-E Platform Dashboard"
              className="w-full h-auto"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent pointer-events-none" />
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Engineered for Excellence</h2>
            <p className="text-muted-foreground">Everything you need to launch, scale, and thrive.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Zap className="h-6 w-6" />,
                title: "Incredible Speed",
                description: "Built on Next.js and Turbopack for sub-second page loads and instant SEO ranking."
              },
              {
                icon: <Users className="h-6 w-6" />,
                title: "Multi-Tenant Architecture",
                description: "Run thousands of independent stores under one roof with ease."
              },
              {
                icon: <Globe className="h-6 w-6" />,
                title: "Global Commerce",
                description: "Multi-currency, multi-language, and localized taxes out of the box."
              },
              {
                icon: <ShieldCheck className="h-6 w-6" />,
                title: "Enterprise Security",
                description: "Bank-grade encryption and secure authentication for you and your customers."
              },
              {
                icon: <LayoutDashboard className="h-6 w-6" />,
                title: "Unified Command",
                description: "Manage orders, inventory, and customers across all stores from one central hub."
              },
              {
                icon: <Store className="h-6 w-6" />,
                title: "Theme Engine",
                description: "Dynamic branding and design systems for each unique storefront."
              }
            ].map((feature, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -5 }}
                className="p-8 rounded-2xl bg-background border border-border/50 shadow-sm hover:shadow-md transition-all"
              >
                <div className="h-12 w-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof / Trust */}
      <section className="py-20">
        <div className="container mx-auto px-6 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-muted-foreground mb-12">
            Trusted by the next generation of commerce
          </p>
          <div className="flex flex-wrap items-center justify-center gap-12 opacity-40 grayscale">
            <span className="text-2xl font-bold">ALPHA</span>
            <span className="text-2xl font-bold">NEXUS</span>
            <span className="text-2xl font-bold">VELOCITY</span>
            <span className="text-2xl font-bold">QUANTUM</span>
            <span className="text-2xl font-bold">ELEVATE</span>
          </div>
        </div>
      </section>

      {/* CTA Footer */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="relative rounded-3xl bg-primary px-8 py-16 text-center overflow-hidden">
             <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,hsl(var(--primary-foreground)/0.15),transparent_60%)]" />
             <h2 className="text-3xl lg:text-5xl font-bold text-primary-foreground mb-6 relative">Ready to build your empire?</h2>
             <p className="text-primary-foreground/80 max-w-xl mx-auto mb-10 text-lg relative">
               Join 5,000+ brands building the future of digital commerce on Super-E.
             </p>
             <div className="flex justify-center gap-4 relative">
                <Button size="lg" variant="secondary" className="rounded-full h-14 px-10 text-base font-bold shadow-xl" render={<Link href="/signup" />}>
                  Get Started Now
                </Button>
             </div>
          </div>
        </div>
      </section>
    </div>
  );
}
