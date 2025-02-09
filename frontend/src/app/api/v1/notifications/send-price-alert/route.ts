import { Resend } from "resend";
import { PriceAlertEmail } from "@/components/emails/price-alert";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

// Use test email only if EMAIL_FROM is not set
const FROM_EMAIL = process.env.EMAIL_FROM || "onboarding@resend.dev";

export async function POST(request: Request) {
  try {
    const {
      productName,
      oldPrice,
      newPrice,
      url,
      recipientEmail,
      currency = "INR",
      mainImageUrl,
    } = await request.json();

    const { data, error } = await resend.emails.send({
      from: `FireCrawl <${FROM_EMAIL}>`,
      to: [recipientEmail],
      subject: `Price Drop Alert: ${productName}`,
      react: PriceAlertEmail({
        productName,
        oldPrice,
        newPrice,
        url,
        currency,
        mainImageUrl,
      }),
    });

    if (error) {
      return NextResponse.json({ error }, { status: 400 });
    }

    return NextResponse.json({ data });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
