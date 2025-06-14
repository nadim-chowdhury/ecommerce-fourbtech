"use client";

import React, { useState } from "react";
import { Home, Building2, X } from "lucide-react";

const CheckoutForm = () => {
  const [selectedAddress, setSelectedAddress] = useState("home");
  const [selectedPayment, setSelectedPayment] = useState("gateway");
  const [billingAddressSame, setBillingAddressSame] = useState(true);
  const [promoCode, setPromoCode] = useState("");
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    email: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    zipCode: "",
    country: "",
    state: "",
  });

  const handleInputChange = (field: any, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const orderItems = [
    {
      id: 1,
      name: "Wireless Noise-Cancelling Headphones",
      color: "Black | Premium Edition",
      price: 249.99,
      quantity: 1,
    },
    {
      id: 2,
      name: "Wireless Noise-Cancelling Headphones",
      color: "Black | Premium Edition",
      price: 249.99,
      quantity: 1,
    },
    {
      id: 3,
      name: "Wireless Noise-Cancelling Headphones",
      color: "Black | Premium Edition",
      price: 249.99,
      quantity: 1,
    },
    {
      id: 4,
      name: "Wireless Noise-Cancelling Headphones",
      color: "Black | Premium Edition",
      price: 249.99,
      quantity: 1,
    },
  ];

  const subtotal = 809.96;
  const shipping = 64.8;
  const tax = 12.99;
  const total = 887.75;

  return (
    <div className="min-h-screen p-6 pr-16">
      {/* Header */}
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Checkout</h1>
      <p className="text-gray-600 mb-8">
        Please review and complete your purchase
      </p>

      {/* Progress Steps */}
      <div className="flex items-center mb-8">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-medium">
            1
          </div>
          <span className="ml-2 text-sm text-blue-600 font-medium">Cart</span>
        </div>
        <div className="flex-1 h-px bg-gray-300 mx-4"></div>
        <div className="flex items-center">
          <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-medium">
            2
          </div>
          <span className="ml-2 text-sm text-blue-600 font-medium">
            Checkout
          </span>
        </div>
        <div className="flex-1 h-px bg-gray-300 mx-4"></div>
        <div className="flex items-center">
          <div className="w-8 h-8 bg-gray-300 text-gray-500 rounded-full flex items-center justify-center text-sm font-medium">
            3
          </div>
          <span className="ml-2 text-sm text-gray-500">Confirmation</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Forms */}
        <div className="lg:col-span-2 space-y-6">
          {/* Shipping Information */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Shipping Information
            </h2>

            {/* Saved Addresses */}
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-700 mb-3">
                Saved Addresses
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-colors ${
                    selectedAddress === "home"
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                  onClick={() => setSelectedAddress("home")}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <Home className="w-4 h-4 text-gray-600 mr-2" />
                      <span className="font-medium text-gray-900">Home</span>
                      <span className="ml-2 text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                        Default
                      </span>
                    </div>
                    {selectedAddress === "home" && (
                      <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      </div>
                    )}
                  </div>
                  <p className="text-sm text-gray-600">
                    12 Rosewood Lane, Flat 3A, Manchester, M14 5TP, United
                    Kingdom
                  </p>
                </div>

                <div
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-colors ${
                    selectedAddress === "work"
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                  onClick={() => setSelectedAddress("work")}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <Building2 className="w-4 h-4 text-gray-600 mr-2" />
                      <span className="font-medium text-gray-900">Work</span>
                    </div>
                    {selectedAddress === "work" && (
                      <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      </div>
                    )}
                  </div>
                  <p className="text-sm text-gray-600">
                    Unit 7, Orion Business Park, Buckingham, Avenue, Slough, SL1
                    4QT, United Kingdom
                  </p>
                </div>
              </div>
            </div>

            {/* Form Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter Product Name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={formData.fullName}
                  onChange={(e) =>
                    handleInputChange("fullName", e.target.value)
                  }
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  placeholder="Enter Product Name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={formData.phoneNumber}
                  onChange={(e) =>
                    handleInputChange("phoneNumber", e.target.value)
                  }
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  placeholder="Enter Product Name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Address Line 1 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter Product Name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={formData.addressLine1}
                  onChange={(e) =>
                    handleInputChange("addressLine1", e.target.value)
                  }
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Address Line 2 (Optional)
                </label>
                <input
                  type="text"
                  placeholder="Enter Product Name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={formData.addressLine2}
                  onChange={(e) =>
                    handleInputChange("addressLine2", e.target.value)
                  }
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  City <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter Product Name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={formData.city}
                  onChange={(e) => handleInputChange("city", e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Zip/Postal Code <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter Product Name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={formData.zipCode}
                  onChange={(e) => handleInputChange("zipCode", e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Country <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter Product Name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={formData.country}
                  onChange={(e) => handleInputChange("country", e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  State/Province <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter Product Name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={formData.state}
                  onChange={(e) => handleInputChange("state", e.target.value)}
                />
              </div>
            </div>

            <div className="mt-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={billingAddressSame}
                  onChange={(e) => setBillingAddressSame(e.target.checked)}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-700">
                  Billing address is the same as shipping
                </span>
              </label>
            </div>
          </div>

          {/* Payment Method */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Payment Method
            </h2>

            <div className="space-y-4">
              <div className="p-4 border border-red-200 bg-red-50 rounded-lg">
                <div className="flex items-center mb-2">
                  <input
                    type="radio"
                    name="payment"
                    value="gateway"
                    checked={selectedPayment === "gateway"}
                    onChange={(e) => setSelectedPayment(e.target.value)}
                    className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm font-medium text-gray-900">
                    You will be redirected to XYZ gateway, to complete your
                    transaction.
                  </span>
                </div>
                <p className="text-sm text-gray-600 ml-6">
                  XYZ gateway supports all major payment methods including
                  credit/debit cards, mobile banking, and digital wallets.
                </p>
                <div className="mt-3 ml-6">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">
                      I understand I will complete my payment via a secure
                      external gateway (SSLCommerz).
                    </span>
                  </label>
                  <p className="text-sm text-red-600 mt-1">
                    * This acknowledgment is required before placing your order.
                  </p>
                </div>
              </div>

              <div className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      name="payment"
                      value="cod"
                      checked={selectedPayment === "cod"}
                      onChange={(e) => setSelectedPayment(e.target.value)}
                      className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm font-medium text-gray-900">
                      Cash On Delivery
                    </span>
                  </div>
                  <div className="flex items-center px-2 py-1 bg-green-100 text-green-800 rounded text-xs font-medium">
                    <span className="mr-1">৳</span>
                  </div>
                </div>
                <p className="text-sm text-gray-600 ml-6 mt-1">
                  Payment collected upon delivery
                </p>
              </div>
            </div>
          </div>

          {/* Promo Code */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Promo Code
            </h2>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Enter a promo code"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button className="px-6 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors font-medium">
                Apply
              </button>
            </div>
          </div>
        </div>

        {/* Right Column - Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm border p-6 sticky top-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Order Summary
            </h2>

            <div className="space-y-4 mb-6">
              {orderItems.map((item) => (
                <div key={item.id} className="flex items-start gap-3">
                  <div className="w-12 h-12 bg-gray-200 rounded-md flex-shrink-0"></div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-medium text-gray-900 line-clamp-2">
                      {item.name}
                    </h3>
                    <p className="text-xs text-gray-500 mt-1">{item.color}</p>
                    <p className="text-sm font-medium text-gray-900 mt-1">
                      ${item.price}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">
                      Quantity: {item.quantity}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t pt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Subtotal</span>
                <span className="text-gray-900">${subtotal}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Shipping</span>
                <span className="text-gray-900">${shipping}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Tax</span>
                <span className="text-gray-900">${tax}</span>
              </div>
              <div className="flex justify-between text-lg font-semibold border-t pt-2">
                <span className="text-gray-900">Total</span>
                <span className="text-gray-900">${total}</span>
              </div>
            </div>

            <div className="mt-6 space-y-3">
              <button className="w-full bg-red-500 text-white py-3 rounded-md hover:bg-red-600 transition-colors font-medium">
                Place Order
              </button>
              <button className="w-full text-red-500 py-2 rounded-md hover:bg-red-50 transition-colors font-medium flex items-center justify-center">
                <X className="w-4 h-4 mr-1" />
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutForm;
