interface SendPriceAlertProps {
  productName: string;
  oldPrice: number;
  newPrice: number;
  url: string;
  recipientEmail: string;
  currency?: string;
  mainImageUrl?: string;
}

export async function sendPriceAlert({
  productName,
  oldPrice,
  newPrice,
  url,
  recipientEmail,
  currency = "INR",
  mainImageUrl,
}: SendPriceAlertProps): Promise<{ success: boolean; error?: string }> {
  try {
    const response = await fetch("/api/v1/notifications/send-price-alert", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        productName,
        oldPrice,
        newPrice,
        url,
        recipientEmail,
        currency,
        mainImageUrl,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Failed to send price alert");
    }

    return { success: true };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to send price alert",
    };
  }
}
