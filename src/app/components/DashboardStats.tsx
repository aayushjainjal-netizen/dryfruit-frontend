import React from 'react';
import { DollarSign, ShoppingBag, Users, Package, TrendingUp, TrendingDown } from 'lucide-react';
import { Product } from './ProductCard';
import { OrderDetails } from './CheckoutForm';

interface DashboardStatsProps {
  products: Product[];
  orders: OrderDetails[];
}

export function DashboardStats({ products, orders }: DashboardStatsProps) {
  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
  const totalOrders = orders.length;
  const totalCustomers = new Set(orders.map(o => o.email)).size;
  const lowStockProducts = products.filter(p => p.stock < 10).length;

  const stats = [
    {
      name: 'Total Revenue',
      value: `₹${totalRevenue.toFixed(2)}`,
      change: '+12.5%',
      trend: 'up' as const,
      icon: DollarSign,
      color: 'bg-green-500',
    },
    {
      name: 'Total Orders',
      value: totalOrders.toString(),
      change: '+8.2%',
      trend: 'up' as const,
      icon: ShoppingBag,
      color: 'bg-blue-500',
    },
    {
      name: 'Customers',
      value: totalCustomers.toString(),
      change: '+15.3%',
      trend: 'up' as const,
      icon: Users,
      color: 'bg-purple-500',
    },
    {
      name: 'Low Stock Items',
      value: lowStockProducts.toString(),
      change: '-3.1%',
      trend: 'down' as const,
      icon: Package,
      color: 'bg-orange-500',
    },
  ];

  const recentOrders = orders.slice(-5).reverse();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl mb-6">Dashboard Overview</h2>
        
        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat) => {
            const Icon = stat.icon;
            const TrendIcon = stat.trend === 'up' ? TrendingUp : TrendingDown;
            return (
              <div key={stat.name} className="bg-white p-6 rounded-xl shadow-md">
                <div className="flex items-center justify-between mb-4">
                  <div className={`${stat.color} p-3 rounded-lg`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className={`flex items-center gap-1 text-sm ${
                    stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    <TrendIcon className="w-4 h-4" />
                    {stat.change}
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-1">{stat.name}</p>
                <p className="text-2xl">{stat.value}</p>
              </div>
            );
          })}
        </div>

        {/* Recent Orders */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="mb-4">Recent Orders</h3>
          {recentOrders.length === 0 ? (
            <p className="text-gray-500">No orders yet</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b">
                  <tr className="text-left">
                    <th className="pb-3">Customer</th>
                    <th className="pb-3">Items</th>
                    <th className="pb-3">Total</th>
                    <th className="pb-3">Date</th>
                    <th className="pb-3">Payment</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((order, index) => (
                    <tr key={index} className="border-b last:border-0">
                      <td className="py-3">
                        <div>
                          <p>{order.customerName}</p>
                          <p className="text-sm text-gray-600">{order.email}</p>
                        </div>
                      </td>
                      <td className="py-3">
                        {order.items.reduce((sum, item) => sum + item.quantity, 0)} items
                      </td>
                      <td className="py-3 text-amber-700">₹{order.total.toFixed(2)}</td>
                      <td className="py-3 text-sm">
                        {new Date(order.orderDate).toLocaleDateString()}
                      </td>
                      <td className="py-3">
                        <span className={`px-2 py-1 rounded text-xs ${
                          order.paymentMethod === 'card'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-blue-100 text-blue-700'
                        }`}>
                          {order.paymentMethod === 'card' ? 'Card' : 'COD'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}