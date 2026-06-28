"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ShoppingCart, Menu, X } from "lucide-react";
import { useCart } from "../_context/cart-context";
import { supabase } from "@/lib/supabase";

const pages = [
  { title: "Home", path: "/" },
  { title: "Menu", path: "/book_meal" },
  { title: "Orders", path: "/orders" },
  { title: "About us", path: "/about" },
  { title: "Contact", path: "/contact" },
];

export function Navigation() {
  const pathname = usePathname();
  const router = useRouter();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [user, setUser] = useState<any>(null);

  const { totalItems } = useCart();

  const isAdmin = user?.app_metadata?.role === "admin";

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    async function getUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      setUser(user);
    }

    getUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  async function handleLogout() {
    const { error } = await supabase.auth.signOut();

    if (error) {
      alert("Logout failed.");
      return;
    }

    setUser(null);
    alert("Successfully logged out!");

    router.push("/");
    router.refresh();
  }

  return (
    <nav className="fixed top-0 left-0 z-50 w-full bg-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
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

        <div className="flex items-center gap-4">
          <Link
            href="/cart"
            className="relative text-gray-700 transition hover:text-orange-500"
            aria-label="Cart"
          >
            <ShoppingCart size={20} />

            {totalItems > 0 && (
              <span className="absolute -right-3 -top-3 flex h-5 min-w-5 items-center justify-center rounded-full bg-orange-500 px-1 text-xs font-bold text-white">
                {totalItems}
              </span>
            )}
          </Link>

          {user ? (
            <div className="hidden items-center gap-3 sm:flex">
              {isAdmin && (
                <Link
                  href="/admin"
                  className="rounded-full border border-gray-300 px-5 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-100"
                >
                  Admin
                </Link>
              )}

              <button
                type="button"
                onClick={handleLogout}
                className="rounded-full bg-gray-900 px-5 py-2 text-sm font-semibold text-white transition hover:bg-gray-800"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="hidden items-center gap-3 sm:flex">
              <Link
                href="/my_acc"
                className="rounded-full border border-gray-300 px-5 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-100"
              >
                Sign in
              </Link>

              <Link
                href="/register"
                className="rounded-full bg-orange-500 px-5 py-2 text-sm font-semibold text-white transition hover:bg-orange-600"
              >
                Register
              </Link>
            </div>
          )}

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
                  href="/cart"
                  className={`block rounded-md px-3 py-2 text-sm font-semibold transition-colors ${
                    pathname === "/cart"
                      ? "bg-orange-50 text-orange-600"
                      : "text-gray-800 hover:bg-gray-50"
                  }`}
                  onClick={() => setMobileOpen(false)}
                >
                  Cart {totalItems > 0 ? `(${totalItems})` : ""}
                </Link>
              </li>

              {user ? (
                <>
                  {isAdmin && (
                    <li>
                      <Link
                        href="/admin"
                        className={`block rounded-md px-3 py-2 text-sm font-semibold transition-colors ${
                          pathname.startsWith("/admin")
                            ? "bg-orange-50 text-orange-600"
                            : "text-gray-800 hover:bg-gray-50"
                        }`}
                        onClick={() => setMobileOpen(false)}
                      >
                        Admin
                      </Link>
                    </li>
                  )}

                  <li>
                    <button
                      type="button"
                      onClick={() => {
                        setMobileOpen(false);
                        handleLogout();
                      }}
                      className="block w-full rounded-md px-3 py-2 text-left text-sm font-semibold text-gray-800 transition-colors hover:bg-gray-50"
                    >
                      Logout
                    </button>
                  </li>
                </>
              ) : (
                <>
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
                      Sign in
                    </Link>
                  </li>

                  <li>
                    <Link
                      href="/register"
                      className={`block rounded-md px-3 py-2 text-sm font-semibold transition-colors ${
                        pathname === "/register"
                          ? "bg-orange-50 text-orange-600"
                          : "text-gray-800 hover:bg-gray-50"
                      }`}
                      onClick={() => setMobileOpen(false)}
                    >
                      Register
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      )}
    </nav>
  );
}