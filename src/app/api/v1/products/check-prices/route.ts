import { NextResponse } from "next/server";
import { db } from "@/server/db";
import { ProductScraper } from "../scraper";
import { sendPriceAlert } from "@/lib/notifications";

const PRICE_DROP_THRESHOLD = 0.05;

export async function POST(req: Request) {
  try {
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
        const lastRecord = product.prices[0];
        if (!lastRecord) continue;

        const lastPrice = lastRecord.price;
        const currency = lastRecord.currency;

        const updatedProduct = await ProductScraper.scrapeProduct(product.url);

        if (!updatedProduct.is_available) {
          updatedProduct.price = lastPrice;
          console.log(
            `Product ${updatedProduct.name} is currently unavailable`,
          );
        }

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

        if (updatedProduct.is_available && lastPrice > 0) {
          const currentPrice = updatedProduct.price;
          const priceDrop = (lastPrice - currentPrice) / lastPrice;

          if (priceDrop >= PRICE_DROP_THRESHOLD) {
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
