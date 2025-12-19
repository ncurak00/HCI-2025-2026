"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const pages = [
  { title: "Home", path: "/" },
  { title: "Book a meal", path: "/book_meal" },
  { title: "About us", path: "/about" },
  { title: "Contact", path: "/contact" },
];

export function Navigation() {
  const currentPath = usePathname();

  return (
   <nav className="w-full bg-white">
  <div className="flex w-full items-center gap-6 px-4 py-1 ">
    <Link href="/" className="flex items-center">
      <Image src="/logo.png" alt="FOODHUB" width={200} height={40} />
    </Link>

        <div className="flex flex-1 items-center justify-center gap-15">
          <ul className="flex items-center gap-25">
            {pages.map((page) => (
              <li key={page.path}>
                <Link
                  href={page.path}
                  className={`text-base font-semibold transition-colors ${
                    currentPath === page.path
                      ? "text-red-500"
                      : "text-black hover:text-red-500"
                  }`}
                >
                  {page.title}
                </Link>
              </li>
            ))}
          </ul>

        
          <Link
            href="/my_acc"
            className={`rounded-full bg-red-500 px-6 py-2 text-base font-semibold text-white transition hover:bg-red-600 ${
              currentPath === "/my_acc" ? "ring-2 ring-red-200" : ""
            }`}
          >
            My Account
          </Link>
        </div>
      </div>
    </nav>
  );
}
