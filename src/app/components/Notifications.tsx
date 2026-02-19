import React from 'react';
import { Bell, Package, CircleAlert, CircleCheck } from 'lucide-react';
import { OrderDetails } from './CheckoutForm';
import { Product } from './ProductCard';

interface NotificationsProps {
  orders: OrderDetails[];
  products: Product[];
}

interface Notification {
  id: string;
  type: 'order' | 'stock' | 'info';
  title: string;
  message: string;
  time: string;
  read: boolean;
}

export function Notifications({ orders, products }: NotificationsProps) {
  const notifications: Notification[] = [
    // New orders
    ...orders.slice(-5).map((order, index) => ({
      id: `order-${index}`,
      type: 'order' as const,
      title: 'New Order Received',
      message: `Order from ${order.customerName} - ₹${order.total.toFixed(2)}`,
      time: new Date(order.orderDate).toLocaleString(),
      read: index > 2,
    })),
    // Low stock alerts
    ...products
      .filter(p => p.stock < 10 && p.stock > 0)
      .map((product, index) => ({
        id: `stock-${index}`,
        type: 'stock' as const,
        title: 'Low Stock Alert',
        message: `${product.name} - Only ${product.stock} units remaining`,
        time: new Date().toLocaleString(),
        read: false,
      })),
    // Out of stock
    ...products
      .filter(p => p.stock === 0)
      .map((product, index) => ({
        id: `outofstock-${index}`,
        type: 'stock' as const,
        title: 'Out of Stock',
        message: `${product.name} is out of stock`,
        time: new Date().toLocaleString(),
        read: false,
      })),
  ];

  const unreadCount = notifications.filter(n => !n.read).length;

  const getIcon = (type: string) => {
    switch (type) {
      case 'order':
        return <CircleCheck className="w-5 h-5 text-green-600" />;
      case 'stock':
        return <CircleAlert className="w-5 h-5 text-orange-600" />;
      default:
        return <Bell className="w-5 h-5 text-blue-600" />;
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl">Notifications</h2>
        {unreadCount > 0 && (
          <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm">
            {unreadCount} unread
          </span>
        )}
      </div>

      {notifications.length === 0 ? (
        <div className="bg-white rounded-xl shadow-md p-12 text-center">
          <Bell className="w-16 h-16 mx-auto mb-4 text-gray-300" />
          <p className="text-gray-500">No notifications</p>
        </div>
      ) : (
        <div className="space-y-3">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={`bg-white rounded-xl shadow-md p-4 ${
                !notification.read ? 'border-l-4 border-amber-500' : ''
              }`}
            >
              <div className="flex items-start gap-4">
                <div className="mt-1">{getIcon(notification.type)}</div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-1">
                    <h3 className={!notification.read ? '' : 'text-gray-600'}>
                      {notification.title}
                    </h3>
                    {!notification.read && (
                      <span className="bg-amber-500 w-2 h-2 rounded-full"></span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{notification.message}</p>
                  <p className="text-xs text-gray-500">{notification.time}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
        <div className="bg-white p-6 rounded-xl shadow-md">
          <div className="flex items-center gap-3 mb-2">
            <Package className="w-5 h-5 text-blue-600" />
            <p className="text-sm text-gray-600">New Orders</p>
          </div>
          <p className="text-2xl text-blue-600">{orders.length}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md">
          <div className="flex items-center gap-3 mb-2">
            <CircleAlert className="w-5 h-5 text-orange-600" />
            <p className="text-sm text-gray-600">Low Stock Items</p>
          </div>
          <p className="text-2xl text-orange-600">
            {products.filter(p => p.stock < 10).length}
          </p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md">
          <div className="flex items-center gap-3 mb-2">
            <CircleAlert className="w-5 h-5 text-red-600" />
            <p className="text-sm text-gray-600">Out of Stock</p>
          </div>
          <p className="text-2xl text-red-600">
            {products.filter(p => p.stock === 0).length}
          </p>
        </div>
      </div>
    </div>
  );
}