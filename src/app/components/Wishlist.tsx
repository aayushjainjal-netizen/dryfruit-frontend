import React from 'react';
import { X, ShoppingCart, Trash2, Heart } from 'lucide-react';
import { Product } from './ProductCard';

interface WishlistProps {
  items: Product[];
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
  onRemove: (productId: string) => void;
  onProductClick: (product: Product) => void;
}

export function Wishlist({ items, onClose, onAddToCart, onRemove, onProductClick }: WishlistProps) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-end sm:items-center justify-center z-50">
      <div className="bg-white rounded-t-3xl sm:rounded-2xl w-full sm:max-w-2xl sm:max-h-[80vh] overflow-hidden flex flex-col shadow-2xl animate-slide-in-right">
        {/* Header */}
        <div className="p-6 border-b flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Heart className="w-6 h-6 text-red-500 fill-red-500" />
            <div>
              <h2 className="text-2xl text-gray-900">My Wishlist</h2>
              <p className="text-sm text-gray-600">{items.length} items</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Wishlist Items */}
        <div className="flex-1 overflow-y-auto p-6">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12">
              <Heart className="w-16 h-16 text-gray-300 mb-4" />
              <p className="text-gray-600 text-lg mb-2">Your wishlist is empty</p>
              <p className="text-sm text-gray-500">Add items you love to your wishlist</p>
              <button
                onClick={onClose}
                className="mt-4 px-6 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg transition-colors"
              >
                Start Shopping
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((product) => (
                <div
                  key={product.id}
                  className="flex gap-4 p-4 border border-gray-200 rounded-lg hover:border-amber-300 transition-colors"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-24 h-24 object-cover rounded cursor-pointer hover:opacity-80 transition-opacity"
                    onClick={() => {
                      onProductClick(product);
                      onClose();
                    }}
                  />
                  <div className="flex-1">
                    <h3
                      className="mb-1 cursor-pointer hover:text-amber-600 transition-colors"
                      onClick={() => {
                        onProductClick(product);
                        onClose();
                      }}
                    >
                      {product.name}
                    </h3>
                    <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                      {product.description}
                    </p>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xl text-amber-600">₹{product.price.toFixed(2)}</span>
                      {product.discount && (
                        <span className="px-2 py-0.5 bg-red-100 text-red-600 text-xs rounded">
                          {product.discount}% OFF
                        </span>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          onAddToCart(product, 1);
                          onRemove(product.id);
                        }}
                        className="flex items-center gap-2 px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg transition-colors text-sm"
                      >
                        <ShoppingCart className="w-4 h-4" />
                        Add to Cart
                      </button>
                      <button
                        onClick={() => onRemove(product.id)}
                        className="p-2 border border-gray-300 hover:border-red-500 hover:text-red-500 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="p-6 border-t bg-gray-50">
            <button
              onClick={() => {
                items.forEach(product => onAddToCart(product, 1));
                items.forEach(product => onRemove(product.id));
              }}
              className="w-full py-3 bg-amber-600 hover:bg-amber-700 text-white rounded-lg transition-colors"
            >
              Add All to Cart
            </button>
          </div>
        )}
      </div>
    </div>
  );
}