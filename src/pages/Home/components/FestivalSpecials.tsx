import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
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

  const canGoNext = currentIndex < festivalProducts.length - itemsPerView;
  const canGoPrev = currentIndex > 0;

  const handleQuickView = (e: any, product: Product) => {
    e.stopPropagation();
    setQuickViewProduct(product);
    setIsQuickViewOpen(true);
  };

  const closeQuickView = () => {
    setIsQuickViewOpen(false);
    setQuickViewProduct(null);
  };

  const handleAddToCart = (e: any, product: Product) => {
    e.stopPropagation();
    addToCart(product);
  };

  const handleViewDetail = (product: Product) => {
    navigate(`/product/${product.slug}`);
  };

  const getHoverImage = (images: string[] | undefined) => {
    if (images && images.length > 1) return images[1];
    return images?.[0] || '/placeholder.svg';
  };

  if (festivalProducts.length === 0 && !loading) return null;

  return (
    <section className="py-16 bg-[#FAF3E0] relative overflow-hidden">
      {/* Subtle background gradients */}
      <div className="absolute inset-0 opacity-40 pointer-events-none">
        <div className="absolute top-10 right-10 w-64 h-64 bg-white/40 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-white/30 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#3A2E21] font-raleway tracking-tight">
            Festival Specials
          </h2>
          <div className="w-24 h-[3px] bg-[#3A2E21] mx-auto rounded-full mt-3"></div>
        </div>

        {/* Controls */}
        {!loading && festivalProducts.length > itemsPerView && (
          <div className="flex justify-between items-center mb-8">
            <button
              onClick={prevSlide}
              disabled={!canGoPrev}
              className={`p-3 rounded-full border transition-all ${
                canGoPrev
                  ? 'border-[#3A2E21] text-[#3A2E21] hover:bg-[#3A2E21] hover:text-white shadow-sm'
                  : 'border-gray-300 text-gray-400 cursor-not-allowed'
              }`}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button
              onClick={nextSlide}
              disabled={!canGoNext}
              className={`p-3 rounded-full border transition-all ${
                canGoNext
                  ? 'border-[#3A2E21] text-[#3A2E21] hover:bg-[#3A2E21] hover:text-white shadow-sm'
                  : 'border-gray-300 text-gray-400 cursor-not-allowed'
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
                <div
                  key={product.id}
                  className="w-full sm:w-1/2 lg:w-1/4 px-3 flex-shrink-0"
                >
                  <div
                    onClick={() => handleViewDetail(product)}
                    className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all p-4 cursor-pointer"
                  >
                    {/* Image */}
                    <div className="relative h-64 rounded-xl overflow-hidden mb-4">
                      <img
                        src={
                          hoveredProductId === product.id
                            ? getHoverImage(product.images)
                            : product.images?.[0] || '/placeholder.svg'
                        }
                        onMouseEnter={() => setHoveredProductId(product.id)}
                        onMouseLeave={() => setHoveredProductId(null)}
                        className="w-full h-full object-cover transition-all duration-300"
                      />
                    </div>

                    {/* Name */}
                    <h3 className="text-lg font-semibold text-[#3A2E21] line-clamp-2">
                      {product.name}
                    </h3>

                    {/* Price */}
                    <div className="mt-2 mb-4">
                      <span className="text-xl font-bold text-[#3A2E21]">
                        ₹{product.price}
                      </span>
                      {product.originalPrice && (
                        <span className="ml-2 text-gray-500 line-through">
                          ₹{product.originalPrice}
                        </span>
                      )}
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-3">
                      <button
                        onClick={(e) => handleQuickView(e, product)}
                        className="flex-1 bg-[#3A2E21] text-white py-2 rounded-xl hover:bg-opacity-90 transition-all"
                      >
                        Quick View
                      </button>

                      <button
                        onClick={(e) => handleAddToCart(e, product)}
                        className="px-4 bg-[#3A2E21] text-white rounded-xl hover:bg-opacity-90 transition-all"
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

        {/* View All Button */}
        <div className="text-center mt-12">
          <button
            onClick={() => navigate('/products')}
            className="bg-[#3A2E21] text-white px-8 py-3 rounded-full shadow hover:bg-opacity-90 transition-all"
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
