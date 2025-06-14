import { Eye, Ship } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { StatusBadge } from "./order-status-badge";
import Link from "next/link";

export const OrdersTable = ({ orders, onShipOrder }: any) => {
  return (
    <div className="bg-white rounded-lg border overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="px-6 py-4 text-gray-600">Order ID</TableHead>
            <TableHead className="px-6 py-4 text-gray-600">Date</TableHead>
            <TableHead className="px-6 py-4 text-gray-600">Buyer</TableHead>
            <TableHead className="px-6 py-4 text-gray-600">Amount</TableHead>
            <TableHead className="px-6 py-4 text-gray-600">Status</TableHead>
            <TableHead className="px-6 py-4 text-gray-600">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order: any) => (
            <TableRow key={order.id}>
              <TableCell className="font-medium px-6">{order.id}</TableCell>
              <TableCell className="px-6">{order.date}</TableCell>
              <TableCell className="px-6">{order.buyer}</TableCell>
              <TableCell className="px-6">${order.amount}</TableCell>
              <TableCell className="px-6">
                <StatusBadge status={order.status} />
              </TableCell>
              <TableCell className="px-6">
                <div className="flex gap-2">
                  <Link href={`/seller/orders/${order.id.toLowerCase()}`}>
                    <Button
                      variant="outline"
                      size="sm"
                      // onClick={() => onViewOrder(order)}
                      className="flex items-center gap-1"
                    >
                      <Eye size={16} />
                      View
                    </Button>
                  </Link>
                  {order.status === "Pending" && (
                    <Button
                      size="sm"
                      onClick={() => onShipOrder(order)}
                      className="bg-red-500 hover:bg-red-600 flex items-center gap-1"
                    >
                      <Ship size={16} />
                      Ship
                    </Button>
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
