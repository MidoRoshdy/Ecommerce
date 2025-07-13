"use client";
import { useState, useEffect } from "react";

export default function Subcategories() {
  const [subcategories, setSubcategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSubcategories();
  }, []);

  const fetchSubcategories = async () => {
    try {
      console.log("Fetching subcategories...");
      const response = await fetch(
        "https://ecommerce.routemisr.com/api/v1/subcategories",
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
      console.log("Subcategories API Response:", result);

      if (result.data && Array.isArray(result.data)) {
        console.log("Setting subcategories:", result.data);
        setSubcategories(result.data);
      } else {
        console.log("No valid data found in response");
        setSubcategories([]);
      }
    } catch (error) {
      console.error("Error fetching subcategories:", error);
      setSubcategories([]);
    } finally {
      setLoading(false);
    }
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
        Subcategories
      </h2>

      {/* Subcategories Container - centered */}
      <div className="w-full px-16 flex justify-center">
        <div
          className="flex gap-6 overflow-x-auto scrollbar-hide pb-4 justify-center"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {subcategories.length > 0 ? (
            subcategories.map((subcategory) => (
              <div
                key={subcategory._id}
                className="flex flex-col items-center group cursor-pointer transition-all duration-300 hover:scale-105 min-w-[120px] flex-shrink-0"
              >
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-green-500 to-blue-600 flex items-center justify-center mb-3 shadow-lg hover:shadow-xl transition-all duration-300 group-hover:from-green-600 group-hover:to-blue-700 overflow-hidden">
                  {subcategory.image ? (
                    <img
                      src={subcategory.image}
                      alt={subcategory.name}
                      className="w-full h-full object-cover rounded-full"
                      onError={(e) => {
                        e.target.style.display = "none";
                        e.target.nextSibling.style.display = "flex";
                      }}
                    />
                  ) : null}
                  <div
                    className={`${
                      subcategory.image ? "hidden" : "flex"
                    } items-center justify-center text-3xl`}
                  >
                    📦
                  </div>
                </div>
                <h3 className="text-sm font-medium text-gray-700 text-center group-hover:text-green-600 transition-colors duration-300">
                  {subcategory.name}
                </h3>
                {subcategory.category && (
                  <p className="text-xs text-gray-500 text-center">
                    {subcategory.category}
                  </p>
                )}
              </div>
            ))
          ) : (
            <div className="text-center text-gray-500 w-full">
              No subcategories found
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
