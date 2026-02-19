import React, { useState } from 'react';
import { X, CreditCard, Gift } from 'lucide-react';
import { CartItem } from './Cart';
import { GiftPackaging, GiftDetails } from './GiftPackaging';

interface CheckoutFormProps {
  items: CartItem[];
  total: number;
  onClose: () => void;
  onSubmitOrder: (orderDetails: OrderDetails) => void;
  defaultOccasion?: string;
}

export interface OrderDetails {
  id: string;
  customerName: string;
  email: string;
  customerEmail?: string;
  phone: string;
  address: string;
  city: string;
  zipCode: string;
  paymentMethod: 'card' | 'cod';
  items: CartItem[];
  total: number;
  orderDate: string;
  status: string;
  giftDetails?: GiftDetails;
}

export function CheckoutForm({ items, total, onClose, onSubmitOrder, defaultOccasion = '' }: CheckoutFormProps) {
  const [currentStep, setCurrentStep] = useState<'details' | 'gift' | 'payment'>('details');
  const [formData, setFormData] = useState({
    customerName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zipCode: '',
    paymentMethod: 'cod' as 'card' | 'cod',
  });
  const [giftDetails, setGiftDetails] = useState<GiftDetails | null>(null);
  const [isGift, setIsGift] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const orderDetails: OrderDetails = {
      id: Math.random().toString(36).substr(2, 9),
      ...formData,
      items,
      total,
      orderDate: new Date().toISOString(),
      status: 'pending',
      giftDetails: isGift ? giftDetails : undefined,
    };
    onSubmitOrder(orderDetails);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleGiftChange = (details: GiftDetails) => {
    setGiftDetails(details);
  };

  const handleGiftToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsGift(e.target.checked);
  };

  const handleNextStep = () => {
    if (currentStep === 'details') {
      setCurrentStep('gift');
    } else if (currentStep === 'gift') {
      setCurrentStep('payment');
    }
  };

  const handlePreviousStep = () => {
    if (currentStep === 'gift') {
      setCurrentStep('details');
    } else if (currentStep === 'payment') {
      setCurrentStep('gift');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b sticky top-0 bg-white">
          <h2 className="text-2xl">Checkout</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {currentStep === 'details' && (
            <div>
              <h3 className="mb-4">Contact Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm mb-2">Full Name *</label>
                  <input
                    type="text"
                    name="customerName"
                    required
                    value={formData.customerName}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm mb-2">Email *</label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm mb-2">Phone Number *</label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          )}

          {currentStep === 'details' && (
            <div>
              <h3 className="mb-4">Delivery Address</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm mb-2">Street Address *</label>
                  <textarea
                    name="address"
                    required
                    value={formData.address}
                    onChange={handleChange}
                    rows={2}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm mb-2">City *</label>
                    <input
                      type="text"
                      name="city"
                      required
                      value={formData.city}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm mb-2">ZIP Code *</label>
                    <input
                      type="text"
                      name="zipCode"
                      required
                      value={formData.zipCode}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentStep === 'gift' && (
            <div>
              <h3 className="mb-4">Gift Packaging</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="isGift"
                    checked={isGift}
                    onChange={handleGiftToggle}
                    className="mr-3"
                  />
                  <label className="block text-sm">Wrap as a Gift</label>
                </div>
                {isGift && (
                  <GiftPackaging
                    defaultOccasion={defaultOccasion}
                    onGiftChange={handleGiftChange}
                    giftDetails={giftDetails}
                  />
                )}
              </div>
            </div>
          )}

          {currentStep === 'payment' && (
            <div>
              <h3 className="mb-4">Payment Method</h3>
              <div className="space-y-3">
                <label className="flex items-center p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cod"
                    checked={formData.paymentMethod === 'cod'}
                    onChange={handleChange}
                    className="mr-3"
                  />
                  <div className="flex-1">
                    <p>Cash on Delivery</p>
                    <p className="text-sm text-gray-600">Pay when you receive your order</p>
                  </div>
                </label>
                <label className="flex items-center p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="card"
                    checked={formData.paymentMethod === 'card'}
                    onChange={handleChange}
                    className="mr-3"
                  />
                  <div className="flex-1 flex items-center gap-2">
                    <CreditCard className="w-5 h-5" />
                    <div>
                      <p>Card Payment</p>
                      <p className="text-sm text-gray-600">Pay securely online</p>
                    </div>
                  </div>
                </label>
              </div>
            </div>
          )}

          <div className="border-t pt-4">
            <div className="flex justify-between mb-4">
              <span>Total Amount</span>
              <span className="text-2xl text-amber-700">₹{total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <button
                type="button"
                onClick={handlePreviousStep}
                className="bg-gray-200 hover:bg-gray-300 text-gray-700 py-3 px-4 rounded-lg transition-colors"
                disabled={currentStep === 'details'}
              >
                Previous
              </button>
              <button
                type="button"
                onClick={handleNextStep}
                className="bg-gray-200 hover:bg-gray-300 text-gray-700 py-3 px-4 rounded-lg transition-colors"
                disabled={currentStep === 'payment'}
              >
                Next
              </button>
              <button
                type="submit"
                className="w-full bg-amber-600 hover:bg-amber-700 text-white py-3 rounded-lg transition-colors"
                disabled={currentStep !== 'payment'}
              >
                Place Order
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}