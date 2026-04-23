"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const reviews = [
  {
    id: 1,
    author: "Sarah Johnson",
    role: "Verified Buyer",
    content: "The quality of the summer collection is unmatched. The linen fabrics are so breathable and the fit is perfect.",
    rating: 5,
    avatar: "https://i.pravatar.cc/150?u=sarah",
  },
  {
    id: 2,
    author: "Michael Chen",
    role: "Minimalist Enthusiast",
    content: "Found exactly what I needed for my home office. The desk lamp is a piece of art itself. Highly recommend!",
    rating: 5,
    avatar: "https://i.pravatar.cc/150?u=michael",
  },
  {
    id: 3,
    author: "Emma Wilson",
    role: "Traveler",
    content: "My leather backpack has survived three international trips and still looks brand new. Amazing durability.",
    rating: 4,
    avatar: "https://i.pravatar.cc/150?u=emma",
  },
];

export function ReviewsStrip() {
  return (
    <section className="py-24 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight mb-4">What Our Community Says</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Real stories from real customers. We take pride in the quality and service we provide to our community.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative p-8 rounded-3xl bg-card border shadow-sm flex flex-col"
            >
              <Quote className="absolute top-6 right-8 h-12 w-12 text-muted/20" />
              
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`h-4 w-4 ${i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-muted"}`} 
                  />
                ))}
              </div>

              <p className="text-lg leading-relaxed mb-8 flex-1 italic text-card-foreground/90">
                &ldquo;{review.content}&rdquo;
              </p>

              <div className="flex items-center gap-4 pt-6 border-t">
                <img 
                  src={review.avatar} 
                  alt={review.author} 
                  className="h-12 w-12 rounded-full object-cover ring-2 ring-background"
                />
                <div>
                  <h4 className="font-bold text-sm">{review.author}</h4>
                  <p className="text-xs text-muted-foreground">{review.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
