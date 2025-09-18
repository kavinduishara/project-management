"use client";
import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

function NavBar({ baseurl }: { baseurl: string }) {
  const path = usePathname();

  const links = [
    { href: baseurl + "", label: "Chart View" },
    { href: baseurl + "/table", label: "Table View" },
    { href: baseurl + "/add", label: "Add New" },
  ];

  return (
    <nav className="flex items-center gap-3 p-3 rounded-xl bg-white shadow-md border border-gray-200">
      {links.map((link) => {
        const isActive = path === link.href;
        return (
          <Link
            key={link.href}
            href={link.href}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              isActive
                ? "bg-orange-500 text-white shadow-md"
                : "text-gray-600 hover:text-orange-500 hover:bg-orange-50"
            }`}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}

export default NavBar;
