import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-10 text-center">
      <h1 className="text-5xl font-extrabold tracking-tight mb-6">
        Order food from your favorite local fast food
      </h1>

      <p className="max-w-xl text-lg mb-10">
        FoodHub is a simple web application that allows you to browse menus,
        choose meals, and order food online quickly and easily.
      </p>

      <div className="flex gap-4">
        <Link
          href="/book_meal"
          className="rounded bg-red-600 px-6 py-3 text-white font-semibold hover:bg-red-700 transition"
        >
          Book a meal
        </Link>

        <Link
          href="/about"
          className="rounded border border-white px-6 py-3 font-semibold hover:bg-white hover:text-black transition"
        >
          Learn more
        </Link>
      </div>
    </main>
  );
}
