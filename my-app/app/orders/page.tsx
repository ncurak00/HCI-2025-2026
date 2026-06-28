"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

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
  created_at: string;
  status: string;
};

function formatPrice(price: number) {
  return `$${Number(price).toFixed(2)}`;
}

function formatDate(date: string) {
  const parsed = new Date(date);

  if (!date || Number.isNaN(parsed.getTime()) || parsed.getTime() === 0) {
    return "Unknown date";
  }

  return new Intl.DateTimeFormat("hr-HR", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Europe/Zagreb",
  }).format(parsed);
}

export default function Page() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    async function loadOrders() {
      setLoading(true);
      setErrorMessage("");

      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        setIsLoggedIn(false);
        setOrders([]);
        setLoading(false);
        return;
      }

      setIsLoggedIn(true);

      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) {
        console.error(error);
        setErrorMessage("Could not load orders. Please try again.");
        setLoading(false);
        return;
      }

      setOrders((data || []) as Order[]);
      setLoading(false);
    }

    loadOrders();
  }, []);

  return (
    <main className="w-full bg-white pt-16 text-gray-900">
      <div className="mx-auto w-full max-w-6xl px-4 py-10">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold text-orange-600">FoodHub</p>

            <h1 className="mt-1 text-3xl font-extrabold tracking-tight">
              My Orders
            </h1>

            <p className="mt-2 text-sm text-gray-600">
              View previously placed food orders.
            </p>
          </div>

          <Link
            href="/book_meal"
            className="inline-flex items-center justify-center rounded-md bg-orange-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-orange-600"
          >
            Order again
          </Link>
        </div>

        {loading && (
          <div className="mt-10 rounded-xl border border-gray-100 bg-gray-50 p-6 text-center">
            <p className="text-sm font-semibold">Loading orders...</p>
          </div>
        )}

        {!loading && !isLoggedIn && (
          <div className="mt-10 rounded-xl border border-orange-100 bg-orange-50 p-8 text-center">
            <h2 className="text-lg font-extrabold">
              Sign in to view your orders
            </h2>

            <p className="mt-2 text-sm text-gray-600">
              You need to be signed in before you can see your order history.
            </p>

            <Link
              href="/my_acc"
              className="mt-5 inline-flex rounded-md bg-orange-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-orange-600"
            >
              Sign in
            </Link>
          </div>
        )}

        {errorMessage && (
          <div className="mt-10 rounded-xl border border-red-100 bg-red-50 p-6 text-center">
            <p className="text-sm font-semibold text-red-600">
              {errorMessage}
            </p>
          </div>
        )}

        {!loading && isLoggedIn && !errorMessage && orders.length === 0 && (
          <div className="mt-10 rounded-xl border border-gray-100 bg-gray-50 p-8 text-center">
            <h2 className="text-lg font-extrabold">No orders yet</h2>

            <p className="mt-2 text-sm text-gray-600">
              Browse the menu and place your first order.
            </p>

            <Link
              href="/book_meal"
              className="mt-5 inline-flex rounded-md bg-orange-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-orange-600"
            >
              Browse Menu
            </Link>
          </div>
        )}

        {!loading && isLoggedIn && !errorMessage && orders.length > 0 && (
          <section className="mt-8 space-y-5">
            {orders.map((order) => (
              <article
                key={order.id}
                className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm"
              >
                <div className="flex flex-col gap-4 border-b border-gray-100 pb-5 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h2 className="text-lg font-extrabold">
                      Order #{order.id.slice(0, 8)}
                    </h2>

                    <p className="mt-1 text-sm text-gray-500">
                      {formatDate(order.created_at)}
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <div 
                      className={`rounded-full px-3 py-1 text-xs font-bold ${
                        order.status === "delivered"
                        ? "bg-green-100 text-green-700"
                        : order.status === "preparing"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-orange-100 text-orange-700"
                    }`}
                  >
                    {order.status}
                  </div>

                  <div className="rounded-full bg-orange-50 px-4 py-2 text-sm font-bold text-orange-600">
                    {formatPrice(order.total)}
                  </div>
                </div>
              </div>

                <div className="mt-5 grid gap-6 lg:grid-cols-[1fr_320px]">
                  <div>
                    <h3 className="text-sm font-bold">Items</h3>

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
                    <h3 className="text-sm font-bold">Delivery details</h3>

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
          </section>
        )}
      </div>
    </main>
  );
}