"use client";

import React, { useState, useEffect, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Trash2, Minus, Plus, Store, Tag } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useQuery, useMutation } from "@apollo/client";
import { MY_CART_QUERY_GQL } from "@/graphql/queries";
import {
  UPDATE_CART_ITEM_GQL,
  REMOVE_FROM_CART_GQL,
} from "@/graphql/mutations";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";

export default function ShoppingCart() {
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [promoCode, setPromoCode] = useState("");
  const [selectAll, setSelectAll] = useState(false);

  const { data, loading, error } = useQuery(MY_CART_QUERY_GQL);

  const [updateCartItem] = useMutation(UPDATE_CART_ITEM_GQL, {
    refetchQueries: [{ query: MY_CART_QUERY_GQL }],
    onError: (err) => toast.error(err.message),
  });

  const [removeFromCart] = useMutation(REMOVE_FROM_CART_GQL, {
    refetchQueries: [{ query: MY_CART_QUERY_GQL }],
    onCompleted: () => toast.success("Item removed from cart."),
    onError: (err) => toast.error(err.message),
  });

  useEffect(() => {
    if (data?.myCart?.items) {
      const enhancedItems = data.myCart.items.map((item: any) => ({
        ...item,
        name: item.product?.name,
        description: item.product?.description,
        price: item.product?.price,
        image:
          item.product?.imageUrl ||
          "https://pngimg.com/uploads/box/box_PNG41.png",
        store: item.product?.vendor?.name,
        selected: false,
      }));
      setCartItems(enhancedItems);
    }
  }, [data]);

  const handleSelectAll = (checked: any) => {
    setSelectAll(checked);
    setCartItems((items) =>
      items.map((item) => ({ ...item, selected: checked }))
    );
  };

  const handleItemSelect = (id: any, checked: any) => {
    setCartItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, selected: checked } : item
      )
    );
    const updatedItems = cartItems.map((item) =>
      item.id === id ? { ...item, selected: checked } : item
    );
    setSelectAll(updatedItems.every((item) => item.selected));
  };

  const handleQuantityChange = (id: any, newQuantity: number) => {
    if (newQuantity < 1) return;
    updateCartItem({
      variables: { input: { cartItemId: id, quantity: newQuantity } },
    });
  };

  const handleRemoveItem = (id: any) => {
    removeFromCart({ variables: { cartItemId: id } });
  };

  const handleDeleteSelected = () => {
    const selectedIds = cartItems
      .filter((item) => item.selected)
      .map((item) => item.id);
    selectedIds.forEach((id) => handleRemoveItem(id));
    setSelectAll(false);
  };

  const selectedCount = cartItems.filter((item) => item.selected).length;
  const subtotal = useMemo(
    () =>
      cartItems.reduce(
        (sum, item) => sum + (item?.price ?? 0) * (item?.quantity ?? 0),
        0
      ),
    [cartItems]
  );
  const shipping = 0;
  const tax = 0;
  const total = subtotal + shipping + tax;

  const groupedItems = useMemo(
    () =>
      cartItems.reduce((groups: any, item: any) => {
        const store = item?.store ?? "Unknown Store";
        if (!groups[store]) groups[store] = [];
        groups[store].push(item);
        return groups;
      }, {}),
    [cartItems]
  );

  if (loading) return <CartSkeleton />;
  if (error)
    return <p className="text-center text-red-500">Error: {error.message}</p>;

  return (
    <div className="min-h-screen p-6 pr-16">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Shopping Cart
              </h1>
              <p className="text-gray-600">
                You have {cartItems.length} items in your cart.
              </p>
            </div>

            {/* Select All and Delete */}
            <Card className="mb-6 py-0 h-16 flex justify-center">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Checkbox
                      id="select-all"
                      checked={selectAll}
                      onCheckedChange={handleSelectAll}
                    />
                    <label
                      htmlFor="select-all"
                      className="text-sm font-medium text-gray-700 cursor-pointer"
                    >
                      Select All ({cartItems.length} Items)
                    </label>
                  </div>
                  {selectedCount > 0 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleDeleteSelected}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Cart Items by Store */}
            {Object.entries(groupedItems).map(([storeName, storeItems]) => (
              <Card key={storeName} className="mb-6 py-0">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-4 pb-4 border-b">
                    <Store className="w-4 h-4 text-gray-500" />
                    <span className="font-medium text-gray-700">
                      {storeName}
                    </span>
                  </div>

                  <div className="space-y-6">
                    {(storeItems as any).map((item: any) => (
                      <div key={item?.id} className="flex items-center gap-4">
                        <Checkbox
                          id={`item-${item?.id}`}
                          checked={item?.selected}
                          onCheckedChange={(checked) =>
                            handleItemSelect(item?.id, checked)
                          }
                        />

                        <div className="w-20 h-20 bg-gray-200 rounded-lg flex-shrink-0 p-2">
                          <Image
                            src={item?.image}
                            alt={item?.name ?? "Product"}
                            width={80}
                            height={80}
                            className="w-full h-full object-cover rounded-lg"
                          />
                        </div>

                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-gray-900 mb-1">
                            {item?.name ?? "Unnamed Product"}
                          </h3>
                          <p className="text-sm text-gray-600 mb-2">
                            {item?.description ?? "No description available"}
                          </p>
                          <p className="text-lg font-bold text-gray-900">
                            ${item?.price?.toFixed(2) ?? "0.00"}
                          </p>
                        </div>

                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              handleQuantityChange(item?.id, item?.quantity - 1)
                            }
                            disabled={item?.quantity <= 1}
                            className="w-8 h-8 p-0"
                          >
                            <Minus className="w-4 h-4" />
                          </Button>
                          <span className="w-8 text-center font-medium">
                            {item?.quantity}
                          </span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              handleQuantityChange(item?.id, item?.quantity + 1)
                            }
                            className="w-8 h-8 p-0"
                          >
                            <Plus className="w-4 h-4" />
                          </Button>
                        </div>

                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemoveItem(item?.id)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50 p-2"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-6 py-0">
              <CardContent className="p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">
                  Order Summary
                </h2>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-medium">${shipping.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Tax</span>
                    <span className="font-medium">${tax.toFixed(2)}</span>
                  </div>
                </div>

                {/* Promo Code */}
                <div className="mb-6">
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input
                        placeholder="Enter a promo code"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                    <Button
                      variant="default"
                      className="bg-red-600 hover:bg-red-700"
                    >
                      Apply
                    </Button>
                  </div>
                </div>

                <div className="border-t pt-4 mb-6">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>

                <Link href={"/customer/checkout"}>
                  <Button className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-3">
                    Proceed to Checkout
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

const CartSkeleton = () => (
  <div className="min-h-screen p-6 pr-16">
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <Skeleton className="h-16 w-full" />
          <Skeleton className="h-48 w-full" />
          <Skeleton className="h-48 w-full" />
        </div>
        <div className="lg:col-span-1">
          <Skeleton className="h-96 w-full" />
        </div>
      </div>
    </div>
  </div>
);
