"use client";

import { useEffect, useRef, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Search, Heart, HeartOff } from "lucide-react";
import Image from "next/image";
import MainHeader from "@/components/common/main-header";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "@/redux/slices/cartSlice";
import { toggleWishlist } from "@/redux/slices/wishlistSlice";
import type { RootState } from "@/redux/store";

const demoProducts = [
  {
    id: 1,
    name: "Premium Cotton T-Shirt",
    sku: "TS-001",
    price: 100,
    stock: 200,
    status: "Active",
    category: "Men's Clothing",
  },
  {
    id: 2,
    name: "Leather Wallet",
    sku: "WL-002",
    price: 50,
    stock: 200,
    status: "Active",
    category: "Wearables",
  },
  {
    id: 3,
    name: "Wireless Earbuds",
    sku: "EB-003",
    price: 70,
    stock: 12,
    status: "Low Stock",
    category: "Headphones & Audio",
  },
  {
    id: 4,
    name: "Handcrafted Ceramic Mug",
    sku: "MG-004",
    price: 60,
    stock: 32,
    status: "Active",
    category: "Kitchen & Dining",
  },
  {
    id: 5,
    name: "Organic Face Cream",
    sku: "MG-004",
    price: 200,
    stock: 0,
    status: "Out of Stock",
    category: "Skincare",
  },
  {
    id: 6,
    name: "Bamboo Cutting Board",
    sku: "CB-006",
    price: 620,
    stock: 5,
    status: "Low Stock",
    category: "Kitchen & Dining",
  },
  {
    id: 7,
    name: "Smart Watch",
    sku: "SW-007",
    price: 299,
    stock: 15,
    status: "Active",
    category: "Wearables",
  },
  {
    id: 8,
    name: "Gaming Mouse",
    sku: "GM-008",
    price: 45,
    stock: 25,
    status: "Active",
    category: "Laptops & Accessories",
  },
  {
    id: 9,
    name: "Wireless Keyboard",
    sku: "WK-009",
    price: 89,
    stock: 8,
    status: "Low Stock",
    category: "Laptops & Accessories",
  },
  {
    id: 10,
    name: "Phone Case",
    sku: "PC-010",
    price: 25,
    stock: 0,
    status: "Out of Stock",
    category: "Mobile",
  },
  {
    id: 11,
    name: "Bluetooth Speaker",
    sku: "BS-011",
    price: 120,
    stock: 18,
    status: "Active",
    category: "Headphones & Audio",
  },
  {
    id: 12,
    name: "Coffee Maker",
    sku: "CM-012",
    price: 150,
    stock: 10,
    status: "Active",
    category: "Kitchen & Dining",
  },
];

const allCategories = [
  ...Array.from(new Set(demoProducts.map((p) => p.category))),
];
const stockStatuses = ["Active", "Low Stock", "Out of Stock"];
const sortOptions = [
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "name-asc", label: "Name: A-Z" },
  { value: "name-desc", label: "Name: Z-A" },
  { value: "stock-desc", label: "Stock: High to Low" },
  { value: "stock-asc", label: "Stock: Low to High" },
];

const PAGE_SIZE = 8;

// Debounce hook
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debouncedValue;
}

export default function AllProducts() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<string | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [sort, setSort] = useState(sortOptions[0].value);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 700]);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const loader = useRef<HTMLDivElement | null>(null);
  const dispatch = useDispatch();
  const wishlist = useSelector((state: RootState) => state.wishlist.items);

  const debouncedSearch = useDebounce(search, 300);
  const debouncedPriceRange = useDebounce(priceRange, 300);

  // Filtering
  const filtered = demoProducts.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
      p.sku.toLowerCase().includes(debouncedSearch.toLowerCase());
    const matchesCategory = !category || p.category === category;
    const matchesStatus = !status || p.status === status;
    const matchesPrice =
      p.price >= debouncedPriceRange[0] && p.price <= debouncedPriceRange[1];
    return matchesSearch && matchesCategory && matchesStatus && matchesPrice;
  });

  // Sorting
  const sorted = [...filtered].sort((a, b) => {
    switch (sort) {
      case "price-asc":
        return a.price - b.price;
      case "price-desc":
        return b.price - a.price;
      case "name-asc":
        return a.name.localeCompare(b.name);
      case "name-desc":
        return b.name.localeCompare(a.name);
      case "stock-asc":
        return a.stock - b.stock;
      case "stock-desc":
        return b.stock - a.stock;
      default:
        return 0;
    }
  });

  // Infinite scroll
  const [isFetching, setIsFetching] = useState(false);
  useEffect(() => {
    if (!loader.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && visibleCount < sorted.length) {
          setIsFetching(true);
          setTimeout(() => {
            setVisibleCount((v) => Math.min(v + PAGE_SIZE, sorted.length));
            setIsFetching(false);
          }, 500);
        }
      },
      { threshold: 1 }
    );
    observer.observe(loader.current);
    return () => observer.disconnect();
  }, [sorted.length, visibleCount]);

  // Reset visible count on filter/sort/search change
  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [search, category, status, sort, priceRange]);

  return (
    <div className="">
      <MainHeader />
      <div className="max-w-7xl mx-auto p-4">
        <h1 className="text-3xl font-bold my-8">All Products</h1>
        {/* Controls */}
        <div className="flex items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-4">
            {/* Category Select */}
            <Select
              value={category ?? "__all__"}
              onValueChange={(v) => setCategory(v === "__all__" ? null : v)}
            >
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="__all__">All Categories</SelectItem>
                {allCategories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {/* Status Select */}
            <Select
              value={status ?? "__all__"}
              onValueChange={(v) => setStatus(v === "__all__" ? null : v)}
            >
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="__all__">All Statuses</SelectItem>
                {stockStatuses.map((s) => (
                  <SelectItem key={s} value={s}>
                    {s}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">Price:</span>
              <Slider
                min={0}
                max={700}
                value={priceRange}
                onValueChange={(v) => setPriceRange([v[0], v[1]])}
                className="w-32"
              />
              <span className="text-xs text-gray-500">
                ${priceRange[0]} - ${priceRange[1]}
              </span>
            </div>
            <Select value={sort} onValueChange={setSort}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {sortOptions.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center">
            <Input
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-56 rounded-r-none"
            />
            <Button
              variant="outline"
              size="icon"
              className="rounded-l-none border-l-0 bg-red-500 text-white w-12"
            >
              <Search className="w-5 h-5" />
            </Button>
          </div>
        </div>
        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {sorted.slice(0, visibleCount).map((product) => {
            const inWishlist = wishlist.some((item) => item.id === product.id);
            return (
              <Card
                key={product.id}
                className="bg-white border-gray-200 flex flex-col py-0 relative"
              >
                <div className="w-full h-40 bg-gray-100 rounded-t-lg flex items-center justify-center p-4 relative">
                  <Image
                    src="https://pngimg.com/uploads/box/box_PNG41.png"
                    alt={product.name}
                    width={640}
                    height={640}
                    className="w-24 h-24 object-cover rounded"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2 z-10"
                    onClick={() =>
                      dispatch(
                        toggleWishlist({
                          ...product,
                          image: "https://pngimg.com/uploads/box/box_PNG41.png",
                        })
                      )
                    }
                  >
                    {inWishlist ? (
                      <HeartOff className="w-6 h-6 text-red-600 fill-red-100" />
                    ) : (
                      <Heart className="w-6 h-6 text-gray-400" />
                    )}
                  </Button>
                </div>
                <CardContent className="flex-1 flex flex-col justify-between px-6 pb-6">
                  <div>
                    <h3 className="font-semibold text-lg mb-1 text-gray-900">
                      {product.name}
                    </h3>
                    <div className="text-gray-500 text-sm mb-2">
                      SKU: {product.sku}
                    </div>
                    <div className="text-xl font-bold text-red-600 mb-2">
                      ${product.price}
                    </div>
                    <Badge className="mb-2">{product.category}</Badge>
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <span
                      className={
                        product.status === "Active"
                          ? "text-green-600 bg-green-100 border border-green-200 px-2 py-1 rounded text-xs"
                          : product.status === "Low Stock"
                          ? "text-orange-600 bg-orange-100 border border-orange-200 px-2 py-1 rounded text-xs"
                          : "text-red-600 bg-red-100 border border-red-200 px-2 py-1 rounded text-xs"
                      }
                    >
                      {product.status}
                    </span>
                    <span className="text-gray-400 text-xs">
                      Stock: {product.stock}
                    </span>
                  </div>
                  <Button
                    className="mt-4 bg-red-600 hover:bg-red-700 text-white"
                    onClick={() =>
                      dispatch(
                        addToCart({
                          ...product,
                          quantity: 1,
                          image: "https://pngimg.com/uploads/box/box_PNG41.png",
                        })
                      )
                    }
                    disabled={
                      product.stock === 0 || product.status === "Out of Stock"
                    }
                  >
                    Add to Cart
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
        {/* Infinite Scroll Loader */}
        <div ref={loader} className="h-10 flex items-center justify-center">
          {isFetching && <span className="text-gray-500">Loading more...</span>}
        </div>
        {visibleCount >= sorted.length && (
          <div className="text-center text-gray-400 mt-8">
            No more products to load.
          </div>
        )}
      </div>
    </div>
  );
}
