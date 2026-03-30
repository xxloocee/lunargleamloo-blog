import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
  loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    categories: z.array(z.string()),
    tags: z.array(z.string()),
    cover: z.string().optional(),
    draft: z.boolean().default(false),
    pinned: z.boolean().default(false),
  }),
});

const shiyi = defineCollection({
  loader: glob({ base: './src/content/shiyi', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    author: z.string(),
    source: z.string(),
    platform: z.string(),
    pubDate: z.coerce.date(),
    tags: z.array(z.string()),
    cover: z.string().optional(),
  }),
});

export const collections = { blog, shiyi };
