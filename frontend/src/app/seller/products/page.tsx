"use client";

import { useState, useEffect } from "react";
import {
  Search,
  Plus,
  ChevronDown,
  AlertTriangle,
  Trash,
  X,
} from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import Link from "next/link";
import { TablePagination } from "@/components/common/table-pagination";
import ProductsTable from "@/components/seller-products/products-table";

// Mock data - expanded for pagination demo
const initialProducts = [
  {
    id: 1,
    name: "Premium Cotton T-Shirt",
    sku: "TS-001",
    price: 100,
    stock: 200,
    status: "Active",
    category: "Men's Clothing",
  },
  {
    id: 2,
    name: "Leather Wallet",
    sku: "WL-002",
    price: 50,
    stock: 200,
    status: "Active",
    category: "Wearables",
  },
  {
    id: 3,
    name: "Wireless Earbuds",
    sku: "EB-003",
    price: 70,
    stock: 12,
    status: "Low Stock",
    category: "Headphones & Audio",
  },
  {
    id: 4,
    name: "Handcrafted Ceramic Mug",
    sku: "MG-004",
    price: 60,
    stock: 32,
    status: "Active",
    category: "Kitchen & Dining",
  },
  {
    id: 5,
    name: "Organic Face Cream",
    sku: "MG-004",
    price: 200,
    stock: 0,
    status: "Out of Stock",
    category: "Skincare",
  },
  {
    id: 6,
    name: "Bamboo Cutting Board",
    sku: "CB-006",
    price: 620,
    stock: 5,
    status: "Low Stock",
    category: "Kitchen & Dining",
  },
  {
    id: 7,
    name: "Smart Watch",
    sku: "SW-007",
    price: 299,
    stock: 15,
    status: "Active",
    category: "Wearables",
  },
  {
    id: 8,
    name: "Gaming Mouse",
    sku: "GM-008",
    price: 45,
    stock: 25,
    status: "Active",
    category: "Laptops & Accessories",
  },
  {
    id: 9,
    name: "Wireless Keyboard",
    sku: "WK-009",
    price: 89,
    stock: 8,
    status: "Low Stock",
    category: "Laptops & Accessories",
  },
  {
    id: 10,
    name: "Phone Case",
    sku: "PC-010",
    price: 25,
    stock: 0,
    status: "Out of Stock",
    category: "Mobile",
  },
  {
    id: 11,
    name: "Bluetooth Speaker",
    sku: "BS-011",
    price: 120,
    stock: 18,
    status: "Active",
    category: "Headphones & Audio",
  },
  {
    id: 12,
    name: "Coffee Maker",
    sku: "CM-012",
    price: 150,
    stock: 10,
    status: "Active",
    category: "Kitchen & Dining",
  },
];

const categories = [
  "All Categories",
  "Mobile",
  "Laptops & Accessories",
  "Wearables",
  "Headphones & Audio",
  "Kitchen & Dining",
  "Men's Clothing",
  "Women's Clothing",
  "Kid's Wear",
  "Skincare",
];

const stockStatuses = ["All", "Active", "Low stock", "Out of stock"];

const ProductsPage = () => {
  const [products, setProducts] = useState(initialProducts);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<any>(null);
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [statusOpen, setStatusOpen] = useState(false);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const handleDeleteConfirm = () => {
    if (productToDelete) {
      setProducts(
        products.filter((product) => product.id !== productToDelete.id)
      );
      setProductToDelete(null);
    }
    setDeleteDialogOpen(false);
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "All Categories" ||
      product.category === selectedCategory;
    const matchesStatus =
      selectedStatus === "All" ||
      (selectedStatus === "Active" && product.status === "Active") ||
      (selectedStatus === "Low stock" && product.status === "Low Stock") ||
      (selectedStatus === "Out of stock" && product.status === "Out of Stock");

    return matchesSearch && matchesCategory && matchesStatus;
  });

  // Pagination calculations
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);
  const totalItems = filteredProducts.length;

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategory, selectedStatus]);

  const handlePageChange = (page: any) => {
    setCurrentPage(page);
  };

  return (
    <div className="pl-6 py-6 pr-16 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Products</h1>
        <Link href={"/seller/products/create"} className="no-underline">
          <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md flex items-center gap-2 transition-colors">
            <Plus className="w-4 h-4" />
            Add Product
          </button>
        </Link>
      </div>

      {/* Filters */}
      <div className="flex gap-4 mb-6">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search by name or SKU"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-3 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-gray-300"
          />
        </div>

        {/* Category Dropdown */}
        <Popover open={categoryOpen} onOpenChange={setCategoryOpen}>
          <PopoverTrigger asChild>
            <button className="min-w-40 px-3 py-2 border border-gray-300 rounded-md bg-white flex items-center justify-between hover:bg-gray-50 transition-colors">
              {selectedCategory}
              <ChevronDown className="w-4 h-4 text-gray-400" />
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-56 p-0" align="end">
            <div className="py-1">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => {
                    setSelectedCategory(category);
                    setCategoryOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 ${
                    selectedCategory === category
                      ? "text-red-600 bg-red-50"
                      : "text-gray-700"
                  }`}
                >
                  {selectedCategory === category && (
                    <span className="mr-2">✓</span>
                  )}
                  {category}
                </button>
              ))}
            </div>
          </PopoverContent>
        </Popover>

        {/* Stock Status Dropdown */}
        <Popover open={statusOpen} onOpenChange={setStatusOpen}>
          <PopoverTrigger asChild>
            <button className="min-w-32 px-3 py-2 border border-gray-300 rounded-md bg-white flex items-center justify-between hover:bg-gray-50 transition-colors">
              Stock Status
              <ChevronDown className="w-4 h-4 text-gray-400" />
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-40 p-0" align="end">
            <div className="py-1">
              {stockStatuses.map((status) => (
                <button
                  key={status}
                  onClick={() => {
                    setSelectedStatus(status);
                    setStatusOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 ${
                    selectedStatus === status
                      ? "text-red-600 bg-red-50"
                      : "text-gray-700"
                  }`}
                >
                  {selectedStatus === status && <span className="mr-2">✓</span>}
                  {status}
                </button>
              ))}
            </div>
          </PopoverContent>
        </Popover>
      </div>

      {/* Table */}
      <ProductsTable
        currentProducts={currentProducts}
        setProductToDelete={setProductToDelete}
        setDeleteDialogOpen={setDeleteDialogOpen}
      />

      {/* Pagination */}
      <TablePagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={totalItems}
        itemsPerPage={itemsPerPage}
        onPageChange={handlePageChange}
      />

      {/* Delete Confirmation Modal */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogTrigger></DialogTrigger>
        <DialogContent className="w-96">
          <div className="">
            <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 bg-red-100 rounded-full">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>

            <h3 className="text-lg font-semibold text-gray-900 text-center mb-2">
              Delete Product?
            </h3>

            <p className="text-sm text-gray-600 text-center mb-2">
              Are you sure you want to delete this product?
            </p>

            <p className="text-sm text-gray-500 text-center mb-6">
              This action cannot be undone.
            </p>

            {productToDelete && (
              <div className="text-center mb-6">
                <p className="text-lg font-semibold text-gray-900">
                  {productToDelete.name}
                </p>
              </div>
            )}

            <div className="flex justify-center items-center gap-3">
              <button
                onClick={() => setDeleteDialogOpen(false)}
                className="flex items-center gap-2 px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
              >
                <X className="w-5 h-5" /> Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                className="flex items-center gap-2 px-4 py-2 text-white bg-red-600 rounded-md hover:bg-red-700 transition-colors"
              >
                <Trash className="w-4 h-4" />
                Delete
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProductsPage;
