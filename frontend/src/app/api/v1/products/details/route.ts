import { type NextRequest } from "next/server";
import { StatusCodes } from "http-status-codes";
import { auth } from "@/server/auth";
import { ProductService } from "../services";
import { AddProductSchema, type ProductResponse } from "../types";
import { z } from "zod";

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return Response.json(
        { message: "Unauthorized" },
        { status: StatusCodes.UNAUTHORIZED }
      );
    }

    const body = await request.json();
    const { url } = AddProductSchema.parse(body);

    try {
      const priceHistory = await ProductService.getPriceHistory(url);
      
      if (!priceHistory || priceHistory.length === 0) {
        return Response.json(
          { message: "No price history found for this product" },
          { status: StatusCodes.NOT_FOUND }
        );
      }

      const latest = priceHistory[0] ?? null;
      if (!latest) {
        return Response.json(
          { message: "No price history available" },
          { status: StatusCodes.NOT_FOUND }
        );
      }

      const product: ProductResponse = {
        url: url,
        latest_price: latest.price,
        latest_name: latest.name,
        currency: latest.currency,
        is_available: latest.is_available,
        main_image_url: latest.main_image_url,
      };

      return Response.json({
        product,
        price_history: priceHistory,
      }, { status: StatusCodes.OK });

    } catch (error) {
      if (error instanceof Error && error.message === "Product not found") {
        return Response.json(
          { message: "Product not found" },
          { status: StatusCodes.NOT_FOUND }
        );
      }
      throw error;
    }

  } catch (error) {
    console.error("Error getting product details:", error);

    if (error instanceof z.ZodError) {
      return Response.json(
        { message: "Validation error", details: error.errors },
        { status: StatusCodes.UNPROCESSABLE_ENTITY }
      );
    }

    return Response.json(
      { message: "Internal Server Error" },
      { status: StatusCodes.INTERNAL_SERVER_ERROR }
    );
  }
}
