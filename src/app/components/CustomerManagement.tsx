import React, { useState } from 'react';
import { Search, User } from 'lucide-react';

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  totalOrders: number;
  totalSpent: number;
  lastOrder?: string;
}

interface CustomerManagementProps {
  customers: Customer[];
}

export function CustomerManagement({ customers }: CustomerManagementProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCustomers = customers.filter((customer) =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.phone.includes(searchTerm)
  );

  return (
    <div>
      <h2 className="text-2xl mb-6">Customer Management</h2>

      {/* Search */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search customers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-6 rounded-xl shadow-md">
          <p className="text-sm text-gray-600 mb-2">Total Customers</p>
          <p className="text-3xl text-amber-700">{customers.length}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md">
          <p className="text-sm text-gray-600 mb-2">Total Orders</p>
          <p className="text-3xl text-amber-700">
            {customers.reduce((sum, c) => sum + c.totalOrders, 0)}
          </p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md">
          <p className="text-sm text-gray-600 mb-2">Total Revenue</p>
          <p className="text-3xl text-amber-700">
            ₹{customers.reduce((sum, c) => sum + c.totalSpent, 0).toFixed(2)}
          </p>
        </div>
      </div>

      {/* Customers Table */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="text-left p-4">Customer</th>
                <th className="text-left p-4">Contact</th>
                <th className="text-left p-4">Total Orders</th>
                <th className="text-left p-4">Total Spent</th>
                <th className="text-left p-4">Last Order</th>
              </tr>
            </thead>
            <tbody>
              {filteredCustomers.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-gray-500">
                    <User className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                    No customers found
                  </td>
                </tr>
              ) : (
                filteredCustomers.map((customer) => (
                  <tr key={customer.id} className="border-b last:border-0 hover:bg-gray-50">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
                          <User className="w-5 h-5 text-amber-700" />
                        </div>
                        <p>{customer.name}</p>
                      </div>
                    </td>
                    <td className="p-4">
                      <p className="text-sm">{customer.email}</p>
                      <p className="text-sm text-gray-600">{customer.phone}</p>
                    </td>
                    <td className="p-4">{customer.totalOrders}</td>
                    <td className="p-4 text-amber-700">₹{customer.totalSpent.toFixed(2)}</td>
                    <td className="p-4 text-sm">
                      {customer.lastOrder
                        ? new Date(customer.lastOrder).toLocaleDateString()
                        : 'N/A'}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}