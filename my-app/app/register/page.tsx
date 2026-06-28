"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function Page() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);
    setErrorMsg("");
    setSuccessMsg("");

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      setErrorMsg(error.message);
      return;
    }

    setSuccessMsg("Account created successfully! You can now sign in.");

    setTimeout(() => {
      router.push("/my_acc");
    }, 1500);
  }

  return (
    <main className="min-h-[calc(100vh-4rem)] w-full bg-white px-4 pt-24 pb-10 text-gray-900">
      <div className="mx-auto w-full max-w-md">
        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-2xl font-extrabold tracking-tight">
                Create Account
              </h1>

              <p className="mt-1 text-sm text-gray-600">
                Register to start ordering food.
              </p>
            </div>

            <button
              type="button"
              onClick={() => router.back()}
              aria-label="Close"
              className="rounded-md px-2 py-1 text-xl leading-none text-gray-500 transition hover:bg-gray-100 hover:text-gray-700"
            >
              ×
            </button>
          </div>

          <form onSubmit={onSubmit} className="mt-6 space-y-4">
            <div>
              <label className="text-sm font-semibold text-gray-800">
                Email
              </label>

              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your.email@example.com"
                className="mt-2 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm outline-none transition focus:border-orange-300 focus:ring-2 focus:ring-orange-100"
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-gray-800">
                Password
              </label>

              <input
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Minimum 6 characters"
                className="mt-2 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm outline-none transition focus:border-orange-300 focus:ring-2 focus:ring-orange-100"
              />
            </div>

            {errorMsg && (
              <div className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                {errorMsg}
              </div>
            )}

            {successMsg && (
              <div className="rounded-md border border-green-200 bg-green-50 px-3 py-2 text-sm text-green-700">
                {successMsg}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="mt-2 w-full cursor-pointer rounded-md bg-orange-500 px-6 py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-orange-600 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading ? "Creating account..." : "Create Account"}
            </button>

            <div className="pt-2 text-center text-sm">
              <span className="text-gray-600">
                Already have an account?{" "}
              </span>

              <Link
                href="/my_acc"
                className="font-semibold text-orange-600 hover:underline"
              >
                Sign in
              </Link>
            </div>
          </form>

          <div className="mt-6 rounded-xl border border-orange-100 bg-orange-50 p-4 text-sm text-orange-900">
            <p className="font-semibold">FoodHub Account</p>

            <p className="mt-1">
              After registration, you can place orders and manage your account.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}