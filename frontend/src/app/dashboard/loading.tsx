import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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

export default function DashboardLoading() {
  return (
    <div className="relative min-h-screen bg-slate-950 pt-24">
      {/* Background Gradients */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden">
        <div className="relative h-[1000px] w-full max-w-7xl">
          {/* Primary gradient - centered and subtle */}
          <div className="absolute left-1/2 top-1/2 h-[500px] w-[900px] -translate-x-1/2 -translate-y-1/2">
            <AnimatedGradient
              colors={["#3B82F6", "#60A5FA", "#93C5FD"]}
              speed={0.01}
              blur="heavy"
            />
          </div>
          {/* Accent gradient - smaller and more vibrant */}
          <div className="absolute left-1/4 top-1/3 h-[300px] w-[500px] -translate-x-1/2 -translate-y-1/2 opacity-80">
            <AnimatedGradient
              colors={["#16c5e2", "#0e8ba0"]}
              speed={0.015}
              blur="heavy"
            />
          </div>
        </div>
      </div>

      <div className="relative mx-auto max-w-7xl space-y-8 px-8">
        {/* Welcome Section Skeleton */}
        <div className="flex items-center justify-between rounded-xl border border-slate-800/50 bg-slate-900/50 p-8 backdrop-blur-xl">
          <div>
            <div className="h-10 w-64 animate-pulse rounded-lg bg-slate-800" />
            <div className="mt-2 h-6 w-96 animate-pulse rounded-lg bg-slate-800" />
          </div>
          <div className="h-11 w-40 animate-pulse rounded-lg bg-slate-800" />
        </div>

        {/* Stats Overview Skeleton */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: <Package className="h-4 w-4 text-slate-600" /> },
            { icon: <Bell className="h-4 w-4 text-slate-600" /> },
            { icon: <DollarSign className="h-4 w-4 text-slate-600" /> },
            { icon: <Tag className="h-4 w-4 text-slate-600" /> },
          ].map((stat, i) => (
            <Card
              key={i}
              className="border-slate-800/50 bg-slate-900/50 text-white backdrop-blur-xl"
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div className="h-4 w-24 animate-pulse rounded-lg bg-slate-800" />
                {stat.icon}
              </CardHeader>
              <CardContent>
                <div className="h-8 w-16 animate-pulse rounded-lg bg-slate-800" />
                <div className="mt-2 h-3 w-32 animate-pulse rounded-lg bg-slate-800" />
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent Products & Activity Skeleton */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Recent Products */}
          <Card className="border-slate-800/50 bg-slate-900/50 text-white backdrop-blur-xl">
            <CardHeader>
              <CardTitle>
                <div className="h-6 w-32 animate-pulse rounded-lg bg-slate-800" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between rounded-lg border border-slate-800/50 bg-slate-900/50 p-4"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="h-10 w-10 animate-pulse rounded-full bg-slate-800" />
                      <div>
                        <div className="h-4 w-24 animate-pulse rounded-lg bg-slate-800" />
                        <div className="mt-2 h-3 w-16 animate-pulse rounded-lg bg-slate-800" />
                      </div>
                    </div>
                    <div className="h-6 w-12 animate-pulse rounded-full bg-slate-800" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="border-slate-800/50 bg-slate-900/50 text-white backdrop-blur-xl">
            <CardHeader>
              <CardTitle>
                <div className="h-6 w-32 animate-pulse rounded-lg bg-slate-800" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    icon: <ShoppingCart className="h-4 w-4 text-slate-600" />,
                    color: "green",
                  },
                  {
                    icon: <Bell className="h-4 w-4 text-slate-600" />,
                    color: "blue",
                  },
                  {
                    icon: <Truck className="h-4 w-4 text-slate-600" />,
                    color: "orange",
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center space-x-4 rounded-lg border border-transparent p-2"
                  >
                    <div
                      className={`rounded-full border border-${item.color}-500/50 bg-${item.color}-500/10 p-2`}
                    >
                      {item.icon}
                    </div>
                    <div>
                      <div className="h-4 w-32 animate-pulse rounded-lg bg-slate-800" />
                      <div className="mt-2 h-3 w-24 animate-pulse rounded-lg bg-slate-800" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Price History Chart Skeleton */}
        <Card className="border-slate-800/50 bg-slate-900/50 text-white backdrop-blur-xl">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>
              <div className="h-6 w-32 animate-pulse rounded-lg bg-slate-800" />
            </CardTitle>
            <BarChart3 className="h-4 w-4 text-slate-600" />
          </CardHeader>
          <CardContent>
            <div className="h-[200px] w-full animate-pulse rounded-xl bg-slate-800/50" />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
