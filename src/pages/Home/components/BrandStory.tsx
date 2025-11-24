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

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut", delay: i * 0.08 },
  }),
};

const BrandStory: React.FC = () => {
  return (
    <section className="relative bg-[#ACCFB9] border-t border-[#BC8649]/20 overflow-hidden">

      {/* Soft floating blobs */}
      <motion.div
        className="absolute top-12 left-12 w-40 h-40 bg-[#FFDCDB]/60 rounded-full blur-3xl opacity-60"
        animate={{ y: [0, -15, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-12 right-12 w-48 h-48 bg-[#CAE2B8]/50 rounded-full blur-3xl opacity-60"
        animate={{ y: [0, 18, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="container mx-auto px-4 py-16 lg:py-24 relative z-10">

        {/* Header */}
        <motion.div
          className="text-center max-w-3xl mx-auto mb-12"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          <motion.div
            variants={fadeUp}
            custom={0}
            className="inline-flex items-center justify-center px-4 py-1 rounded-full bg-white shadow border border-[#BC8649]/30"
          >
            <span className="text-sm font-medium text-[#BC8649]">Our Journey</span>
          </motion.div>

          <motion.h2
            variants={fadeUp}
            custom={1}
            className="mt-5 text-3xl md:text-4xl lg:text-5xl font-extrabold text-black tracking-tight"
          >
            The <span className="text-[#BC8649]">Sweet</span> Story
          </motion.h2>

          <motion.p
            variants={fadeUp}
            custom={2}
            className="mt-4 text-base md:text-lg text-black/80 max-w-2xl mx-auto leading-relaxed"
          >
            From a humble shop to a trusted gifting brand — we’ve preserved recipes, elevated presentation,
            and made celebrations sweeter for decades.
          </motion.p>
        </motion.div>

        {/* Carousel */}
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
                    variants={fadeUp}
                    className="p-2"
                  >
                    <Card className="relative overflow-hidden border border-[#BC8649]/20 shadow-lg rounded-3xl bg-white">

                      <div className="h-40 md:h-44 lg:h-48 w-full overflow-hidden rounded-t-3xl">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </div>

                      <CardContent className="p-6">

                        <div className="flex items-center justify-center -mt-10 mb-3">
                          <motion.div
                            className="h-14 w-14 rounded-full bg-[#BC8649] text-white flex items-center justify-center font-semibold shadow border-2 border-white"
                            initial={{ scale: 0.7, opacity: 0 }}
                            whileInView={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.5, ease: "easeOut" }}
                          >
                            {item.year}
                          </motion.div>
                        </div>

                        <h3 className="text-lg md:text-xl font-semibold text-black text-center mb-2">
                          {item.title}
                        </h3>

                        <p className="text-sm md:text-base text-black/70 leading-relaxed text-center">
                          {item.description}
                        </p>

                        <div className="mt-5 flex justify-center">
                          <div className="w-16 h-1 rounded-full bg-[#BC8649]" />
                        </div>

                      </CardContent>
                    </Card>
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>

        {/* Footer CTA */}
        <motion.div
          className="mt-12 text-center"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          <motion.p
            variants={fadeUp}
            custom={0}
            className="text-sm text-black/75 max-w-xl mx-auto"
          >
            We’re still on the same promise: real ingredients, careful craft and premium presentation — perfect
            for gifting, festivals and family moments.
          </motion.p>

          <motion.div
            variants={fadeUp}
            custom={1}
            className="mt-6 flex items-center justify-center gap-4"
          >
            <a
              href="/about"
              className="px-6 py-3 rounded-full bg-[#BC8649] hover:bg-[#a4733d] text-white font-semibold shadow transition"
            >
              Learn Our Story
            </a>

            <a
              href="/products"
              className="px-6 py-3 rounded-full bg-white border border-[#BC8649]/40 text-black hover:bg-[#F3F0C5]/60 transition shadow-sm"
            >
              Shop Hampers
            </a>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
};

export default BrandStory;
