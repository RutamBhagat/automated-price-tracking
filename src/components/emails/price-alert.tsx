import * as React from "react";
import {
  Html,
  Body,
  Container,
  Tailwind,
  Text,
  Link,
  Img,
  Head,
} from "@react-email/components";

interface PriceAlertEmailProps {
  productName: string;
  oldPrice: number;
  newPrice: number;
  url: string;
  currency: string;
  mainImageUrl?: string;
  dropPercentage: number;
}

export const PriceAlertEmail: React.FC<Readonly<PriceAlertEmailProps>> = ({
  productName,
  oldPrice,
  newPrice,
  url,
  currency,
  mainImageUrl,
  dropPercentage,
}) => {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
  });

  const formattedOldPrice = formatter.format(oldPrice);
  const formattedNewPrice = formatter.format(newPrice);

  return (
    <Html>
      <Head />
      <Tailwind>
        <Body className="mx-auto my-0 bg-[#f0f4f8] font-sans">
          <Container className="mx-auto my-[20px] max-w-[600px] overflow-hidden rounded-xl bg-white shadow-lg">
            <div className="bg-[#1e3a8a] px-4 py-8 text-center">
              <Text className="m-0 text-2xl tracking-wide text-white">
                🔥 Price Drop Alert! 🔥
              </Text>
            </div>

            <div className="p-8">
              <Text className="mb-5 text-center text-2xl font-bold text-[#1a202c]">
                {productName}
              </Text>

              <div className="rounded-xl border-2 border-[#e2e8f0] bg-[#f7fafc] p-6">
                <div className="flex flex-col gap-6 md:flex-row">
                  {mainImageUrl && (
                    <div className="md:w-[200px]">
                      <Img
                        src={mainImageUrl}
                        alt={productName}
                        className="h-auto w-full rounded-lg"
                      />
                    </div>
                  )}

                  <div className="flex-1 text-center">
                    <Text className="inline-block rounded-lg bg-[#fef2f2] px-4 py-2 text-xl font-bold text-[#dc2626]">
                      -{dropPercentage.toFixed(1)}% Off!
                    </Text>

                    <Text className="my-4 text-lg text-[#64748b] line-through">
                      {formattedOldPrice}
                    </Text>

                    <Text className="text-3xl font-extrabold text-[#0f172a]">
                      {formattedNewPrice}
                    </Text>

                    <Link
                      href={url}
                      className="mt-5 inline-block rounded-lg bg-[#2563eb] px-8 py-4 text-base font-semibold text-white no-underline hover:bg-[#1d4ed8]"
                    >
                      View Deal
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#f8fafc] p-5 text-center text-sm text-[#718096]">
              <Text className="m-0 mb-3">
                This is an automated price alert. Prices and availability are
                subject to change.
              </Text>
              <div>
                <Link href="#" className="mr-3 text-[#2563eb] no-underline">
                  Unsubscribe
                </Link>
                <Link href="#" className="text-[#2563eb] no-underline">
                  Manage Preferences
                </Link>
              </div>
            </div>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};
