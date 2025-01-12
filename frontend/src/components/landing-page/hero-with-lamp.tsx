"use client";
import React from "react";
import { motion } from "framer-motion";
import { LampContainer } from "@/components/ui/lamp";

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
    </div>
  );
}

export default HeroWithLamp;
