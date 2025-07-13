"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function Carousel() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          "https://ecommerce.routemisr.com/api/v1/products"
        );
        const data = await response.json();

        const shuffled = data.data.sort(() => 0.5 - Math.random());
        const selectedProducts = shuffled.slice(0, 4);

        console.log("Selected products:", selectedProducts);
        setProducts(selectedProducts);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % products.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + products.length) % products.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  if (loading) {
    return (
      <div className="container mx-auto px-8 py-10">
        <div className="relative w-full max-w-4xl mx-auto">
          <div className="relative h-64 overflow-hidden rounded-2xl md:h-96 bg-gradient-to-r from-gray-200 to-gray-300 animate-pulse">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-gray-500 text-lg">Loading carousel...</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-8 py-10">
      <div className="relative w-full max-w-4xl mx-auto">
        {/* Carousel wrapper */}
        <div className="relative h-64 overflow-hidden rounded-2xl md:h-96 shadow-2xl">
          {products.map((product, index) => (
            <div
              key={product._id}
              className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                index === currentSlide
                  ? "opacity-100 scale-100"
                  : "opacity-0 scale-105"
              }`}
            >
              <img
                src={product.imageCover}
                className="absolute inset-0 w-full h-full object-cover"
                alt={`${product.title} product`}
                onError={(e) => {
                  console.error("Image failed to load:", e.target.src);
                  e.target.style.display = "none";
                }}
                onLoad={() => {
                  console.log("Image loaded successfully:", product.imageCover);
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end justify-center pb-8">
                <div className="text-center text-white bg-black/20 backdrop-blur-sm p-6 rounded-2xl border border-white/20">
                  <h3 className="text-2xl font-bold mb-2 text-white">
                    {product.title}
                  </h3>
                  <p className="text-xl font-semibold mb-2 text-green-400">
                    ${product.price}
                  </p>
                  <p className="text-sm text-gray-200 line-clamp-2 max-w-md">
                    {product.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Slider indicators */}
        <div className="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3 rtl:space-x-reverse">
          {products.map((product, index) => (
            <button
              key={product._id}
              type="button"
              className={`w-4 h-4 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? "bg-white scale-125"
                  : "bg-white/50 hover:bg-white/75 hover:scale-110"
              }`}
              aria-label={`Go to slide ${index + 1}`}
              onClick={() => goToSlide(index)}
            ></button>
          ))}
        </div>

        {/* Slider controls */}
        <button
          type="button"
          className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
          onClick={prevSlide}
        >
          <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-black/30 backdrop-blur-sm group-hover:bg-black/50 group-focus:ring-4 group-focus:ring-white/50 group-focus:outline-none transition-all duration-300 hover:scale-110">
            <svg
              className="w-6 h-6 text-white rtl:rotate-180"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 1 1 5l4 4"
              />
            </svg>
            <span className="sr-only">Previous</span>
          </span>
        </button>

        <button
          type="button"
          className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
          onClick={nextSlide}
        >
          <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-black/30 backdrop-blur-sm group-hover:bg-black/50 group-focus:ring-4 group-focus:ring-white/50 group-focus:outline-none transition-all duration-300 hover:scale-110">
            <svg
              className="w-6 h-6 text-white rtl:rotate-180"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 9 4-4-4-4"
              />
            </svg>
            <span className="sr-only">Next</span>
          </span>
        </button>
      </div>
    </div>
  );
}
