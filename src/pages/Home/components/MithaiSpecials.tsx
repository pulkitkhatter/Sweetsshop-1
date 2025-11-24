/** UPDATED MITHAI SPECIALS — BRAND PASTEL THEME **/
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import ProductCard from "../../../components/ProductCard";
import QuickViewModal from "../../../components/QuickViewModal";
import { supabase } from "@/integrations/supabase/client";
import { useStore } from "@/store/useStore";

interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  images?: string[];
  category: string;
  weight?: string;
  pieces?: string;
  description?: string;
  stock_quantity?: number;
  slug: string;
  inStock: boolean;
  isBestSeller: boolean;
}

const MithaiSpecials = () => {
  const navigate = useNavigate();
  const { addToCart } = useStore();

  const [mithaiProducts, setMithaiProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(4);

  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [lastManualAction, setLastManualAction] = useState(0);

  useEffect(() => {
    fetchProducts();
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (mithaiProducts.length > itemsPerView) {
      const timer = setInterval(() => {
        if (Date.now() - lastManualAction < 10000) return;
        setCurrentIndex((prev) =>
          prev >= mithaiProducts.length - itemsPerView ? 0 : prev + 1
        );
      }, 4500);
      return () => clearInterval(timer);
    }
  }, [mithaiProducts, itemsPerView, lastManualAction]);

  const handleResize = () => {
    if (window.innerWidth < 640) setItemsPerView(1);
    else if (window.innerWidth < 768) setItemsPerView(2);
    else if (window.innerWidth < 1024) setItemsPerView(3);
    else setItemsPerView(4);
  };

  const fetchProducts = async () => {
    try {
      const { data: categoryData } = await supabase
        .from("categories")
        .select("id")
        .ilike("name", "mithai")
        .single();

      if (!categoryData) return setLoading(false);

      const { data: products } = await supabase
        .from("products")
        .select("*")
        .eq("category_id", categoryData.id)
        .eq("is_active", true)
        .order("created_at", { ascending: false })
        .limit(12);

      const formatted =
        products?.map((p: any) => ({
          id: p.id,
          name: p.name,
          price: p.price,
          originalPrice: p.original_price,
          image: p.images?.[0] || "/placeholder.svg",
          images: p.images,
          category: p.category_id,
          weight: p.weight,
          pieces: p.pieces,
          description: p.description,
          stock_quantity: p.stock_quantity,
          slug: p.id,
          inStock: p.stock_quantity > 0,
          isBestSeller: p.is_bestseller,
        })) || [];

      setMithaiProducts(formatted);
    } finally {
      setLoading(false);
    }
  };

  const next = () => {
    if (currentIndex < mithaiProducts.length - itemsPerView) {
      setCurrentIndex(currentIndex + 1);
      setLastManualAction(Date.now());
    }
  };

  const prev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setLastManualAction(Date.now());
    }
  };

  if (!loading && mithaiProducts.length === 0) return null;

  return (
    <section className="py-16 bg-[#E3CBC6] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 relative">

        {/* HEADER */}
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-black font-serif">
            Mithai Specials
          </h2>

          <div className="w-14 h-[3px] bg-[#BC8649] mx-auto my-3 rounded-full"></div>

          <p className="text-black/70 text-sm max-w-lg mx-auto">
            Freshly made traditional sweets — handcrafted with love.
          </p>
        </div>

        {/* CONTROLS */}
        {!loading && mithaiProducts.length > itemsPerView && (
          <div className="flex justify-between mb-6">
            <button
              onClick={prev}
              disabled={currentIndex === 0}
              className={`p-2 rounded-full border transition ${
                currentIndex === 0
                  ? "border-black/20 text-black/20 cursor-not-allowed"
                  : "border-[#BC8649] text-[#BC8649] hover:bg-[#BC8649] hover:text-white shadow"
              }`}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button
              onClick={next}
              disabled={currentIndex >= mithaiProducts.length - itemsPerView}
              className={`p-2 rounded-full border transition ${
                currentIndex >= mithaiProducts.length - itemsPerView
                  ? "border-black/20 text-black/20 cursor-not-allowed"
                  : "border-[#BC8649] text-[#BC8649] hover:bg-[#BC8649] hover:text-white shadow"
              }`}
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* CAROUSEL */}
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-500"
            style={{
              transform: `translateX(-${
                currentIndex * (100 / itemsPerView)
              }%)`,
            }}
          >
            {mithaiProducts.map((product) => (
              <div key={product.id} className="px-2 w-full sm:w-1/2 lg:w-1/4 flex-shrink-0">
                <div
                  onClick={() => navigate(`/product/${product.slug}`)}
                  className="bg-white rounded-2xl border border-[#DDDECB] shadow-md hover:shadow-xl p-4 transition cursor-pointer"
                >
                  {/* Image */}
                  <div className="relative mb-4 rounded-lg overflow-hidden h-56">
                    <img
                      src={
                        hoveredId === product.id
                          ? (product.images?.[1] || product.image)
                          : product.image
                      }
                      onMouseEnter={() => setHoveredId(product.id)}
                      onMouseLeave={() => setHoveredId(null)}
                      className="w-full h-full object-cover transition duration-300"
                    />

                    {product.isBestSeller && (
                      <span className="absolute top-3 left-3 bg-[#BC8649] text-white px-2 py-1 text-xs rounded shadow">
                        Bestseller
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="font-semibold text-black text-base line-clamp-2 mb-1">
                    {product.name}
                  </h3>

                  {/* Price */}
                  <div className="flex items-center space-x-2 mb-3">
                    <span className="text-lg font-bold text-black">
                      ₹{product.price}
                    </span>

                    {product.originalPrice &&
                      product.originalPrice > product.price && (
                        <span className="text-sm line-through text-black/50">
                          ₹{product.originalPrice}
                        </span>
                      )}
                  </div>

                  {/* Buttons */}
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setQuickViewProduct(product);
                        setIsQuickViewOpen(true);
                      }}
                      className="flex-1 bg-[#BC8649] hover:bg-black text-white py-2 rounded-lg text-sm shadow transition"
                    >
                      Quick View
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(product);
                      }}
                      className="p-2 bg-black hover:bg-[#BC8649] hover:text-white text-white rounded-lg shadow transition"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-10">
          <button
            onClick={() => navigate("/products?category=Mithai")}
            className="bg-[#BC8649] hover:bg-black text-white px-8 py-3 rounded-full shadow-lg transition font-semibold tracking-wide"
          >
            Explore All Mithai
          </button>
        </div>
      </div>

      {isQuickViewOpen && quickViewProduct && (
        <QuickViewModal
          product={quickViewProduct}
          isOpen={isQuickViewOpen}
          onClose={() => setIsQuickViewOpen(false)}
        />
      )}
    </section>
  );
};

export default MithaiSpecials;
