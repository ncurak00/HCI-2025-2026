"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BarChart3, LayoutDashboard, Package } from "lucide-react";

const links = [
  { title: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { title: "Orders", href: "/admin/orders", icon: Package },
  { title: "Analytics", href: "/admin/analytics", icon: BarChart3 },
];

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <main className="min-h-screen bg-gray-100 text-gray-900">
      <div className="grid min-h-screen lg:grid-cols-[260px_1fr]">
        <aside className="hidden border-r border-gray-200 bg-white lg:block">
          <div className="border-b border-gray-100 px-6 py-6">
            <h1 className="text-xl font-extrabold">FoodHub Admin</h1>
            <p className="mt-1 text-xs text-gray-500">Restaurant dashboard</p>
          </div>

          <nav className="space-y-2 px-4 py-6">
            {links.map((link) => {
              const Icon = link.icon;
              const active = pathname === link.href;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-bold transition ${
                    active
                      ? "bg-orange-50 text-orange-600"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <Icon size={18} />
                  {link.title}
                </Link>
              );
            })}
          </nav>
        </aside>

        <section className="w-full">{children}</section>
      </div>
    </main>
  );
}