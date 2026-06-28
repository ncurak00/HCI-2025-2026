"use client";

import { useState } from "react";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

const NAME_PATTERN = /^[A-Za-zÀ-ž'-]+$/;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateContactForm(formData: FormData) {
  const firstName = String(formData.get("first_name") || "").trim();
  const lastName = String(formData.get("last_name") || "").trim();
  const email = String(formData.get("email") || "").trim();
  const subject = String(formData.get("subject") || "").trim();

  if (!NAME_PATTERN.test(firstName)) {
    return "Please enter a valid first name (letters only).";
  }

  if (!NAME_PATTERN.test(lastName)) {
    return "Please enter a valid last name (letters only).";
  }

  if (!EMAIL_PATTERN.test(email)) {
    return "Please enter a valid email address.";
  }

  if (subject.length < 3 || !/[A-Za-zÀ-ž]/.test(subject)) {
    return "Please enter a valid subject.";
  }

  return null;
}

export default function Page() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = e.currentTarget;

    const formData = new FormData(form);

    const validationError = validateContactForm(formData);

    if (validationError) {
      setStatus("error");
      setErrorMessage(validationError);
      return;
    }

    setStatus("sending");
    setErrorMessage("");

    formData.append("access_key", process.env.NEXT_PUBLIC_WEB3FORMS_KEY || "");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: formData,
      });

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.message || "Failed to send message");
      }

      setStatus("sent");
      form.reset();
    } catch (error) {
      console.error(error);
      setErrorMessage("Something went wrong. Please try again.");
      setStatus("error");
    }
  }

  return (
    <main className="w-full bg-white pt-16 text-gray-900">
      <div className="mx-auto w-full max-w-6xl px-4 py-12">
        {/* Header */}
        <section className="mb-10">
          <p className="text-sm font-semibold text-orange-600">Contact</p>
          <h1 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">
            Contact FoodHub
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-600 sm:text-base">
            Have a question, feedback, or a special request? Send us a message and we’ll get back
            to you as soon as possible.
          </p>
        </section>

        <section className="grid gap-8 lg:grid-cols-2">
          {/* Form */}
          <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm">
            <h2 className="text-lg font-extrabold">Send us a message</h2>
            <p className="mt-2 text-sm text-gray-600">
              Fill out the form and our team will respond shortly.
            </p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="text-sm font-semibold text-gray-800">
                    First name
                  </label>
                  <input
                    required
                    type="text"
                    name="first_name"
                    className="mt-2 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm outline-none transition focus:border-orange-300 focus:ring-2 focus:ring-orange-100"
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold text-gray-800">
                    Last name
                  </label>
                  <input
                    required
                    type="text"
                    name="last_name"
                    className="mt-2 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm outline-none transition focus:border-orange-300 focus:ring-2 focus:ring-orange-100"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-semibold text-gray-800">Email</label>
                <input
                  required
                  type="email"
                  name="email"
                  className="mt-2 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm outline-none transition focus:border-orange-300 focus:ring-2 focus:ring-orange-100"
                />
              </div>

              <div>
                <label className="text-sm font-semibold text-gray-800">Subject</label>
                <input
                  required
                  type="text"
                  name="subject"
                  className="mt-2 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm outline-none transition focus:border-orange-300 focus:ring-2 focus:ring-orange-100"
                />
              </div>

              <div>
                <label className="text-sm font-semibold text-gray-800">Message</label>
                <textarea
                  required
                  rows={5}
                  name="message"
                  placeholder="Write your message..."
                  className="mt-2 w-full resize-none rounded-md border border-gray-200 bg-white px-3 py-2 text-sm outline-none transition focus:border-orange-300 focus:ring-2 focus:ring-orange-100"
                />
              </div>

              {status === "error" && errorMessage && (
                <div className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                  {errorMessage}
                </div>
              )}

              <button
                type="submit"
                disabled={status === "sending"}
                className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-md bg-orange-500 px-6 py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-orange-600 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-60"
              >
                {(status === "idle" || status === "error") && "Send message"}
                {status === "sending" && "Sending..."}
                {status === "sent" && (
                  <>
                    <CheckCircle2 size={16} />
                    Message sent
                  </>
                )}
              </button>

              <p className="text-xs text-gray-500">
                We'll get back to you at the email address you provide.
              </p>
            </form>
          </div>

          {/* Contact info */}
          <div className="space-y-4">
            <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm">
              <h2 className="text-lg font-extrabold">Contact information</h2>

              <div className="mt-5 space-y-4 text-sm text-gray-700">
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 text-orange-500">●</span>
                  <div>
                    <p className="font-semibold">Email</p>
                    <p className="text-gray-600">nikolacurak20@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="mt-0.5 text-orange-500">●</span>
                  <div>
                    <p className="font-semibold">Phone</p>
                    <p className="text-gray-600">+385 916211144</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="mt-0.5 text-orange-500">●</span>
                  <div>
                    <p className="font-semibold">Location</p>
                    <p className="text-gray-600">Split, Croatia</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="mt-0.5 text-orange-500">●</span>
                  <div>
                    <p className="font-semibold">Working hours</p>
                    <p className="text-gray-600">Mon–Sun: 10:00–22:00</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-gray-100 bg-gradient-to-br from-orange-50 to-white p-8 shadow-sm">
              <h3 className="text-lg font-extrabold">Looking for the menu?</h3>
              <p className="mt-2 text-sm text-gray-600">
                Browse categories, search meals, and add items to your cart.
              </p>

              <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/book_meal"
                  className="inline-flex items-center justify-center rounded-md bg-orange-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-orange-600"
                >
                  Browse Menu
                </Link>

                <Link
                  href="/about"
                  className="inline-flex items-center justify-center rounded-md border border-gray-200 bg-white px-6 py-3 text-sm font-semibold text-gray-800 transition hover:bg-gray-50"
                >
                  Learn more
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
