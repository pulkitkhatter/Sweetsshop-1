/** UPDATED FESTIVAL SPECIALS — BRAND PASTEL THEME **/
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import QuickViewModal from '../../../components/QuickViewModal';
import { useStore } from '@/store/useStore';

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

const FestivalSpecials = () => {
  const navigate = useNavigate();
  const { addToCart } = useStore();

  const [festivalProducts, setFestivalProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(4);

  const [hoveredProductId, setHoveredProductId] = useState<string | null>(null);

  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);

  useEffect(() => {
    fetchFestivalProducts();
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleResize = () => {
    if (window.innerWidth < 640) setItemsPerView(1);
    else if (window.innerWidth < 768) setItemsPerView(2);
    else if (window.innerWidth < 1024) setItemsPerView(3);
    else setItemsPerView(4);
  };

  const fetchFestivalProducts = async () => {
    try {
      let { data: categoryData } = await supabase
        .from('categories')
        .select('id')
        .ilike('name', '%festival%')
        .single();

      if (!categoryData) {
        const fallback = await supabase
          .from('categories')
          .select('id')
          .ilike('name', '%special%')
          .single();
        categoryData = fallback.data;
      }

      if (!categoryData) return setLoading(false);

      const { data } = await supabase
        .from('products')
        .select('*')
        .eq('category_id', categoryData.id)
        .eq('is_active', true)
        .order('created_at', { ascending: false })
        .limit(12);

      const cleaned = (data || []).map((p: any) => ({
        id: p.id,
        name: p.name,
        price: p.price,
        originalPrice: p.original_price,
        image: p.images?.[0] || '/placeholder.svg',
        images: p.images,
        category: p.category_id,
        weight: p.weight,
        pieces: p.pieces,
        description: p.description,
        stock_quantity: p.stock_quantity,
        slug: p.id,
        inStock: p.stock_quantity > 0,
        isBestSeller: p.is_bestseller || false,
      }));

      setFestivalProducts(cleaned);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const nextSlide = () => {
    if (currentIndex < festivalProducts.length - itemsPerView) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const getHoverImage = (images?: string[]) => {
    if (images && images.length > 1) return images[1];
    return images?.[0] || '/placeholder.svg';
  };

  if (!loading && festivalProducts.length === 0) return null;

  return (
    <section className="py-16 bg-[#EBEBE8] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 relative z-10">

        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-bold text-black font-serif">
            Festival Specials
          </h2>
          <div className="w-20 h-[3px] bg-[#BC8649] mx-auto mt-3 rounded-full"></div>
        </div>

        {/* Controls */}
        {!loading && festivalProducts.length > itemsPerView && (
          <div className="flex justify-between items-center mb-6">
            <button
              onClick={prevSlide}
              disabled={currentIndex === 0}
              className={`p-3 rounded-full border transition-all ${
                currentIndex === 0
                  ? "border-black/20 text-black/20 cursor-not-allowed"
                  : "border-[#BC8649] text-[#BC8649] hover:bg-[#BC8649] hover:text-white shadow"
              }`}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button
              onClick={nextSlide}
              disabled={currentIndex >= festivalProducts.length - itemsPerView}
              className={`p-3 rounded-full border transition-all ${
                currentIndex >= festivalProducts.length - itemsPerView
                  ? "border-black/20 text-black/20 cursor-not-allowed"
                  : "border-[#BC8649] text-[#BC8649] hover:bg-[#BC8649] hover:text-white shadow"
              }`}
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Carousel */}
        <div className="overflow-hidden">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-white h-72 rounded-xl shadow animate-pulse"></div>
              ))}
            </div>
          ) : (
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`,
              }}
            >
              {festivalProducts.map((product) => (
                <div key={product.id} className="w-full sm:w-1/2 lg:w-1/4 px-3 flex-shrink-0">
                  <div
                    onClick={() => navigate(`/product/${product.slug}`)}
                    className="bg-white border border-[#DDDECB] rounded-xl shadow-md hover:shadow-xl transition-all p-4 cursor-pointer"
                  >
                    {/* Image */}
                    <div className="relative h-64 rounded-xl overflow-hidden mb-4">
                      <img
                        src={
                          hoveredProductId === product.id
                            ? getHoverImage(product.images)
                            : product.image
                        }
                        onMouseEnter={() => setHoveredProductId(product.id)}
                        onMouseLeave={() => setHoveredProductId(null)}
                        className="w-full h-full object-cover transition-all duration-300"
                      />
                    </div>

                    {/* Name */}
                    <h3 className="text-lg font-semibold text-black line-clamp-2">
                      {product.name}
                    </h3>

                    {/* Price */}
                    <div className="mt-2 mb-4">
                      <span className="text-xl font-bold text-black">
                        ₹{product.price}
                      </span>
                      {product.originalPrice && (
                        <span className="ml-2 text-black/50 line-through">
                          ₹{product.originalPrice}
                        </span>
                      )}
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-3">
                      <button
                        onClick={(e) => handleQuickView(e, product)}
                        className="flex-1 bg-[#BC8649] hover:bg-black text-white py-2 rounded-lg transition"
                      >
                        Quick View
                      </button>
                      <button
                        onClick={(e) => handleAddToCart(e, product)}
                        className="px-4 bg-black hover:bg-[#BC8649] text-white rounded-lg transition"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* CTA */}
        <div className="text-center mt-10">
          <button
            onClick={() => navigate('/products')}
            className="bg-[#BC8649] hover:bg-black text-white px-8 py-3 rounded-full shadow-lg transition font-semibold tracking-wide"
          >
            View All Festival Specials
          </button>
        </div>
      </div>

      {/* QuickView */}
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

export default FestivalSpecials;
