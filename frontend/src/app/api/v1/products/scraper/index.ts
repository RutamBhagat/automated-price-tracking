import FirecrawlApp from "@mendable/firecrawl-js";
import { env } from "@/env";
import { ExtractSchemaType, type ScraperResponse } from "./types";
import { type ProductData } from "../services/types";
import consola from "consola";

export class ProductScraper {
  private static app = new FirecrawlApp({ apiKey: env.FIRECRAWL_API_KEY });

  /**
   * Scrapes product data from a given URL
   */
  static async scrapeProduct(url: string): Promise<ProductData> {
    try {
      const result = (await this.app.scrapeUrl(url, {
        formats: ["extract"],
        extract: { schema: ExtractSchemaType },
      })) as ScraperResponse;

      if (!result.success) {
        throw new Error(result.error ?? "Failed to scrape product data");
      }

      if (!result.extract) {
        throw new Error("No product data found in response");
      }

      // Transform the scraped data into ProductData format
      const productData = {
        url: result.metadata.sourceURL,
        timestamp: new Date(),
        name: result.extract.name,
        price: result.extract.price,
        currency: result.extract.currency,
        main_image_url: result.extract.main_image_url,
        is_available: result.extract.is_available,
      };

      return productData;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Scraping failed: ${error.message}`);
      }
      throw new Error("Unknown error occurred while scraping");
    }
  }
}
