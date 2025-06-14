"use client";

import React, { useState } from "react";
import { Plus, ShoppingCart, Trash2, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import Image from "next/image";

interface WishlistItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
}

interface WishlistData {
  id: string;
  name: string;
  icon: React.ReactNode;
  items: WishlistItem[];
}

const Wishlist = () => {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const wishlistData: WishlistData[] = [
    {
      id: "tech-gadgets",
      name: "Tech Gadget Store",
      icon: <Package className="w-5 h-5" />,
      items: [
        {
          id: "1",
          name: "Wireless Noise-Cancelling Headphones",
          description: "Black | Premium Edition",
          price: 249.99,
          image: "/api/placeholder/100/100",
        },
        {
          id: "2",
          name: "Wireless Noise-Cancelling Headphones",
          description: "Black | Premium Edition",
          price: 249.99,
          image: "/api/placeholder/100/100",
        },
      ],
    },
    {
      id: "super-gadgets",
      name: "Super Gadgets",
      icon: <Package className="w-5 h-5" />,
      items: [
        {
          id: "3",
          name: "Wireless Noise-Cancelling Headphones",
          description: "Black | Premium Edition",
          price: 249.99,
          image: "/api/placeholder/100/100",
        },
        {
          id: "4",
          name: "Wireless Noise-Cancelling Headphones",
          description: "Black | Premium Edition",
          price: 249.99,
          image: "/api/placeholder/100/100",
        },
      ],
    },
  ];

  const handleItemSelect = (itemId: string) => {
    setSelectedItems((prev) =>
      prev.includes(itemId)
        ? prev.filter((id) => id !== itemId)
        : [...prev, itemId]
    );
  };

  // const handleSelectAll = () => {
  //   const allItemIds = wishlistData.flatMap((list) =>
  //     list.items.map((item) => item.id)
  //   );
  //   setSelectedItems(
  //     selectedItems.length === allItemIds.length ? [] : allItemIds
  //   );
  // };

  const handleAddAllToCart = () => {
    console.log("Adding selected items to cart:", selectedItems);
    // Add your cart logic here
  };

  const handleAddToCart = (itemId: string) => {
    console.log("Adding item to cart:", itemId);
    // Add your cart logic here
  };

  const handleRemoveItem = (itemId: string) => {
    console.log("Removing item:", itemId);
    // Add your remove logic here
  };

  return (
    <div className="min-h-screen p-6 pr-16">
      {/* Header */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Wishlist</h1>
          <p className="text-gray-600">
            Manage your saved items across multiple wishlists.
          </p>
        </div>
        <Button className="bg-red-600 hover:bg-red-700 text-white">
          <Plus className="w-4 h-4 mr-2" />
          Create New List
        </Button>
      </div>

      {/* Add All To Cart Button */}
      <div className="mb-6">
        <Button
          variant="outline"
          className="w-full h-14 text-gray-500 border-2 border-dashed border-gray-300 hover:border-gray-400 hover:text-gray-600 hover:bg-gray-200"
          onClick={handleAddAllToCart}
        >
          <Plus className="w-5 h-5 mr-2" />
          Add All To Cart
        </Button>
      </div>

      {/* Wishlist Items */}
      <div className="space-y-8">
        {wishlistData.map((wishlist) => (
          <div
            key={wishlist.id}
            className="border border-gray-200 rounded-lg overflow-hidden"
          >
            {/* Wishlist Header */}
            <div className="bg-white px-6 py-4 border-b border-gray-200">
              <div className="flex items-center">
                <Checkbox
                  checked={wishlist.items.every((item) =>
                    selectedItems.includes(item.id)
                  )}
                  onCheckedChange={() => {
                    const listItemIds = wishlist.items.map((item) => item.id);
                    const allSelected = listItemIds.every((id) =>
                      selectedItems.includes(id)
                    );
                    if (allSelected) {
                      setSelectedItems((prev) =>
                        prev.filter((id) => !listItemIds.includes(id))
                      );
                    } else {
                      setSelectedItems((prev) => [
                        ...new Set([...prev, ...listItemIds]),
                      ]);
                    }
                  }}
                  className="mr-3"
                />
                {wishlist.icon}
                <span className="ml-2 font-medium text-gray-900">
                  {wishlist.name}
                </span>
              </div>
            </div>

            {/* Items */}
            <div className="bg-white divide-y divide-gray-200">
              {wishlist.items.map((item) => (
                <div key={item.id} className="p-6">
                  <div className="flex items-center space-x-4">
                    <Checkbox
                      checked={selectedItems.includes(item.id)}
                      onCheckedChange={() => handleItemSelect(item.id)}
                    />

                    {/* Product Image */}
                    <div className="w-20 h-20 bg-gray-200 rounded-lg flex items-center justify-center p-2">
                      {/* <Package className="w-8 h-8 text-gray-400" /> */}
                      <Image
                        src="https://pngimg.com/uploads/box/box_PNG41.png"
                        alt="Demo Image"
                        width={360}
                        height={360}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>

                    {/* Product Info */}
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 text-lg mb-1">
                        {item.name}
                      </h3>
                      <p className="text-gray-600 mb-2">{item.description}</p>
                      <p className="text-xl font-bold text-gray-900">
                        ${item.price.toFixed(2)}
                      </p>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col items-end gap-4">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-gray-400 hover:text-red-600"
                        onClick={() => handleRemoveItem(item.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>

                      <Button
                        className="bg-red-600 hover:bg-red-700 text-white"
                        onClick={() => handleAddToCart(item.id)}
                      >
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        Add to Cart
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
