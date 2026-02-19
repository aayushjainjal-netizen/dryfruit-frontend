import React, { useState } from 'react';
import { Tag, X, Check } from 'lucide-react';

export interface Coupon {
  code: string;
  discount: number;
  type: 'percentage' | 'fixed';
  minAmount?: number;
  description: string;
}

interface CouponSystemProps {
  total: number;
  onApplyCoupon: (coupon: Coupon) => void;
  appliedCoupon?: Coupon | null;
  onRemoveCoupon: () => void;
}

export function CouponSystem({ total, onApplyCoupon, appliedCoupon, onRemoveCoupon }: CouponSystemProps) {
  const [couponCode, setCouponCode] = useState('');
  const [error, setError] = useState('');
  const [showAvailable, setShowAvailable] = useState(false);

  // Available coupons
  const availableCoupons: Coupon[] = [
    {
      code: 'WELCOME10',
      discount: 10,
      type: 'percentage',
      description: 'Get 10% off on your first order',
    },
    {
      code: 'SAVE20',
      discount: 20,
      type: 'percentage',
      minAmount: 50,
      description: 'Save 20% on orders above $50',
    },
    {
      code: 'FLAT5',
      discount: 5,
      type: 'fixed',
      description: 'Get $5 off on any order',
    },
    {
      code: 'MEGA25',
      discount: 25,
      type: 'percentage',
      minAmount: 100,
      description: 'Mega 25% discount on orders above $100',
    },
  ];

  const handleApply = () => {
    setError('');
    const coupon = availableCoupons.find(
      c => c.code.toLowerCase() === couponCode.toLowerCase()
    );

    if (!coupon) {
      setError('Invalid coupon code');
      return;
    }

    if (coupon.minAmount && total < coupon.minAmount) {
      setError(`Minimum order amount of ₹${coupon.minAmount} required`);
      return;
    }

    onApplyCoupon(coupon);
    setCouponCode('');
  };

  const calculateDiscount = (coupon: Coupon) => {
    if (coupon.type === 'percentage') {
      return (total * coupon.discount) / 100;
    }
    return coupon.discount;
  };

  return (
    <div className="space-y-4">
      {/* Applied Coupon */}
      {appliedCoupon && (
        <div className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-lg">
          <Check className="w-5 h-5 text-green-600" />
          <div className="flex-1">
            <p className="text-sm">
              <span className="font-medium">Coupon Applied:</span> {appliedCoupon.code}
            </p>
            <p className="text-sm text-green-700">
              You saved ₹{calculateDiscount(appliedCoupon).toFixed(2)}!
            </p>
          </div>
          <button
            onClick={onRemoveCoupon}
            className="p-1 hover:bg-green-100 rounded transition-colors"
          >
            <X className="w-4 h-4 text-green-700" />
          </button>
        </div>
      )}

      {/* Coupon Input */}
      {!appliedCoupon && (
        <div>
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Enter coupon code"
                value={couponCode}
                onChange={(e) => {
                  setCouponCode(e.target.value.toUpperCase());
                  setError('');
                }}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              />
            </div>
            <button
              onClick={handleApply}
              disabled={!couponCode}
              className="px-6 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              Apply
            </button>
          </div>
          {error && <p className="text-sm text-red-600 mt-2">{error}</p>}
          
          {/* Show Available Coupons */}
          <button
            onClick={() => setShowAvailable(!showAvailable)}
            className="text-sm text-amber-600 hover:text-amber-700 mt-2 transition-colors"
          >
            {showAvailable ? 'Hide' : 'View'} available coupons
          </button>

          {showAvailable && (
            <div className="mt-3 space-y-2">
              {availableCoupons.map((coupon) => {
                const isEligible = !coupon.minAmount || total >= coupon.minAmount;
                return (
                  <div
                    key={coupon.code}
                    className={`p-3 border rounded-lg ${
                      isEligible
                        ? 'border-amber-200 bg-amber-50 cursor-pointer hover:border-amber-400'
                        : 'border-gray-200 bg-gray-50 opacity-60'
                    } transition-colors`}
                    onClick={() => {
                      if (isEligible) {
                        setCouponCode(coupon.code);
                      }
                    }}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="px-2 py-0.5 bg-white border border-amber-300 text-amber-700 text-xs rounded">
                            {coupon.code}
                          </span>
                          {coupon.type === 'percentage' ? (
                            <span className="text-sm text-amber-600">{coupon.discount}% OFF</span>
                          ) : (
                            <span className="text-sm text-amber-600">${coupon.discount} OFF</span>
                          )}
                        </div>
                        <p className="text-sm text-gray-600">{coupon.description}</p>
                        {coupon.minAmount && (
                          <p className="text-xs text-gray-500 mt-1">
                            Min. order: ₹{coupon.minAmount}
                          </p>
                        )}
                      </div>
                      {isEligible && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setCouponCode(coupon.code);
                            handleApply();
                          }}
                          className="text-sm text-amber-600 hover:text-amber-700 ml-2"
                        >
                          Apply
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}