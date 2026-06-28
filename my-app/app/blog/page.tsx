import Link from "next/link";
import { getAllPosts } from "@/lib/sanity/blog";
import { urlForImage } from "@/lib/sanity/image";

export const revalidate = 60;

export default async function Page() {
  const posts = await getAllPosts();

  return (
    <main className="w-full bg-white pt-16 text-gray-900">
      <div className="mx-auto w-full max-w-6xl px-4 py-12">
        <div className="mb-10">
          <p className="text-sm font-semibold text-orange-600">FoodHub Blog</p>
          <h1 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">
            Stories, recipes, and behind-the-scenes
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-600 sm:text-base">
            News from the kitchen, ingredient deep-dives, and a peek at how FoodHub is built.
          </p>
        </div>

        {posts.length === 0 ? (
          <div className="rounded-xl border border-gray-100 bg-gray-50 p-8 text-center">
            <p className="text-sm font-semibold">No blog posts yet</p>
            <p className="mt-1 text-sm text-gray-600">
              Check back soon — new stories are on the way.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
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
                    {new Date(post.date).toLocaleDateString("en", {
                      dateStyle: "medium",
                    })}{" "}
                    · {post.author}
                  </p>
                  <h2 className="mt-2 line-clamp-2 text-base font-semibold text-gray-900">
                    {post.title}
                  </h2>
                  <p className="mt-2 line-clamp-3 text-sm text-gray-600">
                    {post.excerpt}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
