import FirecrawlApp from "@mendable/firecrawl-js";
import { env } from "@/env";
import { ExtractSchemaType, type ScraperResponse } from "./types";
import { type ProductData } from "../services/types";

export class ProductScraper {
  private static app = new FirecrawlApp({ apiKey: env.FIRECRAWL_API_KEY });

  /**
   * Scrapes product data from a given URL
   */
  static async scrapeProduct(url: string): Promise<ProductData> {
    try {
      const result = await this.app.scrapeUrl(url, {
        formats: ["extract"],
        extract: { schema: ExtractSchemaType },
      }) as ScraperResponse;

      if (!result.success || !result.data) {
        throw new Error(result.error ?? "Failed to scrape product data");
      }

      // Transform the scraped data into ProductData format
      return {
        url: result.data.metadata.sourceURL,
        timestamp: new Date(),
        name: result.data.extract.name,
        price: result.data.extract.price,
        currency: result.data.extract.currency,
        main_image_url: result.data.extract.main_image_url,
        is_available: result.data.extract.is_available,
      };
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Scraping failed: ${error.message}`);
      }
      throw new Error("Unknown error occurred while scraping");
    }
  }
}
