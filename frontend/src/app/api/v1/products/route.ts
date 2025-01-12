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
        { status: StatusCodes.UNAUTHORIZED }
      );
    }

    const products = await ProductService.getAllProducts(session.user.id);
    return Response.json(products, { status: StatusCodes.OK });
  } catch (error) {
    console.error("Error fetching products:", error);
    return Response.json(
      { message: "Internal Server Error" },
      { status: StatusCodes.INTERNAL_SERVER_ERROR }
    );
  }
}

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

    const productData = await ProductScraper.scrapeProduct(url);
    await ProductService.addProduct(url, session.user.id);
    await ProductService.addPrice(productData);

    return Response.json({
      url: productData.url,
      latest_price: productData.price,
      latest_name: productData.name,
      currency: productData.currency,
      is_available: productData.is_available,
      main_image_url: productData.main_image_url,
    }, { status: StatusCodes.CREATED });

  } catch (error) {
    console.error("Error adding product:", error);

    if (error instanceof z.ZodError) {
      return Response.json(
        { 
          message: "Validation error",
          details: error.errors 
        },
        { status: StatusCodes.UNPROCESSABLE_ENTITY }
      );
    }

    if (error instanceof Error) {
      return Response.json(
        { message: error.message },
        { status: StatusCodes.SERVICE_UNAVAILABLE }
      );
    }

    return Response.json(
      { message: "Internal Server Error" },
      { status: StatusCodes.INTERNAL_SERVER_ERROR }
    );
  }
}
