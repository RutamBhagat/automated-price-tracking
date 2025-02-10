import { z } from "zod";

export const ProductResponseSchema = z.object({
  url: z.string(),
  latest_price: z.number().nullable(),
  latest_name: z.string().nullable(),
  currency: z.string().nullable(),
  is_available: z.boolean().default(true),
  main_image_url: z.string().url().nullable(),
});

export type ProductResponse = z.infer<typeof ProductResponseSchema>;

export const AddProductSchema = z.object({
  url: z
    .string()
    .url()
    .refine((url) => url.startsWith("http://") || url.startsWith("https://"), {
      message: "URL must use HTTP or HTTPS protocol",
    }),
});