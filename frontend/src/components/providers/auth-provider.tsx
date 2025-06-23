"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser, clearUser } from "@/redux/slices/userSlice";
import { RootState } from "@/redux/store";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AuthProvider({
  children,
}: {
  children?: React.ReactNode;
}) {
  const dispatch = useDispatch();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const userStr = localStorage.getItem("user");
      if (userStr) {
        try {
          const user = JSON.parse(userStr);
          dispatch(setUser(user));
        } catch {
          dispatch(clearUser());
        }
      } else {
        dispatch(clearUser());
      }
    }
  }, [dispatch]);

  return <>{children}</>;
}

export function useAuth() {
  const user = useSelector((state: RootState) => state.user.user);
  return {
    user,
    isAuthenticated: !!user,
  };
}

export function ProtectedRoute({
  children,
  allowedRoles,
}: {
  children: React.ReactNode;
  allowedRoles?: string[];
}) {
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) {
      if (!isAuthenticated) {
        router.replace("/login");
      } else if (allowedRoles && user && !allowedRoles.includes(user.role)) {
        // Redirect to a not-authorized page or home
        router.replace(`/${user.role.toLowerCase()}/overview`);
      }
    }
  }, [hydrated, isAuthenticated, allowedRoles, user, router]);

  if (!hydrated) return null;
  if (!isAuthenticated) return null;
  if (allowedRoles && user && !allowedRoles.includes(user.role)) return null;
  return <>{children}</>;
}

export function useSignOut() {
  const dispatch = useDispatch();
  const router = useRouter();

  return () => {
    // Remove user from Redux
    dispatch(clearUser());
    // Remove user from localStorage
    if (typeof window !== "undefined") {
      localStorage.removeItem("user");
      // Remove token from cookies
      document.cookie =
        "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    }
    // Redirect to login or home
    router.push("/login");
  };
}
