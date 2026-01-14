import Link from "next/link";

const CATEGORIES = [
  { title: "Pizza", emoji: "🍕", href: "/book_meal?category=Pizza" },
  { title: "Burgers", emoji: "🍔", href: "/book_meal?category=Burgers" },
  { title: "Pasta", emoji: "🍝", href: "/book_meal?category=Pasta" },
  { title: "Sushi", emoji: "🍣", href: "/book_meal?category=Sushi" },
  { title: "Salads", emoji: "🥗", href: "/book_meal?category=Salads" },
  { title: "Desserts", emoji: "🍰", href: "/book_meal?category=Desserts" },
];

const BLOG_POSTS = [
  {
    date: "December 1, 2024",
    title: "The Secret to Perfect Pizza Dough",
    excerpt:
      "Learn the art of making authentic Italian pizza dough from scratch. Our chefs share their tips...",
    href: "/blog",
    imageUrl:
      "https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?auto=format&fit=crop&w=1200&q=60",
  },
  {
    date: "November 15, 2024",
    title: "Farm to Table: Our Ingredient Journey",
    excerpt:
      "Discover how we source the freshest local ingredients for our dishes. We work directly...",
    href: "/blog",
    imageUrl:
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1200&q=60",
  },
  {
    date: "October 20, 2024",
    title: "New Menu Items This Season",
    excerpt:
      "Exciting new additions to our menu! Try our seasonal specials featuring autumn flavors...",
    href: "/blog",
    imageUrl:
      "https://images.unsplash.com/photo-1523986371872-9d3ba2e2f642?auto=format&fit=crop&w=1200&q=60",
  },
];

export default function Home() {
  return (
    <main className="flex flex-col">
      {/* HERO */}
      <section
        className="relative w-screen min-h-[85vh] bg-cover bg-center"
        style={{ backgroundImage: "url('/test.png')" }}
      >
        {/* overlay */}
        <div className="absolute inset-0 bg-black/55" />

        {/* content */}
        <div className="relative mx-auto flex min-h-[85vh] max-w-6xl items-center px-6">
          <div className="max-w-xl text-left text-white">
            <h1 className="text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl md:text-6xl">
              Delicious Food Delivered
              <br />
              to Your Door
            </h1>

            <p className="mt-5 text-sm text-gray-200 sm:text-base">
              Order from your favorite local fast food and enjoy quick, reliable
              service. Fresh food, hot and ready!
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/book_meal"
                className="inline-flex items-center justify-center rounded-md bg-orange-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-orange-600"
              >
                Browse Menu →
              </Link>

              <Link
                href="/about"
                className="inline-flex items-center justify-center rounded-md border border-white/70 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white hover:text-black"
              >
                Learn more
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="bg-white px-6 py-12">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-8 text-center md:grid-cols-3">
            <div className="flex flex-col items-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-100 text-xl">
                ⚡
              </div>
              <h3 className="mt-4 text-lg font-semibold">Fast Delivery</h3>
              <p className="mt-2 max-w-xs text-sm text-gray-600">
                Get your food delivered in 30 minutes or less.
              </p>
            </div>

            <div className="flex flex-col items-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-100 text-xl">
                ✅
              </div>
              <h3 className="mt-4 text-lg font-semibold">Quality Guaranteed</h3>
              <p className="mt-2 max-w-xs text-sm text-gray-600">
                Fresh ingredients and high-quality meals every time.
              </p>
            </div>

            <div className="flex flex-col items-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-100 text-xl">
                🚚
              </div>
              <h3 className="mt-4 text-lg font-semibold">Free Delivery</h3>
              <p className="mt-2 max-w-xs text-sm text-gray-600">
                Free delivery on orders over a minimum amount.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* POPULAR CATEGORIES */}
      <section className="bg-gray-50 px-6 py-14">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-center text-xl font-semibold text-gray-900">
            Popular Categories
          </h2>

          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-6">
            {CATEGORIES.map((c) => (
              <Link
                key={c.title}
                href={c.href}
                className="flex flex-col items-center justify-center rounded-lg bg-white p-4 text-center shadow-sm transition hover:shadow-md"
              >
                <div className="text-2xl">{c.emoji}</div>
                <div className="mt-2 text-sm font-medium text-gray-800">
                  {c.title}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* LATEST FROM BLOG */}
      <section className="bg-white px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="flex items-end justify-between gap-6">
            <h2 className="text-xl font-semibold text-gray-900">
              Latest from Our Blog
            </h2>

            <Link
              href="/blog"
              className="text-sm font-semibold text-orange-600 hover:text-orange-700"
            >
              View all →
            </Link>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {BLOG_POSTS.map((post) => (
              <Link
                key={post.title}
                href={post.href}
                className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm transition hover:shadow-md"
              >
                <div className="h-44 w-full bg-gray-200">
                  {/* simple image background (no next/image needed) */}
                  <div
                    className="h-full w-full bg-cover bg-center"
                    style={{ backgroundImage: `url('${post.imageUrl}')` }}
                  />
                </div>

                <div className="p-5">
                  <p className="text-xs text-gray-500">{post.date}</p>
                  <h3 className="mt-2 line-clamp-2 text-base font-semibold text-gray-900">
                    {post.title}
                  </h3>
                  <p className="mt-2 line-clamp-3 text-sm text-gray-600">
                    {post.excerpt}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BOTTOM */}
      <section className="bg-gray-50 px-6 py-16">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 rounded-2xl bg-white p-8 text-center shadow-sm md:flex-row md:text-left">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Ready to order your next meal?
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Browse the menu and place your order in minutes.
            </p>
          </div>

          <Link
          href="/book_meal"
            className="rounded-md bg-orange-500 px-8 py-3 text-white font-semibold transition hover:bg-orange-600"
          >
            Get started
          </Link> 
        </div>
      </section>
    </main>
  );
}
