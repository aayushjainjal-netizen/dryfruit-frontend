import React, { useState } from 'react';
import { Search, Eye, Package } from 'lucide-react';
import { OrderDetails } from './CheckoutForm';

interface OrderManagementProps {
  orders: OrderDetails[];
  onUpdateOrderStatus: (orderId: string, status: string) => void;
}

interface OrderWithStatus extends OrderDetails {
  id: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
}

export function OrderManagement({ orders, onUpdateOrderStatus }: OrderManagementProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<OrderWithStatus | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('all');

  // Add status to orders (in a real app, this would come from the database)
  const ordersWithStatus: OrderWithStatus[] = orders.map((order, index) => ({
    ...order,
    id: `order-${index + 1}`,
    status: index === 0 ? 'pending' : index === 1 ? 'processing' : index === 2 ? 'shipped' : 'delivered',
  }));

  const filteredOrders = ordersWithStatus.filter((order) => {
    const matchesSearch = 
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterStatus === 'all' || order.status === filterStatus;
    
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-700';
      case 'processing':
        return 'bg-blue-100 text-blue-700';
      case 'shipped':
        return 'bg-purple-100 text-purple-700';
      case 'delivered':
        return 'bg-green-100 text-green-700';
      case 'cancelled':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div>
      <h2 className="text-2xl mb-6">Order Management</h2>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search orders..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
          />
        </div>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
        >
          <option value="all">All Orders</option>
          <option value="pending">Pending</option>
          <option value="processing">Processing</option>
          <option value="shipped">Shipped</option>
          <option value="delivered">Delivered</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="text-left p-4">Order ID</th>
                <th className="text-left p-4">Customer</th>
                <th className="text-left p-4">Items</th>
                <th className="text-left p-4">Total</th>
                <th className="text-left p-4">Date</th>
                <th className="text-left p-4">Status</th>
                <th className="text-left p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-gray-500">
                    <Package className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                    No orders found
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order) => (
                  <tr key={order.id} className="border-b last:border-0 hover:bg-gray-50">
                    <td className="p-4">{order.id}</td>
                    <td className="p-4">
                      <div>
                        <p>{order.customerName}</p>
                        <p className="text-sm text-gray-600">{order.email}</p>
                      </div>
                    </td>
                    <td className="p-4">
                      {order.items.reduce((sum, item) => sum + item.quantity, 0)} items
                    </td>
                    <td className="p-4 text-amber-700">₹{order.total.toFixed(2)}</td>
                    <td className="p-4 text-sm">
                      {new Date(order.orderDate).toLocaleDateString()}
                    </td>
                    <td className="p-4">
                      <select
                        value={order.status}
                        onChange={(e) => onUpdateOrderStatus(order.id, e.target.value)}
                        className={`px-2 py-1 rounded text-xs border-0 ${getStatusColor(order.status)}`}
                      >
                        <option value="pending">Pending</option>
                        <option value="processing">Processing</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </td>
                    <td className="p-4">
                      <button
                        onClick={() => setSelectedOrder(order)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl">Order Details - {selectedOrder.id}</h3>
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ×
                </button>
              </div>
              <span className={`px-3 py-1 rounded text-sm ${getStatusColor(selectedOrder.status)}`}>
                {selectedOrder.status.charAt(0).toUpperCase() + selectedOrder.status.slice(1)}
              </span>
            </div>

            <div className="p-6 space-y-6">
              {/* Customer Info */}
              <div>
                <h4 className="mb-3">Customer Information</h4>
                <div className="bg-gray-50 p-4 rounded-lg space-y-2 text-sm">
                  <p><span className="text-gray-600">Name:</span> {selectedOrder.customerName}</p>
                  <p><span className="text-gray-600">Email:</span> {selectedOrder.email}</p>
                  <p><span className="text-gray-600">Phone:</span> {selectedOrder.phone}</p>
                  <p><span className="text-gray-600">Address:</span> {selectedOrder.address}, {selectedOrder.city}, {selectedOrder.zipCode}</p>
                </div>
              </div>

              {/* Order Items */}
              <div>
                <h4 className="mb-3">Order Items</h4>
                <div className="space-y-2">
                  {selectedOrder.items.map((item, index) => (
                    <div key={index} className="flex justify-between items-center bg-gray-50 p-3 rounded-lg">
                      <div className="flex-1">
                        <p>{item.product.name}</p>
                        <p className="text-sm text-gray-600">
                          ₹{item.product.price} × {item.quantity}
                        </p>
                      </div>
                      <p className="text-amber-700">
                        ₹{(item.product.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Summary */}
              <div className="border-t pt-4">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Payment Method:</span>
                  <span>{selectedOrder.paymentMethod === 'card' ? 'Card Payment' : 'Cash on Delivery'}</span>
                </div>
                <div className="flex justify-between">
                  <span>Total Amount</span>
                  <span className="text-xl text-amber-700">₹{selectedOrder.total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}