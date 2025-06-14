"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TablePagination } from "@/components/common/table-pagination";
import { Input } from "@/components/ui/input";
import { OrdersTable } from "@/components/seller-orders/orders-table";
import { OrderDialog } from "@/components/seller-orders/order-dialog";

// Mock data
const generateOrders = () => {
  const customers = [
    "Mike Turner",
    "Sarah Johnson",
    "David Wilson",
    "Emily Davis",
    "Michael Brown",
    "Jessica Garcia",
    "Robert Martinez",
    "Lisa Anderson",
  ];
  const products = [
    "Wireless Earbuds X200",
    "Smart Watch Pro",
    "Bluetooth Speaker",
    "Laptop Stand",
    "Phone Case Premium",
    "USB-C Hub",
    "Wireless Charger",
    "Gaming Mouse",
  ];
  const statuses = [
    "Pending",
    "Shipped",
    "Delivered",
    "Cancelled",
    "Processing",
  ];

  return Array.from({ length: 50 }, (_, i) => ({
    id: `Ord-${String(i + 1).padStart(2, "0")}`,
    date: new Date(
      2025,
      4,
      Math.floor(Math.random() * 20) + 1
    ).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }),
    buyer: customers[Math.floor(Math.random() * customers.length)],
    amount: Math.floor(Math.random() * 500) + 50,
    status: statuses[Math.floor(Math.random() * statuses.length)],
    product: products[Math.floor(Math.random() * products.length)],
  }));
};

const orders = generateOrders();

const OrdersDashboard = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 10;

  const filteredOrders = orders.filter((order) => {
    const matchesTab =
      activeTab === "all" || order.status.toLowerCase() === activeTab;
    const matchesSearch =
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.buyer.toLowerCase().includes(searchTerm.toLowerCase());
    // const matchesGlobalSearch =
    //   globalSearch === "" ||
    //   order.product.toLowerCase().includes(globalSearch.toLowerCase()) ||
    //   order.buyer.toLowerCase().includes(globalSearch.toLowerCase()) ||
    //   order.id.toLowerCase().includes(globalSearch.toLowerCase());

    return matchesTab && matchesSearch;
  });

  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedOrders = filteredOrders.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handleShipOrder = (order: any) => {
    setSelectedOrder(order);
    setIsDialogOpen(true);
    console.log("Shipping order:", order);
  };

  const handleTabChange = (value: any) => {
    setActiveTab(value);
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen">
      {/* Main Content */}
      <div className="p-6 pr-16">
        <h1 className="text-2xl font-bold mb-6">Orders</h1>

        {/* Search */}
        <div className="mb-6">
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <Input
              type="text"
              placeholder="Search by order id or customer name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-white"
            />
          </div>
        </div>

        {/* Tabs */}
        <Tabs
          value={activeTab}
          onValueChange={handleTabChange}
          className="mb-6 w-full"
        >
          <TabsList className="grid w-full grid-cols-4 bg-gray-200 h-11">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="shipped">Shipped</TabsTrigger>
            <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-6">
            <OrdersTable
              orders={paginatedOrders}
              onShipOrder={handleShipOrder}
            />
            <TablePagination
              currentPage={currentPage}
              totalPages={totalPages}
              totalItems={filteredOrders.length}
              itemsPerPage={itemsPerPage}
              onPageChange={setCurrentPage}
            />
          </TabsContent>

          <TabsContent value="pending" className="mt-6">
            <OrdersTable
              orders={paginatedOrders}
              onShipOrder={handleShipOrder}
            />
            <TablePagination
              currentPage={currentPage}
              totalPages={totalPages}
              totalItems={filteredOrders.length}
              itemsPerPage={itemsPerPage}
              onPageChange={setCurrentPage}
            />
          </TabsContent>

          <TabsContent value="shipped" className="mt-6">
            <OrdersTable
              orders={paginatedOrders}
              onShipOrder={handleShipOrder}
            />
            <TablePagination
              currentPage={currentPage}
              totalPages={totalPages}
              totalItems={filteredOrders.length}
              itemsPerPage={itemsPerPage}
              onPageChange={setCurrentPage}
            />
          </TabsContent>

          <TabsContent value="cancelled" className="mt-6">
            <OrdersTable
              orders={paginatedOrders}
              onShipOrder={handleShipOrder}
            />
            <TablePagination
              currentPage={currentPage}
              totalPages={totalPages}
              totalItems={filteredOrders.length}
              itemsPerPage={itemsPerPage}
              onPageChange={setCurrentPage}
            />
          </TabsContent>
        </Tabs>
      </div>

      {/* Order Dialog */}
      <OrderDialog
        order={selectedOrder}
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
      />
    </div>
  );
};

export default OrdersDashboard;
