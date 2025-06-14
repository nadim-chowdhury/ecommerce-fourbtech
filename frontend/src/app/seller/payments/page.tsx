"use client";

import React, { useState } from "react";
import {
  Search,
  Filter,
  Download,
  Eye,
  MoreHorizontal,
  TrendingUp,
  TrendingDown,
  DollarSign,
  CheckCircle,
  Clock,
  XCircle,
  RefreshCw,
  ChevronDown,
} from "lucide-react";
import { TablePagination } from "@/components/common/table-pagination";
import {
  Table,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

const PaymentsPage = () => {
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [dateRange, setDateRange] = useState("this-month");

  const options = [
    { label: "Today", value: "today" },
    { label: "This Week", value: "this-week" },
    { label: "This Month", value: "this-month" },
    { label: "Last Month", value: "last-month" },
  ];

  const paymentStats = [
    {
      label: "Total Revenue",
      value: "$12,845.50",
      change: "+12.5%",
      isIncrease: true,
    },
    {
      label: "Pending Payments",
      value: "$2,340.00",
      change: "+5.2%",
      isIncrease: true,
    },
    {
      label: "Completed Today",
      value: "$1,890.25",
      change: "-2.1%",
      isIncrease: false,
    },
    {
      label: "Failed Payments",
      value: "$145.00",
      change: "-8.3%",
      isIncrease: false,
    },
  ];

  const payments = [
    {
      id: "PAY-001",
      orderId: "ORD-2024-001",
      customer: "John Smith",
      email: "john@example.com",
      amount: "$299.99",
      method: "Credit Card",
      status: "completed",
      date: "2025-06-14",
      time: "10:30 AM",
    },
    {
      id: "PAY-002",
      orderId: "ORD-2024-002",
      customer: "Sarah Johnson",
      email: "sarah@example.com",
      amount: "$149.50",
      method: "PayPal",
      status: "pending",
      date: "2025-06-14",
      time: "09:15 AM",
    },
    {
      id: "PAY-003",
      orderId: "ORD-2024-003",
      customer: "Mike Wilson",
      email: "mike@example.com",
      amount: "$89.99",
      method: "Debit Card",
      status: "failed",
      date: "2025-06-13",
      time: "04:22 PM",
    },
    {
      id: "PAY-004",
      orderId: "ORD-2024-004",
      customer: "Emily Davis",
      email: "emily@example.com",
      amount: "$199.00",
      method: "Credit Card",
      status: "completed",
      date: "2025-06-13",
      time: "02:45 PM",
    },
    {
      id: "PAY-005",
      orderId: "ORD-2024-005",
      customer: "David Brown",
      email: "david@example.com",
      amount: "$75.25",
      method: "Apple Pay",
      status: "processing",
      date: "2025-06-13",
      time: "11:30 AM",
    },
  ];

  const getStatusIcon = (status: any) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case "pending":
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case "failed":
        return <XCircle className="w-4 h-4 text-red-500" />;
      case "processing":
        return <RefreshCw className="w-4 h-4 text-blue-500" />;
      default:
        return null;
    }
  };

  const getStatusBadge = (status: any) => {
    const baseClasses = "px-2 py-1 rounded-full text-xs font-medium";
    switch (status) {
      case "completed":
        return `${baseClasses} bg-green-100 text-green-700`;
      case "pending":
        return `${baseClasses} bg-yellow-100 text-yellow-700`;
      case "failed":
        return `${baseClasses} bg-red-100 text-red-700`;
      case "processing":
        return `${baseClasses} bg-blue-100 text-blue-700`;
      default:
        return baseClasses;
    }
  };

  const handlePageChange = (page: number) => {
    console.log("Current Page:", page);
  };

  const selectedLabel =
    options.find((option) => option.value === dateRange)?.label || "Select";

  return (
    <div className="min-h-screen p-6 pr-16">
      {/* Page Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Payments</h1>
          <p className="text-gray-600 mt-1">
            Manage and track all payment transactions
          </p>
        </div>
        <div className="flex gap-3">
          <Button className="bg-white text-black border border-gray-300 hover:bg-gray-50">
            <Download className="w-4 h-4" />
            Export
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="px-4 py-2 border border-gray-300"
              >
                {selectedLabel} <ChevronDown className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-48">
              {options.map((option) => (
                <DropdownMenuItem
                  key={option.value}
                  onSelect={() => setDateRange(option.value)}
                >
                  {option.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {paymentStats.map((stat, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-lg border border-gray-200"
          >
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-600">{stat.label}</p>
              <DollarSign className="w-5 h-5 text-gray-400" />
            </div>
            <p className="text-2xl font-bold text-gray-900 mb-1">
              {stat.value}
            </p>
            <div className="flex items-center gap-1">
              {stat.isIncrease ? (
                <TrendingUp className="w-4 h-4 text-green-500" />
              ) : (
                <TrendingDown className="w-4 h-4 text-red-500" />
              )}
              <span
                className={`text-sm ${
                  stat.isIncrease ? "text-green-600" : "text-red-600"
                }`}
              >
                {stat.change}
              </span>
              <span className="text-sm text-gray-500">vs last month</span>
            </div>
          </div>
        ))}
      </div>

      {/* Filters and Search */}
      <div className="bg-white p-4 rounded-lg border border-gray-200 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search payments..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>
            <div className="flex gap-2">
              {["all", "completed", "pending", "failed", "processing"].map(
                (status) => (
                  <button
                    key={status}
                    onClick={() => setSelectedFilter(status)}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                      selectedFilter === status
                        ? "bg-red-100 text-red-700"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </button>
                )
              )}
            </div>
          </div>
          <button className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <Filter className="w-4 h-4" />
            Filter
          </button>
        </div>
      </div>

      {/* Payments Table */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="overflow-x-auto">
          <Table className="w-full">
            <TableHeader>
              <TableRow className="border-b border-gray-200">
                <TableHead className="text-left px-6 py-4 font-medium text-gray-600">
                  Payment ID
                </TableHead>
                <TableHead className="text-left font-medium text-gray-600">
                  Customer
                </TableHead>
                <TableHead className="text-left font-medium text-gray-600">
                  Order ID
                </TableHead>
                <TableHead className="text-left font-medium text-gray-600">
                  Amount
                </TableHead>
                <TableHead className="text-left font-medium text-gray-600">
                  Method
                </TableHead>
                <TableHead className="text-left font-medium text-gray-600">
                  Status
                </TableHead>
                <TableHead className="text-left font-medium text-gray-600">
                  Date
                </TableHead>
                <TableHead className="text-left font-medium text-gray-600">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <tbody>
              {payments.map((payment) => (
                <TableRow
                  key={payment.id}
                  className="border-b border-gray-100 hover:bg-gray-50"
                >
                  <TableCell className="px-6">
                    <span className="font-medium text-gray-900">
                      {payment.id}
                    </span>
                  </TableCell>
                  <TableCell className="">
                    <div>
                      <p className="font-medium text-gray-900">
                        {payment.customer}
                      </p>
                      <p className="text-sm text-gray-500">{payment.email}</p>
                    </div>
                  </TableCell>
                  <TableCell className="">
                    <span className="text-blue-600 hover:text-blue-800 cursor-pointer">
                      {payment.orderId}
                    </span>
                  </TableCell>
                  <TableCell className="">
                    <span className="font-semibold text-gray-900">
                      {payment.amount}
                    </span>
                  </TableCell>
                  <TableCell className="">
                    <span className="text-gray-700">{payment.method}</span>
                  </TableCell>
                  <TableCell className="">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(payment.status)}
                      <span className={getStatusBadge(payment.status)}>
                        {payment.status.charAt(0).toUpperCase() +
                          payment.status.slice(1)}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="">
                    <div>
                      <p className="text-gray-900">{payment.date}</p>
                      <p className="text-sm text-gray-500">{payment.time}</p>
                    </div>
                  </TableCell>
                  <TableCell className="">
                    <div className="flex items-center gap-2">
                      <button className="p-1 hover:bg-gray-100 rounded">
                        <Eye className="w-4 h-4 text-gray-600" />
                      </button>
                      <button className="p-1 hover:bg-gray-100 rounded">
                        <MoreHorizontal className="w-4 h-4 text-gray-600" />
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </tbody>
          </Table>
        </div>
      </div>

      {/* Pagination */}
      <TablePagination
        currentPage={1}
        totalPages={5}
        totalItems={18}
        itemsPerPage={10}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default PaymentsPage;
