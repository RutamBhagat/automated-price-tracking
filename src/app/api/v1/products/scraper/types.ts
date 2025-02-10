import { z } from "zod";

export const ExtractSchemaType = z.object({
  name: z.string().describe("The product name/title"),
  price: z.number().describe("The current price of the product"),
  currency: z.string().describe("Currency code (USD, EUR, etc)"),
  main_image_url: z
    .string()
    .nullable()
    .describe("The URL of the main image of the product"),
  is_available: z
    .boolean()
    .default(true)
    .describe("Whether the product is currently available"),
});

export type ExtractSchema = z.infer<typeof ExtractSchemaType>;

export interface ScraperResponse {
  success: boolean;
  warning?: string;
  error?: string;
  metadata: {
    sourceURL: string;
    title?: string;
    description?: string;
    language?: string;
    scrapeId: string;
    url: string;
    statusCode: number;
    [key: string]: unknown;
  };
  extract: ExtractSchema;
}
