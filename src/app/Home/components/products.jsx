"use client";
import { useState, useEffect } from "react";
import { Heart, HeartOff } from "lucide-react";
import { useToast } from "../../context/ToastContext";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [wishlist, setWishlist] = useState([]);
  const { showSuccess, showError, showInfo } = useToast();

  useEffect(() => {
    fetchProducts();
    fetchWishlist();
  }, []);

  const fetchWishlist = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        return;
      }

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
        const wishlistIds = result.data.map((item) => item._id);
        setWishlist(wishlistIds);
      }
    } catch (error) {
      console.error("Error fetching wishlist:", error);
    }
  };

  const fetchProducts = async () => {
    try {
      console.log("Fetching products...");
      const response = await fetch(
        "https://ecommerce.routemisr.com/api/v1/products",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Response status:", response.status);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log("Products API Response:", result);

      if (result.data && Array.isArray(result.data)) {
        console.log("Setting products:", result.data);
        setProducts(result.data);
      } else {
        console.log("No valid data found in response");
        setProducts([]);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const toggleWishlist = async (productId) => {
    try {
      // Get token from localStorage (assuming user is logged in)
      const token = localStorage.getItem("token");

      if (!token) {
        showInfo("Please login to add items to wishlist");
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
        // Update local wishlist state
        setWishlist((prevWishlist) => {
          const newWishlist = prevWishlist.includes(productId)
            ? prevWishlist.filter((id) => id !== productId)
            : [...prevWishlist, productId];
          return newWishlist;
        });

        // Show success message
        if (wishlist.includes(productId)) {
          showSuccess("Product removed from wishlist successfully!");
        } else {
          showSuccess("Product added to wishlist successfully!");
        }
      } else {
        showError(result.message || "Failed to update wishlist");
      }
    } catch (error) {
      console.error("Error updating wishlist:", error);
      showError("Failed to update wishlist. Please try again.");
    }
  };

  const isInWishlist = (productId) => {
    return wishlist.includes(productId);
  };

  const addToCart = (product) => {
    try {
      const savedCart = localStorage.getItem("cart") || "[]";
      const cart = JSON.parse(savedCart);

      // Check if product already exists in cart
      const existingItem = cart.find((item) => item.id === product._id);

      if (existingItem) {
        existingItem.quantity += 1;
        showSuccess(`Increased quantity of ${product.title} in cart!`);
      } else {
        cart.push({
          id: product._id,
          title: product.title,
          price: product.price,
          image: product.imageCover,
          quantity: 1,
        });
        showSuccess(`${product.title} added to cart successfully!`);
      }

      localStorage.setItem("cart", JSON.stringify(cart));
    } catch (error) {
      showError("Failed to add product to cart. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="py-8 relative w-full">
      <h2 className="text-2xl font-bold text-center mb-8 text-gray-800">
        Featured Products
      </h2>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {products.length > 0 ? (
            products.map((product) => (
              <div
                key={product._id}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group overflow-hidden"
              >
                {/* Product Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={product.imageCover}
                    alt={product.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />

                  {/* Wishlist Button */}
                  <button
                    onClick={() => toggleWishlist(product._id)}
                    className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-all duration-200 shadow-lg hover:shadow-xl"
                  >
                    {isInWishlist(product._id) ? (
                      <Heart className="w-5 h-5 text-red-500 fill-current" />
                    ) : (
                      <Heart className="w-5 h-5 text-gray-400 hover:text-red-500 transition-colors duration-200" />
                    )}
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
                  <div className="flex items-center justify-between mb-3">
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

                  {/* Add to Cart Button */}
                  <button
                    onClick={() => addToCart(product)}
                    className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-200 transform hover:scale-105"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center text-gray-500 py-8">
              No products found
            </div>
          )}
        </div>
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
