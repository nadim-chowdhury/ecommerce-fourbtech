import { Edit, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {
  Table,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Button } from "../ui/button";

export default function ProductsTable({
  currentProducts,
  setProductToDelete,
  setDeleteDialogOpen,
}: any) {
  const handleDeleteClick = (product: any) => {
    setProductToDelete(product);
    setDeleteDialogOpen(true);
  };

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

  return (
    <div className="bg-white border rounded-lg overflow-hidden shadow-sm">
      <Table className="w-full">
        <TableHeader className="bg-gray-50 border-b">
          <TableRow>
            <TableHead className="text-gray-600 px-6 py-4 bg-white">
              Image
            </TableHead>
            <TableHead className="text-gray-600 px-6 py-4 bg-white">
              Name
            </TableHead>
            <TableHead className="text-gray-600 px-6 py-4 bg-white">
              SKU
            </TableHead>
            <TableHead className="text-gray-600 px-6 py-4 bg-white">
              Price
            </TableHead>
            <TableHead className="text-gray-600 px-6 py-4 bg-white">
              Stock
            </TableHead>
            <TableHead className="text-gray-600 px-6 py-4 bg-white">
              Status
            </TableHead>
            <TableHead className="text-gray-600 px-6 py-4 bg-white">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>
        <tbody className="bg-white divide-y divide-gray-200">
          {currentProducts.map((product: any) => (
            <TableRow
              key={product.id}
              className="hover:bg-gray-50 transition-colors"
            >
              <TableCell className="px-6 py-2 whitespace-nowrap">
                <div className="w-10 h-10 bg-gray-100 rounded-lg overflow-hidden p-1">
                  <Image
                    src="https://pngimg.com/uploads/box/box_PNG41.png"
                    alt="Demo Image"
                    width={360}
                    height={360}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
              </TableCell>
              <TableCell className="px-6 py-2 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">
                  {product.name}
                </div>
              </TableCell>
              <TableCell className="px-6 py-2 whitespace-nowrap">
                <div className="text-sm text-gray-500">{product.sku}</div>
              </TableCell>
              <TableCell className="px-6 py-2 whitespace-nowrap">
                <div className="text-sm text-gray-900">${product.price}</div>
              </TableCell>
              <TableCell className="px-6 py-2 whitespace-nowrap">
                <div className="text-sm text-gray-900">{product.stock}</div>
              </TableCell>
              <TableCell className="px-6 py-2 whitespace-nowrap">
                <span
                  className={`inline-flex px-2 py-1 text-xs font-medium rounded-md border ${getStatusColor(
                    product.status
                  )}`}
                >
                  {product.status}
                </span>
              </TableCell>
              <TableCell className="px-6 py-2 whitespace-nowrap text-sm font-medium">
                <div className="flex items-center gap-2">
                  <Link
                    href={`/seller/products/${product.id}/edit`}
                    className="no-underline"
                  >
                    <Button variant="ghost" className="border">
                      <Edit className="w-4 h-4" /> Edit
                    </Button>
                  </Link>
                  <Button
                    onClick={() => handleDeleteClick(product)}
                    variant="ghost"
                    className="text-red-600 border"
                  >
                    <Trash2 className="w-4 h-4" /> Delete
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
