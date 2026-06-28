"use client";

import { useEffect, useMemo, useState } from "react";
import { BarChart3, CheckCircle, Clock, Package, Timer } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { AdminShell } from "../_components/admin-shell";

type Order = {
  id: string;
  total: number;
  status: string;
  created_at: string;
};

function formatPrice(price: number) {
  return `$${Number(price).toFixed(2)}`;
}

export default function AdminAnalyticsPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  const stats = useMemo(() => {
    const totalOrders = orders.length;
    const totalRevenue = orders.reduce(
      (sum, order) => sum + Number(order.total),
      0
    );
    const averageOrderValue =
      totalOrders > 0 ? totalRevenue / totalOrders : 0;

    const pending = orders.filter((order) => order.status === "pending").length;
    const preparing = orders.filter(
      (order) => order.status === "preparing"
    ).length;
    const delivered = orders.filter(
      (order) => order.status === "delivered"
    ).length;

    return {
      totalOrders,
      totalRevenue,
      averageOrderValue,
      pending,
      preparing,
      delivered,
    };
  }, [orders]);

  useEffect(() => {
    async function loadAnalytics() {
      const { data, error } = await supabase
        .from("orders")
        .select("id,total,status,created_at")
        .order("created_at", { ascending: false });

      if (!error) {
        setOrders((data || []) as Order[]);
      }

      setLoading(false);
    }

    loadAnalytics();
  }, []);

  return (
    <AdminShell>
      <header className="border-b border-gray-200 bg-white px-4 py-5 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-semibold text-orange-600">
            FoodHub Admin
          </p>
          <h2 className="mt-1 text-3xl font-extrabold tracking-tight">
            Analytics
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Track revenue, order volume and order status breakdown.
          </p>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
        {loading ? (
          <div className="rounded-xl bg-white p-6 text-center shadow-sm">
            Loading analytics...
          </div>
        ) : (
          <>
            <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              <div className="rounded-2xl bg-white p-5 shadow-sm">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-gray-500">
                    Total Revenue
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
                    Average Order Value
                  </p>
                  <Timer className="text-orange-500" size={20} />
                </div>
                <p className="mt-4 text-3xl font-extrabold">
                  {formatPrice(stats.averageOrderValue)}
                </p>
              </div>
            </section>

            <section className="mt-8 rounded-2xl bg-white p-6 shadow-sm">
              <h3 className="text-xl font-extrabold">Order Status Breakdown</h3>

              <div className="mt-5 grid gap-4 md:grid-cols-3">
                <div className="rounded-xl bg-orange-50 p-5">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-bold text-orange-700">
                      Pending
                    </p>
                    <Clock className="text-orange-500" size={20} />
                  </div>
                  <p className="mt-3 text-3xl font-extrabold text-orange-700">
                    {stats.pending}
                  </p>
                </div>

                <div className="rounded-xl bg-yellow-50 p-5">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-bold text-yellow-700">
                      Preparing
                    </p>
                    <Timer className="text-yellow-500" size={20} />
                  </div>
                  <p className="mt-3 text-3xl font-extrabold text-yellow-700">
                    {stats.preparing}
                  </p>
                </div>

                <div className="rounded-xl bg-green-50 p-5">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-bold text-green-700">
                      Delivered
                    </p>
                    <CheckCircle className="text-green-500" size={20} />
                  </div>
                  <p className="mt-3 text-3xl font-extrabold text-green-700">
                    {stats.delivered}
                  </p>
                </div>
              </div>
            </section>
          </>
        )}
      </div>
    </AdminShell>
  );
}