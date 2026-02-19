import React, { useState } from 'react';
import { Gift, CheckCircle, MessageSquare, Sparkles } from 'lucide-react';

export interface GiftPackagingOption {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  popular?: boolean;
}

export interface GiftDetails {
  packaging: GiftPackagingOption | null;
  message: string;
  senderName: string;
  occasion: string;
}

interface GiftPackagingProps {
  onSelect?: (giftDetails: GiftDetails) => void;
  onGiftChange?: (giftDetails: GiftDetails) => void;
  defaultOccasion?: string;
  giftDetails?: GiftDetails | null;
}

const packagingOptions: GiftPackagingOption[] = [
  {
    id: 'none',
    name: 'Standard Packaging',
    description: 'Simple and eco-friendly packaging',
    price: 0,
    image: 'https://images.unsplash.com/photo-1607083206968-13611e3d76db?w=400',
  },
  {
    id: 'premium-box',
    name: 'Premium Gift Box',
    description: 'Elegant box with ribbon and tissue paper',
    price: 5.99,
    image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=400',
    popular: true,
  },
  {
    id: 'luxury-hamper',
    name: 'Luxury Hamper',
    description: 'Beautiful basket with decorative wrapping',
    price: 12.99,
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=400',
    popular: true,
  },
  {
    id: 'wedding-special',
    name: 'Wedding Special',
    description: 'Ornate box with gold accents and personalized tag',
    price: 15.99,
    image: 'https://images.unsplash.com/photo-1464890100898-a385f744067f?w=400',
  },
  {
    id: 'festival-pack',
    name: 'Festival Pack',
    description: 'Colorful traditional packaging with ethnic designs',
    price: 8.99,
    image: 'https://images.unsplash.com/photo-1607344645866-009c320b63e0?w=400',
  },
  {
    id: 'corporate-premium',
    name: 'Corporate Premium',
    description: 'Professional packaging with custom branding option',
    price: 10.99,
    image: 'https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=400',
  },
];

export function GiftPackaging({ onSelect, onGiftChange, defaultOccasion = '', giftDetails }: GiftPackagingProps) {
  const [selectedPackaging, setSelectedPackaging] = useState<GiftPackagingOption>(
    giftDetails?.packaging || packagingOptions[0]
  );
  const [giftMessage, setGiftMessage] = useState(giftDetails?.message || '');
  const [senderName, setSenderName] = useState(giftDetails?.senderName || '');
  const [occasion, setOccasion] = useState(giftDetails?.occasion || defaultOccasion);
  const [showMessageCard, setShowMessageCard] = useState(false);

  const handleContinue = () => {
    const details: GiftDetails = {
      packaging: selectedPackaging.id === 'none' ? null : selectedPackaging,
      message: giftMessage,
      senderName,
      occasion,
    };
    onSelect?.(details);
    onGiftChange?.(details);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
          <Gift className="w-6 h-6 text-amber-600" />
        </div>
        <div>
          <h3 className="text-xl">Gift Packaging Options</h3>
          <p className="text-sm text-gray-600">Make your gift extra special</p>
        </div>
      </div>

      {/* Packaging Options */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {packagingOptions.map((option) => (
          <button
            key={option.id}
            onClick={() => setSelectedPackaging(option)}
            className={`relative text-left p-4 border-2 rounded-xl transition-all ${
              selectedPackaging.id === option.id
                ? 'border-amber-500 bg-amber-50 shadow-md'
                : 'border-gray-200 hover:border-amber-300'
            }`}
          >
            {option.popular && (
              <div className="absolute -top-2 -right-2 px-2 py-1 bg-red-500 text-white text-xs rounded-full">
                Popular
              </div>
            )}
            <img
              src={option.image}
              alt={option.name}
              className="w-full h-32 object-cover rounded-lg mb-3"
            />
            <div className="flex items-start justify-between mb-2">
              <h4 className="flex-1">{option.name}</h4>
              {selectedPackaging.id === option.id && (
                <CheckCircle className="w-5 h-5 text-amber-600 flex-shrink-0" />
              )}
            </div>
            <p className="text-sm text-gray-600 mb-2">{option.description}</p>
            <p className="text-lg text-amber-600">
              {option.price === 0 ? 'Free' : `+₹${option.price.toFixed(2)}`}
            </p>
          </button>
        ))}
      </div>

      {/* Gift Message Section */}
      <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-6 border border-amber-200">
        <div className="flex items-center gap-2 mb-4">
          <MessageSquare className="w-5 h-5 text-amber-600" />
          <h4 className="text-lg">Add a Personal Touch</h4>
        </div>

        <div className="space-y-4">
          {/* Occasion */}
          <div>
            <label className="block text-sm mb-2">Select Occasion</label>
            <select
              value={occasion}
              onChange={(e) => setOccasion(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-white"
            >
              <option value="">General</option>
              <option value="Wedding">Wedding</option>
              <option value="Engagement">Engagement</option>
              <option value="Birthday">Birthday</option>
              <option value="Anniversary">Anniversary</option>
              <option value="Diwali">Diwali</option>
              <option value="Christmas">Christmas</option>
              <option value="Eid">Eid</option>
              <option value="Corporate">Corporate Event</option>
              <option value="Thank You">Thank You</option>
              <option value="Congratulations">Congratulations</option>
            </select>
          </div>

          {/* Sender Name */}
          <div>
            <label className="block text-sm mb-2">Your Name (Optional)</label>
            <input
              type="text"
              value={senderName}
              onChange={(e) => setSenderName(e.target.value)}
              placeholder="e.g., From the Smith Family"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            />
          </div>

          {/* Gift Message */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm">Gift Message (Optional)</label>
              <button
                type="button"
                onClick={() => setShowMessageCard(!showMessageCard)}
                className="text-xs text-amber-600 hover:text-amber-700"
              >
                {showMessageCard ? 'Hide' : 'Show'} Preview
              </button>
            </div>
            <textarea
              value={giftMessage}
              onChange={(e) => setGiftMessage(e.target.value)}
              placeholder="Write a heartfelt message for your loved ones..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              rows={4}
              maxLength={250}
            />
            <p className="text-xs text-gray-500 mt-1">
              {giftMessage.length}/250 characters
            </p>
          </div>

          {/* Message Preview Card */}
          {showMessageCard && (giftMessage || senderName || occasion) && (
            <div className="bg-white border-2 border-dashed border-amber-300 rounded-lg p-6 relative">
              <div className="absolute -top-3 -left-3">
                <Sparkles className="w-6 h-6 text-amber-500" />
              </div>
              <div className="absolute -bottom-3 -right-3 rotate-180">
                <Sparkles className="w-6 h-6 text-amber-500" />
              </div>
              
              {occasion && (
                <div className="text-center mb-3">
                  <span className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-sm">
                    {occasion}
                  </span>
                </div>
              )}
              
              {giftMessage && (
                <p className="text-gray-700 text-center italic mb-3 leading-relaxed">
                  "{giftMessage}"
                </p>
              )}
              
              {senderName && (
                <p className="text-right text-sm text-gray-600">
                  - {senderName}
                </p>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Summary */}
      {selectedPackaging.price > 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-blue-900">Gift packaging cost:</p>
              <p className="text-xs text-blue-700">{selectedPackaging.name}</p>
            </div>
            <p className="text-lg text-blue-900">+₹{selectedPackaging.price.toFixed(2)}</p>
          </div>
        </div>
      )}

      {/* Info */}
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
        <div className="flex gap-3">
          <Sparkles className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-amber-800">
            <p className="mb-1">
              <strong>Premium packaging includes:</strong>
            </p>
            <ul className="list-disc list-inside space-y-1 text-xs">
              <li>Beautiful presentation box or basket</li>
              <li>Decorative wrapping and ribbons</li>
              <li>Personalized greeting card with your message</li>
              <li>Protective packaging for safe delivery</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}