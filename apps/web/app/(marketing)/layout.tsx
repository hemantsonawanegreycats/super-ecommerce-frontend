"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Rocket } from "lucide-react";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="fixed top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
              <Rocket className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="font-bold text-xl tracking-tight">Super-E</span>
          </Link>
          
          <nav className="hidden md:flex items-center gap-8">
            <Link href="#features" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Features</Link>
            <Link href="#pricing" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Pricing</Link>
            <Link href="#docs" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Documentation</Link>
          </nav>
          
          <div className="flex items-center gap-4">
            <Button variant="ghost" className="text-sm font-medium" render={<Link href="/login" />}>Log in</Button>
            <Button className="rounded-full px-5" render={<Link href="/signup" />}>Get Started</Button>
          </div>
        </div>
      </header>
      <main className="flex-1">{children}</main>
      <footer className="border-t py-12 bg-muted/20">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-2">
               <Rocket className="h-5 w-5 text-primary" />
               <span className="font-bold">Super-E Platform</span>
            </div>
            <p className="text-sm text-muted-foreground">© 2026 Super-E Commerce. All rights reserved.</p>
            <div className="flex gap-6">
               <Link href="#" className="text-xs text-muted-foreground hover:text-foreground">Privacy Policy</Link>
               <Link href="#" className="text-xs text-muted-foreground hover:text-foreground">Terms of Service</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
