import { z } from "zod";
import { type NextRequest } from "next/server";
import { auth } from "@/server/auth";
import { ProductScraper } from "./scraper";
import { ProductService } from "./services";
import { AddProductSchema } from "./types";

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return Response.json({ message: "Unauthorized" }, { status: 401 });
    }

    const products = await ProductService.getAllProducts(session.user.id);
    return Response.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    return Response.json({ message: "Internal server error" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return Response.json({ message: "Unauthorized" }, { status: 401 });
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const body = await request.json();
    const { url } = AddProductSchema.parse(body);

    // Scrape product data
    const productData = await ProductScraper.scrapeProduct(url);

    // Add product and initial price data
    await ProductService.addProduct(productData.url, session.user.id);
    await ProductService.addPrice(productData);

    return Response.json(
      {
        url: productData.url,
        latest_price: productData.price,
        latest_name: productData.name,
        currency: productData.currency,
        is_available: productData.is_available,
        main_image_url: productData.main_image_url,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error adding product:", error);

    if (error instanceof z.ZodError) {
      return Response.json(
        {
          message: "Validation error",
          details: error.errors,
        },
        { status: 422 },
      );
    }

    if (error instanceof Error) {
      return Response.json({ message: error.message }, { status: 503 });
    }

    return Response.json({ message: "Internal server error" }, { status: 500 });
  }
}
