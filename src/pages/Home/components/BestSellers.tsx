/** UPDATED BEST SELLERS WITH MOTION **/
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight, Candy } from "lucide-react";
import { motion } from "framer-motion";  // ← added
import ProductCard from "../../../components/ProductCard";
import QuickViewModal from "../../../components/QuickViewModal";
import { supabase } from "@/integrations/supabase/client";

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

const staggerContainer = {
  show: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const itemFade = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45 } },
};

const BestSellers = () => {
  const navigate = useNavigate();

  const [bestSellers, setBestSellers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(4);

  const [quickViewProduct, setQuickViewProduct] = useState<any | null>(null);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);

  const [lastManualAction, setLastManualAction] = useState(0);

  useEffect(() => {
    fetchBestSellers();
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (bestSellers.length > itemsPerView) {
      const interval = setInterval(() => {
        if (Date.now() - lastManualAction < 10000) return;
        setCurrentIndex((prev) =>
          prev >= bestSellers.length - itemsPerView ? 0 : prev + 1
        );
      }, 4500);

      return () => clearInterval(interval);
    }
  }, [bestSellers, itemsPerView, lastManualAction]);

  const fetchBestSellers = async () => {
    try {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("is_bestseller", true)
        .eq("is_active", true)
        .limit(12);

      if (error) throw error;
      setBestSellers(data || []);
    } catch (err) {
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleResize = () => {
    if (window.innerWidth < 640) setItemsPerView(1);
    else if (window.innerWidth < 768) setItemsPerView(2);
    else if (window.innerWidth < 1024) setItemsPerView(3);
    else setItemsPerView(4);
  };

  const nextSlide = () => {
    if (currentIndex < bestSellers.length - itemsPerView) {
      setCurrentIndex(currentIndex + 1);
      setLastManualAction(Date.now());
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setLastManualAction(Date.now());
    }
  };

  const canGoNext = currentIndex < bestSellers.length - itemsPerView;
  const canGoPrev = currentIndex > 0;

  const handleQuickView = (product: any) => {
    setQuickViewProduct({
      ...product,
      image: product.images?.[0] || "/placeholder.svg",
      slug: product.sku || product.id,
    });
    setIsQuickViewOpen(true);
  };

  const closeQuickView = () => {
    setIsQuickViewOpen(false);
    setQuickViewProduct(null);
  };

  const handleViewDetail = (product: any) => {
    navigate(`/product/${product.sku || product.id}`);
  };

  return (
    <section className="pt-20 pb-14 bg-[#151515] relative overflow-hidden">

      {/* Fade Divider */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="absolute top-0 left-0 w-full h-10 bg-gradient-to-b from-[#FFDCDB] to-[#DDDECB]"
      />

      {/* Heading */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="text-center mb-10"
      >
        <h2
          className="text-3xl md:text-4xl font-bold text-white"
          style={{ fontFamily: "Merriweather, serif" }}
        >
          Best Sellers
        </h2>

        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: "3.5rem" }}
          transition={{ duration: 0.5 }}
          className="h-[3px] bg-[#EBEBE8] mx-auto mt-2 rounded-full"
        />

        <p className="text-white/70 text-sm md:text-base mt-3">
          Our most-loved sweets, trusted by thousands.
        </p>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 relative">

        {/* Arrow Buttons */}
        {!loading && bestSellers.length > itemsPerView && (
          <motion.div
            className="flex justify-between mb-8"
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
          >
            <button
              onClick={prevSlide}
              disabled={!canGoPrev}
              className={`p-3 rounded-full border transition ${
                canGoPrev
                  ? "border-[#EBEBE8] text-[#EBEBE8] hover:bg-[#EBEBE8] hover:text-black shadow"
                  : "border-black/20 text-black/20 cursor-not-allowed"
              }`}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button
              onClick={nextSlide}
              disabled={!canGoNext}
              className={`p-3 rounded-full border transition ${
                canGoNext
                  ? "border-[#EBEBE8] text-[#EBEBE8] hover:bg-[#EBEBE8] hover:text-black shadow"
                  : "border-black/20 text-black/20 cursor-not-allowed"
              }`}
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </motion.div>
        )}

        {/* Carousel */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="overflow-hidden"
        >
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="h-72 bg-white rounded-2xl shadow animate-pulse" />
              ))}
            </div>
          ) : bestSellers.length > 0 ? (
            <div
              className="flex transition-transform duration-500"
              style={{
                transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`,
              }}
            >
              {bestSellers.map((product, idx) => (
                <motion.div
                  variants={itemFade}
                  key={product.id}
                  className="px-3 w-full sm:w-1/2 lg:w-1/4 flex-shrink-0"
                >
                  <div className="bg-white rounded-2xl border border-[#CAE2B8] 
                                  shadow-[0_6px_22px_rgba(0,0,0,0.06)]
                                  hover:shadow-[0_10px_30px_rgba(0,0,0,0.12)]
                                  p-5 h-[380px] transition-all hover:-translate-y-1 hover:scale-[1.02] cursor-pointer">
                    <ProductCard
                      product={{
                        ...product,
                        image: product.images?.[0] || "/placeholder.svg",
                        slug: product.sku || product.id,
                      }}
                      onQuickView={() => handleQuickView(product)}
                      onViewDetail={() => handleViewDetail(product)}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div
              className="text-center py-16"
              variants={fadeUp}
            >
              <Candy className="w-16 h-16 text-black/20 mx-auto mb-4" />
              <p className="text-black/60">No bestsellers available</p>
            </motion.div>
          )}
        </motion.div>

        {/* View All Button */}
        <motion.div
          className="text-center mt-12"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
        >
          <motion.button
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.04 }}
            onClick={() => navigate("/products")}
            className="bg-[#EBEBE8] hover:bg-white text-black px-8 py-4 rounded-full 
                       shadow-lg transition font-semibold tracking-wide"
          >
            View All Sweets
          </motion.button>
        </motion.div>
      </div>

      {/* Quick View */}
      {isQuickViewOpen && quickViewProduct && (
        <QuickViewModal
          product={quickViewProduct}
          isOpen={isQuickViewOpen}
          onClose={closeQuickView}
        />
      )}
    </section>
  );
};

export default BestSellers;
