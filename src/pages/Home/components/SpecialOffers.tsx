import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  ChevronLeft,
  ChevronRight,
  Tag,
  Copy,
  Clock,
  ArrowRight,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import heroImage from "@/assets/hero.png";

const SpecialOffers = () => {
  const navigate = useNavigate();
  const [coupons, setCoupons] = useState([]);
  const [currentCouponIndex, setCurrentCouponIndex] = useState(0);

  useEffect(() => {
    fetchCoupons();
  }, []);

  // Auto rotate
  useEffect(() => {
    if (coupons.length > 1) {
      const interval = setInterval(() => {
        setCurrentCouponIndex((prev) => (prev + 1) % coupons.length);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [coupons.length]);

  const fetchCoupons = async () => {
    try {
      const { data, error } = await supabase
        .from("coupons")
        .select("*")
        .eq("is_active", true)
        .gte("valid_until", new Date().toISOString())
        .order("created_at", { ascending: false })
        .limit(5);

      if (error) throw error;
      setCoupons(data || []);
    } catch (error) {
      console.error("Error fetching coupons:", error);
    }
  };

  const nextCoupon = () => {
    setCurrentCouponIndex((prev) => (prev + 1) % coupons.length);
  };

  const prevCoupon = () => {
    setCurrentCouponIndex((prev) => (prev - 1 + coupons.length) % coupons.length);
  };

  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code);
  };

  return (
    <section className="py-20 bg-[#000000] relative overflow-hidden">

      {/* Luxury gold vignette background */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-black via-black/90 to-black"></div>
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(188,134,73,0.10)_0%,transparent_70%)]"></div>

      {/* Floating gold sparkles */}
      <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-[600px] h-[600px] opacity-20 rounded-full blur-[120px] bg-[#BC8649]"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">

        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white font-serif tracking-wide">
            Special <span className="text-[#BC8649]">Sweet Deals</span>
          </h2>
          <p className="text-gray-200/80 mt-3 max-w-xl mx-auto text-base">
            Unlock exclusive discounts curated just for your sweet cravings.
          </p>
        </motion.div>

        {/* Banner */}
        <motion.div
          className="relative rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-[#BC8649]/30"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65 }}
        >
          {/* Banner background */}
          <div className="absolute inset-0">
            <img
              src={heroImage}
              alt="sweet background"
              className="w-full h-full object-cover brightness-90"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-black/20"></div>
          </div>

          <div className="relative z-20 p-10 md:p-14 text-center">

            {/* Coupon Section */}
            {coupons.length > 0 ? (
              <div className="mb-10">

                <div className="flex items-center justify-center gap-5 mb-6">

                  {/* Prev Btn */}
                  {coupons.length > 1 && (
                    <button
                      onClick={prevCoupon}
                      className="p-3 rounded-full bg-white/10 text-white border border-white/20 hover:bg-white/20 transition shadow"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                  )}

                  {/* Coupon Card */}
                  <motion.div
                    key={currentCouponIndex}
                    className="bg-white/20 backdrop-blur-xl px-10 py-8 rounded-2xl shadow-[0_15px_35px_rgba(0,0,0,0.4)] min-w-80 border border-[#BC8649]/40"
                    initial={{ opacity: 0, x: 25 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.35 }}
                  >
                    <div className="flex items-center justify-center gap-2 mb-3">
                      <Tag className="w-6 h-6 text-[#BC8649]" />
                      <span className="text-3xl font-bold text-white font-serif tracking-wide">
                        {coupons[currentCouponIndex].code}
                      </span>
                      <button onClick={() => {
                        copyToClipboard(coupons[currentCouponIndex].code);
                      }}>
                        <Copy className="w-5 h-5 text-white/80 hover:text-[#BC8649]" />
                      </button>
                    </div>

                    <p className="text-gray-200 text-sm mb-3">
                      {coupons[currentCouponIndex].description}
                    </p>

                    <div className="text-gray-300 text-xs flex items-center justify-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>
                        Valid until{" "}
                        {new Date(
                          coupons[currentCouponIndex].valid_until
                        ).toLocaleDateString()}
                      </span>
                    </div>
                  </motion.div>

                  {/* Next Btn */}
                  {coupons.length > 1 && (
                    <button
                      onClick={nextCoupon}
                      className="p-3 rounded-full bg-white/10 text-white border border-white/20 hover:bg-white/20 transition shadow"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  )}
                </div>

                {/* Indicators */}
                <div className="flex justify-center gap-2">
                  {coupons.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentCouponIndex(index)}
                      className={`w-3 h-3 rounded-full transition ${
                        index === currentCouponIndex
                          ? "bg-[#BC8649]"
                          : "bg-white/40"
                      }`}
                    ></button>
                  ))}
                </div>
              </div>
            ) : (
              <p className="text-white text-xl font-serif mb-8">
                Exclusive sweet offers are on the way!
              </p>
            )}

            {/* CTA Button */}
            <button
              onClick={() => navigate("/products")}
              className="bg-[#BC8649] px-10 py-4 rounded-full shadow-lg text-white 
                         hover:bg-[#a6753c] transition font-semibold flex items-center justify-center mx-auto"
            >
              Shop Now
              <ArrowRight className="w-5 h-5 ml-2" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SpecialOffers;
