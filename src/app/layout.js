import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavBar from "./NavBar/page";
import Footer from "./components/Footer";
import { ToastProvider } from "./context/ToastContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "E-Store - Modern Ecommerce",
  description: "A modern ecommerce platform built with Next.js and React",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ToastProvider>
          <NavBar />
          <div className="px-2 py-4"></div>
          <main className="min-h-screen">{children}</main>
          <Footer />
        </ToastProvider>
      </body>
    </html>
  );
}
