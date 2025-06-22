import DashboardHeader from "@/components/common/dashboard-header";
import DashboardNavbar from "@/components/common/dashboard-navbar";
import DashboardSidebar from "@/components/common/dashboard-sidebar";
import { ProtectedRoute } from "@/components/providers/auth-provider";
import { Button } from "@/components/ui/button";
import { Heart, ShoppingCart } from "lucide-react";
import Link from "next/link";

export default function SellerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute allowedRoles={["CUSTOMER"]}>
      <DashboardHeader />

      <div className="flex items-center gap-4">
        <DashboardNavbar className="pl-16 w-full" />
        <div className="flex items-center gap-4 pr-16">
          <Link
            href="/customer/wishlist"
            className="hover:text-red-500 transition-colors"
          >
            <Button variant="ghost" className="h-11">
              <Heart className="w-5 h-5" /> Wishlist
            </Button>
          </Link>
          <Link
            href="/customer/cart"
            className="hover:text-blue-500 transition-colors"
          >
            <Button variant="ghost" className="h-11">
              <ShoppingCart className="w-5 h-5" /> Cart
            </Button>
          </Link>
        </div>
      </div>

      <div className="flex">
        <DashboardSidebar />
        <div className="bg-neutral-100 w-full">{children}</div>
      </div>
    </ProtectedRoute>
  );
}
