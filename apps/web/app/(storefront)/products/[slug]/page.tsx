import { Badge } from "@/components/ui/badge";
import { ShieldCheck, Truck, RotateCcw, Share2, Heart, Star } from "lucide-react";
import { PDPGallery } from "@/features/catalog/components/PDPGallery";
import { VariantSelector } from "@/features/catalog/components/VariantSelector";
import { AddToCartButton } from "@/features/catalog/components/AddToCartButton";
import { PricingBlock } from "@/features/catalog/components/PricingBlock";
import { PDPTabs } from "@/features/catalog/components/PDPTabs";
import { ProductCard } from "@/features/catalog/components/ProductCard";
import { Button } from "@/components/ui/button";

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  // Mock Data for a Premium Weighted Blanket
  const product = {
    id: "p_123",
    title: "The Cloud-Weight Premium Blanket",
    description: "Experience the calming comfort of our premium weighted blanket. Designed to simulate the feeling of being hugged, it promotes deep, restful sleep and reduced anxiety. Made with breathable 100% organic cotton and filled with non-toxic glass beads.",
    price: 189.00,
    compareAtPrice: 240.00,
    rating: 4.9,
    reviewsCount: 128,
    vendor: {
      name: "SleepWell Co.",
      badge: "Verified Vendor"
    },
    images: [
      "https://images.unsplash.com/photo-1583845258933-289c09d57a9e?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1629853900989-1cdb71454c7d?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1514734631336-db155a5b51c1?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1543335359-994c9ad6ef39?q=80&w=1200&auto=format&fit=crop"
    ],
    options: [
      { id: "opt_1", name: "Color", values: ["lightgray", "#2f4f4f", "#000080"] },
      { id: "opt_2", name: "Weight", values: ["10lbs", "15lbs", "20lbs"] }
    ],
    specifications: [
      { label: "Material", value: "100% Organic Bamboo" },
      { label: "Fill", value: "Premium Micro-Glass Beads" },
      { label: "Dimensions", value: "60\" x 80\"" },
      { label: "Washable", value: "Yes, machine cold" },
      { label: "Country of Origin", value: "Denmark" },
    ],
    reviews: [
      { id: "r1", author: "Sarah J.", rating: 5, content: "Life-changing! I haven't slept this well in years. The weight is perfect and it doesn't get hot at night.", date: "2 days ago" },
      { id: "r2", author: "Michael T.", rating: 4, content: "Very high quality. The stitching is excellent and the beads don't shift around. Highly recommended.", date: "1 week ago" },
      { id: "r3", author: "Emma W.", rating: 5, content: "Beautiful color and so soft. It looks great on my bed even when I'm not using it.", date: "3 weeks ago" },
    ]
  };

  const relatedProducts = [
    {
      id: "rp_1",
      title: "Silk Sleep Mask",
      slug: "silk-sleep-mask",
      imageUrl: "https://images.unsplash.com/photo-1629853900989-1cdb71454c7d?q=80&w=600",
      price: 29.00,
      vendorName: "SleepWell Co."
    },
    {
      id: "rp_2",
      title: "Bamboo Pillowcase Set",
      slug: "bamboo-pillowcase",
      imageUrl: "https://images.unsplash.com/photo-1514734631336-db155a5b51c1?q=80&w=600",
      price: 45.00,
      vendorName: "SleepWell Co."
    },
    {
      id: "rp_3",
      title: "Lavender Sleep Spray",
      slug: "sleep-spray",
      imageUrl: "https://images.unsplash.com/photo-1543335359-994c9ad6ef39?q=80&w=600",
      price: 18.00,
      vendorName: "SleepWell Co."
    },
    {
      id: "rp_4",
      title: "Cotton Weighted Blanket",
      slug: "cotton-blanket",
      imageUrl: "https://images.unsplash.com/photo-1583845258933-289c09d57a9e?q=80&w=600",
      price: 129.00,
      vendorName: "SleepWell Co."
    }
  ];

  return (
    <div className="container mx-auto px-6 lg:px-8 py-12 min-h-screen">
      <div className="flex flex-col lg:flex-row gap-16 lg:gap-20">
        
        {/* Left: Premium Gallery */}
        <div className="w-full lg:w-[55%]">
          <PDPGallery images={product.images} />
        </div>

        {/* Right: Product Details */}
        <div className="flex-1 flex flex-col gap-10">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xs font-black uppercase tracking-widest text-primary/70 bg-primary/5 px-3 py-1 rounded-full">
                  {product.vendor.name}
                </span>
                <div className="flex items-center gap-1 text-amber-500 ml-4">
                  <Star className="h-4 w-4 fill-amber-500" />
                  <span className="text-sm font-bold text-foreground">{product.rating}</span>
                  <span className="text-xs text-muted-foreground font-medium">({product.reviewsCount} reviews)</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full border border-border/50">
                  <Share2 className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full border border-border/50 text-destructive hover:bg-destructive/5">
                  <Heart className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <h1 className="text-4xl lg:text-5xl font-black tracking-tight leading-[1.1] text-foreground">
              {product.title}
            </h1>
            
            <PricingBlock 
              price={product.price}
              compareAtPrice={product.compareAtPrice}
              size="lg"
            />
          </div>

          <div className="space-y-10">
            <VariantSelector options={product.options} />

            <div className="flex flex-col gap-4">
              <AddToCartButton 
                productId={product.id}
                title={product.title}
                slug={slug}
                price={product.price}
                imageUrl={product.images[0]}
                vendorName={product.vendor.name}
                size="lg"
              />
              <p className="text-center text-xs text-muted-foreground font-medium">
                Free Shipping on orders over $150 • Secure SSL Encrypted Payments
              </p>
            </div>
          </div>

          {/* Core Guarantees Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 py-10 border-y border-border/40 mt-auto bg-muted/10 -mx-6 px-6 lg:mx-0 lg:px-0 lg:bg-transparent">
            <div className="flex items-center gap-4">
              <div className="h-10 w-10 rounded-xl bg-background border flex items-center justify-center shrink-0 shadow-sm">
                <ShieldCheck className="h-5 w-5 text-primary" />
              </div>
              <div>
                <div className="text-xs font-bold uppercase tracking-wider">Warranty</div>
                <div className="text-xs text-muted-foreground">1 Year included</div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="h-10 w-10 rounded-xl bg-background border flex items-center justify-center shrink-0 shadow-sm">
                <Truck className="h-5 w-5 text-primary" />
              </div>
              <div>
                <div className="text-xs font-bold uppercase tracking-wider">Shipping</div>
                <div className="text-xs text-muted-foreground">Free worldwide</div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="h-10 w-10 rounded-xl bg-background border flex items-center justify-center shrink-0 shadow-sm">
                <RotateCcw className="h-5 w-5 text-primary" />
              </div>
              <div>
                <div className="text-xs font-bold uppercase tracking-wider">Returns</div>
                <div className="text-xs text-muted-foreground">30-Day trial</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Section (Full Width) */}
      <PDPTabs 
        description={product.description} 
        specifications={product.specifications} 
        reviews={product.reviews} 
      />

      {/* Related Products Section */}
      <div className="mt-32 space-y-12">
        <div className="flex items-end justify-between">
          <div className="space-y-4">
            <h2 className="text-3xl lg:text-4xl font-black italic tracking-tight">Complete the Experience</h2>
            <p className="text-muted-foreground text-lg">Specially curated items that complement your peaceful rest.</p>
          </div>
          <Button variant="outline" className="rounded-full px-8 h-12 hidden sm:flex">Explore All</Button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {relatedProducts.map((p) => (
            <ProductCard key={p.id} {...p} />
          ))}
        </div>
      </div>
    </div>
  );
}
