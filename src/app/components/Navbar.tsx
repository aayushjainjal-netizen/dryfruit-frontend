import { ShoppingCart, Menu, X, User, LogOut, Heart } from 'lucide-react';
import { Customer } from './AuthModal';

interface NavbarProps {
  cartItemsCount: number;
  wishlistCount?: number;
  onCartClick: () => void;
  onWishlistClick?: () => void;
  onLoginClick: () => void;
  onAccountClick?: () => void;
  onLogoutClick?: () => void;
  isAdmin?: boolean;
  customer?: Customer | null;
}

export function Navbar({ 
  cartItemsCount, 
  wishlistCount = 0,
  onCartClick, 
  onWishlistClick,
  onLoginClick, 
  onAccountClick,
  onLogoutClick,
  isAdmin = false,
  customer 
}: NavbarProps) {
  return (
    <nav className="bg-amber-800 text-white sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <Package className="w-8 h-8" />
            <h1 className="text-xl sm:text-2xl">Premium Dry Fruits</h1>
          </div>
          
          <div className="flex items-center gap-4">
            {!isAdmin && (
              <>
                <button
                  onClick={onWishlistClick}
                  className="relative p-2 hover:bg-amber-700 rounded-lg transition-colors"
                  aria-label="Wishlist"
                >
                  <Heart className="w-6 h-6" />
                  {wishlistCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {wishlistCount}
                    </span>
                  )}
                </button>
                <button
                  onClick={onCartClick}
                  className="relative p-2 hover:bg-amber-700 rounded-lg transition-colors"
                  aria-label="Shopping cart"
                >
                  <ShoppingCart className="w-6 h-6" />
                  {cartItemsCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {cartItemsCount}
                    </span>
                  )}
                </button>
              </>
            )}
            
            {customer && !isAdmin ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={onAccountClick}
                  className="flex items-center gap-2 px-4 py-2 bg-amber-700 hover:bg-amber-600 rounded-lg transition-colors"
                >
                  <User className="w-5 h-5" />
                  <span className="hidden sm:inline">{customer.name.split(' ')[0]}</span>
                </button>
                <button
                  onClick={onLogoutClick}
                  className="p-2 hover:bg-amber-700 rounded-lg transition-colors"
                  aria-label="Logout"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <button
                onClick={onLoginClick}
                className="flex items-center gap-2 px-4 py-2 bg-amber-700 hover:bg-amber-600 rounded-lg transition-colors"
              >
                <User className="w-5 h-5" />
                <span className="hidden sm:inline">{isAdmin ? 'Admin Panel' : 'Login'}</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

function Package({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/>
      <path d="m3.3 7 8.7 5 8.7-5"/>
      <path d="M12 22V12"/>
    </svg>
  );
}