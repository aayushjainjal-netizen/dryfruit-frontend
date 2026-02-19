import React, { useEffect, useState } from "react";
import { Navbar } from "./components/Navbar";
import { ProductCard, Product } from "./components/ProductCard";
import { Cart, CartItem } from "./components/Cart";
import { CheckoutForm, OrderDetails } from "./components/CheckoutForm";
import { AdminDashboard } from "./components/AdminDashboard";
import { ProductDetail } from "./components/ProductDetail";
import { HorizontalProductSection } from "./components/HorizontalProductSection";
import { AuthModal, Customer } from "./components/AuthModal";
import { CustomerAccount } from "./components/CustomerAccount";
import { Wishlist } from "./components/Wishlist";
import { OccasionSelector, Occasion } from "./components/OccasionSelector";
import { OccasionGifts } from "./components/OccasionGifts";
import { GiftVoucher, Voucher } from "./components/GiftVoucher";
import { AdvertisementBanner, PopupAdvertisement, Advertisement } from "./components/AdvertisementBanner";
import { ImportantDatesReminder } from "./components/ImportantDatesReminder";
import { Vendor } from "./components/VendorManagement";
import { Search, ListFilter, Gift as GiftIcon } from "lucide-react";
import { toast, Toaster } from "sonner";


export default function App() {
  // View states
  const [isAdmin, setIsAdmin] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [showAccount, setShowAccount] = useState(false);
  const [showWishlist, setShowWishlist] = useState(false);
  const [showGiftVoucher, setShowGiftVoucher] = useState(false);
  const [showPopupAd, setShowPopupAd] = useState(false);
  const [selectedOccasion, setSelectedOccasion] = useState<Occasion | null>(null);
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [wishlist, setWishlist] = useState<Product[]>([]);
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      setCustomer({
        id: "saved-user",
        name: "User",
        email: "Logged User",
        phone: "",
        address: "",
        joinDate: new Date().toISOString(),
        totalOrders: 0,
        totalSpent: 0,
        importantDates: [],
      });
    }
  }, []);

  // Initial Products
  const [products, setProducts] = useState<Product[]>([
    {
      id: "1",
      name: "Premium Almonds",
      price: 12.99,
      image: "https://images.unsplash.com/photo-1577944072511-60bb44c679a2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkcnklMjBmcnVpdHMlMjBhbG1vbmRzJTIwbnV0c3xlbnwxfHx8fDE3NjYxODI2ODh8MA&ixlib=rb-4.1.0&q=80&w=1080",
      description: "Fresh, crunchy California almonds packed with nutrients and natural goodness.",
      stock: 45,
      category: "Nuts",
      rating: 4.8,
      unit: "kg",
      tags: ["trending", "premium"],
    },
    {
      id: "2",
      name: "Cashew Nuts",
      price: 15.99,
      image: "https://images.unsplash.com/photo-1726771517475-e7acdd34cd8a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXNoZXclMjBudXRzfGVufDF8fHx8MTc2NjE4MjQ4N3ww&ixlib=rb-4.1.0&q=80&w=1080",
      description: "Premium quality cashews, buttery and delicious, perfect for snacking.",
      stock: 32,
      category: "Nuts",
      rating: 4.9,
      unit: "kg",
      tags: ["bestseller", "premium"],
    },
    {
      id: "3",
      name: "Medjool Dates",
      price: 9.99,
      image: "https://images.unsplash.com/photo-1674066253665-4d2553a3bcb8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXRlcyUyMGRyaWVkJTIwZnJ1aXR8ZW58MXx8fHwxNzY2MTgyNjg4fDA&ixlib=rb-4.1.0&q=80&w=1080",
      description: "Sweet and juicy Medjool dates, naturally rich in energy and fiber.",
      stock: 8,
      category: "Dried Fruits",
      rating: 4.7,
      unit: "kg",
      tags: ["seasonal", "offer"],
      discount: 20,
    },
    {
      id: "4",
      name: "Walnuts",
      price: 13.99,
      image: "https://images.unsplash.com/photo-1605525483148-8fb743b620da?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YWxudXRzJTIwZm9vZHxlbnwxfHx8fDE3NjYxODI2ODl8MA&ixlib=rb-4.1.0&q=80&w=1080",
      description: "Omega-3 rich walnuts, perfect for a healthy brain and heart.",
      stock: 28,
      category: "Nuts",
      rating: 4.6,
      unit: "kg",
      tags: ["trending"],
    },
    {
      id: "5",
      name: "Pistachio",
      price: 18.99,
      image: "https://images.unsplash.com/photo-1704079662049-d00890d21a69?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaXN0YWNoaW9zJTIwbnV0c3xlbnwxfHx8fDE3NjYxMjk3MzV8MA&ixlib=rb-4.1.0&q=80&w=1080",
      description: "Delicious roasted pistachios, lightly salted for the perfect snack.",
      stock: 15,
      category: "Nuts",
      rating: 4.8,
      unit: "kg",
      tags: ["premium", "bestseller"],
    },
    {
      id: "6",
      name: "Golden Raisins",
      price: 7.99,
      image: "https://images.unsplash.com/photo-1598111388756-b2285cca0458?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyYWlzaW5zJTIwZHJpZWR8ZW58MXx8fHwxNzY2MTgyNDg4fDA&ixlib=rb-4.1.0&q=80&w=1080",
      description: "Sweet golden raisins, sun-dried to perfection for maximum flavor.",
      stock: 50,
      category: "Dried Fruits",
      rating: 4.5,
      unit: "kg",
      tags: ["offer"],
      discount: 15,
    },
    {
      id: "7",
      name: "Brazilian Nuts",
      price: 16.99,
      image: "https://images.unsplash.com/photo-1608797178974-15b35a64ede9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicmF6aWwlMjBudXRzfGVufDF8fHx8MTc2NjE4MjY4OXww&ixlib=rb-4.1.0&q=80&w=1080",
      description: "Rich in selenium, our Brazilian nuts are a powerhouse of nutrition.",
      stock: 22,
      category: "Nuts",
      rating: 4.7,
      unit: "kg",
      tags: ["newarrival", "premium"],
    },
    {
      id: "8",
      name: "Dried Apricots",
      price: 11.99,
      image: "https://images.unsplash.com/photo-1589749635962-c7ecee7b2bba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkcmllZCUyMGFwcmljb3RzfGVufDF8fHx8MTc2NjE4MjY4OXww&ixlib=rb-4.1.0&q=80&w=1080",
      description: "Sun-dried apricots bursting with natural sweetness and vitamins.",
      stock: 35,
      category: "Dried Fruits",
      rating: 4.6,
      unit: "kg",
      tags: ["seasonal", "trending"],
    },
    {
      id: "9",
      name: "Dried Figs",
      price: 10.99,
      image: "https://images.unsplash.com/photo-1628599482104-008cb9f0bd74?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkcmllZCUyMGZpZ3N8ZW58MXx8fHwxNzY2MTgyNjg5fDA&ixlib=rb-4.1.0&q=80&w=1080",
      description: "Naturally sweet dried figs, perfect for desserts or healthy snacking.",
      stock: 40,
      category: "Dried Fruits",
      rating: 4.5,
      unit: "kg",
      tags: ["seasonal"],
    },
    {
      id: "10",
      name: "Macadamia Nuts",
      price: 24.99,
      image: "https://images.unsplash.com/photo-1633883585802-cb5a1c7ecf9f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWNhZGFtaWElMjBudXRzfGVufDF8fHx8MTc2NjE4MjY5MHww&ixlib=rb-4.1.0&q=80&w=1080",
      description: "Luxurious macadamia nuts with a buttery texture and rich flavor.",
      stock: 12,
      category: "Nuts",
      rating: 4.9,
      unit: "kg",
      tags: ["premium", "newarrival"],
    },
    {
      id: "11",
      name: "Dried Cranberries",
      price: 9.49,
      image: "https://images.unsplash.com/photo-1605028069340-ceb5ad4d7b11?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkcmllZCUyMGNyYW5iZXJyaWVzfGVufDF8fHx8MTc2NjE4MjY5MHww&ixlib=rb-4.1.0&q=80&w=1080",
      description: "Tart and sweet dried cranberries, packed with antioxidants.",
      stock: 48,
      category: "Dried Fruits",
      rating: 4.4,
      unit: "kg",
      tags: ["offer"],
      discount: 25,
    },
    {
      id: "12",
      name: "Hazelnuts",
      price: 14.49,
      image: "https://images.unsplash.com/photo-1619546952812-520e98064a52?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXplbG51dHN8ZW58MXx8fHwxNzY2MTgyNjkwfDA&ixlib=rb-4.1.0&q=80&w=1080",
      description: "Premium roasted hazelnuts with a rich, chocolatey flavor.",
      stock: 30,
      category: "Nuts",
      rating: 4.7,
      unit: "kg",
      tags: ["bestseller"],
    },
    {
      id: "13",
      name: "Dried Mango",
      price: 12.49,
      image: "https://images.unsplash.com/photo-1591206369811-4eeb2f03bc95?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkcmllZCUyMG1hbmdvfGVufDF8fHx8MTc2NjE4MjY5MHww&ixlib=rb-4.1.0&q=80&w=1080",
      description: "Tropical dried mango slices, naturally sweet and chewy.",
      stock: 25,
      category: "Dried Fruits",
      rating: 4.8,
      unit: "kg",
      tags: ["newarrival", "trending"],
    },
    {
      id: "14",
      name: "Pecans",
      price: 17.99,
      image: "https://images.unsplash.com/photo-1569288063643-5d29ad64fd0c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZWNhbiUyMG51dHN8ZW58MXx8fHwxNzY2MTgyNjkxfDA&ixlib=rb-4.1.0&q=80&w=1080",
      description: "Buttery pecans perfect for baking or enjoying as a premium snack.",
      stock: 20,
      category: "Nuts",
      rating: 4.6,
      unit: "kg",
      tags: ["premium"],
    },
    {
      id: "15",
      name: "Mixed Nuts Deluxe",
      price: 19.99,
      image: "https://images.unsplash.com/photo-1599599810769-bcde5a160d32?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaXhlZCUyMG51dHN8ZW58MXx8fHwxNzY2MTgyNjkxfDA&ixlib=rb-4.1.0&q=80&w=1080",
      description: "A premium blend of roasted almonds, cashews, and macadamias.",
      stock: 18,
      category: "Mixed",
      rating: 4.9,
      unit: "kg",
      tags: ["premium", "bestseller"],
    },
    {
      id: "16",
      name: "Dried Blueberries",
      price: 13.99,
      image: "https://images.unsplash.com/photo-1589542328379-0a0c6a2cb1ce?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibHVlYmVycmllcyUyMGRyaWVkfGVufDF8fHx8MTc2NjE4MjY5MXww&ixlib=rb-4.1.0&q=80&w=1080",
      description: "Antioxidant-rich dried blueberries with natural sweetness.",
      stock: 33,
      category: "Dried Fruits",
      rating: 4.7,
      unit: "kg",
      tags: ["offer", "trending"],
      discount: 10,
    },
  ]);

  const [cart, setCart] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<OrderDetails[]>([]);
  const [vouchers, setVouchers] = useState<Voucher[]>([]);
  const [vendors, setVendors] = useState<Vendor[]>([
    {
      id: '1',
      name: 'Fresh Harvest Suppliers',
      email: 'contact@freshharvest.com',
      phone: '+1 234-567-8900',
      address: '123 Market Street, California, USA',
      businessName: 'Fresh Harvest Inc.',
      gstNumber: 'GST123456789',
      commissionRate: 12,
      status: 'active',
      joinDate: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000).toISOString(),
      rating: 4.8,
      totalProducts: 5,
      totalSales: 12450.50,
      productsSupplied: ['1', '4', '8'],
      contactPerson: 'John Smith',
      description: 'Premium supplier of California almonds and nuts',
    },
    {
      id: '2',
      name: 'Global Dry Fruits',
      email: 'info@globaldryfruits.com',
      phone: '+1 234-567-8901',
      address: '456 Trading Plaza, New York, USA',
      businessName: 'Global Dry Fruits Ltd.',
      gstNumber: 'GST987654321',
      commissionRate: 10,
      status: 'active',
      joinDate: new Date(Date.now() - 200 * 24 * 60 * 60 * 1000).toISOString(),
      rating: 4.6,
      totalProducts: 4,
      totalSales: 8920.75,
      productsSupplied: ['2', '5', '10'],
      contactPerson: 'Sarah Johnson',
      description: 'Trusted source for exotic nuts and premium cashews',
    },
    {
      id: '3',
      name: 'Desert Dates Co.',
      email: 'sales@desertdates.com',
      phone: '+1 234-567-8902',
      address: '789 Date Palm Avenue, Arizona, USA',
      businessName: 'Desert Dates Corporation',
      gstNumber: 'GST456789123',
      commissionRate: 15,
      status: 'pending',
      joinDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
      rating: 0,
      totalProducts: 0,
      totalSales: 0,
      productsSupplied: [],
      contactPerson: 'Ahmed Al-Rashid',
      description: 'Specializing in premium Medjool dates and dried fruits',
    },
  ]);
  const [advertisements, setAdvertisements] = useState<Advertisement[]>([
    {
      id: '1',
      title: 'Festival Special - Save Big!',
      description: 'Get up to 30% OFF on premium dry fruits this festive season',
      image: 'https://images.unsplash.com/photo-1577944072511-60bb44c679a2?w=1200',
      ctaText: 'Shop Now',
      backgroundColor: '#f59e0b',
      textColor: '#ffffff',
      active: true,
      type: 'banner',
      startDate: new Date().toISOString(),
      endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: '2',
      title: 'Gift Vouchers Available!',
      description: 'Send happiness with our digital gift vouchers - Perfect for any occasion',
      image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=1200',
      ctaText: 'Buy Gift Voucher',
      backgroundColor: '#8b5cf6',
      textColor: '#ffffff',
      active: true,
      type: 'banner',
      startDate: new Date().toISOString(),
      endDate: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString(),
    },
  ]);

  // Auth handlers
  const handleLogin = (newCustomer: Customer) => {
    setCustomer(newCustomer);
    setShowAuth(false);
    toast.success(`Welcome back, ${newCustomer.name}!`);
  };

  const handleAdminLogin = () => {
    setIsAdmin(true);
    setShowAuth(false);
    toast.success("Logged in as Admin");
  };

  const handleLogout = () => {
    setCustomer(null);
    setShowAccount(false);
    toast.info("Logged out successfully");
  };

  const handleUpdateProfile = (updatedCustomer: Customer) => {
    setCustomer(updatedCustomer);
    toast.success("Profile updated successfully!");
  };

  // Cart functions
  const handleAddToCart = (product: Product, quantity: number) => {
    const existingItem = cart.find((item) => item.product.id === product.id);

    if (existingItem) {
      setCart(
        cart.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      );
    } else {
      setCart([...cart, { product, quantity }]);
    }

    toast.success(`${product.name} added to cart!`);
  };

  const handleUpdateCartQuantity = (productId: string, quantity: number) => {
    if (quantity === 0) {
      handleRemoveFromCart(productId);
      return;
    }
    setCart(
      cart.map((item) => (item.product.id === productId ? { ...item, quantity } : item))
    );
  };

  const handleRemoveFromCart = (productId: string) => {
    setCart(cart.filter((item) => item.product.id !== productId));
    toast.info("Item removed from cart");
  };

  const handleCheckout = () => {
    setShowCart(false);
    setShowCheckout(true);
  };

  const handleSubmitOrder = (orderDetails: OrderDetails) => {
    setOrders([...orders, orderDetails]);

    // Update product stock
    orderDetails.items.forEach((item) => {
      setProducts(
        products.map((p) =>
          p.id === item.product.id ? { ...p, stock: p.stock - item.quantity } : p
        )
      );
    });

    setCart([]);
    setShowCheckout(false);
    toast.success("Order placed successfully!");
  };

  // Wishlist handlers
  const handleToggleWishlist = (product: Product) => {
    const isInWishlist = wishlist.some(p => p.id === product.id);
    if (isInWishlist) {
      setWishlist(wishlist.filter(p => p.id !== product.id));
      toast.info(`${product.name} removed from wishlist`);
    } else {
      setWishlist([...wishlist, product]);
      toast.success(`${product.name} added to wishlist!`);
    }
  };

  const handleRemoveFromWishlist = (productId: string) => {
    setWishlist(wishlist.filter(p => p.id !== productId));
    toast.info("Item removed from wishlist");
  };

  // Admin functions
  const handleUpdateProduct = (product: Product) => {
    setProducts(products.map((p) => (p.id === product.id ? product : p)));
    toast.success("Product updated successfully!");
  };

  const handleAddProduct = (product: Product) => {
    setProducts([...products, product]);
    toast.success("Product added successfully!");
  };

  const handleDeleteProduct = (productId: string) => {
    setProducts(products.filter((p) => p.id !== productId));
    toast.success("Product deleted successfully!");
  };

  const handleUpdateOrderStatus = (orderId: string, status: string) => {
    setOrders(
      orders.map((order) => (order.id === orderId ? { ...order, status } : order))
    );
    toast.success(`Order status updated to: ${status}`);
  };

  // Voucher handlers
  const handlePurchaseVoucher = (voucherData: Omit<Voucher, 'id' | 'code' | 'purchaseDate' | 'expiryDate' | 'isUsed' | 'usedAmount'>) => {
    const newVoucher: Voucher = {
      ...voucherData,
      id: Math.random().toString(36).substr(2, 9),
      code: `GV${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      purchaseDate: new Date().toISOString(),
      expiryDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
      isUsed: false,
      usedAmount: 0,
    };
    setVouchers([...vouchers, newVoucher]);
    setShowGiftVoucher(false);
    toast.success(`Gift voucher ${newVoucher.code} purchased successfully!`);
    toast.info(`Voucher sent to ${voucherData.recipientEmail}`);
  };

  // Vendor handlers
  const handleAddVendor = (vendor: Vendor) => {
    setVendors([...vendors, vendor]);
    toast.success('Vendor added successfully!');
  };

  const handleUpdateVendor = (vendor: Vendor) => {
    setVendors(vendors.map(v => v.id === vendor.id ? vendor : v));
    toast.success('Vendor updated successfully!');
  };

  const handleDeleteVendor = (vendorId: string) => {
    setVendors(vendors.filter(v => v.id !== vendorId));
    toast.success('Vendor deleted successfully!');
  };

  // Ad handlers
  const handleAdClick = (ad: Advertisement) => {
    if (ad.title.includes('Gift Voucher')) {
      setShowGiftVoucher(true);
    } else if (ad.title.includes('Occasion')) {
      // Scroll to occasion selector or open occasion modal
      toast.info('Check out our special occasion gifts!');
    } else {
      toast.info(`${ad.title} - ${ad.description}`);
    }
  };

  // Filter products
  const categories = ["all", ...Array.from(new Set(products.map((p) => p.category)))];
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Categorized product sections
  const trendingProducts = products.filter((p) => p.tags?.includes("trending"));
  const premiumProducts = products.filter((p) => p.tags?.includes("premium"));
  const offerProducts = products.filter((p) => p.tags?.includes("offer"));
  const seasonalProducts = products.filter((p) => p.tags?.includes("seasonal"));
  const bestsellerProducts = products.filter((p) => p.tags?.includes("bestseller"));
  const newArrivalProducts = products.filter((p) => p.tags?.includes("newarrival"));

  const isSearching = searchTerm !== "" || selectedCategory !== "all";

  const cartItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  // Render admin dashboard
  if (isAdmin) {
    return (
      <>
        <AdminDashboard
          products={products}
          orders={orders}
          vendors={vendors}
          onUpdateProduct={handleUpdateProduct}
          onAddProduct={handleAddProduct}
          onDeleteProduct={handleDeleteProduct}
          onUpdateOrderStatus={handleUpdateOrderStatus}
          onAddVendor={handleAddVendor}
          onUpdateVendor={handleUpdateVendor}
          onDeleteVendor={handleDeleteVendor}
          onLogout={() => setIsAdmin(false)}
        />
        <Toaster position="top-right" richColors />
      </>
    );
  }

  // Render customer account
  if (showAccount && customer) {
    return (
      <>
        <CustomerAccount
          customer={customer}
          orders={orders}
          onBack={() => setShowAccount(false)}
          onUpdateProfile={handleUpdateProfile}
        />
        <Toaster position="top-right" richColors />
      </>
    );
  }

  // Show product detail page
  if (selectedProduct) {
    return (
      <>
        <ProductDetail
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={handleAddToCart}
        />
        <Toaster position="top-right" richColors />
      </>
    );
  }

  // Main storefront
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50">
      <Navbar
        cartItemsCount={cartItemsCount}
        wishlistCount={wishlist.length}
        onCartClick={() => setShowCart(true)}
        onWishlistClick={() => setShowWishlist(true)}
        onLoginClick={() => setShowAuth(true)}
        onAccountClick={() => setShowAccount(true)}
        onLogoutClick={handleLogout}
        customer={customer}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Advertisement Banner Carousel */}
        <AdvertisementBanner
          ads={advertisements}
          onAdClick={handleAdClick}
          autoPlayInterval={5000}
        />

        {/* Important Dates Reminder - Only shown when customer is logged in */}
        {customer && customer.importantDates && customer.importantDates.length > 0 && (
          <ImportantDatesReminder importantDates={customer.importantDates} />
        )}

        {/* Gift Voucher CTA */}
        <div className="mb-8">
          <button
            onClick={() => setShowGiftVoucher(true)}
            className="w-full bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 hover:from-purple-700 hover:via-pink-600 hover:to-orange-500 text-white py-3 sm:py-4 px-4 sm:px-6 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-[1.02] flex items-center justify-center gap-2 sm:gap-3"
          >
            <GiftIcon className="w-5 h-5 sm:w-6 sm:h-6" />
            <span className="text-base sm:text-lg">Purchase Gift Vouchers - The Perfect Gift!</span>
          </button>
        </div>

        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl mb-4 text-amber-900">
            Premium Dry Fruits & Nuts
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our selection of handpicked, premium quality dry fruits and nuts. Fresh,
            nutritious, and delivered to your doorstep.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-white shadow-sm"
            />
          </div>
          <div className="flex items-center gap-2">
            <ListFilter className="w-5 h-5 text-gray-400" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-white shadow-sm"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category === "all" ? "All Categories" : category}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Products Grid or Horizontal Sections */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No products found</p>
          </div>
        ) : isSearching ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
                onProductClick={(product) => setSelectedProduct(product)}
              />
            ))}
          </div>
        ) : (
          <>
            {/* Occasion Selector */}
            <OccasionSelector
              onSelectOccasion={(occasion) => setSelectedOccasion(occasion)}
            />

            {/* Horizontal Product Sections */}
            <HorizontalProductSection
              title="Flash Deals 🔥"
              subtitle="Limited time offers"
              products={offerProducts}
              onAddToCart={handleAddToCart}
              onProductClick={(product) => setSelectedProduct(product)}
              badge={{ text: "Up to 25% OFF", color: "bg-red-500 text-white" }}
            />

            <HorizontalProductSection
              title="Trending Now ⚡"
              subtitle="What's hot right now"
              products={trendingProducts}
              onAddToCart={handleAddToCart}
              onProductClick={(product) => setSelectedProduct(product)}
              badge={{ text: "Popular", color: "bg-purple-500 text-white" }}
            />

            <HorizontalProductSection
              title="Best Sellers 🏆"
              subtitle="Customer favorites"
              products={bestsellerProducts}
              onAddToCart={handleAddToCart}
              onProductClick={(product) => setSelectedProduct(product)}
              badge={{ text: "Top Rated", color: "bg-amber-500 text-white" }}
            />

            <HorizontalProductSection
              title="Seasonal Specials 🍂"
              subtitle="Fresh seasonal picks"
              products={seasonalProducts}
              onAddToCart={handleAddToCart}
              onProductClick={(product) => setSelectedProduct(product)}
              badge={{ text: "Seasonal", color: "bg-green-500 text-white" }}
            />

            <HorizontalProductSection
              title="New Arrivals ✨"
              subtitle="Just added to our collection"
              products={newArrivalProducts}
              onAddToCart={handleAddToCart}
              onProductClick={(product) => setSelectedProduct(product)}
              badge={{ text: "New", color: "bg-blue-500 text-white" }}
            />

            <HorizontalProductSection
              title="Premium Selection 💎"
              subtitle="Luxurious choices for connoisseurs"
              products={premiumProducts}
              onAddToCart={handleAddToCart}
              onProductClick={(product) => setSelectedProduct(product)}
              badge={{
                text: "Premium",
                color: "bg-gradient-to-r from-amber-400 to-amber-600 text-white",
              }}
            />
          </>
        )}

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
          <div className="bg-white p-6 rounded-xl shadow-md text-center">
            <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-amber-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="mb-2">Premium Quality</h3>
            <p className="text-sm text-gray-600">
              Handpicked and carefully selected for the highest quality standards
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md text-center">
            <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-amber-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="mb-2">Best Prices</h3>
            <p className="text-sm text-gray-600">
              Competitive pricing with no compromise on quality
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md text-center">
            <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-amber-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
            <h3 className="mb-2">Fast Delivery</h3>
            <p className="text-sm text-gray-600">
              Quick and reliable delivery right to your doorstep
            </p>
          </div>
        </div>
      </main>

      {/* Cart */}
      {showCart && (
        <Cart
          items={cart}
          onUpdateQuantity={handleUpdateCartQuantity}
          onRemoveItem={handleRemoveFromCart}
          onClose={() => setShowCart(false)}
          onCheckout={handleCheckout}
        />
      )}

      {/* Checkout */}
      {showCheckout && (
        <CheckoutForm
          items={cart}
          total={cartTotal}
          onClose={() => setShowCheckout(false)}
          onSubmitOrder={handleSubmitOrder}
        />
      )}

      {/* Auth Modal */}
      {showAuth && (
        <AuthModal
          onClose={() => setShowAuth(false)}
          onLogin={handleLogin}
          onAdminLogin={handleAdminLogin}
        />
      )}

      {/* Occasion Gifts Modal */}
      {selectedOccasion && (
        <OccasionGifts
          occasion={selectedOccasion}
          products={products}
          onClose={() => setSelectedOccasion(null)}
          onAddToCart={handleAddToCart}
          onProductClick={(product) => {
            setSelectedOccasion(null);
            setSelectedProduct(product);
          }}
        />
      )}

      {/* Gift Voucher Modal */}
      {showGiftVoucher && (
        <GiftVoucher
          onClose={() => setShowGiftVoucher(false)}
          onPurchase={handlePurchaseVoucher}
        />
      )}

      {/* Wishlist */}
      {showWishlist && (
        <Wishlist
          wishlist={wishlist}
          onClose={() => setShowWishlist(false)}
          onRemoveItem={handleRemoveFromWishlist}
          onAddToCart={handleAddToCart}
          onProductClick={(product) => {
            setShowWishlist(false);
            setSelectedProduct(product);
          }}
        />
      )}

      <Toaster position="top-right" richColors />
    </div>
  );
}