"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { useCart } from "../_context/cart-context";
import { supabase } from "@/lib/supabase";

function formatPrice(price: number) {
  return `$${price.toFixed(2)}`;
}

const NAME_PATTERN = /^[A-Za-zÀ-ž'-]+(?:\s[A-Za-zÀ-ž'-]+)+$/;
const PHONE_PATTERN = /^[+\d][\d\s-]{5,18}\d$/;

function validateOrderForm(name: string, phone: string, address: string) {
  if (!NAME_PATTERN.test(name.trim())) {
    return "Please enter your full name (first and last name, letters only).";
  }

  if (!PHONE_PATTERN.test(phone.trim())) {
    return "Please enter a valid phone number (digits only, at least 6 numbers).";
  }

  const trimmedAddress = address.trim();
  const hasLetters = /[A-Za-zÀ-ž]/.test(trimmedAddress);
  const hasNumber = /\d/.test(trimmedAddress);

  if (trimmedAddress.length < 6 || !hasLetters || !hasNumber) {
    return "Please enter a valid delivery address (street name and house number).";
  }

  return null;
}

export default function Page() {
  const { items, totalItems, totalPrice, clearCart } = useCart();

  const [orderPlaced, setOrderPlaced] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [checkingUser, setCheckingUser] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    async function checkUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      setIsLoggedIn(!!user);
      setCheckingUser(false);
    }

    checkUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsLoggedIn(!!session?.user);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = e.currentTarget;

    setErrorMessage("");
    setIsSubmitting(true);

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      setIsSubmitting(false);
      setIsLoggedIn(false);
      setErrorMessage("You must be signed in to place an order.");
      return;
    }

    const formData = new FormData(form);

    const name = String(formData.get("name") || "");
    const phone = String(formData.get("phone") || "");
    const address = String(formData.get("address") || "");

    const validationError = validateOrderForm(name, phone, address);

    if (validationError) {
      setIsSubmitting(false);
      setErrorMessage(validationError);
      return;
    }

    const order = {
      user_id: user.id,
      name,
      phone,
      address,
      note: String(formData.get("note") || ""),
      items: items.map((item) => ({
        id: item.id,
        title: item.title,
        price: item.price,
        quantity: item.quantity,
      })),
      total: totalPrice,
      created_at: new Date().toISOString(),
    };

    const { error } = await supabase.from("orders").insert(order);

    setIsSubmitting(false);

    if (error) {
      setErrorMessage("Something went wrong. Please try again.");
      console.error(error);
      return;
    }

    clearCart();
    setOrderPlaced(true);
  }

  if (checkingUser) {
    return (
      <main className="w-full bg-white pt-16 text-gray-900">
        <div className="mx-auto flex min-h-[70vh] w-full max-w-3xl flex-col items-center justify-center px-4 text-center">
          <div className="rounded-2xl border border-gray-100 bg-gray-50 p-8 shadow-sm">
            <p className="text-sm font-semibold text-gray-700">
              Checking your account...
            </p>
          </div>
        </div>
      </main>
    );
  }

  if (!isLoggedIn) {
    return (
      <main className="w-full bg-white pt-16 text-gray-900">
        <div className="mx-auto flex min-h-[70vh] w-full max-w-3xl flex-col items-center justify-center px-4 text-center">
          <div className="rounded-2xl border border-orange-100 bg-orange-50 p-8 shadow-sm">
            <h1 className="text-3xl font-extrabold">
              Sign in to continue checkout
            </h1>

            <p className="mt-3 text-sm text-gray-600">
              You need to be signed in before placing an order.
            </p>

            <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                href="/my_acc"
                className="inline-flex rounded-md bg-orange-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-orange-600"
              >
                Sign in
              </Link>

              <Link
                href="/register"
                className="inline-flex rounded-md border border-orange-500 px-6 py-3 text-sm font-semibold text-orange-600 transition hover:bg-orange-100"
              >
                Create Account
              </Link>
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (orderPlaced) {
    return (
      <main className="w-full bg-white pt-16 text-gray-900">
        <div className="mx-auto flex min-h-[70vh] w-full max-w-3xl flex-col items-center justify-center px-4 text-center">
          <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-orange-100 text-orange-600">
              <CheckCircle2 size={26} />
            </div>

            <h1 className="mt-5 text-3xl font-extrabold">
              Order placed successfully!
            </h1>

            <p className="mt-3 text-sm text-gray-600">
              Thank you for ordering with FoodHub. Your order has been saved.
            </p>

            <Link
              href="/book_meal"
              className="mt-6 inline-flex rounded-md bg-orange-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-orange-600"
            >
              Back to Menu
            </Link>
          </div>
        </div>
      </main>
    );
  }

  if (items.length === 0) {
    return (
      <main className="w-full bg-white pt-16 text-gray-900">
        <div className="mx-auto flex min-h-[70vh] w-full max-w-3xl flex-col items-center justify-center px-4 text-center">
          <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm">
            <h1 className="text-3xl font-extrabold">Your cart is empty</h1>

            <p className="mt-3 text-sm text-gray-600">
              Add some meals to your cart before checkout.
            </p>

            <Link
              href="/book_meal"
              className="mt-6 inline-flex rounded-md bg-orange-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-orange-600"
            >
              Browse Menu
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="w-full bg-white pt-16 text-gray-900">
      <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-10 lg:grid-cols-[1fr_380px]">
        <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <h1 className="text-3xl font-extrabold">Checkout</h1>

          <p className="mt-2 text-sm text-gray-600">
            Enter your delivery details to complete your order.
          </p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label className="text-sm font-semibold text-gray-800">
                Full name
              </label>

              <input
                name="name"
                required
                type="text"
                className="mt-2 w-full rounded-md border border-gray-200 px-3 py-2 text-sm outline-none transition focus:border-orange-300 focus:ring-2 focus:ring-orange-100"
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-gray-800">
                Phone number
              </label>

              <input
                name="phone"
                required
                type="tel"
                className="mt-2 w-full rounded-md border border-gray-200 px-3 py-2 text-sm outline-none transition focus:border-orange-300 focus:ring-2 focus:ring-orange-100"
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-gray-800">
                Delivery address
              </label>

              <input
                name="address"
                required
                type="text"
                className="mt-2 w-full rounded-md border border-gray-200 px-3 py-2 text-sm outline-none transition focus:border-orange-300 focus:ring-2 focus:ring-orange-100"
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-gray-800">
                Delivery note
              </label>

              <textarea
                name="note"
                rows={4}
                placeholder="Example: Please call when you arrive."
                className="mt-2 w-full resize-none rounded-md border border-gray-200 px-3 py-2 text-sm outline-none transition focus:border-orange-300 focus:ring-2 focus:ring-orange-100"
              />
            </div>

            {errorMessage && (
              <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-600">
                {errorMessage}
              </p>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full cursor-pointer rounded-md bg-orange-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-orange-600 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? "Placing order..." : "Place order"}
            </button>
          </form>
        </section>

        <aside className="h-fit rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-extrabold">Order summary</h2>

          <div className="mt-5 space-y-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between gap-4"
              >
                <div>
                  <p className="text-sm font-semibold">{item.title}</p>

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

          <div className="mt-6 border-t border-gray-100 pt-4">
            <div className="flex justify-between text-sm text-gray-600">
              <span>Total items</span>
              <span>{totalItems}</span>
            </div>

            <div className="mt-3 flex justify-between text-lg font-extrabold">
              <span>Total</span>
              <span>{formatPrice(totalPrice)}</span>
            </div>
          </div>

          <Link
            href="/cart"
            className="mt-6 block text-center text-sm font-semibold text-orange-600 hover:underline"
          >
            Back to cart
          </Link>
        </aside>
      </div>
    </main>
  );
}