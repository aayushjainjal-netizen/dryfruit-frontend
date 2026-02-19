import React, { useState } from 'react';
import { Product } from './ProductCard';
import { OrderDetails } from './CheckoutForm';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { Download, TrendingUp, DollarSign, Package, ShoppingCart, Calendar } from 'lucide-react';

interface ReportsProps {
  products: Product[];
  orders: OrderDetails[];
}

export function Reports({ products, orders }: ReportsProps) {
  const [timeRange, setTimeRange] = useState<'7days' | '30days' | '90days' | 'all'>('30days');

  // Calculate metrics
  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
  const totalOrders = orders.length;
  const avgOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;
  const totalProducts = products.length;
  const lowStockProducts = products.filter(p => p.stock < 10).length;

  // Sales by category
  const categorySales = products.reduce((acc, product) => {
    const category = product.category;
    const sales = orders.reduce((sum, order) => {
      const orderItem = order.items.find(item => item.product.id === product.id);
      return sum + (orderItem ? orderItem.quantity * product.price : 0);
    }, 0);
    
    acc[category] = (acc[category] || 0) + sales;
    return acc;
  }, {} as Record<string, number>);

  const categoryData = Object.entries(categorySales).map(([name, value]) => ({
    name,
    value: Math.round(value * 100) / 100,
  }));

  // Top selling products
  const productSales = products.map(product => {
    const quantity = orders.reduce((sum, order) => {
      const orderItem = order.items.find(item => item.product.id === product.id);
      return sum + (orderItem ? orderItem.quantity : 0);
    }, 0);
    
    return {
      name: product.name,
      quantity,
      revenue: quantity * product.price,
    };
  }).sort((a, b) => b.revenue - a.revenue).slice(0, 10);

  // Revenue trend (mock data - in real app would be calculated from actual order dates)
  const revenueTrend = [
    { date: 'Week 1', revenue: 2400 },
    { date: 'Week 2', revenue: 3200 },
    { date: 'Week 3', revenue: 2800 },
    { date: 'Week 4', revenue: 3900 },
  ];

  // Order status distribution
  const statusCounts = orders.reduce((acc, order) => {
    acc[order.status] = (acc[order.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const statusData = Object.entries(statusCounts).map(([name, value]) => ({
    name,
    value,
  }));

  const COLORS = ['#f59e0b', '#10b981', '#3b82f6', '#8b5cf6', '#ef4444'];

  const handleExportReport = () => {
    const reportData = {
      generatedAt: new Date().toISOString(),
      summary: {
        totalRevenue,
        totalOrders,
        avgOrderValue,
        totalProducts,
        lowStockProducts,
      },
      categorySales,
      topProducts: productSales,
      orders,
    };

    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `report-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl text-gray-900">Reports & Analytics</h2>
          <p className="text-gray-600 mt-1">Comprehensive business insights and metrics</p>
        </div>
        <div className="flex gap-3">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value as any)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
          >
            <option value="7days">Last 7 Days</option>
            <option value="30days">Last 30 Days</option>
            <option value="90days">Last 90 Days</option>
            <option value="all">All Time</option>
          </select>
          <button
            onClick={handleExportReport}
            className="flex items-center gap-2 px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg transition-colors"
          >
            <Download className="w-4 h-4" />
            Export Report
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
            <TrendingUp className="w-5 h-5 text-green-600" />
          </div>
          <p className="text-2xl mb-1">₹{totalRevenue.toFixed(2)}</p>
          <p className="text-sm text-gray-600">Total Revenue</p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <ShoppingCart className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <p className="text-2xl mb-1">{totalOrders}</p>
          <p className="text-sm text-gray-600">Total Orders</p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
              <Calendar className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          <p className="text-2xl mb-1">₹{avgOrderValue.toFixed(2)}</p>
          <p className="text-sm text-gray-600">Avg Order Value</p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
              <Package className="w-6 h-6 text-amber-600" />
            </div>
          </div>
          <p className="text-2xl mb-1">{lowStockProducts}</p>
          <p className="text-sm text-gray-600">Low Stock Items</p>
        </div>
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Trend */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg mb-4">Revenue Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={revenueTrend}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="revenue" stroke="#f59e0b" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Order Status Distribution */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg mb-4">Order Status Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={statusData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={(entry) => `${entry.name}: ${entry.value}`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {statusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales by Category */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg mb-4">Sales by Category</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={categoryData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#f59e0b" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Top Selling Products */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg mb-4">Top Selling Products</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={productSales} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="name" type="category" width={120} />
              <Tooltip />
              <Legend />
              <Bar dataKey="revenue" fill="#10b981" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Detailed Tables */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-lg mb-4">Product Performance</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4">Product Name</th>
                <th className="text-left py-3 px-4">Category</th>
                <th className="text-left py-3 px-4">Units Sold</th>
                <th className="text-left py-3 px-4">Revenue</th>
                <th className="text-left py-3 px-4">Stock</th>
                <th className="text-left py-3 px-4">Rating</th>
              </tr>
            </thead>
            <tbody>
              {productSales.slice(0, 10).map((item) => {
                const product = products.find(p => p.name === item.name);
                return (
                  <tr key={item.name} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">{item.name}</td>
                    <td className="py-3 px-4">{product?.category}</td>
                    <td className="py-3 px-4">{item.quantity}</td>
                    <td className="py-3 px-4">₹{item.revenue.toFixed(2)}</td>
                    <td className="py-3 px-4">
                      <span className={product && product.stock < 10 ? 'text-red-600' : ''}>
                        {product?.stock}
                      </span>
                    </td>
                    <td className="py-3 px-4">{product?.rating}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}