import React, { useState } from 'react';
import { X, Mail, Lock, User, Phone, Calendar } from 'lucide-react';
import { loginUser } from "../../api";


export interface ImportantDate {
  id: string;
  label: string;
  month: number; // 1-12
  day: number; // 1-31
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  joinDate: string;
  totalOrders: number;
  totalSpent: number;
  importantDates: ImportantDate[];
}

interface AuthModalProps {
  onClose: () => void;
  onLogin: (customer: Customer) => void;
  onAdminLogin: () => void;
}

export function AuthModal({ onClose, onLogin, onAdminLogin }: AuthModalProps) {
  const [isSignup, setIsSignup] = useState(false);
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    address: '',
  });

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  // ✅ ADMIN LOGIN (Frontend only)
  if (isAdminMode) {
    if (
      formData.email === "admin@dryfruits.com" &&
      formData.password === "admin123"
    ) {
      onAdminLogin();
      onClose();
    } else {
      alert("Invalid admin credentials ❌");
    }
    return;
  }

  try {
    // ✅ SIGNUP MODE
    if (isSignup) {
      await fetch("https://dryfruit-backend-2.onrender.com/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      });

      alert("Account Created Successfully ✅");
      setIsSignup(false);
      return;
    }

    // ✅ LOGIN MODE
    const response = await loginUser({
      email: formData.email,
      password: formData.password,
    });

    console.log("Login Success:", response.data);

    // Save JWT token
    localStorage.setItem("token", response.data.token);

    alert("Login Successful ✅");

    const customer: Customer = {
      id: `customer-${Date.now()}`,
      name: formData.name || "User",
      email: formData.email,
      phone: "",
      address: "",
      joinDate: new Date().toISOString(),
      totalOrders: 0,
      totalSpent: 0,
      importantDates: [],
    };

    onLogin(customer);
    onClose();

  } catch (error: any) {
    console.error("Login Error:", error.response?.data);
    alert("Login Failed ❌ Check email/password");
  }
};

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b p-6 flex items-center justify-between rounded-t-2xl">
          <div>
            <h2 className="text-2xl text-gray-900">
              {isAdminMode ? 'Admin Login' : isSignup ? 'Create Account' : 'Welcome Back'}
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              {isAdminMode
                ? 'Access your admin dashboard'
                : isSignup
                ? 'Sign up to start shopping'
                : 'Login to your account'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {!isAdminMode && isSignup && (
            <div>
              <label className="block text-sm mb-2">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  placeholder="John Doe"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-sm mb-2">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                placeholder={isAdminMode ? 'admin@dryfruits.com' : 'your@email.com'}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm mb-2">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="password"
                required
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                placeholder={isAdminMode ? 'admin123' : '••••••••'}
              />
            </div>
          </div>

          {!isAdminMode && isSignup && (
            <>
              <div>
                <label className="block text-sm mb-2">Phone Number</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    placeholder="+1 (555) 000-0000"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm mb-2">Address</label>
                <textarea
                  required
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  placeholder="123 Main St, City, State, ZIP"
                  rows={2}
                />
              </div>
            </>
          )}

          <button
            type="submit"
            className="w-full bg-amber-600 hover:bg-amber-700 text-white py-3 rounded-lg transition-colors"
          >
            {isAdminMode ? 'Login as Admin' : isSignup ? 'Create Account' : 'Login'}
          </button>

          {!isAdminMode && (
            <div className="text-center">
              <button
                type="button"
                onClick={() => setIsSignup(!isSignup)}
                className="text-amber-600 hover:text-amber-700 text-sm"
              >
                {isSignup ? 'Already have an account? Login' : "Don't have an account? Sign up"}
              </button>
            </div>
          )}

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">or</span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsAdminMode(!isAdminMode)}
            className="w-full border-2 border-gray-300 hover:border-amber-500 text-gray-700 py-3 rounded-lg transition-colors"
          >
            {isAdminMode ? 'Login as Customer' : 'Login as Admin'}
          </button>

          {isAdminMode && (
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-sm text-amber-800">
              <p>Demo credentials:</p>
              <p>Email: admin@dryfruits.com</p>
              <p>Password: admin123</p>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}