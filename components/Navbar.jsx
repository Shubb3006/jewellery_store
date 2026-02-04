"use client";

import React, { useEffect } from "react";
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
      <div className="navbar bg-base-100 shadow-md px-6">
        <div className="navbar-end">
          <Loader2 />
        </div>
      </div>
    );
  }
  if (pathname.startsWith("/admin")) return null;
  return (
    <div className="navbar bg-base-200 shadow-md sticky top-0 z-50 px-6">
      {/* LEFT */}
      <div className="navbar-start">
        <Link href="/" className="text-xl font-bold">
          MyStore 🛍️
        </Link>
      </div>

      {/* RIGHT */}
      <div className="navbar-end gap-3">
        <ThemeToggle />

        {/* Cart Icon */}
        <CartButton />

        {!authUser ? (
          <Link href="/login" className="btn btn-primary">
            Login
          </Link>
        ) : (
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost">
              {authUser.name || "Account"}
            </label>
            <ul
              tabIndex={0}
              className="menu dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-40"
            >
              <li>
                <Link href="/orders">My Orders</Link>
              </li>
              <li>
                <button onClick={logout} className="text-error">
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
