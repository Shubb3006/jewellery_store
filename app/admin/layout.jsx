"use client";

import { useAuthStore } from "@/store/useAuthStore";
import { Box, Home, Loader2, LogOut, Users, Menu, X } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import NavAdminLinks from "@/components/NavAdminLinks";

export default function AdminLayout({ children }) {
  const { authUser, isCheckingAuth, logout } = useAuthStore();
  const [show, setShow] = useState(false);
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
      {/* Mobile Sidebar Overlay */}
      {show && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <aside className="w-64 bg-base-200 shadow-md flex flex-col">
            <div className="p-6 text-xl font-bold border-b flex justify-between items-center">
              Admin Panel
              <X className="cursor-pointer" onClick={() => setShow(false)} />
            </div>
            <nav
              className="flex-1 p-4 space-y-2"
              onClick={() => setShow(false)}
            >
              <NavAdminLinks />
              <button
                className="btn btn-error w-full mt-auto"
                onClick={handleLogout}
              >
                <LogOut size={18} /> Logout
              </button>
            </nav>
          </aside>
          {/* Overlay backdrop */}
          <div className="flex-1 bg-black/40" onClick={() => setShow(false)} />
        </div>
      )}

      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-64 shadow-md flex-col">
        <div className="p-6 text-xl font-bold border-b">Admin Panel</div>
        <nav className="flex-1 p-4 space-y-2">
          <NavAdminLinks />
          <button
            className="btn btn-error w-full mt-auto"
            onClick={handleLogout}
          >
            <LogOut size={18} /> Logout
          </button>
        </nav>
      </aside>

      {/* Mobile Menu Button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        {!show && (
          <Menu
            className="w-6 h-6 cursor-pointer"
            onClick={() => setShow(true)}
          />
        )}
      </div>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-6 overflow-y-auto">{children}</main>
    </div>
  );
}
