import React, { useState } from 'react';
import { X, Gift, CreditCard, Mail, User, MessageSquare, Download, Share2 } from 'lucide-react';

export interface Voucher {
  id: string;
  code: string;
  amount: number;
  senderName: string;
  senderEmail: string;
  recipientName: string;
  recipientEmail: string;
  message: string;
  purchaseDate: string;
  expiryDate: string;
  isUsed: boolean;
  usedAmount: number;
}

interface GiftVoucherProps {
  onClose: () => void;
  onPurchase: (voucher: Omit<Voucher, 'id' | 'code' | 'purchaseDate' | 'expiryDate' | 'isUsed' | 'usedAmount'>) => void;
}

const voucherDenominations = [25, 50, 100, 200, 500];

export function GiftVoucher({ onClose, onPurchase }: GiftVoucherProps) {
  const [selectedAmount, setSelectedAmount] = useState<number>(50);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [isCustomAmount, setIsCustomAmount] = useState(false);
  const [formData, setFormData] = useState({
    senderName: '',
    senderEmail: '',
    recipientName: '',
    recipientEmail: '',
    message: '',
  });
  const [step, setStep] = useState<'select' | 'details' | 'preview'>('select');

  const handleAmountSelect = (amount: number) => {
    setSelectedAmount(amount);
    setIsCustomAmount(false);
    setCustomAmount('');
  };

  const handleCustomAmountToggle = () => {
    setIsCustomAmount(true);
    setSelectedAmount(0);
  };

  const handleCustomAmountChange = (value: string) => {
    const numValue = parseInt(value);
    if (!isNaN(numValue) && numValue > 0) {
      setCustomAmount(value);
      setSelectedAmount(numValue);
    } else {
      setCustomAmount('');
      setSelectedAmount(0);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNext = () => {
    if (step === 'select' && selectedAmount > 0) {
      setStep('details');
    } else if (step === 'details') {
      setStep('preview');
    }
  };

  const handlePurchase = () => {
    onPurchase({
      amount: selectedAmount,
      ...formData,
    });
  };

  const finalAmount = isCustomAmount ? selectedAmount : selectedAmount;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl my-4">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white p-4 sm:p-6 rounded-t-2xl shadow-lg z-10">
          <button
            onClick={onClose}
            className="absolute top-3 right-3 sm:top-4 sm:right-4 p-2 bg-white/20 hover:bg-white/30 rounded-full transition-colors"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
          
          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white/20 rounded-full flex items-center justify-center">
              <Gift className="w-6 h-6 sm:w-8 sm:h-8" />
            </div>
            <div className="text-center sm:text-left">
              <h2 className="text-2xl sm:text-3xl mb-1">Gift Vouchers</h2>
              <p className="text-sm sm:text-base text-white/90">The perfect gift for every occasion</p>
            </div>
          </div>

          {/* Progress Steps */}
          <div className="flex items-center gap-2 mt-4 sm:mt-6">
            <div className={`flex-1 h-1.5 sm:h-2 rounded-full ${step === 'select' || step === 'details' || step === 'preview' ? 'bg-white' : 'bg-white/30'}`} />
            <div className={`flex-1 h-1.5 sm:h-2 rounded-full ${step === 'details' || step === 'preview' ? 'bg-white' : 'bg-white/30'}`} />
            <div className={`flex-1 h-1.5 sm:h-2 rounded-full ${step === 'preview' ? 'bg-white' : 'bg-white/30'}`} />
          </div>
        </div>

        <div className="p-4 sm:p-6">
          {/* Step 1: Select Amount */}
          {step === 'select' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl mb-2">Choose Voucher Amount</h3>
                <p className="text-gray-600">Select a pre-set amount or enter a custom value</p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                {voucherDenominations.map((amount) => (
                  <button
                    key={amount}
                    onClick={() => handleAmountSelect(amount)}
                    className={`relative p-6 border-2 rounded-xl transition-all ${
                      selectedAmount === amount && !isCustomAmount
                        ? 'border-purple-500 bg-purple-50 shadow-lg scale-105'
                        : 'border-gray-200 hover:border-purple-300'
                    }`}
                  >
                    <div className="text-center">
                      <p className="text-3xl mb-2">₹{amount}</p>
                      <p className="text-xs text-gray-600">Gift Card</p>
                    </div>
                    {selectedAmount === amount && !isCustomAmount && (
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    )}
                  </button>
                ))}
              </div>

              {/* Custom Amount */}
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-6">
                <h4 className="mb-4">Or Enter Custom Amount</h4>
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-2xl text-gray-600">₹</span>
                      <input
                        type="number"
                        min="10"
                        max="1000"
                        value={customAmount}
                        onChange={(e) => handleCustomAmountChange(e.target.value)}
                        onFocus={handleCustomAmountToggle}
                        placeholder="Enter amount"
                        className="w-full pl-10 pr-4 py-3 text-2xl border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-2">Minimum ₹10, Maximum ₹1000</p>
                  </div>
                </div>
              </div>

              {/* Benefits */}
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-200">
                <h4 className="mb-4">Why Choose Our Gift Vouchers?</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span>Valid for 1 year from purchase</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span>Use on any product</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span>No hidden fees</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span>Instant email delivery</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Details */}
          {step === 'details' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl mb-2">Recipient & Sender Details</h3>
                <p className="text-gray-600">Tell us who this gift is for</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Sender Details */}
                <div className="space-y-4">
                  <h4 className="flex items-center gap-2">
                    <User className="w-5 h-5 text-purple-600" />
                    Your Details
                  </h4>
                  <div>
                    <label className="block text-sm mb-2">Your Name *</label>
                    <input
                      type="text"
                      name="senderName"
                      required
                      value={formData.senderName}
                      onChange={handleChange}
                      placeholder="John Doe"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm mb-2">Your Email *</label>
                    <input
                      type="email"
                      name="senderEmail"
                      required
                      value={formData.senderEmail}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Recipient Details */}
                <div className="space-y-4">
                  <h4 className="flex items-center gap-2">
                    <Gift className="w-5 h-5 text-pink-600" />
                    Recipient Details
                  </h4>
                  <div>
                    <label className="block text-sm mb-2">Recipient Name *</label>
                    <input
                      type="text"
                      name="recipientName"
                      required
                      value={formData.recipientName}
                      onChange={handleChange}
                      placeholder="Jane Smith"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm mb-2">Recipient Email *</label>
                    <input
                      type="email"
                      name="recipientEmail"
                      required
                      value={formData.recipientEmail}
                      onChange={handleChange}
                      placeholder="jane@example.com"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              {/* Gift Message */}
              <div>
                <label className="block text-sm mb-2 flex items-center gap-2">
                  <MessageSquare className="w-4 h-4" />
                  Personal Message (Optional)
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Write a heartfelt message to your loved one..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  rows={4}
                  maxLength={200}
                />
                <p className="text-xs text-gray-500 mt-1">{formData.message.length}/200 characters</p>
              </div>
            </div>
          )}

          {/* Step 3: Preview */}
          {step === 'preview' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl mb-2">Preview Your Gift Voucher</h3>
                <p className="text-gray-600">Review before purchase</p>
              </div>

              {/* Voucher Preview Card */}
              <div className="relative max-w-2xl mx-auto">
                <div className="bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 rounded-2xl p-8 text-white shadow-2xl">
                  <div className="absolute top-4 right-4 bg-white/20 px-3 py-1 rounded-full text-xs">
                    Gift Voucher
                  </div>
                  
                  <div className="mb-8">
                    <h4 className="text-3xl mb-2">Premium Dry Fruits</h4>
                    <p className="text-white/80 text-sm">Gift Card</p>
                  </div>

                  <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 mb-6">
                    <div className="text-center mb-4">
                      <p className="text-sm text-white/80 mb-2">Gift Amount</p>
                      <p className="text-5xl">₹{finalAmount}</p>
                    </div>
                    {formData.message && (
                      <div className="border-t border-white/20 pt-4 mt-4">
                        <p className="text-sm text-white/80 mb-2">Message:</p>
                        <p className="italic">"{formData.message}"</p>
                      </div>
                    )}
                  </div>

                  <div className="flex justify-between text-sm">
                    <div>
                      <p className="text-white/70">From:</p>
                      <p>{formData.senderName}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-white/70">To:</p>
                      <p>{formData.recipientName}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Summary */}
              <div className="bg-gray-50 rounded-xl p-6">
                <h4 className="mb-4">Order Summary</h4>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Gift Voucher Amount</span>
                    <span>₹{finalAmount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Processing Fee</span>
                    <span className="text-green-600">Free</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t">
                    <span className="text-lg">Total</span>
                    <span className="text-2xl text-purple-600">₹{finalAmount.toFixed(2)}</span>
                  </div>
                </div>
                <div className="flex items-start gap-2 text-sm text-gray-600">
                  <Mail className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <p>The voucher will be sent to <strong>{formData.recipientEmail}</strong> immediately after purchase.</p>
                </div>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-4 mt-8 pt-6 border-t">
            {step !== 'select' && (
              <button
                onClick={() => {
                  if (step === 'details') setStep('select');
                  else if (step === 'preview') setStep('details');
                }}
                className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Back
              </button>
            )}
            {step !== 'preview' ? (
              <button
                onClick={handleNext}
                disabled={
                  (step === 'select' && selectedAmount === 0) ||
                  (step === 'details' && (!formData.senderName || !formData.senderEmail || !formData.recipientName || !formData.recipientEmail))
                }
                className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Continue
              </button>
            ) : (
              <button
                onClick={handlePurchase}
                className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <CreditCard className="w-5 h-5" />
                Purchase Gift Voucher - ₹{finalAmount.toFixed(2)}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}