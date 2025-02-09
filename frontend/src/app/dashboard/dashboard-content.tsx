"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AnimatedGradient } from "@/components/ui/animated-gradient-with-svg";
import {
  BarChart3,
  Bell,
  DollarSign,
  Package,
  Plus,
  ShoppingCart,
  Tag,
  Truck,
} from "lucide-react";
import { formatCurrency } from "@/lib/utils";

interface Product {
  url: string;
  latest_price: number | null;
  latest_name: string | null;
  currency: string | null;
  is_available: boolean;
  main_image_url: string | null;
  tracked_since: string;
}

interface DashboardContentProps {
  userName: string;
}

export function DashboardContent({ userName }: DashboardContentProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch("/api/v1/products");
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to load products",
        );
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  // Calculate stats
  const totalProducts = products.length;
  const availableProducts = products.filter((p) => p.is_available).length;
  const priceDrops = products.filter((p) => p.latest_price !== null).length;
  const totalSavings = products.reduce((acc, product) => {
    if (!product.latest_price) return acc;
    return acc + product.latest_price;
  }, 0);

  return (
    <div className="relative min-h-screen bg-slate-950">
      {/* Vibrant Gradient Background */}
      <div className="fixed inset-0">
        <AnimatedGradient
          colors={["#3B82F6", "#2563EB", "#1E40AF"]}
          speed={0}
          blur="heavy"
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-8 pt-24">
        {/* Welcome Section */}
        <div className="flex items-center justify-between border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-2xl [&>*]:rounded-none">
          <div>
            <h1 className="text-4xl font-bold text-white">
              Welcome back, {userName}!
            </h1>
            <p className="mt-2 text-lg text-blue-100">
              Track your products and monitor price changes
            </p>
          </div>
          <Button
            size="lg"
            className="gap-2 rounded-none bg-white/10 text-white hover:bg-white/20"
          >
            <Plus className="h-5 w-5" /> Add Product
          </Button>
        </div>

        {/* Stats Overview */}
        <div className="grid h-full grow grid-cols-1 md:grid-cols-3">
          {/* First row - spans 2 columns */}
          <div className="md:col-span-2">
            <div className="relative h-full overflow-hidden bg-slate-950">
              <AnimatedGradient
                colors={["#3B82F6", "#60A5FA", "#93C5FD"]}
                speed={0}
                blur="medium"
              />
              <div className="relative z-10 p-8 text-zinc-100 backdrop-blur-sm">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm text-zinc-200">Tracked Products</h3>
                  <Package className="h-4 w-4 text-zinc-200" />
                </div>
                <p className="mb-2 text-2xl font-medium text-zinc-100">
                  {totalProducts}
                </p>
                <p className="text-sm text-zinc-300">
                  {availableProducts} currently available
                </p>
              </div>
            </div>
          </div>

          {/* Single column card */}
          <div className="relative h-full overflow-hidden bg-slate-950">
            <AnimatedGradient
              colors={["#60A5FA", "#34D399", "#93C5FD"]}
              speed={0}
              blur="medium"
            />
            <div className="relative z-10 p-8 text-zinc-100 backdrop-blur-sm">
              <div className="flex items-center justify-between">
                <h3 className="text-sm text-zinc-200">Active Alerts</h3>
                <Bell className="h-4 w-4 text-zinc-200" />
              </div>
              <p className="mb-2 text-2xl font-medium text-zinc-100">12</p>
              <p className="text-sm text-zinc-300">4 triggered today</p>
            </div>
          </div>

          {/* Single column card */}
          <div className="relative h-full overflow-hidden bg-slate-950">
            <AnimatedGradient
              colors={["#F59E0B", "#A78BFA", "#FCD34D"]}
              speed={0}
              blur="medium"
            />
            <div className="relative z-10 p-8 text-zinc-100 backdrop-blur-sm">
              <div className="flex items-center justify-between">
                <h3 className="text-sm text-zinc-200">Total Savings</h3>
                <DollarSign className="h-4 w-4 text-zinc-200" />
              </div>
              <p className="mb-2 text-2xl font-medium text-zinc-100">
                {formatCurrency(totalSavings, "USD")}
              </p>
              <p className="text-sm text-zinc-300">+$89 this month</p>
            </div>
          </div>

          {/* Last row - spans 2 columns */}
          <div className="md:col-span-2">
            <div className="relative h-full overflow-hidden bg-slate-950">
              <AnimatedGradient
                colors={["#3B82F6", "#A78BFA", "#FBCFE8"]}
                speed={0}
                blur="medium"
              />
              <div className="relative z-10 p-8 text-zinc-100 backdrop-blur-sm">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm text-zinc-200">Price Drops</h3>
                  <Tag className="h-4 w-4 text-zinc-200" />
                </div>
                <p className="mb-2 text-2xl font-medium text-zinc-100">
                  {priceDrops}
                </p>
                <p className="text-sm text-zinc-300">In the last 24h</p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Products */}
        <div>
          <Card className="h-full rounded-none border border-white/10 bg-white/5 text-white shadow-2xl backdrop-blur-2xl [&>*]:rounded-none">
            <CardHeader>
              <CardTitle>Recent Products</CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="text-center text-white/60">Loading...</div>
              ) : error ? (
                <div className="text-center text-red-400">{error}</div>
              ) : (
                <div className="space-y-0">
                  {products.slice(0, 5).map((product) => (
                    <div
                      key={product.url}
                      className="flex cursor-pointer items-center justify-between border border-white/10 bg-white/5 p-4"
                    >
                      <div className="flex items-center space-x-4">
                        {product.main_image_url && (
                          <img
                            src={product.main_image_url}
                            alt={product.latest_name || "Product"}
                            className="h-10 w-10 object-cover"
                          />
                        )}
                        <div>
                          <p className="font-medium">
                            {product.latest_name || "Unnamed Product"}
                          </p>
                          <p className="text-sm text-white/60">
                            {product.latest_price && product.currency
                              ? formatCurrency(
                                  product.latest_price,
                                  product.currency,
                                )
                              : "Price unavailable"}
                          </p>
                        </div>
                      </div>
                      <Badge
                        variant={product.is_available ? "default" : "secondary"}
                      >
                        {product.is_available ? "Available" : "Unavailable"}
                      </Badge>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Price History Chart */}
        <div>
          <Card className="rounded-none border border-white/10 bg-white/5 text-white shadow-2xl backdrop-blur-2xl [&>*]:rounded-none">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Price History</CardTitle>
              <BarChart3 className="h-4 w-4 text-blue-200" />
            </CardHeader>
            <CardContent>
              <div className="h-[200px] w-full bg-white/10" />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
