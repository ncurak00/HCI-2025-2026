import type { Image, PortableTextBlock } from "sanity";
import { client } from "./client";

export type SanityBlock =
  | (PortableTextBlock & { _type: "block" })
  | { _type: "image"; _key: string; asset: Image["asset"]; caption?: string }
  | { _type: "videoEmbed"; _key: string; url: string; caption?: string }
  | { _type: "codeSnippet"; _key: string; language: string; code: string };

export type SanityPost = {
  _id: string;
  title: string;
  slug: string;
  author: string;
  date: string;
  excerpt: string;
  coverImage: Image;
  content: SanityBlock[];
};

const POST_FIELDS = `
  _id,
  title,
  "slug": slug.current,
  author,
  date,
  excerpt,
  coverImage,
  content
`;

export async function getAllPosts(): Promise<SanityPost[]> {
  return client.fetch(
    `*[_type == "post"] | order(date desc) { ${POST_FIELDS} }`,
  );
}

export async function getLatestPosts(limit: number): Promise<SanityPost[]> {
  return client.fetch(
    `*[_type == "post"] | order(date desc) [0...$limit] { ${POST_FIELDS} }`,
    { limit },
  );
}

export async function getPostBySlug(slug: string): Promise<SanityPost | null> {
  return client.fetch(
    `*[_type == "post" && slug.current == $slug][0] { ${POST_FIELDS} }`,
    { slug },
  );
}

export async function getAllPostSlugs(): Promise<string[]> {
  const slugs: { slug: string }[] = await client.fetch(
    `*[_type == "post"]{ "slug": slug.current }`,
  );

  return slugs.map((s) => s.slug);
}
