"use client";

import React, { useState, useMemo } from "react";
import { Plus, ShoppingCart, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import Image from "next/image";
import { useQuery, useMutation } from "@apollo/client";
import { ADD_TO_CART_GQL, REMOVE_FROM_WISHLIST_GQL } from "@/graphql/mutations";
import { MY_WISHLIST_QUERY_GQL, MY_CART_QUERY_GQL } from "@/graphql/queries";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";

const Wishlist = () => {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const {
    data: wishlistData,
    loading: wishlistLoading,
    error: wishlistError,
  } = useQuery(MY_WISHLIST_QUERY_GQL);

  const [removeFromWishlist] = useMutation(REMOVE_FROM_WISHLIST_GQL, {
    refetchQueries: [{ query: MY_WISHLIST_QUERY_GQL }],
    onCompleted: () => toast.success("Item removed from wishlist."),
    onError: (err) => toast.error(err.message),
  });

  const [addToCart] = useMutation(ADD_TO_CART_GQL, {
    refetchQueries: [{ query: MY_CART_QUERY_GQL }],
    onCompleted: () => toast.success("Item added to cart."),
    onError: (err) => toast.error(err.message),
  });

  const wishlistItems = useMemo(
    () => wishlistData?.myWishlist?.items || [],
    [wishlistData]
  );

  const handleItemSelect = (itemId: string) => {
    setSelectedItems((prev) =>
      prev.includes(itemId)
        ? prev.filter((id) => id !== itemId)
        : [...prev, itemId]
    );
  };

  const handleAddSelectedToCart = () => {
    selectedItems.forEach((id) => {
      const item = wishlistItems.find((item: any) => item.id === id);
      if (item) {
        addToCart({
          variables: { input: { productId: item.product.id, quantity: 1 } },
        });
      }
    });
    setSelectedItems([]);
  };

  const handleAddToCart = (productId: string) => {
    addToCart({ variables: { input: { productId, quantity: 1 } } });
  };

  const handleRemoveItem = (itemId: string) => {
    removeFromWishlist({ variables: { input: { wishlistItemId: itemId } } });
  };

  if (wishlistLoading) return <WishlistSkeleton />;
  if (wishlistError)
    return (
      <div className="text-center py-10 text-red-500">
        Error: {wishlistError.message}
      </div>
    );

  return (
    <div className="min-h-screen p-6 pr-16">
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Wishlist</h1>
          <p className="text-gray-600">
            You have {wishlistItems.length} items in your wishlist.
          </p>
        </div>
      </div>

      {wishlistItems.length > 0 && (
        <div className="mb-6">
          <Button
            variant="outline"
            className="w-full h-14 text-gray-500 border-2 border-dashed border-gray-300 hover:border-gray-400 hover:text-gray-600 hover:bg-gray-200"
            onClick={handleAddSelectedToCart}
            disabled={selectedItems.length === 0}
          >
            <Plus className="w-5 h-5 mr-2" />
            Add Selected To Cart
          </Button>
        </div>
      )}

      <div className="space-y-8">
        {wishlistItems.length === 0 ? (
          <div className="text-center py-20 text-gray-500">
            <p>Your wishlist is empty.</p>
          </div>
        ) : (
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <div className="bg-white divide-y divide-gray-200">
              {wishlistItems.map((item: any) => (
                <div key={item.id} className="p-6 flex items-center space-x-4">
                  <Checkbox
                    checked={selectedItems.includes(item.id)}
                    onCheckedChange={() => handleItemSelect(item.id)}
                  />
                  <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center p-2">
                    <Image
                      src={
                        item.product.imageUrl ||
                        "https://pngimg.com/uploads/box/box_PNG41.png"
                      }
                      alt={item.product.name}
                      width={360}
                      height={360}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 text-lg mb-1">
                      {item.product.name}
                    </h3>
                    <p className="text-xl font-bold text-gray-900">
                      ${item.product.price.toFixed(2)}
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    className="mr-2"
                    onClick={() => handleAddToCart(item.product.id)}
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

const WishlistSkeleton = () => (
  <div className="min-h-screen p-6 pr-16">
    <div className="flex justify-between items-start mb-8">
      <div>
        <Skeleton className="h-10 w-48 mb-2" />
        <Skeleton className="h-6 w-64" />
      </div>
    </div>
    <Skeleton className="h-14 w-full mb-6" />
    <div className="space-y-4">
      {[...Array(3)].map((_, i) => (
        <div
          key={i}
          className="p-6 flex items-center space-x-4 border rounded-lg"
        >
          <Skeleton className="h-6 w-6" />
          <Skeleton className="h-20 w-20 rounded-lg" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-8 w-1/4" />
          </div>
          <Skeleton className="h-10 w-32" />
          <Skeleton className="h-10 w-10" />
        </div>
      ))}
    </div>
  </div>
);

export default Wishlist;
