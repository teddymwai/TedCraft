import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const works = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/works' }),
  schema: z.object({
    title: z.string(),
    tagline: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    featured: z.boolean().default(false),
    category: z.string(),
    tags: z.array(z.string()).default([]),
    github: z.string().optional(),
    demo: z.string().optional(),
    stats: z
      .array(
        z.object({
          label: z.string(),
          value: z.string(),
        })
      )
      .optional(),
  }),
});

const learnings = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/learnings' }),
  schema: z.object({
    title: z.string(),
    subtitle: z.string(),
    date: z.coerce.date(),
    topic: z.string(),
    curveLevel: z.enum(['Steep', 'Moderate', 'Smooth']).default('Moderate'),
    obstacle: z.string(),
    breakthrough: z.string(),
    takeaways: z.array(z.string()).default([]),
    tags: z.array(z.string()).default([]),
  }),
});

const posts = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    readTime: z.string().default('5 min read'),
    draft: z.boolean().default(false),
  }),
});

export const collections = { works, learnings, posts };
