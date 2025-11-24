import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useStore } from "../../../store/useStore";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import {
  ChevronLeft,
  ChevronRight,
  Candy,
  Heart,
  Zap,
  Apple,
  Package,
  Sparkles,
  Star,
  Gift,
} from "lucide-react";

const CategoriesCarousel = () => {
  const { setSelectedCategory } = useStore();
  const navigate = useNavigate();

  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  // Touch / drag
  const [touchStart, setTouchStart] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const { data: categoriesData, error: categoriesError } = await supabase
        .from("categories")
        .select("*")
        .eq("is_active", true);

      if (categoriesError) throw categoriesError;

      const categoriesWithCounts = await Promise.all(
        (categoriesData || []).map(async (category) => {
          const { count } = await supabase
            .from("products")
            .select("*", { count: "exact", head: true })
            .eq("category_id", category.id)
            .eq("is_active", true);

          return {
            ...category,
            productCount: count || 0,
          };
        })
      );

      const sorted = categoriesWithCounts.sort(
        (a, b) => b.productCount - a.productCount
      );

      setCategories(sorted);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    navigate("/products");
  };

  const itemsPerView = window.innerWidth < 768 ? 2 : 4;
  const maxIndex = Math.max(0, categories.length - itemsPerView);

  const nextSlide = () =>
    setCurrentIndex((prev) => Math.min(prev + 1, maxIndex));

  const prevSlide = () =>
    setCurrentIndex((prev) => Math.max(prev - 1, 0));

  // TOUCH + DRAG
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
    setIsDragging(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    setDragOffset(touchStart - e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    if (Math.abs(dragOffset) > 50) {
      dragOffset > 0 ? nextSlide() : prevSlide();
    }
    setDragOffset(0);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setTouchStart(e.clientX);
    setIsDragging(true);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setDragOffset(touchStart - e.clientX);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    if (Math.abs(dragOffset) > 50) {
      dragOffset > 0 ? nextSlide() : prevSlide();
    }
    setDragOffset(0);
  };

  // ICONS
  const getCategoryIcon = (name: string) => {
    const n = name.toLowerCase();
    if (n.includes("traditional")) return Candy;
    if (n.includes("classic")) return Candy;
    if (n.includes("chocolate")) return Heart;
    if (n.includes("fusion")) return Zap;
    if (n.includes("dry") || n.includes("nuts")) return Apple;
    if (n.includes("gift")) return Package;
    if (n.includes("special") || n.includes("festival")) return Gift;
    if (n.includes("mithai")) return Star;
    return Sparkles;
  };

  return (
    <section className="py-16 bg-[#EBEBE8] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* HEADER */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2
            className="text-4xl font-bold text-black"
            style={{ fontFamily: "Merriweather, serif" }}
          >
            Sweet Categories
          </h2>
          <p className="text-[#000000] mt-2 text-lg">
            Explore our delicious categories curated for you.
          </p>
        </motion.div>

        {/* NAV + DOTS */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={prevSlide}
            disabled={currentIndex === 0}
            className={`p-3 rounded-full border border-[#BC8649] transition-all ${
              currentIndex === 0
                ? "opacity-30 cursor-not-allowed"
                : "hover:bg-[#BC8649] hover:text-white"
            }`}
          >
            <ChevronLeft className="w-6 h-6 text-black" />
          </button>

          <div className="flex space-x-2">
            {Array.from({
              length: Math.ceil(categories.length / itemsPerView),
            }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index * itemsPerView)}
                className={`h-2 rounded-full transition-all ${
                  Math.floor(currentIndex / itemsPerView) === index
                    ? "w-8 bg-[#BC8649]"
                    : "w-3 bg-[#DDDECB]"
                }`}
              />
            ))}
          </div>

          <button
            onClick={nextSlide}
            disabled={currentIndex >= maxIndex}
            className={`p-3 rounded-full border border-[#BC8649] transition-all ${
              currentIndex >= maxIndex
                ? "opacity-30 cursor-not-allowed"
                : "hover:bg-[#BC8649] hover:text-white"
            }`}
          >
            <ChevronRight className="w-6 h-6 text-black" />
          </button>
        </div>

        {/* CAROUSEL */}
        <div
          ref={carouselRef}
          className="overflow-hidden"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          <motion.div
            className="flex transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(calc(-${
                currentIndex * (100 / itemsPerView)
              }% - ${dragOffset}px))`,
              cursor: isDragging ? "grabbing" : "grab",
            }}
          >
            {loading
              ? Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="w-1/2 md:w-1/4 px-3 flex-shrink-0">
                    <div className="w-36 h-36 md:w-44 md:h-44 bg-[#DDDECB] rounded-2xl mb-5 animate-pulse"></div>
                    <div className="h-4 bg-[#DDDECB] w-3/4 rounded mx-auto animate-pulse"></div>
                  </div>
                ))
              : categories.map((category) => {
                  const Icon = getCategoryIcon(category.name);
                  return (
                    <div
                      key={category.id}
                      className="w-1/2 md:w-1/4 px-3 flex-shrink-0"
                    >
                      <button
                        className="w-full flex flex-col items-center"
                        onClick={() => handleCategoryClick(category.name)}
                      >
                        <motion.div
                          className="w-36 h-36 md:w-44 md:h-44 rounded-2xl bg-white 
                                     border border-[#DDDECB] shadow-md 
                                     flex items-center justify-center overflow-hidden"
                          whileHover={{ scale: 1.04 }}
                          whileTap={{ scale: 0.97 }}
                        >
                          {category.image_url ? (
                            <img
                              src={category.image_url}
                              alt={category.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <Icon className="w-12 h-12 text-[#BC8649]" />
                          )}
                        </motion.div>

                        <h3
                          className="text-xl md:text-2xl font-semibold mt-3 text-black"
                          style={{ fontFamily: "Merriweather, serif" }}
                        >
                          {category.name}
                        </h3>

                        <p className="text-sm text-[#00000099] mt-1">
                          {category.productCount} items
                        </p>
                      </button>
                    </div>
                  );
                })}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CategoriesCarousel;
