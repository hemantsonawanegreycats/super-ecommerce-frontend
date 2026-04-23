export interface Stay {
  id: string;
  title: string;
  description: string;
  location: string;
  pricePerNight: number;
  rating: number;
  reviews: number;
  images: string[];
  type: string;
  guests: number;
  bedrooms: number;
  beds: number;
  bathrooms: number;
  amenities: string[];
  coordinates: { lat: number; lng: number };
}

export const MOCK_STAYS: Stay[] = [
  {
    id: "stay_1",
    title: "Minimalist Desert Pavilion",
    description: "A glass and steel sanctuary in the heart of Joshua Tree. Witness the cosmic sky through floor-to-ceiling windows.",
    location: "Joshua Tree, CA",
    pricePerNight: 850,
    rating: 4.98,
    reviews: 124,
    images: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=800",
      "https://images.unsplash.com/photo-1449156001935-d2863fb72690?q=80&w=800"
    ],
    type: "Architectural Home",
    guests: 4,
    bedrooms: 2,
    beds: 2,
    bathrooms: 2,
    amenities: ["Self check-in", "Free parking", "Wifi", "Kitchen", "Pool"],
    coordinates: { lat: 34.1353, lng: -116.3156 }
  },
  {
    id: "stay_2",
    title: "Floating Forest Sphere",
    description: "Suspended in the ancient redwoods, this architectural marvel offers 360-degree views of the canopy.",
    location: "Big Sur, CA",
    pricePerNight: 1200,
    rating: 5.0,
    reviews: 89,
    images: [
      "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?q=80&w=800",
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=800"
    ],
    type: "Treehouse",
    guests: 2,
    bedrooms: 1,
    beds: 1,
    bathrooms: 1,
    amenities: ["Breakfast included", "Eco-friendly", "Outdoor shower", "Fire pit"],
    coordinates: { lat: 36.2704, lng: -121.8081 }
  },
  {
    id: "stay_3",
    title: "Obsidian Lake House",
    description: "Dark, moody, and ultra-luxurious. A cantilevered masterpiece overlooking the black waters of Lake Tahoe.",
    location: "Lake Tahoe, NV",
    pricePerNight: 2400,
    rating: 4.95,
    reviews: 42,
    images: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=800",
      "https://images.unsplash.com/photo-1464146072230-91cabc968273?q=80&w=800"
    ],
    type: "Lakeside Estate",
    guests: 10,
    bedrooms: 5,
    beds: 6,
    bathrooms: 4.5,
    amenities: ["Private beach", "Home theater", "Chef kitchen", "Gym", "Tesla charger"],
    coordinates: { lat: 39.0968, lng: -120.0324 }
  }
];
