export function Footer() {
  return (
    <footer className="border-t bg-muted/40 text-muted-foreground mt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-semibold text-foreground mb-4">Shop</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/products" className="hover:text-foreground transition-colors">All Products</a></li>
              <li><a href="/collections" className="hover:text-foreground transition-colors">Collections</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-foreground mb-4">Support</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/contact" className="hover:text-foreground transition-colors">Contact Us</a></li>
              <li><a href="/returns" className="hover:text-foreground transition-colors">Returns & Refunds</a></li>
            </ul>
          </div>
          <div className="col-span-2 md:col-span-2">
            <h3 className="font-semibold text-foreground mb-4">Subscribe to our newsletter</h3>
            <p className="text-sm mb-4">Get the latest updates on new products and upcoming sales.</p>
            {/* Newsletter input placeholder */}
            <div className="flex gap-2">
              <input type="email" placeholder="Enter your email" className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50" />
              <button className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2">
                Subscribe
              </button>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t pt-8 text-center text-sm">
        <p>© 2026 Super-E. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
