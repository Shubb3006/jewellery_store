"use client";

import React from "react";
import Link from "next/link";
import { useAuthStore } from "@/store/useAuthStore";
import CartButton from "./CartButton";
import { Loader2 } from "lucide-react";
import { usePathname } from "next/navigation";
import ThemeToggle from "./ThemeToggler";

const Navbar = () => {
  const pathname = usePathname();
  const { authUser, logout, isCheckingAuth } = useAuthStore();

  if (isCheckingAuth) {
    return (
      <div className="navbar bg-base-100 px-6 shadow-sm">
        <Loader2 className="animate-spin" />
      </div>
    );
  }

  if (pathname.startsWith("/admin")) return null;

  return (
    <div
      className="navbar sticky top-0 z-50 px-6
      bg-base-200/80 backdrop-blur-md border-b border-base-300"
    >
      {/* LEFT */}
      <div className="navbar-start">
        <Link
          href="/"
          className="text-xl font-extrabold tracking-wide hover:opacity-80 transition"
        >
          MyStore 🛍️
        </Link>
      </div>

      {/* RIGHT */}
      <div className="navbar-end gap-2 sm:gap-4">
        <ThemeToggle />

        <CartButton />

        {!authUser ? (
          <Link href="/login" className="btn btn-primary btn-sm sm:btn-md">
            Login
          </Link>
        ) : (
          <div className="dropdown dropdown-end">
            <label
              tabIndex={0}
              className="btn btn-ghost btn-sm sm:btn-md font-medium"
            >
              {authUser.name || "Account"}
            </label>

            <ul
              tabIndex={0}
              className="menu dropdown-content mt-3 p-2
                bg-base-100 rounded-xl shadow-lg w-44 border border-base-300"
            >
              <li>
                <Link href="/orders">My Orders</Link>
              </li>
              <li>
                <button onClick={logout} className="text-error font-medium">
                  Logout
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
