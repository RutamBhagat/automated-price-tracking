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
    const products = userProducts.map((up) => {
      const latestPrice = up.product.prices[0];
      return {
        url: up.product.url,
        latest_price: latestPrice?.price ?? null,
        latest_name: latestPrice?.name ?? null,
        currency: latestPrice?.currency ?? null,
        is_available: latestPrice?.is_available ?? true,
        main_image_url: latestPrice?.main_image_url ?? null,
        tracked_since: up.createdAt ?? null,
      };
    });

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

    const productData = await ProductScraper.scrapeProduct(url);

    const userProduct = await ProductService.addProduct(
      productData.url,
      session.user.id,
    );

    const priceHistory = await ProductService.addPrice(productData);

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
