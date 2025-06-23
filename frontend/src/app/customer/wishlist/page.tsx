"use client";

import React, { useState } from "react";
import { Plus, ShoppingCart, Trash2, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "@/redux/store";
import { removeFromWishlist } from "@/redux/slices/wishlistSlice";
import { addToCart } from "@/redux/slices/cartSlice";

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
  const dispatch = useDispatch();
  const wishlist = useSelector((state: RootState) => state.wishlist.items);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);

  const handleItemSelect = (itemId: number) => {
    setSelectedItems((prev) =>
      prev.includes(itemId)
        ? prev.filter((id) => id !== itemId)
        : [...prev, itemId]
    );
  };

  const handleAddAllToCart = () => {
    selectedItems.forEach((id) => {
      const item = wishlist.find((item) => item.id === id);
      if (item) {
        dispatch(addToCart({ ...item, quantity: 1 }));
      }
    });
  };

  const handleAddToCart = (itemId: number) => {
    const item = wishlist.find((item) => item.id === itemId);
    if (item) {
      dispatch(addToCart({ ...item, quantity: 1 }));
    }
  };

  const handleRemoveItem = (itemId: number) => {
    dispatch(removeFromWishlist(itemId));
  };

  return (
    <div className="min-h-screen p-6 pr-16">
      {/* Header */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Wishlist</h1>
          <p className="text-gray-600">Manage your saved items.</p>
        </div>
      </div>
      {/* Add All To Cart Button */}
      {wishlist.length > 0 && (
        <div className="mb-6">
          <Button
            variant="outline"
            className="w-full h-14 text-gray-500 border-2 border-dashed border-gray-300 hover:border-gray-400 hover:text-gray-600 hover:bg-gray-200"
            onClick={handleAddAllToCart}
            disabled={selectedItems.length === 0}
          >
            <Plus className="w-5 h-5 mr-2" />
            Add Selected To Cart
          </Button>
        </div>
      )}
      {/* Wishlist Items */}
      <div className="space-y-8">
        {wishlist.length === 0 ? (
          <div className="text-center text-gray-500">
            No items in your wishlist.
          </div>
        ) : (
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <div className="bg-white divide-y divide-gray-200">
              {wishlist.map((item) => (
                <div key={item.id} className="p-6 flex items-center space-x-4">
                  <Checkbox
                    checked={selectedItems.includes(item.id)}
                    onCheckedChange={() => handleItemSelect(item.id)}
                  />
                  {/* Product Image */}
                  <div className="w-20 h-20 bg-gray-200 rounded-lg flex items-center justify-center p-2">
                    <Image
                      src={
                        item.image ||
                        "https://pngimg.com/uploads/box/box_PNG41.png"
                      }
                      alt={item.name}
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
                    <p className="text-xl font-bold text-gray-900">
                      ${item.price.toFixed(2)}
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    className="mr-2"
                    onClick={() => handleAddToCart(item.id)}
                  >
                    <ShoppingCart className="w-4 h-4 mr-1" /> Add to Cart
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={() => handleRemoveItem(item.id)}
                  >
                    <Trash2 className="w-4 h-4 text-red-600" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
