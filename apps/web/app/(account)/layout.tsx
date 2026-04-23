import { Navbar } from "@/components/layout/storefront/Navbar";
import { Footer } from "@/components/layout/storefront/Footer";
import { CartDrawer } from "@/features/cart/components/CartDrawer";
import Link from "next/link";
import { User, Package, Heart, MapPin, LogOut } from "lucide-react";

const ACCOUNT_NAV = [
  { label: "Profile", href: "/account", icon: User },
  { label: "Orders", href: "/account/orders", icon: Package },
  { label: "Wishlist", href: "/account/wishlist", icon: Heart },
  { label: "Addresses", href: "/account/addresses", icon: MapPin },
];

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <div className="container mx-auto px-4 py-8 flex-1">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Sidebar */}
          <aside className="md:col-span-1">
            <nav className="rounded-xl border bg-card shadow-sm overflow-hidden">
              {ACCOUNT_NAV.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-muted-foreground hover:bg-muted/60 hover:text-foreground transition-colors border-b last:border-0"
                  >
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </Link>
                );
              })}
              <button className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-destructive hover:bg-destructive/5 transition-colors">
                <LogOut className="h-4 w-4" />
                Sign out
              </button>
            </nav>
          </aside>

          {/* Main Content */}
          <main className="md:col-span-3">{children}</main>
        </div>
      </div>
      <Footer />
      <CartDrawer />
    </div>
  );
}
