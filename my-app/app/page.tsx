import Link from "next/link";
import {
  Pizza,
  Sandwich,
  UtensilsCrossed,
  Fish,
  Salad,
  Cake,
  Zap,
  CheckCircle2,
  Truck,
} from "lucide-react";
import { getLatestPosts } from "@/lib/sanity/blog";
import { urlForImage } from "@/lib/sanity/image";

export const revalidate = 60;

const CATEGORIES = [
  { title: "Pizza", icon: Pizza, href: "/book_meal?category=Pizza" },
  { title: "Burgers", icon: Sandwich, href: "/book_meal?category=Burgers" },
  { title: "Pasta", icon: UtensilsCrossed, href: "/book_meal?category=Pasta" },
  { title: "Sushi", icon: Fish, href: "/book_meal?category=Sushi" },
  { title: "Salads", icon: Salad, href: "/book_meal?category=Salads" },
  { title: "Desserts", icon: Cake, href: "/book_meal?category=Desserts" },
];

export default async function Home() {
  const latestPosts = await getLatestPosts(3);

  return (
    <main className="flex flex-col">
      {/* HERO */}
      <section
        className="relative w-screen min-h-[85vh] bg-cover bg-center"
        style={{ backgroundImage: "url('/test.png')" }}
      >
        <div className="absolute inset-0 bg-black/55" />

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
                href="/register"
                className="inline-flex items-center justify-center rounded-md border border-orange-400 bg-white/10 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white hover:text-black"
              >
                Create Account
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
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-100 text-orange-600">
                <Zap size={22} />
              </div>
              <h3 className="mt-4 text-lg font-semibold">Fast Delivery</h3>
              <p className="mt-2 max-w-xs text-sm text-gray-600">
                Get your food delivered in 30 minutes or less.
              </p>
            </div>

            <div className="flex flex-col items-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-100 text-orange-600">
                <CheckCircle2 size={22} />
              </div>
              <h3 className="mt-4 text-lg font-semibold">
                Quality Guaranteed
              </h3>
              <p className="mt-2 max-w-xs text-sm text-gray-600">
                Fresh ingredients and high-quality meals every time.
              </p>
            </div>

            <div className="flex flex-col items-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-100 text-orange-600">
                <Truck size={22} />
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
                <c.icon size={26} className="text-orange-600" />
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

          {latestPosts.length === 0 ? (
            <p className="mt-8 text-sm text-gray-600">
              No blog posts yet — check back soon.
            </p>
          ) : (
            <div className="mt-8 grid gap-6 md:grid-cols-3">
              {latestPosts.map((post) => (
                <Link
                  key={post._id}
                  href={`/blog/${post.slug}`}
                  className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm transition hover:shadow-md"
                >
                  <div className="h-44 w-full bg-gray-200">
                    <div
                      className="h-full w-full bg-cover bg-center"
                      style={{
                        backgroundImage: `url('${urlForImage(post.coverImage).width(800).height(440).url()}')`,
                      }}
                    />
                  </div>

                  <div className="p-5">
                    <p className="text-xs text-gray-500">
                      {new Date(post.date).toLocaleDateString("en", { dateStyle: "medium" })}
                    </p>
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
          )}
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

          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="/book_meal"
              className="rounded-md bg-orange-500 px-8 py-3 font-semibold text-white transition hover:bg-orange-600"
            >
              Get started
            </Link>

            <Link
              href="/register"
              className="rounded-md border border-orange-500 px-8 py-3 font-semibold text-orange-600 transition hover:bg-orange-50"
            >
              Register
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}