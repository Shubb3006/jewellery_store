"use client";
import { Box, Home, Users } from "lucide-react";
import Link from "next/link";
import React from "react";

const NavAdminLinks = () => {
  return (
    <div>
      <Link
        href="/admin/"
        className="flex items-center gap-2 p-2 rounded hover:bg-base-100"
      >
        <Home size={18} /> Dashboard
      </Link>
      <Link
        href="/admin/orders"
        className="flex items-center gap-2 p-2 rounded hover:bg-base-100 font-semibold"
      >
        <Box size={18} /> Orders
      </Link>
      <Link
        href="/admin/users"
        className="flex items-center gap-2 p-2 rounded hover:bg-base-100"
      >
        <Users size={18} /> Users
      </Link>
      <Link
        href="/admin/products"
        className="flex items-center gap-2 p-2 rounded hover:bg-base-100"
      >
        <Users size={18} /> Products
      </Link>
    </div>
  );
};

export default NavAdminLinks;
