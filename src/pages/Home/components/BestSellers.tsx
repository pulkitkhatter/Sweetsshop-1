/** SAME LOGIC — ONLY VISUAL ENHANCEMENT **/

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight, Candy } from "lucide-react";
import ProductCard from "../../../components/ProductCard";
import QuickViewModal from "../../../components/QuickViewModal";
import { supabase } from "@/integrations/supabase/client";

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
    const slug = product.sku || product.id;
    navigate(`/product/${slug}`);
  };

  return (
    <section className="pt-20 pb-14 bg-[#FAF3E0] relative overflow-hidden">

      {/* Divider from Categories */}
      <div className="absolute top-0 left-0 w-full h-12 bg-gradient-to-b from-[#FFF9EF] to-[#FAF3E0]"></div>

      {/* Heading */}
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold text-[#3A2E21]">
          Best Sellers
        </h2>
        <div className="w-14 h-[3px] bg-[#D4A017] mx-auto mt-2 rounded-full"></div>
        <p className="text-gray-600 text-sm md:text-base mt-3">
          Our most-loved sweets, trusted by thousands.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 relative">

        {!loading && bestSellers.length > itemsPerView && (
          <div className="flex justify-between mb-8">
            <button
              onClick={prevSlide}
              disabled={!canGoPrev}
              className={`p-3 rounded-full border transition ${
                canGoPrev
                  ? "border-[#D4A017] text-[#D4A017] hover:bg-[#D4A017] hover:text-white shadow-md"
                  : "border-gray-300 text-gray-300 cursor-not-allowed"
              }`}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button
              onClick={nextSlide}
              disabled={!canGoNext}
              className={`p-3 rounded-full border transition ${
                canGoNext
                  ? "border-[#D4A017] text-[#D4A017] hover:bg-[#D4A017] hover:text-white shadow-md"
                  : "border-gray-300 text-gray-300 cursor-not-allowed"
              }`}
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}

        <div className="overflow-hidden">
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
              {bestSellers.map((product) => (
                <div
                  key={product.id}
                  className="px-3 w-full sm:w-1/2 lg:w-1/4 flex-shrink-0"
                >
                  <div className="bg-white rounded-2xl shadow-[0_6px_22px_rgba(0,0,0,0.08)] hover:shadow-[0_10px_30px_rgba(0,0,0,0.14)] p-5 h-[380px] transition-all hover:-translate-y-1 hover:scale-[1.02] cursor-pointer">
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
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <Candy className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No bestsellers available</p>
            </div>
          )}
        </div>

        <div className="text-center mt-12">
          <button
            onClick={() => navigate("/products")}
            className="bg-[#D4A017] hover:bg-[#bb8d14] text-white px-8 py-3 rounded-full shadow-lg transition font-semibold"
          >
            View All Sweets
          </button>
        </div>
      </div>

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
