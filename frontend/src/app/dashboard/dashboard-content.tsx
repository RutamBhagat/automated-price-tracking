"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AnimatedGradient } from "@/components/ui/animated-gradient-with-svg";
import { motion } from "framer-motion";
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

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0 },
  show: { opacity: 1 },
};

interface DashboardContentProps {
  userName: string;
}

export function DashboardContent({ userName }: DashboardContentProps) {
  return (
    <div className="relative min-h-screen bg-slate-950">
      {/* Vibrant Gradient Background */}
      <div className="fixed inset-0">
        <AnimatedGradient
          colors={["#3B82F6", "#2563EB", "#1E40AF"]}
          speed={0.005}
          blur="heavy"
        />
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative mx-auto max-w-7xl px-8 pt-24"
      >
        {/* Welcome Section */}
        <motion.div
          variants={item}
          className="flex items-center justify-between border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-2xl [&>*]:rounded-none"
        >
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
        </motion.div>

        {/* Stats Overview */}
        <div className="grid h-full grow grid-cols-1 md:grid-cols-3">
          {/* First row - spans 2 columns */}
          <div className="md:col-span-2">
            <motion.div
              className="relative h-full overflow-hidden bg-slate-950"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <AnimatedGradient
                colors={["#3B82F6", "#60A5FA", "#93C5FD"]}
                speed={0.05}
                blur="medium"
              />
              <motion.div
                className="relative z-10 p-8 text-zinc-100 backdrop-blur-sm"
                variants={container}
                initial="hidden"
                animate="show"
              >
                <motion.div
                  variants={item}
                  className="flex items-center justify-between"
                >
                  <h3 className="text-sm text-zinc-200">Tracked Products</h3>
                  <Package className="h-4 w-4 text-zinc-200" />
                </motion.div>
                <motion.p
                  variants={item}
                  className="mb-2 text-2xl font-medium text-zinc-100"
                >
                  24
                </motion.p>
                <motion.p variants={item} className="text-sm text-zinc-300">
                  +2 from last week
                </motion.p>
              </motion.div>
            </motion.div>
          </div>

          {/* Single column card */}
          <motion.div
            className="relative h-full overflow-hidden bg-slate-950"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <AnimatedGradient
              colors={["#60A5FA", "#34D399", "#93C5FD"]}
              speed={0.05}
              blur="medium"
            />
            <motion.div
              className="relative z-10 p-8 text-zinc-100 backdrop-blur-sm"
              variants={container}
              initial="hidden"
              animate="show"
            >
              <motion.div
                variants={item}
                className="flex items-center justify-between"
              >
                <h3 className="text-sm text-zinc-200">Active Alerts</h3>
                <Bell className="h-4 w-4 text-zinc-200" />
              </motion.div>
              <motion.p
                variants={item}
                className="mb-2 text-2xl font-medium text-zinc-100"
              >
                12
              </motion.p>
              <motion.p variants={item} className="text-sm text-zinc-300">
                4 triggered today
              </motion.p>
            </motion.div>
          </motion.div>

          {/* Single column card */}
          <motion.div
            className="relative h-full overflow-hidden bg-slate-950"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <AnimatedGradient
              colors={["#F59E0B", "#A78BFA", "#FCD34D"]}
              speed={0.05}
              blur="medium"
            />
            <motion.div
              className="relative z-10 p-8 text-zinc-100 backdrop-blur-sm"
              variants={container}
              initial="hidden"
              animate="show"
            >
              <motion.div
                variants={item}
                className="flex items-center justify-between"
              >
                <h3 className="text-sm text-zinc-200">Total Savings</h3>
                <DollarSign className="h-4 w-4 text-zinc-200" />
              </motion.div>
              <motion.p
                variants={item}
                className="mb-2 text-2xl font-medium text-zinc-100"
              >
                $432.89
              </motion.p>
              <motion.p variants={item} className="text-sm text-zinc-300">
                +$89 this month
              </motion.p>
            </motion.div>
          </motion.div>

          {/* Last row - spans 2 columns */}
          <div className="md:col-span-2">
            <motion.div
              className="relative h-full overflow-hidden bg-slate-950"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <AnimatedGradient
                colors={["#3B82F6", "#A78BFA", "#FBCFE8"]}
                speed={0.05}
                blur="medium"
              />
              <motion.div
                className="relative z-10 p-8 text-zinc-100 backdrop-blur-sm"
                variants={container}
                initial="hidden"
                animate="show"
              >
                <motion.div
                  variants={item}
                  className="flex items-center justify-between"
                >
                  <h3 className="text-sm text-zinc-200">Price Drops</h3>
                  <Tag className="h-4 w-4 text-zinc-200" />
                </motion.div>
                <motion.p
                  variants={item}
                  className="mb-2 text-2xl font-medium text-zinc-100"
                >
                  7
                </motion.p>
                <motion.p variants={item} className="text-sm text-zinc-300">
                  In the last 24h
                </motion.p>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Recent Products & Activity */}
        <div className="grid md:grid-cols-2">
          <motion.div variants={item}>
            <Card className="h-full rounded-none border border-white/10 bg-white/5 text-white shadow-2xl backdrop-blur-2xl [&>*]:rounded-none">
              <CardHeader>
                <CardTitle>Recent Products</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-0">
                  {/* Product Items */}
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="flex cursor-pointer items-center justify-between border border-white/10 bg-white/5 p-4"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="h-10 w-10 bg-blue-500/20" />
                        <div>
                          <p className="font-medium">Product {i}</p>
                          <p className="text-sm text-blue-200">$199.99</p>
                        </div>
                      </div>
                      <Badge
                        variant="outline"
                        className="rounded-none border-blue-200 text-blue-200"
                      >
                        -5%
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={item}>
            <Card className="h-full rounded-none border border-white/10 bg-white/5 text-white shadow-2xl backdrop-blur-2xl [&>*]:rounded-none">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-0">
                  {/* Activity Items */}
                  <div className="flex cursor-pointer items-center space-x-4 border border-white/5 p-2">
                    <div className="bg-green-500/20 p-2">
                      <ShoppingCart className="h-4 w-4 text-green-200" />
                    </div>
                    <div>
                      <p className="font-medium">New product added</p>
                      <p className="text-sm text-blue-200">2 minutes ago</p>
                    </div>
                  </div>
                  <div className="flex cursor-pointer items-center space-x-4 border border-white/5 p-2">
                    <div className="bg-blue-500/20 p-2">
                      <Bell className="h-4 w-4 text-blue-200" />
                    </div>
                    <div>
                      <p className="font-medium">Price drop alert</p>
                      <p className="text-sm text-blue-200">1 hour ago</p>
                    </div>
                  </div>
                  <div className="flex cursor-pointer items-center space-x-4 border border-white/5 p-2">
                    <div className="bg-orange-500/20 p-2">
                      <Truck className="h-4 w-4 text-orange-200" />
                    </div>
                    <div>
                      <p className="font-medium">Back in stock</p>
                      <p className="text-sm text-blue-200">3 hours ago</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Price History Chart */}
        <motion.div variants={item}>
          <Card className="rounded-none border border-white/10 bg-white/5 text-white shadow-2xl backdrop-blur-2xl [&>*]:rounded-none">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Price History</CardTitle>
              <BarChart3 className="h-4 w-4 text-blue-200" />
            </CardHeader>
            <CardContent>
              <div className="h-[200px] w-full bg-white/10" />
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
}
