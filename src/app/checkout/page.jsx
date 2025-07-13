"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  CreditCardIcon,
  LockClosedIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";
import { useToast } from "../context/ToastContext";

export default function Checkout() {
  const router = useRouter();
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("card");
  const { showSuccess, showError } = useToast();
  const [formData, setFormData] = useState({
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: "",
    email: "",
    address: "",
    city: "",
    zipCode: "",
  });

  useEffect(() => {
    // Load cart from localStorage
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    } else {
      // Redirect to home if no cart
      router.push("/Home");
    }
  }, [router]);

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const calculateTax = () => {
    return calculateTotal() * 0.15; // 15% tax
  };

  const calculateShipping = () => {
    return calculateTotal() > 100 ? 0 : 10; // Free shipping over $100
  };

  const calculateFinalTotal = () => {
    return calculateTotal() + calculateTax() + calculateShipping();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(" ");
    } else {
      return v;
    }
  };

  const handleCardNumberChange = (e) => {
    const formatted = formatCardNumber(e.target.value);
    setFormData((prev) => ({
      ...prev,
      cardNumber: formatted,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simulate payment processing
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Create order object
      const order = {
        items: cart,
        total: calculateTotal(),
        tax: calculateTax(),
        shipping: calculateShipping(),
        finalTotal: calculateFinalTotal(),
        customerInfo: {
          email: formData.email,
          address: formData.address,
          city: formData.city,
          zipCode: formData.zipCode,
        },
        paymentMethod,
        orderDate: new Date().toISOString(),
        orderId: `ORD-${Date.now()}`,
      };

      // Save order to localStorage (in real app, this would go to backend)
      const orders = JSON.parse(localStorage.getItem("orders") || "[]");
      orders.push(order);
      localStorage.setItem("orders", JSON.stringify(orders));

      // Clear cart
      localStorage.removeItem("cart");

      // Show success and redirect
      showSuccess("Payment successful! Order placed successfully.");
      router.push("/Home");
    } catch (error) {
      showError("Payment failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Your cart is empty
          </h2>
          <button
            onClick={() => router.push("/Home")}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16">
          {/* Order Summary */}
          <div className="lg:col-span-1">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">
              Order Summary
            </h2>
            <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
              <div className="space-y-4">
                {cart.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4">
                    <div className="flex-shrink-0 w-16 h-16 bg-gray-100 rounded-lg p-2">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-medium text-gray-900 line-clamp-2">
                        {item.title}
                      </h3>
                      <p className="text-sm text-gray-500">
                        Qty: {item.quantity}
                      </p>
                    </div>
                    <div className="text-sm font-medium text-gray-900">
                      ${(item.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-200 mt-6 pt-6 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">
                    ${calculateTotal().toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Tax (15%)</span>
                  <span className="font-medium">
                    ${calculateTax().toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium">
                    {calculateShipping() === 0
                      ? "Free"
                      : `$${calculateShipping().toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between text-lg font-bold border-t border-gray-200 pt-3">
                  <span>Total</span>
                  <span>${calculateFinalTotal().toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Form */}
          <div className="lg:col-span-1">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">
              Payment Information
            </h2>
            <div className="bg-white rounded-xl shadow-lg p-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Payment Method Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Payment Method
                  </label>
                  <div className="space-y-3">
                    <label className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="card"
                        checked={paymentMethod === "card"}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                      />
                      <CreditCardIcon className="h-5 w-5 text-gray-400" />
                      <span className="text-sm font-medium text-gray-700">
                        Credit Card
                      </span>
                    </label>
                  </div>
                </div>

                {/* Card Information */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Card Number
                    </label>
                    <input
                      type="text"
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={handleCardNumberChange}
                      placeholder="1234 5678 9012 3456"
                      maxLength={19}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        name="expiryDate"
                        value={formData.expiryDate}
                        onChange={handleInputChange}
                        placeholder="MM/YY"
                        maxLength={5}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        CVV
                      </label>
                      <input
                        type="text"
                        name="cvv"
                        value={formData.cvv}
                        onChange={handleInputChange}
                        placeholder="123"
                        maxLength={4}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Cardholder Name
                    </label>
                    <input
                      type="text"
                      name="cardName"
                      value={formData.cardName}
                      onChange={handleInputChange}
                      placeholder="John Doe"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                </div>

                {/* Shipping Information */}
                <div className="border-t border-gray-200 pt-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    Shipping Information
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="your@email.com"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Address
                      </label>
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        placeholder="123 Main St"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          City
                        </label>
                        <input
                          type="text"
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          placeholder="New York"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          ZIP Code
                        </label>
                        <input
                          type="text"
                          name="zipCode"
                          value={formData.zipCode}
                          onChange={handleInputChange}
                          placeholder="10001"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Security Notice */}
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <LockClosedIcon className="h-4 w-4" />
                  <span>Your payment information is secure and encrypted</span>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-4 px-6 rounded-xl hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  {loading ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Processing Payment...
                    </div>
                  ) : (
                    <div className="flex items-center justify-center">
                      <CheckCircleIcon className="h-5 w-5 mr-2" />
                      Complete Order - ${calculateFinalTotal().toFixed(2)}
                    </div>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
