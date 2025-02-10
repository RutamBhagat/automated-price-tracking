import React from "react";
import Image from "next/image";
import { TextEffect } from "@/components/ui/text-effect";
import { InView } from "@/components/ui/in-view";
import { TextShimmer } from "@/components/ui/text-shimmer";
import GoogleButton from "@/components/login-page/google-button";

export default function Page() {
  return (
    <div className="relative flex min-h-screen w-full flex-col-reverse lg:grid lg:grid-cols-2">
      {/* Testimonial Section */}
      <div className="relative flex-1 bg-slate-950 lg:min-h-screen">
        <div className="relative flex h-full flex-col p-6 sm:p-8 lg:p-12">
          <div className="mx-auto mt-16 flex w-full max-w-[450px] flex-grow flex-col items-start justify-center space-y-8 py-8 lg:mt-0 lg:py-0">
            <div className="flex w-full flex-col items-start space-y-6 lg:space-y-8">
              <InView
                variants={{
                  hidden: { opacity: 0, x: -20 },
                  visible: { opacity: 1, x: 0 },
                }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex items-center space-x-4">
                  <Image
                    src="/placeholder_testimonial.png"
                    alt="User Avatar"
                    width={56}
                    height={56}
                    className="rounded-full ring-2 ring-[#0e8ba0] sm:h-16 sm:w-16"
                  />
                  <div className="space-y-0.5">
                    <div className="text-sm font-medium text-gray-200 sm:text-base">
                      Sarah M.
                    </div>
                    <div className="text-xs text-gray-400 sm:text-sm">
                      Verified Buyer
                    </div>
                  </div>
                </div>
                <blockquote className="mt-6 text-xl font-medium leading-relaxed text-gray-200 sm:text-2xl">
                  <TextEffect preset="fade-in-blur" per="word" as="span">
                    This app makes saving money effortless! I never miss a deal
                    on my favorite items anymore. Saved over $200 last month!
                  </TextEffect>
                </blockquote>
              </InView>
            </div>
            <div className="w-full border-t border-slate-800 pt-6 lg:pt-8">
              <TextShimmer
                duration={3}
                spread={3}
                as="div"
                className="text-sm text-gray-400 sm:text-base"
              >
                Join over 10,000 smart shoppers already saving money
              </TextShimmer>
            </div>
          </div>
        </div>
      </div>

      {/* Sign In Section */}
      <div className="flex-1 bg-slate-900 lg:min-h-screen">
        <div className="flex min-h-[50vh] items-center justify-center p-6 sm:p-8 lg:min-h-screen lg:p-12">
          <div className="mx-auto w-full max-w-[400px] space-y-6 lg:space-y-8">
            <div className="space-y-3">
              <TextEffect
                preset="fade"
                per="word"
                as="h1"
                className="text-2xl font-bold tracking-tight text-gray-200 sm:text-3xl"
              >
                Sign in to start saving!
              </TextEffect>
              <p className="text-base text-gray-400 sm:text-lg">
                Get notified about the best price drops for your favorite items
              </p>
            </div>

            <GoogleButton />

            <div className="text-xs text-gray-400 sm:text-sm">
              By continuing, you agree to our{" "}
              <a
                href="/terms"
                className="font-medium text-[#16c5e2] hover:text-[#0e8ba0] hover:underline"
              >
                Terms
              </a>{" "}
              and{" "}
              <a
                href="/privacy"
                className="font-medium text-[#16c5e2] hover:text-[#0e8ba0] hover:underline"
              >
                Privacy Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
