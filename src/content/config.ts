import { defineCollection, z } from 'astro:content';

const shows = defineCollection({
  type: 'content',
  schema: z.object({
    dateDisplay:  z.string(),
    sortDate:     z.union([z.string(), z.date()]).transform(v =>
      v instanceof Date ? v.toISOString().slice(0, 10) : v
    ),
    venue:        z.string(),
    city:         z.string(),
    country:      z.string(),
    note:         z.string().optional().default(''),
    ticketUrl:    z.string().optional(),
    past:         z.boolean().default(false),
  }),
});

const videos = defineCollection({
  type: 'content',
  schema: z.object({
    title:      z.string(),
    youtubeUrl: z.string(),
    order:      z.number().default(0),
  }),
});

export const collections = { shows, videos };
