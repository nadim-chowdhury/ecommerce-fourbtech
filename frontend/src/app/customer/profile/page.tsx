"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { X, MapPin, Plus, Edit, Trash2, Download, Check } from "lucide-react";

export default function CustomerProfilePage() {
  const [formData, setFormData] = useState({
    firstName: "Alex",
    lastName: "Johnson",
    email: "alex.johnson@email.com",
    phone: "+1 (555) 123-4567",
    bio: "",
  });

  const [notifications, setNotifications] = useState({
    orderUpdates: true,
    promotions: true,
    newsletter: false,
    wishlist: true,
  });

  const [addresses] = useState([
    {
      id: 1,
      type: "Home",
      address: "12 Rosewood Lane, Flat 3A",
      city: "Manchester, M14 5TP, United Kingdom",
      isDefault: true,
    },
    {
      id: 2,
      type: "Work",
      address: "Unit 7, Orion Business Park, Buckingham",
      city: "Avenue, Slough, SL1 4QT, United Kingdom",
      isDefault: false,
    },
  ]);

  const [transactions] = useState([
    {
      id: 1,
      product: "Wireless Noise-Cancelling Headphones",
      transactionId: "TXN-4533219",
      amount: 249.99,
      date: "May 26, 2025",
      status: "Paid",
    },
    {
      id: 2,
      product: "Wireless Noise-Cancelling Headphones",
      transactionId: "TXN-4533219",
      amount: 249.99,
      date: "May 26, 2025",
      status: "Pending",
    },
    {
      id: 3,
      product: "Wireless Noise-Cancelling Headphones",
      transactionId: "TXN-4533219",
      amount: 249.99,
      date: "May 26, 2025",
      status: "Failed",
    },
  ]);

  const handleInputChange = (field: any, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleNotificationChange = (field: any, value: any) => {
    setNotifications((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="p-6 pr-16 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Profile</h1>
        <p className="text-gray-600">
          Manage your account settings and preferences.
        </p>
      </div>

      {/* Tabs Container */}
      <Tabs defaultValue="personal" className="space-y-8">
        <TabsList className="grid w-full grid-cols-3 bg-gray-200 h-10">
          <TabsTrigger
            value="personal"
            className="data-[state=active]:bg-white data-[state=active]:shadow-sm"
          >
            Personal
          </TabsTrigger>
          <TabsTrigger
            value="address"
            className="data-[state=active]:bg-white data-[state=active]:shadow-sm"
          >
            Address
          </TabsTrigger>
          <TabsTrigger
            value="transactions"
            className="data-[state=active]:bg-white data-[state=active]:shadow-sm"
          >
            Transactions
          </TabsTrigger>
        </TabsList>

        {/* Personal Tab Content */}
        <TabsContent value="personal" className="space-y-8">
          {/* Personal Information Card */}
          <Card className="bg-white py-0">
            <CardContent className="p-6">
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  Personal Information
                </h2>
                <p className="text-gray-600">Update your personal details.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {/* First Name */}
                <div className="space-y-2">
                  <Label
                    htmlFor="firstName"
                    className="text-sm font-medium text-gray-700"
                  >
                    First name
                  </Label>
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) =>
                      handleInputChange("firstName", e.target.value)
                    }
                    className="w-full"
                  />
                </div>

                {/* Last Name */}
                <div className="space-y-2">
                  <Label
                    htmlFor="lastName"
                    className="text-sm font-medium text-gray-700"
                  >
                    Last name
                  </Label>
                  <Input
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) =>
                      handleInputChange("lastName", e.target.value)
                    }
                    className="w-full"
                  />
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label
                    htmlFor="email"
                    className="text-sm font-medium text-gray-700"
                  >
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className="w-full"
                  />
                </div>

                {/* Phone */}
                <div className="space-y-2">
                  <Label
                    htmlFor="phone"
                    className="text-sm font-medium text-gray-700"
                  >
                    Phone
                  </Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    className="w-full"
                  />
                </div>
              </div>

              {/* Bio */}
              <div className="space-y-2 mb-6">
                <Label
                  htmlFor="bio"
                  className="text-sm font-medium text-gray-700"
                >
                  Bio
                </Label>
                <Textarea
                  id="bio"
                  placeholder="Tell us about yourself"
                  value={formData.bio}
                  onChange={(e) => handleInputChange("bio", e.target.value)}
                  className="w-full min-h-[120px] resize-none"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex justify-between items-center">
                <Button variant="outline" className="flex items-center gap-2">
                  <X size={16} />
                  Cancel
                </Button>
                <Button className="bg-red-600 hover:bg-red-700 text-white">
                  Save Changes
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Notification Preferences Card */}
          <Card className="bg-white py-0">
            <CardContent className="p-6">
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  Notification Preferences
                </h2>
                <p className="text-gray-600">
                  Manage how you receive notifications.
                </p>
              </div>

              <div className="space-y-6 mb-6">
                {/* Order Updates */}
                <div className="flex items-center justify-between py-2">
                  <div>
                    <Label className="text-sm font-medium text-gray-900">
                      Order Updates
                    </Label>
                  </div>
                  <Switch
                    checked={notifications.orderUpdates}
                    onCheckedChange={(checked) =>
                      handleNotificationChange("orderUpdates", checked)
                    }
                  />
                </div>

                {/* Promotions and deals */}
                <div className="flex items-center justify-between py-2 border-t border-gray-100">
                  <div>
                    <Label className="text-sm font-medium text-gray-900">
                      Promotions and deals
                    </Label>
                  </div>
                  <Switch
                    checked={notifications.promotions}
                    onCheckedChange={(checked) =>
                      handleNotificationChange("promotions", checked)
                    }
                  />
                </div>

                {/* Newsletter */}
                <div className="flex items-center justify-between py-2 border-t border-gray-100">
                  <div>
                    <Label className="text-sm font-medium text-gray-900">
                      Newsletter
                    </Label>
                  </div>
                  <Switch
                    checked={notifications.newsletter}
                    onCheckedChange={(checked) =>
                      handleNotificationChange("newsletter", checked)
                    }
                  />
                </div>

                {/* Wishlist updates */}
                <div className="flex items-center justify-between py-2 border-t border-gray-100">
                  <div>
                    <Label className="text-sm font-medium text-gray-900">
                      Wishlist updates
                    </Label>
                  </div>
                  <Switch
                    checked={notifications.wishlist}
                    onCheckedChange={(checked) =>
                      handleNotificationChange("wishlist", checked)
                    }
                  />
                </div>
              </div>

              {/* Save Preferences Button */}
              <div className="flex justify-end">
                <Button className="bg-red-600 hover:bg-red-700 text-white">
                  Save Preferences
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Address Tab Content */}
        <TabsContent value="address" className="space-y-8">
          <Card className="bg-white py-0">
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">
                    Addresses
                  </h2>
                  <p className="text-gray-600">
                    Manage your shipping and billing addresses.
                  </p>
                </div>
                <Button className="bg-red-600 hover:bg-red-700 text-white flex items-center gap-2">
                  <Plus size={16} />
                  Add Address
                </Button>
              </div>

              <div className="space-y-4">
                {addresses.map((address) => (
                  <div
                    key={address.id}
                    className="border border-gray-200 rounded-lg p-6"
                  >
                    <div className="flex items-start gap-3 mb-4">
                      <MapPin size={20} className="text-gray-500 mt-1" />
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-2">
                          {address.type}
                        </h3>
                        <p className="text-gray-600 mb-1">{address.address}</p>
                        <p className="text-gray-600">{address.city}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex items-center gap-2"
                      >
                        <Edit size={14} />
                        Edit
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex items-center gap-2 text-red-600 hover:text-red-700"
                      >
                        <Trash2 size={14} />
                        Delete
                      </Button>
                      {address.isDefault ? (
                        <div className="flex items-center gap-2 text-green-600">
                          <Check size={14} />
                          <span className="text-sm">Default</span>
                        </div>
                      ) : (
                        <Button variant="outline" size="sm">
                          Set as Default
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Transactions Tab Content */}
        <TabsContent value="transactions" className="space-y-8">
          <Card className="bg-white py-0">
            <CardContent className="p-6">
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  Payment Transactions
                </h2>
                <p className="text-gray-600">
                  Track your payments and download receipts. All transactions
                  are securely processed via XYZ gateway.
                </p>
              </div>

              <div className="space-y-4">
                {transactions.map((transaction) => (
                  <div
                    key={transaction.id}
                    className="border border-gray-200 rounded-lg p-6"
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-semibold text-gray-900">
                            {transaction.product}
                          </h3>
                          <Badge
                            variant={
                              transaction.status === "Paid"
                                ? "default"
                                : transaction.status === "Pending"
                                ? "secondary"
                                : "destructive"
                            }
                            className={
                              transaction.status === "Paid"
                                ? "bg-green-100 text-green-800 hover:bg-green-100"
                                : transaction.status === "Pending"
                                ? "bg-orange-100 text-orange-800 hover:bg-orange-100"
                                : "bg-red-100 text-red-800 hover:bg-red-100"
                            }
                          >
                            {transaction.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-500 mb-2">
                          Transaction ID: {transaction.transactionId}
                        </p>
                        <div className="flex items-center gap-4">
                          <span className="font-semibold text-lg">
                            ${transaction.amount}
                          </span>
                          <span className="text-sm text-gray-500">
                            {transaction.date}
                          </span>
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex items-center gap-2"
                        disabled={transaction.status !== "Paid"}
                      >
                        <Download size={14} />
                        Download Receipt
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
