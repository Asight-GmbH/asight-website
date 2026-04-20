import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Page singletons (JSON data files for each section, per locale)
const pages = defineCollection({
  loader: glob({
    pattern: '**/index.json',
    base: 'src/content/pages',
    generateId: ({ entry }) => entry.replace(/\/index\.json$/, ''),
  }),
  schema: z.any(),
});

const services = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    icon: z.string(),
    order: z.number(),
    highlights: z.array(z.string()),
  }),
});

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.date(),
    author: z.string(),
    excerpt: z.string(),
    tags: z.array(z.string()),
    published: z.boolean().default(true),
    image: z.string().optional(),
    locale: z.string().default('de'),
  }),
});

const testimonials = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string(),
    position: z.string(),
    order: z.number().default(0),
    image: z.string().optional(),
    locale: z.string().default('de'),
    photo: z.string().optional(),
  }),
});

const team = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string(),
    role: z.string(),
    location: z.string(),
    linkedin: z.string().optional(),
    image: z.string().optional(),
    order: z.number(),
    locale: z.string().default('de'),
  }),
});

export const collections = { pages, services, blog, testimonials, team };
