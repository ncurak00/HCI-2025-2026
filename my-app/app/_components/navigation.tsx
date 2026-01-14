"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ShoppingCart, Menu, X } from "lucide-react";

const pages = [
  { title: "Home", path: "/" },
  { title: "Menu", path: "/book_meal" },
  { title: "About us", path: "/about" },
  { title: "Contact", path: "/contact" },
];

export function Navigation() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <nav className="fixed top-0 left-0 z-50 w-full bg-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        {/* LEFT GROUP: LOGO + DESKTOP LINKS */}
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/logo3.png"
              alt="FoodHub"
              width={48}
              height={48}
              priority
            />
            <span className="text-lg font-bold text-gray-900">FoodHub</span>
          </Link>

          {/* Desktop nav */}
          <ul className="hidden items-center gap-6 md:flex">
            {pages.map((page) => (
              <li key={page.path}>
                <Link
                  href={page.path}
                  className={`text-sm font-semibold transition-colors ${
                    pathname === page.path
                      ? "text-orange-500"
                      : "text-gray-700 hover:text-orange-500"
                  }`}
                >
                  {page.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* RIGHT GROUP */}
        <div className="flex items-center gap-4">
          {/* Cart */}
          <Link
            href="/book_meal"
            className="text-gray-700 transition hover:text-orange-500"
            aria-label="Cart"
          >
            <ShoppingCart size={20} />
          </Link>

          {/* Sign in */}
          <Link
            href="/my_acc"
            className="rounded-full bg-orange-500 px-5 py-2 text-sm font-semibold text-white transition hover:bg-orange-600"
          >
            Sign in
          </Link>

          {/* Mobile menu toggle */}
          <button
            className="text-gray-700 md:hidden"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {mobileOpen && (
        <div className="border-t border-gray-100 bg-white md:hidden">
          <div className="mx-auto max-w-7xl px-4 py-3">
            <ul className="flex flex-col gap-2">
              {pages.map((page) => (
                <li key={page.path}>
                  <Link
                    href={page.path}
                    className={`block rounded-md px-3 py-2 text-sm font-semibold transition-colors ${
                      pathname === page.path
                        ? "bg-orange-50 text-orange-600"
                        : "text-gray-800 hover:bg-gray-50"
                    }`}
                    onClick={() => setMobileOpen(false)}
                  >
                    {page.title}
                  </Link>
                </li>
              ))}

              <li>
                <Link
                  href="/my_acc"
                  className={`block rounded-md px-3 py-2 text-sm font-semibold transition-colors ${
                    pathname === "/my_acc"
                      ? "bg-orange-50 text-orange-600"
                      : "text-gray-800 hover:bg-gray-50"
                  }`}
                  onClick={() => setMobileOpen(false)}
                >
                  My Account
                </Link>
              </li>
            </ul>
          </div>
        </div>
      )}
    </nav>
  );
}
