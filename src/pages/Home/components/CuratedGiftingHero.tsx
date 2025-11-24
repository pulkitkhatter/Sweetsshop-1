import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { MoveRight, PhoneCall, ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Images
import hero5 from "@/assets/banner.png";
import hero2 from "@/assets/30.png";
import hero3 from "@/assets/back.jpeg";
import hero4 from "@/assets/6.jpeg";
import hero1 from "@/assets/hero5.png";

import { motion } from "framer-motion";

const sliderData = [
  {
    id: 1,
    showText: true,
    title: "Premium Handcrafted Sweets",
    subtitle: "Curated Gifting by SuperSweets",
    description:
      "Exquisite handcrafted sweets and delicacies, arranged in elegant gift boxes—perfect for every celebration.",
    ctaText: "View Collection",
    image: hero1,
  },
  {
    id: 2,
    showText: false,
    image: hero2,
  },
  {
    id: 3,
    showText: false,
    image: hero3,
  },
  {
    id: 4,
    showText: false,
    image: hero4,
  },
  {
    id: 5,
    showText: true,
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

  const nextSlide = () =>
    goToSlide((currentSlide + 1) % sliderData.length);

  const prevSlide = () =>
    goToSlide((currentSlide - 1 + sliderData.length) % sliderData.length);

  const data = sliderData[currentSlide];

  return (
    <section className="relative min-h-[78vh] md:min-h-[90vh] overflow-hidden flex items-center">

      {/* ===== FIXED BACKGROUND FOR SLIDE 2 (MOBILE + DESKTOP) ===== */}
      <div className="absolute inset-0 z-0">

        {/* ALWAYS SHOW BLURRED BACKGROUND FOR SLIDE 2 */}
        {currentSlide === 1 && (
          <motion.img
            src={data.image}
            alt="blurred-bg"
            className="absolute inset-0 w-full h-full object-cover blur-2xl scale-125 opacity-60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7 }}
          />
        )}

        {/* MAIN IMAGE */}
        <motion.img
          src={data.image}
          alt="Slide"
          className={`
            relative z-10 w-full h-full
            ${
              currentSlide === 1
                ? "object-contain"        /* Fix for slide 2 */
                : "object-cover"          /* Normal for others */
            }
            brightness-[0.88] contrast-[1.06]
          `}
          initial={{ scale: 1.06 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.1, ease: "easeOut" }}
        />
      </div>

      {/* ===== GRADIENT OVERLAYS ===== */}
      <div className="absolute inset-0 pointer-events-none z-10">
        <div className="absolute top-0 w-full h-[140px] bg-gradient-to-b from-black/80 to-transparent" />
        <div className="absolute bottom-0 w-full h-[160px] bg-gradient-to-t from-black/85 to-transparent" />
        <div className="absolute left-0 top-0 h-full w-[3px] bg-gradient-to-b from-[#d4a017aa] to-[#d4a01733]" />
        <div className="absolute right-0 top-0 h-full w-[3px] bg-gradient-to-b from-[#d4a017aa] to-[#d4a01733]" />
      </div>

      {/* ===== TEXT ONLY FOR SLIDE 1 & 5 ===== */}
      {data.showText && (
        <div className="relative z-20 container mx-auto px-6 max-w-3xl text-center">
          
          {/* Badge */}
          <motion.div whileHover={{ scale: 1.05 }}>
            <Button
              size="sm"
              className="gap-2 bg-[#D4A017] hover:bg-[#b88d15] text-white px-5 py-2 rounded-full shadow-xl tracking-wide"
            >
              Premium Collection <MoveRight className="w-4 h-4" />
            </Button>
          </motion.div>

          {/* Text */}
          <div className="mt-7 space-y-4">
            <h3 className="text-[#FFE9B2] text-lg md:text-2xl font-medium tracking-wider drop-shadow">
              {data.subtitle}
            </h3>

            <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight drop-shadow-2xl">
              {data.title}
            </h1>

            <p className="text-gray-200 text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
              {data.description}
            </p>
          </div>

          {/* Buttons */}
          <div className="mt-7 flex flex-col sm:flex-row justify-center gap-4">
            <motion.div whileHover={{ scale: 1.05 }}>
              <Button
                className="gap-2 bg-white text-[#3A2E21] hover:bg-gray-100 px-7 py-4 rounded-xl font-semibold shadow"
                onClick={() => navigate("/contact")}
              >
                Enquire Now <PhoneCall className="w-4 h-4" />
              </Button>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }}>
              <Button
                className="gap-2 bg-[#D4A017] hover:bg-[#b88d15] text-white px-7 py-4 rounded-xl font-semibold shadow-lg"
                onClick={() => navigate("/products")}
              >
                {data.ctaText} <ShoppingCart className="w-4 h-4" />
              </Button>
            </motion.div>
          </div>

          <p className="mt-6 text-gray-300 italic text-sm">
            “Crafted with tradition, presented with elegance”
          </p>
        </div>
      )}

      {/* ===== DOTS ===== */}
      <div className="absolute bottom-14 left-0 right-0 flex justify-center z-40">
        <div className="flex space-x-2">
          {sliderData.map((_, i) => (
            <button
              key={i}
              onClick={() => goToSlide(i)}
              className={`rounded-full transition-all duration-300 ${
                i === currentSlide ? "w-7 h-3 bg-[#D4A017]" : "w-3 h-3 bg-white/50"
              }`}
            />
          ))}
        </div>
      </div>

      {/* ===== ARROWS ===== */}
      <button
        onClick={prevSlide}
        className="absolute left-6 top-1/2 -translate-y-1/2 z-40 bg-black/30 hover:bg-black/55 text-white p-3 rounded-full backdrop-blur-sm"
      >
        <MoveRight className="w-5 h-5 rotate-180" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-6 top-1/2 -translate-y-1/2 z-40 bg-black/30 hover:bg-black/55 text-white p-3 rounded-full backdrop-blur-sm"
      >
        <MoveRight className="w-5 h-5" />
      </button>

    </section>
  );
};

export default CuratedGiftingHero;
