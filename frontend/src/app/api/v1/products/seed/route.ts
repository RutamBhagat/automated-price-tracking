import { type NextRequest } from "next/server";
import { StatusCodes } from "http-status-codes";
import { ProductService } from "../services";
import { db } from "@/server/db";

export async function POST(request: NextRequest) {
  try {
    // Get all products
    const userProducts = await db.userProduct.findMany({
      include: {
        product: {
          include: {
            prices: {
              orderBy: {
                timestamp: "desc",
              },
              take: 1,
            },
          },
        },
      },
    });
    const results = [];

    for (const userProduct of userProducts) {
      const product = userProduct.product;
      const latestPrice = product.prices[0];

      if (!latestPrice?.price || !latestPrice.name || !latestPrice.currency)
        continue;

      // Generate 24 historical dates (1st and 15th of each month)
      const dates = [];
      const now = new Date();
      for (let i = 0; i < 12; i++) {
        const month = new Date(now.getFullYear(), now.getMonth() - i, 1);
        dates.push(new Date(month.setDate(1)));
        dates.push(new Date(month.setDate(15)));
      }

      // Sort dates from oldest to newest
      dates.sort((a, b) => a.getTime() - b.getTime());

      // Generate prices with random variations
      for (const date of dates) {
        // Random variation between -15% and +10% of current price
        const variation = (Math.random() * 25 - 15) / 100;
        const historicalPrice = Math.round(latestPrice.price * (1 + variation));

        // Add historical price
        const priceHistory = await db.priceHistory.create({
          data: {
            product_url: product.url,
            price: historicalPrice,
            name: latestPrice.name,
            currency: latestPrice.currency,
            main_image_url: latestPrice.main_image_url || null,
            is_available: true,
            timestamp: date,
          },
        });

        results.push({
          url: product.url,
          date: date.toISOString(),
          price: priceHistory.price,
        });
      }
    }

    return Response.json(
      {
        message: "Historical prices seeded successfully",
        total_records: results.length,
        details: results,
      },
      { status: StatusCodes.OK },
    );
  } catch (error) {
    console.error("Error seeding historical prices:", error);
    return Response.json(
      { message: "Internal Server Error" },
      { status: StatusCodes.INTERNAL_SERVER_ERROR },
    );
  }
}
