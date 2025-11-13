import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  ChevronLeft,
  ChevronRight,
  Candy,
  Plus,
  Sparkles,
} from "lucide-react";
import ProductCard from "../../../components/ProductCard";
import QuickViewModal from "../../../components/QuickViewModal";
import { supabase } from "@/integrations/supabase/client";
import { useStore } from "@/store/useStore";

// Product Interface
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

  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(
    null
  );
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);

  // Hover state
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  // Auto-scroll
  const [lastManualAction, setLastManualAction] = useState(0);

  useEffect(() => {
    fetchProducts();
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (mithaiProducts.length > itemsPerView) {
      const interval = setInterval(() => {
        if (Date.now() - lastManualAction < 10000) return;

        setCurrentIndex((prev) =>
          prev >= mithaiProducts.length - itemsPerView ? 0 : prev + 1
        );
      }, 4500);

      return () => clearInterval(interval);
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

      if (!categoryData) {
        setLoading(false);
        return;
      }

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
    } catch (err) {
      console.error(err);
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

  const canGoNext = currentIndex < mithaiProducts.length - itemsPerView;
  const canGoPrev = currentIndex > 0;

  const handleQuickView = (e: any, product: Product) => {
    e.stopPropagation();
    setQuickViewProduct(product);
    setIsQuickViewOpen(true);
  };

  const handleAdd = (e: any, product: Product) => {
    e.stopPropagation();
    addToCart(product);
  };

  const handleView = (product: Product) => {
    navigate(`/product/${product.slug}`);
  };

  const getHoverImage = (imgs: string[] | undefined) => {
    return imgs && imgs.length > 1 ? imgs[1] : imgs?.[0] || "/placeholder.svg";
  };

  if (!loading && mithaiProducts.length === 0) return null;

  return (
    <section className="py-10 bg-[#F7F4EF] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 relative">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#2C1A12] font-serif tracking-tight">
            Mithai Specials
          </h2>
          <div className="w-14 h-1 bg-[#A97C50] mx-auto my-3 rounded-full"></div>
          <p className="text-sm text-gray-600 max-w-lg mx-auto">
            Freshly made traditional sweets — handcrafted with love.
          </p>
        </div>

        {/* Controls */}
        {!loading && mithaiProducts.length > itemsPerView && (
          <div className="flex justify-between mb-6">
            <button
              onClick={prev}
              disabled={!canGoPrev}
              className={`p-2 rounded-full border transition ${
                canGoPrev
                  ? "border-[#A97C50] text-[#A97C50] hover:bg-[#A97C50] hover:text-white shadow"
                  : "border-gray-300 text-gray-300 cursor-not-allowed"
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <button
              onClick={next}
              disabled={!canGoNext}
              className={`p-2 rounded-full border transition ${
                canGoNext
                  ? "border-[#A97C50] text-[#A97C50] hover:bg-[#A97C50] hover:text-white shadow"
                  : "border-gray-300 text-gray-300 cursor-not-allowed"
              }`}
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Carousel */}
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
              <div
                key={product.id}
                className="px-1.5 w-full sm:w-1/2 lg:w-1/4 flex-shrink-0"
              >
                <div
                  className="bg-white rounded-xl shadow-md hover:shadow-xl transition p-3 cursor-pointer"
                  onClick={() => handleView(product)}
                >
                  {/* Image */}
                  <div className="relative mb-4 rounded-lg overflow-hidden h-56">
                    <img
                      src={
                        hoveredId === product.id
                          ? getHoverImage(product.images)
                          : product.image
                      }
                      onMouseEnter={() => setHoveredId(product.id)}
                      onMouseLeave={() => setHoveredId(null)}
                      className="w-full h-full object-cover transition duration-300"
                    />

                    {product.isBestSeller && (
                      <span className="absolute top-3 left-3 bg-[#A97C50] text-white px-2 py-1 text-xs rounded shadow">
                        Bestseller
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="font-semibold text-[#2C1A12] text-base line-clamp-2 mb-1">
                    {product.name}
                  </h3>

                  {/* Price */}
                  <div className="flex items-center space-x-2 mb-3">
                    <span className="text-lg font-bold text-[#2C1A12]">
                      ₹{product.price}
                    </span>

                    {product.originalPrice &&
                      product.originalPrice > product.price && (
                        <span className="text-sm line-through text-gray-400">
                          ₹{product.originalPrice}
                        </span>
                      )}
                  </div>

                  {/* Buttons */}
                  <div className="flex items-center space-x-2">
                    <button
                      className="flex-1 bg-[#A97C50] hover:bg-[#8A643B] text-white py-2 rounded-lg text-sm shadow transition"
                      onClick={(e) => handleQuickView(e, product)}
                    >
                      Quick View
                    </button>

                    <button
                      className="p-2 bg-[#2C1A12] hover:bg-[#40261A] text-white rounded-lg shadow transition"
                      onClick={(e) => handleAdd(e, product)}
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
        <div className="text-center mt-8">
          <button
            onClick={() => navigate("/products?category=Mithai")}
            className="bg-[#2C1A12] hover:bg-[#4A2C20] text-white px-6 py-3 rounded-full shadow-md transition font-medium"
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
