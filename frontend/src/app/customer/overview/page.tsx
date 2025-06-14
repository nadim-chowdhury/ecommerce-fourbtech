import { Card, CardContent } from "@/components/ui/card";
import { Package, Heart, Truck, Gift, Check, Star } from "lucide-react";

export default function CustomerOverview() {
  const stats = [
    {
      title: "Total Orders",
      value: "24",
      icon: Package,
      color: "text-blue-500",
      bgColor: "bg-blue-50",
    },
    {
      title: "Wishlist Items",
      value: "12",
      icon: Heart,
      color: "text-pink-500",
      bgColor: "bg-pink-50",
    },
    {
      title: "Pending Deliveries",
      value: "3",
      icon: Truck,
      color: "text-orange-500",
      bgColor: "bg-orange-50",
    },
    {
      title: "Active Coupons",
      value: "5",
      icon: Gift,
      color: "text-green-500",
      bgColor: "bg-green-50",
    },
  ];

  const activities = [
    {
      type: "delivered",
      title: "Order Delivered",
      description: "Your order #ORD-7895 has been delivered",
      time: "Today, 9:45 AM",
      icon: Check,
      iconColor: "text-green-500",
      iconBg: "bg-green-50",
    },
    {
      type: "wishlist",
      title: "Added to Wishlist",
      description: "You added 'Wireless Headphones' to your wishlist",
      time: "Yesterday, 4:30 PM",
      icon: Heart,
      iconColor: "text-pink-500",
      iconBg: "bg-pink-50",
    },
    {
      type: "shipped",
      title: "Order Shipped",
      description: "Your order #ORD-7891 has been shipped",
      time: "Yesterday, 11:20 AM",
      icon: Package,
      iconColor: "text-blue-500",
      iconBg: "bg-blue-50",
    },
    {
      type: "review",
      title: "Review Posted",
      description: "You posted a review for 'Smart Watch'",
      time: "May 20, 2023",
      icon: Star,
      iconColor: "text-yellow-500",
      iconBg: "bg-yellow-50",
    },
    {
      type: "coupon",
      title: "Coupon Applied",
      description: "You used coupon 'SUMMER20' on your purchase",
      time: "May 18, 2023",
      icon: Gift,
      iconColor: "text-purple-500",
      iconBg: "bg-purple-50",
    },
  ];

  return (
    <div className="min-h-screen p-6 pr-16">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-bold text-gray-900">Hi, Nadim</h1>
            <span className="text-3xl">👋</span>
          </div>
          <div className="text-sm text-gray-500">
            Last updated: Today, 10:30 AM
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600 mb-1">
                        {stat.title}
                      </p>
                      <p className="text-3xl font-bold text-gray-900">
                        {stat.value}
                      </p>
                    </div>
                    <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                      <IconComponent className={`w-6 h-6 ${stat.color}`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Recent Activity */}
        <Card>
          <CardContent className="p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              Recent Activity
            </h2>
            <div className="space-y-6">
              {activities.map((activity, index) => {
                const IconComponent = activity.icon;
                return (
                  <div key={index} className="flex items-start gap-4">
                    <div
                      className={`p-2 rounded-full ${activity.iconBg} flex-shrink-0`}
                    >
                      <IconComponent
                        className={`w-4 h-4 ${activity.iconColor}`}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-sm font-semibold text-gray-900 mb-1">
                            {activity.title}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {activity.description}
                          </p>
                        </div>
                        <span className="text-xs text-gray-500 whitespace-nowrap ml-4">
                          {activity.time}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
