import React, { useState } from 'react';
import { Package, Users, ShoppingBag, DollarSign, ChartLine, Bell, Settings, LogOut, BarChart3, Store } from 'lucide-react';
import { InventoryManagement } from './InventoryManagement';
import { OrderManagement } from './OrderManagement';
import { CustomerManagement } from './CustomerManagement';
import { Notifications } from './Notifications';
import { DashboardStats } from './DashboardStats';
import { Reports } from './Reports';
import { VendorManagement, Vendor } from './VendorManagement';
import { Product } from './ProductCard';
import { OrderDetails } from './CheckoutForm';

interface AdminDashboardProps {
  products: Product[];
  orders: OrderDetails[];
  vendors: Vendor[];
  onUpdateProduct: (product: Product) => void;
  onAddProduct: (product: Product) => void;
  onDeleteProduct: (productId: string) => void;
  onUpdateOrderStatus: (orderId: string, status: string) => void;
  onAddVendor: (vendor: Vendor) => void;
  onUpdateVendor: (vendor: Vendor) => void;
  onDeleteVendor: (vendorId: string) => void;
  onLogout: () => void;
}

type TabType = 'dashboard' | 'inventory' | 'orders' | 'customers' | 'vendors' | 'reports' | 'notifications';

export function AdminDashboard({
  products,
  orders,
  vendors,
  onUpdateProduct,
  onAddProduct,
  onDeleteProduct,
  onUpdateOrderStatus,
  onAddVendor,
  onUpdateVendor,
  onDeleteVendor,
  onLogout,
}: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');

  const tabs = [
    { id: 'dashboard' as TabType, name: 'Dashboard', icon: ChartLine },
    { id: 'inventory' as TabType, name: 'Inventory', icon: Package },
    { id: 'orders' as TabType, name: 'Orders', icon: ShoppingBag },
    { id: 'customers' as TabType, name: 'Customers', icon: Users },
    { id: 'vendors' as TabType, name: 'Vendors', icon: Store },
    { id: 'reports' as TabType, name: 'Reports', icon: BarChart3 },
    { id: 'notifications' as TabType, name: 'Notifications', icon: Bell },
  ];

  const customers = Array.from(new Set(orders.map(o => o.email))).map((email, index) => {
    const customerOrders = orders.filter(o => o.email === email);
    const totalSpent = customerOrders.reduce((sum, order) => sum + order.total, 0);
    return {
      id: `customer-${index}`,
      name: customerOrders[0]?.customerName || 'Unknown',
      email,
      phone: customerOrders[0]?.phone || '',
      totalOrders: customerOrders.length,
      totalSpent,
      lastOrder: customerOrders[customerOrders.length - 1]?.orderDate,
    };
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="fixed left-0 top-0 h-full w-64 bg-amber-900 text-white p-6 hidden lg:block">
        <div className="mb-8">
          <h1 className="text-2xl mb-2">Admin Panel</h1>
          <p className="text-sm text-amber-200">Premium Dry Fruits</p>
        </div>
        
        <nav className="space-y-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  activeTab === tab.id
                    ? 'bg-amber-700'
                    : 'hover:bg-amber-800'
                }`}
              >
                <Icon className="w-5 h-5" />
                {tab.name}
              </button>
            );
          })}
        </nav>

        <button
          onClick={onLogout}
          className="absolute bottom-6 left-6 right-6 flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-amber-800 transition-colors"
        >
          <LogOut className="w-5 h-5" />
          Logout
        </button>
      </div>

      {/* Mobile Header */}
      <div className="lg:hidden bg-amber-900 text-white p-4">
        <h1 className="text-xl">Admin Panel</h1>
      </div>

      {/* Main Content */}
      <div className="lg:ml-64">
        <div className="p-4 lg:p-8">
          {/* Mobile Tabs */}
          <div className="lg:hidden mb-6 overflow-x-auto">
            <div className="flex gap-2 min-w-max">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap ${
                      activeTab === tab.id
                        ? 'bg-amber-600 text-white'
                        : 'bg-white text-gray-700'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {tab.name}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Tab Content */}
          {activeTab === 'dashboard' && <DashboardStats products={products} orders={orders} />}
          {activeTab === 'inventory' && (
            <InventoryManagement
              products={products}
              onUpdateProduct={onUpdateProduct}
              onAddProduct={onAddProduct}
              onDeleteProduct={onDeleteProduct}
            />
          )}
          {activeTab === 'orders' && (
            <OrderManagement
              orders={orders}
              onUpdateOrderStatus={onUpdateOrderStatus}
            />
          )}
          {activeTab === 'customers' && <CustomerManagement customers={customers} />}
          {activeTab === 'vendors' && (
            <VendorManagement
              vendors={vendors}
              products={products}
              onAddVendor={onAddVendor}
              onUpdateVendor={onUpdateVendor}
              onDeleteVendor={onDeleteVendor}
            />
          )}
          {activeTab === 'reports' && <Reports orders={orders} products={products} />}
          {activeTab === 'notifications' && <Notifications orders={orders} products={products} />}
        </div>
      </div>
    </div>
  );
}