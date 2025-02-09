import { type NextRequest } from "next/server";
import { StatusCodes } from "http-status-codes";
import { auth } from "@/server/auth";
import { ProductService } from "../services";
import { AddProductSchema } from "../types";
import { z } from "zod";

const QuerySchema = z.object({
  limit: z.coerce.number().min(1).optional(),
  offset: z.coerce.number().min(0).optional().default(0),
});

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
    const searchParams = Object.fromEntries(request.nextUrl.searchParams);
    const { limit, offset } = QuerySchema.parse(searchParams);

    try {
      const priceHistory = await ProductService.getPriceHistory(url);

      // Apply pagination if limit is specified
      const paginatedHistory = limit
        ? priceHistory.slice(offset, offset + limit)
        : priceHistory;

      return Response.json(
        {
          total: priceHistory.length,
          items: paginatedHistory,
        },
        { status: StatusCodes.OK },
      );
    } catch (error) {
      if (error instanceof Error && error.message === "Product not found") {
        return Response.json(
          { message: "Product not found" },
          { status: StatusCodes.NOT_FOUND },
        );
      }
      throw error;
    }
  } catch (error) {
    console.error("Error getting price history:", error);

    if (error instanceof z.ZodError) {
      return Response.json(
        { message: "Validation error", details: error.errors },
        { status: StatusCodes.UNPROCESSABLE_ENTITY },
      );
    }

    return Response.json(
      { message: "Internal Server Error" },
      { status: StatusCodes.INTERNAL_SERVER_ERROR },
    );
  }
}
