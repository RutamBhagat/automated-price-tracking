"use client";
import { MoveRight, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { LampContainer } from "../ui/lamp";
import Image from "next/image";

function HeroWithImages() {
  return (
    <>
      <LampContainer className="min-h-[41dvh]">
        <></>
      </LampContainer>
      <div id="Home" className="w-full bg-slate-950">
        <div className="container mx-auto -translate-y-20 px-4 lg:pb-20">
          <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2">
            <div className="flex flex-col gap-4">
              <motion.div
                initial={{ opacity: 0.5, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.3,
                  duration: 0.8,
                  ease: "easeInOut",
                }}
              >
                <Badge
                  variant="outline"
                  className="border-[#0e8ba0] text-[#0e8ba0]"
                >
                  Now Live!
                </Badge>
              </motion.div>
              <motion.h1
                initial={{ opacity: 0.5, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.3,
                  duration: 0.8,
                  ease: "easeInOut",
                }}
                className="font-regular max-w-lg text-left text-5xl tracking-tighter text-gray-400 md:text-7xl"
              >
                PriceTracker
              </motion.h1>
              <div className="flex flex-col gap-4">
                <motion.p
                  initial={{ opacity: 0.5, y: 100 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.3,
                    duration: 0.8,
                    ease: "easeInOut",
                  }}
                  className="max-w-md text-left text-xl leading-relaxed tracking-tight text-gray-400"
                >
                  Save time and money by staying on top of price drops and stock
                  updates. Our platform delivers instant alerts, helping you
                  make smarter purchasing decisions, all in one seamless
                  experience.
                </motion.p>
              </div>
              <motion.div
                initial={{ opacity: 0.5, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.3,
                  duration: 0.8,
                  ease: "easeInOut",
                }}
                className="flex flex-row gap-4"
              >
                <Button
                  size="lg"
                  className="gap-4 border-[#0e8ba0] text-[#0e8ba0] hover:bg-[#0e8ba0] hover:text-white"
                  variant="outline"
                >
                  Learn More <Info className="h-4 w-4" />
                </Button>
                <Button
                  size="lg"
                  className="gap-4 bg-[#16c5e2] text-[#020617] hover:bg-[#0e8ba0] hover:text-white"
                >
                  Get Started Now <MoveRight className="h-4 w-4" />
                </Button>
              </motion.div>
            </div>
            <motion.div
              initial={{ opacity: 0.5, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.3,
                duration: 0.8,
                ease: "easeInOut",
              }}
              className="grid grid-cols-2 place-content-center place-items-center gap-12"
            >
              <Image
                src="/1.jpg"
                alt="Feature image 1"
                width={300}
                height={800}
                className="aspect-square rounded-md object-cover"
              />
              <Image
                src="/2.jpg"
                alt="Feature image 2"
                width={300}
                height={800}
                className="row-span-2 rounded-md object-cover"
              />
              <Image
                src="/3.jpg"
                alt="Feature image 3"
                width={300}
                height={800}
                className="aspect-square rounded-md object-cover"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
}

export { HeroWithImages };
