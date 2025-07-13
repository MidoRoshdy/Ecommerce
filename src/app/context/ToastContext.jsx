"use client";

import React, { createContext, useContext, useState } from "react";
import Toast from "../components/Toast";

const ToastContext = createContext();

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = (message, type = "info", duration = 3000) => {
    const id = Date.now();
    const newToast = { id, message, type, duration };

    setToasts((prev) => [...prev, newToast]);

    setTimeout(() => {
      removeToast(id);
    }, duration);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  const showSuccess = (message) => addToast(message, "success");
  const showError = (message) => addToast(message, "error");
  const showInfo = (message) => addToast(message, "info");
  const showWarning = (message) => addToast(message, "warning");

  const value = {
    showSuccess,
    showError,
    showInfo,
    showWarning,
    addToast,
    removeToast,
  };

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="fixed top-4 right-4 z-50 space-y-2">
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            message={toast.message}
            type={toast.type}
            isVisible={true}
            onClose={() => removeToast(toast.id)}
          />
        ))}
      </div>
    </ToastContext.Provider>
  );
};
