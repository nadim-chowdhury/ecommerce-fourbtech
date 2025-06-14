"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  AlertTriangle,
  Package,
  Truck,
  CheckCircle,
  XCircle,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const SellerOverview = () => {
  // Demo data for the revenue chart (30 days)
  const revenueData = [
    { date: "May 14", revenue: 1200 },
    { date: "May 15", revenue: 1500 },
    { date: "May 16", revenue: 1800 },
    { date: "May 17", revenue: 1300 },
    { date: "May 18", revenue: 2100 },
    { date: "May 19", revenue: 1900 },
    { date: "May 20", revenue: 2400 },
    { date: "May 21", revenue: 2200 },
    { date: "May 22", revenue: 1700 },
    { date: "May 23", revenue: 2600 },
    { date: "May 24", revenue: 2800 },
    { date: "May 25", revenue: 2300 },
    { date: "May 26", revenue: 3100 },
    { date: "May 27", revenue: 2900 },
    { date: "May 28", revenue: 2500 },
    { date: "May 29", revenue: 3200 },
    { date: "May 30", revenue: 2700 },
    { date: "May 31", revenue: 3400 },
    { date: "Jun 1", revenue: 3100 },
    { date: "Jun 2", revenue: 2800 },
    { date: "Jun 3", revenue: 3600 },
    { date: "Jun 4", revenue: 3300 },
    { date: "Jun 5", revenue: 2900 },
    { date: "Jun 6", revenue: 3800 },
    { date: "Jun 7", revenue: 3500 },
    { date: "Jun 8", revenue: 3200 },
    { date: "Jun 9", revenue: 4100 },
    { date: "Jun 10", revenue: 3900 },
    { date: "Jun 11", revenue: 3400 },
    { date: "Jun 12", revenue: 2450 },
  ];

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="text-sm font-medium text-gray-600">{label}</p>
          <p className="text-lg font-bold text-blue-600">
            ${payload[0].value.toLocaleString()}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen w-full bg-gray-50 p-6 pr-16">
      <div className="space-y-8">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, Nadim Chowdhury!
          </h1>
          <p className="text-lg text-gray-600">
            You&apos;ve made{" "}
            <span className="font-semibold text-gray-900">$2,450</span> today.
          </p>
        </div>

        {/* Sales Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-white flex flex-col gap-2">
            <CardHeader className="">
              <CardTitle className="text-sm font-medium text-gray-500">
                Sales Today
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">$2,450</div>
              <div className="text-sm text-green-600 font-medium">
                +19% from last period
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white flex flex-col gap-2">
            <CardHeader className="">
              <CardTitle className="text-sm font-medium text-gray-500">
                Sales This Week
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">$10,230</div>
              <div className="text-sm text-green-600 font-medium">
                +8% from last period
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white flex flex-col gap-2">
            <CardHeader className="">
              <CardTitle className="text-sm font-medium text-gray-500">
                Sales This Month
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">$45,670</div>
              <div className="text-sm text-green-600 font-medium">
                +12% from last period
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Orders Status */}
        <Card className="bg-white">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900">
              Orders Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="flex items-center space-x-3 p-4 rounded-lg border border-gray-200">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-yellow-100">
                  <Package className="w-4 h-4 text-yellow-600" />
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-500">
                    Pending
                  </div>
                  <div className="text-xl font-bold text-gray-900">12</div>
                </div>
              </div>

              <div className="flex items-center space-x-3 p-4 rounded-lg border border-gray-200">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100">
                  <Truck className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-500">
                    Shipped
                  </div>
                  <div className="text-xl font-bold text-gray-900">24</div>
                </div>
              </div>

              <div className="flex items-center space-x-3 p-4 rounded-lg border border-gray-200">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-green-100">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-500">
                    Delivered
                  </div>
                  <div className="text-xl font-bold text-gray-900">156</div>
                </div>
              </div>

              <div className="flex items-center space-x-3 p-4 rounded-lg border border-gray-200">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-red-100">
                  <XCircle className="w-4 h-4 text-red-600" />
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-500">
                    Cancelled
                  </div>
                  <div className="text-xl font-bold text-gray-900">3</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Revenue Chart */}
        <Card className="bg-white">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900">
              Revenue Trend (30 days)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis
                    dataKey="date"
                    tick={{ fontSize: 12, fill: "#6b7280" }}
                    tickLine={{ stroke: "#e5e7eb" }}
                    axisLine={{ stroke: "#e5e7eb" }}
                    interval="preserveStartEnd"
                  />
                  <YAxis
                    tick={{ fontSize: 12, fill: "#6b7280" }}
                    tickLine={{ stroke: "#e5e7eb" }}
                    axisLine={{ stroke: "#e5e7eb" }}
                    tickFormatter={(value) => `${value}`}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Line
                    type="monotone"
                    dataKey="revenue"
                    stroke="#3b82f6"
                    strokeWidth={3}
                    dot={{ fill: "#3b82f6", strokeWidth: 2, r: 4 }}
                    activeDot={{
                      r: 6,
                      stroke: "#3b82f6",
                      strokeWidth: 2,
                      fill: "#ffffff",
                    }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Low Stock Alert */}
        <Alert className="border-orange-200 bg-orange-50 flex items-center">
          <AlertTriangle className="h-4 w-4 text-orange-600" />
          <AlertDescription className="text-orange-800 w-full">
            <div className="flex items-center justify-between w-full">
              <span>You have 2 products running low. Restock now.</span>
              <Button
                variant="outline"
                size="sm"
                className="ml-4 border-orange-300 text-orange-700 hover:bg-orange-100"
              >
                View Products
              </Button>
            </div>
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
};

export default SellerOverview;
