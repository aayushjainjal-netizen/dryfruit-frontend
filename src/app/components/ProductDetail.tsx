import React, { useState } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { ArrowLeft, ShoppingCart, Star, Minus, Plus, Package, Truck, Shield, Heart, Share2 } from 'lucide-react';
import { Product } from './ProductCard';

interface ProductDetailProps {
  product: Product;
  onAddToCart: (product: Product, quantity: number) => void;
  onClose: () => void;
}

export function ProductDetail({ product, onAddToCart, onClose }: ProductDetailProps) {
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);

  // Generate product images (main image + 2 related images)
  const productImages = [
    product.image,
    product.image, // In a real app, these would be different angles/views
    product.image,
  ];

  const handleQuantityChange = (delta: number) => {
    const newQuantity = Math.max(1, Math.min(product.stock, quantity + delta));
    setQuantity(newQuantity);
  };

  const handleAddToCart = () => {
    onAddToCart(product, quantity);
    setQuantity(1);
  };

  // Mock reviews data
  const reviews = [
    {
      id: 1,
      author: 'John Doe',
      rating: 5,
      date: '2 weeks ago',
      comment: 'Excellent quality! Fresh and delicious. Will definitely order again.',
      verified: true,
    },
    {
      id: 2,
      author: 'Sarah Smith',
      rating: 4,
      date: '1 month ago',
      comment: 'Very good product, packaging was perfect. Slightly expensive but worth it.',
      verified: true,
    },
    {
      id: 3,
      author: 'Mike Johnson',
      rating: 5,
      date: '2 months ago',
      comment: 'Best quality dry fruits I have purchased online. Highly recommended!',
      verified: true,
    },
  ];

  const nutritionalInfo = {
    calories: '579 kcal',
    protein: '21g',
    carbs: '21g',
    fat: '50g',
    fiber: '12g',
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <button
          onClick={onClose}
          className="flex items-center gap-2 text-gray-600 hover:text-amber-600 mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Products
        </button>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6 lg:p-8">
            {/* Left Column - Images */}
            <div>
              {/* Main Image */}
              <div className="relative mb-4 rounded-xl overflow-hidden bg-gray-100 aspect-square">
                <ImageWithFallback
                  src={productImages[selectedImage]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                {product.stock < 10 && (
                  <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm">
                    Only {product.stock} left!
                  </div>
                )}
              </div>

              {/* Thumbnail Images */}
              <div className="grid grid-cols-3 gap-4">
                {productImages.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative rounded-lg overflow-hidden aspect-square border-2 transition-all ${
                      selectedImage === index
                        ? 'border-amber-500 shadow-md'
                        : 'border-gray-200 hover:border-amber-300'
                    }`}
                  >
                    <ImageWithFallback
                      src={img}
                      alt={`${product.name} view ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Right Column - Product Info */}
            <div className="flex flex-col">
              {/* Header */}
              <div className="mb-6">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h1 className="text-3xl mb-2 text-gray-900">{product.name}</h1>
                    <p className="text-sm text-gray-500 mb-3">{product.category}</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setIsFavorite(!isFavorite)}
                      className={`p-2 rounded-full border transition-colors ${
                        isFavorite
                          ? 'bg-red-50 border-red-300 text-red-500'
                          : 'border-gray-300 text-gray-400 hover:border-red-300 hover:text-red-500'
                      }`}
                    >
                      <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
                    </button>
                    <button className="p-2 rounded-full border border-gray-300 text-gray-400 hover:border-amber-500 hover:text-amber-600 transition-colors">
                      <Share2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < Math.floor(product.rating)
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-gray-700">{product.rating}</span>
                  <span className="text-gray-400">|</span>
                  <span className="text-gray-600">{reviews.length} Reviews</span>
                </div>

                {/* Price */}
                <div className="flex items-baseline gap-3">
                  <span className="text-4xl text-amber-700">₹{product.price}</span>
                  <span className="text-gray-500">per {product.unit}</span>
                </div>
              </div>

              {/* Description */}
              <div className="mb-6">
                <h3 className="text-lg mb-2">Description</h3>
                <p className="text-gray-600 leading-relaxed">{product.description}</p>
                <p className="text-gray-600 leading-relaxed mt-2">
                  Our {product.name.toLowerCase()} are carefully sourced from the finest farms and processed 
                  with utmost care to preserve their natural goodness. Rich in nutrients and perfect for 
                  healthy snacking or adding to your favorite recipes.
                </p>
              </div>

              {/* Nutritional Information */}
              <div className="mb-6 p-4 bg-amber-50 rounded-lg">
                <h3 className="text-lg mb-3">Nutritional Information (per 100g)</h3>
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Calories:</span>
                    <span>{nutritionalInfo.calories}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Protein:</span>
                    <span>{nutritionalInfo.protein}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Carbs:</span>
                    <span>{nutritionalInfo.carbs}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Fat:</span>
                    <span>{nutritionalInfo.fat}</span>
                  </div>
                  <div className="flex justify-between col-span-2">
                    <span className="text-gray-600">Fiber:</span>
                    <span>{nutritionalInfo.fiber}</span>
                  </div>
                </div>
              </div>

              {/* Quantity Selector and Add to Cart */}
              <div className="mb-6">
                <div className="flex gap-4">
                  <div className="flex items-center border border-gray-300 rounded-lg">
                    <button
                      onClick={() => handleQuantityChange(-1)}
                      className="p-3 hover:bg-gray-100 transition-colors"
                      disabled={quantity <= 1}
                    >
                      <Minus className="w-5 h-5" />
                    </button>
                    <span className="px-6 min-w-[4rem] text-center text-lg">{quantity}</span>
                    <button
                      onClick={() => handleQuantityChange(1)}
                      className="p-3 hover:bg-gray-100 transition-colors"
                      disabled={quantity >= product.stock}
                    >
                      <Plus className="w-5 h-5" />
                    </button>
                  </div>

                  <button
                    onClick={handleAddToCart}
                    disabled={product.stock === 0}
                    className="flex-1 bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-lg flex items-center justify-center gap-2 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                  >
                    <ShoppingCart className="w-5 h-5" />
                    Add to Cart
                  </button>
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  {product.stock > 0 ? `${product.stock} units in stock` : 'Out of stock'}
                </p>
              </div>

              {/* Features */}
              <div className="grid grid-cols-3 gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
                <div className="text-center">
                  <Package className="w-6 h-6 text-amber-600 mx-auto mb-2" />
                  <p className="text-xs text-gray-600">Premium Packaging</p>
                </div>
                <div className="text-center">
                  <Truck className="w-6 h-6 text-amber-600 mx-auto mb-2" />
                  <p className="text-xs text-gray-600">Fast Delivery</p>
                </div>
                <div className="text-center">
                  <Shield className="w-6 h-6 text-amber-600 mx-auto mb-2" />
                  <p className="text-xs text-gray-600">Quality Assured</p>
                </div>
              </div>
            </div>
          </div>

          {/* Reviews Section */}
          <div className="border-t border-gray-200 p-6 lg:p-8">
            <h2 className="text-2xl mb-6">Customer Reviews</h2>
            
            {/* Reviews List */}
            <div className="space-y-6">
              {reviews.map((review) => (
                <div key={review.id} className="border-b border-gray-200 pb-6 last:border-0">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <span className="text-gray-900">{review.author}</span>
                        {review.verified && (
                          <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded">
                            Verified Purchase
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < review.rating
                                  ? 'fill-yellow-400 text-yellow-400'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-gray-500">{review.date}</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-600">{review.comment}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}