"use client";

import { useState, useEffect } from "react";
import { TrashIcon, ShoppingCartIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export default function Cart() {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = () => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
    setLoading(false);
  };

  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(itemId);
      return;
    }

    const updatedCart = cart.map((item) =>
      item.id === itemId ? { ...item, quantity: newQuantity } : item
    );
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const removeFromCart = (itemId) => {
    const updatedCart = cart.filter((item) => item.id !== itemId);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Shopping Cart
          </h1>
          <p className="text-lg text-gray-600">
            {cart.length} item{cart.length !== 1 ? "s" : ""} in your cart
          </p>
        </div>

        {cart.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingCartIcon className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              Your cart is empty
            </h3>
            <p className="text-gray-600 mb-8">
              Start shopping to add items to your cart
            </p>
            <Link
              href="/Home"
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="space-y-6">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg"
                >
                  <div className="flex-shrink-0 w-20 h-20 bg-gray-100 rounded-lg p-2">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-contain"
                    />
                  </div>

                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
                      {item.title}
                    </h3>
                    <p className="text-lg font-bold text-purple-600">
                      ${item.price}
                    </p>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                        className="w-8 h-8 rounded-full border-2 border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors duration-200 font-bold text-sm"
                      >
                        -
                      </button>
                      <span className="w-8 text-center font-semibold text-lg">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        className="w-8 h-8 rounded-full border-2 border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors duration-200 font-bold text-sm"
                      >
                        +
                      </button>
                    </div>

                    <div className="text-right">
                      <p className="text-lg font-bold text-gray-900">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-500 hover:text-red-700 transition-colors duration-200 p-2"
                    >
                      <TrashIcon className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-200 mt-8 pt-8">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900">Total</h3>
                <p className="text-2xl font-bold text-purple-600">
                  ${calculateTotal().toFixed(2)}
                </p>
              </div>

              <div className="space-y-4">
                <Link
                  href="/checkout"
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center"
                >
                  Proceed to Checkout
                </Link>
                <Link
                  href="/Home"
                  className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-3 px-6 rounded-xl transition-colors duration-200 flex items-center justify-center"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
