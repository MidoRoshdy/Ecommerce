"use client";

import { useState, useEffect } from "react";
import { Heart, Trash2, ShoppingCart } from "lucide-react";
import { useToast } from "../context/ToastContext";

export default function Wishlist() {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const { showSuccess, showError, showInfo } = useToast();

  useEffect(() => {
    loadWishlistItems();
  }, []);
  //hi
  const loadWishlistItems = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setLoading(false);
        return;
      }

      // Fetch wishlist from API
      const response = await fetch(
        "https://ecommerce.routemisr.com/api/v1/wishlist",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            token: token,
          },
        }
      );

      if (response.ok) {
        const result = await response.json();
        setWishlistItems(result.data || []);
      } else {
        console.error("Failed to load wishlist");
        setWishlistItems([]);
      }
    } catch (error) {
      console.error("Error loading wishlist items:", error);
      setWishlistItems([]);
    } finally {
      setLoading(false);
    }
  };

  const removeFromWishlist = async (productId) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        showInfo("Please login to manage wishlist");
        return;
      }

      const response = await fetch(
        "https://ecommerce.routemisr.com/api/v1/wishlist",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            token: token,
          },
          body: JSON.stringify({ productId }),
        }
      );

      const result = await response.json();

      if (response.ok) {
        // Remove from local state
        setWishlistItems((prev) =>
          prev.filter((item) => item._id !== productId)
        );
        showSuccess("Product removed from wishlist!");
      } else {
        showError(result.message || "Failed to remove from wishlist");
      }
    } catch (error) {
      console.error("Error removing from wishlist:", error);
      showError("Failed to remove from wishlist. Please try again.");
    }
  };

  const addToCart = (product) => {
    const savedCart = localStorage.getItem("cart") || "[]";
    const cart = JSON.parse(savedCart);

    // Check if product already exists in cart
    const existingItem = cart.find((item) => item.id === product._id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({
        id: product._id,
        title: product.title,
        price: product.price,
        image: product.imageCover,
        quantity: 1,
      });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    showSuccess("Product added to cart!");
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">My Wishlist</h1>
          <p className="text-lg text-gray-600">
            {wishlistItems.length} item{wishlistItems.length !== 1 ? "s" : ""}{" "}
            in your wishlist
          </p>
        </div>

        {wishlistItems.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Heart className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              Your wishlist is empty
            </h3>
            <p className="text-gray-600 mb-8">
              Start adding products to your wishlist to see them here
            </p>
            <button
              onClick={() => (window.location.href = "/Home")}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
            >
              Start Shopping
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {wishlistItems.map((product) => (
              <div
                key={product._id}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
              >
                {/* Product Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={product.imageCover}
                    alt={product.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />

                  {/* Remove from Wishlist Button */}
                  <button
                    onClick={() => removeFromWishlist(product._id)}
                    className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-all duration-200 shadow-lg hover:shadow-xl"
                  >
                    <Trash2 className="w-5 h-5 text-red-500" />
                  </button>

                  {/* Discount Badge */}
                  {product.discount && product.discount > 0 && (
                    <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                      -{product.discount}%
                    </div>
                  )}
                </div>

                {/* Product Info */}
                <div className="p-4">
                  <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2 group-hover:text-purple-600 transition-colors duration-200">
                    {product.title}
                  </h3>

                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                    {product.description}
                  </p>

                  {/* Price */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      {product.discount && product.discount > 0 ? (
                        <>
                          <span className="text-lg font-bold text-purple-600">
                            ${product.priceAfterDiscount}
                          </span>
                          <span className="text-sm text-gray-400 line-through">
                            ${product.price}
                          </span>
                        </>
                      ) : (
                        <span className="text-lg font-bold text-purple-600">
                          ${product.price}
                        </span>
                      )}
                    </div>

                    {/* Rating */}
                    <div className="flex items-center gap-1">
                      <span className="text-yellow-500">⭐</span>
                      <span className="text-sm text-gray-600">
                        {product.ratingsAverage || 0}
                      </span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => addToCart(product)}
                      className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-200 transform hover:scale-105 flex items-center justify-center gap-2"
                    >
                      <ShoppingCart className="w-4 h-4" />
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Custom styles for line-clamp */}
      <style jsx>{`
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}
