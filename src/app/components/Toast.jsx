"use client";

import { useState, useEffect } from "react";
import {
  CheckCircleIcon,
  XCircleIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";

export default function Toast({
  message,
  type = "success",
  isVisible = true,
  onClose,
}) {
  const [isShowing, setIsShowing] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsShowing(false);
      setTimeout(onClose, 300); // Wait for animation to complete
    }, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const getIcon = () => {
    switch (type) {
      case "success":
        return <CheckCircleIcon className="h-6 w-6 text-green-500" />;
      case "error":
        return <XCircleIcon className="h-6 w-6 text-red-500" />;
      case "info":
        return <InformationCircleIcon className="h-6 w-6 text-blue-500" />;
      default:
        return <CheckCircleIcon className="h-6 w-6 text-green-500" />;
    }
  };

  const getBgColor = () => {
    switch (type) {
      case "success":
        return "bg-green-50 border-green-200";
      case "error":
        return "bg-red-50 border-red-200";
      case "info":
        return "bg-blue-50 border-blue-200";
      default:
        return "bg-green-50 border-green-200";
    }
  };

  const getTextColor = () => {
    switch (type) {
      case "success":
        return "text-green-800";
      case "error":
        return "text-red-800";
      case "info":
        return "text-blue-800";
      default:
        return "text-green-800";
    }
  };

  if (!isShowing) return null;

  return (
    <div className="fixed top-4 right-4 z-50">
      <div
        className={`
          ${getBgColor()}
          ${getTextColor()}
          border rounded-lg shadow-lg p-4 max-w-sm w-full
          transform transition-all duration-300 ease-in-out
          ${
            isShowing
              ? "translate-x-0 opacity-100"
              : "translate-x-full opacity-0"
          }
          animate-bounce
        `}
      >
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0">{getIcon()}</div>
          <div className="flex-1">
            <p className="text-sm font-medium">{message}</p>
          </div>
          <button
            onClick={() => {
              setIsShowing(false);
              setTimeout(onClose, 300);
            }}
            className="flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors duration-200"
          >
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
