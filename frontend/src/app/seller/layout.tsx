import DashboardHeader from "@/components/common/dashboard-header";
import DashboardNavbar from "@/components/common/dashboard-navbar";
import DashboardSidebar from "@/components/common/dashboard-sidebar";
import { ProtectedRoute } from "@/components/providers/auth-provider";

export default function SellerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute allowedRoles={["SELLER"]}>
      <DashboardHeader />
      <DashboardNavbar className="px-16" />

      <div className="flex">
        <DashboardSidebar />
        <div className="bg-neutral-100 w-full">{children}</div>
      </div>
    </ProtectedRoute>
  );
}
