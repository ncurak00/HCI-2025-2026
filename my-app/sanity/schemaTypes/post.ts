import { defineField, defineType } from "sanity";

export const post = defineType({
  name: "post",
  title: "Blog Post",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "author",
      title: "Author",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "date",
      title: "Publish date",
      type: "date",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "excerpt",
      title: "Excerpt",
      description: "Short summary shown on the blog list and homepage.",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required().max(220),
    }),
    defineField({
      name: "coverImage",
      title: "Cover image",
      type: "image",
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "content",
      title: "Content",
      description: "Mix paragraphs, images, videos, and code snippets in any order.",
      type: "array",
      of: [
        {
          type: "block",
          title: "Paragraph",
        },
        {
          type: "image",
          title: "Image",
          options: { hotspot: true },
          fields: [{ name: "caption", title: "Caption", type: "string" }],
        },
        {
          type: "object",
          name: "videoEmbed",
          title: "Video",
          fields: [
            {
              name: "url",
              title: "Video URL",
              description: "YouTube link or direct .mp4 link.",
              type: "url",
              validation: (Rule) => Rule.required(),
            },
            { name: "caption", title: "Caption", type: "string" },
          ],
          preview: {
            select: { subtitle: "url" },
            prepare: ({ subtitle }) => ({ title: "Video", subtitle }),
          },
        },
        {
          type: "object",
          name: "codeSnippet",
          title: "Code snippet",
          fields: [
            {
              name: "language",
              title: "Language",
              type: "string",
              initialValue: "typescript",
            },
            {
              name: "code",
              title: "Code",
              type: "text",
              rows: 10,
              validation: (Rule) => Rule.required(),
            },
          ],
          preview: {
            select: { subtitle: "language" },
            prepare: ({ subtitle }) => ({ title: "Code snippet", subtitle }),
          },
        },
      ],
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "author", media: "coverImage" },
  },
});
