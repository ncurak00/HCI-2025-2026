"use client";

import { useEffect, useState } from "react";
import { CookingPot } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { AdminShell } from "../_components/admin-shell";

type OrderItem = {
  id: string;
  title: string;
  price: number;
  quantity: number;
};

type Order = {
  id: string;
  user_id: string;
  name: string;
  phone: string;
  address: string;
  note: string | null;
  items: OrderItem[];
  total: number;
  status: string;
  created_at: string;
};

function formatPrice(price: number) {
  return `$${Number(price).toFixed(2)}`;
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(date));
}

function statusClass(status: string) {
  if (status === "delivered") return "bg-green-100 text-green-700";
  if (status === "preparing") return "bg-yellow-100 text-yellow-700";
  return "bg-orange-100 text-orange-700";
}

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  async function loadOrders() {
    setLoading(true);
    setErrorMessage("");

    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error(error);
      setErrorMessage("Could not load orders.");
      setLoading(false);
      return;
    }

    setOrders((data || []) as Order[]);
    setLoading(false);
  }

  async function updateStatus(orderId: string, status: string) {
    setUpdatingId(orderId);

    const { error } = await supabase
      .from("orders")
      .update({ status })
      .eq("id", orderId);

    setUpdatingId("");

    if (error) {
      alert("Could not update status.");
      return;
    }

    setOrders((currentOrders) =>
      currentOrders.map((order) =>
        order.id === orderId ? { ...order, status } : order
      )
    );
  }

  useEffect(() => {
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
            Orders
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Manage all customer orders and update delivery status.
          </p>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-xl font-extrabold">All Orders</h3>

          <button
            onClick={loadOrders}
            className="rounded-md border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
          >
            Refresh
          </button>
        </div>

        {loading && (
          <div className="rounded-xl bg-white p-6 text-center shadow-sm">
            Loading orders...
          </div>
        )}

        {errorMessage && (
          <div className="rounded-xl bg-red-50 p-6 text-center text-red-600">
            {errorMessage}
          </div>
        )}

        {!loading && !errorMessage && orders.length === 0 && (
          <div className="rounded-xl bg-white p-8 text-center shadow-sm">
            No orders found.
          </div>
        )}

        {!loading && !errorMessage && orders.length > 0 && (
          <div className="space-y-5">
            {orders.map((order) => (
              <article
                key={order.id}
                className="rounded-2xl bg-white p-6 shadow-sm"
              >
                <div className="flex flex-col gap-4 border-b border-gray-100 pb-5 lg:flex-row lg:items-start lg:justify-between">
                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <h2 className="text-lg font-extrabold">
                        Order #{order.id.slice(0, 8)}
                      </h2>

                      <span
                        className={`rounded-full px-3 py-1 text-xs font-bold capitalize ${statusClass(
                          order.status || "pending"
                        )}`}
                      >
                        {order.status || "pending"}
                      </span>
                    </div>

                    <p className="mt-1 text-sm text-gray-500">
                      {formatDate(order.created_at)}
                    </p>

                    <p className="mt-2 text-xs text-gray-400">
                      User ID: {order.user_id}
                    </p>
                  </div>

                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                    <select
                      value={order.status || "pending"}
                      disabled={updatingId === order.id}
                      onChange={(e) => updateStatus(order.id, e.target.value)}
                      className="rounded-md border border-gray-200 bg-white px-3 py-2 text-sm font-semibold outline-none transition focus:border-orange-300 focus:ring-2 focus:ring-orange-100"
                    >
                      <option value="pending">Pending</option>
                      <option value="preparing">Preparing</option>
                      <option value="delivered">Delivered</option>
                    </select>

                    <div className="rounded-full bg-orange-50 px-4 py-2 text-sm font-bold text-orange-600">
                      {formatPrice(order.total)}
                    </div>
                  </div>
                </div>

                <div className="mt-5 grid gap-6 lg:grid-cols-[1fr_320px]">
                  <div>
                    <h3 className="flex items-center gap-2 text-sm font-bold">
                      <CookingPot size={16} />
                      Items
                    </h3>

                    <div className="mt-3 space-y-3">
                      {order.items.map((item) => (
                        <div
                          key={`${order.id}-${item.id}`}
                          className="flex items-center justify-between rounded-lg bg-gray-50 px-4 py-3"
                        >
                          <div>
                            <p className="text-sm font-semibold">
                              {item.title}
                            </p>
                            <p className="text-xs text-gray-500">
                              {item.quantity} × {formatPrice(item.price)}
                            </p>
                          </div>

                          <p className="text-sm font-bold text-orange-600">
                            {formatPrice(item.price * item.quantity)}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-xl bg-gray-50 p-4">
                    <h3 className="text-sm font-bold">Customer details</h3>

                    <div className="mt-3 space-y-2 text-sm text-gray-600">
                      <p>
                        <span className="font-semibold text-gray-900">
                          Name:
                        </span>{" "}
                        {order.name}
                      </p>
                      <p>
                        <span className="font-semibold text-gray-900">
                          Phone:
                        </span>{" "}
                        {order.phone}
                      </p>
                      <p>
                        <span className="font-semibold text-gray-900">
                          Address:
                        </span>{" "}
                        {order.address}
                      </p>

                      {order.note && (
                        <p>
                          <span className="font-semibold text-gray-900">
                            Note:
                          </span>{" "}
                          {order.note}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </AdminShell>
  );
}