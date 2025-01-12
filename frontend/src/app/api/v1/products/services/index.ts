import { db } from "@/server/db";
import { type ProductData, ProductDataSchema } from "./types";

export class ProductService {
  /**
   * Add a new product to track
   */
  static async addProduct(url: string, userId: string) {
    return await db.$transaction(async (tx) => {
      // Ensure product exists
      await tx.product.upsert({
        where: { url },
        update: {},
        create: { url },
      });

      // Create user-product relationship
      return await tx.userProduct.upsert({
        where: {
          userId_productUrl: {
            userId,
            productUrl: url,
          },
        },
        update: {},
        create: {
          userId,
          productUrl: url,
        },
      });
    });
  }

  /**
   * Add a price history entry for a product
   */
  static async addPrice(productData: ProductData) {
    const validatedData = ProductDataSchema.parse(productData);

    return await db.$transaction(async (tx) => {
      // Ensure product exists
      await tx.product.upsert({
        where: { url: validatedData.url },
        update: {},
        create: { url: validatedData.url },
      });

      // Create price history entry
      return await tx.priceHistory.create({
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
    });
  }

  /**
   * Remove a product and all its price history entries
   */
  static async removeProduct(url: string, userId: string): Promise<boolean> {
    try {
      await db.$transaction(async (tx) => {
        // Remove the user-product association
        await tx.userProduct.delete({
          where: {
            userId_productUrl: {
              userId,
              productUrl: url,
            },
          },
        });

        // Check if this was the last user tracking this product
        const remainingTrackers = await tx.userProduct.count({
          where: {
            productUrl: url,
          },
        });

        // If no other users are tracking this product, remove it and its price history
        if (remainingTrackers === 0) {
          await tx.product.delete({
            where: {
              url,
            },
          });
        }
      });
      return true;
    } catch (error) {
      console.error("Error removing product:", error);
      return false;
    }
  }

  /**
   * Get price history for a product
   */
  static async getPriceHistory(url: string) {
    try {
      // Validate URL
      if (!url) throw new Error("URL is required");

      // First check if product exists
      const product = await db.product.findUnique({
        where: { url },
      });

      if (!product) {
        throw new Error("Product not found");
      }

      return await db.priceHistory.findMany({
        where: {
          product_url: url,
        },
        orderBy: {
          timestamp: "desc",
        },
      });
    } catch (error) {
      console.error("Error fetching price history:", error);
      throw error;
    }
  }

  /**
   * Get all tracked products for a user
   */
  static async getAllProducts(userId: string) {
    try {
      if (!userId) throw new Error("User ID is required");

      return await db.userProduct.findMany({
        where: {
          userId,
        },
        select: {
          product: {
            include: {
              prices: {
                orderBy: {
                  timestamp: "desc"
                }
              }
            }
          }
        }
      });
    } catch (error) {
      console.error("Error fetching user products:", error);
      throw error;
    }
  }

  /**
   * Get all products with their latest prices
   */
  static async getAllProductsPublic() {
    try {
      return await db.product.findMany({
        include: {
          prices: {
            orderBy: {
              timestamp: "desc"
            },
            take: 1  // Only get the latest price
          },
          _count: {
            select: {
              userProducts: true  // Count how many users are tracking this product
            }
          }
        }
      });
    } catch (error) {
      console.error("Error fetching all products:", error);
      throw error;
    }
  }
}
