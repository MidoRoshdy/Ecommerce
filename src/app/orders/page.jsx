"use client";

import { useState, useEffect } from "react";
import { Package, Calendar, MapPin, CreditCard } from "lucide-react";

export default function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = () => {
    const savedOrders = localStorage.getItem("orders");
    if (savedOrders) {
      setOrders(JSON.parse(savedOrders));
    }
  };

  const getOrderStatus = (orderDate) => {
    const orderTime = new Date(orderDate);
    const now = new Date();
    const diffInHours = (now - orderTime) / (1000 * 60 * 60);

    if (diffInHours < 1) {
      return {
        status: "Processing",
        color: "text-yellow-600",
        bgColor: "bg-yellow-100",
      };
    } else if (diffInHours < 24) {
      return {
        status: "Shipped",
        color: "text-blue-600",
        bgColor: "bg-blue-100",
      };
    } else {
      return {
        status: "Delivered",
        color: "text-green-600",
        bgColor: "bg-green-100",
      };
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">My Orders</h1>
          <p className="text-lg text-gray-600">
            Track your order history and delivery status
          </p>
        </div>

        {orders.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Package className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              No orders yet
            </h3>
            <p className="text-gray-600 mb-8">
              Start shopping to see your orders here
            </p>
            <button
              onClick={() => (window.location.href = "/Home")}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
            >
              Start Shopping
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order, index) => {
              const statusInfo = getOrderStatus(order.orderDate);
              return (
                <div
                  key={order.orderId}
                  className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300"
                >
                  {/* Order Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        Order #{order.orderId}
                      </h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-4 w-4" />
                          <span>
                            {new Date(order.orderDate).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <CreditCard className="h-4 w-4" />
                          <span className="capitalize">
                            {order.paymentMethod}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 sm:mt-0">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${statusInfo.bgColor} ${statusInfo.color}`}
                      >
                        {statusInfo.status}
                      </span>
                    </div>
                  </div>

                  {/* Order Items */}
                  <div className="space-y-4 mb-6">
                    <h4 className="font-medium text-gray-900">Order Items</h4>
                    <div className="space-y-3">
                      {order.items.map((item, itemIndex) => (
                        <div
                          key={itemIndex}
                          className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg"
                        >
                          <div className="flex-shrink-0 w-12 h-12 bg-white rounded-lg p-2">
                            <img
                              src={item.image}
                              alt={item.title}
                              className="w-full h-full object-contain"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h5 className="text-sm font-medium text-gray-900 truncate">
                              {item.title}
                            </h5>
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
                  </div>

                  {/* Order Summary */}
                  <div className="border-t border-gray-200 pt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Shipping Information */}
                      <div>
                        <h4 className="font-medium text-gray-900 mb-3 flex items-center">
                          <MapPin className="h-4 w-4 mr-2" />
                          Shipping Address
                        </h4>
                        <div className="text-sm text-gray-600 space-y-1">
                          <p>{order.customerInfo.email}</p>
                          <p>{order.customerInfo.address}</p>
                          <p>
                            {order.customerInfo.city},{" "}
                            {order.customerInfo.zipCode}
                          </p>
                        </div>
                      </div>

                      {/* Order Totals */}
                      <div>
                        <h4 className="font-medium text-gray-900 mb-3">
                          Order Summary
                        </h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Subtotal</span>
                            <span className="font-medium">
                              ${order.total.toFixed(2)}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Tax</span>
                            <span className="font-medium">
                              ${order.tax.toFixed(2)}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Shipping</span>
                            <span className="font-medium">
                              {order.shipping === 0
                                ? "Free"
                                : `$${order.shipping.toFixed(2)}`}
                            </span>
                          </div>
                          <div className="flex justify-between text-lg font-bold border-t border-gray-200 pt-2">
                            <span>Total</span>
                            <span>${order.finalTotal.toFixed(2)}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
