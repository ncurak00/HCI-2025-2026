"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { BarChart3, CheckCircle, Clock, Package } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { AdminShell } from "./_components/admin-shell";

type Order = {
  id: string;
  total: number;
  status: string;
  created_at: string;
};

function formatPrice(price: number) {
  return `$${Number(price).toFixed(2)}`;
}

export default function AdminDashboardPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  const stats = useMemo(() => {
    const totalOrders = orders.length;
    const totalRevenue = orders.reduce(
      (sum, order) => sum + Number(order.total),
      0
    );
    const pendingOrders = orders.filter(
      (order) => order.status === "pending"
    ).length;
    const deliveredOrders = orders.filter(
      (order) => order.status === "delivered"
    ).length;

    return { totalOrders, totalRevenue, pendingOrders, deliveredOrders };
  }, [orders]);

  useEffect(() => {
    async function loadOrders() {
      const { data, error } = await supabase
        .from("orders")
        .select("id,total,status,created_at")
        .order("created_at", { ascending: false });

      if (!error) {
        setOrders((data || []) as Order[]);
      }

      setLoading(false);
    }

    loadOrders();
  }, []);

  return (
    <AdminShell>
      <header className="border-b border-gray-200 bg-white px-4 py-5 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-semibold text-orange-600">
            FoodHub Admin
          </p>

          <h2 className="mt-1 text-3xl font-extrabold tracking-tight">
            Dashboard
          </h2>

          <p className="mt-2 text-sm text-gray-600">
            Overview of orders, revenue and delivery status.
          </p>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
        {loading ? (
          <div className="rounded-xl bg-white p-6 text-center shadow-sm">
            Loading dashboard...
          </div>
        ) : (
          <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-2xl bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-gray-500">
                  Total Orders
                </p>
                <Package className="text-orange-500" size={20} />
              </div>

              <p className="mt-4 text-3xl font-extrabold">
                {stats.totalOrders}
              </p>
            </div>

            <div className="rounded-2xl bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-gray-500">
                  Revenue
                </p>
                <BarChart3 className="text-orange-500" size={20} />
              </div>

              <p className="mt-4 text-3xl font-extrabold">
                {formatPrice(stats.totalRevenue)}
              </p>
            </div>

            <div className="rounded-2xl bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-gray-500">
                  Pending
                </p>
                <Clock className="text-orange-500" size={20} />
              </div>

              <p className="mt-4 text-3xl font-extrabold">
                {stats.pendingOrders}
              </p>
            </div>

            <div className="rounded-2xl bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-gray-500">
                  Delivered
                </p>
                <CheckCircle className="text-orange-500" size={20} />
              </div>

              <p className="mt-4 text-3xl font-extrabold">
                {stats.deliveredOrders}
              </p>
            </div>
          </section>
        )}
      </div>
    </AdminShell>
  );
}