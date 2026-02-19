import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

export interface Advertisement {
  id: string;
  title: string;
  description: string;
  image: string;
  ctaText: string;
  ctaLink?: string;
  backgroundColor: string;
  textColor: string;
  active: boolean;
  type: 'banner' | 'popup' | 'sidebar';
  startDate: string;
  endDate: string;
}

interface AdvertisementBannerProps {
  ads: Advertisement[];
  onAdClick?: (ad: Advertisement) => void;
  autoPlayInterval?: number;
}

export function AdvertisementBanner({ ads, onAdClick, autoPlayInterval = 5000 }: AdvertisementBannerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  const activeBanners = ads.filter(ad => ad.type === 'banner' && ad.active);

  useEffect(() => {
    if (!isAutoPlay || activeBanners.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % activeBanners.length);
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [isAutoPlay, activeBanners.length, autoPlayInterval]);

  if (activeBanners.length === 0) return null;

  const currentAd = activeBanners[currentIndex];

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + activeBanners.length) % activeBanners.length);
    setIsAutoPlay(false);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % activeBanners.length);
    setIsAutoPlay(false);
  };

  const handleAdClick = () => {
    if (onAdClick) {
      onAdClick(currentAd);
    }
  };

  return (
    <div className="relative rounded-2xl overflow-hidden shadow-xl mb-8 group">
      <div
        className="relative h-48 sm:h-64 md:h-80 transition-all duration-500"
        style={{ backgroundColor: currentAd.backgroundColor }}
      >
        {/* Background Image */}
        <img
          src={currentAd.image}
          alt={currentAd.title}
          className="w-full h-full object-cover"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />

        {/* Content */}
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="max-w-xl lg:max-w-2xl">
              <h2
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-2 sm:mb-4 drop-shadow-lg"
                style={{ color: currentAd.textColor }}
              >
                {currentAd.title}
              </h2>
              <p
                className="text-sm sm:text-base md:text-lg lg:text-xl mb-3 sm:mb-6 drop-shadow-lg line-clamp-2"
                style={{ color: currentAd.textColor }}
              >
                {currentAd.description}
              </p>
              <button
                onClick={handleAdClick}
                className="px-4 sm:px-6 lg:px-8 py-2 sm:py-3 bg-amber-600 hover:bg-amber-700 text-white text-sm sm:text-base rounded-lg transition-colors shadow-lg hover:shadow-xl transform hover:scale-105 duration-200"
              >
                {currentAd.ctaText}
              </button>
            </div>
          </div>
        </div>

        {/* Navigation Arrows */}
        {activeBanners.length > 1 && (
          <>
            <button
              onClick={handlePrevious}
              className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 p-1.5 sm:p-2 bg-white/20 hover:bg-white/40 backdrop-blur-sm rounded-full transition-all opacity-0 group-hover:opacity-100"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 p-1.5 sm:p-2 bg-white/20 hover:bg-white/40 backdrop-blur-sm rounded-full transition-all opacity-0 group-hover:opacity-100"
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </button>
          </>
        )}

        {/* Indicators */}
        {activeBanners.length > 1 && (
          <div className="absolute bottom-2 sm:bottom-4 left-1/2 transform -translate-x-1/2 flex gap-1.5 sm:gap-2">
            {activeBanners.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentIndex(index);
                  setIsAutoPlay(false);
                }}
                className={`h-1.5 sm:h-2 rounded-full transition-all ${
                  index === currentIndex
                    ? 'w-6 sm:w-8 bg-white'
                    : 'w-1.5 sm:w-2 bg-white/50 hover:bg-white/70'
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// Popup Advertisement Component
interface PopupAdProps {
  ad: Advertisement;
  onClose: () => void;
  onAdClick?: (ad: Advertisement) => void;
}

export function PopupAdvertisement({ ad, onClose, onAdClick }: PopupAdProps) {
  const handleAdClick = () => {
    if (onAdClick) {
      onAdClick(ad);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="relative max-w-2xl w-full bg-white rounded-2xl overflow-hidden shadow-2xl animate-scale-in">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 bg-black/20 hover:bg-black/40 rounded-full transition-colors z-10"
        >
          <X className="w-5 h-5 text-white" />
        </button>

        <div
          className="relative h-96"
          style={{ backgroundColor: ad.backgroundColor }}
        >
          <img
            src={ad.image}
            alt={ad.title}
            className="w-full h-full object-cover"
          />
          
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

          <div className="absolute bottom-0 left-0 right-0 p-8">
            <h2
              className="text-3xl sm:text-4xl mb-3 drop-shadow-lg"
              style={{ color: ad.textColor }}
            >
              {ad.title}
            </h2>
            <p
              className="text-lg mb-6 drop-shadow-lg"
              style={{ color: ad.textColor }}
            >
              {ad.description}
            </p>
            <button
              onClick={handleAdClick}
              className="px-8 py-3 bg-amber-600 hover:bg-amber-700 text-white rounded-lg transition-colors shadow-lg"
            >
              {ad.ctaText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Sidebar Advertisement Component
interface SidebarAdProps {
  ads: Advertisement[];
  onAdClick?: (ad: Advertisement) => void;
}

export function SidebarAdvertisements({ ads, onAdClick }: SidebarAdProps) {
  const sidebarAds = ads.filter(ad => ad.type === 'sidebar' && ad.active).slice(0, 3);

  if (sidebarAds.length === 0) return null;

  return (
    <div className="space-y-4">
      <h3 className="text-lg">Special Offers</h3>
      {sidebarAds.map((ad) => (
        <div
          key={ad.id}
          className="relative rounded-xl overflow-hidden shadow-md cursor-pointer hover:shadow-xl transition-shadow group"
          onClick={() => onAdClick?.(ad)}
          style={{ backgroundColor: ad.backgroundColor }}
        >
          <div className="relative h-48">
            <img
              src={ad.image}
              alt={ad.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <h4
                className="text-lg mb-1 drop-shadow"
                style={{ color: ad.textColor }}
              >
                {ad.title}
              </h4>
              <p
                className="text-sm mb-2 drop-shadow line-clamp-2"
                style={{ color: ad.textColor }}
              >
                {ad.description}
              </p>
              <span className="inline-block px-3 py-1 bg-amber-600 text-white text-sm rounded">
                {ad.ctaText}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}