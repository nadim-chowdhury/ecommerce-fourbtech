"use client";

import { useState } from "react";
import {
  ArrowLeft,
  Printer,
  Phone,
  Check,
  Truck,
  MapPin,
  CreditCard,
  X,
  AlertTriangle,
  Mail,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Image from "next/image";
import Link from "next/link";

const OrderDetailsPage = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [cancelReason, setCancelReason] = useState("");

  const handleCancelOrder = () => {
    setIsDialogOpen(true);
  };

  const handleConfirmCancel = () => {
    // Handle the actual cancellation logic here
    console.log("Order cancelled with reason:", cancelReason);
    setIsDialogOpen(false);
    setCancelReason("");
  };

  const handleKeepOrder = () => {
    setIsDialogOpen(false);
    setCancelReason("");
  };

  return (
    <div className="min-h-screen">
      {/* Main Content */}
      <div className="p-6 pr-16">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Link href={`/seller/orders`}>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors border border-transparent hover:border hover-border-gray-300">
                <ArrowLeft className="w-5 h-5" />
              </button>
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">Order Details</h1>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <Printer className="w-4 h-4" />
              Print Invoice
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
              <Phone className="w-4 h-4" />
              Contact Buyer
            </button>
          </div>
        </div>

        <div className="p-4 rounded-lg bg-white border">
          {/* Product Card */}
          <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
            <div className="flex items-start gap-4">
              <div className="w-24 h-24 p-2 bg-gray-200 rounded-lg flex-shrink-0">
                <Image
                  src="https://pngimg.com/uploads/box/box_PNG41.png"
                  alt="Demo Image"
                  width={360}
                  height={360}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">
                    Over The Head Wireless Headphone
                  </h2>
                  <span className="px-3 py-1 bg-orange-100 text-orange-600 rounded-full text-sm font-medium">
                    Pending
                  </span>
                </div>
                <div className="grid grid-cols-4 gap-8">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Order ID</p>
                    <p className="font-semibold">Ord-001</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Date</p>
                    <p className="font-semibold">May 15, 2025</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Quantity</p>
                    <p className="font-semibold">1</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Condition</p>
                    <p className="font-semibold">New</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 items-start gap-6">
            {/* Timeline */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">
                Timeline
              </h3>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-6 h-6 border-3 border-blue-600 text-blue-600 rounded-full flex items-center justify-center flex-shrink-0 relative">
                    <Check className="w-4 h-4" />

                    <div className="absolute -bottom-12 left-[45%] h-12 w-[2px] bg-gray-400"></div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      Order Placed
                    </h4>
                    <p className="text-sm text-gray-500">May 15, 2025</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-6 h-6 border-3 border-blue-600 text-blue-600 rounded-full flex items-center justify-center flex-shrink-0 relative">
                    <Check className="w-4 h-4" />

                    <div className="absolute -bottom-12 left-[45%] h-12 w-[2px] bg-gray-400"></div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      Payment Confirmed
                    </h4>
                    <p className="text-sm text-gray-500">May 15, 2025</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-6 h-6 border-3 border-gray-400 text-gray-400 rounded-full flex items-center justify-center flex-shrink-0 relative">
                    <Check className="w-4 h-4" />

                    <div className="absolute -bottom-12 left-[45%] h-12 w-[2px] bg-gray-400"></div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Processed</h4>
                    <p className="text-sm text-gray-500">
                      Waiting for processing
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-6 h-6 border-3 border-gray-400 text-gray-400 rounded-full flex items-center justify-center flex-shrink-0 relative">
                    <Check className="w-4 h-4" />

                    <div className="absolute -bottom-12 left-[45%] h-12 w-[2px] bg-gray-400"></div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Shipped</h4>
                    <p className="text-sm text-gray-500">Not shipped yet</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-6 h-6 border-3 border-gray-400 text-gray-400 rounded-full flex items-center justify-center flex-shrink-0 relative">
                    <Check className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Delivered</h4>
                    <p className="text-sm text-gray-500">
                      Waiting for delivery
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Buyer Information */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">
                Buyer Information
              </h3>

              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-500 mb-2">
                  Buyer
                </h4>
                <p className="font-semibold text-gray-900 mb-1">Mike Turner</p>
                <div className="flex items-start gap-2">
                  <Mail className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-gray-500">example@email.com</p>
                </div>
              </div>

              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-500 mb-2">
                  Shipping Address
                </h4>
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-gray-700">
                    62 Elm Tree Ave, Coventry,
                    <br />
                    West Midlands, UK
                  </p>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-2">
                  Payment Method
                </h4>
                <div className="flex items-center gap-2 mb-2">
                  <CreditCard className="w-4 h-4 text-gray-400" />
                  <span className="font-semibold text-gray-900">
                    Credit Card
                  </span>
                </div>
                <p className="text-sm text-gray-500 mb-2">
                  **** **** **** 4242
                </p>
                <span className="inline-block px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-medium">
                  Paid
                </span>
              </div>
            </div>

            {/* Payment Info */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">
                Payment Info
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-semibold">$99.99</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-semibold">$00.00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span className="font-semibold">$00.00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Discount</span>
                  <span className="font-semibold">$00.00</span>
                </div>
                <hr className="my-3" />
                <div className="flex justify-between text-lg">
                  <span className="font-semibold">Total</span>
                  <span className="font-bold">$99.99</span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 mt-6">
            <button
              onClick={handleCancelOrder}
              className="flex items-center gap-2 px-6 py-2 text-red-600 border border-red-300 rounded-lg hover:bg-red-50 transition-colors"
            >
              <X className="w-4 h-4" />
              Cancel Order
            </button>
            <button className="flex items-center gap-2 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
              <Truck className="w-4 h-4" />
              Ship Order
            </button>
          </div>
        </div>

        {/* Cancel Order Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="sm:max-w-sm">
            <DialogHeader className="text-center">
              <div className="mx-auto w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
                <AlertTriangle className="w-6 h-6 text-red-500" />
              </div>
              <DialogTitle className="text-xl text-center font-semibold text-gray-900">
                Cancel Order?
              </DialogTitle>
              <DialogDescription className="text-gray-600 mt-2 text-center">
                Are you sure you want to cancel this order? The customer will be
                notified and the order will be marked as cancelled.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Reason for cancellation{" "}
                  <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={cancelReason}
                  onChange={(e) => setCancelReason(e.target.value)}
                  placeholder="Enter reason for cancellation"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
                  rows={3}
                />
              </div>

              <div className="bg-gray-50 p-4 rounded-lg border">
                <h4 className="font-medium text-gray-900 mb-3">
                  Order Summary
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Order ID:</span>
                    <span className="font-medium">#123456</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Product:</span>
                    <span className="font-medium">Wireless Earbuds X200</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Customer:</span>
                    <span className="font-medium">Jane Doe</span>
                  </div>
                </div>
              </div>
            </div>

            <DialogFooter className="flex gap-3">
              <button
                onClick={handleKeepOrder}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Keep Order
              </button>
              <button
                onClick={handleConfirmCancel}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Cancel Order
              </button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default OrderDetailsPage;
