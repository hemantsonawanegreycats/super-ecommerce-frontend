import Link from "next/link";
import { Package, Settings, User, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AccountPage() {
  return (
    <div className="space-y-8">
      {/* Profile Card */}
      <div className="rounded-xl border bg-card p-6 shadow-sm flex flex-col sm:flex-row items-center sm:items-start gap-6">
        <div className="h-20 w-20 rounded-full bg-muted flex items-center justify-center shrink-0">
          <User className="h-10 w-10 text-muted-foreground" />
        </div>
        <div className="flex-1 space-y-1 text-center sm:text-left">
          <h1 className="text-2xl font-bold">John Doe</h1>
          <p className="text-sm text-muted-foreground">john@example.com</p>
          <p className="text-xs text-muted-foreground">Member since April 2026</p>
        </div>
        <Button variant="outline" size="sm" className="gap-2">
          <Settings className="h-4 w-4" /> Edit Profile
        </Button>
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Link href="/account/orders" className="group rounded-xl border bg-card p-5 shadow-sm hover:border-primary/50 hover:shadow-md transition-all flex items-center gap-4">
          <div className="p-3 rounded-lg bg-primary/10">
            <Package className="h-6 w-6 text-primary" />
          </div>
          <div>
            <p className="font-semibold">My Orders</p>
            <p className="text-sm text-muted-foreground">Track & manage purchases</p>
          </div>
        </Link>
        <Link href="/account/wishlist" className="group rounded-xl border bg-card p-5 shadow-sm hover:border-primary/50 hover:shadow-md transition-all flex items-center gap-4">
          <div className="p-3 rounded-lg bg-red-500/10">
            <Heart className="h-6 w-6 text-red-500" />
          </div>
          <div>
            <p className="font-semibold">Wishlist</p>
            <p className="text-sm text-muted-foreground">Items you've saved</p>
          </div>
        </Link>
      </div>
    </div>
  );
}
