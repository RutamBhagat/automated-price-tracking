import { z } from "zod";

export const ProductDataSchema = z.object({
  url: z.string().url(),
  timestamp: z.date(),
  name: z.string(),
  price: z.number().positive(),
  currency: z.string(),
  main_image_url: z.string().url().nullable(),
  is_available: z.boolean().default(true),
});

export type ProductData = z.infer<typeof ProductDataSchema>;
