import React, { useState } from 'react';
import { ShoppingCart, Star, Heart, Plus, Minus } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  stock: number;
  category: string;
  rating: number;
  unit: string;
  tags?: string[];
  discount?: number;
}

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product, quantity: number) => void;
  onProductClick: (product: Product) => void;
  onToggleWishlist?: (product: Product) => void;
  isInWishlist?: boolean;
}

export function ProductCard({ 
  product, 
  onAddToCart, 
  onProductClick,
  onToggleWishlist,
  isInWishlist = false
}: ProductCardProps) {
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product, quantity);
    setQuantity(1);
  };

  const handleProductClick = () => {
    onProductClick(product);
  };

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleWishlist?.(product);
  };

  const handleQuantityChange = (delta: number) => {
    const newQuantity = Math.max(1, Math.min(product.stock, quantity + delta));
    setQuantity(newQuantity);
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div 
        className="relative h-48 sm:h-56 overflow-hidden bg-gray-100 cursor-pointer"
        onClick={handleProductClick}
      >
        <ImageWithFallback
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
        {onToggleWishlist && (
          <button
            onClick={handleWishlistClick}
            className="absolute top-2 left-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors"
            aria-label="Add to wishlist"
          >
            <Heart 
              className={`w-5 h-5 ${isInWishlist ? 'fill-red-500 text-red-500' : 'text-gray-600'}`}
            />
          </button>
        )}
        {product.discount && (
          <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-xs">
            {product.discount}% OFF
          </div>
        )}
        {product.stock < 10 && !product.discount && (
          <div className="absolute bottom-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-xs">
            Low Stock
          </div>
        )}
        {product.stock < 10 && product.discount && (
          <div className="absolute bottom-2 right-2 bg-orange-500 text-white px-2 py-1 rounded text-xs">
            Low Stock
          </div>
        )}
      </div>
      
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <div className="flex-1">
            <h3 
              className="text-lg mb-1 cursor-pointer hover:text-amber-600 transition-colors"
              onClick={handleProductClick}
            >
              {product.name}
            </h3>
            <div className="flex items-center gap-1 mb-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(product.rating)
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-gray-300'
                  }`}
                />
              ))}
              <span className="text-sm text-gray-600 ml-1">({product.rating})</span>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xl text-amber-700">₹{product.price}</p>
            <p className="text-xs text-gray-500">per {product.unit}</p>
          </div>
        </div>
        
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">{product.description}</p>
        
        <div className="flex items-center gap-2">
          <div className="flex items-center border border-gray-300 rounded-lg">
            <button
              onClick={() => handleQuantityChange(-1)}
              className="p-2 hover:bg-gray-100 transition-colors"
              disabled={quantity <= 1}
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="px-4 min-w-[3rem] text-center">{quantity}</span>
            <button
              onClick={() => handleQuantityChange(1)}
              className="p-2 hover:bg-gray-100 transition-colors"
              disabled={quantity >= product.stock}
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
          
          <button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className="flex-1 bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            <ShoppingCart className="w-4 h-4" />
            Add to Cart
          </button>
        </div>
        
        <p className="text-xs text-gray-500 mt-2">
          {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
        </p>
      </div>
    </div>
  );
}