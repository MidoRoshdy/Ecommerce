"use client";
import { useState, useEffect, useRef } from "react";

export default function Category() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      console.log("Fetching categories...");
      const response = await fetch(
        "https://ecommerce.routemisr.com/api/v1/categories",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Response status:", response.status);
      console.log("Response ok:", response.ok);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log("API Response:", result);

      if (result.data && Array.isArray(result.data)) {
        console.log("Setting categories:", result.data);
        setCategories(result.data);
      } else {
        console.log("No valid data found in response");
        setCategories([]);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
      setCategories([]);
    } finally {
      setLoading(false);
    }
  };

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -200,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 200,
        behavior: "smooth",
      });
    }
  };

  // Category icons mapping
  const getCategoryIcon = (categoryName) => {
    const iconMap = {
      Electronics: "📱",
      Mobiles: "📱",
      "Men's Fashion": "👔",
      "Women's Fashion": "👗",
      Books: "📚",
      Home: "🏠",
      SuperMarket: "🛒",
      "Baby & Toys": "🧸",
      "Beauty & Health": "💄",
      Music: "🎵",
      Sports: "⚽",
      Automotive: "🚗",
      Health: "💊",
      Food: "🍎",
      Jewelry: "💍",
      Tools: "🔧",
      "Pet Supplies": "🐕",
      Office: "💼",
      Movies: "🎬",
      Garden: "🌱",
      Kitchen: "🍳",
      Furniture: "🪑",
    };

    return iconMap[categoryName] || "📦"; // Default icon
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="py-8 relative w-full">
      <h2 className="text-2xl font-bold text-center mb-8 text-gray-800">
        Shop by Category
      </h2>

      {/* Categories Container - centered */}
      <div className="w-full px-16 flex justify-center">
        <div
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto scrollbar-hide pb-4 justify-center"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {categories.length > 0 ? (
            categories.map((category) => (
              <div
                key={category._id}
                className="flex flex-col items-center group cursor-pointer transition-all duration-300 hover:scale-105 min-w-[120px] flex-shrink-0"
              >
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center mb-3 shadow-lg hover:shadow-xl transition-all duration-300 group-hover:from-blue-600 group-hover:to-purple-700 overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover rounded-full"
                    onError={(e) => {
                      e.target.style.display = "none";
                      e.target.nextSibling.style.display = "flex";
                    }}
                  />
                  <div className="hidden items-center justify-center text-3xl">
                    {getCategoryIcon(category.name)}
                  </div>
                </div>
                <h3 className="text-sm font-medium text-gray-700 text-center group-hover:text-blue-600 transition-colors duration-300">
                  {category.name}
                </h3>
              </div>
            ))
          ) : (
            <div className="text-center text-gray-500 w-full">
              No categories found
            </div>
          )}
        </div>
      </div>

      {/* Custom scrollbar styles */}
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}
