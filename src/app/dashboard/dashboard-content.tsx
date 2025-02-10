"use client";

import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AnimatedGradient } from "@/components/ui/animated-gradient-with-svg";
import {
  AlertCircle,
  BarChart3,
  Bell,
  DollarSign,
  ExternalLink,
  Package,
  Plus,
  ShoppingCart,
  Tag,
  Truck,
} from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription as DialogContentDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { z } from "zod";

interface Product {
  url: string;
  latest_price: number | null;
  latest_name: string | null;
  currency: string | null;
  is_available: boolean;
  main_image_url: string | null;
  tracked_since: string;
}

interface PriceHistoryData {
  date: string;
  price: number;
}

interface DashboardContentProps {
  userName: string;
}

const urlSchema = z.object({
  url: z.string().min(1, "Please enter a URL").url("Please enter a valid URL"),
});

export function DashboardContent({ userName }: DashboardContentProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [productUrl, setProductUrl] = useState("");
  const [addProductError, setAddProductError] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [priceHistory, setPriceHistory] = useState<PriceHistoryData[]>([]);
  const [loadingHistory, setLoadingHistory] = useState(false);

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

  const validateUrl = (url: string): boolean => {
    try {
      urlSchema.parse({ url });
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        setAddProductError(error.errors[0]?.message || "Invalid URL");
      }
      return false;
    }
  };

  const handleAddProduct = async () => {
    if (!validateUrl(productUrl)) {
      return;
    }

    setIsAddingProduct(true);
    setAddProductError(null);

    try {
      const response = await fetch("/api/v1/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url: productUrl }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Failed to add product");
      }

      const newProduct = await response.json();
      setProducts((prev) => [newProduct, ...prev]);
      setProductUrl("");
      setIsAddingProduct(false);
      setIsDialogOpen(false);
      toast.success("Product added successfully!");
      return true;
    } catch (err) {
      setAddProductError(
        err instanceof Error ? err.message : "Failed to add product",
      );
      setIsAddingProduct(false);
      return false;
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !isAddingProduct) {
      handleAddProduct();
    }
  };

  // Calculate stats
  const totalProducts = products.length;
  const availableProducts = products.filter((p) => p.is_available).length;
  const priceDrops = products.filter((p) => p.latest_price !== null).length;
  const totalSavings = products.reduce((acc, product) => {
    if (!product.latest_price) return acc;
    return acc + product.latest_price;
  }, 0);

  const fetchPriceHistory = async (url: string) => {
    setLoadingHistory(true);
    try {
      const response = await fetch("/api/v1/products/price-history", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch price history");
      }

      const data = await response.json();
      const formattedData = data.items.map((item: any) => ({
        date: new Date(item.timestamp).toLocaleDateString(undefined, {
          month: "short",
          day: "numeric",
        }),
        price: item.price,
      }));
      setPriceHistory(formattedData);
      setSelectedProduct(products.find((p) => p.url === url) || null);
    } catch (err) {
      console.error("Error fetching price history:", err);
      toast.error("Failed to load price history");
    } finally {
      setLoadingHistory(false);
    }
  };

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
        <div className="flex items-center justify-between border border-white/10 bg-white/5 p-8 shadow-2xl [&>*]:rounded-none">
          <div>
            <h1 className="text-4xl font-bold text-white">
              Welcome back, {userName}!
            </h1>
            <p className="mt-2 text-lg text-blue-100">
              Track your products and monitor price changes
            </p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button
                size="lg"
                className="gap-2 rounded-none bg-white/10 text-white hover:bg-white/20"
              >
                <Plus className="h-5 w-5" /> Add Product
              </Button>
            </DialogTrigger>
            <DialogContent className="rounded-none border border-white/10 bg-slate-900/80 p-0 text-white shadow-2xl backdrop-blur-xl [&>*]:rounded-none">
              <DialogHeader className="border-b border-white/10 bg-white/5 p-8">
                <DialogTitle className="text-xl">Add New Product</DialogTitle>
                <DialogContentDescription className="text-blue-200">
                  Enter the URL of the product you want to track. We'll
                  automatically fetch the product details and start tracking its
                  price.
                </DialogContentDescription>
              </DialogHeader>
              <div className="grid gap-6 p-8">
                <div className="grid gap-2">
                  <Label htmlFor="url" className="text-white">
                    Product URL
                  </Label>
                  <div className="relative">
                    <Input
                      id="url"
                      placeholder="Enter product URL..."
                      value={productUrl}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setProductUrl(e.target.value);
                        setAddProductError(null);
                      }}
                      onKeyDown={handleKeyDown}
                      disabled={isAddingProduct}
                      className="rounded-none border-white/10 bg-white/5 pr-10 text-white placeholder:text-white/40 disabled:opacity-50"
                    />
                    <div className="pointer-events-none absolute right-3 top-0 flex h-full items-center">
                      <ExternalLink className="h-5 w-5 text-white/40" />
                    </div>
                  </div>
                  {addProductError && (
                    <div className="flex items-center gap-2 text-sm text-red-400">
                      <AlertCircle className="h-4 w-4" />
                      {addProductError}
                    </div>
                  )}
                </div>
                <div className="flex gap-4">
                  <DialogClose asChild>
                    <Button
                      variant="outline"
                      className="flex-1 rounded-none border-white/10 bg-white/5 text-white hover:bg-white/10"
                      disabled={isAddingProduct}
                    >
                      Cancel
                    </Button>
                  </DialogClose>
                  <Button
                    onClick={handleAddProduct}
                    disabled={isAddingProduct}
                    className="flex-1 rounded-none bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
                  >
                    {isAddingProduct ? (
                      <div className="flex items-center gap-2">
                        <span>Adding...</span>
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      </div>
                    ) : (
                      "Add Product"
                    )}
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
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
        {/* Price History Chart */}
        <div>
          <Card className="rounded-none border border-white/10 bg-white/5 text-white shadow-2xl backdrop-blur-2xl [&>*]:rounded-none">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Price History</CardTitle>
                {selectedProduct && (
                  <CardDescription className="mt-2 text-blue-200">
                    {selectedProduct.latest_name}
                  </CardDescription>
                )}
              </div>
              <BarChart3 className="h-4 w-4 text-blue-200" />
            </CardHeader>
            <CardContent>
              {loadingHistory ? (
                <div className="flex h-[300px] items-center justify-center">
                  <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
                </div>
              ) : !selectedProduct ? (
                <div className="flex h-[300px] items-center justify-center text-white/60">
                  Select a product to view price history
                </div>
              ) : priceHistory.length === 0 ? (
                <div className="flex h-[300px] items-center justify-center text-white/60">
                  No price history available
                </div>
              ) : (
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={priceHistory}
                      margin={{ top: 20, right: 30, left: 50, bottom: 20 }}
                    >
                      <defs>
                        <linearGradient
                          id="priceGradient"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="5%"
                            stopColor="#3B82F6"
                            stopOpacity={0.3}
                          />
                          <stop
                            offset="95%"
                            stopColor="#3B82F6"
                            stopOpacity={0}
                          />
                        </linearGradient>
                      </defs>
                      <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="rgba(255,255,255,0.1)"
                        vertical={false}
                      />
                      <XAxis
                        dataKey="date"
                        stroke="rgba(255,255,255,0.5)"
                        tick={{ fill: "rgba(255,255,255,0.5)" }}
                        tickLine={{ stroke: "rgba(255,255,255,0.1)" }}
                      />
                      <YAxis
                        stroke="rgba(255,255,255,0.5)"
                        tick={{ fill: "rgba(255,255,255,0.5)" }}
                        tickLine={{ stroke: "rgba(255,255,255,0.1)" }}
                        tickFormatter={(value) =>
                          selectedProduct?.currency
                            ? formatCurrency(value, selectedProduct.currency)
                            : value.toString()
                        }
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "rgba(15, 23, 42, 0.9)",
                          border: "1px solid rgba(255,255,255,0.1)",
                          borderRadius: "0px",
                          color: "white",
                        }}
                        labelStyle={{ color: "rgba(255,255,255,0.7)" }}
                        formatter={(value: number) =>
                          selectedProduct?.currency
                            ? [
                                formatCurrency(value, selectedProduct.currency),
                                "Price",
                              ]
                            : [value, "Price"]
                        }
                      />
                      <Area
                        type="monotone"
                        dataKey="price"
                        stroke="#3B82F6"
                        strokeWidth={2}
                        fill="url(#priceGradient)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              )}
            </CardContent>
          </Card>
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
                      className="flex cursor-pointer items-center justify-between border border-white/10 bg-white/5 p-4 hover:bg-white/10"
                      onClick={() => fetchPriceHistory(product.url)}
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
      </div>
    </div>
  );
}
