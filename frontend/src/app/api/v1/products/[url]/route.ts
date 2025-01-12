import { type NextRequest } from "next/server";
import { StatusCodes } from "http-status-codes";
import { auth } from "@/server/auth";
import { ProductService } from "../services";

export async function GET(
  request: NextRequest,
  { params }: { params: { url: string } }
) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return Response.json(
        { message: "Unauthorized" },
        { status: StatusCodes.UNAUTHORIZED }
      );
    }

    const url = decodeURIComponent(params.url);
    const priceHistory = await ProductService.getPriceHistory(url);

    if (!priceHistory || priceHistory.length === 0) {
      return Response.json(
        { message: "No price history found for this product" },
        { status: StatusCodes.NOT_FOUND }
      );
    }

    const latest = priceHistory[0];
    if (!latest?.price || !latest?.name) {
      return Response.json(
        { message: "Invalid price history data" },
        { status: StatusCodes.INTERNAL_SERVER_ERROR }
      );
    }

    return Response.json({
      product: {
        url: latest.product_url,
        latest_price: latest.price,
        latest_name: latest.name,
        currency: latest.currency ?? null,
        is_available: latest.is_available ?? true,
        main_image_url: latest.main_image_url ?? null,
      },
      price_history: priceHistory,
    }, { status: StatusCodes.OK });

  } catch (error) {
    console.error("Error fetching product details:", error);
    return Response.json(
      { message: "Internal Server Error" },
      { status: StatusCodes.INTERNAL_SERVER_ERROR }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { url: string } }
) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return Response.json(
        { message: "Unauthorized" },
        { status: StatusCodes.UNAUTHORIZED }
      );
    }

    const url = decodeURIComponent(params.url);
    const success = await ProductService.removeProduct(url, session.user.id);

    if (!success) {
      return Response.json(
        { message: "Product not found" },
        { status: StatusCodes.NOT_FOUND }
      );
    }

    return new Response(null, { status: StatusCodes.NO_CONTENT });

  } catch (error) {
    console.error("Error removing product:", error);
    return Response.json(
      { message: "Internal Server Error" },
      { status: StatusCodes.INTERNAL_SERVER_ERROR }
    );
  }
}
