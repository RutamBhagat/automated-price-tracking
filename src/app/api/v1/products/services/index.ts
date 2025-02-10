import { db } from "@/server/db";
import { type ProductData, ProductDataSchema } from "./types";

export class ProductService {
  static async addProduct(url: string, userId: string) {
    return await db.$transaction(async (tx) => {
      await tx.product.upsert({
        where: { url },
        update: {},
        create: { url },
      });

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

  static async addPrice(productData: ProductData) {
    const validatedData = ProductDataSchema.parse(productData);

    return await db.$transaction(async (tx) => {
      await tx.product.upsert({
        where: { url: validatedData.url },
        update: {},
        create: { url: validatedData.url },
      });

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

  static async removeProduct(url: string, userId: string): Promise<boolean> {
    try {
      await db.$transaction(async (tx) => {
        await tx.userProduct.delete({
          where: {
            userId_productUrl: {
              userId,
              productUrl: url,
            },
          },
        });

        const remainingTrackers = await tx.userProduct.count({
          where: {
            productUrl: url,
          },
        });

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

  static async getPriceHistory(url: string) {
    try {
      if (!url) throw new Error("URL is required");

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

  static async getAllProducts(userId: string) {
    try {
      if (!userId) throw new Error("User ID is required");

      return await db.userProduct.findMany({
        where: {
          userId,
        },
        select: {
          createdAt: true,
          product: {
            include: {
              prices: {
                orderBy: {
                  timestamp: "desc",
                },
              },
            },
          },
        },
      });
    } catch (error) {
      console.error("Error fetching user products:", error);
      throw error;
    }
  }

  static async getAllProductsPublic() {
    try {
      return await db.product.findMany({
        include: {
          prices: {
            orderBy: {
              timestamp: "desc",
            },
            take: 1,
          },
          _count: {
            select: {
              userProducts: true,
            },
          },
        },
      });
    } catch (error) {
      console.error("Error fetching all products:", error);
      throw error;
    }
  }
}
