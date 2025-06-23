"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { ShoppingCart, User, Menu, X, Search, Heart } from "lucide-react";
import { useAuth } from "../providers/auth-provider";
import { Button } from "../ui/button";
import { useSelector } from "react-redux";
import type { RootState } from "@/redux/store";

// Demo product data for search suggestions
const demoProducts = [
  { id: 1, name: "Wireless Headphones" },
  { id: 2, name: "Smartphone" },
  { id: 3, name: "Bluetooth Speaker" },
  { id: 4, name: "Laptop" },
  { id: 5, name: "Smartwatch" },
  { id: 6, name: "Camera" },
  { id: 7, name: "Tablet" },
  { id: 8, name: "Gaming Console" },
  { id: 9, name: "Monitor" },
  { id: 10, name: "Keyboard" },
];

function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debouncedValue;
}

export default function MainHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLUListElement>(null);
  const debouncedSearch = useDebounce(search, 300);
  const filteredProducts =
    debouncedSearch.length > 0
      ? demoProducts.filter((p) =>
          p.name.toLowerCase().includes(debouncedSearch.toLowerCase())
        )
      : [];

  useEffect(() => {
    setShowSuggestions(
      debouncedSearch.length > 0 && filteredProducts.length > 0
    );
  }, [debouncedSearch, filteredProducts.length]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node) &&
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    }
    if (showSuggestions) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showSuggestions]);

  const { user, isAuthenticated } = useAuth();
  const cartCount = useSelector((state: RootState) =>
    state.cart.items.reduce((sum, item) => sum + item.quantity, 0)
  );
  const wishlistCount = useSelector(
    (state: RootState) => state.wishlist.items.length
  );
  console.log(" MainHeader ~ user:", user);

  return (
    <header className="sticky top-0 z-50 bg-white border-b shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-extrabold text-red-600">Shop</span>
            <span className="text-xl font-bold text-black">Zone</span>
          </Link>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          <Link href="/" className="hover:text-red-600 font-medium transition">
            Home
          </Link>
          <Link
            href="/all-products"
            className="hover:text-red-600 font-medium transition"
          >
            Shop
          </Link>
          <Link href="/" className="hover:text-red-600 font-medium transition">
            Deals
          </Link>
          <Link href="/" className="hover:text-red-600 font-medium transition">
            Contact
          </Link>
        </nav>

        {/* Search Bar */}
        <div className="flex-1 mx-6 max-w-xl hidden md:block relative">
          <form
            className="flex"
            onSubmit={(e) => e.preventDefault()}
            autoComplete="off"
          >
            <input
              ref={searchRef}
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onFocus={() => setShowSuggestions(filteredProducts.length > 0)}
              placeholder="Search for products, brands, and more..."
              className="w-full px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-red-200"
            />
            <button
              type="submit"
              className="bg-red-600 hover:bg-red-700 text-white px-4 rounded-r-md flex items-center"
            >
              <Search className="w-5 h-5" />
            </button>
          </form>
          {showSuggestions && (
            <ul
              ref={suggestionsRef}
              className="absolute left-0 right-0 bg-white border border-gray-200 rounded-b-md shadow-lg z-20 mt-1 max-h-60 overflow-y-auto"
            >
              {filteredProducts.map((product) => (
                <li
                  key={product.id}
                  className="px-4 py-2 hover:bg-red-50 cursor-pointer text-gray-900"
                  onMouseDown={() => {
                    setSearch(product.name);
                    setShowSuggestions(false);
                  }}
                >
                  {product.name}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Icons */}
        <div className="flex items-center gap-2">
          {isAuthenticated ? (
            <>
              <Link href="/customer/cart" className="relative group">
                <Button variant={"outline"}>
                  <ShoppingCart className="w-6 h-6 text-gray-700 group-hover:text-red-600 transition" />
                  {cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full px-1.5 py-0.5 font-bold">
                      {cartCount}
                    </span>
                  )}
                </Button>
              </Link>
              <Link href="/customer/wishlist" className="relative">
                <Button variant={"outline"}>
                  <Heart
                    className={`w-6 h-6 ${
                      wishlistCount > 0
                        ? "text-red-600 fill-red-100"
                        : "text-gray-400"
                    }`}
                  />
                </Button>
                {wishlistCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full px-1.5 py-0.5">
                    {wishlistCount}
                  </span>
                )}
              </Link>
              <Link href={`/${user?.role}/profile`}>
                <Button variant={"outline"}>
                  <User className="w-6 h-6 text-gray-700 hover:text-red-600 transition" />
                </Button>
              </Link>
            </>
          ) : (
            <>
              <Link href="/login">
                <button className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100 font-medium transition">
                  Login
                </button>
              </Link>
              <Link href="/register">
                <button className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700 font-medium transition">
                  Register
                </button>
              </Link>
            </>
          )}
          {/* Mobile menu button */}
          <button
            className="md:hidden ml-2"
            onClick={() => setMobileMenuOpen((v) => !v)}
            aria-label="Open menu"
          >
            {mobileMenuOpen ? (
              <X className="w-7 h-7" />
            ) : (
              <Menu className="w-7 h-7" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileMenuOpen && (
        <nav className="md:hidden bg-white border-t px-4 py-4 flex flex-col gap-4">
          <form className="flex mb-4">
            <input
              type="text"
              placeholder="Search for products, brands, and more..."
              className="w-full px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-red-200"
            />
            <button
              type="submit"
              className="bg-red-600 hover:bg-red-700 text-white px-4 rounded-r-md flex items-center"
            >
              <Search className="w-5 h-5" />
            </button>
          </form>
          <Link href="/" className="hover:text-red-600 font-medium transition">
            Home
          </Link>
          <Link
            href="/all-products"
            className="hover:text-red-600 font-medium transition"
          >
            Shop
          </Link>
          <Link
            href="/deals"
            className="hover:text-red-600 font-medium transition"
          >
            Deals
          </Link>
          <Link
            href="/contact"
            className="hover:text-red-600 font-medium transition"
          >
            Contact
          </Link>
          {isAuthenticated ? (
            <>
              <Link
                href="/cart"
                className="flex items-center gap-2 hover:text-red-600 font-medium transition"
              >
                <ShoppingCart className="w-5 h-5" />
                Cart
                {cartCount > 0 && (
                  <span className="ml-1 bg-red-600 text-white text-xs rounded-full px-1.5 py-0.5 font-bold">
                    {cartCount}
                  </span>
                )}
              </Link>
              <Link
                href="/profile"
                className="flex items-center gap-2 hover:text-red-600 font-medium transition"
              >
                <User className="w-5 h-5" /> Profile
              </Link>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="flex items-center gap-2 hover:text-red-600 font-medium transition"
              >
                <User className="w-5 h-5" /> Login
              </Link>
              <Link
                href="/register"
                className="flex items-center gap-2 hover:text-red-600 font-medium transition"
              >
                <User className="w-5 h-5" /> Register
              </Link>
            </>
          )}
        </nav>
      )}
    </header>
  );
}
