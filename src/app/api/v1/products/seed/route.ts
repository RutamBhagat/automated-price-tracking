import { type NextRequest } from "next/server";
import { StatusCodes } from "http-status-codes";
import { db } from "@/server/db";
import { consola } from "consola";

export async function POST(request: NextRequest) {
  try {
    consola.start("Starting historical price seeding process...");

    // Get all products with their oldest price history
    const products = await db.product.findMany({
      include: {
        prices: {
          orderBy: {
            timestamp: "asc", // Get oldest first
          },
          take: 1,
        },
      },
    });

    consola.info(`Found ${products.length} products to process`);
    const results = [];

    for (const [index, product] of products.entries()) {
      consola.info(
        `Processing product ${index + 1}/${products.length}: ${product.url}`,
      );

      const oldestPrice = product.prices[0];
      if (!oldestPrice) {
        consola.warn(
          `Skipping product ${product.url} - no existing price data`,
        );
        continue;
      }

      // Get the oldest timestamp
      const oldestTimestamp = oldestPrice.timestamp;
      const dates = [];

      // Generate dates for 12 months before the oldest price (1st and 15th of each month)
      for (let i = 1; i <= 12; i++) {
        const month = new Date(oldestTimestamp);
        month.setMonth(month.getMonth() - i);

        // 1st of the month
        const firstDay = new Date(month.getFullYear(), month.getMonth(), 1);
        if (firstDay < oldestTimestamp) {
          dates.push(firstDay);
        }

        // 15th of the month
        const fifteenthDay = new Date(
          month.getFullYear(),
          month.getMonth(),
          15,
        );
        if (fifteenthDay < oldestTimestamp) {
          dates.push(fifteenthDay);
        }
      }

      // Sort dates from oldest to newest
      dates.sort((a, b) => a.getTime() - b.getTime());

      // Check for existing records on these dates to avoid duplicates
      for (const date of dates) {
        const existingRecord = await db.priceHistory.findFirst({
          where: {
            product_url: product.url,
            timestamp: date,
          },
        });

        if (existingRecord) {
          consola.info(
            `Skipping date ${date.toISOString()} - record already exists`,
          );
          continue;
        }

        // Generate price with ±20% random variation
        const variation = (Math.random() * 40 - 20) / 100; // Random number between -0.2 and 0.2
        const historicalPrice = Math.round(oldestPrice.price * (1 + variation));

        const priceHistory = await db.priceHistory.create({
          data: {
            product_url: product.url,
            price: historicalPrice,
            name: oldestPrice.name,
            currency: oldestPrice.currency,
            main_image_url: oldestPrice.main_image_url || null,
            is_available: true,
            timestamp: date,
          },
        });

        results.push({
          url: product.url,
          date: date.toISOString(),
          price: priceHistory.price,
          original_price: oldestPrice.price,
          variation_percentage: Math.round(variation * 100),
        });
      }

      consola.success(
        `Completed processing product ${index + 1}/${products.length} - Added ${results.length} historical prices`,
      );
    }

    consola.success(
      `Seeding completed successfully! Generated ${results.length} price history records`,
    );

    return Response.json(
      {
        message: "Historical prices seeded successfully",
        total_records: results.length,
        details: results,
      },
      { status: StatusCodes.OK },
    );
  } catch (error) {
    consola.error("Error seeding historical prices:", error);
    return Response.json(
      { message: "Internal Server Error" },
      { status: StatusCodes.INTERNAL_SERVER_ERROR },
    );
  }
}
