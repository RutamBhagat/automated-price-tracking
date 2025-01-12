import { type NextRequest } from "next/server";
import { StatusCodes } from "http-status-codes";
import { auth } from "@/server/auth";
import { ProductService } from "../services";
import { AddProductSchema } from "../types";
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

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const body = await request.json();
    const { url } = AddProductSchema.parse(body);

    const success = await ProductService.removeProduct(url, session.user.id);
    if (!success) {
      return Response.json(
        { message: "Product not found" },
        { status: StatusCodes.NOT_FOUND }
      );
    }

    return new Response(null, { status: StatusCodes.NO_CONTENT });

  } catch (error) {
    console.error("Error deleting product:", error);

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
