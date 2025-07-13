"use client";
import { useState, useEffect } from "react";

export default function SpecificCategory({
  categoryId = "6407ea3d5bbc6e43516931df",
}) {
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchSpecificCategory();
  }, [categoryId]);

  const fetchSpecificCategory = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log("Fetching specific category:", categoryId);

      const response = await fetch(
        `https://ecommerce.routemisr.com/api/v1/categories/${categoryId}`,
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
      console.log("Specific Category API Response:", result);

      if (result.data) {
        console.log("Setting category:", result.data);
        setCategory(result.data);
      } else {
        console.log("No valid data found in response");
        setError("Category not found");
      }
    } catch (error) {
      console.error("Error fetching specific category:", error);
      setError("Failed to load category");
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

  if (error) {
    return (
      <div className="py-8 text-center">
        <div className="text-red-500 text-lg font-medium mb-4">{error}</div>
        <button
          onClick={fetchSpecificCategory}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (!category) {
    return (
      <div className="py-8 text-center text-gray-500">No category found</div>
    );
  }

  return (
    <div className="py-8 relative w-full">
      <h2 className="text-2xl font-bold text-center mb-8 text-gray-800">
        Category Details
      </h2>

      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex flex-col md:flex-row items-center gap-6">
            {/* Category Image */}
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg overflow-hidden">
              {category.image ? (
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover rounded-full"
                  onError={(e) => {
                    e.target.style.display = "none";
                    e.target.nextSibling.style.display = "flex";
                  }}
                />
              ) : null}
              <div
                className={`${
                  category.image ? "hidden" : "flex"
                } items-center justify-center text-4xl`}
              >
                📦
              </div>
            </div>

            {/* Category Details */}
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                {category.name}
              </h3>
              <p className="text-gray-600 mb-4">Slug: {category.slug}</p>
              <div className="text-sm text-gray-500">
                <p>ID: {category._id}</p>
                <p>
                  Created: {new Date(category.createdAt).toLocaleDateString()}
                </p>
                <p>
                  Updated: {new Date(category.updatedAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
