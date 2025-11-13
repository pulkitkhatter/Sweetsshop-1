import React, { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Star, Eye, Heart } from "lucide-react";
import { useStore } from "../store/useStore";
import { formatPrice } from "../utils/currency";

interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image?: string;
  images?: string[];
  weight?: string;
  pieces?: string;
  rating?: number;
  stock_quantity?: number;
  isBestSeller?: boolean;
  features?: string[];
  [key: string]: any;
}

interface ProductCardProps {
  product: Product;
  onViewDetail?: () => void;
  onQuickView?: (product?: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onViewDetail,
  onQuickView,
}) => {
  const addToCart = useStore((state) => state.addToCart);
  const [isHovered, setIsHovered] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const primaryImage = product.images?.[0] || product.image || "/placeholder.svg";
  const hoverImage =
    product.images && product.images.length > 1
      ? product.images[1]
      : primaryImage;
  const displayImage = isHovered ? hoverImage : primaryImage;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart({
      ...product,
      image: primaryImage,
    });
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.stopPropagation();
    onQuickView?.(product);
  };

  const discount = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100
      )
    : 0;

  const isOutOfStock =
    product.stock_quantity !== undefined && product.stock_quantity <= 0;

  const formatPriceWithGST = (price: number) => {
    return `${formatPrice(price)} Inc. GST`;
  };

  return (
    <motion.div
      className="group cursor-pointer bg-white rounded-2xl overflow-hidden shadow-[0_4px_14px_rgba(0,0,0,0.08)] hover:shadow-[0_8px_22px_rgba(0,0,0,0.12)] transition-all duration-300"
      whileHover={{ y: -8 }}
      onClick={onViewDetail}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      layout
    >
      {/* IMAGE AREA */}
      <div className="relative bg-[#faf6ef] overflow-hidden">
        <motion.img
          src={displayImage}
          alt={product.name}
          className="w-full h-64 object-cover transition-all duration-700"
          animate={{ scale: isHovered ? 1.06 : 1 }}
        />

        {/* GOLD FLOAT LABELS */}
        <div className="absolute top-3 left-3 flex gap-2">
          {discount > 0 && (
            <motion.div
              className="bg-[#D4A017] text-white px-3 py-1 rounded-full text-xs font-semibold shadow-sm"
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              -{discount}%
            </motion.div>
          )}
        </div>

        {/* LIKE BUTTON */}
        <motion.button
          onClick={(e) => {
            e.stopPropagation();
            setIsLiked(!isLiked);
          }}
          className={`absolute top-3 right-3 p-2 rounded-full shadow-sm transition ${
            isLiked
              ? "bg-red-500 text-white"
              : "bg-white text-gray-600 hover:bg-gray-100"
          }`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Heart className={`w-4 h-4 ${isLiked ? "fill-current" : ""}`} />
        </motion.button>

        {/* QUICK VIEW */}
        {onQuickView && (
          <motion.button
            onClick={handleQuickView}
            className="absolute bottom-3 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 bg-white text-gray-800 px-4 py-1 rounded-full shadow-md text-sm transition-all"
            whileHover={{ scale: 1.05 }}
          >
            <Eye className="w-4 h-4 inline mr-1" />
            Quick View
          </motion.button>
        )}

        {/* OUT OF STOCK */}
        {isOutOfStock && (
          <div className="absolute inset-0 bg-white/90 flex items-center justify-center">
            <div className="bg-gray-900 text-white px-3 py-1 rounded-full text-sm font-medium">
              Out of Stock
            </div>
          </div>
        )}

        {/* ADD TO CART FAB */}
        <motion.button
          onClick={handleAddToCart}
          disabled={isOutOfStock}
          className="absolute bottom-3 right-3 bg-[#D4A017] hover:bg-[#bb8d14] text-white p-3 rounded-full shadow-md transition disabled:opacity-40"
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.9 }}
        >
          <Plus className="w-4 h-4" />
        </motion.button>
      </div>

      {/* PRODUCT INFO */}
      <div className="p-4 text-center space-y-3">
        <h3 className="font-semibold text-gray-900 group-hover:text-[#D4A017] transition-colors text-base leading-tight line-clamp-2">
          {product.name}
        </h3>

        {/* Rating */}
        {product.rating && (
          <div className="flex justify-center space-x-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-3 h-3 ${
                  i < Math.floor(product.rating)
                    ? "text-yellow-400 fill-yellow-400"
                    : "text-gray-300"
                }`}
              />
            ))}
            <span className="text-xs text-gray-500">({product.rating})</span>
          </div>
        )}

        {/* PRICES */}
        <div>
          <div className="flex justify-center items-baseline space-x-2">
            <span className="text-lg font-bold text-gray-900">
              {formatPriceWithGST(product.price)}
            </span>

            {product.originalPrice && (
              <span className="line-through text-gray-400 text-sm">
                {formatPriceWithGST(product.originalPrice)}
              </span>
            )}
          </div>

          {discount > 0 && (
            <div className="text-xs text-red-600 font-medium">
              Save {formatPrice(product.originalPrice - product.price)}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
