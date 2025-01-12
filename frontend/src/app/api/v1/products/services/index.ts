import { db } from "@/server/db";
import { type ProductData, ProductDataSchema } from "./types";

export class ProductService {
  /**
   * Add a new product to track
   */
  static async addProduct(url: string, userId: string) {
    return await db.product.upsert({
      where: { url },
      update: { userId },
      create: { url, userId },
    });
  }

  /**
   * Add a price history entry for a product
   */
  static async addPrice(productData: ProductData) {
    const validatedData = ProductDataSchema.parse(productData);

    return await db.priceHistory.create({
      data: {
        id: `${validatedData.url}_${validatedData.timestamp.getTime()}`,
        product_url: validatedData.url,
        name: validatedData.name,
        price: validatedData.price,
        currency: validatedData.currency,
        main_image_url: validatedData.main_image_url,
        timestamp: validatedData.timestamp,
        is_available: validatedData.is_available,
      },
    });
  }

  /**
   * Remove a product and all its price history entries
   */
  static async removeProduct(url: string, userId: string): Promise<boolean> {
    try {
      await db.product.delete({
        where: {
          url,
          userId,
        },
      });
      return true;
    } catch (error) {
      console.log("error", error);
      return false;
    }
  }

  /**
   * Get price history for a product
   */
  static async getPriceHistory(url: string, userId: string) {
    return await db.priceHistory.findMany({
      where: {
        product_url: url,
        product: {
          userId,
        },
      },
      orderBy: {
        timestamp: "desc",
      },
    });
  }

  /**
   * Get all tracked products for a user
   */
  static async getAllProducts(userId: string) {
    return await db.product.findMany({
      where: {
        userId,
      },
      include: {
        prices: true,
      },
    });
  }
}
