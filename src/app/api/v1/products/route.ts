import { type NextRequest } from "next/server";
import { StatusCodes } from "http-status-codes";
import { auth } from "@/server/auth";
import { ProductScraper } from "./scraper";
import { ProductService } from "./services";
import { z } from "zod";
import { AddProductSchema } from "./types";

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return Response.json(
        { message: "Unauthorized" },
        { status: StatusCodes.UNAUTHORIZED },
      );
    }

    const userProducts = await ProductService.getAllProducts(session.user.id);
    // Transform the response to match the expected format
    const products = userProducts.map((up) => ({
      ...up.product,
      latestPrice: up.product.prices[0] ?? null,
    }));

    return Response.json(products, { status: StatusCodes.OK });
  } catch (error) {
    console.error("Error fetching products:", error);
    return Response.json(
      { message: "Internal Server Error" },
      { status: StatusCodes.INTERNAL_SERVER_ERROR },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return Response.json(
        { message: "Unauthorized" },
        { status: StatusCodes.UNAUTHORIZED },
      );
    }

    const body = await request.json();
    const { url } = AddProductSchema.parse(body);

    // First scrape the product
    const productData = await ProductScraper.scrapeProduct(url);

    // Then create/update the product and user association
    const userProduct = await ProductService.addProduct(
      productData.url,
      session.user.id,
    );

    // Finally add the price history
    const priceHistory = await ProductService.addPrice(productData);

    // Return the combined data
    return Response.json(
      {
        url: userProduct.productUrl,
        latest_price: priceHistory.price,
        latest_name: priceHistory.name,
        currency: priceHistory.currency,
        is_available: priceHistory.is_available,
        main_image_url: priceHistory.main_image_url,
        tracked_since: userProduct.createdAt,
      },
      { status: StatusCodes.CREATED },
    );
  } catch (error) {
    console.error("Error adding product:", error);

    if (error instanceof z.ZodError) {
      return Response.json(
        {
          message: "Validation error",
          details: error.errors,
        },
        { status: StatusCodes.UNPROCESSABLE_ENTITY },
      );
    }

    if (error instanceof Error) {
      return Response.json(
        { message: error.message },
        { status: StatusCodes.SERVICE_UNAVAILABLE },
      );
    }

    return Response.json(
      { message: "Internal Server Error" },
      { status: StatusCodes.INTERNAL_SERVER_ERROR },
    );
  }
}
