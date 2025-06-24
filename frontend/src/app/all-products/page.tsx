"use client";

import { useEffect, useRef, useState, useMemo } from "react";
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
import { useQuery, useMutation } from "@apollo/client";
import {
  ALL_PRODUCTS_QUERY_GQL,
  MY_WISHLIST_QUERY_GQL,
} from "@/graphql/queries";
import {
  ADD_TO_CART_GQL,
  ADD_TO_WISHLIST_GQL,
  REMOVE_FROM_WISHLIST_GQL,
} from "@/graphql/mutations";
import { toast } from "sonner";

// Remove demo products array and replace with API data
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

  const {
    data: productsData,
    loading,
    error,
  } = useQuery(ALL_PRODUCTS_QUERY_GQL);
  const { data: wishlistData } = useQuery(MY_WISHLIST_QUERY_GQL);

  const products = useMemo(
    () => productsData?.products || [],
    [productsData?.products]
  );
  const wishlistItems = useMemo(
    () => wishlistData?.myWishlist?.items || [],
    [wishlistData]
  );

  const [addToWishlist] = useMutation(ADD_TO_WISHLIST_GQL, {
    refetchQueries: [{ query: MY_WISHLIST_QUERY_GQL }],
    onCompleted: () => toast.success("Added to wishlist"),
    onError: (err) => toast.error(err.message),
  });

  const [removeFromWishlist] = useMutation(REMOVE_FROM_WISHLIST_GQL, {
    refetchQueries: [{ query: MY_WISHLIST_QUERY_GQL }],
    onCompleted: () => toast.success("Removed from wishlist"),
    onError: (err) => toast.error(err.message),
  });

  const handleToggleWishlist = (product: any, inWishlist: boolean) => {
    if (inWishlist) {
      const wishlistItem = wishlistItems.find(
        (item: any) => item.product.id === product.id
      );
      if (wishlistItem) {
        removeFromWishlist({
          variables: { input: { wishlistItemId: wishlistItem.id } },
        });
      }
    } else {
      addToWishlist({
        variables: { input: { productId: product.id } },
      });
    }
  };

  // Calculate dynamic price range from actual products
  const maxPrice =
    products.length > 0 ? Math.max(...products.map((p: any) => p.price)) : 700;
  const minPrice =
    products.length > 0 ? Math.min(...products.map((p: any) => p.price)) : 0;

  // Update price range when products load
  useEffect(() => {
    if (products.length > 0) {
      setPriceRange([minPrice, maxPrice]);
    }
  }, [products, minPrice, maxPrice]);

  const debouncedSearch = useDebounce(search, 300);
  const debouncedPriceRange = useDebounce(priceRange, 300);

  // Filtering
  const filtered = products.filter((p: any) => {
    const matchesSearch =
      p.name.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
      p.sku?.toLowerCase().includes(debouncedSearch.toLowerCase());
    const matchesCategory = !category || p.category === category;
    const matchesStatus = !status || getProductStatus(p) === status;
    const matchesPrice =
      p.price >= debouncedPriceRange[0] && p.price <= debouncedPriceRange[1];
    return matchesSearch && matchesCategory && matchesStatus && matchesPrice;
  });

  // Helper function to determine product status
  const getProductStatus = (product: any) => {
    if (product.stock === 0) return "Out of Stock";
    if (product.stock <= 10) return "Low Stock";
    return "Active";
  };

  // Get unique categories from API data
  const apiCategories = Array.from(
    new Set(products.map((p: any) => p.category).filter(Boolean))
  ) as string[];

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

  // Add to cart mutation
  const [addToCart, { loading: addingToCart }] = useMutation(ADD_TO_CART_GQL, {
    onCompleted: () => {
      toast.success("Added to cart successfully!");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to add to cart");
    },
  });

  return (
    <div className="bg-white">
      <MainHeader />
      <div className="max-w-7xl mx-auto p-4">
        <h1 className="text-3xl font-bold my-8">All Products</h1>

        {loading && (
          <div className="text-center py-8">
            <div className="text-gray-500">Loading products...</div>
          </div>
        )}

        {error && (
          <div className="text-center py-8">
            <div className="text-red-500">
              Error loading products: {error.message}
            </div>
          </div>
        )}

        {!loading && !error && (
          <>
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
                    {apiCategories.map((cat) => (
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
                    min={minPrice}
                    max={maxPrice}
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
              {sorted.slice(0, visibleCount).map((product: any) => {
                const inWishlist = wishlistItems.some(
                  (item: any) => item.product.id === product.id
                );
                return (
                  <Card
                    key={product.id}
                    className="bg-white border-gray-200 flex flex-col py-0 relative"
                  >
                    <div className="w-full h-40 bg-gray-100 rounded-t-lg flex items-center justify-center p-4 relative">
                      <Image
                        src={
                          product.imageUrl ||
                          "https://pngimg.com/uploads/box/box_PNG41.png"
                        }
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
                          handleToggleWishlist(product, inWishlist)
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
                          SKU: {product.sku || "N/A"}
                        </div>
                        <div className="text-xl font-bold text-red-600 mb-2">
                          ${product.price}
                        </div>
                        <Badge className="mb-2">
                          {product.category || "Uncategorized"}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2 mt-2">
                        <span
                          className={
                            getProductStatus(product) === "Active"
                              ? "text-green-600 bg-green-100 border border-green-200 px-2 py-1 rounded text-xs"
                              : getProductStatus(product) === "Low Stock"
                              ? "text-orange-600 bg-orange-100 border border-orange-200 px-2 py-1 rounded text-xs"
                              : "text-red-600 bg-red-100 border border-red-200 px-2 py-1 rounded text-xs"
                          }
                        >
                          {getProductStatus(product)}
                        </span>
                        <span className="text-gray-400 text-xs">
                          Stock: {product.stock}
                        </span>
                      </div>
                      <Button
                        className="mt-4 bg-red-600 hover:bg-red-700 text-white"
                        onClick={() => {
                          addToCart({
                            variables: {
                              input: {
                                productId: product.id,
                                quantity: 1,
                              },
                            },
                          });
                        }}
                        disabled={
                          addingToCart ||
                          product.stock === 0 ||
                          getProductStatus(product) === "Out of Stock"
                        }
                      >
                        {addingToCart ? "Adding..." : "Add to Cart"}
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
            {/* Infinite Scroll Loader */}
            <div ref={loader} className="h-10 flex items-center justify-center">
              {isFetching && (
                <span className="text-gray-500">Loading more...</span>
              )}
            </div>
            {visibleCount >= sorted.length && (
              <div className="text-center text-gray-400 mt-8">
                No more products to load.
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
