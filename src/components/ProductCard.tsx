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

const ease = [0.16, 1, 0.3, 1]; // premium smooth curve

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

  const discount = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100
      )
    : 0;

  const isOutOfStock =
    product.stock_quantity !== undefined && product.stock_quantity <= 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart({ ...product, image: primaryImage });
  };

  return (
    <motion.div
      className="
        group cursor-pointer bg-white rounded-2xl overflow-hidden 
        shadow-[0_3px_10px_rgba(0,0,0,0.06)]
        hover:shadow-[0_8px_28px_rgba(0,0,0,0.12)]
        transition-all duration-500
        border border-[#f1e9d2]
      "
      whileHover={{ y: -6 }}
      transition={{ duration: 0.45, ease }}
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
          className="w-full h-64 object-cover"
          animate={{ scale: isHovered ? 1.05 : 1 }}
          transition={{ duration: 0.6, ease }}
        />

        {/* Gold badge */}
        {discount > 0 && (
          <motion.div
            className="absolute top-3 left-3 bg-[#BC8649] text-white px-3 py-1 rounded-full text-xs font-semibold shadow-sm"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease }}
          >
            -{discount}%
          </motion.div>
        )}

        {/* Wishlist */}
        <motion.button
          onClick={(e) => {
            e.stopPropagation();
            setIsLiked(!isLiked);
          }}
          className={`absolute top-3 right-3 p-2 rounded-full shadow-sm transition 
            ${isLiked ? "bg-red-500 text-white" : "bg-white text-gray-600 hover:bg-gray-100"}`}
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.9 }}
        >
          <Heart className={`w-4 h-4 ${isLiked ? "fill-current" : ""}`} />
        </motion.button>

        {/* Quick View */}
        {onQuickView && (
          <motion.button
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(product);
            }}
            className="
              absolute bottom-3 left-1/2 -translate-x-1/2 
              opacity-0 group-hover:opacity-100 
              bg-white/95 backdrop-blur px-4 py-1 rounded-full
              shadow-md text-sm transition-all
            "
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.35, ease }}
          >
            <Eye className="w-4 h-4 inline mr-1" />
            Quick View
          </motion.button>
        )}

        {/* Out of Stock Overlay */}
        {isOutOfStock && (
          <motion.div
            className="absolute inset-0 bg-white/85 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="bg-gray-900 text-white px-3 py-1 rounded-full text-sm">
              Out of Stock
            </div>
          </motion.div>
        )}

        {/* Add to Cart */}
        <motion.button
          onClick={handleAddToCart}
          disabled={isOutOfStock}
          className="
            absolute bottom-3 right-3 bg-[#BC8649] text-white p-3 rounded-full
            hover:bg-[#a9773f] shadow-md transition disabled:opacity-40
          "
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Plus className="w-4 h-4" />
        </motion.button>
      </div>

      {/* PRODUCT INFO */}
      <div className="p-4 text-center space-y-3">

        <h3
          className="
            font-semibold text-gray-900 text-base leading-tight line-clamp-2
            group-hover:text-[#BC8649] transition-colors
          "
        >
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

        {/* Price */}
        <div className="space-y-1">
          <div className="flex justify-center items-baseline space-x-2">
            <span className="text-lg font-bold text-gray-900">
              ₹{product.price} <span className="text-xs text-gray-500">Inc. GST</span>
            </span>

            {product.originalPrice && (
              <span className="line-through text-gray-400 text-sm">
                ₹{product.originalPrice}
              </span>
            )}
          </div>

          {discount > 0 && (
            <div className="text-xs text-red-600 font-medium">
              Save ₹{product.originalPrice - product.price}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
