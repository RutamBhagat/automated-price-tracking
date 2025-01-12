"use client";
import React from "react";
import { motion } from "framer-motion";
import { MoveRight, PhoneCall } from "lucide-react";
import { LampContainer } from "@/components/ui/lamp";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function HeroWithLamp() {
  return (
    <div className="w-full bg-slate-950">
      <div className="">
        <LampContainer className="min-h-[61dvh]">
          <motion.h1
            initial={{ opacity: 0.5, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.3,
              duration: 0.8,
              ease: "easeInOut",
            }}
            className="mt-8 bg-gradient-to-br from-slate-300 to-slate-500 bg-clip-text py-4 text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl"
          >
            Price Tracking <br /> Simplified
          </motion.h1>
        </LampContainer>
      </div>

      <div className="container mx-auto -translate-y-28 px-4 pb-20 lg:pb-40">
        <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2">
          <div className="flex flex-col gap-4">
            <div>
              <Badge
                variant="outline"
                className="border-[#0e8ba0] text-[#0e8ba0]"
              >
                Now Live!
              </Badge>
            </div>
            <div className="flex flex-col gap-4">
              <p className="max-w-md text-left text-xl leading-relaxed tracking-tight text-gray-400">
                Save time and money by staying on top of price drops and stock
                updates. Our platform delivers instant alerts, helping you make
                smarter purchasing decisions, all in one seamless experience.
              </p>
            </div>
            <div className="flex flex-row gap-4">
              <Button
                size="lg"
                className="gap-4 border-[#0e8ba0] text-[#0e8ba0] hover:bg-[#0e8ba0] hover:text-white"
                variant="outline"
              >
                Learn More <PhoneCall className="h-4 w-4" />
              </Button>
              <Button
                size="lg"
                className="gap-4 bg-[#16c5e2] text-[#020617] hover:bg-[#0e8ba0] hover:text-white"
              >
                Get Started Now <MoveRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-8">
            <div className="aspect-square rounded-md bg-gray-900"></div>
            <div className="row-span-2 rounded-md bg-gray-900"></div>
            <div className="aspect-square rounded-md bg-gray-900"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroWithLamp;
