import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { MoveRight, PhoneCall, ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import hero5 from "@/assets/banner.png";
import hero2 from "@/assets/hero4.jpg";
import hero3 from "@/assets/hero3.jpg";
import hero4 from "@/assets/hero5.jpg";
import hero1 from "@/assets/hero5.png";
import { motion } from "framer-motion";

const sliderData = [
  {
    id: 1,
    title: "Premium Handcrafted Sweets",
    subtitle: "Curated Gifting by SuperSweets",
    description:
      "Exquisite handcrafted sweets and delicacies, arranged in elegant gift boxes—perfect for every celebration.",
    ctaText: "View Collection",
    image: hero1,
  },
  {
    id: 2,
    title: "Traditional Mithai Collection",
    subtitle: "Authentic Flavors Since 1977",
    description:
      "Discover the rich heritage of mithai crafted using time-honored techniques and premium ingredients.",
    ctaText: "Explore Mithai",
    image: hero2,
  },
  {
    id: 3,
    title: "Festival Special Offers",
    subtitle: "Celebrate with Sweets",
    description:
      "Make every festival grand with our curated festive hampers and limited-time offers.",
    ctaText: "Shop Festive",
    image: hero3,
  },
  {
    id: 4,
    title: "Custom Gift Boxes",
    subtitle: "Personalized Sweetness",
    description:
      "Select your favourite sweets to create your own bespoke gift box.",
    ctaText: "Create Box",
    image: hero4,
  },
  {
    id: 5,
    title: "Bulk Ordering Available",
    subtitle: "Perfect for Events",
    description:
      "From weddings to corporates—order in bulk with attractive pricing and priority delivery.",
    ctaText: "Order Bulk",
    image: hero5,
  },
];

const CuratedGiftingHero = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderData.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToSlide = (i: number) => {
    setCurrentSlide(i);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const nextSlide = () => goToSlide((currentSlide + 1) % sliderData.length);
  const prevSlide = () =>
    goToSlide((currentSlide - 1 + sliderData.length) % sliderData.length);

  const data = sliderData[currentSlide];

  return (
    <section className="relative min-h-[75vh] md:min-h-[85vh] overflow-hidden flex items-center">

      {/* --- Background Image --- */}
      <div className="absolute inset-0 z-0">
        <motion.img
          src={data.image}
          alt={data.title}
          className="w-full h-full object-cover brightness-[0.90] contrast-[1.1]"
          initial={{ scale: 1.06 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.8 }}
        />
      </div>

      {/* --- Subtle Gold + Black Gradients --- */}
      <div className="absolute inset-0 pointer-events-none z-10">
        {/* Top fade */}
        <div className="absolute top-0 w-full h-[120px] bg-gradient-to-b from-black/70 to-transparent"></div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 w-full h-[140px] bg-gradient-to-t from-black/70 to-transparent"></div>

        {/* Side gold lines */}
        <div className="absolute left-0 top-0 h-full w-[4px] bg-[#D4A017]/70"></div>
        <div className="absolute right-0 top-0 h-full w-[4px] bg-[#D4A017]/70"></div>
      </div>

      {/* --- MAIN CONTENT (No box, no blur) --- */}
      <div className="relative z-20 container mx-auto px-4 text-center">

        {/* Small Gold Tag */}
        <motion.div whileHover={{ scale: 1.05 }}>
          <Button
            size="sm"
            className="gap-2 bg-[#D4A017] hover:bg-[#bb8d14] text-white px-5 py-2 rounded-full shadow-lg"
          >
            Premium Collection <MoveRight className="w-4 h-4" />
          </Button>
        </motion.div>

        {/* Titles */}
        <div className="mt-6 space-y-3 max-w-3xl mx-auto">
          <h3 className="text-[#FFDFA0] text-xl md:text-2xl font-semibold tracking-wide drop-shadow">
            {data.subtitle}
          </h3>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight drop-shadow-xl">
            {data.title}
          </h1>

          <p className="text-gray-200 text-base md:text-lg leading-relaxed">
            {data.description}
          </p>
        </div>

        {/* Buttons */}
        <div className="mt-6 flex flex-col sm:flex-row justify-center gap-3">
          <motion.div whileHover={{ scale: 1.05 }}>
            <Button
              className="gap-2 bg-white text-[#3A2E21] hover:bg-gray-100 font-semibold px-6 py-4 rounded-xl"
              onClick={() => navigate("/contact")}
            >
              Enquire Now <PhoneCall className="w-4 h-4" />
            </Button>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }}>
            <Button
              className="gap-2 bg-[#D4A017] hover:bg-[#bb8d14] text-white font-semibold px-6 py-4 rounded-xl shadow-lg"
              onClick={() => navigate("/products")}
            >
              {data.ctaText} <ShoppingCart className="w-4 h-4" />
            </Button>
          </motion.div>
        </div>

        <p className="mt-6 text-gray-200 italic text-sm">
          “Crafted with tradition, presented with elegance”
        </p>
      </div>

      {/* --- Dots --- */}
      <div className="absolute bottom-16 left-0 right-0 flex justify-center z-40">
        <div className="flex space-x-2">
          {sliderData.map((_, i) => (
            <button
              key={i}
              onClick={() => goToSlide(i)}
              className={`rounded-full transition-all duration-300 ${
                i === currentSlide
                  ? "w-7 h-3 bg-[#D4A017]"
                  : "w-3 h-3 bg-white/40"
              }`}
            />
          ))}
        </div>
      </div>

      {/* --- Arrows --- */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-40 bg-black/35 hover:bg-black/60 text-white p-3 rounded-full"
      >
        <MoveRight className="w-5 h-5 rotate-180" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-40 bg-black/35 hover:bg-black/60 text-white p-3 rounded-full"
      >
        <MoveRight className="w-5 h-5" />
      </button>
    </section>
  );
};

export default CuratedGiftingHero;
