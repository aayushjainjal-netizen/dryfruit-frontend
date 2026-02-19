import React, { useState } from 'react';
import {
  Store,
  Plus,
  Search,
  Edit2,
  Trash2,
  X,
  Mail,
  Phone,
  MapPin,
  Package,
  Star,
  CheckCircle,
  XCircle,
  Filter,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { Product } from './ProductCard';

export interface Vendor {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  businessName: string;
  gstNumber?: string;
  commissionRate: number; // percentage
  status: 'active' | 'inactive' | 'pending';
  joinDate: string;
  rating: number;
  totalProducts: number;
  totalSales: number;
  productsSupplied: string[]; // Product IDs
  bankDetails?: {
    accountNumber: string;
    ifscCode: string;
    accountHolderName: string;
  };
  contactPerson: string;
  description?: string;
}

interface VendorManagementProps {
  vendors: Vendor[];
  products: Product[];
  onAddVendor: (vendor: Vendor) => void;
  onUpdateVendor: (vendor: Vendor) => void;
  onDeleteVendor: (vendorId: string) => void;
}

export function VendorManagement({
  vendors,
  products,
  onAddVendor,
  onUpdateVendor,
  onDeleteVendor,
}: VendorManagementProps) {
  const [showForm, setShowForm] = useState(false);
  const [editingVendor, setEditingVendor] = useState<Vendor | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive' | 'pending'>('all');
  const [expandedVendorId, setExpandedVendorId] = useState<string | null>(null);

  // Form state
  const [formData, setFormData] = useState<Partial<Vendor>>({
    name: '',
    email: '',
    phone: '',
    address: '',
    businessName: '',
    gstNumber: '',
    commissionRate: 10,
    status: 'pending',
    contactPerson: '',
    description: '',
    productsSupplied: [],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (editingVendor) {
      onUpdateVendor({
        ...editingVendor,
        ...formData,
      } as Vendor);
    } else {
      const newVendor: Vendor = {
        id: Math.random().toString(36).substr(2, 9),
        joinDate: new Date().toISOString(),
        rating: 0,
        totalProducts: 0,
        totalSales: 0,
        ...formData,
      } as Vendor;
      onAddVendor(newVendor);
    }

    resetForm();
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      address: '',
      businessName: '',
      gstNumber: '',
      commissionRate: 10,
      status: 'pending',
      contactPerson: '',
      description: '',
      productsSupplied: [],
    });
    setEditingVendor(null);
    setShowForm(false);
  };

  const handleEdit = (vendor: Vendor) => {
    setEditingVendor(vendor);
    setFormData(vendor);
    setShowForm(true);
  };

  const handleDelete = (vendorId: string) => {
    if (window.confirm('Are you sure you want to delete this vendor?')) {
      onDeleteVendor(vendorId);
    }
  };

  const toggleProductAssignment = (productId: string) => {
    const currentProducts = formData.productsSupplied || [];
    if (currentProducts.includes(productId)) {
      setFormData({
        ...formData,
        productsSupplied: currentProducts.filter(id => id !== productId),
      });
    } else {
      setFormData({
        ...formData,
        productsSupplied: [...currentProducts, productId],
      });
    }
  };

  // Filter vendors
  const filteredVendors = vendors.filter(vendor => {
    const matchesSearch = 
      vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vendor.businessName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vendor.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || vendor.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getVendorProducts = (vendorId: string) => {
    const vendor = vendors.find(v => v.id === vendorId);
    if (!vendor) return [];
    return products.filter(p => vendor.productsSupplied.includes(p.id));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'inactive':
        return 'bg-red-100 text-red-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="w-4 h-4" />;
      case 'inactive':
        return <XCircle className="w-4 h-4" />;
      default:
        return <Filter className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl">Vendor Management</h2>
          <p className="text-sm text-gray-600 mt-1">
            Manage suppliers and vendors
          </p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center justify-center gap-2 px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg transition-colors"
        >
          <Plus className="w-5 h-5" />
          <span className="whitespace-nowrap">Add Vendor</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Store className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Vendors</p>
              <p className="text-xl">{vendors.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Active Vendors</p>
              <p className="text-xl">
                {vendors.filter(v => v.status === 'active').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Filter className="w-5 h-5 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Pending</p>
              <p className="text-xl">
                {vendors.filter(v => v.status === 'pending').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <Package className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Products</p>
              <p className="text-xl">
                {vendors.reduce((sum, v) => sum + v.totalProducts, 0)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search vendors..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as any)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
        >
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
          <option value="pending">Pending</option>
        </select>
      </div>

      {/* Vendor Form */}
      {showForm && (
        <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg sm:text-xl">
              {editingVendor ? 'Edit Vendor' : 'Add New Vendor'}
            </h3>
            <button
              onClick={resetForm}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div>
              <h4 className="font-medium mb-3 text-gray-700">Basic Information</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm mb-1 text-gray-700">
                    Contact Person *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.contactPerson}
                    onChange={(e) =>
                      setFormData({ ...formData, contactPerson: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm mb-1 text-gray-700">
                    Business Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.businessName}
                    onChange={(e) =>
                      setFormData({ ...formData, businessName: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm mb-1 text-gray-700">Email *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm mb-1 text-gray-700">Phone *</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm mb-1 text-gray-700">Address *</label>
                  <textarea
                    required
                    value={formData.address}
                    onChange={(e) =>
                      setFormData({ ...formData, address: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    rows={2}
                  />
                </div>

                <div>
                  <label className="block text-sm mb-1 text-gray-700">
                    GST Number
                  </label>
                  <input
                    type="text"
                    value={formData.gstNumber}
                    onChange={(e) =>
                      setFormData({ ...formData, gstNumber: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm mb-1 text-gray-700">
                    Commission Rate (%) *
                  </label>
                  <input
                    type="number"
                    required
                    min="0"
                    max="100"
                    step="0.1"
                    value={formData.commissionRate}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        commissionRate: parseFloat(e.target.value),
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm mb-1 text-gray-700">Status *</label>
                  <select
                    required
                    value={formData.status}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        status: e.target.value as any,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  >
                    <option value="pending">Pending</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm mb-1 text-gray-700">
                    Description
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    rows={3}
                    placeholder="Brief description about the vendor..."
                  />
                </div>
              </div>
            </div>

            {/* Product Assignment */}
            <div>
              <h4 className="font-medium mb-3 text-gray-700">Assign Products</h4>
              <div className="border border-gray-300 rounded-lg p-4 max-h-60 overflow-y-auto">
                {products.length === 0 ? (
                  <p className="text-sm text-gray-500 text-center py-4">
                    No products available
                  </p>
                ) : (
                  <div className="space-y-2">
                    {products.map((product) => (
                      <label
                        key={product.id}
                        className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={formData.productsSupplied?.includes(product.id)}
                          onChange={() => toggleProductAssignment(product.id)}
                          className="w-4 h-4 text-amber-600 focus:ring-amber-500"
                        />
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-10 h-10 object-cover rounded"
                        />
                        <div className="flex-1">
                          <p className="text-sm font-medium">{product.name}</p>
                          <p className="text-xs text-gray-500">₹{product.price}</p>
                        </div>
                      </label>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t">
              <button
                type="button"
                onClick={resetForm}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg transition-colors"
              >
                {editingVendor ? 'Update Vendor' : 'Add Vendor'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Vendors List */}
      <div className="space-y-4">
        {filteredVendors.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <Store className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-500">No vendors found</p>
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="mt-2 text-sm text-amber-600 hover:text-amber-700"
              >
                Clear search
              </button>
            )}
          </div>
        ) : (
          filteredVendors.map((vendor) => (
            <div
              key={vendor.id}
              className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
            >
              {/* Vendor Header */}
              <div className="p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div className="flex items-start gap-4 flex-1">
                    <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-500 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Store className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <h3 className="font-medium text-base sm:text-lg">
                          {vendor.businessName}
                        </h3>
                        <span
                          className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs ${getStatusColor(
                            vendor.status
                          )}`}
                        >
                          {getStatusIcon(vendor.status)}
                          {vendor.status}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">
                        Contact: {vendor.contactPerson}
                      </p>
                      <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <Mail className="w-4 h-4" />
                          <span className="break-all">{vendor.email}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Phone className="w-4 h-4" />
                          <span>{vendor.phone}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() =>
                        setExpandedVendorId(
                          expandedVendorId === vendor.id ? null : vendor.id
                        )
                      }
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                      title="View Details"
                    >
                      {expandedVendorId === vendor.id ? (
                        <ChevronUp className="w-5 h-5 text-gray-600" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-600" />
                      )}
                    </button>
                    <button
                      onClick={() => handleEdit(vendor)}
                      className="p-2 hover:bg-blue-50 rounded-lg transition-colors"
                      title="Edit"
                    >
                      <Edit2 className="w-5 h-5 text-blue-600" />
                    </button>
                    <button
                      onClick={() => handleDelete(vendor.id)}
                      className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-5 h-5 text-red-600" />
                    </button>
                  </div>
                </div>

                {/* Stats Row */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4 pt-4 border-t">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Products</p>
                    <p className="font-medium">{vendor.productsSupplied.length}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Commission</p>
                    <p className="font-medium">{vendor.commissionRate}%</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Total Sales</p>
                    <p className="font-medium">₹{vendor.totalSales.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Rating</p>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="font-medium">
                        {vendor.rating > 0 ? vendor.rating.toFixed(1) : 'N/A'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Expanded Details */}
              {expandedVendorId === vendor.id && (
                <div className="border-t bg-gray-50 p-4 sm:p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Vendor Details */}
                    <div>
                      <h4 className="font-medium mb-3 text-gray-700">
                        Vendor Details
                      </h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-start gap-2">
                          <MapPin className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-600">{vendor.address}</span>
                        </div>
                        {vendor.gstNumber && (
                          <div>
                            <span className="text-gray-500">GST: </span>
                            <span className="text-gray-700">{vendor.gstNumber}</span>
                          </div>
                        )}
                        <div>
                          <span className="text-gray-500">Joined: </span>
                          <span className="text-gray-700">
                            {new Date(vendor.joinDate).toLocaleDateString()}
                          </span>
                        </div>
                        {vendor.description && (
                          <div className="mt-3">
                            <p className="text-gray-500 mb-1">Description:</p>
                            <p className="text-gray-700">{vendor.description}</p>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Assigned Products */}
                    <div>
                      <h4 className="font-medium mb-3 text-gray-700">
                        Assigned Products ({vendor.productsSupplied.length})
                      </h4>
                      <div className="space-y-2 max-h-60 overflow-y-auto">
                        {getVendorProducts(vendor.id).map((product) => (
                          <div
                            key={product.id}
                            className="flex items-center gap-3 p-2 bg-white rounded-lg border border-gray-200"
                          >
                            <img
                              src={product.image}
                              alt={product.name}
                              className="w-12 h-12 object-cover rounded"
                            />
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium truncate">
                                {product.name}
                              </p>
                              <p className="text-xs text-gray-500">
                                ₹{product.price} • Stock: {product.stock}
                              </p>
                            </div>
                          </div>
                        ))}
                        {vendor.productsSupplied.length === 0 && (
                          <p className="text-sm text-gray-500 text-center py-4">
                            No products assigned
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}