"use client";

import { useAuthStore } from "@/store/useAuthStore";
import { Box, Home, Loader2, LogOut, Users } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";

export default function AdminLayout({ children }) {
  const { authUser, isCheckingAuth, logout } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isCheckingAuth) {
      if (!authUser) {
        const redirectPath = pathname.replace(/\/$/, "");
        router.replace(`/login?redirect=${redirectPath}`);
        return;
      }

      if (!authUser?.isAdmin) {
        router.replace("/");
        console.log(authUser);
      }
    }
  }, [authUser, isCheckingAuth, pathname]);

  if (isCheckingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin w-8 h-8" />
      </div>
    );
  }

  // Avoid rendering for unauthorized users
  if (!authUser || !authUser.isAdmin) return null;

  const handleLogout = () => {
    logout();
    router.replace("/login"); // explicit redirect after logout
  };

  return (
    <div className="min-h-screen flex bg-base-200">
      {/* SIDEBAR */}
      <aside className="w-64 bg-white shadow-md flex flex-col">
        <div className="p-6 text-xl font-bold border-b">Admin Panel</div>
        <nav className="flex-1 p-4 space-y-2">
          <Link
            href="/admin/"
            className="flex items-center gap-2 p-2 rounded hover:bg-gray-100"
          >
            <Home size={18} /> Dashboard
          </Link>
          <Link
            href="/admin/orders"
            className="flex items-center gap-2 p-2 rounded hover:bg-gray-100 font-semibold"
          >
            <Box size={18} /> Orders
          </Link>
          <Link
            href="/admin/users"
            className="flex items-center gap-2 p-2 rounded hover:bg-gray-100"
          >
            <Users size={18} /> Users
          </Link>
          <button
            className="flex items-center gap-2 p-2 rounded hover:bg-gray-100 mt-auto text-red-600 cursor-pointer"
            onClick={handleLogout}
          >
            <LogOut size={18} /> Logout
          </button>
        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-6 overflow-y-auto">{children}</main>
    </div>
  );
}
