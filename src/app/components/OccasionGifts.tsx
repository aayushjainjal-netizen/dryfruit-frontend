import React from 'react';
import { X, ShoppingCart, Gift, Sparkles } from 'lucide-react';
import { Product } from './ProductCard';
import { Occasion } from './OccasionSelector';

interface GiftSet {
  id: string;
  name: string;
  description: string;
  products: Product[];
  price: number;
  originalPrice: number;
  image: string;
  popular?: boolean;
}

interface OccasionGiftsProps {
  occasion: Occasion;
  products: Product[];
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
  onProductClick: (product: Product) => void;
}

export function OccasionGifts({ occasion, products, onClose, onAddToCart, onProductClick }: OccasionGiftsProps) {
  const Icon = occasion.icon;

  // Create curated gift sets for this occasion
  const giftSets: GiftSet[] = [
    {
      id: `${occasion.id}-premium`,
      name: `Premium ${occasion.name} Collection`,
      description: 'Our finest selection of premium nuts and dried fruits',
      products: products.filter(p => p.tags?.includes('premium')).slice(0, 4),
      price: 79.99,
      originalPrice: 95.99,
      image: products.find(p => p.tags?.includes('premium'))?.image || '',
      popular: true,
    },
    {
      id: `${occasion.id}-deluxe`,
      name: `Deluxe ${occasion.name} Hamper`,
      description: 'A delightful mix of bestsellers and seasonal favorites',
      products: products.filter(p => p.tags?.includes('bestseller')).slice(0, 3),
      price: 59.99,
      originalPrice: 72.99,
      image: products.find(p => p.tags?.includes('bestseller'))?.image || '',
      popular: true,
    },
    {
      id: `${occasion.id}-classic`,
      name: `Classic ${occasion.name} Box`,
      description: 'Traditional favorites that everyone loves',
      products: products.slice(0, 3),
      price: 39.99,
      originalPrice: 48.99,
      image: products[0]?.image || '',
    },
  ];

  const occasionProducts = products.slice(0, 8);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className={`sticky top-0 bg-gradient-to-r ${occasion.gradient} text-white p-6 rounded-t-2xl shadow-lg z-10`}>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-white/20 hover:bg-white/30 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
              <Icon className="w-8 h-8" />
            </div>
            <div>
              <h2 className="text-3xl mb-1">{occasion.name} Gifts</h2>
              <p className="text-white/90">{occasion.description}</p>
            </div>
          </div>

          <div className="bg-white/20 rounded-lg p-4">
            <p className="text-sm mb-2">✨ Special Features:</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
              <div className="flex items-center gap-1">
                <Gift className="w-4 h-4" />
                <span>Premium Packaging</span>
              </div>
              <div className="flex items-center gap-1">
                <Sparkles className="w-4 h-4" />
                <span>Personalized Cards</span>
              </div>
              <div className="flex items-center gap-1">
                <ShoppingCart className="w-4 h-4" />
                <span>Free Delivery</span>
              </div>
              <div className="flex items-center gap-1">
                <Gift className="w-4 h-4" />
                <span>Gift Wrapping</span>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-8">
          {/* Curated Gift Sets */}
          <div>
            <h3 className="text-2xl mb-4">Curated Gift Sets</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {giftSets.map((set) => (
                <div
                  key={set.id}
                  className="border-2 border-gray-200 rounded-xl overflow-hidden hover:border-amber-400 hover:shadow-xl transition-all group"
                >
                  {set.popular && (
                    <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white text-center py-2 text-sm">
                      🌟 Most Popular
                    </div>
                  )}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={set.image}
                      alt={set.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded-full text-sm">
                      Save ₹{(set.originalPrice - set.price).toFixed(2)}
                    </div>
                  </div>
                  <div className="p-4">
                    <h4 className="mb-2 text-lg">{set.name}</h4>
                    <p className="text-sm text-gray-600 mb-3">{set.description}</p>
                    
                    <div className="mb-3">
                      <p className="text-xs text-gray-600 mb-2">Includes:</p>
                      <div className="flex flex-wrap gap-1">
                        {set.products.map((product) => (
                          <span
                            key={product.id}
                            className="text-xs bg-gray-100 px-2 py-1 rounded"
                          >
                            {product.name}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <p className="text-2xl text-amber-600">₹{set.price.toFixed(2)}</p>
                        <p className="text-xs text-gray-500 line-through">
                          ₹{set.originalPrice.toFixed(2)}
                        </p>
                      </div>
                    </div>

                    <button
                      className="w-full bg-amber-600 hover:bg-amber-700 text-white py-2 rounded-lg transition-colors flex items-center justify-center gap-2"
                    >
                      <ShoppingCart className="w-4 h-4" />
                      Add Gift Set
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Individual Products */}
          <div>
            <h3 className="text-2xl mb-4">Build Your Own Gift</h3>
            <p className="text-gray-600 mb-6">
              Select individual products and we'll package them beautifully for your {occasion.name.toLowerCase()}
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {occasionProducts.map((product) => (
                <div
                  key={product.id}
                  className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group"
                  onClick={() => onProductClick(product)}
                >
                  <div className="relative h-40 overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    {product.discount && (
                      <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-xs">
                        {product.discount}% OFF
                      </div>
                    )}
                  </div>
                  <div className="p-3">
                    <h4 className="text-sm mb-2 line-clamp-1">{product.name}</h4>
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-lg text-amber-600">₹{product.price.toFixed(2)}</p>
                      <div className="flex items-center gap-1 text-xs text-gray-600">
                        <span>⭐</span>
                        <span>{product.rating}</span>
                      </div>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onAddToCart(product, 1);
                      }}
                      className="w-full bg-amber-600 hover:bg-amber-700 text-white py-2 rounded text-sm transition-colors"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Why Choose Us */}
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-6 border-2 border-amber-200">
            <h3 className="text-xl mb-4 text-center">Why Our {occasion.name} Gifts Stand Out</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="w-12 h-12 bg-amber-500 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Gift className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-sm mb-1">Premium Packaging</h4>
                <p className="text-xs text-gray-600">Elegant boxes designed for {occasion.name.toLowerCase()}</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-sm mb-1">Personalization</h4>
                <p className="text-xs text-gray-600">Add custom messages and cards</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-2">
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h4 className="text-sm mb-1">Quality Guaranteed</h4>
                <p className="text-xs text-gray-600">Premium selection of dry fruits</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-2">
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h4 className="text-sm mb-1">Timely Delivery</h4>
                <p className="text-xs text-gray-600">On-time for your special day</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}