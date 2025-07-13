"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  ShoppingCartIcon,
  Bars3Icon,
  XMarkIcon,
  HeartIcon,
  ArchiveBoxIcon,
} from "@heroicons/react/24/outline";

export default function NavBar({}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);

  useEffect(() => {
    // Load cart count from localStorage
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      const cart = JSON.parse(savedCart);
      setCartCount(cart.length);
    }

    // Load wishlist count from API
    fetchWishlistCount();
  }, []);

  const fetchWishlistCount = async () => {
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
        setWishlistCount(result.data.length);
      }
    } catch (error) {
      console.error("Error fetching wishlist count:", error);
    }
  };

  return (
    <nav className="bg-white/95 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link
          href="/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <div className="w-8 h-8 gradient-bg rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">🛍️</span>
          </div>
          <span className="self-center text-2xl font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            E-Store
          </span>
        </Link>

        <div className="flex items-center space-x-4">
          {/* Desktop Navigation */}
          <div className="hidden w-full md:block md:w-auto">
            <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-transparent">
              <li>
                <a
                  href="/Home"
                  className="block py-2 px-3 text-white bg-blue-700 rounded-sm md:bg-transparent md:text-blue-700 md:p-0"
                  aria-current="page"
                >
                  Home
                </a>
              </li>
              {typeof window !== "undefined" &&
                localStorage.getItem("token") && (
                  <>
                    <li>
                      <a
                        href="/wishlist"
                        className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0"
                      >
                        Wishlist
                      </a>
                    </li>
                    <li>
                      <a
                        href="/orders"
                        className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0"
                      >
                        Orders
                      </a>
                    </li>
                  </>
                )}
              <li>
                <a
                  href="/cart"
                  className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0"
                >
                  Cart
                </a>
              </li>
            </ul>
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center space-x-2">
            {typeof window !== "undefined" && localStorage.getItem("token") ? (
              <>
                <span className="text-sm text-gray-600">
                  Welcome,{" "}
                  {JSON.parse(localStorage.getItem("user") || "{}").name}
                </span>
                <button
                  onClick={() => {
                    localStorage.removeItem("token");
                    localStorage.removeItem("user");
                    window.location.href = "/";
                  }}
                  className="text-red-600 hover:text-red-700 transition-colors duration-200 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-gray-600 hover:text-blue-700 transition-colors duration-200 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Sign In
                </Link>
                <Link
                  href="/register"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                >
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Wishlist Button */}
          {typeof window !== "undefined" && localStorage.getItem("token") && (
            <Link
              href="/wishlist"
              className="relative p-2 text-gray-600 hover:text-red-500 transition-colors duration-200"
            >
              <HeartIcon className="h-6 w-6" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold animate-pulse">
                  {wishlistCount}
                </span>
              )}
            </Link>
          )}

          {/* Cart Button */}
          <Link
            href="/cart"
            className="relative p-2 text-gray-600 hover:text-blue-700 transition-colors duration-200"
          >
            <ShoppingCartIcon className="h-6 w-6" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold animate-pulse">
                {cartCount}
              </span>
            )}
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
            aria-controls="navbar-default"
            aria-expanded={isMenuOpen}
          >
            <span className="sr-only">Open main menu</span>
            {isMenuOpen ? (
              <XMarkIcon className="w-5 h-5" />
            ) : (
              <Bars3Icon className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`${isMenuOpen ? "block" : "hidden"} w-full md:hidden`}
          id="navbar-default"
        >
          <ul className="font-medium flex flex-col p-4 mt-4 border border-gray-100 rounded-lg bg-gray-50">
            <li>
              <a
                href="/Home"
                className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100"
              >
                Home
              </a>
            </li>
            {typeof window !== "undefined" && localStorage.getItem("token") && (
              <>
                <li>
                  <a
                    href="/wishlist"
                    className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 flex items-center"
                  >
                    <HeartIcon className="h-4 w-4 mr-2" />
                    Wishlist
                  </a>
                </li>
                <li>
                  <a
                    href="/orders"
                    className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 flex items-center"
                  >
                    <ArchiveBoxIcon className="h-4 w-4 mr-2" />
                    Orders
                  </a>
                </li>
              </>
            )}
            <li>
              <a
                href="/cart"
                className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 flex items-center"
              >
                <ShoppingCartIcon className="h-4 w-4 mr-2" />
                Cart
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
