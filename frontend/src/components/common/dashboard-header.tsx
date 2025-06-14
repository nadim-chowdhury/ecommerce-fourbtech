"use client";

import {
  ChevronDown,
  Bell,
  User,
  CircleHelp,
  Globe,
  Clock,
  AlertCircle,
  CheckCircle,
  X,
} from "lucide-react";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { useState } from "react";

const LANGUAGES = [
  { code: "EN", label: "English" },
  { code: "ES", label: "Español" },
  { code: "DE", label: "Deutsch" },
];

const USER_MENU_ITEMS = [
  { label: "Profile", action: () => {} },
  { label: "Settings", action: () => {} },
  { label: "Sign Out", action: () => {} },
];

const DEMO_NOTIFICATIONS = [
  {
    id: 1,
    title: "New message received",
    description: "You have a new message from John Doe",
    time: "2 minutes ago",
    type: "message",
    unread: true,
  },
  {
    id: 2,
    title: "System update completed",
    description: "Your system has been successfully updated to version 2.1.0",
    time: "1 hour ago",
    type: "success",
    unread: true,
  },
  {
    id: 3,
    title: "Payment reminder",
    description: "Your subscription will expire in 3 days",
    time: "3 hours ago",
    type: "warning",
    unread: false,
  },
  {
    id: 4,
    title: "Welcome to the platform",
    description: "Complete your profile to get started",
    time: "1 day ago",
    type: "info",
    unread: false,
  },
];

export default function DashboardHeader() {
  const [notifications, setNotifications] = useState(DEMO_NOTIFICATIONS);
  const unreadCount = notifications.filter((n) => n.unread).length;

  const markAsRead = (id: any) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id
          ? { ...notification, unread: false }
          : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((notification) => ({ ...notification, unread: false }))
    );
  };

  const removeNotification = (id: any) => {
    setNotifications((prev) =>
      prev.filter((notification) => notification.id !== id)
    );
  };

  const getNotificationIcon = (type: any) => {
    switch (type) {
      case "success":
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case "warning":
        return <AlertCircle className="w-4 h-4 text-yellow-500" />;
      case "message":
        return <Bell className="w-4 h-4 text-blue-500" />;
      default:
        return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  return (
    <header className="flex items-center justify-between px-16 py-2 border-b bg-white">
      {/* Logo */}
      <div className="flex-shrink-0">
        <h1 className="text-red-600 text-2xl font-bold">eCommerce</h1>
      </div>

      {/* Navigation Actions */}
      <nav className="flex items-center gap-6 text-neutral-600">
        {/* Language Selector */}
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="ghost"
              className="flex items-center gap-1 h-auto p-2 font-normal cursor-pointer"
              aria-label="Select language"
            >
              <Globe className="w-5 h-5" />
              <span>EN</span>
              <ChevronDown className="w-4 h-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-32 p-1">
            {LANGUAGES.map((lang) => (
              <Button
                key={lang.code}
                variant="ghost"
                className="w-full justify-start h-8 px-2 text-sm cursor-pointer"
                onClick={() => console.log(`Selected: ${lang.code}`)}
              >
                {lang.code}
              </Button>
            ))}
          </PopoverContent>
        </Popover>

        {/* Help */}
        <Button
          variant="ghost"
          className="flex items-center gap-2 h-auto p-2 font-normal cursor-pointer"
        >
          <CircleHelp className="w-5 h-5" />
          <span>Help</span>
        </Button>

        {/* Notifications */}
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="relative cursor-pointer"
              aria-label="Notifications"
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-600 text-white text-xs rounded-full flex items-center justify-center font-medium">
                  {unreadCount > 9 ? "9+" : unreadCount}
                </span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent align="end" className="w-80 p-0">
            <div className="p-4 border-b">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-sm">Notifications</h3>
                {unreadCount > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-xs h-auto p-1 cursor-pointer"
                    onClick={markAllAsRead}
                  >
                    Mark all as read
                  </Button>
                )}
              </div>
            </div>
            <div className="max-h-96 overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="p-4 text-center text-sm text-gray-500">
                  No notifications
                </div>
              ) : (
                notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-4 border-b last:border-b-0 hover:bg-gray-50 ${
                      notification.unread ? "bg-blue-50" : ""
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 mt-0.5">
                        {getNotificationIcon(notification.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1">
                            <p className="font-medium text-sm text-gray-900">
                              {notification.title}
                              {notification.unread && (
                                <span className="ml-2 w-2 h-2 bg-blue-500 rounded-full inline-block"></span>
                              )}
                            </p>
                            <p className="text-xs text-gray-600 mt-1">
                              {notification.description}
                            </p>
                            <p className="text-xs text-gray-400 mt-1">
                              {notification.time}
                            </p>
                          </div>
                          <div className="flex items-center gap-1">
                            {notification.unread && (
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-6 w-6 p-0 cursor-pointer"
                                onClick={() => markAsRead(notification.id)}
                                title="Mark as read"
                              >
                                <CheckCircle className="w-3 h-3" />
                              </Button>
                            )}
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-6 w-6 p-0 cursor-pointer"
                              onClick={() =>
                                removeNotification(notification.id)
                              }
                              title="Remove notification"
                            >
                              <X className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
            {notifications.length > 0 && (
              <div className="p-3 border-t">
                <Button
                  variant="ghost"
                  className="w-full text-sm cursor-pointer"
                  onClick={() => console.log("View all notifications")}
                >
                  View all notifications
                </Button>
              </div>
            )}
          </PopoverContent>
        </Popover>

        {/* User Menu */}
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="ghost"
              className="flex items-center gap-2 h-auto p-2 cursor-pointer"
            >
              <div className="rounded-full bg-neutral-100 p-2">
                <User className="w-4 h-4" />
              </div>
              <span className="font-medium">Nadim Chowdhury</span>
              <ChevronDown className="w-4 h-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent align="end" className="w-48 p-1">
            {USER_MENU_ITEMS.map((item) => (
              <Button
                key={item.label}
                variant="ghost"
                className="w-full justify-start h-8 px-2 text-sm cursor-pointer"
                onClick={item.action}
              >
                {item.label}
              </Button>
            ))}
          </PopoverContent>
        </Popover>
      </nav>
    </header>
  );
}
