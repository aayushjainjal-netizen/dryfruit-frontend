import React, { useState } from 'react';
import { X, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';
import { Product } from './ProductCard';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { CouponSystem, Coupon } from './CouponSystem';

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartProps {
  items: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onClose: () => void;
  onCheckout: () => void;
}

export function Cart({ items, onUpdateQuantity, onRemoveItem, onClose, onCheckout }: CartProps) {
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);

  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  
  const discount = appliedCoupon
    ? appliedCoupon.type === 'percentage'
      ? (subtotal * appliedCoupon.discount) / 100
      : appliedCoupon.discount
    : 0;
  
  const total = subtotal - discount;
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
      <div className="bg-white w-full max-w-md h-full flex flex-col shadow-2xl animate-slide-in-right">
        <div className="flex items-center justify-between p-4 border-b bg-amber-50">
          <h2 className="text-xl">Shopping Cart ({itemCount})</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-amber-100 rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-gray-500">
            <ShoppingBag className="w-24 h-24 mb-4 text-gray-300" />
            <p className="text-lg">Your cart is empty</p>
            <p className="text-sm">Add some delicious dry fruits!</p>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto p-4">
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.product.id} className="flex gap-4 bg-gray-50 p-3 rounded-lg">
                    <ImageWithFallback
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="mb-1">{item.product.name}</h3>
                      <p className="text-sm text-gray-600 mb-2">
                        ₹{item.product.price} per {item.product.unit}
                      </p>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center border border-gray-300 rounded">
                          <button
                            onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                            className="p-1 hover:bg-gray-200 transition-colors"
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="px-3 text-sm">{item.quantity}</span>
                          <button
                            onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                            className="p-1 hover:bg-gray-200 transition-colors"
                            disabled={item.quantity >= item.product.stock}
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                        <button
                          onClick={() => onRemoveItem(item.product.id)}
                          className="p-1 text-red-500 hover:bg-red-50 rounded transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-amber-700">
                        ₹{(item.product.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t p-4 bg-gray-50">
              {/* Coupon System */}
              <div className="mb-4">
                <CouponSystem
                  total={subtotal}
                  onApplyCoupon={setAppliedCoupon}
                  appliedCoupon={appliedCoupon}
                  onRemoveCoupon={() => setAppliedCoupon(null)}
                />
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toFixed(2)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-sm text-green-600">
                    <span>Discount</span>
                    <span className="text-green-600">-₹{discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm">
                  <span>Shipping</span>
                  <span className="text-green-600">Free</span>
                </div>
                <div className="flex justify-between border-t pt-2">
                  <span>Total</span>
                  <span className="text-xl text-amber-700">₹{total.toFixed(2)}</span>
                </div>
              </div>
              <button
                onClick={onCheckout}
                className="w-full bg-amber-600 hover:bg-amber-700 text-white py-3 rounded-lg transition-colors"
              >
                Proceed to Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}