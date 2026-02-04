"use client";

import { Home, Box, Users, Package } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { label: "Dashboard", href: "/admin", icon: Home },
  { label: "Orders", href: "/admin/orders", icon: Box },
  { label: "Users", href: "/admin/users", icon: Users },
  { label: "Products", href: "/admin/products", icon: Package },
];

const ITEM_HEIGHT = 44; // must match link height

const NavAdminLinks = () => {
  const pathname = usePathname();
  console.log(pathname);

  //   const activeIndex = navItems.findIndex(
  //     (item) => pathname === item.href || pathname.startsWith(item.href + "/")
  //   );

  const activeIndex = navItems.findIndex((item) => {
    if (item.href === "/admin") {
      return pathname === "/admin";
    }
    return pathname.startsWith(item.href);
  });

  return (
    <div className="relative">
      {/* Moving left border */}
      <span
        className="absolute left-0 w-1 bg-primary rounded-r transition-transform duration-200 ease-in-out"
        style={{
          height: ITEM_HEIGHT,
          transform: `translateY(${activeIndex * ITEM_HEIGHT}px)`,
        }}
      />

      <div className="flex flex-col">
        {navItems.map((item, i) => {
          const Icon = item.icon;
          const isActive = i === activeIndex;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-2 px-3 h-[44px] rounded-md
              transition-colors duration-200
              ${isActive ? "text-primary bg-base-200" : "hover:bg-base-100"}`}
            >
              <Icon size={18} />
              {item.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default NavAdminLinks;
