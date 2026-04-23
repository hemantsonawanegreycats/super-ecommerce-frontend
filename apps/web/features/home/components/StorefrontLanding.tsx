import { HeroSection } from "./HeroSection";
import { FeaturedCollections } from "./FeaturedCollections";
import { TrendingProducts } from "./TrendingProducts";
import { ReviewsStrip } from "./ReviewsStrip";
import { NewsletterSection } from "./NewsletterSection";

export function StorefrontLanding() {
  return (
    <div className="flex flex-col gap-16 md:gap-24 pb-8">
      <HeroSection />
      <FeaturedCollections />
      <TrendingProducts />
      <ReviewsStrip />
      <NewsletterSection />
    </div>
  );
}
