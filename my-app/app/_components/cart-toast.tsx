"use client";

import { CheckCircle2 } from "lucide-react";
import { useCart } from "../_context/cart-context";

export function CartToast() {
  const { toastMessage } = useCart();

  if (!toastMessage) return null;

  return (
    <div className="pointer-events-none fixed top-20 right-4 z-[100] flex justify-end">
      <div className="animate-toast-in pointer-events-auto flex items-center gap-3 rounded-xl bg-gray-900 px-5 py-4 text-white shadow-lg">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-orange-500/20 text-orange-400">
          <CheckCircle2 size={18} />
        </div>

        <p className="text-sm font-semibold">{toastMessage}</p>
      </div>
    </div>
  );
}
