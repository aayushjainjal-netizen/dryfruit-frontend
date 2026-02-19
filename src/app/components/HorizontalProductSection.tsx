import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ProductCard, Product } from './ProductCard';

interface HorizontalProductSectionProps {
  title: string;
  subtitle?: string;
  products: Product[];
  onAddToCart: (product: Product, quantity: number) => void;
  onProductClick: (product: Product) => void;
  badge?: {
    text: string;
    color: string;
  };
}

export function HorizontalProductSection({
  title,
  subtitle,
  products,
  onAddToCart,
  onProductClick,
  badge,
}: HorizontalProductSectionProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400;
      const newScrollLeft =
        scrollContainerRef.current.scrollLeft +
        (direction === 'left' ? -scrollAmount : scrollAmount);
      
      scrollContainerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth',
      });
    }
  };

  if (products.length === 0) {
    return null;
  }

  return (
    <div className="mb-12">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <h2 className="text-2xl sm:text-3xl text-gray-900">{title}</h2>
          {badge && (
            <span
              className={`px-3 py-1 rounded-full text-sm ${badge.color}`}
            >
              {badge.text}
            </span>
          )}
        </div>
        {subtitle && (
          <p className="text-gray-600 hidden sm:block">{subtitle}</p>
        )}
      </div>

      {/* Scrollable Products Container */}
      <div className="relative group">
        {/* Left Arrow */}
        <button
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white shadow-lg rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden lg:block"
          aria-label="Scroll left"
        >
          <ChevronLeft className="w-6 h-6 text-gray-700" />
        </button>

        {/* Right Arrow */}
        <button
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white shadow-lg rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden lg:block"
          aria-label="Scroll right"
        >
          <ChevronRight className="w-6 h-6 text-gray-700" />
        </button>

        {/* Products Scroll Container */}
        <div
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide scroll-smooth"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          {products.map((product) => (
            <div key={product.id} className="flex-shrink-0 w-80 sm:w-96">
              <ProductCard
                product={product}
                onAddToCart={onAddToCart}
                onProductClick={onProductClick}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
