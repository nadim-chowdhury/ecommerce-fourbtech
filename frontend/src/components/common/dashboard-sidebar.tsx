"use client";

import {
  Package,
  ShoppingCart,
  CreditCard,
  Settings,
  Home,
  Truck,
  User,
  CircleHelp,
  Heart,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
// import { Button } from "../ui/button";

export default function DashboardSidebar() {
  const [userRole] = useState<any>("SELLER");

  const pathname = usePathname();

  const sellerSidebarItems = [
    {
      id: 1,
      icon: Home,
      label: "Overview",
      badge: null,
      link: "/seller/overview",
    },
    {
      id: 2,
      icon: Package,
      label: "Products",
      badge: "12",
      link: "/seller/products",
    },
    {
      id: 3,
      icon: ShoppingCart,
      label: "Orders",
      badge: "3",
      link: "/seller/orders",
    },
    {
      id: 4,
      icon: CreditCard,
      label: "Payments",
      badge: null,
      link: "/seller/payments",
    },
    {
      id: 5,
      icon: Settings,
      label: "Settings",
      badge: null,
      link: "/seller/settings",
    },
  ];

  const customerSidebarItems = [
    {
      id: 1,
      icon: Home,
      label: "Overview",
      badge: null,
      link: "/customer/overview",
    },
    {
      id: 2,
      icon: Truck,
      label: "My Orders",
      badge: "12",
      link: "/customer/my-orders",
    },
    {
      id: 3,
      icon: Heart,
      label: "Wishlist",
      badge: "3",
      link: "/customer/wishlist",
    },
    {
      id: 4,
      icon: User,
      label: "Profile",
      badge: null,
      link: "/customer/profile",
    },
    {
      id: 5,
      icon: CircleHelp,
      label: "Support",
      badge: null,
      link: "/customer/support",
    },
    {
      id: 6,
      icon: Settings,
      label: "Settings",
      badge: null,
      link: "/customer/settings",
    },
  ];

  const SidebarItem = ({ item, isActive }: any) => {
    const IconComponent = item.icon;
    return (
      <Link href={item.link} className="w-full">
        <button
          className={`w-[92%] flex items-center gap-3 px-4 py-3 text-left transition-all duration-200 rounded-lg mx-2 cursor-pointer ${
            isActive
              ? "bg-red-50 text-red-600"
              : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
          }`}
          title={item.label}
        >
          <IconComponent className="w-5 h-5 flex-shrink-0" />
          {
            <>
              <span className="font-medium flex-1">{item.label}</span>
              {item.badge && (
                <span
                  className={`px-2 py-1 text-xs rounded-full font-medium ${
                    isActive
                      ? "bg-red-100 text-red-600"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </>
          }
        </button>
      </Link>
    );
  };

  return (
    <div className="bg-white border-r transition-all duration-300 flex flex-col pl-14 w-[360px] h-full sticky top-0">
      {/* Main Navigation */}
      <nav className="flex-1 py-4 space-y-1">
        {(userRole === "SELLER" || userRole) &&
          sellerSidebarItems.map((item) => (
            <SidebarItem
              key={item.id}
              item={item}
              isActive={pathname === item.link}
            />
          ))}

        {(userRole === "CUSTOMER" || !userRole) &&
          customerSidebarItems.map((item) => (
            <SidebarItem
              key={item.id}
              item={item}
              isActive={pathname === item.link}
            />
          ))}
      </nav>

      {/* <div>
        <Button onClick={() => setUserRole(!userRole)}>Change Role</Button>
      </div> */}
    </div>
  );
}
