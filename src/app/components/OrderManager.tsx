import { Package, Clock, CheckCircle, XCircle, TrendingUp } from 'lucide-react';
import { CartItem } from './ShoppingCart';
import { CustomerData } from './CheckoutModal';

export interface Order {
  id: string;
  customerData: CustomerData;
  items: CartItem[];
  total: number;
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  orderDate: string;
}

interface OrderManagerProps {
  orders: Order[];
  onUpdateOrderStatus: (orderId: string, status: Order['status']) => void;
}

const statusColors = {
  pending: 'bg-yellow-100 text-yellow-800',
  processing: 'bg-blue-100 text-blue-800',
  completed: 'bg-green-100 text-green-800',
  cancelled: 'bg-red-100 text-red-800',
};

const statusIcons = {
  pending: Clock,
  processing: Package,
  completed: CheckCircle,
  cancelled: XCircle,
};

export function OrderManager({ orders, onUpdateOrderStatus }: OrderManagerProps) {
  const totalOrders = orders.length;
  const pendingOrders = orders.filter((o) => o.status === 'pending').length;
  const completedOrders = orders.filter((o) => o.status === 'completed').length;
  const totalRevenue = orders
    .filter((o) => o.status !== 'cancelled')
    .reduce((sum, o) => sum + o.total, 0);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-bold text-xl">Order Management</h2>
        <p className="text-sm text-gray-500">Track and manage customer orders</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Package className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Orders</p>
              <p className="font-bold text-2xl">{totalOrders}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-yellow-100 rounded-lg">
              <Clock className="w-6 h-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Pending</p>
              <p className="font-bold text-2xl">{pendingOrders}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-green-100 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Completed</p>
              <p className="font-bold text-2xl">{completedOrders}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-purple-100 rounded-lg">
              <TrendingUp className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Revenue</p>
              <p className="font-bold text-2xl">₹{totalRevenue.toFixed(0)}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {orders.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-8 text-center text-gray-500">
            <Package className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            <p>No orders yet</p>
          </div>
        ) : (
          orders.map((order) => {
            const StatusIcon = statusIcons[order.status];
            return (
              <div key={order.id} className="bg-white rounded-lg shadow">
                <div className="p-6">
                  <div className="flex flex-col lg:flex-row justify-between gap-4 mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold">Order #{order.id}</h3>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1 ${
                            statusColors[order.status]
                          }`}
                        >
                          <StatusIcon className="w-3 h-3" />
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500">
                        {new Date(order.orderDate).toLocaleString()}
                      </p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-2">
                      <select
                        value={order.status}
                        onChange={(e) => onUpdateOrderStatus(order.id, e.target.value as Order['status'])}
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      >
                        <option value="pending">Pending</option>
                        <option value="processing">Processing</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-sm mb-2">Customer Details</h4>
                      <div className="space-y-1 text-sm text-gray-600">
                        <p>{order.customerData.name}</p>
                        <p>{order.customerData.email}</p>
                        <p>{order.customerData.phone}</p>
                        <p className="text-xs">
                          {order.customerData.address}, {order.customerData.city},{' '}
                          {order.customerData.pincode}
                        </p>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-sm mb-2">Order Items</h4>
                      <div className="space-y-2">
                        {order.items.map((item) => (
                          <div
                            key={item.product.id}
                            className="flex justify-between text-sm"
                          >
                            <span className="text-gray-600">
                              {item.product.name} x {item.quantity}
                            </span>
                            <span className="font-semibold">
                              ₹{(item.product.price * item.quantity).toFixed(2)}
                            </span>
                          </div>
                        ))}
                        <div className="flex justify-between font-semibold border-t pt-2">
                          <span>Total</span>
                          <span className="text-green-600">₹{order.total.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
