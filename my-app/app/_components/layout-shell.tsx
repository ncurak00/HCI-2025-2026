"use client";

import { usePathname } from "next/navigation";
import { Navigation } from "./navigation";
import { CartToast } from "./cart-toast";

export function LayoutShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const isAdminPage = pathname.startsWith("/admin");

  return (
    <>
      {!isAdminPage && <Navigation />}
      {children}
      <CartToast />
    </>
  );
}