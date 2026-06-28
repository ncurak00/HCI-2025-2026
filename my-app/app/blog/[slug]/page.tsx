import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import { getAllPostSlugs, getPostBySlug } from "@/lib/sanity/blog";
import { urlForImage } from "@/lib/sanity/image";

export const revalidate = 60;

export async function generateStaticParams() {
  const slugs = await getAllPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

function getYouTubeEmbedUrl(url: string) {
  try {
    const parsed = new URL(url);

    if (parsed.hostname === "youtu.be") {
      return `https://www.youtube.com/embed/${parsed.pathname.slice(1)}`;
    }

    if (parsed.hostname.includes("youtube.com")) {
      if (parsed.pathname === "/watch") {
        const videoId = parsed.searchParams.get("v");
        return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
      }

      if (parsed.pathname.startsWith("/embed/")) {
        return url;
      }

      if (parsed.pathname.startsWith("/shorts/")) {
        return `https://www.youtube.com/embed/${parsed.pathname.split("/")[2]}`;
      }
    }

    return null;
  } catch {
    return null;
  }
}

const portableTextComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="text-sm leading-7 text-gray-700 sm:text-base">{children}</p>
    ),
  },
  types: {
    image: ({ value }) => (
      <figure>
        <div
          className="h-72 w-full rounded-xl bg-cover bg-center bg-gray-100"
          style={{ backgroundImage: `url('${urlForImage(value).width(1200).url()}')` }}
        />
        {value.caption && (
          <figcaption className="mt-2 text-center text-xs text-gray-500">
            {value.caption}
          </figcaption>
        )}
      </figure>
    ),
    videoEmbed: ({ value }) => {
      const youtubeEmbedUrl = getYouTubeEmbedUrl(value.url);

      return (
        <figure>
          {youtubeEmbedUrl ? (
            <div className="aspect-video w-full overflow-hidden rounded-xl bg-black">
              <iframe
                src={youtubeEmbedUrl}
                title={value.caption || "Embedded video"}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="h-full w-full"
              />
            </div>
          ) : (
            <video controls className="w-full rounded-xl bg-black" src={value.url} />
          )}

          {value.caption && (
            <figcaption className="mt-2 text-center text-xs text-gray-500">
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },
    codeSnippet: ({ value }) => (
      <pre className="overflow-x-auto rounded-xl bg-gray-900 p-4 text-xs leading-6 text-gray-100 sm:text-sm">
        <code>{value.code}</code>
      </pre>
    ),
  },
};

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="w-full bg-white pt-16 text-gray-900">
      <div className="mx-auto w-full max-w-3xl px-4 py-12">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm font-semibold text-orange-600 hover:text-orange-700"
        >
          <ArrowLeft size={16} />
          Back to blog
        </Link>

        <div className="mt-6">
          <p className="text-sm font-semibold text-orange-600">
            {new Date(post.date).toLocaleDateString("en", { dateStyle: "medium" })} ·{" "}
            {post.author}
          </p>
          <h1 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">
            {post.title}
          </h1>
        </div>

        <div
          className="mt-8 h-72 w-full rounded-2xl bg-cover bg-center bg-gray-100"
          style={{ backgroundImage: `url('${urlForImage(post.coverImage).width(1200).url()}')` }}
        />

        <div className="mt-8 space-y-6">
          <PortableText value={post.content} components={portableTextComponents} />
        </div>

        <div className="mt-12 flex flex-col gap-3 rounded-2xl border border-gray-100 bg-gray-50 p-6 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left">
          <div>
            <h3 className="text-base font-bold">Hungry yet?</h3>
            <p className="mt-1 text-sm text-gray-600">
              Browse the menu and order in minutes.
            </p>
          </div>

          <Link
            href="/book_meal"
            className="inline-flex items-center justify-center rounded-md bg-orange-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-orange-600"
          >
            Browse Menu
          </Link>
        </div>
      </div>
    </main>
  );
}
