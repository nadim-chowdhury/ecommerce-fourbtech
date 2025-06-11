import DashboardHeader from "@/components/common/dashboard-header";
import DashboardNavbar from "@/components/common/dashboard-navbar";
import DashboardSidebar from "@/components/common/dashboard-sidebar";

export default function SellerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <DashboardHeader />
      <DashboardNavbar />

      <div className="flex">
        <DashboardSidebar />
        <div className="bg-neutral-100">{children}</div>
      </div>
    </div>
  );
}
