import { NextResponse } from "next/server";
import { db } from "@/server/db";
import { ProductScraper } from "../scraper";
import { sendPriceAlert } from "@/lib/notifications";

// Threshold percentage for price drop alerts (e.g., 5% = 0.05)
const PRICE_DROP_THRESHOLD = 0.05;

export async function POST(req: Request) {
  try {
    // Get all products with their users
    const products = await db.product.findMany({
      include: {
        prices: {
          orderBy: {
            timestamp: "desc",
          },
        },
        userProducts: {
          include: {
            user: {
              select: {
                email: true,
              },
            },
          },
        },
      },
    });

    const results = [];

    for (const product of products) {
      try {
        // Get the most recent recorded price and currency
        const lastRecord = product.prices[0];
        if (!lastRecord) continue;

        const lastPrice = lastRecord.price;
        const currency = lastRecord.currency;

        // Retrieve updated product data
        const updatedProduct = await ProductScraper.scrapeProduct(product.url);

        // If product is unavailable, keep the last known price
        if (!updatedProduct.is_available) {
          updatedProduct.price = lastPrice;
          console.log(
            `Product ${updatedProduct.name} is currently unavailable`,
          );
        }

        // Add the price to the database
        await db.priceHistory.create({
          data: {
            id: `${updatedProduct.url}_${new Date().toISOString()}`,
            product_url: updatedProduct.url,
            name: updatedProduct.name,
            price: updatedProduct.price,
            currency: updatedProduct.currency,
            main_image_url: updatedProduct.main_image_url || undefined,
            timestamp: new Date(),
            is_available: updatedProduct.is_available,
          },
        });

        results.push({
          url: product.url,
          status: "success",
          message: `Added new price entry for ${updatedProduct.name}`,
        });

        // Only check for price drops if the product is available
        if (updatedProduct.is_available && lastPrice > 0) {
          const currentPrice = updatedProduct.price;
          const priceDrop = (lastPrice - currentPrice) / lastPrice;

          if (priceDrop >= PRICE_DROP_THRESHOLD) {
            // Send alert to each user tracking this product
            for (const userProduct of product.userProducts) {
              if (userProduct.user.email) {
                await sendPriceAlert({
                  productName: updatedProduct.name,
                  oldPrice: lastPrice,
                  newPrice: currentPrice,
                  url: product.url,
                  recipientEmail: userProduct.user.email,
                  currency: currency,
                  mainImageUrl: updatedProduct.main_image_url || undefined,
                });
              }
            }
          }
        }
      } catch (error) {
        console.error(`Error processing product ${product.url}:`, error);
        results.push({
          url: product.url,
          status: "error",
          message: error instanceof Error ? error.message : "Unknown error",
        });
      }
    }

    return NextResponse.json({
      message: "Price check completed",
      results,
    });
  } catch (error) {
    console.error("Error in price check:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
