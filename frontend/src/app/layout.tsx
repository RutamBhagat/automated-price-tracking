import Navbar from "@/components/navbar";
import Providers from "@/components/providers";
import "@/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "PriceTracker - Save Money Effortlessly",
  description:
    "Track prices across multiple e-commerce sites, analyze trends, and never miss a deal again.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body>
        <Providers>
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
