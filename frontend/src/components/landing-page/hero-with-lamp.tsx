"use client";
import React from "react";
import { motion } from "framer-motion";
import { MoveRight, PhoneCall } from "lucide-react";
import { LampContainer } from "@/components/ui/lamp";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function HeroWithLamp() {
  return (
    <>
      <LampContainer>
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
          Smart Price Tracking <br /> Simplified
        </motion.h1>
      </LampContainer>
    </>
  );
}
