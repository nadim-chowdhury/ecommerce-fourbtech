"use client";

import React, { useState } from "react";
import { ChevronLeft, Upload, Plus, Trash, X } from "lucide-react";
import Link from "next/link";

const AddProductForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "Mobile Phones",
    brand: "",
    model: "",
    storage: "",
    ram: "",
    color: "",
    ram2: "",
    color2: "",
    condition: "New",
    features: {
      "5G": false,
      "Wireless Charging": false,
      "Face ID": false,
      Fingerprint: false,
      "Water Resistant": false,
    },
    price: "",
    salePrice: "",
    quantity: "",
    sku: "",
    enableNegotiation: false,
    tags: [],
    seoTitle: "",
    seoDescription: "",
  });

  const handleInputChange = (field: any, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleFeatureChange = (feature: any, checked: any) => {
    setFormData((prev) => ({
      ...prev,
      features: {
        ...prev.features,
        [feature]: checked,
      },
    }));
  };

  const addTag = (tag: any) => {
    if (tag && !(formData as any).tags.includes(tag)) {
      setFormData((prev: any) => ({
        ...prev,
        tags: [...prev.tags, tag],
      }));
    }
  };

  const removeTag = (tagToRemove: any) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  return (
    <div className="min-h-screen pl-6 py-6 pr-16">
      <div className="">
        {/* Header */}
        <div className="flex items-center gap-3 py-6">
          <Link
            href={"/seller/products"}
            className="text-gray-600 hover:text-gray-900 p-2 border border-transparent rounded hover:border-gray-300"
          >
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </Link>
          <div>
            <h1 className="text-xl font-semibold text-gray-900">
              Add New Product
            </h1>
            <p className="text-gray-600 text-sm">
              Fill in the details to list your product for sale
            </p>
          </div>
        </div>

        <div className="">
          <div className="space-y-8">
            {/* General Information */}
            <div className="bg-white rounded-md border p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-6">
                General Information
              </h2>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Product Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter Product Name"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={formData.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    placeholder="Enter Product Description"
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    value={formData.description}
                    onChange={(e) =>
                      handleInputChange("description", e.target.value)
                    }
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Product Images <span className="text-red-500">*</span>
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center bg-gray-50">
                    <Upload className="w-8 h-8 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 font-medium mb-2">
                      Drag & drop product images
                    </p>
                    <p className="text-gray-500 text-sm mb-4">
                      or click to browse files (PNG, JPG, WEBP up to 5MB each)
                    </p>
                    <button
                      type="button"
                      className="px-4 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      Select Files
                    </button>
                  </div>
                </div>

                <div className="border p-6 rounded-md">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category <span className="text-red-500">*</span>
                  </label>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={formData.category}
                    onChange={(e) =>
                      handleInputChange("category", e.target.value)
                    }
                  >
                    <option value="Mobile Phones">Mobile Phones</option>
                    <option value="Laptops">Laptops</option>
                    <option value="Tablets">Tablets</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Specifications */}
            <div className="bg-white rounded-md border p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-medium text-gray-900">
                  Specifications
                </h2>
                <button
                  type="button"
                  className="text-blue-600 text-sm font-medium flex items-center gap-1 hover:text-blue-700"
                >
                  <Plus className="w-4 h-4" />
                  Add another specification
                </button>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Brand <span className="text-red-500">*</span>
                </label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={formData.brand}
                  onChange={(e) => handleInputChange("brand", e.target.value)}
                >
                  <option value="">Select Brand</option>
                  <option value="Apple">Apple</option>
                  <option value="Samsung">Samsung</option>
                  <option value="Google">Google</option>
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Storage <span className="text-red-500">*</span>
                  </label>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={formData.storage}
                    onChange={(e) =>
                      handleInputChange("storage", e.target.value)
                    }
                  >
                    <option value="">Select Storage</option>
                    <option value="64GB">64GB</option>
                    <option value="128GB">128GB</option>
                    <option value="256GB">256GB</option>
                    <option value="512GB">512GB</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Model <span className="text-red-500">*</span>
                  </label>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={formData.model}
                    onChange={(e) => handleInputChange("model", e.target.value)}
                  >
                    <option value="">Select Model</option>
                    <option value="iPhone 15">iPhone 15</option>
                    <option value="iPhone 15 Pro">iPhone 15 Pro</option>
                    <option value="Galaxy S24">Galaxy S24</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Colour <span className="text-red-500">*</span>
                  </label>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={formData.color}
                    onChange={(e) => handleInputChange("color", e.target.value)}
                  >
                    <option value="">Select Colour</option>
                    <option value="Black">Black</option>
                    <option value="White">White</option>
                    <option value="Blue">Blue</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    RAM <span className="text-red-500">*</span>
                  </label>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={formData.ram}
                    onChange={(e) => handleInputChange("ram", e.target.value)}
                  >
                    <option value="">Select Ram</option>
                    <option value="4GB">4GB</option>
                    <option value="6GB">6GB</option>
                    <option value="8GB">8GB</option>
                    <option value="12GB">12GB</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Colour <span className="text-red-500">*</span>
                  </label>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={formData.color2}
                    onChange={(e) =>
                      handleInputChange("color2", e.target.value)
                    }
                  >
                    <option value="">Select Colour</option>
                    <option value="Black">Black</option>
                    <option value="White">White</option>
                    <option value="Blue">Blue</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    RAM <span className="text-red-500">*</span>
                  </label>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={formData.ram2}
                    onChange={(e) => handleInputChange("ram2", e.target.value)}
                  >
                    <option value="">Select Ram</option>
                    <option value="4GB">4GB</option>
                    <option value="6GB">6GB</option>
                    <option value="8GB">8GB</option>
                    <option value="12GB">12GB</option>
                  </select>
                </div>
              </div>

              {/* Condition */}
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Condition <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {[
                    "New",
                    "Open Box",
                    "Refurbished",
                    "Very Good",
                    "Good",
                    "Used",
                    "Defective",
                  ].map((condition) => (
                    <label key={condition} className="flex items-center">
                      <input
                        type="radio"
                        name="condition"
                        value={condition}
                        checked={formData.condition === condition}
                        onChange={(e) =>
                          handleInputChange("condition", e.target.value)
                        }
                        className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                      />
                      <span className="ml-2 text-sm text-gray-700">
                        {condition}
                      </span>
                    </label>
                  ))}
                </div>
                <button
                  type="button"
                  className="mt-3 text-blue-600 text-sm font-medium flex items-center gap-1 hover:text-blue-700"
                >
                  <Plus className="w-4 h-4" />
                  Add condition
                </button>
              </div>

              {/* Features */}
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Features <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {Object.entries(formData.features).map(
                    ([feature, checked]) => (
                      <label key={feature} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={(e) =>
                            handleFeatureChange(feature, e.target.checked)
                          }
                          className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <span className="ml-2 text-sm text-gray-700">
                          {feature}
                        </span>
                      </label>
                    )
                  )}
                </div>
                <button
                  type="button"
                  className="mt-3 text-blue-600 text-sm font-medium flex items-center gap-1 hover:text-blue-700"
                >
                  <Plus className="w-4 h-4" />
                  Add another feature
                </button>
              </div>
            </div>

            {/* Pricing & Inventory */}
            <div className="bg-white rounded-md border p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-6">
                Pricing & Inventory
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price($) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    placeholder="0.00"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={formData.price}
                    onChange={(e) => handleInputChange("price", e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Sale Price($)
                  </label>
                  <input
                    type="number"
                    placeholder="0.00"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={formData.salePrice}
                    onChange={(e) =>
                      handleInputChange("salePrice", e.target.value)
                    }
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Quantity <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    placeholder="0"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={formData.quantity}
                    onChange={(e) =>
                      handleInputChange("quantity", e.target.value)
                    }
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    SKU
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. MP-001"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={formData.sku}
                    onChange={(e) => handleInputChange("sku", e.target.value)}
                  />
                </div>
              </div>

              <div className="mt-6">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.enableNegotiation}
                    onChange={(e) =>
                      handleInputChange("enableNegotiation", e.target.checked)
                    }
                    className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <span className="ml-2 text-sm text-gray-700">
                    Enable Negotiation
                  </span>
                </label>
              </div>
            </div>

            {/* Additional Information */}
            <div className="bg-white rounded-md border p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-6">
                Additional Information
              </h2>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tags
                  </label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {formData.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 text-gray-700 rounded-md text-sm"
                      >
                        {tag}
                        <button
                          onClick={() => removeTag(tag)}
                          className="text-gray-500 hover:text-gray-700"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                  <input
                    type="text"
                    placeholder="e.g. smartphone, android, 5G (separate with commas)"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    onKeyPress={(e: any) => {
                      if (e.key === "Enter") {
                        addTag(e.target.value.trim());
                        e.target.value = "";
                      }
                    }}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Tags help buyers find your product when searching
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    SEO Title
                  </label>
                  <input
                    type="text"
                    placeholder="Custom title for search engines"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={formData.seoTitle}
                    onChange={(e) =>
                      handleInputChange("seoTitle", e.target.value)
                    }
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    SEO Description
                  </label>
                  <textarea
                    placeholder="Custom description for search engines"
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    value={formData.seoDescription}
                    onChange={(e) =>
                      handleInputChange("seoDescription", e.target.value)
                    }
                  />
                </div>
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex justify-between gap-3 pt-6 bg-white rounded-md border p-6">
              <button
                type="button"
                className="px-6 py-2 border border-gray-300 rounded-md text-sm font-medium bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 text-red-600 flex items-center gap-2"
              >
                <Trash className="w-4 h-4" /> Discard
              </button>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  className="px-6 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Save as Draft
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-red-600 text-white rounded-md text-sm font-medium hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                >
                  Send for Review
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProductForm;
