"use client";

import { useState, useEffect } from "react";
import {
  Search,
  Plus,
  Edit,
  Trash2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  AlertTriangle,
  Trash,
  X,
} from "lucide-react";
import Image from "next/image";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import Link from "next/link";

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

const ProductsTable = () => {
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
  const [itemsPerPage, setItemsPerPage] = useState(7);

  const getStatusColor = (status: any) => {
    switch (status) {
      case "Active":
        return "text-green-600 bg-green-100 border-green-200";
      case "Low Stock":
        return "text-orange-600 bg-orange-100 border-orange-200";
      case "Out of Stock":
        return "text-red-600 bg-red-100 border-red-200";
      default:
        return "text-gray-600 bg-gray-100 border-gray-200";
    }
  };

  const handleDeleteClick = (product: any) => {
    setProductToDelete(product);
    setDeleteDialogOpen(true);
  };

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

  const handleItemsPerPageChange = (items: any) => {
    setItemsPerPage(items);
    setCurrentPage(1);
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
      <div className="bg-white border rounded-lg overflow-hidden shadow-sm">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Image
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                SKU
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Price
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Stock
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentProducts.map((product) => (
              <tr
                key={product.id}
                className="hover:bg-gray-50 transition-colors"
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="w-10 h-10 bg-gray-100 rounded-lg overflow-hidden p-1">
                    <Image
                      src="https://pngimg.com/uploads/box/box_PNG41.png"
                      alt="Demo Image"
                      width={360}
                      height={360}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {product.name}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{product.sku}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">${product.price}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{product.stock}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`inline-flex px-2 py-1 text-xs font-medium rounded-md border ${getStatusColor(
                      product.status
                    )}`}
                  >
                    {product.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex items-center gap-2">
                    <Link
                      href={`/seller/products/${product.id}/edit`}
                      className="no-underline"
                    >
                      <button className="text-gray-600 hover:text-gray-900 p-1 hover:bg-gray-100 rounded transition-colors border flex items-center gap-2 px-4 py-2 cursor-pointer">
                        <Edit className="w-4 h-4" /> Edit
                      </button>
                    </Link>
                    <button
                      onClick={() => handleDeleteClick(product)}
                      className="text-red-600 hover:text-red-800 p-1 hover:bg-red-50 rounded transition-colors border flex items-center gap-2 px-4 py-2 cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" /> Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-700">Show</span>
          <select
            value={itemsPerPage}
            onChange={(e) => handleItemsPerPageChange(Number(e.target.value))}
            className="border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            <option value={5}>5</option>
            <option value={7}>7</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
          </select>
          <span className="text-sm text-gray-700">entries</span>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-700">
            Showing {startIndex + 1} to {Math.min(endIndex, totalItems)} of{" "}
            {totalItems} entries
          </span>

          <div className="flex items-center gap-1">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-2 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`px-3 py-1 rounded text-sm transition-colors ${
                  currentPage === page
                    ? "bg-red-500 text-white"
                    : "hover:bg-gray-100 text-gray-700"
                }`}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="p-2 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

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

      {/* {deleteDialogOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
         
        </div>
      )} */}
    </div>
  );
};

export default ProductsTable;
