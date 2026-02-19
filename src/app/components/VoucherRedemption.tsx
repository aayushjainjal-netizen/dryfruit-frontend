import React, { useState } from 'react';
import { Gift, Check, X, AlertCircle } from 'lucide-react';
import { Voucher } from './GiftVoucher';

interface VoucherRedemptionProps {
  vouchers: Voucher[];
  orderTotal: number;
  onApplyVoucher: (voucher: Voucher) => void;
  appliedVoucher?: Voucher | null;
  onRemoveVoucher: () => void;
}

export function VoucherRedemption({
  vouchers,
  orderTotal,
  onApplyVoucher,
  appliedVoucher,
  onRemoveVoucher,
}: VoucherRedemptionProps) {
  const [voucherCode, setVoucherCode] = useState('');
  const [error, setError] = useState('');

  const handleApply = () => {
    setError('');
    
    // Find voucher by code
    const voucher = vouchers.find(
      (v) => v.code.toLowerCase() === voucherCode.toLowerCase() && !v.isUsed
    );

    if (!voucher) {
      setError('Invalid or expired voucher code');
      return;
    }

    // Check if voucher has remaining balance
    const remainingBalance = voucher.amount - voucher.usedAmount;
    if (remainingBalance <= 0) {
      setError('This voucher has been fully used');
      return;
    }

    onApplyVoucher(voucher);
    setVoucherCode('');
  };

  const calculateDiscount = () => {
    if (!appliedVoucher) return 0;
    const remainingBalance = appliedVoucher.amount - appliedVoucher.usedAmount;
    return Math.min(remainingBalance, orderTotal);
  };

  const discount = calculateDiscount();

  return (
    <div className="space-y-4">
      {/* Applied Voucher */}
      {appliedVoucher && (
        <div className="flex flex-col sm:flex-row items-start gap-3 p-3 sm:p-4 bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-200 rounded-lg">
          <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
            <Gift className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1 w-full sm:w-auto">
            <div className="flex items-center gap-2 mb-1">
              <Check className="w-5 h-5 text-green-600" />
              <span className="font-medium text-sm sm:text-base">Gift Voucher Applied!</span>
            </div>
            <p className="text-xs sm:text-sm text-gray-600 mb-1 break-all">
              Code: <span className="font-mono bg-white px-2 py-0.5 rounded">{appliedVoucher.code}</span>
            </p>
            <p className="text-sm text-green-700">
              You saved ₹{discount.toFixed(2)}!
            </p>
            {appliedVoucher.amount - appliedVoucher.usedAmount - discount > 0 && (
              <p className="text-xs text-gray-600 mt-1">
                Remaining balance: ₹{(appliedVoucher.amount - appliedVoucher.usedAmount - discount).toFixed(2)}
              </p>
            )}
          </div>
          <button
            onClick={onRemoveVoucher}
            className="p-1 hover:bg-purple-100 rounded transition-colors self-start sm:self-auto"
          >
            <X className="w-4 h-4 text-purple-700" />
          </button>
        </div>
      )}

      {/* Voucher Input */}
      {!appliedVoucher && (
        <div>
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="flex-1 relative">
              <Gift className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Enter gift voucher code"
                value={voucherCode}
                onChange={(e) => {
                  setVoucherCode(e.target.value.toUpperCase());
                  setError('');
                }}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm sm:text-base"
              />
            </div>
            <button
              onClick={handleApply}
              disabled={!voucherCode}
              className="w-full sm:w-auto px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed text-sm sm:text-base"
            >
              Apply
            </button>
          </div>
          
          {error && (
            <div className="flex items-center gap-2 mt-2 text-sm text-red-600">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div className="mt-3 bg-purple-50 border border-purple-200 rounded-lg p-3">
            <p className="text-sm text-purple-900 mb-2">
              <Gift className="w-4 h-4 inline mr-1" />
              Have a gift voucher?
            </p>
            <p className="text-xs text-purple-700">
              Enter the code above to redeem your gift voucher. The amount will be deducted from your order total.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}