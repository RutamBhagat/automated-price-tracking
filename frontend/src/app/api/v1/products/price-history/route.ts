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
        { status: StatusCodes.UNAUTHORIZED }
      );
    }

    // Parse URL from body
    const body = await request.json();
    const { url } = AddProductSchema.parse(body);

    // Parse query parameters
    const searchParams = Object.fromEntries(request.nextUrl.searchParams);
    const { limit, offset } = QuerySchema.parse(searchParams);

    const priceHistory = await ProductService.getPriceHistory(url);
    if (!priceHistory || priceHistory.length === 0) {
      return Response.json(
        { message: "Product not found" },
        { status: StatusCodes.NOT_FOUND }
      );
    }

    // Apply pagination if limit is specified
    const paginatedHistory = limit 
      ? priceHistory.slice(offset, offset + limit)
      : priceHistory;

    return Response.json(paginatedHistory, { status: StatusCodes.OK });

  } catch (error) {
    console.error("Error getting price history:", error);

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
