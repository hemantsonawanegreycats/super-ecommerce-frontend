import Link from "next/link";
import { Sparkles } from "lucide-react";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative grid min-h-screen lg:grid-cols-2">
      {/* Left brand panel */}
      <div className="relative hidden flex-col justify-between overflow-hidden bg-gradient-to-br from-primary/95 via-primary to-primary/70 p-10 text-primary-foreground lg:flex">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.18),transparent_55%)]" />
        <div className="absolute -bottom-32 -right-24 h-96 w-96 rounded-full bg-white/10 blur-3xl" />

        <Link href="/" className="relative z-10 flex items-center gap-2 text-lg font-extrabold tracking-tight">
          <Sparkles className="h-5 w-5" />
          Super-E
        </Link>

        <div className="relative z-10 space-y-4">
          <h1 className="text-3xl font-extrabold leading-tight tracking-tight">
            Commerce that scales with you.
          </h1>
          <p className="text-sm text-primary-foreground/80 max-w-sm leading-relaxed">
            One platform for storefronts, vendors, bookings and payments. Sign in to manage every channel in one place.
          </p>
        </div>

        <div className="relative z-10 text-xs text-primary-foreground/70">
          &copy; {new Date().getFullYear()} Super-E Platform
        </div>
      </div>

      {/* Right form panel */}
      <div className="flex flex-col">
        <header className="flex items-center justify-between p-6 lg:hidden">
          <Link href="/" className="flex items-center gap-2 text-base font-extrabold tracking-tight">
            <Sparkles className="h-4 w-4" />
            Super-E
          </Link>
        </header>

        <main className="flex flex-1 items-center justify-center p-6">
          <div className="w-full max-w-md">{children}</div>
        </main>

        <footer className="hidden items-center justify-between p-6 text-xs text-muted-foreground lg:flex">
          <Link href="/" className="hover:text-foreground transition-colors">
            Back to store
          </Link>
          <div className="flex gap-4">
            <Link href="/legal/privacy" className="hover:text-foreground transition-colors">Privacy</Link>
            <Link href="/legal/terms" className="hover:text-foreground transition-colors">Terms</Link>
          </div>
        </footer>
      </div>
    </div>
  );
}
