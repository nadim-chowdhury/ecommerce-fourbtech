import { Ship, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "./order-status-badge";

export const OrderDialog = ({ order, isOpen, onClose }: any) => {
  const handleShipOrder = () => {
    console.log("Shipping order:", order?.id);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Order #{order?.id}</DialogTitle>
          <p className="text-sm text-gray-500">Placed on {order?.date}</p>
        </DialogHeader>

        {order && (
          <div className="space-y-4 py-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Status:</span>
              <StatusBadge status={order.status} />
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Product:</span>
              <span className="text-sm font-medium">{order.product}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Amount:</span>
              <span className="text-sm font-medium">${order.amount}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Customer:</span>
              <span className="text-sm font-medium">{order.buyer}</span>
            </div>
          </div>
        )}

        <DialogFooter className="flex gap-2">
          <Button
            variant="outline"
            onClick={onClose}
            className="flex items-center gap-2"
          >
            <X size={16} />
            Cancel
          </Button>
          <Button
            onClick={handleShipOrder}
            className="bg-red-600 hover:bg-red-700 flex items-center gap-2"
          >
            <Ship size={16} />
            Ship Order
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
