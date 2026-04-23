export interface Experience {
  id: string;
  title: string;
  description: string;
  location: string;
  pricePerPerson: number;
  rating: number;
  reviews: number;
  duration: string;
  images: string[];
  category: string;
  groupSize: number;
  languages: string[];
  highlights: string[];
  host: {
    name: string;
    avatar: string;
    bio: string;
  };
}

export const MOCK_EXPERIENCES: Experience[] = [
  {
    id: "exp_1",
    title: "Oaxacan Mezcal Odyssey",
    description: "Journey deep into the agave fields with a 4th-generation mezcalero. Harvest wild agave and witness the ancient distillation process.",
    location: "Oaxaca, Mexico",
    pricePerPerson: 320,
    rating: 4.99,
    reviews: 312,
    duration: "6 hours",
    images: [
      "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=800",
      "https://images.unsplash.com/photo-1527661591475-527312dd65f5?q=80&w=800"
    ],
    category: "Food & Drink",
    groupSize: 6,
    languages: ["English", "Spanish"],
    highlights: ["Agave harvesting", "Private tasting", "Traditional lunch", "Transportation included"],
    host: {
      name: "Eduardo",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200",
      bio: "I've been making Mezcal since I was 12. My family has preserved this tradition for over 150 years."
    }
  }
];
