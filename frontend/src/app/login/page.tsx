import React from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { TextEffect } from "@/components/ui/text-effect";
import { InView } from "@/components/ui/in-view";
import { TextShimmer } from "@/components/ui/text-shimmer";

export default function Page() {
  return (
    <div className="min-h-screen w-full lg:grid lg:grid-cols-2">
      <div className="relative flex flex-col bg-[#18181B] p-12">
        <div className="absolute left-10 top-10 text-4xl">🔥</div>
        <div className="mx-auto flex w-full max-w-[450px] flex-grow flex-col items-start justify-center space-y-10">
          <div className="flex w-full flex-col items-start space-y-8">
            <InView
              variants={{
                hidden: { opacity: 0, x: -20 },
                visible: { opacity: 1, x: 0 },
              }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center space-x-4">
                <Image
                  src="/placeholder_testimonial.png" // Replace with a real user photo or avatar
                  alt="User Avatar"
                  width={64}
                  height={64}
                  className="rounded-full ring-2 ring-zinc-700"
                />
                <div className="space-y-1">
                  <div className="text-base font-medium text-white">
                    Sarah M.
                  </div>
                  <div className="text-sm text-zinc-400">Verified Buyer</div>
                </div>
              </div>
              <blockquote className="text-2xl font-medium leading-relaxed text-white">
                <TextEffect preset="fade-in-blur" per="word" as="span">
                  This app makes saving money effortless! I never miss a deal on
                  my favorite items anymore. Saved over $200 last month!
                </TextEffect>
              </blockquote>
            </InView>
          </div>
          <div className="w-full border-t border-zinc-800 pt-8">
            <TextShimmer
              duration={3}
              spread={3}
              as="div"
              className="text-zinc-400"
            >
              Join over 10,000 smart shoppers already saving money
            </TextShimmer>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center bg-zinc-50 p-8">
        <div className="mx-auto w-full max-w-[400px] space-y-8">
          <div className="space-y-3 text-center">
            <TextEffect
              preset="fade"
              per="word"
              as="h1"
              className="text-left text-3xl font-bold tracking-tight"
            >
              Sign in to start saving!
            </TextEffect>
            <p className="text-left text-lg text-zinc-600">
              Get notified about the best price drops for your favorite items
            </p>
          </div>
          <div className="text-left">
            <p className="text-sm text-zinc-600">
              By continuing, you agree to our{" "}
              <a
                href="/terms"
                className="font-medium text-blue-600 hover:underline"
              >
                Terms of Service
              </a>{" "}
              and{" "}
              <a
                href="/privacy"
                className="font-medium text-blue-600 hover:underline"
              >
                Privacy Policy
              </a>
            </p>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-zinc-200" />
            </div>
          </div>

          <Button
            variant="outline"
            className="w-full justify-center gap-3 border-zinc-300 bg-white py-6 text-base font-medium shadow-sm transition-all duration-200 hover:bg-zinc-50"
          >
            <Image 
              src="/google.svg" 
              alt="Google" 
              width={20} 
              height={20} 
              className="h-5 w-5"
            />
            Continue with Google
          </Button>
        </div>
      </div>
    </div>
  );
}
