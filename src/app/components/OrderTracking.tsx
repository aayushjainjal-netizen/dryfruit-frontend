import React from 'react';
import { X, Package, Truck, CheckCircle, Clock, MapPin } from 'lucide-react';
import { OrderDetails } from './CheckoutForm';

interface OrderTrackingProps {
  order: OrderDetails;
  onClose: () => void;
}

export function OrderTracking({ order, onClose }: OrderTrackingProps) {
  const getOrderSteps = () => {
    const allSteps = [
      { status: 'Pending', icon: Clock, label: 'Order Placed', description: 'Your order has been received' },
      { status: 'Processing', icon: Package, label: 'Processing', description: 'We are preparing your items' },
      { status: 'Shipped', icon: Truck, label: 'Shipped', description: 'Your order is on the way' },
      { status: 'Delivered', icon: CheckCircle, label: 'Delivered', description: 'Order delivered successfully' },
    ];

    const currentIndex = allSteps.findIndex(step => step.status === order.status);
    
    return allSteps.map((step, index) => ({
      ...step,
      completed: index <= currentIndex,
      current: index === currentIndex,
    }));
  };

  const steps = getOrderSteps();

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b p-6 flex items-center justify-between rounded-t-2xl">
          <div>
            <h2 className="text-2xl text-gray-900">Track Your Order</h2>
            <p className="text-sm text-gray-600 mt-1">Order #{order.id}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Order Timeline */}
          <div className="relative">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={step.status} className="relative pb-8 last:pb-0">
                  {index < steps.length - 1 && (
                    <div
                      className={`absolute left-5 top-10 w-0.5 h-full ${
                        step.completed ? 'bg-green-500' : 'bg-gray-300'
                      }`}
                    />
                  )}
                  <div className="flex items-start gap-4">
                    <div
                      className={`relative flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                        step.completed
                          ? 'bg-green-500 text-white'
                          : step.current
                          ? 'bg-amber-500 text-white'
                          : 'bg-gray-200 text-gray-400'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1 pt-1">
                      <h3
                        className={`mb-1 ${
                          step.completed || step.current
                            ? 'text-gray-900'
                            : 'text-gray-500'
                        }`}
                      >
                        {step.label}
                      </h3>
                      <p className="text-sm text-gray-600">{step.description}</p>
                      {step.current && (
                        <div className="mt-2 inline-flex items-center gap-2 px-3 py-1 bg-amber-50 text-amber-700 rounded-full text-sm">
                          <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse" />
                          Current Status
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Order Details */}
          <div className="border-t pt-6">
            <h3 className="text-lg mb-4">Order Details</h3>
            <div className="space-y-3">
              {order.items.map((item) => (
                <div key={item.product.id} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
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
          </div>

          {/* Delivery Address */}
          <div className="border-t pt-6">
            <h3 className="text-lg mb-4">Delivery Address</h3>
            <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
              <MapPin className="w-5 h-5 text-gray-600 mt-1" />
              <div>
                <p>{order.customerName}</p>
                <p className="text-sm text-gray-600">{order.address}</p>
                <p className="text-sm text-gray-600">{order.phone}</p>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="border-t pt-6">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Subtotal</span>
                <span>₹{order.total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Shipping</span>
                <span className="text-green-600">Free</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Payment Method</span>
                <span>{order.paymentMethod}</span>
              </div>
              <div className="flex justify-between pt-2 border-t">
                <span>Total</span>
                <span className="text-xl">₹{order.total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Order Date */}
          <div className="text-center text-sm text-gray-600">
            Order placed on {new Date(order.orderDate).toLocaleString()}
          </div>
        </div>
      </div>
    </div>
  );
}