import React from 'react';
import { Heart, Gift, Sparkles, Cake, Star, Users, Calendar, PartyPopper } from 'lucide-react';

export interface Occasion {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  gradient: string;
  description: string;
  popular: boolean;
}

interface OccasionSelectorProps {
  onSelectOccasion: (occasion: Occasion) => void;
}

export const occasions: Occasion[] = [
  {
    id: 'wedding',
    name: 'Wedding',
    icon: Heart,
    color: 'bg-pink-500',
    gradient: 'from-pink-400 to-pink-600',
    description: 'Perfect gifts for wedding celebrations',
    popular: true,
  },
  {
    id: 'engagement',
    name: 'Engagement',
    icon: Sparkles,
    color: 'bg-purple-500',
    gradient: 'from-purple-400 to-purple-600',
    description: 'Celebrate new beginnings',
    popular: true,
  },
  {
    id: 'birthday',
    name: 'Birthday',
    icon: Cake,
    color: 'bg-blue-500',
    gradient: 'from-blue-400 to-blue-600',
    description: 'Make birthdays extra special',
    popular: true,
  },
  {
    id: 'anniversary',
    name: 'Anniversary',
    icon: Heart,
    color: 'bg-red-500',
    gradient: 'from-red-400 to-red-600',
    description: 'Celebrate love and togetherness',
    popular: false,
  },
  {
    id: 'diwali',
    name: 'Diwali',
    icon: Star,
    color: 'bg-amber-500',
    gradient: 'from-amber-400 to-amber-600',
    description: 'Festival of lights celebrations',
    popular: true,
  },
  {
    id: 'christmas',
    name: 'Christmas',
    icon: Gift,
    color: 'bg-green-500',
    gradient: 'from-green-400 to-green-600',
    description: 'Spread Christmas joy',
    popular: false,
  },
  {
    id: 'eid',
    name: 'Eid',
    icon: PartyPopper,
    color: 'bg-teal-500',
    gradient: 'from-teal-400 to-teal-600',
    description: 'Celebrate with loved ones',
    popular: false,
  },
  {
    id: 'corporate',
    name: 'Corporate Gifts',
    icon: Users,
    color: 'bg-indigo-500',
    gradient: 'from-indigo-400 to-indigo-600',
    description: 'Professional gifting solutions',
    popular: true,
  },
  {
    id: 'general',
    name: 'General Gifting',
    icon: Gift,
    color: 'bg-gray-500',
    gradient: 'from-gray-400 to-gray-600',
    description: 'Perfect for any occasion',
    popular: false,
  },
];

export function OccasionSelector({ onSelectOccasion }: OccasionSelectorProps) {
  return (
    <div className="bg-gradient-to-br from-amber-50 via-white to-orange-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl mb-3 text-amber-900">
            Shop by Occasion 🎁
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Find the perfect gift with our special occasion packaging and curated gift sets
          </p>
        </div>

        {/* Occasions Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {occasions.map((occasion) => {
            const Icon = occasion.icon;
            return (
              <button
                key={occasion.id}
                onClick={() => onSelectOccasion(occasion)}
                className="group relative bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                {occasion.popular && (
                  <div className="absolute -top-2 -right-2 px-2 py-1 bg-red-500 text-white text-xs rounded-full shadow-md">
                    Popular
                  </div>
                )}
                <div
                  className={`w-16 h-16 bg-gradient-to-br ${occasion.gradient} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}
                >
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-center mb-2 group-hover:text-amber-600 transition-colors">
                  {occasion.name}
                </h3>
                <p className="text-xs text-gray-600 text-center leading-tight">
                  {occasion.description}
                </p>
              </button>
            );
          })}
        </div>

        {/* Special Banner */}
        <div className="mt-10 bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 rounded-2xl p-8 text-white text-center shadow-xl">
          <h3 className="text-2xl sm:text-3xl mb-3">✨ Premium Gift Packaging Available ✨</h3>
          <p className="text-lg mb-4 opacity-90">
            All orders can be beautifully packaged for your special occasions
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full">
              <Gift className="w-4 h-4" />
              <span>Elegant Box Packaging</span>
            </div>
            <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full">
              <Calendar className="w-4 h-4" />
              <span>Personalized Cards</span>
            </div>
            <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full">
              <Sparkles className="w-4 h-4" />
              <span>Premium Wrapping</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
