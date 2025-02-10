import { Resend } from "resend";
import { PriceAlertEmail as PriceAlert } from "@/components/emails/price-alert";
import { StatusCodes } from "http-status-codes";
import { z } from "zod";

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM_EMAIL = process.env.EMAIL_FROM || "onboarding@resend.dev";

const PriceAlertSchema = z.object({
  productName: z.string().min(1, "Product name is required"),
  oldPrice: z.number().positive("Old price must be positive"),
  newPrice: z.number().positive("New price must be positive"),
  url: z.string().url("Invalid URL"),
  recipientEmail: z.string().email("Invalid email address"),
  currency: z.string().default("USD"),
  mainImageUrl: z.string().url("Invalid image URL").optional(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = PriceAlertSchema.parse(body);

    const dropPercentage =
      ((data.oldPrice - data.newPrice) / data.oldPrice) * 100;

    const { data: emailData, error } = await resend.emails.send({
      from: `FireCrawl <${FROM_EMAIL}>`,
      to: [data.recipientEmail],
      subject: `Price Drop Alert: ${data.productName} (-${dropPercentage.toFixed(1)}%)`,
      react: PriceAlert({
        ...data,
        dropPercentage,
      }),
    });

    if (error) {
      console.error("Error sending email:", error);
      return Response.json(
        { message: "Failed to send email", error: error.message },
        { status: StatusCodes.SERVICE_UNAVAILABLE },
      );
    }

    return Response.json(
      {
        message: "Price alert sent successfully",
        data: emailData,
        details: {
          recipientEmail: data.recipientEmail,
          productName: data.productName,
          priceDropPercentage: dropPercentage,
        },
      },
      { status: StatusCodes.OK },
    );
  } catch (error) {
    console.error("Error processing price alert:", error);

    if (error instanceof z.ZodError) {
      return Response.json(
        {
          message: "Validation error",
          details: error.errors,
        },
        { status: StatusCodes.UNPROCESSABLE_ENTITY },
      );
    }

    return Response.json(
      { message: "Internal Server Error" },
      { status: StatusCodes.INTERNAL_SERVER_ERROR },
    );
  }
}
