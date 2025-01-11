"use client";

import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Clock } from "lucide-react";
import { TextEffect } from "@/components/ui/text-effect";
import { AnimatedNumber } from "@/components/ui/animated-number";
import { useInView } from "motion/react";

export default function CallToActionSection() {
  const ref = useRef(null);
  const isInView = useInView(ref);
  
  const stats = [
    { value: isInView ? 1000 : 0, label: "Active Users", prefix: "+" },
    { value: isInView ? 50000 : 0, label: "Products Tracked", prefix: "+" },
    { value: isInView ? 20000 : 0, label: "Money Saved", prefix: "$" },
    { value: isInView ? 99 : 0, label: "Happy Users", suffix: "%" },
  ];

  return (
    <section id="CallToAction" className="bg-neutral-900 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 to-blue-800">
          <div className="relative px-6 py-16 sm:px-12 lg:px-20">
            <div className="mx-auto max-w-3xl text-center">
              <TextEffect
                as="h2"
                preset="fade-in-blur"
                className="mb-6 text-4xl font-bold text-white md:text-5xl"
              >
                Ready to Save Money on Your Favorite Products?
              </TextEffect>

              <p className="mb-10 text-xl text-blue-100">
                Join the savvy shoppers already using this app to get the best
                deals.
              </p>

              <div className="space-y-6">
                <Button
                  size="lg"
                  className="bg-white h-16 text-blue-600 hover:bg-blue-50"
                >
                  Start Tracking Now – It&apos;s Free!
                </Button>

                <div className="flex items-center justify-center gap-2 text-blue-100">
                  <Clock className="h-5 w-5" />
                  <p className="text-sm">
                    No sign-up required. Start tracking in less than 5 minutes.
                  </p>
                </div>
              </div>

              <div className="mt-12 grid grid-cols-2 gap-6 md:grid-cols-4" ref={ref}>
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="mb-2 text-3xl font-bold text-white flex items-center justify-center">
                      <span className="mr-1">{stat.prefix}</span>
                      <AnimatedNumber
                        value={stat.value}
                        className="tabular-nums"
                        springOptions={{
                          bounce: 0,
                          duration: 2000,
                        }}
                      />
                      <span className="ml-1">{stat.suffix}</span>
                    </div>
                    <div className="text-sm text-blue-100">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
