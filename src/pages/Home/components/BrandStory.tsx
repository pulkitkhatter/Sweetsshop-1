// src/pages/Home/components/BrandStory.tsx
import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import hero1 from "@/assets/hero1.png";
import hero2 from "@/assets/hero3.jpg";
import hero3 from "@/assets/hero4.jpg";
import hero4 from "@/assets/hero5.jpg";
import hero5 from "@/assets/banner.png";

const timelineData = [
  {
    year: "1975",
    title: "A Sweet Dream",
    description:
      "Our founder dreamt of creating authentic, traditional sweets — handcrafted recipes passed down through generations.",
    image: hero1,
  },
  {
    year: "1977",
    title: "First Shop Opens",
    description:
      "The first SuperSweets shop opened its doors. Small beginnings — honest ingredients, careful hands.",
    image: hero2,
  },
  {
    year: "1985",
    title: "Growing Reputation",
    description:
      "Word spread fast. We focused on consistency and taste — customers began returning for family celebrations.",
    image: hero3,
  },
  {
    year: "2005",
    title: "Citywide Presence",
    description:
      "Multiple outlets, stronger bakery-kitchen systems and a reputation for reliably delicious mithai across the city.",
    image: hero4,
  },
  {
    year: "2020",
    title: "Digital Transformation",
    description:
      "SuperSweets went online — curated hampers, festival collections and bulk ordering for events made easy.",
    image: hero5,
  },
  {
    year: "2025",
    title: "48+ Years of Craft",
    description:
      "We combine tradition and premium presentation — handcrafted sweets, beautifully packaged for gifting.",
    image: hero1,
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 12 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, ease: "easeOut", duration: 0.45 },
  }),
};

const BrandStory: React.FC = () => {
  return (
    <section className="relative bg-[color:var(--background)]">
      {/* Subtle decorative top band */}
      <div className="absolute inset-x-0 top-0 h-12 bg-gradient-to-b from-[#FAF3E0] to-transparent pointer-events-none" />

      <div className="container mx-auto px-4 py-16 lg:py-24">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center justify-center px-3 py-1 rounded-full bg-white/90 shadow-sm border border-yellow-100">
            <span className="text-sm font-medium text-[#6E5E51]">Our Journey</span>
          </div>

          <h2 className="mt-4 text-3xl md:text-4xl lg:text-5xl font-bold text-[#3A2E21] tracking-tight">
            The <span className="text-[#D4A017]">Sweet</span> Story
          </h2>

          <p className="mt-3 text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            From a humble shop to a trusted gifting brand — we’ve preserved recipes, elevated presentation,
            and made celebrations sweeter for decades.
          </p>
        </div>

        {/* Carousel / Timeline */}
        <div className="relative">
          <Carousel
            opts={{
              align: "center",
              loop: false,
              dragFree: true,
              slidesToScroll: 1,
              containScroll: "trimSnaps",
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {timelineData.map((item, idx) => (
                <CarouselItem
                  key={idx}
                  className="pl-2 md:pl-4 basis-full sm:basis-1/2 lg:basis-1/3"
                >
                  <motion.div
                    custom={idx}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={cardVariants}
                    className="p-2"
                  >
                    <Card className="relative overflow-hidden border-0 shadow-[0_10px_30px_rgba(0,0,0,0.06)] rounded-2xl">
                      {/* Image top area */}
                      <div className="h-40 md:h-44 lg:h-48 w-full overflow-hidden rounded-t-2xl bg-gray-100">
                        <img
                          src={item.image}
                          alt={item.title}
                          loading="lazy"
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            // graceful fallback to a neutral background if image fails
                            (e.currentTarget as HTMLImageElement).style.background = "#f3f1ec";
                            (e.currentTarget as HTMLImageElement).style.objectFit = "contain";
                          }}
                        />
                      </div>

                      <CardContent className="p-6">
                        <div className="flex items-center justify-center -mt-10 mb-2">
                          <div className="flex items-center justify-center h-14 w-14 rounded-full bg-[#D4A017] text-white font-semibold shadow-md border-2 border-white">
                            <span className="text-sm">{item.year}</span>
                          </div>
                        </div>

                        <div className="text-center">
                          <h3 className="text-lg md:text-xl font-semibold text-[#3A2E21] mb-2">
                            {item.title}
                          </h3>

                          <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                            {item.description}
                          </p>
                        </div>

                        <div className="mt-5 flex justify-center">
                          <div className="w-16 h-1 rounded-full bg-[#D4A017]" />
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>

          {/* Desktop arrows (provided visually near carousel — hidden on small screens) */}
          <div className="hidden md:flex items-center justify-between gap-4 absolute inset-y-0 left-0 right-0 pointer-events-none px-6 -translate-y-6">
            {/* left placeholder aligned visually; actual arrow controls are in your carousel */}
            <div className="pointer-events-auto" />
            <div className="pointer-events-auto" />
          </div>
        </div>

        {/* Footer CTA - short and elegant */}
        <div className="mt-10 text-center">
          <p className="text-sm text-muted-foreground max-w-xl mx-auto">
            We’re still on the same promise: real ingredients, careful craft and premium presentation — perfect
            for gifting, festivals and family moments.
          </p>

          <div className="mt-6 flex items-center justify-center gap-3">
            <a
              href="/about"
              className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-[#D4A017] hover:bg-[#bb8d14] text-white font-semibold shadow-sm transition"
            >
              Learn Our Story
            </a>
            <a
              href="/products"
              className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-white border border-gray-100 text-[#3A2E21] hover:bg-gray-50 transition shadow-sm"
            >
              Shop Hampers
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrandStory;
