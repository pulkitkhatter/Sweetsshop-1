import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Candy } from 'lucide-react';
import ProductCard from '../../../components/ProductCard';
import QuickViewModal from '../../../components/QuickViewModal';
import { supabase } from '@/integrations/supabase/client';

interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image?: string;
  images?: string[];
  category: string;
  weight?: string;
  pieces?: string;
  description?: string;
  stock_quantity?: number;
  slug: string;
  inStock: boolean;
  isBestSeller: boolean;
  [key: string]: any;
}

const NewArrivals = () => {
  const navigate = useNavigate();
  const [newArrivals, setNewArrivals] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(4);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);

  // Auto-scroll states
  const [autoScroll] = useState(true);
  const [lastManualAction, setLastManualAction] = useState(0);

  useEffect(() => {
    fetchNewArrivals();
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (newArrivals.length > itemsPerView && autoScroll) {
      const interval = setInterval(() => {
        if (Date.now() - lastManualAction < 10000) return; // Pause auto-scroll
        setCurrentIndex(prev => {
          const maxIndex = newArrivals.length - itemsPerView;
          return prev >= maxIndex ? 0 : prev + 1;
        });
      }, 4500);
      return () => clearInterval(interval);
    }
  }, [newArrivals, itemsPerView, autoScroll, lastManualAction]);

  const handleResize = () => {
    if (window.innerWidth < 640) setItemsPerView(1);
    else if (window.innerWidth < 768) setItemsPerView(2);
    else if (window.innerWidth < 1024) setItemsPerView(3);
    else setItemsPerView(4);
  };

  const fetchNewArrivals = async () => {
    try {
      const result = await supabase
        .from('products')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false })
        .limit(20);

      if (result.error) throw result.error;

      const filteredProducts = (result.data || [])
        .filter((p: any) => p.new_arrival === true)
        .slice(0, 12)
        .map((p: any) => ({
          id: p.id,
          name: p.name,
          price: p.price,
          originalPrice: p.original_price,
          image: p.images?.[0] || '/placeholder.svg',
          images: p.images,
          category: p.category_id || 'Uncategorized',
          weight: p.weight,
          pieces: p.pieces,
          description: p.description,
          stock_quantity: p.stock_quantity,
          slug: p.id,
          inStock: p.stock_quantity ? p.stock_quantity > 0 : true,
          isBestSeller: p.is_bestseller || false,
        }));

      setNewArrivals(filteredProducts);
    } catch (error) {
      console.error('Error fetching new arrivals:', error);
    } finally {
      setLoading(false);
    }
  };

  const nextSlide = () => {
    if (currentIndex < newArrivals.length - itemsPerView) {
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

  const canGoNext = currentIndex < newArrivals.length - itemsPerView;
  const canGoPrev = currentIndex > 0;

  const handleQuickView = (product: Product) => {
    setQuickViewProduct({
      ...product,
      image: product.images?.[0] || "/placeholder.svg",
      slug: product.id,
    });
    setIsQuickViewOpen(true);
  };

  const closeQuickView = () => {
    setIsQuickViewOpen(false);
    setQuickViewProduct(null);
  };

  const handleViewDetail = (product: Product) => {
    navigate(`/product/${product.slug}`);
  };

  if (newArrivals.length === 0 && !loading) return null;

  return (
    <section className="py-8 bg-[#F8F5F0] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 relative">

        {/* HEADER */}
        <div className="text-center mb-6">
          <h2 className="text-2xl md:text-3xl font-extrabold text-[#2C1810] font-serif tracking-tight">
            New Arrivals
          </h2>
          <div className="w-12 h-[3px] bg-[#A67C58] mx-auto mt-2 rounded-full"></div>
          <p className="text-gray-600 text-xs sm:text-sm mt-2 max-w-xl mx-auto">
            Fresh sweets just added to our collection. Taste what’s new today.
          </p>
        </div>

        {/* CONTROLS */}
        {!loading && newArrivals.length > itemsPerView && (
          <div className="flex justify-between mb-4">
            <button
              onClick={prevSlide}
              disabled={!canGoPrev}
              className={`p-2 rounded-full border transition ${
                canGoPrev
                  ? "border-[#A67C58] text-[#A67C58] hover:bg-[#A67C58] hover:text-white shadow"
                  : "border-gray-300 text-gray-300 cursor-not-allowed"
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <button
              onClick={nextSlide}
              disabled={!canGoNext}
              className={`p-2 rounded-full border transition ${
                canGoNext
                  ? "border-[#A67C58] text-[#A67C58] hover:bg-[#A67C58] hover:text-white shadow"
                  : "border-gray-300 text-gray-300 cursor-not-allowed"
              }`}
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* CAROUSEL */}
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-500"
            style={{ transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)` }}
          >
            {newArrivals.map((product) => (
              <div key={product.id} className="px-1.5 w-full sm:w-1/2 lg:w-1/4 flex-shrink-0">
                <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition p-3">
                  <ProductCard
                    product={product}
                    onQuickView={() => handleQuickView(product)}
                    onViewDetail={() => handleViewDetail(product)}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-8">
          <button
            onClick={() => navigate('/products')}
            className="bg-[#2C1810] hover:bg-[#4A2C20] text-white px-6 py-2.5 rounded-full shadow transition text-sm font-semibold"
          >
            Explore All New Products
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

export default NewArrivals;
