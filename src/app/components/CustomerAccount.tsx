import React, { useState } from 'react';
import { Customer, ImportantDate } from './AuthModal';
import { OrderDetails } from './CheckoutForm';
import { ArrowLeft, User, MapPin, Phone, Mail, Package, Calendar, DollarSign, ShoppingBag, Edit2, Eye, Download, Plus, Trash2, Heart } from 'lucide-react';
import { OrderTracking } from './OrderTracking';
import { InvoiceGenerator } from './InvoiceGenerator';

interface CustomerAccountProps {
  customer: Customer;
  orders: OrderDetails[];
  onBack: () => void;
  onUpdateProfile: (customer: Customer) => void;
}

export function CustomerAccount({ customer, orders, onBack, onUpdateProfile }: CustomerAccountProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState(customer);
  const [activeTab, setActiveTab] = useState<'profile' | 'orders' | 'wishlist'>('profile');
  const [selectedOrder, setSelectedOrder] = useState<OrderDetails | null>(null);
  const [showTracking, setShowTracking] = useState(false);
  const [showInvoice, setShowInvoice] = useState(false);
  const [isAddingDate, setIsAddingDate] = useState(false);
  const [newDate, setNewDate] = useState({ label: '', month: 1, day: 1 });

  // Filter orders for this customer
  const customerOrders = orders.filter(order => order.customerEmail === customer.email);

  const handleSaveProfile = () => {
    onUpdateProfile(editForm);
    setIsEditing(false);
  };

  const handleAddImportantDate = () => {
    if (!newDate.label.trim()) return;
    
    const importantDate: ImportantDate = {
      id: Math.random().toString(36).substr(2, 9),
      label: newDate.label,
      month: newDate.month,
      day: newDate.day,
    };

    setEditForm({
      ...editForm,
      importantDates: [...(editForm.importantDates || []), importantDate],
    });

    setNewDate({ label: '', month: 1, day: 1 });
    setIsAddingDate(false);
  };

  const handleRemoveImportantDate = (dateId: string) => {
    setEditForm({
      ...editForm,
      importantDates: (editForm.importantDates || []).filter(d => d.id !== dateId),
    });
  };

  const getMonthName = (month: number) => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return months[month - 1];
  };

  const getDaysInMonth = (month: number) => {
    const daysInMonth = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    return daysInMonth[month - 1];
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Delivered':
        return 'bg-green-100 text-green-800';
      case 'Processing':
        return 'bg-blue-100 text-blue-800';
      case 'Shipped':
        return 'bg-purple-100 text-purple-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-600 hover:text-amber-600 mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Shopping
        </button>

        {/* Header Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                <ShoppingBag className="w-6 h-6 text-amber-600" />
              </div>
              <div>
                <p className="text-2xl">{customerOrders.length}</p>
                <p className="text-sm text-gray-600">Total Orders</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-2xl">
                  ₹{customerOrders.reduce((sum, order) => sum + order.total, 0).toFixed(2)}
                </p>
                <p className="text-sm text-gray-600">Total Spent</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Package className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl">
                  {customerOrders.filter(o => o.status === 'Processing' || o.status === 'Shipped').length}
                </p>
                <p className="text-sm text-gray-600">Active Orders</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <Calendar className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl">
                  {Math.floor((Date.now() - new Date(customer.joinDate).getTime()) / (1000 * 60 * 60 * 24))}
                </p>
                <p className="text-sm text-gray-600">Days as Member</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-md">
          <div className="border-b border-gray-200">
            <div className="flex gap-8 px-6">
              <button
                onClick={() => setActiveTab('profile')}
                className={`py-4 border-b-2 transition-colors ${
                  activeTab === 'profile'
                    ? 'border-amber-500 text-amber-600'
                    : 'border-transparent text-gray-600 hover:text-amber-600'
                }`}
              >
                Profile Information
              </button>
              <button
                onClick={() => setActiveTab('orders')}
                className={`py-4 border-b-2 transition-colors ${
                  activeTab === 'orders'
                    ? 'border-amber-500 text-amber-600'
                    : 'border-transparent text-gray-600 hover:text-amber-600'
                }`}
              >
                Order History ({customerOrders.length})
              </button>
              <button
                onClick={() => setActiveTab('wishlist')}
                className={`py-4 border-b-2 transition-colors ${
                  activeTab === 'wishlist'
                    ? 'border-amber-500 text-amber-600'
                    : 'border-transparent text-gray-600 hover:text-amber-600'
                }`}
              >
                Wishlist
              </button>
            </div>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div className="max-w-2xl">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl">Personal Information</h3>
                  {!isEditing && (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="flex items-center gap-2 text-amber-600 hover:text-amber-700 transition-colors"
                    >
                      <Edit2 className="w-4 h-4" />
                      Edit Profile
                    </button>
                  )}
                </div>

                {isEditing ? (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm mb-2">Full Name</label>
                      <input
                        type="text"
                        value={editForm.name}
                        onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm mb-2">Email</label>
                      <input
                        type="email"
                        value={editForm.email}
                        onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm mb-2">Phone</label>
                      <input
                        type="tel"
                        value={editForm.phone}
                        onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm mb-2">Address</label>
                      <textarea
                        value={editForm.address}
                        onChange={(e) => setEditForm({ ...editForm, address: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                        rows={3}
                      />
                    </div>

                    <div className="flex gap-3">
                      <button
                        onClick={handleSaveProfile}
                        className="px-6 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg transition-colors"
                      >
                        Save Changes
                      </button>
                      <button
                        onClick={() => {
                          setIsEditing(false);
                          setEditForm(customer);
                        }}
                        className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                      <User className="w-5 h-5 text-gray-600" />
                      <div>
                        <p className="text-sm text-gray-600">Name</p>
                        <p>{customer.name}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                      <Mail className="w-5 h-5 text-gray-600" />
                      <div>
                        <p className="text-sm text-gray-600">Email</p>
                        <p>{customer.email}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                      <Phone className="w-5 h-5 text-gray-600" />
                      <div>
                        <p className="text-sm text-gray-600">Phone</p>
                        <p>{customer.phone}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                      <MapPin className="w-5 h-5 text-gray-600" />
                      <div>
                        <p className="text-sm text-gray-600">Address</p>
                        <p>{customer.address}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                      <Calendar className="w-5 h-5 text-gray-600" />
                      <div>
                        <p className="text-sm text-gray-600">Member Since</p>
                        <p>{new Date(customer.joinDate).toLocaleDateString()}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Important Dates */}
                <div className="mt-6">
                  <h4 className="text-lg font-bold mb-4">Important Dates</h4>
                  <div className="space-y-4">
                    {editForm.importantDates?.map(date => (
                      <div key={date.id} className="flex items-center justify-between bg-gray-50 p-4 rounded-lg">
                        <div>
                          <p className="text-sm text-gray-600">{date.label}</p>
                          <p className="text-sm text-gray-600">{getMonthName(date.month)} {date.day}</p>
                        </div>
                        <button
                          onClick={() => handleRemoveImportantDate(date.id)}
                          className="text-red-600 hover:text-red-700 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                    {isAddingDate ? (
                      <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-lg">
                        <input
                          type="text"
                          value={newDate.label}
                          onChange={(e) => setNewDate({ ...newDate, label: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                          placeholder="Label"
                        />
                        <select
                          value={newDate.month}
                          onChange={(e) => setNewDate({ ...newDate, month: parseInt(e.target.value) })}
                          className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                        >
                          {Array.from({ length: 12 }, (_, i) => (
                            <option key={i + 1} value={i + 1}>{getMonthName(i + 1)}</option>
                          ))}
                        </select>
                        <select
                          value={newDate.day}
                          onChange={(e) => setNewDate({ ...newDate, day: parseInt(e.target.value) })}
                          className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                        >
                          {Array.from({ length: getDaysInMonth(newDate.month) }, (_, i) => (
                            <option key={i + 1} value={i + 1}>{i + 1}</option>
                          ))}
                        </select>
                        <button
                          onClick={handleAddImportantDate}
                          className="px-6 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg transition-colors"
                        >
                          Add Date
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setIsAddingDate(true)}
                        className="px-6 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg transition-colors"
                      >
                        Add Important Date
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Orders Tab */}
            {activeTab === 'orders' && (
              <div>
                <h3 className="text-xl mb-6">Your Orders</h3>
                {customerOrders.length === 0 ? (
                  <div className="text-center py-12">
                    <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-600">No orders yet</p>
                    <button
                      onClick={onBack}
                      className="mt-4 px-6 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg transition-colors"
                    >
                      Start Shopping
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {customerOrders.map((order) => (
                      <div key={order.id} className="border border-gray-200 rounded-lg p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <p className="text-sm text-gray-600">Order #{order.id}</p>
                            <p className="text-sm text-gray-600">
                              {new Date(order.orderDate).toLocaleDateString()}
                            </p>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(order.status)}`}>
                            {order.status}
                          </span>
                        </div>

                        <div className="space-y-3 mb-4">
                          {order.items.map((item) => (
                            <div key={item.product.id} className="flex items-center gap-4">
                              <img
                                src={item.product.image}
                                alt={item.product.name}
                                className="w-16 h-16 object-cover rounded"
                              />
                              <div className="flex-1">
                                <p>{item.product.name}</p>
                                <p className="text-sm text-gray-600">
                                  Quantity: {item.quantity} × ₹{item.product.price.toFixed(2)}
                                </p>
                              </div>
                              <p>₹{(item.quantity * item.product.price).toFixed(2)}</p>
                            </div>
                          ))}
                        </div>

                        <div className="border-t pt-4 flex items-center justify-between">
                          <p className="text-gray-600">Payment: {order.paymentMethod}</p>
                          <p className="text-xl">Total: ₹{order.total.toFixed(2)}</p>
                        </div>

                        <div className="mt-4 flex gap-3">
                          <button
                            onClick={() => {
                              setSelectedOrder(order);
                              setShowTracking(true);
                            }}
                            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                          >
                            <Eye className="w-4 h-4" />
                            Track Order
                          </button>
                          <button
                            onClick={() => {
                              setSelectedOrder(order);
                              setShowInvoice(true);
                            }}
                            className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
                          >
                            <Download className="w-4 h-4" />
                            Download Invoice
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Wishlist Tab */}
            {activeTab === 'wishlist' && (
              <div className="text-center py-12">
                <p className="text-gray-600">Wishlist feature coming soon!</p>
              </div>
            )}
          </div>
        </div>

        {/* Order Tracking Modal */}
        {showTracking && selectedOrder && (
          <OrderTracking
            order={selectedOrder}
            onClose={() => setShowTracking(false)}
          />
        )}

        {/* Invoice Generator Modal */}
        {showInvoice && selectedOrder && (
          <InvoiceGenerator
            order={selectedOrder}
            onClose={() => setShowInvoice(false)}
          />
        )}
      </div>
    </div>
  );
}