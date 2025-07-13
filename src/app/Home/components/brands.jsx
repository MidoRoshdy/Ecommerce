"use client";
import { useState, useEffect, useRef } from "react";

export default function Brands() {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    fetchBrands();
  }, []);

  const fetchBrands = async () => {
    try {
      console.log("Fetching brands...");
      const response = await fetch(
        "https://ecommerce.routemisr.com/api/v1/brands",
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
      console.log("Brands API Response:", result);

      if (result.data && Array.isArray(result.data)) {
        console.log("Setting brands:", result.data);
        setBrands(result.data);
      } else {
        console.log("No valid data found in response");
        setBrands([]);
      }
    } catch (error) {
      console.error("Error fetching brands:", error);
      setBrands([]);
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

  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
      </div>
    );
  }

  return (
    <div className="py-8 relative w-full">
      <h2 className="text-2xl font-bold text-center mb-8 text-gray-800">
        Popular Brands
      </h2>

      {/* Brands Container - centered */}
      <div className="w-full px-16 flex justify-center">
        <div
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto scrollbar-hide pb-4 justify-center"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {brands.length > 0 ? (
            brands.map((brand) => (
              <div
                key={brand._id}
                className="flex flex-col items-center group cursor-pointer transition-all duration-300 hover:scale-105 min-w-[120px] flex-shrink-0"
              >
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-green-500 to-teal-600 flex items-center justify-center mb-3 shadow-lg hover:shadow-xl transition-all duration-300 group-hover:from-green-600 group-hover:to-teal-700 overflow-hidden">
                  {brand.image ? (
                    <img
                      src={brand.image}
                      alt={brand.name}
                      className="w-full h-full object-cover rounded-full"
                      onError={(e) => {
                        e.target.style.display = "none";
                        e.target.nextSibling.style.display = "flex";
                      }}
                    />
                  ) : null}
                  <div
                    className={`${
                      brand.image ? "hidden" : "flex"
                    } items-center justify-center text-3xl`}
                  >
                    🏷️
                  </div>
                </div>
                <h3 className="text-sm font-medium text-gray-700 text-center group-hover:text-green-600 transition-colors duration-300">
                  {brand.name}
                </h3>
              </div>
            ))
          ) : (
            <div className="text-center text-gray-500 w-full">
              No brands found
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
