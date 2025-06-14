"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Trash2, Minus, Plus, Store, Tag } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function ShoppingCart() {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Wireless Noise-Cancelling Headphones",
      description: "Black | Premium Edition",
      price: 249.99,
      quantity: 1,
      image: "/api/placeholder/100/100",
      store: "Tech Gadget Store",
      selected: false,
    },
    {
      id: 2,
      name: "Wireless Noise-Cancelling Headphones",
      description: "Black | Premium Edition",
      price: 249.99,
      quantity: 1,
      image: "/api/placeholder/100/100",
      store: "Tech Gadget Store",
      selected: false,
    },
    {
      id: 3,
      name: "Wireless Noise-Cancelling Headphones",
      description: "Black | Premium Edition",
      price: 249.99,
      quantity: 1,
      image: "/api/placeholder/100/100",
      store: "Super Gadgets",
      selected: false,
    },
    {
      id: 4,
      name: "Wireless Noise-Cancelling Headphones",
      description: "Black | Premium Edition",
      price: 249.99,
      quantity: 1,
      image: "/api/placeholder/100/100",
      store: "Super Gadgets",
      selected: false,
    },
  ]);

  const [promoCode, setPromoCode] = useState("");
  const [selectAll, setSelectAll] = useState(false);

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

  const handleQuantityChange = (id: any, change: any) => {
    setCartItems((items) =>
      items.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
    );
  };

  const handleRemoveItem = (id: any) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
  };

  const handleDeleteSelected = () => {
    setCartItems((items) => items.filter((item) => !item.selected));
    setSelectAll(false);
  };

  const selectedCount = cartItems.filter((item) => item.selected).length;
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = 0;
  const tax = 0;
  const total = subtotal + shipping + tax;

  const groupedItems = cartItems.reduce((groups: any, item: any) => {
    const store = item.store;
    if (!groups[store]) {
      groups[store] = [];
    }
    groups[store].push(item);
    return groups;
  }, {});

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
                      <div key={item.id} className="flex items-center gap-4">
                        <Checkbox
                          id={`item-${item.id}`}
                          checked={item.selected}
                          onCheckedChange={(checked) =>
                            handleItemSelect(item.id, checked)
                          }
                        />

                        <div className="w-20 h-20 bg-gray-200 rounded-lg flex-shrink-0 p-2">
                          <Image
                            src="https://pngimg.com/uploads/box/box_PNG41.png"
                            alt="Demo Image"
                            width={360}
                            height={360}
                            className="w-full h-full object-cover rounded-lg"
                          />
                        </div>

                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-gray-900 mb-1">
                            {item.name}
                          </h3>
                          <p className="text-sm text-gray-600 mb-2">
                            {item.description}
                          </p>
                          <p className="text-lg font-bold text-gray-900">
                            ${item.price}
                          </p>
                        </div>

                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleQuantityChange(item.id, -1)}
                            disabled={item.quantity <= 1}
                            className="w-8 h-8 p-0"
                          >
                            <Minus className="w-4 h-4" />
                          </Button>
                          <span className="w-8 text-center font-medium">
                            {item.quantity}
                          </span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleQuantityChange(item.id, 1)}
                            className="w-8 h-8 p-0"
                          >
                            <Plus className="w-4 h-4" />
                          </Button>
                        </div>

                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemoveItem(item.id)}
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
