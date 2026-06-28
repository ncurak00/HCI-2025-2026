"use client";

import Link from "next/link";
import { useCart } from "../_context/cart-context";

function formatPrice(price: number) {
  return `$${price.toFixed(2)}`;
}

export default function Page() {
  const {
    items,
    totalItems,
    totalPrice,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCart,
  } = useCart();

  return (
    <main className="w-full bg-white pt-16 text-gray-900">
      <div className="mx-auto w-full max-w-5xl px-4 py-10">
        <h1 className="text-3xl font-extrabold">Your Cart</h1>

        {items.length === 0 ? (
          <div className="mt-10 rounded-lg border border-gray-100 bg-gray-50 p-6 text-center">
            <p className="text-sm font-semibold">Your cart is empty</p>
            <p className="mt-1 text-sm text-gray-600">
              Browse the menu and add some delicious meals.
            </p>

            <Link
              href="/book_meal"
              className="mt-4 inline-block rounded-md bg-orange-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-orange-600"
            >
              Go to Menu
            </Link>
          </div>
        ) : (
          <>
            {/* Items */}
            <div className="mt-8 space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col gap-4 rounded-xl border border-gray-100 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between"
                >
                  {/* LEFT */}
                  <div className="flex items-center gap-4">
                    <div
                      className="h-16 w-16 rounded-md bg-cover bg-center"
                      style={{ backgroundImage: `url('${item.imageUrl}')` }}
                    />

                    <div>
                      <h3 className="text-sm font-bold">{item.title}</h3>
                      <p className="text-xs text-gray-600">
                        {formatPrice(item.price)}
                      </p>
                    </div>
                  </div>

                  {/* RIGHT */}
                  <div className="flex items-center justify-between gap-4 sm:justify-end">
                    {/* Quantity */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => decreaseQuantity(item.id)}
                        className="h-8 w-8 rounded-md border border-gray-200 text-sm font-bold hover:bg-gray-100"
                      >
                        -
                      </button>

                      <span className="min-w-[20px] text-center text-sm font-semibold">
                        {item.quantity}
                      </span>

                      <button
                        onClick={() => increaseQuantity(item.id)}
                        className="h-8 w-8 rounded-md border border-gray-200 text-sm font-bold hover:bg-gray-100"
                      >
                        +
                      </button>
                    </div>

                    {/* Price */}
                    <div className="text-sm font-bold text-orange-600">
                      {formatPrice(item.price * item.quantity)}
                    </div>

                    {/* Remove */}
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-xs text-red-500 hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div className="mt-10 rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">
                  Items: {totalItems}
                </span>
                <span className="text-lg font-extrabold">
                  {formatPrice(totalPrice)}
                </span>
              </div>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <button
                  onClick={clearCart}
                  className="rounded-md border border-gray-200 px-6 py-3 text-sm font-semibold text-gray-800 transition hover:bg-gray-100"
                >
                  Clear Cart
                </button>

                <Link
                  href="/checkout"
                  className="flex-1 text-center rounded-md bg-orange-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-orange-600"
                >
                  Proceed to Checkout
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </main>
  );
}