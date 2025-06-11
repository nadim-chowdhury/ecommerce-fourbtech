"use client";

import {
  ChevronDown,
  Search,
  ShoppingBag,
  Smartphone,
  Home,
  Car,
  Shirt,
  Book,
  Heart,
  Coffee,
  Baby,
  Dumbbell,
  Palette,
} from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { useState } from "react";

const CATEGORIES = [
  {
    id: 1,
    name: "Electronics",
    icon: <Smartphone className="w-4 h-4" />,
    subcategories: [
      "Mobile Phones",
      "Laptops & Computers",
      "Audio & Headphones",
      "Gaming Consoles",
      "Smart Home",
      "Cameras",
      "Tablets",
      "Accessories",
    ],
  },
  {
    id: 2,
    name: "Fashion",
    icon: <Shirt className="w-4 h-4" />,
    subcategories: [
      "Men's Clothing",
      "Women's Clothing",
      "Kids' Fashion",
      "Shoes & Footwear",
      "Bags & Luggage",
      "Watches",
      "Jewelry",
      "Sunglasses",
    ],
  },
  {
    id: 3,
    name: "Home & Garden",
    icon: <Home className="w-4 h-4" />,
    subcategories: [
      "Furniture",
      "Home Decor",
      "Kitchen & Dining",
      "Bedding & Bath",
      "Garden & Outdoor",
      "Home Improvement",
      "Storage & Organization",
      "Lighting",
    ],
  },
  {
    id: 4,
    name: "Sports & Fitness",
    icon: <Dumbbell className="w-4 h-4" />,
    subcategories: [
      "Fitness Equipment",
      "Sports Gear",
      "Outdoor Recreation",
      "Athletic Clothing",
      "Supplements",
      "Yoga & Pilates",
      "Team Sports",
      "Water Sports",
    ],
  },
  {
    id: 5,
    name: "Books & Media",
    icon: <Book className="w-4 h-4" />,
    subcategories: [
      "Books",
      "E-books",
      "Movies & TV",
      "Music",
      "Video Games",
      "Magazines",
      "Educational",
      "Children's Books",
    ],
  },
  {
    id: 6,
    name: "Health & Beauty",
    icon: <Heart className="w-4 h-4" />,
    subcategories: [
      "Skincare",
      "Makeup",
      "Hair Care",
      "Fragrances",
      "Health Supplements",
      "Personal Care",
      "Wellness",
      "Medical Supplies",
    ],
  },
  {
    id: 7,
    name: "Automotive",
    icon: <Car className="w-4 h-4" />,
    subcategories: [
      "Car Parts",
      "Car Electronics",
      "Tires & Wheels",
      "Car Care",
      "Motorcycle Parts",
      "Car Accessories",
      "Tools & Equipment",
      "GPS & Navigation",
    ],
  },
  {
    id: 8,
    name: "Baby & Kids",
    icon: <Baby className="w-4 h-4" />,
    subcategories: [
      "Baby Clothing",
      "Toys & Games",
      "Baby Gear",
      "Feeding",
      "Diapering",
      "Safety",
      "Nursery",
      "Educational Toys",
    ],
  },
  {
    id: 9,
    name: "Food & Beverages",
    icon: <Coffee className="w-4 h-4" />,
    subcategories: [
      "Groceries",
      "Snacks",
      "Beverages",
      "Organic Foods",
      "International Foods",
      "Specialty Diet",
      "Cooking Ingredients",
      "Fresh Produce",
    ],
  },
  {
    id: 10,
    name: "Arts & Crafts",
    icon: <Palette className="w-4 h-4" />,
    subcategories: [
      "Art Supplies",
      "Craft Materials",
      "Sewing & Knitting",
      "Scrapbooking",
      "Painting",
      "Drawing",
      "Jewelry Making",
      "DIY Kits",
    ],
  },
];

const SEARCH_SUGGESTIONS = [
  "iPhone 15 Pro",
  "Samsung Galaxy S24",
  "Nike Air Max",
  "MacBook Pro",
  "Gaming Chair",
  "Wireless Headphones",
  "Smart Watch",
  "Coffee Maker",
];

export default function DashboardNavbar() {
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [searchQuery, setSearchQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  const filteredSuggestions = SEARCH_SUGGESTIONS.filter((suggestion) =>
    suggestion.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearch = () => {
    if (searchQuery.trim()) {
      console.log(`Searching for: ${searchQuery} in ${selectedCategory}`);
      // Implement actual search functionality here
    }
  };

  const handleCategorySelect = (categoryName: any) => {
    setSelectedCategory(categoryName);
  };

  return (
    <div className="px-16 py-4 border-b flex items-center justify-between gap-6">
      <div className="w-full flex items-center bg-white border rounded-md overflow-hidden">
        {/* Categories Dropdown */}
        <Popover>
          <PopoverTrigger asChild>
            <div className="flex items-center gap-2 px-4 py-3 cursor-pointer hover:bg-gray-50 border-r min-w-fit">
              <ShoppingBag className="w-4 h-4 text-gray-500" />
              <span className="text-sm font-medium whitespace-nowrap">
                {selectedCategory}
              </span>
              <ChevronDown className="w-4 h-4 text-gray-500" />
            </div>
          </PopoverTrigger>
          <PopoverContent align="start" className="w-96 p-0">
            <div className="max-h-96 overflow-y-auto">
              {/* All Categories Option */}
              <div
                className="px-4 py-3 hover:bg-gray-50 cursor-pointer border-b"
                onClick={() => handleCategorySelect("All Categories")}
              >
                <div className="flex items-center gap-3">
                  <ShoppingBag className="w-4 h-4 text-gray-500" />
                  <span className="font-medium">All Categories</span>
                </div>
              </div>

              {/* Category List */}
              {CATEGORIES.map((category) => (
                <div key={category.id} className="border-b last:border-b-0">
                  <div
                    className="px-4 py-3 hover:bg-gray-50 cursor-pointer"
                    onClick={() => handleCategorySelect(category.name)}
                  >
                    <div className="flex items-center gap-3">
                      {category.icon}
                      <span className="font-medium">{category.name}</span>
                    </div>
                  </div>

                  {/* Subcategories */}
                  <div className="bg-gray-50 border-t">
                    <div className="grid grid-cols-2 gap-1 p-2">
                      {category.subcategories.map((subcategory, index) => (
                        <div
                          key={index}
                          className="px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-white rounded-md cursor-pointer"
                          onClick={() => handleCategorySelect(subcategory)}
                        >
                          {subcategory}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </PopoverContent>
        </Popover>

        {/* Search Input */}
        <div className="relative flex-1 flex items-center">
          <Search className="w-5 h-5 text-gray-400 ml-4" />
          <Input
            className="w-full border-0 shadow-none focus-visible:ring-0 pl-3 pr-4"
            placeholder="Search for products, brands, and vendors..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
            onKeyPress={(e) => e.key === "Enter" && handleSearch()}
          />

          {/* Search Suggestions */}
          {showSuggestions && searchQuery && (
            <div className="absolute top-full left-0 right-0 bg-white border border-t-0 rounded-b-md shadow-lg z-50">
              {filteredSuggestions.length > 0 ? (
                filteredSuggestions.map((suggestion, index) => (
                  <div
                    key={index}
                    className="px-4 py-3 hover:bg-gray-50 cursor-pointer flex items-center gap-3"
                    onClick={() => {
                      setSearchQuery(suggestion);
                      setShowSuggestions(false);
                    }}
                  >
                    <Search className="w-4 h-4 text-gray-400" />
                    <span className="text-sm">{suggestion}</span>
                  </div>
                ))
              ) : (
                <div className="px-4 py-3 text-sm text-gray-500">
                  No suggestions found
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Search Button */}
      <Button
        className="bg-red-600 hover:bg-red-700 cursor-pointer px-8 flex-shrink-0 h-11"
        onClick={handleSearch}
      >
        Search
      </Button>
    </div>
  );
}
