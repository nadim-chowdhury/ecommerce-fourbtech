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
import { Dialog, DialogContent } from "@/components/ui/dialog";
import Link from "next/link";
import { TablePagination } from "@/components/common/table-pagination";
import ProductsTable from "@/components/seller-products/products-table";
import { useQuery, useMutation } from "@apollo/client";
import { VENDOR_PRODUCTS_QUERY_GQL } from "@/graphql/queries";
import { DELETE_PRODUCT_MUTATION_GQL } from "@/graphql/mutations";
import { toast } from "sonner";
import { useAuth } from "@/components/providers/auth-provider";

const categories = [
  "All Categories",
  "Mobile Phones",
  "Laptops",
  "Tablets",
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
  const { user } = useAuth();
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

  // Get vendorId from user or localStorage
  const getVendorId = () => {
    if (user?.vendorId) return user.vendorId;

    if (typeof window !== "undefined") {
      const vendorStr = localStorage.getItem("vendor");
      if (vendorStr) {
        try {
          const vendorObj = JSON.parse(vendorStr);
          return (
            vendorObj.vendorId || vendorObj.id || vendorObj.vendor?.id || null
          );
        } catch {
          return null;
        }
      }
    }
    return null;
  };

  const vendorId = getVendorId();

  // Fetch products from backend
  const { data, loading, error, refetch } = useQuery(
    VENDOR_PRODUCTS_QUERY_GQL,
    {
      variables: { vendorId },
      skip: !vendorId,
    }
  );

  // Delete product mutation
  const [deleteProduct, { loading: deleting }] = useMutation(
    DELETE_PRODUCT_MUTATION_GQL,
    {
      onCompleted: () => {
        toast.success("Product deleted successfully");
        refetch(); // Refetch the products list
      },
      onError: (error) => {
        toast.error(error.message || "Failed to delete product");
      },
    }
  );

  useEffect(() => {
    if (error) {
      toast.error("Failed to load products");
    }
  }, [error]);

  const handleDeleteConfirm = async () => {
    if (productToDelete) {
      try {
        await deleteProduct({
          variables: { id: productToDelete.id },
        });
        setProductToDelete(null);
        setDeleteDialogOpen(false);
      } catch {
        // Error is handled by onError callback
      }
    }
  };

  const handleDeleteClick = (product: any) => {
    setProductToDelete(product);
    setDeleteDialogOpen(true);
  };

  // Use backend data if available, else fallback to empty array
  const products = data?.vendorProducts || [];

  // Transform products to include status based on stock
  const transformedProducts = products.map((product: any) => ({
    ...product,
    status:
      product.stock === 0
        ? "Out of Stock"
        : product.stock <= 10
        ? "Low Stock"
        : "Active",
  }));

  const filteredProducts = transformedProducts.filter((product: any) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (product.sku &&
        product.sku.toLowerCase().includes(searchTerm.toLowerCase()));
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

  // Show loading state
  if (loading) {
    return (
      <div className="pl-6 py-6 pr-16 bg-gray-50 min-h-screen">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">Products</h1>
          <Link href={"/seller/products/create"} className="no-underline">
            <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md flex items-center gap-2 transition-colors">
              <Plus className="w-4 h-4" />
              Add Product
            </button>
          </Link>
        </div>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600 mx-auto mb-4"></div>
            <p className="text-gray-500">Loading products...</p>
          </div>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="pl-6 py-6 pr-16 bg-gray-50 min-h-screen">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">Products</h1>
          <Link href={"/seller/products/create"} className="no-underline">
            <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md flex items-center gap-2 transition-colors">
              <Plus className="w-4 h-4" />
              Add Product
            </button>
          </Link>
        </div>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <AlertTriangle className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <p className="text-gray-500">Failed to load products</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-2 text-red-600 hover:text-red-700"
            >
              Try again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pl-6 py-6 pr-16 w-full bg-gray-50 min-h-screen">
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
        onDeleteClick={handleDeleteClick}
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
                <p className="text-sm text-gray-500">
                  SKU: {productToDelete.sku || "N/A"}
                </p>
              </div>
            )}

            <div className="flex justify-center items-center gap-3">
              <button
                onClick={() => setDeleteDialogOpen(false)}
                disabled={deleting}
                className="flex items-center gap-2 px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors disabled:opacity-50"
              >
                <X className="w-5 h-5" /> Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                disabled={deleting}
                className="flex items-center gap-2 px-4 py-2 text-white bg-red-600 rounded-md hover:bg-red-700 transition-colors disabled:opacity-50"
              >
                {deleting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Deleting...
                  </>
                ) : (
                  <>
                    <Trash className="w-4 h-4" />
                    Delete
                  </>
                )}
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProductsPage;
