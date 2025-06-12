"use client";

import React, { useState } from "react";
import { ChevronLeft, Plus, X, Upload, Trash } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const EditProductDetails = () => {
  const [formData, setFormData] = useState({
    title: "Samsung Galaxy S22 Ultra - 256GB - Phantom Black",
    description:
      "This is a gently used device in excellent working condition. It may show minor cosmetic wear, but functions perfectly. Battery health is strong, and all features are tested and verified.",
    category: "Mobile Phones",
    brand: "Samsung Galaxy",
    model: "S22 Ultra",
    storage: "256GB",
    ram: "12GB",
    color: "Phantom Black",
    condition: "Very Good",
    features: [
      "5G",
      "Wireless Charging",
      "Face ID",
      "Fingerprint",
      "Water Resistant",
    ],
    price: "380",
    salePrice: "300",
    quantity: "1",
    sku: "e.g. SG-001",
    tags: ["smartphone"],
    seoTitle:
      "Buy Samsung Galaxy S22 Ultra - Premium Smartphone with 108MP Camera",
    seoDescription:
      "Shop the Samsung Galaxy S22 Ultra with 256GB storage in Phantom Black. Features include 108MP camera, 5000mAh battery, and Android 12.",
  });

  const [images, setImages] = useState([]);

  const handleInputChange = (field: any, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFeatureToggle = (feature: any) => {
    setFormData((prev) => ({
      ...prev,
      features: prev.features.includes(feature)
        ? prev.features.filter((f) => f !== feature)
        : [...prev.features, feature],
    }));
  };

  const handleImageUpload = (event: any) => {
    const files = Array.from(event.target.files);

    files.forEach((file: any) => {
      if (file && images.length < 4) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          const newImage = {
            id: Date.now() + Math.random(),
            file: file,
            preview: e.target.result,
            name: file.name,
          };

          setImages((prev: any) => {
            if (prev.length < 4) {
              return [...prev, newImage];
            }
            return prev;
          });
        };
        reader.readAsDataURL(file);
      }
    });

    // Reset input
    event.target.value = "";
  };

  const removeImage = (imageId: any) => {
    setImages((prev) => prev.filter((img: any) => img.id !== imageId));
  };

  const addTag = (tag: any) => {
    if (tag && !formData.tags.includes(tag)) {
      setFormData((prev) => ({
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
              Edit Product Details
            </h1>
            <p className="text-gray-600 text-sm">
              Edit the details of your product
            </p>
          </div>
        </div>

        <div className="space-y-8">
          {/* General Information */}
          <div className="bg-white rounded-md border p-6">
            <h2 className="text-base font-medium text-gray-900 mb-4">
              General Information
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Product Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    handleInputChange("description", e.target.value)
                  }
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Product Images */}
          <div className="bg-white rounded-md border p-6">
            <h2 className="block text-sm font-medium text-gray-700 mb-4">
              Product Images <span className="text-red-500">*</span>
            </h2>

            <div className="space-y-4">
              {/* Image Upload Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {/* Display uploaded images */}
                {images.map((image: any) => (
                  <div key={image.id} className="relative group">
                    <div className="aspect-square border border-gray-300 rounded-lg overflow-hidden bg-gray-50">
                      <Image
                        src={image.preview}
                        alt={image.name}
                        className="w-full h-full object-cover"
                      />
                      <button
                        onClick={() => removeImage(image.id)}
                        className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors opacity-0 group-hover:opacity-100"
                      >
                        <X className="w-3 h-3" />
                      </button>
                      <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs p-2 truncate opacity-0 group-hover:opacity-100 transition-opacity">
                        {image.name}
                      </div>
                    </div>
                  </div>
                ))}

                {/* Add new image button - show only if less than 4 images */}
                {images.length < 4 && (
                  <div className="relative">
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleImageUpload}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                      id="image-upload"
                    />
                    <label
                      htmlFor="image-upload"
                      className="aspect-square border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 flex flex-col items-center justify-center cursor-pointer hover:border-gray-400 hover:bg-gray-100 transition-colors"
                    >
                      <Upload className="w-6 h-6 text-gray-400 mb-2" />
                      <span className="text-sm text-gray-500 text-center px-2">
                        Add Image
                      </span>
                      <span className="text-xs text-gray-400 mt-1">
                        {images.length}/4
                      </span>
                    </label>
                  </div>
                )}
              </div>

              {/* Image upload info */}
              <div className="space-y-1">
                <p className="text-xs text-gray-500">
                  Upload up to 4 images. First image will be used as the product
                  thumbnail.
                </p>
                <p className="text-xs text-gray-400">
                  Supported formats: JPG, PNG, GIF. Max file size: 5MB each.
                </p>
              </div>

              {/* Bulk upload area when no images */}
              {/* {images.length === 0 && (
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageUpload}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    id="bulk-upload"
                  />
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-2">
                    Drop your images here or click to browse
                  </p>
                  <p className="text-sm text-gray-500">
                    You can select multiple images at once
                  </p>
                </div>
              )} */}
            </div>
          </div>

          {/* Category */}
          <div className="bg-white rounded-md border p-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.category}
              onChange={(e) => handleInputChange("category", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option>Mobile Phones</option>
              <option>Tablets</option>
              <option>Laptops</option>
              <option>Accessories</option>
            </select>
          </div>

          {/* Specifications */}
          <div className="bg-white rounded-md border p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-medium text-gray-900">
                Specifications
              </h2>
              <button className="text-blue-600 text-sm font-medium hover:text-blue-700 transition-colors flex items-center gap-1">
                <Plus className="w-4 h-4" />
                Add another specification
              </button>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Brand <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.brand}
                onChange={(e) => handleInputChange("brand", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option>Samsung Galaxy</option>
                <option>Apple iPhone</option>
                <option>Google Pixel</option>
                <option>OnePlus</option>
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Storage <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.storage}
                  onChange={(e) => handleInputChange("storage", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option>256GB</option>
                  <option>128GB</option>
                  <option>512GB</option>
                  <option>1TB</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Model <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.model}
                  onChange={(e) => handleInputChange("model", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option>S22 Ultra</option>
                  <option>S22 Plus</option>
                  <option>S22</option>
                  <option>S21 Ultra</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Colour <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.color}
                  onChange={(e) => handleInputChange("color", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option>Phantom Black</option>
                  <option>Phantom White</option>
                  <option>Burgundy</option>
                  <option>Green</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  RAM <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.ram}
                  onChange={(e) => handleInputChange("ram", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option>12GB</option>
                  <option>8GB</option>
                  <option>16GB</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Condition */}
              <div className="mt-6">
                <h3 className="block text-sm font-medium text-gray-700 mb-3">
                  Condition <span className="text-red-500">*</span>
                </h3>
                <div className="space-y-2">
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
                        className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">
                        {condition}
                      </span>
                    </label>
                  ))}
                </div>
                <button className="mt-2 text-blue-600 text-sm font-medium hover:text-blue-700 transition-colors flex items-center gap-1">
                  <Plus className="w-4 h-4" />
                  Add condition
                </button>
              </div>

              {/* Features */}
              <div className="mt-6">
                <h3 className="block text-sm font-medium text-gray-700 mb-3">
                  Features <span className="text-red-500">*</span>
                </h3>
                <div className="space-y-2">
                  {[
                    "5G",
                    "Wireless Charging",
                    "Face ID",
                    "Fingerprint",
                    "Water Resistant",
                  ].map((feature) => (
                    <label key={feature} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.features.includes(feature)}
                        onChange={() => handleFeatureToggle(feature)}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">
                        {feature}
                      </span>
                    </label>
                  ))}
                </div>
                <button className="mt-2 text-blue-600 text-sm font-medium hover:text-blue-700 transition-colors flex items-center gap-1">
                  <Plus className="w-4 h-4" />
                  Add another feature
                </button>
              </div>
            </div>
          </div>

          {/* Pricing & Inventory */}
          <div className="bg-white rounded-md border p-6">
            <h2 className="text-base font-medium text-gray-900 mb-4">
              Pricing & Inventory
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price($) <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.price}
                  onChange={(e) => handleInputChange("price", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sale Price($)
                </label>
                <input
                  type="text"
                  value={formData.salePrice}
                  onChange={(e) =>
                    handleInputChange("salePrice", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Quantity <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.quantity}
                  onChange={(e) =>
                    handleInputChange("quantity", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  SKU
                </label>
                <input
                  type="text"
                  value={formData.sku}
                  onChange={(e) => handleInputChange("sku", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Additional Information */}
          <div className="bg-white rounded-md border p-6">
            <h2 className="text-base font-medium text-gray-900 mb-4">
              Additional Information
            </h2>

            <div className="space-y-4">
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
                  value={formData.seoTitle}
                  onChange={(e) =>
                    handleInputChange("seoTitle", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  SEO Description
                </label>
                <textarea
                  value={formData.seoDescription}
                  onChange={(e) =>
                    handleInputChange("seoDescription", e.target.value)
                  }
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
              {/* <button
                type="button"
                className="px-6 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Save as Draft
              </button> */}
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
  );
};

export default EditProductDetails;
