"use client";

import { useState } from "react";
import { ArrowLeftIcon, EnvelopeIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export default function ForgotPassword() {
  const [step, setStep] = useState(1); // 1: email, 2: verification code
  const [email, setEmail] = useState("");
  const [resetCode, setResetCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await fetch(
        "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setSuccess("Reset code sent to your email! Please check your inbox.");
        setStep(2);
      } else {
        setError(
          data.message || "Failed to send reset code. Please try again."
        );
      }
    } catch (err) {
      setError("Network error. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyCode = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await fetch(
        "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ resetCode }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setSuccess(
          "Code verified successfully! Redirecting to reset password..."
        );
        // Store email in localStorage for reset password page
        localStorage.setItem("resetEmail", email);
        // Redirect to reset password page after successful verification
        setTimeout(() => {
          window.location.href = "/resetPassword";
        }, 1500);
      } else {
        setError(data.message || "Invalid reset code. Please try again.");
      }
    } catch (err) {
      setError("Network error. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  const handleBackToEmail = () => {
    setStep(1);
    setResetCode("");
    setError("");
    setSuccess("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <div className="mx-auto h-12 w-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xl">🛍️</span>
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {step === 1 ? "Forgot your password?" : "Enter verification code"}
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            {step === 1
              ? "Enter your email address and we'll send you a reset code"
              : "Enter the 6-digit code sent to your email"}
          </p>
        </div>

        {step === 1 ? (
          <form className="mt-8 space-y-6" onSubmit={handleEmailSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Email address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <EnvelopeIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none relative block w-full pl-10 px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder="Enter your email address"
                />
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">
                {error}
              </div>
            )}

            {success && (
              <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-md text-sm">
                {success}
              </div>
            )}

            <div>
              <button
                type="submit"
                disabled={loading}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              >
                {loading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Sending code...
                  </div>
                ) : (
                  "Send reset code"
                )}
              </button>
            </div>

            <div className="text-center">
              <Link
                href="/login"
                className="font-medium text-blue-600 hover:text-blue-500 flex items-center justify-center"
              >
                <ArrowLeftIcon className="h-4 w-4 mr-1" />
                Back to sign in
              </Link>
            </div>
          </form>
        ) : (
          <form className="mt-8 space-y-6" onSubmit={handleVerifyCode}>
            <div>
              <label
                htmlFor="resetCode"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Verification code
              </label>
              <input
                id="resetCode"
                name="resetCode"
                type="text"
                required
                value={resetCode}
                onChange={(e) => setResetCode(e.target.value)}
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm text-center text-lg font-mono tracking-widest"
                placeholder="000000"
                maxLength={6}
                pattern="[0-9]{6}"
              />
              <p className="mt-1 text-xs text-gray-500 text-center">
                Enter the 6-digit code sent to {email}
              </p>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">
                {error}
              </div>
            )}

            {success && (
              <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-md text-sm">
                {success}
              </div>
            )}

            <div className="space-y-3">
              <button
                type="submit"
                disabled={loading}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              >
                {loading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Verifying code...
                  </div>
                ) : (
                  "Verify code"
                )}
              </button>

              <button
                type="button"
                onClick={handleBackToEmail}
                className="w-full flex justify-center py-2 px-4 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
              >
                <ArrowLeftIcon className="h-4 w-4 mr-2" />
                Back to email
              </button>
            </div>

            <div className="text-center">
              <Link
                href="/login"
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                Back to sign in
              </Link>
            </div>
          </form>
        )}

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-gradient-to-br from-blue-50 to-purple-50 text-gray-500">
                Need help?
              </span>
            </div>
          </div>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Can't find the email? Check your spam folder or{" "}
              <button
                onClick={() => setStep(1)}
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                try a different email address
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
