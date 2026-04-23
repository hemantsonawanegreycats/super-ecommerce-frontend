import { Navbar } from "@/components/layout/storefront/Navbar";
import { Footer } from "@/components/layout/storefront/Footer";
import { CartDrawer } from "@/features/cart/components/CartDrawer";

export default function StorefrontLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <CartDrawer />
    </div>
  );
}
