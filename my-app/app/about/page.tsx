import Link from "next/link";

export default function Page() {
  return (
    <main className="w-full bg-white pt-16 text-gray-900">
      <div className="mx-auto w-full max-w-6xl px-4 py-12">
        {/* HERO */}
        <section className="rounded-2xl border border-gray-100 bg-gradient-to-br from-orange-50 to-white p-8 sm:p-10">
          <p className="text-sm font-semibold text-orange-600">About FoodHub</p>

          <h1 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">
            Local fast food, delivered simply.
          </h1>

          <p className="mt-4 max-w-2xl text-sm leading-6 text-gray-600 sm:text-base">
            FoodHub is a food ordering web app built to help people discover local meals,
            browse menus easily, and place orders in minutes. Our focus is speed, clarity, and a
            friendly experience on both desktop and mobile devices.
          </p>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/book_meal"
              className="inline-flex items-center justify-center rounded-md bg-orange-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-orange-600"
            >
              Browse Menu
            </Link>

            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-md border border-gray-200 bg-white px-6 py-3 text-sm font-semibold text-gray-800 transition hover:bg-gray-50"
            >
              Contact Us
            </Link>
          </div>
        </section>

        {/* STATS */}
        <section className="mt-10 grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
            <p className="text-2xl font-extrabold text-gray-900">10–15 min</p>
            <p className="mt-1 text-sm text-gray-600">Average order preparation time</p>
          </div>

          <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
            <p className="text-2xl font-extrabold text-gray-900">Fresh & local</p>
            <p className="mt-1 text-sm text-gray-600">Ingredients sourced from local suppliers</p>
          </div>

          <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
            <p className="text-2xl font-extrabold text-gray-900">Responsive</p>
            <p className="mt-1 text-sm text-gray-600">Optimized for desktop and mobile</p>
          </div>
        </section>

        {/* OUR STORY + VALUES */}
        <section className="mt-12 grid gap-8 lg:grid-cols-2">
          <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm">
            <h2 className="text-xl font-extrabold tracking-tight">Our story</h2>
            <p className="mt-3 text-sm leading-6 text-gray-600">
              FoodHub started as a project focused on user experience and clear navigation.
              Many local fast-food places still rely on phone calls or social media messages—FoodHub
              shows how a simple web app can make ordering easier and faster.
            </p>

            <p className="mt-3 text-sm leading-6 text-gray-600">
              The goal is to provide a clean interface where users can search meals, filter by
              category, and quickly proceed to ordering—without unnecessary steps.
            </p>
          </div>

          <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm">
            <h2 className="text-xl font-extrabold tracking-tight">What we value</h2>

            <ul className="mt-4 space-y-4 text-sm text-gray-700">
              <li className="flex gap-3">
                <span className="mt-0.5 text-orange-500">●</span>
                <div>
                  <p className="font-semibold">Simplicity</p>
                  <p className="text-gray-600">
                    Clear layout, readable typography, and easy navigation.
                  </p>
                </div>
              </li>

              <li className="flex gap-3">
                <span className="mt-0.5 text-orange-500">●</span>
                <div>
                  <p className="font-semibold">Speed</p>
                  <p className="text-gray-600">
                    Quick search and filtering so users find meals in seconds.
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </section>

        {/* CTA */}
        <section className="mt-12 rounded-2xl border border-gray-100 bg-white p-8 shadow-sm">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="text-lg font-extrabold">Ready to order your next meal?</h3>
              <p className="mt-1 text-sm text-gray-600">
                Browse the menu and place your order in minutes.
              </p>
            </div>

            <Link
              href="/book_meal"
              className="inline-flex items-center justify-center rounded-md bg-orange-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-orange-600"
            >
              Get started
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
