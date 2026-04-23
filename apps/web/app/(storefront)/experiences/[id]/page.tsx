"use client";

import { use, useState } from "react";
import Link from "next/link";
import { 
  Star, 
  Share, 
  Heart, 
  MapPin, 
  Users, 
  Clock, 
  Globe, 
  CheckCircle2, 
  ChevronLeft,
  Calendar as CalendarIcon,
  ChevronDown,
  Info,
  Camera,
  Utensils,
  Car
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { MOCK_EXPERIENCES } from "@/features/booking/data/mock-experiences";

export default function ExperienceDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const experience = MOCK_EXPERIENCES.find(e => e.id === id) || MOCK_EXPERIENCES[0];

  return (
    <div className="container mx-auto max-w-7xl px-6 py-12">
      {/* Navigation */}
      <div className="mb-8 flex items-center justify-between">
        <Link href="/experiences" className="group inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-muted-foreground hover:text-foreground transition-all">
          <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center group-hover:bg-primary/10 group-hover:text-primary transition-colors">
            <ChevronLeft className="h-4 w-4" />
          </div>
          Back to Experiences
        </Link>
        <div className="flex items-center gap-4">
           <Button variant="ghost" size="sm" className="rounded-full font-bold italic gap-2 h-10 px-4">
              <Share className="h-4 w-4" /> SHARE
           </Button>
           <Button variant="ghost" size="sm" className="rounded-full font-bold italic gap-2 h-10 px-4">
              <Heart className="h-4 w-4" /> SAVE
           </Button>
        </div>
      </div>

      {/* Header */}
      <div className="mb-10 space-y-4">
        <h1 className="text-4xl lg:text-6xl font-black italic tracking-tighter uppercase leading-none max-w-4xl">{experience.title}</h1>
        <div className="flex flex-wrap items-center gap-6">
           <div className="flex items-center gap-2">
              <Star className="h-4 w-4 fill-primary text-primary" />
              <span className="text-sm font-black italic">{experience.rating}</span>
              <span className="text-sm font-bold text-muted-foreground underline decoration-dashed uppercase tracking-widest ml-1">{experience.reviews} REVIEWS</span>
           </div>
           <div className="flex items-center gap-2 text-sm font-bold text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span className="uppercase tracking-widest underline decoration-dashed">{experience.location}</span>
           </div>
           <Badge className="bg-primary text-primary-foreground font-black italic px-4 py-1 rounded-full uppercase text-[10px] tracking-widest">
              {experience.category}
           </Badge>
        </div>
      </div>

      {/* Immersive Gallery */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-16 rounded-[3rem] overflow-hidden aspect-[16/7]">
        <div className="relative group cursor-pointer overflow-hidden">
           <img src={experience.images[0]} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" alt="Main" />
        </div>
        <div className="relative group cursor-pointer overflow-hidden">
           <img src={experience.images[1] || experience.images[0]} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" alt="Detail" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        {/* Left Content */}
        <div className="lg:col-span-8 space-y-16">
           {/* Experience Summary */}
           <div className="flex flex-wrap items-center gap-10">
              <div className="flex items-center gap-3">
                 <div className="h-12 w-12 rounded-2xl bg-muted flex items-center justify-center">
                    <Clock className="h-6 w-6 text-primary" />
                 </div>
                 <div className="flex flex-col">
                    <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">DURATION</span>
                    <span className="text-lg font-black italic">{experience.duration}</span>
                 </div>
              </div>
              <div className="flex items-center gap-3">
                 <div className="h-12 w-12 rounded-2xl bg-muted flex items-center justify-center">
                    <Users className="h-6 w-6 text-primary" />
                 </div>
                 <div className="flex flex-col">
                    <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">GROUP SIZE</span>
                    <span className="text-lg font-black italic">UP TO {experience.groupSize} PEOPLE</span>
                 </div>
              </div>
              <div className="flex items-center gap-3">
                 <div className="h-12 w-12 rounded-2xl bg-muted flex items-center justify-center">
                    <Globe className="h-6 w-6 text-primary" />
                 </div>
                 <div className="flex flex-col">
                    <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">LANGUAGES</span>
                    <span className="text-lg font-black italic">{experience.languages.join(", ")}</span>
                 </div>
              </div>
           </div>

           <Separator className="border-dashed" />

           {/* Description */}
           <div className="space-y-6">
              <h2 className="text-2xl font-black italic tracking-tight uppercase">WHAT WE&apos;LL DO</h2>
              <div className="prose prose-zinc max-w-none">
                 <p className="text-lg text-muted-foreground font-medium leading-relaxed italic">
                    {experience.description}
                 </p>
              </div>
           </div>

           {/* Highlights */}
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-muted/20 p-10 rounded-[2.5rem] border">
              {experience.highlights.map(highlight => (
                <div key={highlight} className="flex items-start gap-4">
                   <div className="mt-1 h-5 w-5 rounded-full bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
                      <CheckCircle2 className="h-3 w-3 text-emerald-600" />
                   </div>
                   <span className="text-sm font-bold uppercase tracking-tight italic">{highlight}</span>
                </div>
              ))}
           </div>

           {/* Host Profile */}
           <div className="space-y-8">
              <h2 className="text-2xl font-black italic tracking-tight uppercase">YOUR GUIDE</h2>
              <div className="flex flex-col md:flex-row gap-8 items-start">
                 <Avatar className="h-24 w-24 border-2 border-primary shadow-xl shrink-0">
                    <AvatarImage src={experience.host.avatar} />
                    <AvatarFallback>{experience.host.name[0]}</AvatarFallback>
                 </Avatar>
                 <div className="space-y-4">
                    <div className="space-y-1">
                       <h3 className="text-xl font-black italic tracking-tight uppercase">MEET {experience.host.name}</h3>
                       <p className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">PLATINUM HOST • SINCE 2018</p>
                    </div>
                    <p className="text-muted-foreground font-medium italic leading-relaxed max-w-xl">
                       &quot;{experience.host.bio}&quot;
                    </p>
                    <Button variant="outline" className="rounded-full font-black italic uppercase border-2 h-10 px-6">
                       CONTACT HOST
                    </Button>
                 </div>
              </div>
           </div>
        </div>

        {/* Right Content: Sticky Booking */}
        <div className="lg:col-span-4">
           <div className="sticky top-32">
              <div className="rounded-[2.5rem] border bg-background p-8 shadow-2xl shadow-primary/5 space-y-8">
                 <div className="flex items-end justify-between">
                    <div className="flex items-baseline gap-1">
                       <span className="text-3xl font-black italic">${experience.pricePerPerson}</span>
                       <span className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">/ PERSON</span>
                    </div>
                 </div>

                 <div className="space-y-4">
                    <button className="w-full flex items-center justify-between p-5 rounded-2xl border text-left hover:bg-muted/50 transition-all">
                       <div className="flex flex-col">
                          <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">CHOOSE DATE</span>
                          <span className="text-sm font-bold italic">Select available date</span>
                       </div>
                       <CalendarIcon className="h-5 w-5 text-muted-foreground" />
                    </button>
                    <button className="w-full flex items-center justify-between p-5 rounded-2xl border text-left hover:bg-muted/50 transition-all">
                       <div className="flex flex-col">
                          <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">PARTICIPANTS</span>
                          <span className="text-sm font-bold italic">1 participant</span>
                       </div>
                       <ChevronDown className="h-5 w-5 text-muted-foreground" />
                    </button>
                 </div>

                 <Button className="w-full h-14 rounded-full font-black italic text-lg shadow-xl shadow-primary/20">
                    BOOK EXPERIENCE
                 </Button>

                 <div className="space-y-6">
                    <div className="flex flex-col gap-4">
                       <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">INCLUDES</h4>
                       <div className="flex gap-4">
                          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted border text-[10px] font-black italic uppercase">
                             <Utensils className="h-3 w-3" /> MEAL
                          </div>
                          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted border text-[10px] font-black italic uppercase">
                             <Car className="h-3 w-3" /> TRAVEL
                          </div>
                          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted border text-[10px] font-black italic uppercase">
                             <Camera className="h-3 w-3" /> PHOTOS
                          </div>
                       </div>
                    </div>
                    
                    <Separator className="border-dashed" />
                    
                    <div className="space-y-3">
                       <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground font-bold italic uppercase">Total (1 person)</span>
                          <span className="font-black italic text-lg">${experience.pricePerPerson}</span>
                       </div>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
