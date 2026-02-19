import React from 'react';
import { X, Download, Printer } from 'lucide-react';
import { OrderDetails } from './CheckoutForm';

interface InvoiceGeneratorProps {
  order: OrderDetails;
  onClose: () => void;
}

export function InvoiceGenerator({ order, onClose }: InvoiceGeneratorProps) {
  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    // Create a simple text invoice
    const invoiceText = `
INVOICE #${order.id}
Date: ${new Date(order.orderDate).toLocaleDateString()}

Bill To:
${order.customerName}
${order.address}
${order.phone}
${order.email}

Items:
${order.items.map(item => 
  `${item.product.name} - ${item.quantity} × ₹${item.product.price.toFixed(2)} = ₹${(item.quantity * item.product.price).toFixed(2)}`
).join('\n')}

Subtotal: ₹${order.total.toFixed(2)}
Shipping: Free
Total: ₹${order.total.toFixed(2)}

Payment Method: ${order.paymentMethod}
Status: ${order.status}

Thank you for your business!
Premium Dry Fruits
    `.trim();

    const blob = new Blob([invoiceText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `invoice-${order.id}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b p-6 flex items-center justify-between rounded-t-2xl print:hidden">
          <h2 className="text-2xl text-gray-900">Invoice</h2>
          <div className="flex items-center gap-2">
            <button
              onClick={handleDownload}
              className="flex items-center gap-2 px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg transition-colors"
            >
              <Download className="w-4 h-4" />
              Download
            </button>
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-lg transition-colors"
            >
              <Printer className="w-4 h-4" />
              Print
            </button>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Invoice Content */}
        <div className="p-8 print:p-0">
          {/* Company Header */}
          <div className="flex items-start justify-between mb-8 pb-8 border-b">
            <div>
              <h1 className="text-3xl text-amber-900 mb-2">Premium Dry Fruits</h1>
              <p className="text-sm text-gray-600">123 Business Street</p>
              <p className="text-sm text-gray-600">City, State 12345</p>
              <p className="text-sm text-gray-600">Phone: (555) 123-4567</p>
              <p className="text-sm text-gray-600">Email: info@premiumdryfruits.com</p>
            </div>
            <div className="text-right">
              <div className="text-4xl mb-2">INVOICE</div>
              <p className="text-sm text-gray-600">Invoice #: {order.id}</p>
              <p className="text-sm text-gray-600">
                Date: {new Date(order.orderDate).toLocaleDateString()}
              </p>
              <div className="mt-2 inline-block px-3 py-1 bg-amber-100 text-amber-800 rounded text-sm">
                {order.status}
              </div>
            </div>
          </div>

          {/* Bill To */}
          <div className="mb-8">
            <h3 className="text-sm text-gray-600 mb-2">BILL TO:</h3>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p>{order.customerName}</p>
              <p className="text-sm text-gray-600">{order.address}</p>
              <p className="text-sm text-gray-600">{order.phone}</p>
              <p className="text-sm text-gray-600">{order.email}</p>
            </div>
          </div>

          {/* Items Table */}
          <div className="mb-8">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-300">
                  <th className="text-left py-3 px-2">Item</th>
                  <th className="text-right py-3 px-2">Quantity</th>
                  <th className="text-right py-3 px-2">Price</th>
                  <th className="text-right py-3 px-2">Total</th>
                </tr>
              </thead>
              <tbody>
                {order.items.map((item, index) => (
                  <tr key={item.product.id} className="border-b">
                    <td className="py-3 px-2">
                      <div>
                        <p>{item.product.name}</p>
                        <p className="text-sm text-gray-600">{item.product.description}</p>
                      </div>
                    </td>
                    <td className="text-right py-3 px-2">{item.quantity}</td>
                    <td className="text-right py-3 px-2">₹{item.product.price.toFixed(2)}</td>
                    <td className="text-right py-3 px-2">
                      ₹{(item.quantity * item.product.price).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Totals */}
          <div className="flex justify-end mb-8">
            <div className="w-64">
              <div className="flex justify-between py-2 border-b">
                <span className="text-gray-600">Subtotal:</span>
                <span>₹{order.total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-gray-600">Shipping:</span>
                <span className="text-green-600">Free</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-gray-600">Tax:</span>
                <span>₹0.00</span>
              </div>
              <div className="flex justify-between py-3 border-t-2 border-gray-300">
                <span className="text-lg">Total:</span>
                <span className="text-2xl">₹{order.total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Payment Info */}
          <div className="bg-gray-50 p-4 rounded-lg mb-8">
            <h3 className="mb-2">Payment Information</h3>
            <p className="text-sm text-gray-600">Payment Method: {order.paymentMethod}</p>
            <p className="text-sm text-gray-600">Status: Paid</p>
          </div>

          {/* Footer */}
          <div className="text-center text-sm text-gray-600 border-t pt-6">
            <p className="mb-2">Thank you for your business!</p>
            <p>For questions about this invoice, please contact us at info@premiumdryfruits.com</p>
          </div>
        </div>
      </div>
    </div>
  );
}