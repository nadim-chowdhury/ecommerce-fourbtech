"use client";

import React, { useState } from "react";
import {
  Search,
  MoreHorizontal,
  RotateCcw,
  MapPin,
  X,
  RefreshCw,
} from "lucide-react";

// shadcn/ui imports
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { TablePagination } from "@/components/common/table-pagination";

export default function MyOrders() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const orders = [
    {
      id: "#ORD-12345",
      date: "May 20, 2023",
      status: "Delivered",
      total: "$249.99",
      statusVariant: "default",
    },
    {
      id: "#ORD-12346",
      date: "May 15, 2023",
      status: "Shipped",
      total: "$399.99",
      statusVariant: "secondary",
    },
    {
      id: "#ORD-12347",
      date: "May 10, 2023",
      status: "Processing",
      total: "$159.98",
      statusVariant: "outline",
    },
    {
      id: "#ORD-12348",
      date: "May 5, 2023",
      status: "Delivered",
      total: "$79.99",
      statusVariant: "default",
    },
    {
      id: "#ORD-12349",
      date: "April 30, 2023",
      status: "Cancelled",
      total: "$129.99",
      statusVariant: "destructive",
    },
  ];

  const getActionButton = (status: any, orderId: any) => {
    console.log(" getActionButton ~ orderId:", orderId);
    switch (status) {
      case "Delivered":
        return (
          <Button variant="outline" size="sm" className="gap-2">
            <RotateCcw className="h-4 w-4" />
            Buy Again
          </Button>
        );
      case "Shipped":
        return (
          <Button variant="outline" size="sm" className="gap-2">
            <MapPin className="h-4 w-4" />
            Track
          </Button>
        );
      case "Processing":
        return (
          <Button
            variant="outline"
            size="sm"
            className="gap-2 text-red-600 border-red-200 hover:bg-red-50"
          >
            <X className="h-4 w-4" />
            Cancel
          </Button>
        );
      case "Cancelled":
        return (
          <Button variant="outline" size="sm" className="gap-2">
            <RefreshCw className="h-4 w-4" />
            Reorder
          </Button>
        );
      default:
        return null;
    }
  };

  const getStatusBadgeStyles = (status: any) => {
    switch (status) {
      case "Delivered":
        return "bg-green-100 text-green-800 hover:bg-green-100/80";
      case "Shipped":
        return "bg-blue-100 text-blue-800 hover:bg-blue-100/80";
      case "Processing":
        return "bg-orange-100 text-orange-800 hover:bg-orange-100/80";
      case "Cancelled":
        return "bg-red-100 text-red-800 hover:bg-red-100/80";
      default:
        return "";
    }
  };

  const filteredOrders = orders.filter((order) => {
    const matchesSearch = order.id
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "all" ||
      order.status.toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen p-6 pr-16 space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">My Orders</h1>
        <p className="text-muted-foreground">
          View and manage your order history.
        </p>
      </div>

      {/* Search and Filter Controls */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search by order id"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-white"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="sm:w-[180px] bg-white">
            <SelectValue placeholder="Order Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Orders</SelectItem>
            <SelectItem value="delivered">Delivered</SelectItem>
            <SelectItem value="shipped">Shipped</SelectItem>
            <SelectItem value="processing">Processing</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Orders Table */}
      <div className="rounded-md border bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="px-6 py-4">Order ID</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredOrders.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center">
                  <div className="flex flex-col items-center justify-center space-y-2">
                    <Search className="h-8 w-8 text-muted-foreground" />
                    <div className="text-sm text-muted-foreground">
                      No orders found matching your criteria.
                    </div>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              filteredOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium px-6">{order.id}</TableCell>
                  <TableCell className="text-muted-foreground">
                    {order.date}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="secondary"
                      className={getStatusBadgeStyles(order.status)}
                    >
                      {order.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-medium">{order.total}</TableCell>
                  <TableCell className="w-36 pr-4">
                    <div className="flex items-center justify-between gap-2">
                      <div className="">
                        {getActionButton(order.status, order.id)}
                      </div>

                      <div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <span className="sr-only">Open menu</span>
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>View Details</DropdownMenuItem>
                            <DropdownMenuItem>
                              Download Invoice
                            </DropdownMenuItem>
                            <DropdownMenuItem>Contact Support</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <TablePagination
        currentPage={1}
        totalPages={3}
        totalItems={12}
        itemsPerPage={8}
        onPageChange={() => {}}
      />
    </div>
  );
}
